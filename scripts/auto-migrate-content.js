import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const DRAFT_DIR = resolve('./src/draft');
const POST_DIR = resolve('./src/content/post');
const REGEX_HERO_IMAGE_2 = /heroImage2: \/thumbnail\/(.*)/gi;

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

          try {
            const targetEnPath = join(DRAFT_DIR, `${itemPath}.mdx.bak`);
            writeFileSync(targetEnPath, fileEnContent, { encoding: 'utf-8' });
            // Remove old md
            unlinkSync(indexEnMd);
          } catch (error) {
            console.error(`Error writing new en file: `, error);
          }
        }
      }

      const indexMd = join(itemPath, 'index.md');
      if (existsSync(indexMd)) {
        const fileContent = readFileSync(indexMd, { encoding: 'utf-8', flag: 'w+' });
        let newContent = fileContent;

        const match = fileContent.match(REGEX_HERO_IMAGE_2);
        if (match.length > 0) {
          const imagePath = match[0].replace('heroImage2: /thumbnail/', '');

          // Replace heroImage path
          newContent = newContent.replace(
            'poor-man-feature-flag/pexels-cottonbro-studio-5870547.jpg',
            imagePath
          );
          newContent = newContent.replace(REGEX_HERO_IMAGE_2, '');
        }

        try {
          const targetPath = join(POST_DIR, `${itemPath}.mdx`);
          writeFileSync(targetPath, newContent, { encoding: 'utf-8', flag: 'w+' });
          // Remove old md
          unlinkSync(indexMd);
        } catch (error) {
          console.error(`Error writing new id file: `, error);
        }
      }
    }
  });
}

(async () => {
  await migrate();
})();
