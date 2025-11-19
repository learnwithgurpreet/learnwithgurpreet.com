module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Learn with Gurpreet',
  tagLine: 'Every space has a story',
  siteDescription:
    'I am working with Publicis Sapient as senior architect, experience engineering',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: {
    name: 'Gurpreet Singh', // i.e. Gurpreet Singh - page / blog author's name. Must be set.
    avatar: '/favicon.png',
    email: 'contact@gurpreetsingh.me', // i.e. contact@gurpreetsingh.me - email of the author
    website: 'https://www.gurpreetsingh.me' // i.e. https.://www.gurpreetsingh.me - the personal site of the author
  },
  creator: {
    name: 'Gurpreet Singh', // i.e. Gurpreet Singh - creator's (developer) name.
    email: 'contact@gurpreetsingh.me',
    website: 'https://www.gurpreetsingh.me',
    social: 'https://fosstodon.org/@GurpreetSingh'
  },
  themeColor: '#DD4462', //  Manifest: defines the default theme color for the application
  themeBgColor: '#FBFBFB', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  opengraph_default: '/assets/images/template/opengraph-default.jpg', // fallback/default meta image
  opengraph_default_alt:
    'Building a greener web: where code meets sustainability to shape a better digital future. 🌍🌱', // alt text for default meta image
  blog: {
    // RSS feed
    name: 'Learn with Gurpreet Blog',
    description:
      'Building a greener web: where code meets sustainability to shape a better digital future. 🌍🌱',
    // feed links are looped over in the head. You may add more to the array.
    feedLinks: [
      {
        title: 'Atom Feed',
        url: '/feed/feed.xml',
        type: 'application/atom+xml'
      }
    ],
    // Tags
    tagSingle: 'Tag',
    tagPlural: 'Tags',
    tagMore: 'More tags:',
    // pagination
    paginationLabel: 'Blog',
    paginationPage: 'Page',
    paginationPrevious: 'Previous',
    paginationNext: 'Next',
    paginationNumbers: true
  },
  details: {
    aria: 'section controls',
    expand: 'expand all',
    collapse: 'collapse all'
  },
  navigation: {
    ariaTop: 'Main',
    ariaBottom: 'Complementary',
    ariaPlatforms: 'Platforms',
    // activate alternative mobile menu with drawer
    drawerNav: false,
    navLabel: 'Menu'
  },
  themeSwitch: {
    title: 'Theme',
    light: 'light',
    dark: 'dark',
    initial: 'select'
  },
  greenweb: {
    // this goues into src/common/greenweb.njk
    providers: {
      // if you want to add more than one, edit the array directly.
      domain: 'netlify.com',
      service: 'cdn'
    },
    credentials: {
      // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
      domain: '',
      doctype: '',
      url: ''
    }
  },
  viewRepo: {
    // this is for the view/edit on github link. The value in the package.json will be pulled in.
    allow: true,
    infoText: 'View this page on GitHub'
  },
  buyMeACoffee: {
    allow: true,
    text: 'Buy me a coffee',
    link: 'https://www.buymeacoffee.com/gurpreet.singh'
  },
  easteregg: false,
  sw: true
};
