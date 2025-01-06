import { execSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';

async function executeTask() {
  const rawFile = execSync(
    'curl https://raw.githubusercontent.com/mazipan/awesome-sde-id-blogs/refs/heads/master/generated/data.ts'
  );

  const streamJs = createWriteStream(`./src/constants/friends.ts`);

  streamJs.once('open', function () {
    streamJs.write(rawFile);
    streamJs.end();

    // eslint-disable-next-line no-console
    console.log("✅ Success sync 'friends.ts' files");
  });
}

(async () => {
  await executeTask();
})();
