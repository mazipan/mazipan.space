# Developer blog [nemanjamitic.com](https://nemanjamitic.com)

This is the repository for my coding blog [nemanjamitic.com](https://nemanjamitic.com). Free and open source, feel free to reuse code and customize for your own developer blog. Blog posts (future) require attribution.

## Mirrors

| Method       | Url                                      |
| :----------- | :--------------------------------------- |
| Nginx        | https://nemanjamitic.com                 |
| Github Pages | https://nemanjam.github.io               |
| Docker       | https://nmc-docker.arm1.nemanjamitic.com |

#### Plausible analytics

https://plausible.arm1.nemanjamitic.com/nemanjamitic.com

## Screenshots

https://github.com/user-attachments/assets/5bf85aee-a3bd-4ca0-9b6d-d5b4f555934b

<!-- ![Screenshot_1](/docs/screenshots/Screenshot_1.png) -->

## Features

- Latest Astro, static, high performance website
- Post and Project content collections
- Tailwind responsive design
- Color themes with light/dark modes
- Tags and Categories, pagination
- Optimized images, view transitions
- Extracted constants, types, utils, configs, queries, assets
- Full TypeScript, Zod schemas, validated config
- ESLint, Prettier, path aliases, sorted imports
- React for interactive components
- Remote markdown content option
- Design system pages, latest commit info in the footer
- Hierarchical layouts
- SEO friendly - sitemap, metadata
- Open Graph image, Satori generated
- Plausible analytics
- Code syntax highlighting, Twitter/YouTube/OG-links embeds
- Giscus comments, Share post
- Draft posts, RSS and JSON feeds
- GitHub Pages, Nginx, x86 and arm Docker deployments
- GitHub Actions workflows and local scripts

## Motivation

By the end of 2023. I started thinking about capturing insights from my usual daily coding work into rounded blog articles, so I started looking for a clean, minimalistic and well structured blog template. I started researching and considered Jekyll, Hugo, Next.js but eventually realized that currently Astro is the best tool for a static, personal website.

Then I researched and reviewed all open source Astro examples that I could find with intention to reuse it and just customize styles but none of them met my preference for code structure and desired features, so I decided to compile the best parts from all of them into a structure and coding style of my own liking. See the [Credits](#credits) section bellow.

I intend to use this website for years to come, so I consider the extra effort well spent. Additionally, it helped me gain some practical experience with Astro in the process.

## Installation

#### Environment variables

In development you can see draft posts by default.

```bash
# .env.development

# this var is always without trailing slash '/'
SITE_URL=http://localhost:3000
```

```bash
# .env.production

SITE_URL=https://nemanjamitic.com

# set to true to preview draft posts in production
PREVIEW_MODE=
```

#### Development

```bash
# install packages
yarn install

# copy and set environment variables
cp .env.development.example .env.development

# run development server and visit http://localhost:3000
yarn dev

# delete node_modules and yarn.lock
yarn clean
```

#### Production

```bash
# copy and set environment variables
cp .env.production.example .env.production

# build website
yarn build

# run website and visit http://localhost:3000
yarn start
```

## Deployment

There are three deployment methods available locally and in Github Actions. You can always easily identify currently deployed version by checking **the latest commit info in the footer** of the deployed website.

For Github Actions workflows you will need to set these secrets in your Github repository settings:

```bash
# Dockerhub user and pass
DOCKER_PASSWORD
DOCKER_USERNAME

# remote server ssh credentials
REMOTE_HOST
REMOTE_KEY_ED25519
REMOTE_PORT
REMOTE_USERNAME
```

For local deployments you will need to set SSH alias for the remote server, in your local SSH config file, for example:

```bash
# /home/username/.ssh/config

# arm1 ssh alias for remote server
Host arm1 123.123.13.123
    HostName 123.123.13.123
    IdentityFile ~/.ssh/my-servers/arm1-ssh-private-key.key
    User your-user
```

### 1. Nginx

All Nginx deployments come down to building the website and copying the compiled files from the `/dist` folder into the Nginx web root folder on a remote server.

#### Local

```bash
# package.json

# set your SITE_URL
"build:nginx": "SITE_URL='https://nemanjamitic.com' astro build",

# build the app
yarn build:nginx

# configure ssh for your own "arm1" remote server in /home/username/.ssh/config

# copy compiled app from local /dist folder to Nginx web root on the remote server
"deploy:nginx": "bash scripts/deploy-nginx.sh '~/traefik-proxy/apps/nmc-nginx-with-volume/website' arm1",

# run deploy
yarn deploy:nginx
```

#### Github Actions

Just trigger one of the following workflows:

```bash
# .github/workflows

bash__deploy-nginx.yml

default__deploy-nginx.yml
```

### 2. Github Pages

Only available in Github Actions. Just trigger one of the following workflows:

```bash
# .github/workflows

# uses official Astro action
gh-pages__deploy-astro.yml

# uses manual build, useful for Astro in monorepos
gh-pages__deploy-manual.yml
```

### 3. Docker

#### Local

To build `linux/arm64` Docker images locally if you have x86 computer you will need to install Qemu and Buildx locally, see this tutorial:

[Multi-Arch Images with Docker Buildx and QEMU](https://drpdishant.medium.com/multi-arch-images-with-docker-buildx-and-qemu-141e0b6161e7)

If you are on Ubuntu you will probably need to run this too.

```bash
# Register QEMU for Docker
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
```

After that you can build and push multi-platform images locally.

```bash
# package.json

# open terminal and login with your Dockerhub account, both locally and on remote server
docker login my-user my-pass

# replace "nemanjamitic/nemanjam.github.io" with your image name
# set ARG_SITE_URL_ARM64 to your production url
# set correct architecture for your production server --platform linux/arm64 or linux/amd64
"docker:build:push:arm": "docker buildx build -f ./docker/Dockerfile -t nemanjamitic/nemanjam.github.io --build-arg ARG_SITE_URL_ARM64='https://nmc-docker.arm1.nemanjamitic.com' --platform linux/arm64 --progress=plain --push .",

# build and push Docker image, replace "arm" with your architecture
yarn docker:build:push:arm

# replace "~/traefik-proxy/apps/nmc-docker" with your path to docker-compose.yml
# replace "nemanjamitic/nemanjam.github.io" with your image name
"deploy:docker": "bash scripts/deploy-docker.sh arm1 '~/traefik-proxy/apps/nmc-docker' nemanjamitic/nemanjam.github.io",

# pull and run latest image on your production server
yarn deploy:docker
```

#### Github Actions

Just trigger these workflows:

```bash
# .github/workflows

# build and push Docker image
default__build-push-docker.yml

# pull and run latest Docker image
# trigger one of the following:
bash__deploy-docker.yml
default__deploy-docker.yml
```

## Implementation details

A great care is devoted to a solid, clear, comprehensive, understandable, maintainable and customizable code structure. The intention behind this is to keep things separated, clear, readable and obvious and to reduce complexity and noise.

Below is a more detailed overview of the features and their implementations:

#### Astro

This statically generated, high performance, latest Astro website. It has Post and Project content collections with `.mdx` files and they serve as a main model of the app. Both Tags (1:N) and Categories (1:1) are supported for relations between Posts. View transitions are enabled and posts are animated across all the pages using `transition:name` props. Images are Astro optimized and all image sizes are extracted as reusable constant presets for consistency and reducing overhead. Pagination is available for both Post and Project list pages. Preview mode is available either with `astro preview` script or by setting `PREVIEW_MODE=true` in `.env.production`. RSS and Json feeds are implemented as static API endpoints. There is a React integration for all components that require client side interactivity.

#### Structure

Configurations for integrations and plugins are extracted to keep `astro.config.ts` clean and readable. All website routes are centralized into a single constant object, same for file paths. Layers are separated and organized hierarchically and support both centered and full-width layouts for all types of pages: 1. `.mdx` pages, 2. collections pages - Post and Project, and 3. List pages - indexes with pagination. Querying main application models - Post and Project content collections is extracted into the `/modules` folder for clean and readable `getStaticPaths()`.

#### Styling

There is a support for both light/dark Tailwind modes and color themes with semantic colors. Themes are stored into separate files as CSS variables organized in two levels. Responsive styling is supported for both spacings and typography. All CSS code is organized into three Tailwind layers (base/components/utilities). There is a worked out system for keeping typography styles in sync between markdown content ( `tailwindcss/typography` plugin and `prose` class) and custom components. Typography styles are customized and abstracted into a custom `my-prose` class. Most of component styles are extracted into a CSS files and use `class-variance-authority` for variants. Dynamic class names are implemented using `tailwind-merge` and `clsx`.

#### SEO and Metadata

Metadata is centralized and typed or all types of pages (`.mdx`, collections and lists) with defaults as fallback. There is an API endpoint for generating Open Graph images with hero image and random color gradient using Satori and html template applied to each page. Sitemap is generated at build-time using official integration. Custom styled 404 page is provided.

#### Website

There is an organized assets structure for both optimized (`/src`) and un-optimized (`/public`) images with provided defaults. For icons is used `astro-icon` package supporting both material design (`mdi`) icons and local SVG's. For filtering posts there are the following paginated pages: by tag - `/tags`, by category - `/categories`, by both - `/explore` - Explore (Archive) page. Navbar has items stored as an array and has styled active item for the current route. There is a component for table of contents for blog posts that reads hierarchy of sub-headers from the markdown content.
A design system with `.mdx` pages is available at the `/design` path, providing a clear preview and debugging of all visual components. Share component for sharing Posts supports Twitter, Facebook, Reddit, LinkedIn and Hackernews.

#### External libraries

Comments are done with Giscus and have dark mode is synced with the main theme. Embedding Tweets, YouTube and Vimeo videos, and Open Graph links is done with `astro-embed`. Syntax highlighting for the embedded code is implemented using `expressive-code`integration.

#### Types and code quality

All code is written in Typescript, types for the entire app are located in a separate folder. There are centralized Zod schemas for Post, Project and Config models with proper defaults to prevent runtime exceptions. Both config and environment variables are typed and build-time validated. There are abstracted types for Post and Project collection models that can include additional fields like calculated reading time.

`tsconfig.json` has defined path aliases for clean and organized imports. Code is formatted using Prettier with sorted imports and ESLint is used for syntax checking.

#### Deployment

Latest git commit info is included in the website footer for easy identification of the currently deployed version. There are three methods for production deployments: 1. Github Pages, 2. Nginx and 3. Docker image and all of them are supported both in Github Actions and locally. Assets copying for Nginx and building Docker images are abstracted into bash scripts and reused in both Github Actions and local deployments for easier local debugging. There is a support for building both `linux/amd64` and `linux/arm64` Docker images.

## Roadmap

- Component to float text around images
- Add accessibility attributes
- Fix View transitions flash in Firefox dark theme - done
- Add analytics - done
- Add image gallery page - done
- Add remote markdown page - done
- Validate config with `astro:env` - done
- Render `.mdx` for RSS using component containers
- Review and improve ESLint, (strictest) Typescript and Prettier configs
- Improve visual design
- Restructure content folders
- Update to Astro content layer

## Credits

The most important projects, examples, demos, resources that I reused and reviewed:

- Starter project, initial structure, some components, some plugins, integrations, libs, styling choices - repo: [paularmstrong/paularmstrong.dev](https://github.com/paularmstrong/paularmstrong.dev), blog: https://paularmstrong.dev/blog
- Navbar responsive menu, theme toggling - repo: [chrismwilliams/astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus), demo: https://astro-cactus.chriswilliams.dev/posts
- Astro collections schemas, some visual design decisions - repo: [billy-le/billyle.dev](https://github.com/billy-le/billyle.dev), blog: https://billyle.dev
- Giscuss comments, Satori og-image - repo: [thomasledoux1/website-thomas-astro](https://github.com/thomasledoux1/website-thomas-astro) , blog: https://website-thomas-astro.vercel.app, repo: [TkDodo/blog](https://github.com/TkDodo/blog), blog: https://tkdodo.eu/blog
- Deployment with Docker and Nginx - docs: https://docs.astro.build/en/recipes/docker
- PostCard component design - site: https://flowbite.com/blocks, demo: https://mistral.bloggrify.com
- PostCardSmall component design - demo: https://epoxia.bloggrify.com/archives
- Design inspiration and reference - https://hashnode.com, https://medium.com, https://dev.to, https://www.developerway.com
- Tailwind themes, dark mode, CSS structure, semantic colors - site: https://daisyui.com, repo: https://github.com/saadeghi/daisyui

#### Other credits

Other projects, examples, demos, resources that I reused and reviewed:

- Repo: [surjithctly/astroship](https://github.com/surjithctly/astroship), demo: https://astroship.web3templates.com
- Repo: [satnaing/astro-paper](https://github.com/satnaing/astro-paper), demo: https://astro-paper.pages.dev/posts
- Repo: [onwidget/astrowind](https://github.com/onwidget/astrowind), demo: https://astrowind.vercel.app
- Repo: [JustGoodUI/ovidius-astro-theme](https://github.com/JustGoodUI/ovidius-astro-theme), demo: https://ovidius-astro-theme.netlify.app
- [one-aalam/astro-ink](https://github.com/one-aalam/astro-ink)
- Repo: [treefarmstudio/odyssey-theme](https://github.com/treefarmstudio/odyssey-theme), demo: https://odyssey-theme.sapling.supply
- Official blog example project - repo: [withastro/astro/tree/main/examples/blog](https://github.com/withastro/astro/tree/main/examples/blog)
- Gatsby example - repo: [alxshelepenok/gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen), demo: https://lumen.alxshelepenok.com
- Shadcn Astro - repo: [mickasmt/astro-nomy](https://github.com/mickasmt/astro-nomy)
- Without Tailwind - repo: [rezahedi/rezahedi.dev](https://github.com/rezahedi/rezahedi.dev) , blog: https://rezahedi.dev
- Vue - demos: https://bloggrify.com/templates
- Keystatic CMS - repo: [simonswiss/simonswiss.com](https://github.com/simonswiss/simonswiss.com), blog: https://simonswiss.com
- Tailwind designs and gradients - site: https://tailwindui.com/templates
- Next.js - repo: [SSTPIERRE2/stephenstpierredotcom](https://github.com/SSTPIERRE2/stephenstpierredotcom)
  , blog: https://stephenstpierre.com/blog
