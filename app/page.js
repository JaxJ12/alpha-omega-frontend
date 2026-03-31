'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: 'var(--cream)', color: 'var(--text)' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: 'rgba(11,37,69,0.97)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,150,58,0.2)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 68 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
            Alpha <span style={{ color: 'var(--gold)' }}>&</span> Omega
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <Link href="/chatbot" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-lt)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}>
              Upload Call
            </Link>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-lt)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}>
              Dashboard
            </Link>
            <Link href="/chatbot" style={{
              background: 'var(--gold)', color: '#fff', borderRadius: 8,
              padding: '9px 22px', fontSize: 14, fontWeight: 600, transition: 'opacity 0.2s'
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0B2545 0%, #143A6B 60%, #0B2545 100%)',
        position: 'relative', overflow: 'hidden', paddingTop: 68
      }}>
        {/* decorative background rings */}
        <div style={{
          position: 'absolute', top: '10%', right: '-8%',
          width: 500, height: 500,
          borderRadius: '50%',
          border: '1px solid rgba(201,150,58,0.12)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '18%', right: '-2%',
          width: 340, height: 340,
          borderRadius: '50%',
          border: '1px solid rgba(201,150,58,0.08)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,150,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
            <div className="fade-up-1" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,150,58,0.15)', border: '1px solid rgba(201,150,58,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 28
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
              <span style={{ color: 'var(--gold-lt)', fontSize: 13, fontWeight: 500, letterSpacing: '0.5px' }}>
                Medicare Experts You Can Trust
              </span>
            </div>

            <h1 className="fade-up-2" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(42px, 6vw, 72px)',
              fontWeight: 700, lineHeight: 1.1,
              color: '#fff', marginBottom: 24
            }}>
              Medicare Made<br />
              <span style={{ color: 'var(--gold)' }}>Simple.</span>
            </h1>

            <p className="fade-up-3" style={{
              fontSize: 19, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.72)',
              marginBottom: 44, maxWidth: 520
            }}>
              Personalized guidance for seniors navigating Medicare — from Part A to Part D,
              we help you understand your coverage and make confident decisions.
            </p>

            <div className="fade-up-4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/chatbot" style={{
                background: 'var(--gold)',
                color: '#fff', fontWeight: 600, fontSize: 16,
                padding: '15px 36px', borderRadius: 10,
                boxShadow: '0 8px 32px rgba(201,150,58,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'inline-block'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,150,58,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,150,58,0.35)'; }}>
                Start a Consultation
              </Link>
              <Link href="/dashboard" style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: 16,
                padding: '15px 36px', borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'border-color 0.2s, color 0.2s',
                display: 'inline-block'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}>
                View Dashboard
              </Link>
            </div>

            <div className="fade-up-5" style={{ marginTop: 56, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[['500+', 'Clients Served'], ['98%', 'Satisfaction Rate'], ['15+', 'Years Experience']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: 'var(--gold)' }}>{val}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 2, fontWeight: 500, letterSpacing: '0.3px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '100px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>
              What We Offer
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>
              Guidance at Every Step
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Whether you&apos;re enrolling for the first time or reviewing your existing plan, we&apos;re with you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              {
                icon: '🛡️',
                title: 'Plan Comparison',
                desc: 'We analyze Medicare Advantage, Supplement, and Part D plans side-by-side to find the best fit for your needs and budget.'
              },
              {
                icon: '📞',
                title: 'Call Analysis',
                desc: 'Upload recorded consultations and our system transcribes and summarizes key action items, coverage gaps, and next steps.'
              },
              {
                icon: '📊',
                title: 'Performance Insights',
                desc: 'Track outreach metrics, proposal conversions, and client pipeline in a clean, real-time dashboard built for agents.'
              }
            ].map((f, i) => (
              <div key={f.title} style={{
                background: '#fff',
                borderRadius: 16, padding: '40px 32px',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 20px rgba(11,37,69,0.06)',
                transition: 'transform 0.25s, box-shadow 0.25s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(11,37,69,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(11,37,69,0.06)'; }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(201,150,58,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, marginBottom: 24
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 24px', background: 'var(--navy)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>
              The Process
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: '#fff' }}>
              How It Works
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
            {[
              { step: '01', title: 'Upload Your Call', desc: 'Drop in a call transcript or audio file from a client consultation.' },
              { step: '02', title: 'AI Analysis', desc: 'Our system identifies coverage needs, objections, and key follow-up actions.' },
              { step: '03', title: 'Review Insights', desc: 'Get a clear summary with recommended next steps for each client.' },
              { step: '04', title: 'Track & Close', desc: 'Monitor your pipeline in the dashboard and convert more leads.' }
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 48, fontWeight: 700, color: 'rgba(201,150,58,0.25)',
                  lineHeight: 1, marginBottom: 16
                }}>{s.step}</div>
                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{s.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          background: 'var(--navy)', borderRadius: 24, padding: '64px 48px',
          boxShadow: '0 20px 60px rgba(11,37,69,0.18)'
        }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Ready to simplify Medicare?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>
            Upload your first call today and see how Alpha & Omega can help you serve more clients with confidence.
          </p>
          <Link href="/chatbot" style={{
            background: 'var(--gold)', color: '#fff',
            fontWeight: 600, fontSize: 16, padding: '15px 40px',
            borderRadius: 10, display: 'inline-block',
            boxShadow: '0 8px 32px rgba(201,150,58,0.4)',
            transition: 'opacity 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Upload a Call →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#07192F', padding: '40px 24px',
        borderTop: '1px solid rgba(201,150,58,0.15)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Alpha <span style={{ color: 'var(--gold)' }}>&</span> Omega
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
            © {new Date().getFullYear()} Alpha & Omega. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/chatbot" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-lt)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>Upload Call</Link>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-lt)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>Dashboard</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
