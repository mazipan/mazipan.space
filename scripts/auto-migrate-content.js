import { existsSync, lstatSync, readdirSync, readFileSync, unlinkSync, writeFile } from 'node:fs';
import { join, resolve } from 'node:path';

const DRAFT_DIR = resolve('./src/draft');
const POST_DIR = resolve('./src/content/post');
const REGEX_HERO_IMAGE_2 = /heroImage2: \/thumbnail\/(.*)/gi;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function migrate() {
  const drafts = readdirSync(DRAFT_DIR);

  drafts.forEach((draftItem) => {
    const itemPath = join(DRAFT_DIR, draftItem);

    const isDir = lstatSync(itemPath).isDirectory();
    if (isDir) {
      const enDirPath = join(DRAFT_DIR, draftItem, 'en');
      if (existsSync(enDirPath)) {
        const indexEnMd = join(enDirPath, 'index.md.bak');

        if (existsSync(indexEnMd)) {
          const fileEnContent = readFileSync(indexEnMd, { encoding: 'utf-8' });

          const targetEnPath = join(DRAFT_DIR, `${draftItem}.mdx.bak`);
          console.error(`Writing new en file to `, targetEnPath);

          writeFile(targetEnPath, fileEnContent, function (err) {
            if (err) throw err;
            console.log('Success write en file');
            // Remove old md
            unlinkSync(indexEnMd);
          });
        }
      }

      const indexMd = join(itemPath, 'index.md');
      if (existsSync(indexMd)) {
        const fileContent = readFileSync(indexMd, { encoding: 'utf-8' });
        let newContent = fileContent;

        const match = fileContent.match(REGEX_HERO_IMAGE_2);
        if (match && match.length > 0) {
          const imagePath = match[0].replace('heroImage2: /thumbnail/', '');

          // Replace heroImage path
          newContent = newContent.replace(
            'poor-man-feature-flag/pexels-cottonbro-studio-5870547.jpg',
            imagePath
          );
          newContent = newContent.replace(REGEX_HERO_IMAGE_2, '');
        }

        const targetIdPath = join(POST_DIR, `${draftItem}.mdx`);
        console.error(`Writing new id file to `, targetIdPath);
        writeFile(targetIdPath, newContent, function (err) {
          if (err) throw err;
          console.log('Success write id file');
          // Remove old md
          unlinkSync(indexMd);
        });
      }
    }
  });
}

// eslint-disable-next-line no-useless-escape
const REGEX_IMAGE = /\!\[.*]\(.*\)/gi;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function migrateImage() {
  const postDirs = readdirSync(POST_DIR);

  postDirs.forEach((post) => {
    const postPath = join(POST_DIR, post);
    const isDir = lstatSync(postPath).isDirectory();
    if (!isDir) {
      if (existsSync(postPath)) {
        const fileContent = readFileSync(postPath, { encoding: 'utf-8' });
        let newContent = fileContent;

        const match = fileContent.match(REGEX_IMAGE);
        if (match && match.length > 0) {
          const newSrc = match[0].replace(/\/thumbnail\//gi, '../../content/post/_images/');

          newContent = newContent.replace(REGEX_IMAGE, newSrc);

          writeFile(postPath, newContent, function (err) {
            if (err) throw err;
            console.log('>>> ', postPath);
          });
        }
      }
    }
  });
}

async function migrateRedirect() {
  const postDirs = readdirSync(POST_DIR);

  let res = [];
  postDirs.forEach((post) => {
    const postPath = join(POST_DIR, post);
    const isDir = lstatSync(postPath).isDirectory();
    if (!isDir) {
      if (existsSync(postPath)) {
        const slug = post.replace('.mdx', '');
        res.push({
          source: `/${slug}`,
          destination: `/blog/${slug}`,
        });
      }
    }
  });

  writeFile(resolve('./redirect-new.json'), JSON.stringify(res, null, 2), function (err) {
    if (err) throw err;
  });
}

(async () => {
  await migrateRedirect();
})();
