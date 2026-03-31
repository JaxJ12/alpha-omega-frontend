'use client';

import { useState } from 'react';
import Link from 'next/link';

const PHONE      = '+19402906551';
const PHONE_DISP = '(940) 290-6551';
const CALENDLY   = 'https://calendly.com/jayjohnson2000';
const SPARK      = 'https://www.sparkadvisors.com/agents/jay-johnson-8914';
const GMAPS      = 'https://maps.google.com/?q=4413+Lake+View+Rd+Oak+Point+TX+75068';

const MEDICARE_TOPICS = [
  { q: 'What is Medicare?', a: 'Medicare is the federal health insurance program for Americans age 65 and older, as well as certain younger people with disabilities. It is NOT the same as Medicaid — Medicaid is a state and federal program based on income, while Medicare is based on age or disability status. Navigating the differences is one of the most common points of confusion we help seniors resolve.' },
  { q: 'Medicare Eligibility & Enrollment', a: "You're generally eligible for Medicare at age 65 if you or your spouse worked and paid Medicare taxes for at least 10 years. You can also qualify under 65 with certain disabilities or conditions like ALS or End-Stage Renal Disease. Initial Enrollment starts 3 months before your 65th birthday and ends 3 months after — missing this window can result in permanent late enrollment penalties." },
  { q: 'What is Original Medicare?', a: 'Original Medicare is the federal health insurance program consisting of Part A (Hospital Insurance) and Part B (Medical Insurance). While it covers a wide range of healthcare services, it does NOT have an out-of-pocket maximum — meaning you could be exposed to unlimited costs without supplemental coverage. Most beneficiaries add either a Medicare Supplement or Medicare Advantage plan for more complete protection.' },
  { q: 'Medicare Part A — Hospital Insurance', a: "Medicare Part A covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health services. Most people don't pay a monthly premium for Part A if they worked and paid Medicare taxes for at least 10 years. However, there are deductibles and coinsurance costs that can add up quickly without supplemental coverage." },
  { q: 'Medicare Part B — Medical Insurance', a: 'Medicare Part B covers outpatient medical services including doctor visits, preventive care, outpatient surgery, lab tests, and medical equipment. Part B has a monthly premium (which varies based on your income) as well as an annual deductible and a 20% coinsurance on covered services after the deductible — with no annual maximum out-of-pocket limit.' },
  { q: 'Additional Coverage Options', a: 'Because Original Medicare has no out-of-pocket maximum, most beneficiaries add additional coverage through either a Medicare Supplement (Medigap) plan or a Medicare Advantage plan. These options help cap your potential healthcare costs and protect you from large, unexpected medical bills. Choosing the right option depends on your health, finances, and preferred doctors.' },
  { q: 'Medicare Supplement vs. Medicare Advantage', a: 'Medicare Supplement (Medigap) plans pay alongside Original Medicare — you keep your Medicare card and pay a monthly premium for predictable, low-cost coverage. Medicare Advantage plans replace Original Medicare and are bundled all-in-one plans with built-in limits but often lower premiums. We often describe it as "set it and forget it" (Supplement) versus "pay as you go" (Advantage).' },
  { q: 'Medicare Supplement / Medigap', a: 'Medigap plans are sold by private insurance companies and are standardized by the government — Plan G, for example, covers the same benefits regardless of which insurer you choose. The main difference between companies is the price. These plans work nationwide with any provider that accepts Medicare, making them ideal for frequent travelers or those who see specialists regularly.' },
  { q: 'Medicare Advantage / Part C', a: 'Medicare Advantage plans (Part C) are offered by private insurers as an all-in-one alternative to Original Medicare. They typically include Part A, Part B, and often Part D drug coverage, plus extras like dental, vision, and hearing. However, they usually use provider networks (HMO or PPO), so you need to confirm your doctors are in-network before enrolling.' },
  { q: 'What Original Medicare Does NOT Cover', a: "Original Medicare has important coverage gaps. It generally does NOT cover routine dental care, vision exams and glasses, hearing aids, most prescription drugs (without Part D), long-term care, and most care received outside the United States. Understanding these gaps is critical to planning your coverage correctly and avoiding unexpected out-of-pocket costs." },
  { q: 'Medicare Part D — Prescription Drug Coverage', a: 'Medicare Part D adds prescription drug coverage to your Medicare plan. You can enroll in a standalone Part D plan if you have Original Medicare with a Supplement, or your Medicare Advantage plan may include drug coverage. Each Part D plan has a formulary (list of covered drugs), and costs vary significantly between plans — we help you compare plans based on your specific medications.' },
  { q: 'Special Needs Plans (SNP)', a: 'Special Needs Plans are a type of Medicare Advantage plan designed for people with specific diseases, conditions, or characteristics. There are three types: Chronic Condition SNPs (for conditions like diabetes or heart failure), Dual Eligible SNPs (for those on both Medicare and Medicaid), and Institutional SNPs (for people in nursing homes or similar facilities). These plans offer more targeted and coordinated care.' },
];

const WHY_CARDS = [
  { icon: '⚖️', title: 'Truly Unbiased', body: "As an independent advisor, Jay works for YOU — not for any insurance company. There are no quotas, no pressure, and no hidden incentives to push any particular plan." },
  { icon: '🗂️', title: 'Full Market Access', body: "We represent 8 top insurance carriers offering nearly 200 plans in your area. You'll see every option available to you, compared side by side — something captive agents simply can't offer." },
  { icon: '🤝', title: 'No Cost to You', body: "Our guidance is completely free. Advisors are compensated by the insurance carriers, not by you — so you get expert, personalized Medicare advice at absolutely no charge." },
];

const STEPS = [
  { n: '01', icon: '📞', title: 'Book a Free Call', body: 'Schedule a no-cost, no-obligation Medicare review at a time that works for you — evenings and Saturdays available.' },
  { n: '02', icon: '📋', title: 'Review Your Options', body: "Jay walks you through every plan available in your area, side by side. Plain English, no jargon — just the facts you need." },
  { n: '03', icon: '🎯', title: 'Get Covered with Confidence', body: 'Enroll in the plan that fits your needs and budget. Jay handles all the paperwork and stays available after enrollment.' },
];

const TESTIMONIALS = [
  { quote: "Jay helped me understand my options in plain English. I had been paying too much for years — he found me a better plan and I'm saving over $180 a month.", name: 'Margaret T.', location: 'Denton, TX' },
  { quote: 'I was dreading dealing with Medicare. Jay made the entire process easy and never once made me feel rushed. I finally feel confident about my coverage.', name: 'Robert K.', location: 'Little Elm, TX' },
  { quote: 'Because Jay is independent, he could show me every option — not just a handful. That made all the difference in finding the right plan for my situation.', name: 'Linda S.', location: 'Oak Point, TX' },
];

const btnPrimary = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 52, padding: '0 30px',
  background: 'var(--color-accent)', color: '#fff',
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15,
  borderRadius: 'var(--radius-sm)', border: 'none',
  boxShadow: 'var(--shadow-gold)', cursor: 'pointer',
  textDecoration: 'none', transition: 'transform .2s, box-shadow .2s',
  whiteSpace: 'nowrap', letterSpacing: '0.2px',
};
const btnOutline = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 52, padding: '0 30px',
  background: 'transparent', color: 'rgba(255,255,255,0.88)',
  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15,
  borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(255,255,255,0.25)',
  cursor: 'pointer', textDecoration: 'none',
  transition: 'border-color .2s, color .2s', whiteSpace: 'nowrap',
};
const btnDark = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 52, padding: '0 30px',
  background: 'var(--color-primary)', color: '#fff',
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15,
  borderRadius: 'var(--radius-sm)', border: 'none',
  boxShadow: 'var(--shadow-md)', cursor: 'pointer',
  textDecoration: 'none', transition: 'opacity .2s', whiteSpace: 'nowrap',
};

const SLabel = ({ children }) => (
  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 14 }}>
    {children}
  </p>
);

export default function Home() {
  const [open, setOpen] = useState(null);
  const toggle = i => setOpen(open === i ? null : i);

  return (
    <main style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        background: 'rgba(10,31,56,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(201,150,58,0.18)', height: 72,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <a href="/" style={{ fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
              Alpha <span style={{ color: 'var(--color-accent)' }}>&</span> Omega
            </div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>AGENCY</div>
          </a>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {[['#about','About'],['#medicare','Medicare Info'],['#how','How It Works'],['#contact','Contact']].map(([h,l]) => (
              <a key={h} href={h} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e=>e.target.style.color='var(--color-accent-light)'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.65)'} className="hidden md:block">{l}</a>
            ))}
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ ...btnPrimary, height: 40, padding: '0 20px', fontSize: 13, boxShadow: 'none' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.88'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              Book Free Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #071830 0%, #0D2545 55%, #102040 100%)',
        paddingTop: 72, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '5%', right: '-14%', width: 680, height: 680, borderRadius: '50%', border: '1px solid rgba(201,150,58,0.07)' }} />
          <div style={{ position: 'absolute', top: '14%', right: '-7%', width: 460, height: 460, borderRadius: '50%', border: '1px solid rgba(201,150,58,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-18%', left: '-8%', width: 580, height: 580, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,150,58,0.05) 0%, transparent 65%)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="anim-1" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(201,150,58,0.12)', border: '1px solid rgba(201,150,58,0.28)',
                borderRadius: 100, padding: '7px 18px', marginBottom: 28,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
                <span style={{ color: 'var(--color-accent-light)', fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Independent Medicare Advisor · Oak Point, TX
                </span>
              </div>
              <h1 className="anim-2" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(50px, 7.5vw, 84px)',
                fontWeight: 700, color: '#fff',
                marginBottom: 24, lineHeight: 1.06,
              }}>
                Medicare<br />Made <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Easy.</span>
              </h1>
              <p className="anim-3" style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: 40, maxWidth: 500 }}>
                Expert, unbiased guidance to find the right Medicare coverage —
                from someone who works for <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>you</strong>, not the insurance companies.
              </p>
              <div className="anim-4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnPrimary}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 44px rgba(201,150,58,0.45)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='var(--shadow-gold)';}}>
                  Book Free Consultation →
                </a>
                <a href={SPARK} target="_blank" rel="noopener noreferrer" style={btnOutline}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.5)';e.currentTarget.style.color='#fff';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.25)';e.currentTarget.style.color='rgba(255,255,255,0.88)';}}>
                  Compare Plans
                </a>
              </div>
              <div className="anim-5" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,150,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📞</div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Call or text anytime</div>
                  <a href={`tel:${PHONE}`} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--color-accent-light)', textDecoration: 'none', letterSpacing: '-0.3px' }}>
                    {PHONE_DISP}
                  </a>
                </div>
              </div>
            </div>

            {/* Trust card — hidden on very small screens */}
            <div className="anim-6" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 22, padding: 40, width: '100%', maxWidth: 380,
                boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 24 }}>Why Choose Independent?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {['Compare 200+ plans from 8 top carriers','No cost, no obligation — ever','Completely unbiased advice','Local Texas expert you can call','Support continues after you enroll','Evening & Saturday appointments'].map(item => (
                    <div key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(201,150,58,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#C9963A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14.5, lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.09)', display: 'flex', justifyContent: 'space-around' }}>
                  {[['8','Carriers'],['200+','Plans'],['Free','Always']].map(([v,l]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1 }}>{v}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div style={{ background: '#0A1F38', borderBottom: '1px solid rgba(201,150,58,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 24px', display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {[['🏅','Independent Advisor'],['📋','8 Insurance Carriers'],['💼','200+ Plans Available'],['📍','Oak Point, TX'],['✅','No Cost to You']].map(([icon,label],i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, #0A1F38 0%, #143A6B 100%)', borderRadius: 22, padding: 48, boxShadow: '0 28px 80px rgba(10,31,56,0.22)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1, marginBottom: 20 }}>α & ω</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: '#fff', marginBottom: 12, lineHeight: 1.25 }}>Alpha & Omega Agency</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 28, borderLeft: '3px solid rgba(201,150,58,0.4)', paddingLeft: 14 }}>
                "We are here to serve, not be served."
              </div>
              {['Licensed Medicare Insurance Advisor','Serving North Texas Seniors','Independent — No Carrier Quotas','Evening & Saturday Appointments'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: -18, right: -18, width: 76, height: 76, borderRadius: 16, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: 'var(--shadow-gold)' }}>🛡️</div>
          </div>
          <div>
            <SLabel>About Alpha & Omega</SLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 50px)', fontWeight: 700, color: '#0D2545', marginBottom: 24, lineHeight: 1.1 }}>
              Independent Guidance You Can Trust
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#374151', fontSize: 16, lineHeight: 1.8 }}>
              <p>At Alpha & Omega Agency, we specialize in helping individuals navigate the confusing Medicare system. Our <strong style={{ color: '#0D2545' }}>independent status</strong> allows us to review plans from all insurance carriers — ensuring you find the right coverage for your unique needs, not what's most profitable for us.</p>
              <p>We currently represent <strong style={{ color: '#0D2545' }}>8 insurance organizations</strong> offering close to <strong style={{ color: '#0D2545' }}>200 products</strong> in your area. That means you get a comprehensive comparison — not just the options a captive agent is allowed to sell.</p>
              <p>Whether you're turning 65, retiring, losing employer coverage, or simply reviewing your existing plan, we're here to make the process clear, simple, and completely stress-free.</p>
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnDark} onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>Book a Free Review</a>
              <a href={`tel:${PHONE}`} style={{ display:'inline-flex',alignItems:'center',gap:8,height:52,padding:'0 24px',borderRadius:10,border:'1.5px solid #E5DDD1',color:'#0D2545',fontWeight:700,fontSize:15,fontFamily:'var(--font-body)',textDecoration:'none',transition:'border-color .2s' }} onMouseEnter={e=>e.currentTarget.style.borderColor='#0D2545'} onMouseLeave={e=>e.currentTarget.style.borderColor='#E5DDD1'}>
                📞 {PHONE_DISP}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INDEPENDENT ── */}
      <section style={{ background: 'var(--color-bg)', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}>
            <SLabel>Why Choose Independent</SLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 700, color: '#0D2545', marginBottom: 16, lineHeight: 1.1 }}>Your Advisor. Your Advocate.</h2>
            <p style={{ color: '#6B7280', fontSize: 17, lineHeight: 1.75 }}>An independent Medicare advisor works for you — not for any single insurance company. Here's what that means in practice.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {WHY_CARDS.map(card => (
              <div key={card.title} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5DDD1', padding: 40, boxShadow: '0 2px 14px rgba(10,31,56,0.07)', transition: 'transform .25s, box-shadow .25s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 56px rgba(10,31,56,0.13)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 14px rgba(10,31,56,0.07)';}}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(201,150,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 24 }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: '#0D2545', marginBottom: 10 }}>{card.title}</h3>
                <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: 15 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICARE EDUCATION ── */}
      <section id="medicare" style={{ background: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 88 }}>
            <SLabel>Medicare Explained</SLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0D2545', marginBottom: 16, lineHeight: 1.1 }}>Everything You Need to Know</h2>
            <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>Medicare can be confusing. We break it down into plain English — from eligibility to plan differences.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnDark} onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              Have Questions? Book a Call
            </a>
          </div>
          <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {MEDICARE_TOPICS.map((topic, i) => (
              <div key={i} style={{ borderRadius: 10, border: `1px solid ${open===i?'rgba(201,150,58,0.35)':'#E5DDD1'}`, overflow: 'hidden', transition: 'border-color .2s' }}>
                <button onClick={() => toggle(i)} style={{ width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: open===i?'rgba(201,150,58,0.04)':'#fff', border: 'none', cursor: 'pointer', gap: 16, transition: 'background .2s' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: '#0D2545', textAlign: 'left', lineHeight: 1.3 }}>{topic.q}</span>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: open===i?'var(--color-accent)':'rgba(201,150,58,0.12)', color: open===i?'#fff':'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, lineHeight: 1, transition: 'all .2s' }}>
                    {open===i?'−':'+'}
                  </span>
                </button>
                {open===i && (
                  <div className="accordion-body" style={{ padding: '0 24px 20px', background: 'rgba(201,150,58,0.025)' }}>
                    <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.8 }}>{topic.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ background: '#0D2545', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 64px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 14 }}>The Process</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>How It Works</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.75 }}>Three simple steps to get the Medicare coverage that's right for you.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {STEPS.map((step, i) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 700, color: 'rgba(201,150,58,0.18)', lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: 'rgba(201,150,58,0.12)', border: '1px solid rgba(201,150,58,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-22px auto 20px', fontSize: 24 }}>{step.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: 15, lineHeight: 1.8 }}>{step.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnPrimary}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 44px rgba(201,150,58,0.45)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='var(--shadow-gold)';}}>
              Start with Step 1 — Book a Free Call →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'var(--color-bg)', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <SLabel>Client Stories</SLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 700, color: '#0D2545' }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5DDD1', padding: 32, boxShadow: '0 2px 14px rgba(10,31,56,0.07)', display: 'flex', flexDirection: 'column', transition: 'transform .25s, box-shadow .25s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 10px 40px rgba(10,31,56,0.11)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 14px rgba(10,31,56,0.07)';}}>
                <div style={{ color: 'var(--color-accent)', fontSize: 32, marginBottom: 12, lineHeight: 1 }}>"</div>
                <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.8, flex: 1, marginBottom: 24 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #143A6B, #0D2545)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--color-accent)', flexShrink: 0 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0D2545', fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{t.location}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                    {[1,2,3,4,5].map(s=><span key={s} style={{ color:'var(--color-accent)',fontSize:13 }}>★</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: '#fff', padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, #071830 0%, #0D2545 100%)', borderRadius: 28, padding: '64px 48px', textAlign: 'center', boxShadow: '0 28px 80px rgba(10,31,56,0.22)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,150,58,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16 }}>Free Consultation</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
              Ready to Find the Right Medicare Plan?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 17, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.75 }}>
              Book a free, no-obligation Medicare review with Jay Johnson. Evening and Saturday appointments available.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnPrimary}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 44px rgba(201,150,58,0.45)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='var(--shadow-gold)';}}>
                📅 Book on Calendly →
              </a>
              <a href={`tel:${PHONE}`} style={btnOutline}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.5)';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.25)';e.currentTarget.style.color='rgba(255,255,255,0.88)';}}>
                📞 Call {PHONE_DISP}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: 'var(--color-bg)', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64 }}>
          <div>
            <SLabel>Get In Touch</SLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0D2545', marginBottom: 20, lineHeight: 1.1 }}>We're Here to Help</h2>
            <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>Medicare questions don't wait for business hours. Reach out by phone, book online, or visit our Oak Point office.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon:'📞', label:'Phone', value:PHONE_DISP, href:`tel:${PHONE}` },
                { icon:'📍', label:'Address', value:'4413 Lake View Rd, Oak Point, TX 75068', href:GMAPS },
                { icon:'🕐', label:'Hours', value:'Mon–Fri 8:00 AM – 5:00 PM · Evening & Sat by request', href:null },
                { icon:'📅', label:'Book Online', value:'Schedule a free consultation on Calendly', href:CALENDLY },
              ].map(({icon,label,value,href}) => (
                <div key={label} style={{ display:'flex',gap:16,alignItems:'flex-start' }}>
                  <div style={{ width:44,height:44,borderRadius:10,background:'rgba(201,150,58,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase',color:'#9CA3AF',marginBottom:3 }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{ color:'#0D2545',fontWeight:600,fontSize:15,textDecoration:'none',transition:'color .2s' }}
                        onMouseEnter={e=>e.target.style.color='var(--color-accent)'} onMouseLeave={e=>e.target.style.color='#0D2545'}>{value}</a>
                    ) : (
                      <span style={{ color:'#374151',fontSize:15 }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'#fff',borderRadius:20,border:'1px solid #E5DDD1',padding:40,boxShadow:'0 2px 14px rgba(10,31,56,0.07)',display:'flex',flexDirection:'column',gap:24 }}>
            <h3 style={{ fontFamily:'var(--font-display)',fontSize:28,fontWeight:700,color:'#0D2545',lineHeight:1.2 }}>Book Your Free Medicare Review</h3>
            <p style={{ color:'#6B7280',fontSize:15,lineHeight:1.75 }}>A no-cost, no-obligation conversation with Jay Johnson to review your Medicare options — on your schedule.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ ...btnDark, justifyContent:'center' }} onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              📅 Schedule on Calendly
            </a>
            <a href={SPARK} target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,height:52,borderRadius:10,border:'1.5px solid #E5DDD1',color:'#0D2545',fontWeight:700,fontSize:15,fontFamily:'var(--font-body)',textDecoration:'none',transition:'all .2s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--color-accent)';e.currentTarget.style.background='rgba(201,150,58,0.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#E5DDD1';e.currentTarget.style.background='transparent';}}>
              Compare Plans via Spark Advisors →
            </a>
            <p style={{ fontSize:12,color:'#9CA3AF',textAlign:'center',lineHeight:1.6 }}>Evening & Saturday appointments available upon request.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#071830',borderTop:'1px solid rgba(201,150,58,0.12)' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',padding:'48px 24px 32px' }}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:40,marginBottom:40 }}>
            <div>
              <div style={{ fontFamily:'var(--font-display)',fontSize:24,fontWeight:700,color:'#fff',marginBottom:16 }}>
                Alpha <span style={{ color:'var(--color-accent)' }}>&</span> Omega
              </div>
              <p style={{ color:'rgba(255,255,255,0.4)',fontSize:14,lineHeight:1.75 }}>Independent Medicare guidance for seniors. Serving Oak Point, TX and surrounding communities.</p>
            </div>
            <div>
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'var(--color-accent)',marginBottom:16 }}>Quick Links</div>
              {[['#about','About Us'],['#medicare','Medicare Info'],['#how','How It Works'],['#contact','Contact'],[CALENDLY,'Book a Consultation']].map(([href,label]) => (
                <a key={href} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{ display:'block',color:'rgba(255,255,255,0.4)',fontSize:14,textDecoration:'none',marginBottom:8,transition:'color .2s' }}
                  onMouseEnter={e=>e.target.style.color='var(--color-accent-light)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}>{label}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'var(--color-accent)',marginBottom:16 }}>Contact</div>
              <a href={`tel:${PHONE}`} style={{ display:'block',color:'rgba(255,255,255,0.6)',fontSize:14,textDecoration:'none',marginBottom:8 }}>{PHONE_DISP}</a>
              <a href={GMAPS} target="_blank" rel="noopener noreferrer" style={{ display:'block',color:'rgba(255,255,255,0.4)',fontSize:13,textDecoration:'none',lineHeight:1.7,marginBottom:8 }}>4413 Lake View Rd<br/>Oak Point, TX 75068</a>
              <span style={{ color:'rgba(255,255,255,0.3)',fontSize:13 }}>Mon–Fri 8:00 AM – 5:00 PM</span>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:24 }}>
            <p style={{ color:'rgba(255,255,255,0.28)',fontSize:11,lineHeight:1.75,maxWidth:860,marginBottom:12 }}>
              We do not offer every plan available in your area. Currently we represent 8 organizations which offer close to 200 products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options.
            </p>
            <p style={{ color:'rgba(255,255,255,0.22)',fontSize:11 }}>© {new Date().getFullYear()} Alpha & Omega Agency. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
