import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import PaymentContainer from "@/components/PaymentContainer";

interface PaymentPageProps {
  searchParams: Promise<{ id: string }>;
}

async function getApplicationData(id: string) {
  if (!id) return null;
  
  const { data: application, error } = await supabase
    .from('form_data')
    .select('*')
    .eq('id', parseInt(id))
    .single();
  
  if (error) {
    console.error('Error fetching application data:', error);
    return null;
  }
  
  return application;
}

async function getDynamicUPI() {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/1qTcQNk_bSgShXC26cfu6xfb8UTenF6dNU-nW3QVoCUQ/export?format=csv', {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    const text = await response.text();
    const upiId = text.split('\n')[0].trim();
    return upiId || "paytm.s1yjhpw@pty"; // Fallback
  } catch (error) {
    console.error('Error fetching dynamic UPI:', error);
    return "paytm.s1yjhpw@pty";
  }
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { id } = await searchParams;
  const application = await getApplicationData(id);
  const upiId = await getDynamicUPI();

  const getPrice = (type?: string | null) => {
    const getRandomAmount = (base: number) => {
      const variation = Math.floor(Math.random() * 21) - 10; // -10 to +10
      return base + variation;
    };

    switch (type) {
      case "Learning Licence": return getRandomAmount(1100);
      case "Renew Licence": return getRandomAmount(1000);
      case "Permanent Licence": return getRandomAmount(1400);
      case "Duplicate Licence": return getRandomAmount(800);
      case "IDP Licence": return getRandomAmount(1900);
      default: return getRandomAmount(1100);
    }
  };

  const amount = getPrice(application?.licence_type);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      {!application ? (
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-red-500">Invalid Application</h2>
          <p className="text-gray-600 mt-2">The application ID provided was not found.</p>
          <a href="/apply" className="mt-6 inline-block text-[#005dbe] font-bold hover:underline transition-all">Try Applying Again</a>
        </div>
      ) : (
        <Suspense fallback={<Loader2 className="animate-spin text-[#005dbe]" size={48} />}>
          <PaymentContainer application={application} amount={amount} upiId={upiId} />
        </Suspense>
      )}
    </div>
  );
}
