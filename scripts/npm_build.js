const path = require('path');
const execSync = require('child_process').execSync;
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const packageName = process.env.npm_config_name || undefined;
const appSrc = resolveApp(`packages/${packageName}`);


if (packageName === undefined) {
    console.log('\n 请输入包名，npm run npm:build --name=$name');
    return ;
}

function exec(command, extraEnv) {
    return execSync(command, {
        stdio: 'inherit',
        env: { ...process.env, ...extraEnv},
    })
}

console.log('\n Building ES modules...');
exec(`webpack --config scripts/webpack.config.dev.js --progress`)