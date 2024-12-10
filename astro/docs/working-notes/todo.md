- setup mdx
- setup tailwind theme
- github actions
- turbo, vscode, docker
- turbo https://github.com/vercel/turbo/tree/main/examples
- configs https://github.com/kyr0/turbo-hybrid-astro-on-vercel
- astro prettier https://gist.github.com/JLarky/b26a165d628984723fe285201ca699e5
- eslint and typescript config from here https://github.com/vercel/turbo/tree/main/examples/with-yarn

main problem was this:

```ts

// this fails
extends: ['eslint-config/.eslintrc.js'],

this works
// This ensures that ESLint can find the config file regardless of the working directory.
extends: [require.resolve('eslint-config/.eslintrc.js')],
```

it's related from where eslint is called // to

in this repo eslint, prettier configs are global
https://github.com/kyr0/turbo-hybrid-astro-on-vercel
"lint": {},
package.json main, bin
root: true, // this is how it accepts relative path
where is relative path set?

in this they work per package
https://github.com/vercel/turbo/tree/main/examples/with-yarn
"lint": {
"dependsOn": ["^lint"] // this is just order, or run all independently
},
eslintignore in root
package.json files

what is better?
if it calls only config file or package

decided:
prettier global, eslint per package,

---

- only for prettier config https://gist.github.com/JLarky/b26a165d628984723fe285201ca699e5
- all other configs, eslint, typescript, tailwind from here https://github.com/vercel/turbo/tree/main/examples/with-yarn

so you can run lint format per package...
everything should be decoupled and modular, reusable, packages // this, important
you should see separate logs per package in console

---

## packages in /packages have prefix @repo/ for easier recognizing in dependencies

react and astro components can be together only in /src folder, in packages must be separate

astro examples, mdx, ssr..., important
https://github.dev/withastro/astro/tree/main/examples/blog

---

error in tsconfig.json file can not find astro image from compilerOptions
solution: open some .ts file to restart typescript server // general to restart ts server in vs code

---

## in tsconfig.json "types": ["vite/client"] is same as in env.d.ts ...

## merge tsconfig.json files?

## types.d.ts types become global, no need for imports

---

make bin and . for eslint same as prettier, and move ignore files in package, done
nothing global
main or bin is entry point of package
remove shell -> js -> shell to script.sh and call it in bin: // no, js easier than shell

---

## write github actions for deploy, 1. copy to nginx, 2. build docker image, 3. lint, format, typecheck

decap cms docker
https://github.com/itsmejoeeey/docker-decap-cms-standalone
https://www.reddit.com/r/selfhosted/comments/110elej/selfhosting_netlify_cms/?sort=confidence

---

todo: write dockerfile for nemanjamiticcom, adjust for monorepo
need to have app working with monorepo to do docker and github action deploy

---

## fix and test turbo build

integrate tailwind-config package with astrowind

prettier sorting imports

---

## every .gitignore manages only its level (package) or root

marge env vars and yaml
https://dev.to/emekaofe/how-to-pass-environment-variables-to-a-yaml-file-in-a-nodejs-application-using-ejs-templating-engine-ib7

add ssh keys again for nginx action, done

write zod validation for env vars
add rand string to test redeploy
on remove folder scp-action must restart nginx, fix this, done

Only build time variable **important**. Can be undefined in prod runtime.

```bash
PUBLIC_SITE_HOSTNAME=https://nemanjamitic.com
```

- clean up utils folder

- compare implementation of utils folders with all other astro examples
- write types folder with models
- integrations folder for task for sitemap on build
- maybe use classes
- functions dont return types
- css colors in config?
- js code in script tags, theme...
- ts absolute paths imports
- move components to packages, remove unneeded
- rename to BaseLayout
- prettier sort imports // this, shadcn
- astro.config.ts, fix types in astro.config.ts and integration/tasks.ts
- rewrite all types, config, etc
- lib folder
- mdx prettier fails
- it doesnt have pagination
- move prop types
- different collections and types in future, projects...
- review astro components (state) in other projects

#### From readme

- images - `public/` directory if they do not require any transformation or in the `assets/ directory`` if they are imported directly
- rtl - right to left, arabic language
- unpic generates query parmas for image url `bath.jpeg?width=800&height=600&crop=center`

```ts
import { transformUrl } from 'unpic';

const url = transformUrl({
  url: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
  width: 800,
  height: 600,
});

console.log(url.toString());
// https://cdn.shopify.com/static/sample-images/bath.jpeg?width=800&height=600&crop=center
```

- add globes for include u tsconfig
- poenta: include, exclude, base, paths ne ide u base tsconfig.json // zapazi

```bash
"**/*.ts",
"**/*.tsx",
```
