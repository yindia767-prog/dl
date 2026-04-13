export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 font-ubuntu mb-8">Privacy Policy</h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make an application at drivinglicence.org.in.</p>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Personal Information We Collect</h2>
          <p>
            When you apply through our site, we collect certain information from you, including your name, relation details, gender, date of birth, 
            address, mobile number, and email. This information is necessary for the processing of your driving licence consultancy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Process your application and provide guidance.</li>
            <li>Communicate with you regarding your application status.</li>
            <li>Screen for potential risk or fraud.</li>
            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Security</h2>
          <p>
            We take reasonable precautions and follow industry best practices to make sure your personal information is not inappropriately lost, 
            misused, accessed, disclosed, altered or destroyed. Your data is stored securely using encrypted cloud services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal data to third parties. We only share information with third-party service providers (like payment processors) 
            to help us use your Personal Information as described above.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Your Rights</h2>
          <p>
            You have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. 
            If you would like to exercise this right, please contact us via the email provided.
          </p>
        </section>
      </div>
    </div>
  );
}
