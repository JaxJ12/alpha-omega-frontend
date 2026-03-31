'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STAT_CONFIG = [
  { key:'totalCalls',     label:'Total Calls',     icon:'📞', format:v=>v,        color:'#0D2545', accent:'rgba(13,37,69,0.09)',  change:'+12%' },
  { key:'totalProposals', label:'Proposals Sent',  icon:'📋', format:v=>v,        color:'#C9963A', accent:'rgba(201,150,58,0.09)', change:'+8%'  },
  { key:'totalLeads',     label:'Active Leads',    icon:'👥', format:v=>v,        color:'#1A6B52', accent:'rgba(26,107,82,0.09)',  change:'+5'   },
  { key:'conversionRate', label:'Conversion Rate', icon:'📈', format:v=>`${v}%`,  color:'#7C3AED', accent:'rgba(124,58,237,0.09)', change:'+2.1%'},
  { key:'emailOpenRate',  label:'Email Open Rate', icon:'✉️',  format:v=>`${v}%`,  color:'#B45309', accent:'rgba(180,83,9,0.09)',   change:'+4.3%'},
];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({ totalCalls:0, totalProposals:0, totalLeads:0, conversionRate:0, emailOpenRate:0 });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const r = await fetch('http://localhost:3001/api/dashboard/metrics');
        const d = await r.json();
        setMetrics(d.metrics);
        setLastUpdated(new Date());
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetch_();
    const iv = setInterval(fetch_, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <main style={{ minHeight:'100vh', background:'var(--color-bg)', fontFamily:'var(--font-body)' }}>
      <nav style={{ background:'rgba(10,31,56,0.97)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(201,150,58,0.18)', height:72 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', justifyContent:'space-between', alignItems:'center', height:'100%' }}>
          <Link href="/" style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#fff', textDecoration:'none' }}>
            Alpha <span style={{ color:'var(--color-accent)' }}>&</span> Omega
          </Link>
          <div style={{ display:'flex', gap:32, alignItems:'center' }}>
            <Link href="/chatbot" style={{ color:'rgba(255,255,255,0.6)', fontSize:14, fontWeight:600, textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='var(--color-accent-light)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.6)'}>Upload Call</Link>
            <span style={{ color:'var(--color-accent-light)', fontSize:14, fontWeight:700 }}>Dashboard</span>
          </div>
        </div>
      </nav>

      <section style={{ maxWidth:1200, margin:'0 auto', padding:'56px 24px' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:10 }}>Performance Overview</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,5vw,40px)', fontWeight:700, color:'var(--color-primary)', lineHeight:1.1 }}>Dashboard</h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', borderRadius:8, padding:'8px 16px', border:'1px solid var(--color-border)', fontSize:13, color:'var(--color-text-muted)' }}>
            <span style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',display:'inline-block',boxShadow:'0 0 0 3px rgba(34,197,94,0.15)' }} />
            Live · refreshes every 5s
            {lastUpdated && <span style={{ color:'var(--color-text-muted)',fontSize:11,marginLeft:4 }}>· {lastUpdated.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ width:40,height:40,margin:'0 auto 20px',border:'3px solid var(--color-border)',borderTopColor:'var(--color-accent)',borderRadius:'50%',animation:'spin .8s linear infinite' }} />
            <p style={{ color:'var(--color-text-muted)', fontSize:15 }}>Loading metrics...</p>
          </div>
        ) : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:18, marginBottom:32 }}>
              {STAT_CONFIG.map((s,i) => (
                <div key={s.key} style={{ background:'#fff', borderRadius:16, padding:'24px 22px', border:'1px solid var(--color-border)', boxShadow:'var(--shadow-xs)', transition:'transform .2s, box-shadow .2s', animation:`fadeUp .5s ${i*.08}s ease both` }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='var(--shadow-md)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='var(--shadow-xs)';}}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
                    <p style={{ fontSize:11,fontWeight:700,color:'var(--color-text-muted)',letterSpacing:'0.5px',textTransform:'uppercase' }}>{s.label}</p>
                    <div style={{ width:34,height:34,borderRadius:9,background:s.accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>{s.icon}</div>
                  </div>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:38, fontWeight:700, color:s.color, lineHeight:1, marginBottom:8 }}>{s.format(metrics[s.key])}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:11,fontWeight:700,color:'#16a34a',background:'rgba(22,163,74,0.09)',padding:'2px 7px',borderRadius:100 }}>↑ {s.change}</span>
                    <span style={{ fontSize:11,color:'var(--color-text-muted)' }}>vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ background:'#fff', borderRadius:16, padding:32, border:'1px solid var(--color-border)', boxShadow:'var(--shadow-xs)' }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:600, color:'var(--color-primary)', marginBottom:20 }}>Quick Actions</h3>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Link href="/chatbot" style={{ display:'inline-flex',alignItems:'center',justifyContent:'center',height:44,padding:'0 22px',background:'var(--color-primary)',color:'#fff',borderRadius:8,fontSize:14,fontWeight:700,fontFamily:'var(--font-body)',textDecoration:'none',transition:'opacity .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  + Upload New Call
                </Link>
                <button style={{ display:'inline-flex',alignItems:'center',height:44,padding:'0 22px',background:'var(--color-bg)',color:'var(--color-primary)',borderRadius:8,fontSize:14,fontWeight:600,fontFamily:'var(--font-body)',border:'1.5px solid var(--color-border)',cursor:'pointer',transition:'border-color .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='var(--color-primary)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--color-border)'}>
                  Export Report
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </main>
  );
}
