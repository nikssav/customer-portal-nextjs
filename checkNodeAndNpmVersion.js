const processVersions = process.versions;
const { execSync } = require('child_process');
const npmVersion = execSync('npm -v').toString().trim();
const packageJson = require('./package.json');
const nodeVerReq = parseInt(packageJson.engines.node);
const npmVerReq = parseInt(packageJson.engines.npm);

if (
  processVersions &&
  processVersions.node &&
  !!npmVersion &&
  !!nodeVerReq &&
  !!npmVerReq
) {
  if (
    parseInt(processVersions.node) === nodeVerReq &&
    parseInt(npmVersion) === npmVerReq
  ) {
    console.log(
      '\x1b[32m',
      `Good to go with your Node Version ${processVersions.node} and NPM Version ${npmVersion}`,
      '\x1b[0m'
    );
  } else {
    console.log(
      '\x1b[31m',
      `Package installation(npm install) or Project startup command(npm start) failed due to Node/NPM Version.\nPlease install and use Node Version ${nodeVerReq}.x and NPM Version ${npmVerReq}.x`,
      '\x1b[0m'
    );
    console.log(
      '\x1b[31m',
      `Your current Node Version is ${processVersions.node} and NPM Version is ${npmVersion}`,
      '\x1b[0m'
    );
    process.exit(1);
  }
} else {
  console.log(
    '\x1b[31m',
    `Something went wrong while checking Node version:\n- Node Version installed: ${processVersions.node}\n- NPM Version installed: ${npmVersion}\n- Node Version required: ${nodeVerReq}\n- NPM Version requred: ${npmVerReq}`,
    '\x1b[0m'
  );
  process.exit(1);
}
