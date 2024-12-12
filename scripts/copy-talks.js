import { execSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';

async function executeTask() {
  const talks = execSync(
    'curl https://raw.githubusercontent.com/mazipan/talks/master/all-talks.js'
  );

  const TARGET_PATH = resolve(`./src/constants/talks.ts`);
  const stream = createWriteStream(TARGET_PATH);

  stream.once('open', function (fd) {
    stream.write(talks);
    stream.end();
    // eslint-disable-next-line no-console
    console.log("✅ Success sync 'talks.ts' files");
  });
}

(async () => {
  await executeTask();
})();
