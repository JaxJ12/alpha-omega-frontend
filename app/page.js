'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">Alpha & Omega</div>
            <div className="space-x-6">
              <Link href="/chatbot" className="text-gray-700 hover:text-blue-600 transition">
                Chat
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Medicare Made <span className="text-blue-600">Simple</span>
          </h1>
          <p className="text-xl text-gray-700 mb-10">Expert guidance for seniors navigating Medicare</p>
          <div className="flex gap-4 justify-center">
            <Link href="/chatbot" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Get Started
            </Link>
            <Link href="/dashboard" className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold">
              Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
