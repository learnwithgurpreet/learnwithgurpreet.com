---
title: "Automating Next.js 15 Deployments: A Build Once, Deploy Many GitHub Actions Guide"
# eleventyExcludeFromCollections: true
date: '2026-01-15'
description: Learn how to build a high-performance CI/CD pipeline for Next.js 15 using GitHub Actions. Move a single agnostic artifact through DEV, SIT, and PROD without rebuilding
tags:
  - 'Tech'
  - 'NextJS'
---

In my previous guide, ["Next.js 15 Build Once, Deploy Many: Achieving Environment-Agnostic Builds with the App Router"](/posts/nextjs-15-build-once-deploy-many-achieving-environment-agnostic-builds-with-the-app-router/), we discussed the architectural shift toward runtime configuration. Now, it is time to put that theory into practice.

To achieve a true "Build Once, Deploy Many" workflow, your GitHub Actions must be structured to separate the expensive Build phase from the lightweight **Deploy** phase.

## The Strategy: Artifact Promotion

In a standard pipeline, developers often run `npm run build` for every environment. This is inefficient. Instead, we will:

1. **Build** the application once in a "Standalone" mode.

2. **Upload** that bundle as a GitHub Artifact.

3. **Download** and push that same bundle to Azure DEV, SIT, and PROD.

### The Pipeline Visualized

```text
[ CI/CD RUNNER ]
       |
 [ Job: Build ] ---------------------> [ Artifact Storage ]
 (npm build + zip)                            |
       |                                      |
 [ Job: Deploy DEV ] <------------------------+
 (Download + Azure Push)                      |
       |                                      |
 [ Job: Deploy SIT ] <------------------------+ (Manual Approval)
 (Download + Azure Push)
```

## The GitHub Actions Workflow

This YAML configuration utilizes **GitHub Environments** to manage promotion logic and secrets for different Azure targets.

```yaml
name: Next.js 15 Promotion Pipeline

on:
  push:
    branches: [main]

jobs:
  # --- STAGE 1: BUILD ---
  build:
    name: Build Universal Artifact
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install & Build
        # Note: No env variables are passed here!
        run: |
          npm ci
          npm run build

      - name: Package Standalone Output
        # We prepare the standalone folder for Azure
        run: |
          cp -r .next/static .next/standalone/.next/static
          cp -r public .next/standalone/public
          cd .next/standalone && zip -r ../../site.zip .

      - name: Archive Artifact
        uses: actions/upload-artifact@v4
        with:
          name: nextjs-universal-bundle
          path: site.zip
          retention-days: 5

  # --- STAGE 2: DEPLOY TO DEV ---
  deploy-dev:
    name: Deploy to DEV
    needs: build
    runs-on: ubuntu-latest
    environment: Development
    steps:
      - name: Get Artifact
        uses: actions/download-artifact@v4
        with:
          name: nextjs-universal-bundle

      - name: Push to Azure DEV
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'myapp-dev-web'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: site.zip

      - name: Trigger Revalidation
        run: curl -X GET "https://myapp-dev-web.azurewebsites.net/api/revalidate?secret=${{ secrets.REVALIDATION_TOKEN }}"

  # --- STAGE 3: DEPLOY TO SIT ---
  deploy-sit:
    name: Promote to SIT
    needs: deploy-dev
    runs-on: ubuntu-latest
    environment: SIT # Set this to require manual approval in GitHub
    steps:
      - name: Get Artifact
        uses: actions/download-artifact@v4
        with:
          name: nextjs-universal-bundle

      - name: Push to Azure SIT
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'myapp-sit-web'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: site.zip

      - name: Trigger Revalidation
        run: curl -X GET "https://myapp-sit-web.azurewebsites.net/api/revalidate?secret=${{ secrets.REVALIDATION_TOKEN }}"
```

## Key Technical Considerations

1. **Standalone Output**: For this pipeline to work, your `next.config.js` must have `output: 'standalone'`. This tells Next.js to package only the essential files required for a production server, significantly reducing the size of your `site.zip`.

2. **Manual Approvals (The Gatekeeper)**: By using `environment: SIT`, you can go to your GitHub repository settings and add "Required Reviewers." This prevents the code from moving from DEV to SIT until a Lead Developer or QA Engineer clicks "Approve."

3. **Azure Application Settings**: Since we are no longer using `NEXT_PUBLIC_` variables, you must go to the Azure Portal > Configuration for each Web App and manually add your `API_BASE_URL`. The Next.js server will read these at runtime via the SSR approach we established.

## Benefits of this Pipeline

- **Speed**: Deployments to SIT and PROD take seconds because the build step is skipped.

- **Integrity**: You are guaranteed that the code running in SIT is identical to the code tested in DEV.

- **Cost**: You save significant GitHub Actions "Minutes" by only building once per commit.

> If you haven't yet configured your application to handle runtime variables without `NEXT_PUBLIC_`, check out my companion article: [Next.js 15 Build Once, Deploy Many: Achieving Environment-Agnostic Builds with the App Router](/posts/nextjs-15-build-once-deploy-many-achieving-environment-agnostic-builds-with-the-app-router/).

