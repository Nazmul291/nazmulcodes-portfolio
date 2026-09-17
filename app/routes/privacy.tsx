import type { MetaFunction } from "@remix-run/node";
import { Link, useOutletContext } from "@remix-run/react";
import { Shield, ArrowLeft, Cookie, ExternalLink, Lock, Eye, Mail, Info } from "lucide-react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { siteConfig } from "~/data/siteConfig";

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { title: "Privacy Policy | NazmulCodes" },
    {
      name: "description",
      content:
        "Privacy policy and data protection practices for NazmulCodes (nazmulcodes.org), including cookie policies and Google AdSense compliance disclosures.",
    },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "Privacy Policy | NazmulCodes" },
    {
      property: "og:description",
      content:
        "Privacy policy and data protection practices for NazmulCodes (nazmulcodes.org), including cookie policies and Google AdSense compliance disclosures.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://nazmulcodes.org/privacy" },
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
              <span>Back to Portfolio</span>
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
              Last Updated: March 2026 &bull; Applies to <strong>nazmulcodes.org</strong> and associated subdomains.
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
                This Privacy Policy outlines the types of information we collect, how we use and safeguard that information, and your choices regarding your personal data when you visit our website, review our software projects, or contact us.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                2. Information We Collect
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <p>
                  <strong>A. Voluntarily Provided Information:</strong> When you contact us directly via email, contact forms, or third-party platforms (e.g. Upwork, GitHub, or LinkedIn), we may collect information such as your name, email address, company name, and details of your inquiry.
                </p>
                <p>
                  <strong>B. Automatically Collected Technical Data:</strong> When you access our website, our hosting and analytics providers may log standard request information, including your Internet Protocol (IP) address, browser type and version, referring/exit pages, operating system, timestamp, and standard telemetry necessary for security, performance diagnostics, and server integrity.
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
                Cookies are small text files stored on your device that help web services remember preferences and understand usage patterns.
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>
                  <strong>Essential / Functional Storage:</strong> We use browser localStorage solely to preserve your preferred theme (dark or light mode) across visits.
                </li>
                <li>
                  <strong>Performance &amp; Analytics:</strong> We may utilize privacy-conscious telemetry to monitor site speed, uptime, and Core Web Vitals to deliver optimal user experience.
                </li>
              </ul>
            </section>

            {/* 4. Google AdSense and Advertising Disclosures */}
            <section className="glass-card" style={{ borderColor: "var(--accent-emerald-glow)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <Eye size={20} className="text-cyan" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  4. Google AdSense &amp; Third-Party Advertising
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <p>
                  Our web network utilizes <strong>Google AdSense</strong> (Google LLC) to deliver advertising on designated digital products and utility subdomains (such as <em>kilo.nazmulcodes.org</em>). In accordance with Google AdSense terms and policies, please review the following disclosures:
                </p>
                <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to our website or other websites across the Internet.
                  </li>
                  <li>
                    Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our sites and/or other sites on the Internet.
                  </li>
                  <li>
                    <strong>Ad-Free Portfolio Guarantee:</strong> The primary portfolio at <code>nazmulcodes.org</code> is designed as a pristine showcase and engineering portfolio. No intrusive overlay, popup, or banner ads are rendered on this portfolio page.
                  </li>
                  <li>
                    <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald"
                      style={{ textDecoration: "underline" }}
                    >
                      Google Ads Settings
                    </a>
                    . Alternatively, you can opt out of a third-party vendor&rsquo;s use of cookies for personalized advertising by visiting{" "}
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
                <li>To provide, operate, maintain, and secure our website and engineering demos.</li>
                <li>To respond to consulting requests, contract inquiries, and client project proposals.</li>
                <li>To monitor and analyze trends, traffic, and technical performance metrics.</li>
                <li>To prevent fraudulent transactions, cyber attacks, and unauthorized access.</li>
              </ul>
            </section>

            {/* 6. Third-Party Services & Links */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                6. Third-Party Services &amp; Links
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Our website links to external platforms including Shopify App Store, GitHub, Upwork, and client storefronts. We do not control and are not responsible for the privacy practices or content of third-party websites. We encourage you to review their respective privacy policies when visiting external destinations.
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
                Depending on your geographic location, you may have statutory rights under the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), or related privacy frameworks, including:
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><strong>Right of Access:</strong> You may request copies of personal information we hold about you.</li>
                <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete records.</li>
                <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You may request deletion of personal information under certain circumstances.</li>
                <li><strong>Right to Restrict or Object:</strong> You may object to or request restriction of our processing of your data.</li>
                <li><strong>Right to Data Portability:</strong> You may request transfer of collected data to another organization.</li>
              </ul>
            </section>

            {/* 8. Children's Privacy */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                8. Children&rsquo;s Privacy (COPPA Compliance)
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Our website is aimed at professional businesses and developers. We do not knowingly solicit or collect personally identifiable information from children under 13 years of age. If you believe your child has submitted personal data to us, please contact us immediately, and we will promptly delete such records.
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
                If you have any questions, comments, or data privacy requests regarding this Privacy Policy, please feel free to reach out directly:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--text-primary)", fontWeight: 500 }}>
                <div><strong>Lead Engineer &amp; Data Controller:</strong> {siteConfig.name}</div>
                <div>
                  <strong>Official Email:</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-emerald">
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <strong>Freelance &amp; Contract Engagements:</strong>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                    <a href={siteConfig.upworkUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>Upwork</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.freelancerUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>Freelancer.com</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.guruUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>Guru</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.arcDevUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>Arc.dev</span> <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
                <div style={{ marginTop: "0.2rem" }}>
                  <strong>Developer &amp; Professional Networks:</strong>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                    <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>GitHub</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>LinkedIn</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.stackoverflowUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>Stack Overflow</span> <ExternalLink size={11} />
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
