"use server";

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadToSupabase(file: File, folder: string) {
  if (!file || file.size === 0) return undefined;
  
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  // Convert File to Buffer for Supabase Node.js client
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Supabase Upload Error:", error);
    throw new Error("Failed to upload image");
  }

  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function updateTripAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const duration = formData.get("duration") as string;
  const status = formData.get("status") as string;
  const imageFile = formData.get("image") as File | null;

  const imageUrl = imageFile ? await uploadToSupabase(imageFile, "trips") : undefined;

  const dataToUpdate: any = { title, price, duration, status };
  if (imageUrl) dataToUpdate.image = imageUrl;

  await prisma.trip.update({ where: { id }, data: dataToUpdate });

  revalidatePath("/admin/trips");
  revalidatePath("/");
  redirect("/en/admin/trips?updated=true");
}

export async function updateSettingsAction(formData: FormData) {
  const heroImageFile = formData.get("heroImage") as File | null;
  const storyImageFile = formData.get("storyImage") as File | null;

  const newHeroUrl = heroImageFile ? await uploadToSupabase(heroImageFile, "settings") : undefined;
  const newStoryUrl = storyImageFile ? await uploadToSupabase(storyImageFile, "settings") : undefined;

  if (newHeroUrl) {
    await prisma.siteSetting.upsert({
      where: { key: "heroImage" },
      update: { value: newHeroUrl },
      create: { key: "heroImage", value: newHeroUrl },
    });
  }

  if (newStoryUrl) {
    await prisma.siteSetting.upsert({
      where: { key: "storyImage" },
      update: { value: newStoryUrl },
      create: { key: "storyImage", value: newStoryUrl },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/en/admin/settings?updated=true");
}

export async function createTripAction(formData: FormData) {
  const destinationId = formData.get("destinationId") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const duration = formData.get("duration") as string;
  const status = formData.get("status") as string;
  const imageFile = formData.get("image") as File | null;

  const imageUrl = imageFile ? await uploadToSupabase(imageFile, "trips") : undefined;

  await prisma.trip.create({
    data: { destinationId, title, slug, price, duration, status, image: imageUrl },
  });

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  revalidatePath("/");
  redirect("/en/admin/trips?updated=true");
}

export async function updateDestinationAction(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const theme = formData.get("theme") as string;
  const isActive = formData.get("isActive") === "true";
  const imageFile = formData.get("image") as File | null;

  const imageUrl = imageFile ? await uploadToSupabase(imageFile, "destinations") : undefined;

  const dataToUpdate: any = { name, description, theme, isActive };
  if (imageUrl) dataToUpdate.heroImage = imageUrl;

  await prisma.destination.update({ where: { id }, data: dataToUpdate });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
  redirect("/en/admin/destinations?updated=true");
}

export async function createDestinationAction(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const theme = formData.get("theme") as string;
  const isActive = formData.get("isActive") === "true";
  const imageFile = formData.get("image") as File | null;

  const imageUrl = imageFile ? await uploadToSupabase(imageFile, "destinations") : undefined;

  await prisma.destination.create({
    data: { name, slug, description, theme, isActive, heroImage: imageUrl },
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
  redirect("/en/admin/destinations?updated=true");
}
