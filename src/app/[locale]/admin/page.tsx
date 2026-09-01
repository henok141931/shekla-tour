import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch some basic stats
  let totalLeads = 0;
  let activeTrips = 0;
  
  try {
    totalLeads = await prisma.lead.count();
    activeTrips = await prisma.trip.count({ where: { status: "ACTIVE" } });
  } catch (error) {
    console.error("Database not connected yet", error);
  }

  return (
    <div>
      <h1 className="text-[32px] font-serif font-bold text-ink mb-[30px]">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
        <div className="bg-white p-[24px] rounded-[16px] shadow-sm">
          <div className="text-sm text-muted uppercase tracking-wider font-bold mb-[10px]">Total Leads</div>
          <div className="text-[36px] font-serif">{totalLeads}</div>
        </div>
        
        <div className="bg-white p-[24px] rounded-[16px] shadow-sm">
          <div className="text-sm text-muted uppercase tracking-wider font-bold mb-[10px]">Active Trips</div>
          <div className="text-[36px] font-serif">{activeTrips}</div>
        </div>
      </div>
    </div>
  );
}
