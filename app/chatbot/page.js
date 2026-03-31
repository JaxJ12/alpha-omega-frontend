'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ChatbotPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:3001/api/transcribe', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setMessage(`✅ ${data.message}`);
      setFile(null);
    } catch (error) {
      setMessage('❌ Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Alpha & Omega
            </Link>
            <div className="space-x-6">
              <Link href="/chatbot" className="text-blue-600 font-semibold">
                Chat
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Upload Call Transcription</h1>
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Select Transcribed Call</label>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-600 transition cursor-pointer">
              <input type="file" onChange={handleFileChange} accept=".txt,.pdf,.mp3,.wav" className="w-full" />
              {file && <p className="mt-4 text-green-600">📄 {file.name}</p>}
            </div>
          </div>
          <button onClick={handleUpload} disabled={uploading || !file} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50">
            {uploading ? '⏳ Uploading...' : '📤 Upload & Analyze'}
          </button>
          {message && (
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-gray-800">{message}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
