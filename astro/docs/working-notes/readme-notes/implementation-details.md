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

---

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
