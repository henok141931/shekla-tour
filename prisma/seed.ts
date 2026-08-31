import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  await prisma.adminUser.upsert({
    where: { email: "admin@shekla.com" },
    update: {},
    create: {
      email: "admin@shekla.com",
      passwordHash: "admin123", // MVP fallback plain text
    },
  });

  // Create destinations
  const wenchi = await prisma.destination.upsert({
    where: { slug: "wenchi-crater-lake" },
    update: {},
    create: {
      name: "Wenchi Crater Lake",
      slug: "wenchi-crater-lake",
      description: "Cool highlands, dramatic landscapes and an escape that rewards the curious.",
      theme: "HIGHLANDS",
      heroImage: "/images/image8.jpg",
    },
  });

  const doho = await prisma.destination.upsert({
    where: { slug: "doho-lodge" },
    update: {},
    create: {
      name: "Doho Lodge",
      slug: "doho-lodge",
      description: "Warm earth, hot springs and time that moves a little slower.",
      theme: "ESCAPE",
      heroImage: "/images/image9.jpg",
    },
  });

  const beynouna = await prisma.destination.upsert({
    where: { slug: "beynouna-village" },
    update: {},
    create: {
      name: "Beynouna Village",
      slug: "beynouna-village",
      description: "A quieter, more refined way to step away from the city.",
      theme: "RETREAT",
      heroImage: "/images/image10.jpg",
    },
  });

  // Create trips
  await prisma.trip.upsert({
    where: { slug: "wenchi-highland-escape" },
    update: {},
    create: {
      title: "Wenchi Highland Escape",
      slug: "wenchi-highland-escape",
      destinationId: wenchi.id,
      status: "ACTIVE",
      duration: "3 days",
      price: 4500,
      inclusions: JSON.stringify(["Transport", "Guide", "Meals"]),
    },
  });

  await prisma.trip.upsert({
    where: { slug: "doho-slow-weekend" },
    update: {},
    create: {
      title: "Doho Slow Weekend",
      slug: "doho-slow-weekend",
      destinationId: doho.id,
      status: "WAITLIST",
      duration: "2 days",
      price: 5200,
    },
  });

  await prisma.trip.upsert({
    where: { slug: "beynouna-retreat" },
    update: {},
    create: {
      title: "Beynouna Retreat",
      slug: "beynouna-retreat",
      destinationId: beynouna.id,
      status: "WAITLIST",
      duration: "2 days",
      price: 6000,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

