'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const statConfig = [
  { key: 'totalCalls',      label: 'Total Calls',      icon: '📞', format: v => v,        color: '#143A6B', accent: 'rgba(20,58,107,0.1)' },
  { key: 'totalProposals',  label: 'Proposals Sent',   icon: '📋', format: v => v,        color: '#C9963A', accent: 'rgba(201,150,58,0.1)' },
  { key: 'totalLeads',      label: 'Active Leads',     icon: '👥', format: v => v,        color: '#0B7A5E', accent: 'rgba(11,122,94,0.1)'  },
  { key: 'conversionRate',  label: 'Conversion Rate',  icon: '📈', format: v => `${v}%`,  color: '#7C3AED', accent: 'rgba(124,58,237,0.1)' },
  { key: 'emailOpenRate',   label: 'Email Open Rate',  icon: '✉️', format: v => `${v}%`,  color: '#B45309', accent: 'rgba(180,83,9,0.1)'   },
];

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
            <Link href="/chatbot" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-lt)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>Upload Call</Link>
            <Link href="/dashboard" style={{ color: 'var(--gold-lt)', fontSize: 15, fontWeight: 600 }}>Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>
              Performance Overview
            </p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 700, color: 'var(--navy)' }}>
              Dashboard
            </h1>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', borderRadius: 8, padding: '8px 16px',
            border: '1px solid var(--border)', fontSize: 13, color: 'var(--muted)'
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 0 3px rgba(34,197,94,0.15)' }} />
            Live · updates every 5s
          </div>
        </div>

        {/* Stats grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{
              width: 40, height: 40, margin: '0 auto 20px',
              border: '3px solid var(--border)', borderTopColor: 'var(--gold)',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>Loading metrics...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            {statConfig.map((s, i) => (
              <div key={s.key} style={{
                background: '#fff', borderRadius: 16, padding: '28px 24px',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 16px rgba(11,37,69,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                animation: `fadeUp 0.5s ${i * 0.08}s ease both`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(11,37,69,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(11,37,69,0.06)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {s.label}
                  </p>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: s.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16
                  }}>{s.icon}</div>
                </div>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 36, fontWeight: 700,
                  color: s.color, lineHeight: 1
                }}>
                  {s.format(metrics[s.key])}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quick actions */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '32px',
          border: '1px solid var(--border)',
          boxShadow: '0 2px 16px rgba(11,37,69,0.06)'
        }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginBottom: 20 }}>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/chatbot" style={{
              background: 'var(--navy)', color: '#fff',
              padding: '11px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              transition: 'opacity 0.2s', display: 'inline-block'
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              + Upload New Call
            </Link>
            <button style={{
              background: 'var(--cream)', color: 'var(--navy)',
              padding: '11px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              border: '1px solid var(--border)', transition: 'border-color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--navy)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              Export Report
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
