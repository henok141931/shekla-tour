import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function LeadsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let leads: any[] = [];
  try {
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { trip: true, destination: true },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <h1 className="text-[32px] font-serif font-bold text-ink mb-[30px]">Leads & Bookings</h1>
      
      <div className="bg-white rounded-[16px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-line text-sm text-muted">
              <th className="p-[15px] font-bold">Date</th>
              <th className="p-[15px] font-bold">Name</th>
              <th className="p-[15px] font-bold">Contact</th>
              <th className="p-[15px] font-bold">Interest</th>
              <th className="p-[15px] font-bold">Type</th>
              <th className="p-[15px] font-bold">Status</th>
              <th className="p-[15px] font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? leads.map((lead: any) => (
              <tr key={lead.id} className="border-b border-line hover:bg-gray-50">
                <td className="p-[15px] text-sm whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="p-[15px] font-bold text-sm">{lead.name}</td>
                <td className="p-[15px] text-sm">
                  <div>{lead.email}</div>
                  <div className="text-muted">{lead.phone}</div>
                </td>
                <td className="p-[15px] text-sm">
                  {lead.trip?.title || lead.destination?.name || "General"}
                </td>
                <td className="p-[15px] text-sm uppercase text-xs tracking-wider font-bold text-muted">
                  {lead.source}
                </td>
                <td className="p-[15px] text-sm">
                  <span className={`px-[10px] py-[4px] rounded-full text-xs font-bold ${
                    lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-[15px] text-sm">
                  <form action={async () => {
                    "use server";
                    const { PrismaClient } = await import("@prisma/client");
                    const { revalidatePath } = await import("next/cache");
                    const p = new PrismaClient();
                    await p.lead.delete({ where: { id: lead.id } });
                    revalidatePath("/admin/leads");
                  }}>
                    <button type="submit" className="text-red-600 font-bold hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="p-[30px] text-center text-muted">No leads found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
