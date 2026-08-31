"use server";

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// Initialize Supabase Client for Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Use the service role key for admin actions to bypass storage RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateTripAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const duration = formData.get("duration") as string;
  const status = formData.get("status") as string;
  const imageFile = formData.get("image") as File | null;

  let imageUrl: string | undefined = undefined;

  // 1. Handle Image Upload if a new file is provided
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `trips/${fileName}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      throw new Error("Failed to upload image");
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);
      
    imageUrl = publicUrlData.publicUrl;
  }

  // 2. Update Database
  // Since we don't have an explicit image field on the Trip model in our current schema,
  // wait, earlier I put heroImage on the Destination model, but Trip didn't have one!
  // Ah, the prototype showed images for Trips. 
  // Let me quickly check if I put an image field on Trip.
  // I didn't! Let's update the Trip model in schema in a bit, but for now we'll pretend there is one, or just update the Destination image.
  // Wait, I will add `image String?` to the Trip model.
  
  const dataToUpdate: any = {
    title,
    price,
    duration,
    status,
  };

  if (imageUrl) {
    dataToUpdate.image = imageUrl;
  }

  await prisma.trip.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/trips");
  revalidatePath("/");
  
  redirect("/en/admin/trips?updated=true");
}

export async function updateSettingsAction(formData: FormData) {
  const heroImageFile = formData.get("heroImage") as File | null;
  const storyImageFile = formData.get("storyImage") as File | null;

  async function uploadFile(file: File, folder: string) {
    if (!file || file.size === 0) return null;
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}_${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error } = await supabase.storage.from("images").upload(filePath, file, { upsert: false });
    if (error) throw new Error("Failed to upload image");

    return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
  }

  const newHeroUrl = await uploadFile(heroImageFile!, "hero");
  const newStoryUrl = await uploadFile(storyImageFile!, "story");

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

  let imageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = "trips/" + Math.random() + "." + fileExt;

    const { error } = await supabase.storage.from("images").upload(fileName, imageFile, { upsert: false });
    if (error) throw new Error("Failed to upload image");

    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);
    imageUrl = publicUrlData.publicUrl;
  }

  await prisma.trip.create({
    data: {
      destinationId,
      title,
      slug,
      price,
      duration,
      status,
      image: imageUrl,
    },
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

  let imageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = "destinations/" + Math.random() + "." + fileExt;

    const { error } = await supabase.storage.from("images").upload(fileName, imageFile, { upsert: false });
    if (error) throw new Error("Failed to upload image");

    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);
    imageUrl = publicUrlData.publicUrl;
  }

  const dataToUpdate: any = {
    name,
    description,
    theme,
    isActive,
  };

  if (imageUrl) {
    dataToUpdate.heroImage = imageUrl;
  }

  await prisma.destination.update({
    where: { id },
    data: dataToUpdate,
  });

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

  let imageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = "destinations/" + Math.random() + "." + fileExt;

    const { error } = await supabase.storage.from("images").upload(fileName, imageFile, { upsert: false });
    if (error) throw new Error("Failed to upload image");

    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);
    imageUrl = publicUrlData.publicUrl;
  }

  await prisma.destination.create({
    data: {
      name,
      slug,
      description,
      theme,
      isActive,
      heroImage: imageUrl,
    },
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
  
  redirect("/en/admin/destinations?updated=true");
}
