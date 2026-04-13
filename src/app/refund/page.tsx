export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 font-ubuntu mb-8">Refund Policy</h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Overview</h2>
          <p>
            At drivinglicence.org.in, we strive to provide the best consultancy services for your driving licence needs. 
            The fee paid on our platform is for consultancy and administrative assistance provided by our expert team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Eligibility for Refund</h2>
          <p>You may be eligible for a refund under the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Duplicate payment for the same application.</li>
            <li>Failure to provide services due to technical errors on our platform.</li>
            <li>The consultancy service has not been initiated by our team within 48 hours of payment.</li>
          </ul>
        </section>

        <section className="bg-blue-50 p-6 rounded-2xl border-l-4 border-[#005dbe]">
          <h2 className="text-xl font-bold text-[#005dbe] mb-2">Non-Refundable Situations</h2>
          <p className="text-sm">
            Please note that refunds are <strong>not</strong> applicable once the application has been reviewed and consultancy advice has been shared, 
            or if the application is rejected by the government authorities due to incorrect documents provided by the applicant.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Refund Process</h2>
          <p>
            To request a refund, please email us at <strong>info@drivinglicence.org.in</strong> with your application ID 
            and proof of payment. Once approved, the refund will be processed back to the original payment method within 
            5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cancellations</h2>
          <p>
            Request for cancellation must be made before our consultants initiate the document review process. 
            Once the status of your application moves to "In Review," cancellations are not permitted.
          </p>
        </section>
      </div>
    </div>
  );
}
