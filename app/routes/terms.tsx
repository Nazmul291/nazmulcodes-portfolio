import type { MetaFunction } from "@remix-run/node";
import { Link, useOutletContext } from "@remix-run/react";
import { Scale, ArrowLeft, FileText, ExternalLink, AlertTriangle, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { siteConfig } from "~/data/siteConfig";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  const canonicalUrl = 'https://www.nazmulcodes.org/terms';

  return [
    ...parentMeta,
    { title: "Terms of Service & Licensing | NazmulCodes" },
    {
      name: "description",
      content:
        "Terms and conditions for accessing NazmulCodes (nazmulcodes.org), including software license disclosures, technical publication disclaimers, and architectural consulting terms.",
    },
    { name: "robots", content: "index, follow" },
    // ✅ সেলফ-ক্যানোনিকাল ট্যাগ যুক্ত করা হলো
    {
      tagName: "link",
      rel: "canonical",
      href: canonicalUrl,
    },
    { property: "og:title", content: "Terms and Conditions | NazmulCodes" },
    {
      property: "og:description",
      content:
        "Terms and conditions for accessing NazmulCodes (nazmulcodes.org), including software license disclosures, technical publication disclaimers, and architectural consulting terms.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
  ];
};

export default function TermsAndConditions() {
  const { theme, toggleTheme } = useOutletContext<{ theme: "dark" | "light"; toggleTheme: () => void }>();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: "6rem", paddingBottom: "5rem" }}>
        <div className="site-container" style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Breadcrumb Navigation */}
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

          {/* Header Section */}
          <header style={{ marginBottom: "3rem" }}>
            <div
              className="tag-badge app-badge"
              style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            >
              <Scale size={14} />
              <span>Legal & Service Agreement</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              Terms &amp; <span className="text-emerald">Conditions</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
              Last Updated: March 2026 &bull; Applies to <strong>nazmulcodes.org</strong> and associated engineering utilities.
            </p>
          </header>

          {/* Terms Content Container */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* 1. Acceptance of Terms */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                By accessing, browsing, or utilizing <strong>NazmulCodes</strong> (<a href={siteConfig.siteUrl} className="text-emerald">{siteConfig.domain}</a>), operated by <strong>{siteConfig.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                If you do not agree with any portion of these terms, you are prohibited from utilizing this platform, accessing technical source code examples, or engaging services provided across this site.
              </p>
            </section>

            {/* 2. Intellectual Property Rights & Code Samples */}
            <section className="glass-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <FileText size={20} className="text-emerald" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  2. Intellectual Property &amp; Code Usage
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <p>
                  <strong>A. Editorial Content &amp; Brand Assets:</strong> All written guides, custom graphics, architectural diagrams, brand identifiers, and layout implementations are the proprietary intellectual property of NazmulCodes, protected under applicable international copyright and intellectual property legislation.
                </p>
                <p>
                  <strong>B. Technical Snippets &amp; Sample Implementations:</strong> Code samples, Liquid snippets, and Remix architectural patterns published within our technical articles are provided under standard permissive open-source guidelines (MIT License equivalent) for educational, analytical, and developmental purposes, unless explicitly stated otherwise.
                </p>
              </div>
            </section>

            {/* 3. Permitted & Prohibited Conduct */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                3. Acceptable Use Policy
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                When navigating our publication or interacting with our technical interfaces, you agree not to:
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Attempt to bypass rate limits, server security controls, or disrupt system integrity.</li>
                <li>Deploy automated scrapers, malicious bots, or unauthorized data miners against our endpoints.</li>
                <li>Submit abusive, automated, or spoofed email addresses via our newsletter dispatch interface.</li>
                <li>Impersonate any individual, entity, or affiliate associated with NazmulCodes.</li>
              </ul>
            </section>

            {/* 4. Technical Advice & No-Warranty Disclaimer */}
            <section className="glass-card" style={{ borderColor: "var(--accent-emerald-glow)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <AlertTriangle size={20} className="text-cyan" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  4. Engineering Disclaimer &amp; Warranty Exclusions
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <p>
                  The architectural strategies, performance benchmarks, and code snippets published across <strong>nazmulcodes.org</strong> reflect battle-tested production experiences. However, all technical materials and software utilities are distributed strictly on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without warranties of any kind.
                </p>
                <p>
                  We do not warrant that our code examples or architectural guidance will operate without interruption or error across every custom merchant environment. You assume full responsibility for validating, testing, and verifying code implementations prior to deploying changes to live client or production systems.
                </p>
              </div>
            </section>

            {/* 5. Limitation of Liability */}
            <section className="glass-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <ShieldCheck size={20} className="text-emerald" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  5. Limitation of Liability
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Under no circumstances shall <strong>NazmulCodes</strong> or its founder, <strong>{siteConfig.name}</strong>, be held liable for any direct, indirect, incidental, consequential, or exemplary damages—including but not limited to loss of data, loss of business profits, checkout disruptions, or storefront downtime—arising from your use of or inability to use the guides, tools, or content provided on this website.
              </p>
            </section>

            {/* 6. External Links & Third-Party Platforms */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                6. Third-Party Integrations &amp; Platform Terms
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Our website references and integrates with third-party ecosystems, including Shopify, GitHub, Upwork, and cloud infrastructure providers. Your engagements with those external platforms are governed entirely by their respective terms of service and developer agreements.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                NazmulCodes is an independent engineering consultancy and technical publisher and is not officially endorsed by, or partnered with, Shopify Inc. except as an independent ecosystem developer and merchant partner.
              </p>
            </section>

            {/* 7. Contractual Engagements & Architectural Services */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                7. Architectural Services &amp; Consulting
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Formal engineering engagements, Shopify custom application development, and performance optimization audits initiated through this website or verified freelance marketplaces (e.g., Upwork) are subject to explicit Statements of Work (SOW) or platform-specific escrow contracts executed between parties.
              </p>
            </section>

            {/* 8. Modifications to Terms */}
            <section className="glass-card">
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
                8. Updates &amp; Modifications
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                We reserve the right to revise or update these Terms and Conditions at our sole discretion. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; timestamp. Continued utilization of our website subsequent to such modifications constitutes your acceptance of the revised terms.
              </p>
            </section>

            {/* 9. Contact Information */}
            <section className="glass-card" style={{ background: "var(--bg-tertiary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <Mail size={20} className="text-emerald" />
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  9. Inquiries &amp; Legal Notices
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                If you have questions, inquiries, or require formal clarification regarding these Terms and Conditions, please contact:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--text-primary)", fontWeight: 500 }}>
                <div><strong>Lead Engineer &amp; Proprietor:</strong> {siteConfig.name}</div>
                <div>
                  <strong>Official Contact:</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-emerald">
                    {siteConfig.email}
                  </a>
                </div>
                <div style={{ marginTop: "0.4rem" }}>
                  <strong>Professional &amp; Contract Profiles:</strong>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                    <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>GitHub</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="platform-pill" style={{ fontSize: "0.78rem" }}>
                      <span>LinkedIn</span> <ExternalLink size={11} />
                    </a>
                    <a href={siteConfig.upworkUrl} target="_blank" rel="noopener noreferrer nofollow" className="platform-pill" style={{ fontSize: "0.78rem" }}>
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