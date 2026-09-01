const { execSync } = require('child_process');

console.log("Running Prisma DB Push with connection_limit=1...");

let dbUrl = process.env.DATABASE_URL;
if (dbUrl && !dbUrl.includes('connection_limit')) {
  dbUrl += dbUrl.includes('?') ? '&connection_limit=1' : '?connection_limit=1';
}

try {
  execSync('npx prisma db push --accept-data-loss', { 
    env: { ...process.env, DATABASE_URL: dbUrl }, 
    stdio: 'inherit' 
  });
  console.log("Prisma DB Push successful.");
} catch (error) {
  console.error("Prisma DB Push failed.");
  process.exit(1);
}
