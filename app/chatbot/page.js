'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ChatbotPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => { setFile(e.target.files?.[0]||null); setMessage(''); };
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); const f=e.dataTransfer.files?.[0]; if(f){setFile(f);setMessage('');} };

  const handleUpload = async () => {
    if (!file) { setMessage('error:Please select a file first.'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:3001/api/transcribe', { method:'POST', body:formData });
      const data = await response.json();
      setMessage(`success:${data.message}`);
      setFile(null);
    } catch (error) {
      setMessage(`error:Upload failed — ${error.message}`);
    } finally { setUploading(false); }
  };

  const isSuccess = message.startsWith('success:');
  const isError   = message.startsWith('error:');
  const msgText   = message.replace(/^(success:|error:)/, '');

  return (
    <main style={{ minHeight:'100vh', background:'var(--color-bg)', fontFamily:'var(--font-body)' }}>
      <nav style={{ background:'rgba(10,31,56,0.97)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(201,150,58,0.18)', height:72 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', justifyContent:'space-between', alignItems:'center', height:'100%' }}>
          <Link href="/" style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#fff', textDecoration:'none' }}>
            Alpha <span style={{ color:'var(--color-accent)' }}>&</span> Omega
          </Link>
          <div style={{ display:'flex', gap:32, alignItems:'center' }}>
            <span style={{ color:'var(--color-accent-light)', fontSize:14, fontWeight:700 }}>Upload Call</span>
            <Link href="/dashboard" style={{ color:'rgba(255,255,255,0.6)', fontSize:14, fontWeight:600, textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='var(--color-accent-light)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.6)'}>Dashboard</Link>
          </div>
        </div>
      </nav>

      <section style={{ maxWidth:680, margin:'0 auto', padding:'64px 24px' }}>
        <div style={{ marginBottom:40 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:14 }}>Call Intelligence</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5vw,40px)', fontWeight:700, color:'var(--color-primary)', marginBottom:12, lineHeight:1.1 }}>Upload a Call Transcript</h1>
          <p style={{ color:'var(--color-text-muted)', fontSize:16, lineHeight:1.8 }}>Drop in a recorded call or transcript and we'll analyze it for coverage gaps, client needs, and follow-up actions.</p>
        </div>

        <div style={{ background:'#fff', borderRadius:20, padding:40, border:'1px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
          {/* Drop zone */}
          <div
            onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={handleDrop}
            onClick={()=>document.getElementById('fileInput').click()}
            style={{ border:`2px dashed ${dragOver?'var(--color-accent)':file?'#16a34a':'var(--color-border)'}`, borderRadius:14, padding:'48px 24px', textAlign:'center', background:dragOver?'rgba(201,150,58,0.03)':file?'rgba(22,163,74,0.03)':'#fafaf9', transition:'all .2s', cursor:'pointer', marginBottom:28 }}>
            <input id="fileInput" type="file" onChange={handleFileChange} accept=".txt,.pdf,.mp3,.wav" style={{ display:'none' }} />
            {file ? (
              <>
                <div style={{ width:52,height:52,borderRadius:12,background:'rgba(22,163,74,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:24 }}>📄</div>
                <p style={{ fontWeight:700, color:'#16a34a', fontSize:16, marginBottom:4 }}>{file.name}</p>
                <p style={{ color:'var(--color-text-muted)', fontSize:13 }}>{(file.size/1024).toFixed(1)} KB · Click to change</p>
              </>
            ) : (
              <>
                <div style={{ width:52,height:52,borderRadius:12,background:'rgba(201,150,58,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:24 }}>📁</div>
                <p style={{ fontWeight:700, color:'var(--color-primary)', fontSize:16, marginBottom:8 }}>Drop your file here</p>
                <p style={{ color:'var(--color-text-muted)', fontSize:14 }}>or <span style={{ color:'var(--color-accent)', fontWeight:700 }}>click to browse</span></p>
                <p style={{ color:'var(--color-text-muted)', fontSize:12, marginTop:10 }}>Supports .txt · .pdf · .mp3 · .wav</p>
              </>
            )}
          </div>

          <button onClick={handleUpload} disabled={uploading||!file} style={{ width:'100%', height:52, background:uploading||!file?'#e5e7eb':'var(--color-primary)', color:uploading||!file?'var(--color-text-muted)':'#fff', border:'none', borderRadius:10, fontFamily:'var(--font-body)', fontSize:16, fontWeight:700, cursor:uploading||!file?'not-allowed':'pointer', transition:'opacity .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
            onMouseEnter={e=>{if(!uploading&&file)e.currentTarget.style.opacity='0.85';}} onMouseLeave={e=>{if(!uploading&&file)e.currentTarget.style.opacity='1';}}>
            {uploading ? (
              <><span style={{ width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin .7s linear infinite' }} />Analyzing...</>
            ) : 'Upload & Analyze →'}
          </button>

          {msgText && (
            <div style={{ marginTop:20, padding:'14px 18px', borderRadius:10, background:isSuccess?'rgba(22,163,74,0.07)':'rgba(239,68,68,0.07)', border:`1px solid ${isSuccess?'rgba(22,163,74,0.22)':'rgba(239,68,68,0.22)'}`, color:isSuccess?'#16a34a':'#dc2626', fontSize:14, fontWeight:600 }}>
              {isSuccess?'✓ ':isError?'⚠ ':''}{msgText}
            </div>
          )}
        </div>
      </section>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
