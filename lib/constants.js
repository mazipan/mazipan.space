const SITE_METADATA = {
  titleText: '<Mazipan />',
  title: 'mazipan.space',
  url: 'https://mazipan.space',
  description: 'Personal blog by Irfan Maulana (mazipan). Cover about frontend development, web performance, javascript, open source, and career tips.',
  author: {
    name: 'Irfan Maulana',
    avatar: 'https://mazipan.space/avatars/mazipan.png'
  }
}

const OG_IMAGE_HOME = `${SITE_METADATA.url}/meta/meta.png`
const OG_IMAGE_404 = `${SITE_METADATA.url}/meta/meta.png`
const OG_IMAGE_ABOUT = `${SITE_METADATA.url}/meta/meta.png`
const OG_IMAGE_TALKS = `${SITE_METADATA.url}/meta/meta.png`

const FEATURED_OSS = [
  {
    title: 'Ksana.in',
    desc: "Simple URL shortener/beautifier for free",
    repo: 'https://github.com/mazipan/ksana.in',
    url: 'https://ksana.in/',
    stacks: ['Supabase', 'Next.js', 'Chakra-UI']
  },
  {
    title: 'Learning.byphp.id',
    desc: "An online learning list held by PHPID Community",
    repo: 'https://github.com/phpid-jakarta/phpid-learning',
    url: 'https://learning.byphp.id/',
    stacks: ['Svelte', 'Tailwind CSS']
  },
  {
    title: 'Ajari Koding',
    desc: "Curated learning resources by Indonesian Creator",
    repo: 'https://github.com/phpid-jakarta/ajari-koding',
    url: 'https://s.id/ajari-koding',
    stacks: ['Svelte', 'Bootstrap 5']
  },
  {
    title: 'Baca-Quran.id',
    desc: "Web App to read The Holy Qur'an without Ads and Analytics",
    repo: 'https://github.com/mazipan/baca-quran.id',
    url: 'https://www.baca-quran.id/',
    stacks: ['Nuxt.js']
  },
  {
    title: 'Pramuka.Online',
    desc: "Currated learning materials around Indonesian Scout Activity (Pramuka)",
    repo: 'https://github.com/mazipan/pramuka.online',
    url: 'https://pramuka-id.vercel.app/',
    stacks: ['Next.js', 'Tailwind CSS']
  },
  {
    title: 'PSI Github Actions',
    desc: 'Github Action to generate web performance report for JAMStack using PageSpeedInsight',
    repo: 'https://github.com/mazipan/psi-gh-action',
    url: 'https://github.com/marketplace/actions/psi-gh-action',
    stacks: ['Github Actions', 'PageSpeedInsight']
  },
  {
    title: 'GraphQL PokeApi',
    desc: 'The GraphQL for PokeApi',
    repo: 'https://github.com/mazipan/graphql-pokeapi',
    url: 'https://graphql-pokeapi.vercel.app',
    stacks: ['GraphQl', 'Vercel']
  },
  {
    title: 'E-commerce Web Perf',
    desc: 'Web Perf Comparison for E-Commerce in Indonesia ',
    repo: 'https://github.com/mazipan/webperf-ecommerce-id',
    url: 'https://webperf-ecommerce-id.vercel.app/',
    stacks: ['Next.js', 'PageSpeedInsight']
  }
]

const CAREERS = [
  {
    company: 'Sayurbox',
    link: 'https://www.sayurbox.com/',
    location: 'Jakarta',
    title: '🥦 Software Development Engineer III',
    period: 'Jul 2022 - May 2023',
    long: '11 months',
  },
  {
    company: 'Tokopedia',
    link: 'https://www.tokopedia.com/',
    location: 'Jakarta',
    title: '🦉 Principal Engineer Web Platform',
    period: 'Jun 2019 - Jul 2022',
    long: '3 yrs 2 mos',
  },
  {
    company: 'Bizzy Indonesia',
    link: 'https://bizzy.co.id/',
    location: 'Jakarta',
    title: '💼 Software Architect Frontend',
    period: 'Feb 2019 - Jun 2019',
    long: '5 mos',
  },
  {
    company: 'Bizzy Indonesia',
    link: 'https://bizzy.co.id/',
    location: 'Jakarta',
    title: '💼 Software Development Engineer',
    period: 'Jul 2018 - Feb 2019',
    long: '7 mos',
  },
  {
    company: 'Blibli.com',
    link: 'https://www.blibli.com/',
    location: 'Jakarta',
    title: '👜 Sr. Software Development Engineer',
    period: 'Jan 2017 - Jun 2018',
    long: '1 yrs 6 mos',
  },
  {
    company: 'Blibli.com',
    link: 'https://www.blibli.com/',
    location: 'Jakarta',
    title: '👜 Software Development Engineer',
    period: 'Oct 2015 - Jan 2017',
    long: '1 yrs 4 mos',
  },
  {
    company: 'SML Technologies',
    link: 'https://smltech.co.id/',
    location: 'Jakarta',
    title: '☕️ Java Developer',
    period: 'Aug 2013 -Oct 2015',
    long: '2 yrs 3 mos',
  },
]

exports.SITE_METADATA = SITE_METADATA
exports.FEATURED_OSS = FEATURED_OSS
exports.CAREERS = CAREERS

exports.OG_IMAGE_HOME = OG_IMAGE_HOME
exports.OG_IMAGE_404 = OG_IMAGE_404
exports.OG_IMAGE_ABOUT = OG_IMAGE_ABOUT
exports.OG_IMAGE_TALKS = OG_IMAGE_TALKS
