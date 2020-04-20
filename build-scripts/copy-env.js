const fs = require('fs');
const path = require('path');
const appRootDir = require('app-root-dir').get();

(() => {
  fs.writeFileSync(path.resolve(`${appRootDir}/.env.production`), `
SITE_NAME=${process.env.SITE_NAME || '@mazipan'}
FULL_DOMAIN=${process.env.FULL_DOMAIN || 'https://mazipan.space'}
ENABLE_ADS=${process.env.ENABLE_ADS || false}
ADS_CLIENT=${process.env.ADS_CLIENT}
GA_KEY=${process.env.GA_KEY}
API_LIKE_BUTTON=${process.env.API_LIKE_BUTTON}
SITE_VERIFICATION=${process.env.SITE_VERIFICATION}
  `)
})();
