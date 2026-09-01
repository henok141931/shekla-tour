const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function allowUploads() {
  try {
    // Add INSERT policy
    await prisma.$executeRawUnsafe(`CREATE POLICY "Public_Insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'images');`);
    console.log('Insert Policy created');
  } catch (e) {
    console.error('Insert Error:', e.message);
  }
  
  try {
    // Add UPDATE policy
    await prisma.$executeRawUnsafe(`CREATE POLICY "Public_Update" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'images');`);
    console.log('Update Policy created');
  } catch (e) {
    console.error('Update Error:', e.message);
  }
  
  try {
    // Add DELETE policy
    await prisma.$executeRawUnsafe(`CREATE POLICY "Public_Delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'images');`);
    console.log('Delete Policy created');
  } catch (e) {
    console.error('Delete Error:', e.message);
  }
}

allowUploads().then(() => process.exit(0));
