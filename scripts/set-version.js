import data from '../package.json' with { type: 'json' };

async function set_version() {
  // eslint-disable-next-line no-console
  console.log('>> Set version to env var: ', data.version);
  process.env.APP_VERSION = data.version;
}

(async () => {
  await set_version();
})();
