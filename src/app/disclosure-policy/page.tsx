export default function DisclosurePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-ubuntu text-gray-900">Disclosure Policy</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-20 prose prose-blue">
        <p className="text-gray-600 mb-8">
          Drivinglicence.org.in (hereinafter collectively referred to as “Drivinglicence.org.in”, “We”, “Us” or “Our”), 
          utilizes certain trusted third parties in the course of business including through our website drivinglicence.org.in (“Site”). 
          This policy will be treated as part of our Terms of Use and is automatically incorporated therein.
        </p>
        
        <p className="text-gray-600 mb-8 font-semibold italic">
          By continuing to visit or use our services, you are agreeing to the use of third parties mentioned in this policy below for the purposes we describe in this policy.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-ubuntu">Third Parties:</h3>
        <p className="text-gray-600 mb-8">
          A third party to us and you in the context of our privacy notice includes but is not limited to our business partners, 
          suppliers, sub-contractors, advertisers & advertising networks, analytics & search engine providers, 
          sales and marketing partners, payment providers (hereinafter collectively referred to as “third parties”).
        </p>

        <div className="space-y-12 mt-12">
          <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold text-[#005dbe] mb-4">1. Analytics Partners</h3>
            <p className="text-gray-600">
              Some of our partners help us better understand how a user or visitor to our site interacts with it, 
              navigates through the various features, which features are the most engaging etcetera. 
              This is required for us to improve our services.
            </p>
          </section>

          <section className="p-8">
            <h3 className="text-xl font-bold text-[#005dbe] mb-4">2. Social Networking</h3>
            <p className="text-gray-600">
              We may implement social media buttons and certain other widgets that allow our users to interact and share content. 
              Your interaction with a widget generally allows the third party to collect some information about you.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold text-[#005dbe] mb-4">3. Service Providers</h3>
            <p className="text-gray-600">
              We utilize the services of third parties to help us run our business. 
              For example, a payment service provider for processing payments and marketing service providers to enable our outreach programs.
            </p>
          </section>

          <section className="p-8">
            <h3 className="text-xl font-bold text-[#005dbe] mb-4">4. Payment Service Provider</h3>
            <ul className="list-disc list-inside text-gray-600 font-medium">
              <li>Razorpay Software Private Limited</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
