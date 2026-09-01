"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function submitLeadAction(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const tripId = formData.get("tripId") as string;
    const source = formData.get("source") as string;

    if (!name || !email || !phone) {
      return { error: "Name, email, and phone are required.", success: false };
    }

    // Verify trip exists before connecting to avoid foreign key errors
    let validTripId = undefined;
    if (tripId && tripId !== "demo-1") {
      const trip = await prisma.trip.findUnique({ where: { id: tripId } });
      if (trip) {
        validTripId = trip.id;
      } else {
        return { error: "The trip you are trying to book no longer exists. Please refresh the page.", success: false };
      }
    }

    await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        tripId: validTripId,
        source: source || "contact",
        status: "NEW"
      }
    });

    revalidatePath("/admin/leads");
    return { success: true, error: "" };
  } catch (error: any) {
    console.error("Failed to create lead", error);
    return { error: error.message || "A database error occurred while submitting your request.", success: false };
  }
}
