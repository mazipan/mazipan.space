interface CSSModule {
  [className: string]: string;
}

declare module '*.module.scss' {
  const cssModule: CSSModule;
}

declare module '*.module.css' {
  const cssModule: CSSModule;
}

declare module 'rehype-react' {
  interface RehypeOptions {
    createElement: any;
    components: any;
  }
  class RehypeReact {
    Compiler: any
    constructor(options: RehypeOptions);
  }
}

type TagEdges = Array<{
  node: {
    id: string;
    description?: string;
    image?: {
      childImageSharp: {
        fluid: any;
      };
    };
  };
}>;

type Logo =  {
  childImageSharp: {
    fixed: any;
  };
};

type Author = {
  id: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  location?: string;
  // eslint-disable-next-line @typescript-eslint/camelcase
  profile_image?: {
    childImageSharp: {
      fluid: any;
    };
  };
  bio?: string;
  avatar: {
    childImageSharp: {
      fluid: any;
    };
  };
};

interface PageContext {
  excerpt: string;
  lang?: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    title: string;
    date: string;
    draft?: boolean;
    lang?: string;
    tags: string[];
    author: Author;
  };
}

interface IndexProps {
  pageContext: {
    lang: string;
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: Logo;
    header: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

interface MarkdownRemark {
  html: string;
  htmlAst: any;
  excerpt: string;
  timeToRead: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    userDate: string;
    lang?: string;
    enready?: string;
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    tags: string[];
    author: Author;
  };
}
interface PageTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    logo: Logo;
    allTagYaml: {
      edges: TagEdges;
    };
    markdownRemark: MarkdownRemark;
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

interface AuthorTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    author: string;
  };
  data: {
    logo: Logo;
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    authorYaml: Author;
  };
}

interface TagTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    tag: string;
  };
  data: {
    allTagYaml: {
      edges: TagEdges;
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}
