import ApplyForm from "@/components/ApplyForm";

export const metadata = {
  title: "Apply Online - Driving Licence Application",
  description: "Complete your driving licence application form online with ease.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full text-center mb-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 font-ubuntu">Online Application</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Please fill in the details carefully as per your government documents.</p>
      </div>

      <ApplyForm />

      <div className="max-w-4xl w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm text-gray-500">
        <div className="p-4">
          <h4 className="font-bold text-gray-700 uppercase mb-2">Step 1</h4>
          <p>Fill Application Details</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-gray-700 uppercase mb-2">Step 2</h4>
          <p>Verify Info & Pay Fees</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-gray-700 uppercase mb-2">Step 3</h4>
          <p>Receive Application Status</p>
        </div>
      </div>
    </div>
  );
}
