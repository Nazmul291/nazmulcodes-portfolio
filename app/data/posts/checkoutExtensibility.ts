import { BlogPost } from '~/types/blog';
import { siteConfig } from '~/data/siteConfig';

const defaultAuthor = {
  name: siteConfig.name,
  role: 'Senior Shopify Expert & Full-Stack Engineer',
  avatarUrl: siteConfig.avatarUrl,
};

export const checkoutExtensibilityPost: BlogPost = {
  id: 'shopify-checkout-extensions-functions',
  slug: 'modern-shopify-checkout-extensibility-and-functions-guide',
  title: 'Migrating to Shopify Checkout Extensibility: Building Custom Functions with WebAssembly',
  excerpt:
    'The complete, production-grade migration blueprint away from deprecated checkout.liquid to modern Shopify Functions, UI Extensions, and WebAssembly-powered checkout validation.',
  category: 'Shopify & E-Commerce',
  tags: [
    'Shopify',
    'Checkout Extensibility',
    'Shopify Functions',
    'WebAssembly',
    'Rust',
    'TypeScript',
    'Shopify Plus',
    'Software Architecture',
  ],
  primaryKeyword: 'Shopify Checkout Extensibility migration',
  secondaryKeywords: [
    'Shopify Functions WebAssembly tutorial',
    'replace checkout.liquid Shopify Plus',
    'Shopify Functions Rust TypeScript tutorial',
    'Shopify Checkout UI Extensions React',
    'Shopify cart and payment customization Function',
    'Shopify WebAssembly Wasm runtime',
    'Shopify Plus checkout upgrade deadline',
  ],
  publishedAt: '2026-09-05',
  updatedAt: '2026-09-17',
  readTime: '15 min read',
  featured: true,
  author: defaultAuthor,
  learningOutcomes: [
    'Understand the architectural limitations that led to the deprecation of legacy checkout.liquid.',
    'Write, test, and deploy Shopify Functions in TypeScript using the Javy WebAssembly compiler.',
    'Build server-side payment and delivery customization rules that execute in under 5 milliseconds.',
    'Develop custom checkout UI extensions using Shopify’s sandboxed component library.',
    'Store merchant configuration dynamically in Metafields without hardcoding logic into codebases.',
    'Execute a zero-downtime migration for high-volume Shopify Plus enterprise stores.',
  ],
  introduction:
    'For nearly a decade, the gold standard of Shopify Plus enterprise customization was `checkout.liquid`. It gave high-growth merchants direct access to the checkout DOM, allowing developers to inject custom JavaScript trackers, manipulate payment gateways, insert custom fields, and alter styles. However, this flexibility came with catastrophic architectural flaws: third-party scripts frequently conflicted, security vulnerabilities exposed payment tokens to client-side injection, and mobile checkout performance degraded during peak flash sales.\n\nTo solve these fundamental security and performance problems once and for all, Shopify introduced Checkout Extensibility and Shopify Functions. Checkout Extensibility completely deprecates `checkout.liquid` in favor of a modern, sandboxed, and upgrade-safe architecture. Instead of running untrusted client-side JavaScript in the browser DOM, backend business logic is executed as compiled WebAssembly (Wasm) binaries directly on Shopify’s global edge servers in under 5 milliseconds.\n\nMigrating to Checkout Extensibility is not optional—it is a mandatory requirement for all Shopify Plus merchants. However, the paradigm shift from DOM manipulation to WebAssembly-based Functions and sandboxed UI Extensions can be daunting for engineering teams accustomed to legacy themes.\n\nIn this comprehensive architectural guide, I provide a complete, step-by-step masterclass on modern Shopify Checkout Extensibility. You will learn how Shopify Functions execute in WebAssembly, how to write custom payment and cart validation rules in TypeScript, how to build sandboxed UI extensions, and how to execute a zero-downtime enterprise migration.',
  sections: [
    {
      heading: '1. The Sunset of checkout.liquid: Why Shopify Overhauled the Checkout Architecture',
      content:
        'To understand modern Checkout Extensibility, you must appreciate the profound security and engineering liabilities inherent in the legacy `checkout.liquid` model.\n\nIn the old architecture, developers had direct access to the HTML `<head>` and `<body>` of the checkout page. While this made adding a custom datepicker or trust badge trivial via jQuery, it opened massive attack vectors:\n- Client-Side Script Injection (Magecart Attacks): Malicious third-party scripts, compromised tracking pixels, or infected Chrome extensions could inspect form inputs and scrape unencrypted credit card numbers directly from the DOM.\n- Checkout Brittleness & Breaking Changes: Whenever Shopify deployed checkout optimizations or introduced one-page checkout, custom scripts written for legacy multi-step layouts broke instantly, costing merchants millions of dollars in abandoned transactions.\n- Slow Checkout Load Times: Legacy checkouts routinely loaded 2MB of third-party analytics and optimization scripts, delaying payment submission by 2 to 4 seconds during high-concurrency flash sales.\n\n### The Checkout Extensibility Revolution\nCheckout Extensibility replaces direct DOM access with four isolated, sandboxed pillars:\n- 1. Shopify Functions: Replaces Shopify Scripts with compiled WebAssembly backend logic running on Shopify servers.\n- 2. Checkout UI Extensions: Sandboxed UI components that render natively inside designated checkout extension points.\n- 3. Web Pixels API: Executes analytics and tracking tags inside isolated Web Workers, completely off the main checkout thread.\n- 4. Branding API: Programmatic styling engine that applies fonts, colors, and border radii natively to the checkout interface without custom CSS injection.',
      tip: 'Shopify has officially deprecated checkout.liquid for Information, Shipping, and Payment pages on Shopify Plus. All enterprise stores must migrate to Checkout Extensibility to maintain compliance and access Shopify’s latest one-page checkout features.',
    },
    {
      heading: '2. The Mechanics of Shopify Functions: Server-Side WebAssembly (Wasm) Runtime',
      content:
        'Shopify Functions are the most exciting backend innovation in the modern Shopify ecosystem. Previously, merchants customized cart discounts and shipping options using Shopify Scripts (written in Ruby). However, Ruby scripts ran with significant execution latency and could only execute on the primary Shopify cluster.\n\nShopify Functions completely reinvent server-side customization by compiling your code into WebAssembly (Wasm).\n\n### Why WebAssembly Changes Everything\n- Extreme Performance: Compiled Wasm binaries execute in under 5 milliseconds. Shopify can evaluate hundreds of thousands of checkout calculations simultaneously without degrading server latency.\n- Deterministic Security: WebAssembly runs in a strictly sandboxed virtual machine with zero access to the host file system, network sockets, or environment variables. Functions cannot leak merchant data or introduce security vulnerabilities.\n- Multi-Language Support: Because WebAssembly is an open binary instruction format, developers can author Shopify Functions in Rust, TypeScript (via Javy), or Zig.\n- Global Edge Execution: Functions execute directly on the nearest edge node processing the customer’s checkout, eliminating cross-ocean network latency.',
      tip: 'While Rust produces the absolute smallest Wasm binary sizes, TypeScript paired with Javy (Shopify’s open-source JavaScript-to-WebAssembly compiler) offers the fastest developer velocity and allows full-stack teams to reuse their existing TypeScript domain types.',
    },
    {
      heading: '3. Authoring Your First Function in TypeScript: The Payment Customization API',
      content:
        'Let us examine a real-world enterprise requirement: a luxury brand wants to hide Cash on Delivery (COD) and Bank Wire Transfer payment options if the customer’s cart total exceeds $2,500 or if the cart contains high-risk product categories.\n\nIn the modern architecture, this is implemented using the Payment Customization Function API.\n\n### The Anatomy of a Function Project\nA Shopify Function consists of three primary files:\n- 1. `shopify.extension.toml`: Configuration file declaring the function API type, targets, and Wasm binary location.\n- 2. `run.graphql`: Input query that declares the exact cart and order fields your function requires from Shopify.\n- 3. `run.ts`: Pure functional business logic that receives the query input and returns an array of mutation operations (such as `hide`, `rename`, or `move`).',
      codeSnippet: {
        language: 'typescript',
        filename: 'extensions/payment-customization/src/run.ts',
        code: `import {
  RunInput,
  FunctionRunResult,
  PaymentCustomizationOperation,
} from '../generated/api';

const MAX_CASH_ON_DELIVERY_THRESHOLD = 2500.0;

export function run(input: RunInput): FunctionRunResult {
  const operations: PaymentCustomizationOperation[] = [];

  // Parse cart total amount
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount);

  // Identify high-risk payment methods to hide
  for (const method of input.paymentMethods) {
    const isCodMethod = method.name.toLowerCase().includes('cash on delivery');
    const isWireMethod = method.name.toLowerCase().includes('bank transfer');

    // Rule: Hide COD or Wire Transfer for high-value carts
    if ((isCodMethod || isWireMethod) && cartTotal > MAX_CASH_ON_DELIVERY_THRESHOLD) {
      operations.push({
        hide: {
          paymentMethodId: method.id,
        },
      });
    }
  }

  return { operations };
}`,
        explanation:
          'This function executes deterministically in under 3ms. If the cart total exceeds $2,500, it returns a hide operation that removes risky payment methods from the checkout UI.',
      },
      tip: 'Always test your function locally using the Shopify CLI command: "shopify app function build && shopify app function run < input.json". This verifies your logic against mock test payloads in milliseconds without deploying.',
    },
    {
      heading: '4. Building Sandboxed Checkout UI Extensions with Preact',
      content:
        'While Shopify Functions handle backend calculations, Checkout UI Extensions handle frontend visual components. Unlike legacy checkouts where developers inserted arbitrary HTML, UI Extensions execute in a secure Web Worker sandbox and communicate with the checkout thread using an optimized Remote Procedure Call (RPC) bridge.\n\n### The Checkout Component Library\nShopify provides a rich library of accessible, pre-styled components: `Banner`, `BlockStack`, `Checkbox`, `DatePicker`, `Select`, and `TextField`.\n\nUI Extensions cannot load custom external CSS stylesheets or third-party web fonts. Instead, your components automatically inherit the merchant’s brand typography, color palette, and corner radii configured through the Shopify Checkout Branding API. This guarantees that your extension looks 100% native on every merchant store.\n\n### Target Extension Points\nShopify defines precise visual insertion slots called Extension Points:\n- `purchase.checkout.shipping-option-list.render-after`: Perfect for delivery instruction textboxes.\n- `purchase.checkout.reductions.render-before`: Ideal for loyalty points redemption widgets.\n- `purchase.checkout.block.render`: Embeds directly in the main checkout column.',
      codeSnippet: {
        language: 'tsx',
        filename: 'extensions/delivery-instructions/src/Checkout.tsx',
        code: `import React, { useState } from 'react';
import {
  reactExtension,
  useApplyMetafieldsChange,
  useMetafield,
  BlockStack,
  TextField,
  Text,
  Checkbox,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.shipping-option-list.render-after',
  () => <DeliveryInstructionsExtension />
);

function DeliveryInstructionsExtension() {
  const [requireSignature, setRequireSignature] = useState(false);
  const [notes, setNotes] = useState('');
  const applyMetafieldsChange = useApplyMetafieldsChange();

  const handleNotesChange = async (value: string) => {
    setNotes(value);
    // Persist note into checkout metafield
    await applyMetafieldsChange({
      type: 'updateMetafield',
      namespace: 'custom_delivery',
      key: 'instructions',
      valueType: 'string',
      value,
    });
  };

  return (
    <BlockStack spacing="base">
      <Text size="medium" weight="bold">Delivery Preferences</Text>
      <Checkbox
        checked={requireSignature}
        onChange={(checked) => setRequireSignature(checked)}
      >
        Require signature upon delivery (+$5.00)
      </Checkbox>
      <TextField
        label="Gate Code or Special Instructions"
        value={notes}
        onChange={handleNotesChange}
        multiline={2}
      />
    </BlockStack>
  );
}`,
        explanation:
          'This extension renders an interactive delivery preferences box and saves inputs directly into order metafields via useApplyMetafieldsChange without requiring an external backend database.',
      },
      tip: 'Always validate character length on user text fields in checkout extensions to avoid truncating notes when exporting to third-party shipping fulfillment software like ShipStation.',
    },
    {
      heading: '5. Dynamic Configuration: Powering Functions via Metafields',
      content:
        'A common mistake among junior developers is hardcoding business rules (such as thresholds, country codes, or discount tiers) directly into the function’s TypeScript or Rust code. If the merchant wants to change their threshold from $2,500 to $3,000, hardcoding requires a code commit, rebuild, and re-deployment.\n\nIn modern Shopify architecture, all Function settings must be dynamic and driven by Metafields.\n\n### The Metafields-Driven Architecture\n- 1. Metafield Definition: Define a custom Metafield on the App Installation (`$app:payment_settings`).\n- 2. GraphQL Input Query: Include the metafield in your `run.graphql` query. Shopify automatically injects the stored JSON into your function input at runtime.\n- 3. Admin Configuration UI: Build a clean Polaris page in your embedded app where merchants can adjust thresholds, toggle checkboxes, and select payment gateways. When the merchant saves, your app updates the Metafield via GraphQL.\n\nThis pattern provides merchants with complete administrative control while keeping your compiled WebAssembly binary completely stateless and reusable across thousands of stores.',
      tip: 'Store complex configuration settings as a single "json" type Metafield rather than multiple separate string metafields. This simplifies schema updates and reduces GraphQL input complexity points.',
    },
    {
      heading: '6. Performance & Security Guarantees: Sub-5ms Execution',
      content:
        'The primary engineering victory of Checkout Extensibility is performance predictability. Under legacy `checkout.liquid`, a slow third-party analytics script could freeze the customer’s browser, causing payment gateway timeouts.\n\nWith Checkout Extensibility, Shopify enforces strict runtime budgets:\n- Function Execution Limit: Any Shopify Function that takes longer than 5 milliseconds to execute is automatically aborted by the Wasm runtime, and checkout proceeds with default rules.\n- Wasm Binary Size Limit: Compiled binaries must remain under 256KB to ensure instant instantiation.\n- Zero DOM Access: UI Extensions execute in Web Workers and cannot access `window`, `document`, or `localStorage`. This architectural isolation guarantees that customer payment credentials and PII (Personally Identifiable Information) can never be intercepted by malicious third-party code.\n\nThese guarantees mean that even during unprecedented flash sales—such as celebrity product drops generating 40,000 checkouts per minute—the checkout engine never falters.',
      tip: 'Avoid heavy external NPM libraries inside your Shopify Function codebase. Stick to native TypeScript arithmetic and string operations to keep your compiled Wasm binary under 80KB.',
    },
    {
      heading: '7. Step-by-Step Enterprise Migration Strategy: Zero-Downtime Blueprint',
      content:
        'For an enterprise Shopify Plus merchant processing tens of millions in annual revenue, migrating from `checkout.liquid` to Checkout Extensibility requires rigorous change management.\n\n### The 5-Phase Migration Blueprint\n- Phase 1: Comprehensive Script Audit: Catalog every custom script currently living in `checkout.liquid`. Categorize each script into: (1) Tracking Pixels, (2) UI Modifications, (3) Payment/Shipping Customizations, or (4) Abandoned/Unused code.\n- Phase 2: Web Pixels Migration: Move Google Tag Manager, Meta Pixel, and TikTok tracking to Shopify’s native Web Pixels Manager. Verify event firing in the browser console.\n- Phase 3: Function & Extension Development: Build the required Shopify Functions and UI Extensions in your staging app environment. Write unit tests for all edge cases.\n- Phase 4: Staging Validation via Draft Checkouts: Test all checkout permutations using Shopify’s Draft Checkouts feature. Verify that payment customization rules trigger accurately across various cart totals, countries, and customer tags.\n- Phase 5: Production Cutover: Publish your Checkout Extensibility profile in the Shopify Admin. Monitor real-time conversion rates and payment completion metrics in Shopify Analytics for the subsequent 48 hours.',
      tip: 'Shopify allows you to maintain both your legacy checkout and a draft Checkout Extensibility profile simultaneously in your admin. Use this preview capability to conduct thorough stakeholder reviews before going live.',
    },
  ],
  conclusion:
    'Shopify Checkout Extensibility and WebAssembly-powered Functions represent the future of modern e-commerce engineering. By eliminating legacy DOM vulnerabilities, enforcing strict sub-5ms execution limits, and delivering native, accessible UI components, Shopify has created the world’s most secure and performant checkout ecosystem.\n\nMastering these technologies transitions you from a standard theme developer into an elite e-commerce systems architect capable of delivering mission-critical enterprise transformations for the world’s largest brands.',
  faqs: [
    {
      question: 'What is the absolute deadline for migrating away from checkout.liquid?',
      answer:
        'Shopify officially set the upgrade deadline for Information, Shipping, and Payment pages on Shopify Plus for August 2024, with Thank You and Order Status pages scheduled for complete deprecation in 2025. All Plus stores must migrate immediately to avoid feature lockouts.',
    },
    {
      question: 'Can I write Shopify Functions in JavaScript or TypeScript instead of Rust?',
      answer:
        'Yes. Using Shopify’s Javy compiler, you can write native TypeScript code that automatically compiles into standard WebAssembly (Wasm) bytecode during the build process, offering full TypeScript type safety and rapid development cycles.',
    },
    {
      question: 'Can Checkout UI Extensions make external API calls to third-party servers?',
      answer:
        'Yes, provided your app requests network permissions in its shopify.extension.toml configuration and the merchant approves the network access scope during app installation. Network calls run securely in the background worker thread.',
    },
    {
      question: 'Do Shopify Functions work on standard Shopify plans, or only Shopify Plus?',
      answer:
        'Public apps distributed via the Shopify App Store can deploy Shopify Functions (such as custom discount logic) to all Shopify merchants across Basic, Shopify, Advanced, and Plus plans. Custom private Functions remain exclusive to Shopify Plus.',
    },
  ],
};
