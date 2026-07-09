import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

async function executeTask() {
  let talks;
  try {
    talks = execSync(
      'curl -f --silent --show-error https://raw.githubusercontent.com/mazipan/talks/master/all-talks.js'
    );
  } catch {
    // eslint-disable-next-line no-console
    console.warn("⚠️  Failed to fetch talks.ts (rate-limited or network error) — keeping existing file");
    return;
  }

  writeFileSync(resolve('./src/constants/talks.ts'), talks);
  // eslint-disable-next-line no-console
  console.log("✅ Success sync 'talks.ts' files");
}

(async () => {
  await executeTask();
})();
