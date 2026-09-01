const fs = require('fs');
let env = fs.readFileSync('.env', 'utf8');
env = env.replace('postgresql://postgres?connection_limit=1:', 'postgresql://postgres:');
if (!env.includes('connection_limit=1')) {
  env = env.replace('/postgres"', '/postgres?connection_limit=1"');
}
fs.writeFileSync('.env', env);
