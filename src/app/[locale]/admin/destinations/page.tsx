import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDestinationsPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  let destinations: any[] = [];
  try {
    destinations = await prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { trips: true } } },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="text-[32px] font-serif font-bold text-ink">Manage Destinations</h1>
        <a href="/en/admin/destinations/new" className="bg-ink text-white px-[20px] py-[10px] rounded-full text-sm font-bold hover:bg-black transition-colors">
          + New Destination
        </a>
      </div>
      
      <div className="bg-white rounded-[16px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-line text-sm text-muted">
              <th className="p-[15px] font-bold">Name</th>
              <th className="p-[15px] font-bold">Theme</th>
              <th className="p-[15px] font-bold">Trips</th>
              <th className="p-[15px] font-bold">Status</th>
              <th className="p-[15px] font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.length > 0 ? destinations.map((dest: any) => (
              <tr key={dest.id} className="border-b border-line hover:bg-gray-50">
                <td className="p-[15px] font-bold text-sm">{dest.name}</td>
                <td className="p-[15px] text-sm text-muted">{dest.theme}</td>
                <td className="p-[15px] text-sm">{dest._count.trips} trips</td>
                <td className="p-[15px] text-sm">
                  {dest.isActive ? (
                    <span className="text-green-600 font-bold">Active</span>
                  ) : (
                    <span className="text-gray-400 font-bold">Hidden</span>
                  )}
                </td>
                <td className="p-[15px] text-sm text-right">
                  <a href={`/en/admin/destinations/${dest.id}`} className="text-ink underline">Edit</a>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-[30px] text-center text-muted">No destinations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
