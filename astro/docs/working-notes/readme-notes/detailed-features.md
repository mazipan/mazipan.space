

## Features

The greatest care is devoted to a solid, clear, comprehensive, understandable, maintainable and customizable code structure.

#### Astro

- Latest Astro, statically generated, high performance
- Post and Project content collections for `.mdx` content
- Support for both Tags (1:N) and Categories (1:1) relations
- Astro view transitions that track Post across all the pages
- Astro optimized images with all image sizes and breakpoints centralized into a single place as constants
- Pagination for both blog and projects pages
- Environment variable controlled preview mode for draft posts and projects
- RSS and Json feed endpoints
- Enabled React integration for components that require client side interactivity

#### Structure

- Extracted configuration for integrations and plugins to keep `astro.config.ts` clean and readable
- All website routes centralized into a single constant object
- All file system paths centralized into a single constant object
- Clear, separated, hierarchical, both centered and full-width layouts for all types of pages:`.mdx` pages, collections pages - Post and Project, and List pages - indexes with pagination
- Extracted logic for querying content collections for clean and readable `getStaticPaths()`

#### Styling

- Both dark mode support, light/dark Tailwind modes and color themes support, semantic colors
- Themes stored into separate files as CSS variables organized in two levels
- Tailwind responsive styling, both spacings and typography
- Three layer (base/components/utilities) CSS code organization
- System for keeping typography styles in sync between markdown (prose) and custom components
- Customized typography plugin prose class
- Component styles extracted into CSS files with `class-variance-authority` for variants
- `tailwind-merge` and `clsx` for dynamic class names

#### SEO and Metadata

- Centralized and typed metadata for all types of pages, with defaults
- Open Graph image endpoint with Satori template generated images for all pages with hero image and random gradient background
- Sitemap generated at build-time
- Custom styled 404 page

#### Website

- Organized assets structure for both optimized (`/src`) and un-optimized (`/public`) images with extracted defaults
- `astro-icon` package supporting both material design (`mdi`) icons and local SVG's
- Paginated list pages for filtering posts: by tag - `/tags`, by category - `/categories`, by both - `/explore` - Explore (Archive) page
- Collapsible navbar with items stored as array and active item for the current route
- Table of contents for blog posts
- Design system with `.mdx` pages available at `/design` path for clear preview and debugging of all visual components
- Share component supporting Twitter, Facebook, Reddit, LinkedIn and Hackernews

#### External libraries

- Comments with Giscus and dark mode support
- `astro-embed` for embedding tweets, YouTube and Vimeo videos, and Open Graph links
- Embedded code syntax highlighting using `expressive-code`integration

#### Types

- Fully Typescript, all types are located in a separate folder
- Centralized Zod schemas for Post, Project and Config models with proper defaults to prevent runtime exceptions
- Fully typed and build-time validated config and environment variables
- Abstracted Post and Project collection models that can include additional fields like calculated reading time

#### Development

- Typescript path aliases for clean and organized imports
- Prettier formatting with sorted imports
- ESLint syntax checking

#### Deployment

- Latest git commit info is included in the website footer for easy identification of the currently deployed version
- Production deployments with Github Pages, Nginx and Docker image
- All three deployment methods are supported both in Github Actions and locally
- The same bash scripts reused for both Github Actions and local deployments for easy debugging locally
- Support for building both `x86` and `arm` Docker images

## Installation and running

### Development

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

### Production

```bash
# copy and set environment variables
cp .env.production.example .env.production

# build website
yarn build

# run website
yarn start
```

## Deployment

```bash

# deploy local /dist folder to the remote Nginx server
yarn deploy:nginx
```

## Roadmap

- Add accessibility attributes, semantic html
- Add image gallery page
- Add remote markdown page
- Validate config with `astro:env`
- Render `.mdx` for RSS using component containers
- Review and improve ESLint, (strictest) Typescript and Prettier configs
- Improve visual design
