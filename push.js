const { execSync } = require('child_process');

console.log("Setting up Supabase Connection Pool bypass...");

let dbUrl = process.env.DATABASE_URL || "";
dbUrl = dbUrl.replace(/^["']|["']$/g, ''); // Strip quotes

let directUrl = dbUrl.replace(':6543', ':5432').replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');
if (!directUrl.includes('connection_limit=1')) {
  directUrl += directUrl.includes('?') ? '&connection_limit=1' : '?connection_limit=1';
}

try {
  console.log("Running Prisma DB Push via DIRECT_URL...");
  execSync('npx prisma db push --accept-data-loss', { 
    env: { ...process.env, DIRECT_URL: directUrl }, 
    stdio: 'inherit' 
  });
  console.log("Prisma DB Push successful.");
} catch (error) {
  console.error("Prisma DB Push failed.");
  console.error("CRITICAL ERROR: Your Supabase Session pool (15 connections) is permanently exhausted by Vercel serverless functions.");
  console.error("You MUST change your Vercel DATABASE_URL to port 6543 to fix this.");
  process.exit(1);
}
