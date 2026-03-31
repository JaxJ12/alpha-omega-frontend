'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ChatbotPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
    setMessage('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) { setFile(dropped); setMessage(''); }
  };

  const handleUpload = async () => {
    if (!file) { setMessage('error:Please select a file first.'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:3001/api/transcribe', { method: 'POST', body: formData });
      const data = await response.json();
      setMessage(`success:${data.message}`);
      setFile(null);
    } catch (error) {
      setMessage(`error:Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const msgType = message.startsWith('success:') ? 'success' : message.startsWith('error:') ? 'error' : null;
  const msgText = message.replace(/^(success:|error:)/, '');

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* NAV */}
      <nav style={{
        background: 'rgba(11,37,69,0.97)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,150,58,0.2)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 68 }}>
          <Link href="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>
            Alpha <span style={{ color: 'var(--gold)' }}>&</span> Omega
          </Link>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <Link href="/chatbot" style={{ color: 'var(--gold-lt)', fontSize: 15, fontWeight: 600 }}>Upload Call</Link>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-lt)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '64px 24px' }}>

        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>
            Call Intelligence
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>
            Upload a Call Transcript
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7 }}>
            Drop in a recorded call or transcript and we&apos;ll analyze it for coverage gaps, client needs, and follow-up actions.
          </p>
        </div>

        {/* Upload card */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '40px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 30px rgba(11,37,69,0.08)'
        }}>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragOver ? 'var(--gold)' : file ? '#22c55e' : 'var(--border)'}`,
              borderRadius: 14,
              padding: '48px 24px',
              textAlign: 'center',
              background: dragOver ? 'rgba(201,150,58,0.04)' : file ? 'rgba(34,197,94,0.04)' : '#fafaf9',
              transition: 'all 0.2s',
              cursor: 'pointer',
              position: 'relative',
              marginBottom: 28
            }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept=".txt,.pdf,.mp3,.wav"
              style={{ display: 'none' }}
            />

            {file ? (
              <>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: 'rgba(34,197,94,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: 24
                }}>📄</div>
                <p style={{ fontWeight: 600, color: '#16a34a', fontSize: 16, marginBottom: 4 }}>{file.name}</p>
                <p style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {(file.size / 1024).toFixed(1)} KB · Click to change
                </p>
              </>
            ) : (
              <>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: 'rgba(201,150,58,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: 24
                }}>📁</div>
                <p style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 16, marginBottom: 8 }}>
                  Drop your file here
                </p>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>
                  or <span style={{ color: 'var(--gold)', fontWeight: 600 }}>click to browse</span>
                </p>
                <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>
                  Supports .txt, .pdf, .mp3, .wav
                </p>
              </>
            )}
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            style={{
              width: '100%', padding: '15px',
              background: uploading || !file ? '#e5e7eb' : 'var(--navy)',
              color: uploading || !file ? 'var(--muted)' : '#fff',
              border: 'none', borderRadius: 10,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 16, fontWeight: 600,
              cursor: uploading || !file ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
            onMouseEnter={e => { if (!uploading && file) e.currentTarget.style.background = 'var(--navy-mid)'; }}
            onMouseLeave={e => { if (!uploading && file) e.currentTarget.style.background = 'var(--navy)'; }}
          >
            {uploading ? (
              <>
                <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Analyzing...
              </>
            ) : (
              'Upload & Analyze →'
            )}
          </button>

          {/* Status message */}
          {msgText && (
            <div style={{
              marginTop: 20, padding: '14px 18px',
              borderRadius: 10,
              background: msgType === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${msgType === 'success' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
              color: msgType === 'success' ? '#16a34a' : '#dc2626',
              fontSize: 14, fontWeight: 500
            }}>
              {msgType === 'success' ? '✓ ' : '⚠ '}{msgText}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
