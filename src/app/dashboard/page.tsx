export default function DashboardPage() {
  return (
    <div className="mt-28">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-3xl font-bold text-green-700">10</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Upcoming</h2>
          <p className="text-3xl font-bold text-blue-700">3</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <p className="text-3xl font-bold text-purple-700">5</p>
        </div>

      </div>
    </div>
  );
}