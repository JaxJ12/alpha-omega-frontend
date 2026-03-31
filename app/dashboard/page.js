'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({ totalCalls: 0, totalProposals: 0, totalLeads: 0, conversionRate: 0, emailOpenRate: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard/metrics');
        const data = await response.json();
        setMetrics(data.metrics);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Alpha & Omega
            </Link>
            <div className="space-x-6">
              <Link href="/chatbot" className="text-gray-700 hover:text-blue-600">
                Chat
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">⏳ Loading metrics...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-6 mb-12">
            <StatCard title="Total Calls" value={metrics.totalCalls} icon="📞" />
            <StatCard title="Proposals" value={metrics.totalProposals} icon="📄" />
            <StatCard title="Leads" value={metrics.totalLeads} icon="👥" />
            <StatCard title="Conversion" value={`${metrics.conversionRate}%`} icon="📈" />
            <StatCard title="Email Opens" value={`${metrics.emailOpenRate}%`} icon="📧" />
          </div>
        )}
      </section>
    </main>
  );
}
