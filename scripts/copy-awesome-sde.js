import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

async function executeTask() {
  let rawFile;
  try {
    rawFile = execSync(
      'curl -f --silent --show-error https://raw.githubusercontent.com/mazipan/awesome-sde-id-blogs/refs/heads/master/generated/data.ts'
    );
  } catch {
    // eslint-disable-next-line no-console
    console.warn("⚠️  Failed to fetch friends.ts (rate-limited or network error) — keeping existing file");
    return;
  }

  writeFileSync('./src/constants/friends.ts', rawFile);
  // eslint-disable-next-line no-console
  console.log("✅ Success sync 'friends.ts' files");
}

(async () => {
  await executeTask();
})();
