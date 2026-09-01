import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { uploadGalleryImageAction, deleteGalleryImageAction } from "@/app/actions/gallery";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";

const prisma = new PrismaClient();

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let images: any[] = [];
  let dbError = "";

  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    dbError = e.message || "Unknown Database Error";
  }

  if (dbError) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
        <p className="mb-4">The server failed to connect to the database. This usually means your Vercel `DATABASE_URL` is using the wrong port or address.</p>
        <pre className="bg-gray-800 text-red-400 p-4 rounded-lg overflow-auto text-xs">{dbError}</pre>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="text-[32px] font-serif font-bold text-ink">Photo Gallery</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        
        {/* Upload Form */}
        <div className="bg-white p-[30px] rounded-[16px] shadow-sm h-fit">
          <h2 className="font-serif text-[22px] font-bold mb-[15px]">Upload New Photo</h2>
          <form action={uploadGalleryImageAction} className="flex flex-col gap-[20px]">
            <div>
              <ImageUploader 
                name="image" 
                label="Photo" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink mb-[5px]">Caption / Location (Optional)</label>
              <input type="text" name="caption" placeholder="e.g. Wenchi Crater Lake, October 2023" className="w-full p-[12px] border border-line rounded-[8px]" />
            </div>
            <SubmitButton />
          </form>
        </div>

        {/* Existing Images */}
        <div className="bg-white p-[30px] rounded-[16px] shadow-sm">
          <h2 className="font-serif text-[22px] font-bold mb-[15px]">Manage Gallery ({images.length})</h2>
          
          <div className="grid grid-cols-2 gap-[15px]">
            {images.length > 0 ? images.map((img) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-line">
                <img src={img.url} alt={img.caption || "Gallery image"} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-[15px]">
                  <p className="text-white text-xs font-bold line-clamp-2">{img.caption}</p>
                  
                  <form action={deleteGalleryImageAction}>
                    <input type="hidden" name="id" value={img.id} />
                    <button type="submit" className="w-full bg-red-600 text-white text-xs font-bold py-[8px] rounded-lg hover:bg-red-700 transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center text-muted text-sm py-10">
                No images uploaded yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
