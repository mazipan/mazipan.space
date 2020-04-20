const fs = require('fs');
const path = require('path');
const appRootDir = require('app-root-dir').get();

(() => {
  const filePath = path.resolve(`${appRootDir}/.env.production`);

  fs.writeFileSync(filePath, `
SITE_NAME=${process.env.SITE_NAME || '@mazipan'}
FULL_DOMAIN=${process.env.FULL_DOMAIN || 'https://mazipan.space'}
ENABLE_ADS=${process.env.ENABLE_ADS || false}
ADS_CLIENT=${process.env.ADS_CLIENT}
GA_KEY=${process.env.GA_KEY}
API_LIKE_BUTTON=${process.env.API_LIKE_BUTTON}
SITE_VERIFICATION=${process.env.SITE_VERIFICATION}
  `);
  console.log(`✅ Success generate .env.production`);
  console.log(fs.readFileSync(filePath, 'utf8'));
})();
