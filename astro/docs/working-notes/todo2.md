```tsx
// name blog files like this
src/content/blog/2022-10-14-tech-design-template.mdx

---

<Picture /> is for statically hosted images from public directory

import { Image } from 'astro:assets';
<Image /> is for imported images from src/images/blog

maybe :port breaks getStaticPaths slug route
http://localhost:3000/

solution:
it was trailing slash /, damn, trivial
http://localhost:3000/blog/2024-01-16-example-article-1/

it was this in `astro.config.mjs`
trailingSlash: 'always', // default 'ignore'

---

-------- add .env file for dev and prod and vars with zod validation
-------- pagination still not working [...page].astro blog/1 unhandled
redesign navbar, color palette and all other components
giscuss
rewrite solid to react
move components to monorepo
tags, categories?
extract tailwind from plugins to css files
it doesnt have og:image, must reuse it from other project
also doesnt have search
extract post card component
print tags and category in PageInfo component in article
for tags and categories use design from astrowind
tags and category pages
add codesandbox embed
what in shared tailwind.config.ts what in blog? fix .js, .mjs, .ts for tailwind and postcss
use styles from other theme
search prose examples
style card, navbar
put Config in import.meta.env
date-fns
make color palette for text, muted, active...
// astro-paper
https://github.com/satnaing/astro-paper/blob/main/src/styles/base.css
https://github.com/satnaing/astro-paper/blob/main/tailwind.config.cjs
extract all css in separate files and import them

---

// astro-theme-cactus
https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/styles/global.css
https://github.com/chrismwilliams/astro-theme-cactus/blob/main/tailwind.config.ts

// shadcn
https://github.com/shadcn-ui/taxonomy/blob/main/styles/globals.css
https://github.com/shadcn-ui/taxonomy/blob/main/tailwind.config.js

// astrowind, trivial
https://github.com/onwidget/astrowind/blob/main/src/components/CustomStyles.astro
https://github.com/onwidget/astrowind/blob/main/tailwind.config.cjs

---

global styles should be included in apps/nemanjamiticcom/src/components/BaseHead.astro
PostCard has standalone styles, doesn't depend on prose in page
semantic html cheatsheet

---

semantic colors for text and brand
og images from cactus, paularmstrong has all components
extract configurations in separate files from tailwind.config.ts

---

Link component only styles here, Astro Link component, other examples?
organize <Prose /> usage
jedan prose u root srusi sav spacings i paddings

reuse color vars and semantic vars from alxshelepenok/gatsby-starter-lumen

---

choose colors for category, links hover, visited
dark:link styles
card final styles, show all components in styleguide
rewrite bustout float with negative margin
style collapsible navbar, footer
define semantic color palette
read astro transitions docs transition:name={`content-${slug!.replace(/.*\//, '')}`}
[...page].tsx and [slug].tsx handle getStaticPaths and page, extract components
reuse og image generation https://github.com/paularmstrong/paularmstrong.dev/commit/e073bb5a20c94f91273f102f43445dce46115012
clean up layout container to be minimal, gledaj gotov html u browser
style tag button
set aspect ratio to image

src/pages/blog/[slug].astro
share alert, extract in component
more posts, extract in component
make skeletons
lot of work on styling
twMerge
    dupli tailwind css u browser? - solved, applyBaseStyles: false in astro.config.mjs
radix themes maybe? radix with astro?

---

responsive navbar
https://github.dev/Taofiqq/navbar-react-css
https://blog.logrocket.com/create-responsive-navbar-react-css/

decide semantic colors for links, tags, neutral... and choose colors
black, white, gray, primary
add tag and category to info alert
clean up and fix markup in blog/[slug].astro
use radix-ui primitives for all components
heading component from radix-ui
extract components, widgets folder
class_ variance authority maybe
    add date-fns and write util functions
fix theme switch


// another example astro blog shadcn
https://github.com/mickasmt/astro-nomy

// serbian, bezveze, prazno
https://github.com/ekmas/minimal

// semantic colors explained
https://github.com/treefarmstudio/odyssey-theme

// dobar dizajn, shadows, gradients
https://sayvio.ai/discover
// to je odavde
https://salient.tailwindui.com/

// linkedin blog posts, example
https://www.linkedin.com/pulse/react-19-beta-now-available-npm-iii-amigoes-qpjke/

// tailwind swiss guy, keystatic, very simple
https://github.com/simonswiss/simonswiss.com

// vue tailwind
https://bloggrify.com/templates
https://mistral.bloggrify.com/

// related articles
https://the-green-chronicle.esteban-soubiran.site/articles/the-organic-chronicles-transitioning-to-chemical-free-farming

// two columns design
https://github.com/TailGrids/play-astro

// astro docs blog, prose font sizes and margins
https://astro.build/blog/

// clean white design
https://argos-ci.com/blog
// public github repo
https://github.com/argos-ci/argos-ci.com

// medium, excellent design
https://medium.com/@mgechev

// have look, accessibility
https://github.com/markteekman/accessible-astro-starter

// another
https://github.com/saicaca/fuwari

// big project, chinese guy, has astro and next.js branches
https://github.dev/syhily/yufan.me

// interesting design
https://github.com/joshmedeski/joshmedeski.com

// clean styles, no github repo
// astrowind zapravo data-aw-social-share
https://thezal.dev/blog/

// notion cms
https://feather.so/showcase
https://bhanuteja.dev/blog
https://x.com/tibo_maker

// minimalistic, narrow column, good animations
https://github.com/markhorn-dev/astro-nano

// no images, astro db
https://github.com/flavienbonvin/flavien-bonvin

// excellent css, wide column
https://lea.verou.me/
https://lea.verou.me/blog/2023/going-lean/#public-or-private-repo%3F

// astro, looks good
analytics, internationalisation, github issue template, small project
https://github.com/wanoo21/tailwind-astro-starting-blog

// good blog design
https://www.builder.io/blog/react-intersection-observer

// excellent resume page
https://github.com/tjklint/tjklint.github.io

// next.js, good gradients and framer motion
https://github.com/kristianka/kristiankahkonen.com

// excellent styling, vite, svelte core member
https://bjornlu.com/
https://github.com/bluwy/website

// google tag manager, partytown
https://github.com/devaradise/devolio

// perfect design
https://github.com/theodorusclarence/theodorusclarence.com

-----------
za local state mora react ili solid
for state between pages nanostore with localStorage

// fixes Image component
yarn add sharp --ignore-engines

widths of all pages and navbar and responsive
HeaderLinks remove buttons
black typography, hover, underline, semantic colors, color palette, text, links
tailwind config, layer components
post info component
improve monorepo
extract blog from monorepo and separate, github actions
    extract functions and jsx in pages/blog/[slug].astro

    tags and categories pages
    tags, categories links
breadcrumb component for tags and categories
projects, resume md pages
fix console hydration errors
prettier remove unused imports
----
metadata, og image
meta for each page - title...
sitemap.xml
----
    tsconfig path aliases @
extract types folder
put images in folder beside markdown files
----
    add updatedDate to frontmatter and to schema
default description empty string, improve zod schema
put default instead of optional in zod schema
hashnode, dev.to za dizajn komponenti
table of contents and image width in blog post
astro transitions
clean up my ui/Text ui/Heading components - te su za sajt? gde nije prose md, bolje @layer
----
add few color themes, and design css to support it
zapravo i routed pages (about, home...) use markdown and prose
neka description bude string, a ne nested html da moze bez prose
zapravo i pages su u .mdx, jako malo p i h1, h2 su van mdx i prose, samo navbar i par komponenti
1 tag (h1, p) - css klasa, vise html tagova - komponenta // zapazi
    extract routes constants
    rename blog collection to post, post, project
replace relative paths in imports
implement projects layout
    extract getStaticPaths body // not possible, it has filters and logic
handle layouts and metadata properly
line-clamp-3 for description
write styleguide as blog post, cactus
images folder?
loaders and skeletons
fix layouts structure
----
post - astrowind, cactus
blog - astro-paper
description string without md - astrowind, cactus, astropaper
----
// billyle.dev, najbolje
animacije transform, 3d
tags validation
schemas/post, posts/, config
autoresize image from unsplash setImageProviderParams()
types
image u frontmatter mu je ogImage i hero image
ima autogenerate ogImage with hero image and text
import { Picture, Image } from "astro:assets"; ??
-----
// paularmstrong.dev
astro transitions
mermaid md plugin for diagrams, client <script />
plugins/remark-mermaid.ts
"mermaid": "^10.8.0",
"rehype-mermaid": "^2.1.0",
visual je prilika za originalan blog, lydia hallie
-------------
image as object in post schema, arg in function_, maybe not bad
reminder - run yarn sync:nmc when updating schemas or types
nijedan nema routing /blog/tags/[tag] svi imaju /tags/[tag]
zapravo samo astrowind ima nested tags i categories rute
```
