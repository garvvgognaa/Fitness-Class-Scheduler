import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaBroadcastTower,
  FaCreditCard,
  FaUsers,
  FaMobileAlt,
  FaShieldAlt
} from 'react-icons/fa';

const metrics = [
  { value: '4.9 / 5', label: 'Average client rating', detail: 'based on 5K+ reviews' },
  { value: '2,500+', label: 'Studios onboarded', detail: 'Yoga, Pilates, HIIT & dance' },
  { value: '< 2 hrs', label: 'Support response', detail: 'Global 24/7 team' },
  { value: '$42M', label: 'Payments processed', detail: 'Stripe-secured volume' }
];

const featureHighlights = [
  { icon: <FaCalendarCheck />, title: 'Appointments & Waitlists', desc: 'Smart booking calendar, check-ins, and auto waitlist fills keep every class running at capacity.' },
  { icon: <FaCreditCard />, title: 'Memberships & Packs', desc: 'Sell passes, autopay memberships, and flexible refunds while syncing revenue to Stripe instantly.' },
  { icon: <FaBroadcastTower />, title: 'Online & Hybrid Delivery', desc: 'Stream live classes, host video on demand, and share branded intake forms before anyone joins.' },
  { icon: <FaUsers />, title: 'Client CRM', desc: 'Profiles, attendance history, waivers, and notes live in one secure workspace for your whole team.' },
  { icon: <FaMobileAlt />, title: 'Custom-Branded Apps', desc: 'Launch your logo, colors, and unique booking experience without sharing the spotlight with other studios.' },
  { icon: <FaShieldAlt />, title: 'Flexible Policies', desc: 'Lock in no-contract pricing, offer self-serve refunds, and stay compliant with consent management tools.' }
];

const suiteFeatures = [
  { title: 'Booking Calendar', items: ['Unlimited locations', 'Automated reminders', 'Drop-in & series support'] },
  { title: 'Payment Tools', items: ['Deposits & installment plans', 'Promo codes & packages', 'Instant refunds'] },
  { title: 'Engagement', items: ['Custom branded emails', 'Instructor spotlights', 'Client milestones'] },
  { title: 'Reporting', items: ['Revenue & retention trends', 'Attendance health', 'Export-ready insights'] }
];

const industries = [
  'Yoga & Pilates',
  'Strength & Conditioning',
  'Dance & Barre',
  'Martial Arts',
  'Cycling Studios',
  'Swim & Youth Sports'
];

const testimonials = [
  {
    quote: 'ClassFit has been a breath of fresh air — our members book, pay, and sign waivers in minutes while I focus on teaching.',
    name: 'Jessa Peterson',
    role: 'Founder, Chapter Five Yoga'
  },
  {
    quote: 'It feels like having a personal assistant. Waitlists, packages, even Zoom links are handled before I ask.',
    name: 'Renee Paton',
    role: 'Owner, Encore Pilates Fitness'
  },
  {
    quote: 'Affordable, intuitive, and human support that replies faster than any vendor we have used.',
    name: 'Ian Davies',
    role: 'Head Coach, SO8 Muay Thai'
  }
];

const faqs = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes — enjoy the full platform for 30 days with no credit card required so your team can test every workflow.'
  },
  {
    question: 'Do you lock me into contracts?',
    answer: 'Never. Stay only if the platform keeps delivering value. Export your data or downgrade anytime.'
  },
  {
    question: 'Do you have mobile apps?',
    answer: 'Absolutely. Organizers and clients get native iOS and Android apps that mirror your brand.'
  },
  {
    question: 'How fast is customer support?',
    answer: 'Average response time is 1.5 hours. Need more? Book a screenshare with our success team 7 days a week.'
  }
];

const experiencePillars = [
  { title: 'Your Branding', desc: 'Match colors, logos, and tone so every booking touchpoint feels like your studio.' },
  { title: 'Your Revenue', desc: 'Offer memberships, class packs, or one-off events without paying extra per instructor or location.' },
  { title: 'Your Clients', desc: 'Delight members with modern UX, auto confirmations, and frictionless refunds when plans change.' }
];

function Home() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Scheduling made simple</p>
          <h1>Power every class, membership, and livestream from one dashboard.</h1>
          <p className="subtitle">
            Inspired by ClassFit’s all-in-one platform, Fitness Class Scheduler now helps studios manage bookings,
            payments, and client journeys without the usual admin drag.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Start 30-day free trial</Link>
            <Link to="/classes" className="btn btn-secondary">Book a live demo</Link>
          </div>
          <div className="hero-promises">
            <span>30 day free trial</span>
            <span>No credit card</span>
            <span>No contracts</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-card">
            <h3>Today’s Schedule</h3>
            <ul>
              <li>
                <div>
                  <strong>Sunrise Flow</strong>
                  <p>12 / 12 booked · waitlist active</p>
                </div>
                <span className="badge badge-primary">Auto-manage</span>
              </li>
              <li>
                <div>
                  <strong>HIIT Express</strong>
                  <p>Payments cleared · 2 drop-ins</p>
                </div>
                <span className="badge badge-success">On track</span>
              </li>
              <li>
                <div>
                  <strong>Livestream Sculpt</strong>
                  <p>Zoom link sent · replay ready</p>
                </div>
                <span className="badge badge-primary">Hybrid</span>
              </li>
            </ul>
            <p className="panel-footer">Automations keep every class full.</p>
          </div>
        </div>
      </section>

      <section className="metrics-section">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <h3>{metric.value}</h3>
            <p>{metric.label}</p>
            <span>{metric.detail}</span>
          </div>
        ))}
      </section>

      <section className="feature-grid" id="features">
        <div className="section-heading">
          <p className="eyebrow">All the features you expect</p>
          <h2>Run bookings, payments, and client experience in one place.</h2>
          <p>Appointments, check-ins, waitlists, branded emails, intake forms, online streaming, reports, and more.</p>
        </div>
        <div className="grid">
          {featureHighlights.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="experience-section">
        {experiencePillars.map((pillar) => (
          <div key={pillar.title} className="experience-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.desc}</p>
          </div>
        ))}
      </section>

      <section className="suite-section">
        <div className="section-heading">
          <p className="eyebrow">Your all-in-one suite</p>
          <h2>Everything from first click to final payment.</h2>
        </div>
        <div className="suite-grid">
          {suiteFeatures.map((group) => (
            <div key={group.title} className="suite-card">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="industries-section">
        <div className="section-heading">
          <p className="eyebrow">Designed around your business</p>
          <h2>Studios of every size stay flexible.</h2>
        </div>
        <div className="pill-group">
          {industries.map((industry) => (
            <span key={industry} className="pill">{industry}</span>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-heading">
          <p className="eyebrow">Rated 4.9 out of 5</p>
          <h2>Studios trust us to grow attendance and revenue.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p className="quote">“{item.quote}”</p>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Answers in one place.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Launch in minutes, scale forever.</h2>
          <p>Import clients, embed your booking calendar, and invite instructors without extra per-seat fees.</p>
        </div>
        <div className="cta-actions">
          <Link to="/register" className="btn btn-primary">Create free account</Link>
          <Link to="/login" className="btn btn-secondary">Log in</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;