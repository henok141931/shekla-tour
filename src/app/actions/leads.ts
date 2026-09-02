"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Configure the email transporter using environment variables
// Note: In a real environment, you'd use a service like Resend, Sendgrid, or Gmail SMTP
// with an App Password. The host, port, user, and pass should be in your .env file.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Assuming Gmail for simplicity and 100% free tier
  auth: {
    user: process.env.EMAIL_USER, // e.g. admin@shekla.com or your personal gmail
    pass: process.env.EMAIL_PASS, // App Password, NOT your real password
  },
});

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
    let tripTitle = "General Inquiry";
    
    if (tripId && tripId !== "demo-1") {
      const trip = await prisma.trip.findUnique({ where: { id: tripId } });
      if (trip) {
        validTripId = trip.id;
        tripTitle = trip.title;
      } else {
        return { error: "The trip you are trying to book no longer exists. Please refresh the page.", success: false };
      }
    } else if (tripId === "demo-1") {
      tripTitle = "Demo Trip (Wenchi Highland Escape)";
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

    // Try to send an email notification, but don't fail the submission if it errors
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: `"Shekla Booking System" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `New Lead: ${name} wants to book ${tripTitle}`,
          html: `
            <h2>New Booking / Lead Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Trip:</strong> ${tripTitle}</p>
            <p><strong>Source:</strong> ${source}</p>
            <br/>
            <p>Please log in to the admin dashboard to manage this lead.</p>
          `,
        });
        console.log("Email notification sent successfully.");
      } else {
        console.warn("EMAIL_USER or EMAIL_PASS not set in environment. Skipping email notification.");
      }
    } catch (emailError) {
      console.error("Failed to send email notification, but lead was saved:", emailError);
    }

    revalidatePath("/admin/leads");
    return { success: true, error: "" };
  } catch (error: any) {
    console.error("Failed to create lead", error);
    return { error: error.message || "A database error occurred while submitting your request.", success: false };
  }
}
