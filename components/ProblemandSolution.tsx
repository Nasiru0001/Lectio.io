export default function ProCon() {
  return (
    <section className="relative pb-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-16 space-y-5">
        <p className=" text-4xl text-indigo-600 font-extrabold uppercase tracking-wide">
          Why Lectico.io
        </p>

        <h2 className="text-4xl font-bold mt-4">
          From Fragmented Systems to Unified Intelligence
        </h2>

        <p className="text-gray-300 text-xl mt-4 max-w-2xl mx-auto">
          Universities deserve more than spreadsheets and disconnected tools.
          Lectico.io transforms how institutions manage academic operations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Problem Card */}
        <div className="bg-white p-10 rounded-2xl shadow-md border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Universities Operate in Silos
          </h2>

          <p className="text-gray-600 mb-6">
            Academic institutions often rely on disconnected systems to manage
            faculties, courses, lecturer workload, and student performance.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>❌ No centralized academic dashboard</li>
            <li>❌ Manual workload tracking</li>
            <li>❌ Fragmented performance data</li>
            <li>❌ Limited real-time insights</li>
          </ul>
        </div>

        {/* Solution Card */}
        <div className="bg-indigo-600 text-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            A Unified Academic Intelligence Platform
          </h2>

          <p className="mb-6 opacity-90">
            Lectico.io centralizes academic management into one intelligent
            platform, delivering real-time visibility across departments and
            roles.
          </p>

          <ul className="space-y-3">
            <li>✅ Real-time lecturer workload monitoring</li>
            <li>✅ Student performance analytics</li>
            <li>✅ Structured academic management</li>
            <li>✅ Secure role-based dashboards</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
