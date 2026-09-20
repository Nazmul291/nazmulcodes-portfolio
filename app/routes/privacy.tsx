import type { MetaFunction } from "@remix-run/node";
import { Link, useOutletContext } from "@remix-run/react";
import { Shield, ArrowLeft, Cookie, ExternalLink, Lock, Eye, Mail, CheckCircle } from "lucide-react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { siteConfig } from "~/data/siteConfig";

export const meta: MetaFunction = () => {
  const canonicalUrl = 'https://www.nazmulcodes.org/privacy';

  return [
    { charSet: "utf-8" },
    { title: "Privacy Policy & Disclosures | NazmulCodes" },
    {
      name: "description",
      content:
        "Privacy policy and data protection practices for NazmulCodes (nazmulcodes.org), including cookie policies, newsletter subscriptions, and Google AdSense compliance disclosures.",
    },
    { name: "robots", content: "index, follow" },
    // ✅ সেলফ-ক্যানোনিকাল ট্যাগ
    {
      tagName: "link",
      rel: "canonical",
      href: canonicalUrl,
    },
    { property: "og:title", content: "Privacy Policy | NazmulCodes" },
    {
      property: "og:description",
      content:
        "Privacy policy and data protection practices for NazmulCodes (nazmulcodes.org), including cookie policies, newsletter subscriptions, and Google AdSense compliance disclosures.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
  ];
};

export default function PrivacyPolicy() {
  const { theme, toggleTheme } = useOutletContext<{ theme: "dark" | "light"; toggleTheme: () => void }>();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: "6rem", paddingBottom: "5rem" }}>
        <div className="site-container" style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: "1.5rem" }}>
            <Link
              to="/"
              className="btn btn-secondary btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <header style={{ marginBottom: "3rem" }}>
            <div
              className="tag-badge app-badge"
              style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            >
              <Shield size={14} />
              <span>Legal & Transparency</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              Privacy <span className="text-emerald">Policy</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
              Last Updated: March 2026 &bull; Applies to <strong>nazmulcodes.org</strong> and associated platforms.
            </p>
          </header>

          {/* Privacy Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* 1. Introduction */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                1. Introduction
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Welcome to <strong>NazmulCodes</strong> (<a href={siteConfig.siteUrl} className="text-emerald">{siteConfig.domain}</a>), operated by <strong>{siteConfig.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We respect your privacy and are committed to protecting the personal information you share with us.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                This Privacy Policy outlines the types of information we collect, how we use and safeguard that information, and your choices regarding your personal data when you visit our engineering publication, review our open-source software, subscribe to our technical dispatch, or engage our architectural services.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                2. Information We Collect
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <p>
                  <strong>A. Voluntarily Provided Information:</strong> When you subscribe to our architectural dispatch, contact us directly via email, or submit project inquiries, we collect information such as your email address, name, and the nature of your inquiry. Email addresses collected via the dispatch subscription are used exclusively for sending engineering updates and articles.
                </p>
                <p>
                  <strong>B. Automatically Collected Technical Data:</strong> When you browse our platform, our hosting infrastructure and edge analytics may log standard HTTP request information, including your IP address, browser type and version, referring URLs, operating system, and baseline telemetry necessary for network security, diagnostics, and sub-second performance delivery.
                </p>
              </div>
            </section>

            {/* 3. Cookies and Tracking Technologies */}
            <section className="glass-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <Cookie size={20} className="text-emerald" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  3. Cookies &amp; Local Storage
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Cookies are compact data files stored on your local device to assist web applications with persistence and analytics.
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>
                  <strong>Essential Preference Storage:</strong> We utilize client-side localStorage solely to retain your selected interface color theme (dark or light mode).
                </li>
                <li>
                  <strong>Performance &amp; Core Web Vitals:</strong> We evaluate telemetry to verify optimal LCP, INP, and CLS performance across global user sessions.
                </li>
              </ul>
            </section>

            {/* 4. Google AdSense and Advertising Disclosures */}
            <section className="glass-card" style={{ borderColor: "var(--accent-emerald-glow)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <Eye size={20} className="text-cyan" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  4. Google AdSense &amp; Advertising Disclosures
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <p>
                  To support ongoing independent engineering research and free technical publications, our web properties utilize <strong>Google AdSense</strong> (Google LLC) to deliver non-intrusive banner advertisements. In compliance with Google AdSense terms and policies, please review the following required disclosures:
                </p>
                <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to our website or other websites across the Internet.
                  </li>
                  <li>
                    Google&rsquo;s use of advertising cookies enables it and its partners to serve targeted advertisements to our users based on their visits to our platform and/or other digital destinations.
                  </li>
                  <li>
                    <strong>Non-Intrusive Layout Policy:</strong> All advertisements are positioned to guarantee Zero Cumulative Layout Shift (CLS) and never obstruct editorial guides, code samples, or navigation flows.
                  </li>
                  <li>
                    <strong>Opting Out of Personalized Advertising:</strong> You may opt out of personalized advertising at any time by configuring{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald"
                      style={{ textDecoration: "underline" }}
                    >
                      Google Ads Settings
                    </a>
                    . Alternatively, you can opt out of third-party cookie targeting via{" "}
                    <a
                      href="https://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald"
                      style={{ textDecoration: "underline" }}
                    >
                      www.aboutads.info
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. How We Use Information */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                5. How We Use Your Information
              </h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>To deliver our technical guides, interactive demonstrations, and software utilities.</li>
                <li>To dispatch monthly engineering newsletters to voluntarily subscribed readers.</li>
                <li>To respond to enterprise consulting requests and Shopify architecture audits.</li>
                <li>To mitigate security threats, prevent bot misuse, and ensure system uptime.</li>
              </ul>
            </section>

            {/* 6. Third-Party Services & Links */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                6. Third-Party Services &amp; External Links
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Our guides and portfolio sections link to external destinations including the Shopify App Store, GitHub repositories, Upwork, and production case study deployments. We have no control over the privacy practices of external entities and encourage you to review their respective privacy notices upon leaving our site.
              </p>
            </section>

            {/* 7. Data Protection Rights (GDPR / CCPA) */}
            <section className="glass-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <Lock size={20} className="text-emerald" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  7. Your Privacy Rights (GDPR &amp; CCPA)
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Depending on your jurisdiction, you are entitled to statutory rights under GDPR, CCPA, and global data protection laws, including:
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><strong>Right of Access:</strong> Request details regarding personal information stored in our database.</li>
                <li><strong>Right to Erasure / Unsubscribe:</strong> Request prompt deletion of your newsletter subscriber record or contact data.</li>
                <li><strong>Right to Rectification:</strong> Request correction of outdated or inaccurate personal records.</li>
                <li><strong>Right to Restrict Processing:</strong> Request suspension of analytical or direct dispatch processing.</li>
              </ul>
            </section>

            {/* 8. Children's Privacy */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                8. Children&rsquo;s Privacy (COPPA Compliance)
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Our publications and architectural software are directed toward software professionals and commercial merchants. We do not knowingly solicit or collect data from individuals under 13 years of age.
              </p>
            </section>

            {/* 9. Contact Us */}
            <section className="glass-card" style={{ background: "var(--bg-tertiary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <Mail size={20} className="text-emerald" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  9. Contact Information
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                For data access inquiries, newsletter removal requests, or general privacy questions, contact our data controller directly:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--text-primary)", fontWeight: 500 }}>
                <div><strong>Lead Engineer &amp; Data Controller:</strong> {siteConfig.name}</div>
                <div>
                  <strong>Official Email:</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-emerald">
                    {siteConfig.email}
                  </a>
                </div>
                <div style={{ marginTop: "0.4rem" }}>
                  <strong>Developer &amp; Professional Profiles:</strong>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                    <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>GitHub</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>LinkedIn</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.upworkUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>Upwork</span> <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}