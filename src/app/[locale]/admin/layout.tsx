import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // We don't want to redirect if they are on the login page
  // We'll handle this in the middleware or page level, but for simplicity, 
  // we'll just render a sidebar layout for authenticated users.

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      {session && (
        <aside className="w-full md:w-[250px] bg-ink text-white p-[20px] flex flex-col gap-[20px]">
          <div className="font-serif text-[24px] mb-[20px]">Shekla Admin</div>
          <nav className="flex flex-col gap-[10px]">
            <Link href="/admin" className="hover:text-gray-300">Dashboard</Link>
            <Link href="/admin/leads" className="hover:text-gray-300">Leads / Bookings</Link>
            <Link href="/admin/trips" className="hover:text-gray-300">Manage Trips</Link>
            <Link href="/admin/destinations" className="hover:text-gray-300">Manage Destinations</Link>
            <Link href="/admin/gallery" className="hover:text-gray-300">Photo Gallery</Link>
          </nav>
          <div className="mt-auto pt-[20px] border-t border-white/20">
            {/* We'd add a Sign Out button here */}
            <span className="text-sm opacity-50">{session.user?.email}</span>
          </div>
        </aside>
      )}
      
      {/* Admin Content */}
      <main className="flex-1 p-[20px] md:p-[40px]">
        {children}
      </main>
    </div>
  );
}
