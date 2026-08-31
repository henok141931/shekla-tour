import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const tripId = formData.get("tripId") as string;
    const source = formData.get("source") as string;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        tripId: tripId !== "demo-1" ? tripId : undefined,
        source: source || "contact",
        status: "NEW"
      }
    });

    const referer = req.headers.get("referer") || new URL("/", req.url).toString();
    const url = new URL(referer);
    url.searchParams.set("success", "true");
    
    return NextResponse.redirect(url.toString(), 303);
  } catch (error) {
    console.error("Failed to create lead", error);
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}
