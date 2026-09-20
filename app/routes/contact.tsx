import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link, useOutletContext } from '@remix-run/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Calculator,
  Calendar,
  Globe,
  Navigation,
} from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { siteConfig } from '~/data/siteConfig';
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
  UpworkIcon,
  StackOverflowIcon,
  FreelancerIcon,
  GuruIcon,
  ArcDevIcon,
} from '~/components/BrandIcons';

export const meta: MetaFunction = () => {
  const canonicalUrl = 'https://www.nazmulcodes.org/contact';

  return [
    { charSet: 'utf-8' },
    { title: 'Editorial Inquiries & Tech Consulting | NazmulCodes' },
    {
      name: 'description',
      content:
        'Connect directly with Nazmul Hawlader, Senior Shopify Developer & Full-Stack Engineer. Reach out via WhatsApp, Phone, Direct Email, Facebook, LinkedIn, Twitter, Instagram, or visit our Dhaka office.',
    },
    {
      name: 'keywords',
      content:
        'Nazmul Hawlader contact, NazmulCodes social media, Nazmul Hawlader phone number, Nazmul Hawlader office Dhaka, hire Shopify developer Bangladesh, NazmulCodes WhatsApp, Nazmul Hawlader LinkedIn, Nazmul Hawlader Twitter',
    },
    { name: 'robots', content: 'index, follow' },
    // ✅ সেলফ-ক্যানোনিকাল ট্যাগ যুক্ত করা হলো
    {
      tagName: 'link',
      rel: 'canonical',
      href: canonicalUrl,
    },
    { property: 'og:title', content: 'Contact & Connect with Nazmul Hawlader | Social Profiles & Direct Channels' },
    {
      property: 'og:description',
      content:
        'Reach out directly without any forms. Phone, WhatsApp, Direct Email, Social Media Profiles, and Office Address in Dhaka, Bangladesh.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: 'https://www.nazmulcodes.org/assets/images/profile/nazmul-lg.webp' },
  ];
};

export default function ContactPage() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(siteConfig.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyPhone = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(siteConfig.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const socialChannels = [
    {
      name: 'LinkedIn',
      badge: 'Professional Network',
      handle: 'nazmul-hawlader',
      url: siteConfig.linkedinUrl,
      description: 'Consulting inquiries, professional recommendations, client endorsements & enterprise discussions.',
      actionText: 'Connect on LinkedIn',
      icon: <LinkedinIcon size={26} color="#0A66C2" />,
      accentColor: '#0A66C2',
      bgGlow: 'rgba(10, 102, 194, 0.08)',
    },
    {
      name: 'X (Twitter)',
      badge: '@NHawlader79489',
      handle: '@NHawlader79489',
      url: siteConfig.twitterUrl,
      description: 'Technical threads on Shopify apps, Remix, GraphQL, Liquid performance, and web engineering.',
      actionText: 'Follow @NHawlader79489',
      icon: <TwitterIcon size={24} color="var(--text-primary)" />,
      accentColor: 'var(--text-primary)',
      bgGlow: 'rgba(255, 255, 255, 0.05)',
    },
    {
      name: 'Facebook',
      badge: 'Official Profile',
      handle: 'nazmul.hawlader.20551',
      url: siteConfig.facebookUrl,
      description: 'Connect directly via Messenger, personal updates, engineering journey milestones, and community news.',
      actionText: 'Visit Facebook Profile',
      icon: <FacebookIcon size={26} color="#1877F2" />,
      accentColor: '#1877F2',
      bgGlow: 'rgba(24, 119, 242, 0.08)',
    },
    {
      name: 'Instagram',
      badge: '@hawlader7479',
      handle: '@hawlader7479',
      url: siteConfig.instagramUrl,
      description: 'Behind-the-scenes engineering, developer setup, workspace gear, tech culture, and personal stories.',
      actionText: 'Follow on Instagram',
      icon: <InstagramIcon size={26} color="#E4405F" />,
      accentColor: '#E4405F',
      bgGlow: 'rgba(228, 64, 95, 0.08)',
    },
    {
      name: 'GitHub',
      badge: '@Nazmul291',
      handle: 'Nazmul291',
      url: siteConfig.githubUrl,
      description: 'Explore verified open-source repositories, developer tools, Starred architectures, and code snippets.',
      actionText: 'Explore GitHub Repos',
      icon: <GithubIcon size={26} color="var(--text-primary)" />,
      accentColor: 'var(--accent-emerald)',
      bgGlow: 'rgba(16, 185, 129, 0.08)',
    },
    {
      name: 'Upwork',
      badge: 'Top Rated • 100% JSS',
      handle: 'nazmul291',
      url: siteConfig.upworkUrl,
      description: 'Hire with complete escrow protection, verified client feedback, milestone billing, and weekly timesheets.',
      actionText: 'View Upwork Profile',
      icon: <UpworkIcon size={26} color="#14A800" />,
      accentColor: '#14A800',
      bgGlow: 'rgba(20, 168, 0, 0.08)',
    },
  ];

  const additionalPlatforms = [
    { name: 'Stack Overflow', icon: <StackOverflowIcon size={18} color="#F58025" />, url: siteConfig.stackoverflowUrl, label: 'Reputation & Answers' },
    { name: 'Freelancer.com', icon: <FreelancerIcon size={18} color="#29B2FE" />, url: siteConfig.freelancerUrl, label: 'Verified Freelancer' },
    { name: 'Guru', icon: <GuruIcon size={18} color="#57A773" />, url: siteConfig.guruUrl, label: 'Top Rated Developer' },
    { name: 'Arc.dev', icon: <ArcDevIcon size={18} color="#06B6D4" />, url: siteConfig.arcDevUrl, label: 'Vetted Remote Senior' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '6.5rem', paddingBottom: '5rem' }}>
        <div className="site-container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              className="section-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>Direct Communication Hub</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.3rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.25 }}>
              Connect & Reach Out <span className="text-gradient">Directly</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
              No lengthy forms, no waiting in queues. Reach out to me directly through your favorite social profile, call or chat on WhatsApp, send an email, or visit my office in Dhaka.
            </p>
          </div>

          {/* Quick SLA & Guarantees Bar */}
          <div
            className="glass-card"
            style={{
              padding: '1.25rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-medium)',
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Clock size={18} className="text-emerald" />
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Response Time: <strong style={{ color: 'var(--text-primary)' }}>Under 12 Hours</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ShieldCheck size={18} className="text-cyan" />
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Upwork Verified: <strong style={{ color: 'var(--text-primary)' }}>100% Job Success Score</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <MapPin size={18} className="text-emerald" />
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Location: <strong style={{ color: 'var(--text-primary)' }}>Dhaka, Bangladesh (GMT+6)</strong>
              </span>
            </div>
          </div>

          {/* 1. Direct Contact Channels Grid (Phone, WhatsApp, Email, Office) */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Phone size={20} className="text-emerald" />
              <span>Direct Fast Channels</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {/* WhatsApp Direct */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.08) 0%, rgba(6, 182, 212, 0.03) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(37, 211, 102, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <WhatsAppIcon size={26} color="#25D366" />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                      Fastest
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    WhatsApp Chat
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Instant messaging, quick voice notes, and project consultations on mobile or desktop.
                  </p>
                </div>
                <div>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      background: '#25D366',
                      borderColor: '#25D366',
                      fontWeight: 700,
                    }}
                  >
                    <WhatsAppIcon size={16} color="#ffffff" />
                    <span>Message on WhatsApp</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Direct Phone Call */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(16, 185, 129, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-emerald)',
                      }}
                    >
                      <Phone size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      Direct Voice
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Direct Phone
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                    Speak directly with Nazmul regarding urgent scopes, enterprise contracts, or technical inquiries.
                  </p>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '1.25rem' }}>
                    {siteConfig.phoneDisplay}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Phone size={14} />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.5rem 0.75rem' }}
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Direct Email */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(6, 182, 212, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      <Mail size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      Official Inquiries
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Direct Email
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                    Send detailed RFPs, architectural diagrams, project specs, or NDA agreements.
                  </p>
                  <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '1.25rem', wordBreak: 'break-all' }}>
                    {siteConfig.email}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Mail size={14} />
                    <span>Send Email</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.5rem 0.75rem' }}
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Physical Office / Address */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(245, 158, 11, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F59E0B',
                      }}
                    >
                      <MapPin size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      In-Person
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Office Address
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                    {siteConfig.address.fullAddress} ({siteConfig.address.timezone})
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {siteConfig.address.officeHours}
                  </p>
                </div>
                <div>
                  <a
                    href={siteConfig.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Navigation size={14} />
                    <span>View on Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Social Media & Professional Profiles Grid */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Globe size={20} className="text-cyan" />
                <span>Social Media & Professional Profiles</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Connect with me across all verified social media channels, open-source repositories, and freelance platforms.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {socialChannels.map((channel) => (
                <div
                  key={channel.name}
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-subtle)',
                    background: channel.bgGlow,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {channel.icon}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                            {channel.name}
                          </h3>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{channel.handle}</span>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {channel.badge}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {channel.description}
                    </p>
                  </div>

                  <div>
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontWeight: 600,
                        gap: '0.5rem',
                      }}
                    >
                      <span>{channel.actionText}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Developer Profiles Bar */}
            <div
              className="glass-card"
              style={{
                marginTop: '1.75rem',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Additional Developer & Talent Networks:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {additionalPlatforms.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    <ExternalLink size={11} style={{ opacity: 0.6 }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Physical Office & Collaboration Policy */}
          <div
            className="glass-card"
            style={{
              padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-medium)',
              marginBottom: '3.5rem',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--accent-emerald)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    marginBottom: '0.75rem',
                  }}
                >
                  <MapPin size={14} />
                  <span>Physical Presence & Meetings</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  In-Person Consultations & Remote Collaboration
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  Based in Dhaka, Bangladesh, I collaborate remotely with fast-growing Shopify brands across North America, Europe, Australia, and Asia.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div>📍 <strong>Address:</strong> {siteConfig.address.fullAddress}</div>
                  <div>🕒 <strong>Standard Working Hours:</strong> {siteConfig.address.officeHours}</div>
                  <div>🌍 <strong>Timezone Overlap:</strong> Daily 3–5 hours guaranteed overlap with US EST/PST and EU CET business hours.</div>
                  <div>🤝 <strong>In-Person Meetings:</strong> {siteConfig.address.consultationNote}</div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <a
                    href={siteConfig.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                  >
                    <Navigation size={14} />
                    <span>Open in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Instant Cost Estimator Banner */}
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Calculator size={18} className="text-cyan" />
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Need an Instant Price Breakdown?
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                    Check real-time estimates for Shopify apps, bespoke Liquid themes, speed overhauls, or checkout extensions.
                  </p>
                  <a
                    href="/#estimator"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem' }}
                  >
                    <span>Launch Cost Estimator</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

                {/* Calendar / Call booking banner */}
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Calendar size={18} className="text-emerald" />
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Schedule a 30-Min Discovery Call
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                    Connect directly via WhatsApp or Email to lock in a screen-sharing session or technical alignment call.
                  </p>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem' }}
                  >
                    <WhatsAppIcon size={14} />
                    <span>Book via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* AdSense Slot */}
          <AdSlot style={{ marginBottom: '4rem' }} />

          {/* 4. Frequently Asked Collaboration Questions */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                Frequently Asked Collaboration Questions
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
                Clear answers regarding communication channels, billing security, and contract models.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  What is the fastest way to get in touch?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  For real-time responses, reach out via WhatsApp (<code style={{ color: 'var(--accent-emerald)' }}>{siteConfig.phone}</code>) or connect on LinkedIn. For formal project briefs and RFPs, direct email to <code style={{ color: 'var(--accent-emerald)' }}>{siteConfig.email}</code> is best.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  Can we meet in person in Dhaka?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Yes! In-person meetings for agency partnerships, enterprise consultations, or technical planning sessions in Dhaka are available by prior appointment.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  Do you work on fixed-price milestones or hourly rates?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Both models are available. Well-defined projects (e.g., custom app builds, theme speed overhauls) typically run on fixed-price milestone escrow. Ongoing technical retainers or architectural advisory run via Upwork hourly contracts.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  How do you handle timezones for international clients?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  I schedule daily working blocks to ensure 3 to 5 hours of direct real-time overlap with US Eastern (EST), US Pacific (PST), and European (CET/GMT) working hours for Slack syncs, live demos, and deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
