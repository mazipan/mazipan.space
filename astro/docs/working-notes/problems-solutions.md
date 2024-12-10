1.

- problem: tailwind is double loaded
- solution: when loading with custom directives (@layer base) disable default base loading in astro.config.mjs

```ts
// in astro.config.mjs
// applyBaseStyles: false prevents double loading of tailwind
tailwind({ applyBaseStyles: false }),
```

generated og images, yarn build
21:12:39 ├─ /api/open-graph/blog/2024-01-20-example-article-4.png (+668ms)
21:12:40 ├─ /api/open-graph/blog/2024-01-19-example-article-3.png (+582ms)
21:12:41 ├─ /api/open-graph/blog/2024-01-17-example-article-2.png (+523ms)
21:12:41 ├─ /api/open-graph/blog/2024-01-16-example-article-1.png (+576ms)
21:12:42 ├─ /api/open-graph/projects/2024-02-16-example-project-3.png (+551ms)
21:12:42 ├─ /api/open-graph/projects/2024-02-15-example-project-2.png (+517ms)
21:12:43 ├─ /api/open-graph/projects/2024-02-13-example-project-1.png (+518ms)
21:12:43 ├─ /api/open-graph/pages/404.png (+522ms)
21:12:44 ├─ /api/open-graph/pages/about.png (+4ms)
21:12:44 ├─ /api/open-graph/pages.png (+578ms)
21:12:44 ├─ /api/open-graph/pages/resume.png (+4ms)
21:12:44 └─ /api/open-graph/pages/styleguide.png (+581ms)

---
