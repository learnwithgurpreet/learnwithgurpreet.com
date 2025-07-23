---
title: 'How to Setup Mac Terminal'
date: '2023-03-21'
excerpt: People often ask me how I setup my Mac terminal, here is the guide.
tags:
  - 'Tech'
---

Let's quickly start with the forgotten package on Mac operating system [Homebrew](https://brew.sh/).

## Install Homebrew

Open you Mac terminal and install the package with following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After the installation it will ask you to add homebrew to your path, if not please follow the process given below (replace `[username]` with your username):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/[username]/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

## Install iTerm2

Because I don't like default terminal 😜

```bash
brew install --cask iterm2
```

## Install Git

I believe you have git already installed on your Mac, if not please follow the command:

```bash
brew install git
```

## Install Oh My Zsh

Fun time begins, this utility helps us to make our terminal prompts more intuitive.

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install PowerLevel10K Theme

After installing Oh My Zsh, its time to make it more interesting by installing another package called PowerLevel10K.

```bash
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

After installing, please open your `~/.zshrc` file in your preferred code editor and change the following line:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Now, please restart your iTerm2 or perform `source ~/.zshrc` to reflect changes.

> Note: You need to install Meslo Nerd Font as well, it will be part of PowerLevel10K theme only, please press `y` when it ask.

## Configure PowerLevel10K

Ideally, you have been asked to set PowerLevel10K theme, but in case you want to make any additional changes, feel free to use following command:

```bash
p10k configure
```

## Change iTerm2 Colors to My Custom Theme

Step 1: Open iTerm2

Step 2: Download color profile (it will be added to Downloads folder):

```bash
curl https://raw.githubusercontent.com/learnwithgurpreet/mac-dev-env-setup/main/nightking.itermcolors --output ~/Downloads/nightking.itermcolors
```

Step 3: Open iTerm2 preferences

Step 4: Go to Profiles > Colors

Step 5: Import the downloaded color profile (nightking)

Step 6: Select the color profile (nightking)

## Install Auto suggestion Plugin

Clone this repository into `$ZSH_CUSTOM/plugins` (by default `~/.oh-my-zsh/custom/plugins`)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

After installing, please open `~/.zshrc` file and modify the plugins line to what you see below:

```bash
plugins=(git zsh-autosuggestions)
```

## Update VSCode Terminal Font (Optional)

Open `settings.json` of your vscode and add `"terminal.integrated.fontFamily": "MesloLGS NF"`

## We are done!

I believe you will like your terminal more than before 😍

## Resources

- [Theme files](https://github.com/learnwithgurpreet/mac-dev-env-setup)
- [brew.sh](https://brew.sh/)
- [Oh My Zsh](https://ohmyz.sh/)
- [PowerLevel10k Theme](https://github.com/romkatv/powerlevel10k#oh-my-zsh)
- [zsh-autosuggestions plugin](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)
