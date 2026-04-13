import { Suspense } from "react";
import UPIPayment from "@/components/UPIPayment";
import { prisma } from "@/lib/prisma";
import { Loader2 } from "lucide-react";

interface PaymentPageProps {
  searchParams: { id: string };
}

async function getApplicationData(id: string) {
  if (!id) return null;
  
  // Fetch application to get amount if needed, though we hardcode 375 for now as per site
  const application = await prisma.formData.findUnique({
    where: { id: parseInt(id) }
  });
  
  return application;
}

export default async function PaymentPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;
  const application = await getApplicationData(id);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      {!application ? (
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-red-500">Invalid Application</h2>
          <p className="text-gray-600 mt-2">The application ID provided was not found.</p>
          <a href="/apply" className="mt-6 inline-block text-[#005dbe] font-bold">Try Applying Again</a>
        </div>
      ) : (
        <Suspense fallback={<Loader2 className="animate-spin text-[#005dbe]" size={48} />}>
          <UPIPayment amount={375} applicationId={application.id.toString()} />
        </Suspense>
      )}
    </div>
  );
}
