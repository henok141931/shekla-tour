"use server";

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadGalleryImageAction(formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  const caption = formData.get("caption") as string;

  if (!imageFile || imageFile.size === 0) {
    throw new Error("No image file provided.");
  }

  const fileExt = imageFile.name.split(".").pop();
  const fileName = `gallery_${Date.now()}.${fileExt}`;
  const filePath = `gallery/${fileName}`;

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage.from("images").upload(filePath, buffer, { 
    contentType: imageFile.type,
    upsert: false 
  });
  if (error) throw new Error("Failed to upload image");

  const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);

  await prisma.galleryImage.create({
    data: {
      url: publicUrlData.publicUrl,
      caption: caption || null,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/trips");
  
  redirect("/en/admin/gallery?updated=true");
}

export async function deleteGalleryImageAction(formData: FormData) {
  const id = formData.get("id") as string;
  
  const image = await prisma.galleryImage.findUnique({ where: { id } });
  if (image) {
    // In a real app we might also delete from Supabase storage here using the URL to find the filename
    await prisma.galleryImage.delete({ where: { id } });
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/trips");
  
  redirect("/en/admin/gallery?updated=true");
}
