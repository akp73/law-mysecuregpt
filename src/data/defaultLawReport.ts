import type { AuditReport } from "../types/audit";
import { LAW_FIRM_PEERS } from "../utils/industryBenchmark";

export const defaultLawReport: AuditReport = {
  targetUrl: "https://www.cooley.com",
  domain: "cooley.com",
  businessName: "Cooley LLP",
  industry: "Law Practice & Legal Services",
  timestamp: "2026-10-14T12:00:00.000Z",
  composite: {
    compositeScore: 68,
    grade: "C",
    oraAiScore: 48,
    isitAgentReadyScore: 82,
    webYesScore: 68,
    siteSpeakScore: 70,
    chatThingScore: 75,
    agenticCommerceScore: 52,
    aiCommerceReadyScore: 55,
    tools: [
      {
        id: "oraAi",
        order: 1,
        name: "Ora.ai",
        url: "https://ora.ai",
        displayUrl: "ora.ai",
        score: 48,
        status: "failed",
        focus: "Action surface, /llms.txt context protocols & legal consultation endpoints",
        summary: "Intake friction detected. Lacks /llms.txt manifest and autonomous consultation booking endpoints.",
        keyFindings: [
          "Missing /llms.txt law firm context manifest",
          "No Schema.org LegalService Action endpoints",
          "No machine-readable consultation intake API"
        ],
        metrics: [
          { label: "llms.txt Manifest", value: "Missing", passed: false },
          { label: "Actionable Schema", value: "No", passed: false },
          { label: "OpenAPI Spec", value: "Missing", passed: false }
        ]
      },
      {
        id: "isitAgentReady",
        order: 2,
        name: "isitagentready.com",
        url: "https://isitagentready.com",
        displayUrl: "isitagentready.com",
        score: 82,
        status: "passed",
        focus: "Robots.txt crawl permissions, AI bot access matrix & legal sitemaps",
        summary: "Solid search accessibility. Search engine AI bots permitted to index attorney directory.",
        keyFindings: [
          "OpenAI GPTBot permitted for indexing",
          "Anthropic ClaudeBot allowed",
          "XML Sitemaps accessible"
        ],
        metrics: [
          { label: "GPTBot (OpenAI)", value: "Allowed", passed: true },
          { label: "ClaudeBot (Anthropic)", value: "Allowed", passed: true },
          { label: "XML Sitemap", value: "Present", passed: true }
        ]
      },
      {
        id: "webYes",
        order: 3,
        name: "WebYes Agent-Readiness",
        url: "https://www.webyes.com/agent-readiness/",
        displayUrl: "webyes.com/agent-readiness",
        score: 68,
        status: "warning",
        focus: "Semantic entity modeling, LegalService schema depth & attorney profiles",
        summary: "Attorney profile schemas identified, but practice area taxonomy and jurisdictions lack structured graph links.",
        keyFindings: [
          "Organization & Attorney profiles mapped",
          "No Schema.org/LegalService specialization hierarchy",
          "HTML5 semantic landmark structure intact"
        ],
        metrics: [
          { label: "LegalService Schema", value: "Basic", passed: true },
          { label: "Attorney Person Schema", value: "Partial", passed: true },
          { label: "Practice Area Hierarchy", value: "Missing", passed: false }
        ]
      },
      {
        id: "siteSpeak",
        order: 4,
        name: "SiteSpeak AI Agent Scanner",
        url: "https://sitespeak.ai/tools/ai-agent-readiness-scanner",
        displayUrl: "sitespeak.ai/tools/ai-agent-readiness-scanner",
        score: 70,
        status: "warning",
        focus: "Syntactic parsing, meta taxonomy & client intent extraction",
        summary: "Clean HTML structure allows LLMs to summarize firm history, but contact discovery requires multi-step traversal.",
        keyFindings: [
          "Meta title and description present",
          "Main content landmark defined",
          "Partner direct emails obfuscated from scrapers"
        ],
        metrics: [
          { label: "Semantic HTML", value: "Passed", passed: true },
          { label: "Meta Tags", value: "Complete", passed: true },
          { label: "Partner Intake Flow", value: "Obfuscated", passed: false }
        ]
      },
      {
        id: "chatThing",
        order: 5,
        name: "ChatThing Agent Readiness",
        url: "https://chatthing.ai/tools/agent-readiness-checker",
        displayUrl: "chatthing.ai/tools/agent-readiness-checker",
        score: 75,
        status: "passed",
        focus: "Document structure, FAQ discoverability & legal knowledge retrieval",
        summary: "Client insights and legal blog articles provide strong semantic grounding for RAG systems.",
        keyFindings: [
          "Thought leadership content indexed",
          "Structured headings (H1-H3) clear",
          "No structured FAQPage schema"
        ],
        metrics: [
          { label: "Content Structure", value: "Clear", passed: true },
          { label: "RAG Ingestion", value: "High", passed: true },
          { label: "FAQ Schema", value: "Missing", passed: false }
        ]
      },
      {
        id: "agenticCommerce",
        order: 6,
        name: "Agentic Commerce Readiness",
        url: "https://agenticcommerce.shop",
        displayUrl: "agenticcommerce.shop",
        score: 52,
        status: "failed",
        focus: "Autonomous legal procurement, retainers & engagement letter execution",
        summary: "Engagement letter execution locked behind human consultation. AI agents cannot initiate preliminary intake.",
        keyFindings: [
          "No machine-executable engagement workflow",
          "No structured billable rate microdata",
          "No webhook callback endpoints"
        ],
        metrics: [
          { label: "Autonomous Retainer", value: "Blocked", passed: false },
          { label: "Service Pricing", value: "Hidden", passed: false },
          { label: "API Webhooks", value: "None", passed: false }
        ]
      },
      {
        id: "aiCommerceReady",
        order: 7,
        name: "AI Commerce Ready",
        url: "https://aicommerceready.com",
        displayUrl: "aicommerceready.com",
        score: 55,
        status: "failed",
        focus: "Structured service catalog, office availability & conflict check readiness",
        summary: "Office locations verified via microdata, but conflict-check and preliminary inquiry endpoints are absent.",
        keyFindings: [
          "Global office locations mapped",
          "No automated preliminary conflict check API",
          "No structured fee consultation offers"
        ],
        metrics: [
          { label: "Office Locations", value: "Verified", passed: true },
          { label: "Conflict Check API", value: "None", passed: false },
          { label: "Consultation Offer", value: "Unstructured", passed: false }
        ]
      }
    ],
    dimensionScores: {
      crawlability: 75,
      structuredSchema: 70,
      actionability: 59,
      semanticClarity: 72,
      machineProtocols: 48
    },
    dialBreakdown: {
      level: 3,
      levelTitle: "Can't buy or book a meeting.",
      categories: {
        discoverability: {
          id: "discoverability",
          name: "Discoverability",
          score: 78,
          passedCount: 3,
          totalCount: 4,
          fractionDisplay: "3/4",
          status: "passed",
          description: "Search bots and Perplexity can discover Cooley LLP's domain and attorney directory.",
          checks: [
            { name: "Domain & DNS Resolution", passed: true, weight: 25, description: "Fast DNS resolution and valid SSL certificates." },
            { name: "Search Engine AI Permissions", passed: true, weight: 25, description: "Allows major search engine crawlers in robots.txt." },
            { name: "XML Sitemaps Published", passed: true, weight: 25, description: "Up-to-date sitemaps covering practice groups and attorney bios." },
            { name: "llms.txt Protocol Manifest", passed: false, weight: 25, description: "Missing /llms.txt manifest for low-token legal context." }
          ]
        },
        content: {
          id: "content",
          name: "Content Quality",
          score: 74,
          passedCount: 3,
          totalCount: 4,
          fractionDisplay: "3/4",
          status: "passed",
          description: "High-quality legal articles, case studies, and attorney bios with clear headings.",
          checks: [
            { name: "Semantic HTML Hierarchy", passed: true, weight: 25, description: "Clear H1, H2, and main landmark tags throughout pages." },
            { name: "Attorney Practice Information", passed: true, weight: 25, description: "Comprehensive descriptions of venture capital, M&A, and IP law." },
            { name: "OpenGraph & Social Meta", passed: true, weight: 25, description: "Rich snippets configured for social and agent link previews." },
            { name: "Structured FAQ Schema", passed: false, weight: 25, description: "Lacks FAQPage JSON-LD schema for common legal intake questions." }
          ]
        },
        botAccess: {
          id: "botAccess",
          name: "Bot Access",
          score: 75,
          passedCount: 3,
          totalCount: 4,
          fractionDisplay: "3/4",
          status: "passed",
          description: "Open permissions for top AI assistants with minimal firewall interference.",
          checks: [
            { name: "OpenAI GPTBot Allowed", passed: true, weight: 25, description: "GPTBot can index public attorney publications and news." },
            { name: "Anthropic ClaudeBot Allowed", passed: true, weight: 25, description: "ClaudeBot permitted for research indexing." },
            { name: "PerplexityBot Permitted", passed: true, weight: 25, description: "Perplexity citation engine has uninterrupted crawl access." },
            { name: "Agentic User-Agent Headers", passed: false, weight: 25, description: "Some secondary agent scrapers encounter Akamai/Cloudflare verification." }
          ]
        },
        apiMcp: {
          id: "apiMcp",
          name: "API & MCP Surface",
          score: 48,
          passedCount: 1,
          totalCount: 4,
          fractionDisplay: "1/4",
          status: "failed",
          description: "Lacks machine-to-machine APIs or Model Context Protocol (MCP) endpoints for law practices.",
          checks: [
            { name: "Office Locations Schema", passed: true, weight: 25, description: "Physical office addresses structured in JSON-LD." },
            { name: "OpenAPI Documentation", passed: false, weight: 25, description: "No public OpenAPI 3.0 specification for attorney search." },
            { name: "Attorney Scheduling API", passed: false, weight: 25, description: "No machine-executable calendar endpoints for partner meetings." },
            { name: "Conflict Check Endpoint", passed: false, weight: 25, description: "Preliminary conflicts must be manually verified via email." }
          ]
        },
        commerce: {
          id: "commerce",
          name: "Action & Commerce",
          score: 52,
          passedCount: 2,
          totalCount: 4,
          fractionDisplay: "2/4",
          status: "partial",
          description: "Consultation intake and engagement processes require manual human review.",
          checks: [
            { name: "Contact Phone & Email Mapped", passed: true, weight: 25, description: "Direct telephone numbers available for office locations." },
            { name: "Service Offer Schema", passed: true, weight: 25, description: "LegalService structured entities outline practice capabilities." },
            { name: "Machine-Readable Pricing", passed: false, weight: 25, description: "Retainer requirements and billable hourly rates are not published." },
            { name: "Autonomous Intake Form", passed: false, weight: 25, description: "Inquiry forms use dynamic script validation blocking bot submission." }
          ]
        }
      }
    },
    questionsBreakdown: {
      findAndTrust: {
        id: "findAndTrust",
        question: "Can AI Find and Trust Your Law Firm?",
        score: 78,
        status: "GOOD",
        summary: "Perplexity and ChatGPT cite Cooley LLP as a premier tech law firm, grounded by verified schema and office entities.",
        keyFactors: [
          { label: "Verified Legal Entity", positive: true, impact: "Organization and LegalService schemas confirm authenticity" },
          { label: "Search Crawler Access", positive: true, impact: "Permissive robots.txt allows citation engines to index" },
          { label: "Missing /llms.txt", positive: false, impact: "AI search engines consume unnecessary tokens parsing HTML" }
        ]
      },
      findInformation: {
        id: "findInformation",
        question: "Can AI Find Information About Your Law Practice?",
        score: 72,
        status: "GOOD",
        summary: "Comprehensive partner bios and thought leadership articles are indexed, but practice group taxonomies lack machine schemas.",
        keyFactors: [
          { label: "Attorney Bios Indexed", positive: true, impact: "Partner credentials and education clearly structured" },
          { label: "Practice Group Pages", positive: true, impact: "Broad coverage of emerging companies and venture capital" },
          { label: "Unstructured Taxonomy", positive: false, impact: "Lacks Schema.org hierarchical relationships between sub-practices" }
        ]
      },
      productsAndServices: {
        id: "productsAndServices",
        question: "Can AI Understand Your Specific Legal Services?",
        score: 65,
        status: "FAIR",
        summary: "General practice areas are recognizable, but AI models cannot parse specific transactional advisory offerings.",
        keyFactors: [
          { label: "Practice Area Overviews", positive: true, impact: "High-level service categories identifiable" },
          { label: "Missing OfferCatalog", positive: false, impact: "Specific deal structures and advisory packages lack Schema.org Offers" },
          { label: "Jurisdiction Disclosures", positive: false, impact: "Bar admissions not fully structured in JSON-LD Person schemas" }
        ]
      },
      contactEasily: {
        id: "contactEasily",
        question: "Can AI Contact Your Law Firm or Book a Consultation?",
        score: 58,
        status: "FAIR",
        summary: "General switchboard telephone numbers are exposed, but automated agents cannot book consultations or route matters.",
        keyFactors: [
          { label: "Office Contact Points", positive: true, impact: "Telephone and physical office addresses verified" },
          { label: "No Direct Partner Booking", positive: false, impact: "Requires manual human phone calls and email coordination" },
          { label: "Gated Contact Forms", positive: false, impact: "JavaScript intake forms prevent automated matter submission" }
        ]
      },
      browseEasily: {
        id: "browseEasily",
        question: "Can AI Seamlessly Browse Your Website?",
        score: 68,
        status: "GOOD",
        summary: "Fast page responses and clear semantic HTML; slight friction from heavy client-side asset rendering.",
        keyFactors: [
          { label: "Semantic Document Tree", positive: true, impact: "Accessible navigation landmarks and article tags" },
          { label: "Clean Bot Allowlist", positive: true, impact: "No wildcard disallows blocking user-agent crawlers" },
          { label: "Client-Side Rendering", positive: false, impact: "Some lawyer search filters require JavaScript execution" }
        ]
      }
    },
    overallVerdict: "Conditional Agent Friction: Structured attorney directory present, but lacks autonomous intake endpoints and pricing transparency",
    executiveSummary: "Cooley LLP demonstrates good crawl accessibility for AI search engines (ChatGPT, Perplexity) and maintains structured attorney bio entities. However, autonomous agents fail when attempting to evaluate preliminary retainer requirements or submit consultation requests due to human-gated web forms."
  },
  robotsTxt: {
    found: true,
    url: "https://www.cooley.com/robots.txt",
    rawText: "User-agent: *\nDisallow: /admin/\nDisallow: /api/internal/\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: https://www.cooley.com/sitemap.xml",
    totalRules: 5,
    sitemaps: ["https://www.cooley.com/sitemap.xml"],
    crawlDelay: undefined,
    bots: [
      { botName: "GPTBot", vendor: "OpenAI", purpose: "Agent Task / Search", status: "ALLOWED", details: "Explicitly permitted in robots.txt", disallowedPaths: [], allowedPaths: ["/"] },
      { botName: "ClaudeBot", vendor: "Anthropic", purpose: "Agent Task / Search", status: "ALLOWED", details: "Explicitly permitted in robots.txt", disallowedPaths: [], allowedPaths: ["/"] },
      { botName: "PerplexityBot", vendor: "Perplexity", purpose: "Agent Task / Search", status: "ALLOWED", details: "Explicitly permitted in robots.txt", disallowedPaths: [], allowedPaths: ["/"] },
      { botName: "Google-Extended", vendor: "Google", purpose: "Model Training", status: "NOT_MENTIONED_ALLOWED", details: "Permitted under wildcard rule", disallowedPaths: [], allowedPaths: ["/"] },
      { botName: "Applebot-Extended", vendor: "Apple", purpose: "Model Training", status: "NOT_MENTIONED_ALLOWED", details: "Permitted under wildcard rule", disallowedPaths: [], allowedPaths: ["/"] },
      { botName: "CCBot", vendor: "Common Crawl", purpose: "Model Training", status: "NOT_MENTIONED_ALLOWED", details: "Permitted under wildcard rule", disallowedPaths: [], allowedPaths: ["/"] }
    ],
    score: 82,
    summary: "High bot crawlability. Search and discovery AI user-agents are permitted to index Cooley LLP's attorney directory and thought leadership."
  },
  schema: {
    found: true,
    totalSchemas: 5,
    schemaTypes: ["LegalService", "Organization", "Person", "WebSite", "BreadcrumbList"],
    items: [
      {
        type: "LegalService",
        context: "https://schema.org",
        name: "Cooley LLP",
        description: "Global law firm specializing in corporate law, technology, venture capital, and litigation.",
        propertiesFound: ["name", "url", "description", "address", "telephone"],
        missingCrucialProperties: ["priceRange", "hasOfferCatalog", "openingHours"],
        valid: true
      },
      {
        type: "Organization",
        context: "https://schema.org",
        name: "Cooley LLP",
        propertiesFound: ["name", "url", "logo", "sameAs"],
        missingCrucialProperties: ["contactPoint"],
        valid: true
      },
      {
        type: "Person",
        context: "https://schema.org",
        name: "Partner Directory",
        description: "Attorney bios with education and bar admissions.",
        propertiesFound: ["name", "jobTitle", "worksFor"],
        missingCrucialProperties: ["alumniOf", "knowsAbout"],
        valid: true
      }
    ],
    hasOrganization: true,
    hasLocalBusiness: true,
    hasServiceOrProduct: true,
    hasFaq: false,
    hasBreadcrumbs: true,
    hasActionSchema: false,
    hasMicrodata: false,
    hasOpenGraph: true,
    score: 70,
    summary: "Basic LegalService and attorney Person schemas detected. Missing Schema.org/OfferCatalog for legal practice specialization and FAQPage microdata."
  },
  manifests: {
    llmsTxt: { found: false },
    aiPluginJson: { found: false },
    sitemapXml: { found: true, url: "https://www.cooley.com/sitemap.xml" },
    openApi: { found: false }
  },
  agentFailures: [
    {
      capability: "Autonomous Consultation Intake",
      category: "Transactional",
      status: "FAILED",
      whatAgentFailedToDo: "Agent could not schedule a preliminary consultation or submit a prospective client matter for review.",
      technicalRootCause: "Case evaluation forms are rendered using dynamic JavaScript without machine-executable action endpoints or OpenAPI specifications.",
      impactLevel: "HIGH",
      recommendedFix: "Implement Schema.org/ScheduleAction endpoints and /llms.txt intake instructions with direct machine booking URLs."
    },
    {
      capability: "Legal Fee Schedule & Pricing Disclosure",
      category: "Information Retrieval",
      status: "FAILED",
      whatAgentFailedToDo: "Autonomous procurement agents could not verify fee models, hourly billing tiers, or retainer structures.",
      technicalRootCause: "Fee information is completely unmentioned in structured data (no Schema.org/priceRange or Offer catalog).",
      impactLevel: "MEDIUM",
      recommendedFix: "Provide transparent fee range microdata (e.g., priceRange: '$$$$') and publish machine-readable retainer guidelines."
    },
    {
      capability: "Machine-Readable Practice Area Taxonomy",
      category: "Navigation",
      status: "PARTIAL",
      whatAgentFailedToDo: "AI agents could not match multi-jurisdictional venture debt inquiries to specific partners without traversing multiple HTML pages.",
      technicalRootCause: "Practice areas lack linked Schema.org/hasOfferCatalog and knowsAbout microdata connecting partners to jurisdictions.",
      impactLevel: "MEDIUM",
      recommendedFix: "Embed hierarchical LegalService JSON-LD graph connecting practice areas to qualified partner Person entities."
    }
  ],
  informationGaps: [
    {
      informationField: "Consultation Rates & Retainer Minimums",
      category: "Pricing & Packaging",
      status: "MISSING",
      whatCouldNotBeGathered: "No hourly billing tiers or initial retainer minimums are disclosed in structured format.",
      whyAgentNeedsIt: "Corporate legal agents require preliminary pricing thresholds to qualify representation before scheduling intake.",
      recommendedSchemaOrTag: "Schema.org/Offer with priceSpecification, priceRange: '$$$$'"
    },
    {
      informationField: "Automated Preliminary Conflict Check",
      category: "Service Level & SLA",
      status: "MISSING",
      whatCouldNotBeGathered: "No machine-accessible pre-screening endpoint to verify conflict availability.",
      whyAgentNeedsIt: "Enterprise legal agents must confirm adverse party clearances before sharing confidential engagement details.",
      recommendedSchemaOrTag: "Schema.org/Action endpoint or /llms.txt inquiry protocol"
    },
    {
      informationField: "Partner Direct Booking & Escalation",
      category: "Contact & Escalation",
      status: "AMBIGUOUS",
      whatCouldNotBeGathered: "Partner phone numbers lead to central switchboards rather than direct scheduling interfaces.",
      whyAgentNeedsIt: "Autonomous calendar agents cannot negotiate appointment slots without human administrative assistants.",
      recommendedSchemaOrTag: "Schema.org/ContactPoint with contactType: 'attorney consultation'"
    }
  ],
  simulatedTasks: [
    {
      taskName: "Find Tech Law Partner for Venture Financing in Boston",
      userPrompt: "Find a partner at Cooley LLP in Boston specializing in Series B venture capital financing and book an introductory consultation.",
      status: "PARTIAL",
      agentPersona: "Corporate General Counsel Autonomous AI Agent",
      traceSteps: [
        { step: 1, action: "Crawl https://www.cooley.com/robots.txt", finding: "Permitted: GPTBot and search crawlers allowed access.", result: "ok" },
        { step: 2, action: "Query sitemap for Boston venture capital attorneys", finding: "Found 12 attorney bios matching venture capital practice in Boston office.", result: "ok" },
        { step: 3, action: "Extract consultation booking endpoint or calendar", finding: "Blocked: Consultation requires submitting an unassisted human intake form with CAPTCHA.", result: "blocked" }
      ],
      verdict: "Partner credentials and office locations successfully retrieved, but autonomous appointment scheduling could not be executed.",
      missingDataNotes: ["Schema.org/ScheduleAction endpoint", "Machine-accessible intake API", "Direct consultation rate card"]
    },
    {
      taskName: "Verify State Bar Admissions & IP Litigation Qualifications",
      userPrompt: "Check if Cooley LLP patent litigation partners are admitted to practice before the USPTO and CA Federal Courts.",
      status: "SUCCESS",
      agentPersona: "Perplexity Research Legal Agent",
      traceSteps: [
        { step: 1, action: "Index patent litigation practice group page", finding: "Extracted verified practice group credentials and case precedents.", result: "ok" },
        { step: 2, action: "Inspect JSON-LD schema for attorney admissions", finding: "Admissions found in HTML text and structured Person entities.", result: "ok" }
      ],
      verdict: "High agent visibility: Bar admissions and federal court qualifications verified with authoritative grounding.",
      missingDataNotes: []
    },
    {
      taskName: "Autonomous Retainer & Engagement Letter Request",
      userPrompt: "Request a standard engagement letter and retainer requirements for a Delaware C-Corp startup incorporation.",
      status: "FAILED",
      agentPersona: "Founder AI Procurement Agent",
      traceSteps: [
        { step: 1, action: "Check /llms.txt for standard incorporation packages", finding: "404 Not Found: No /llms.txt manifest available.", result: "blocked" },
        { step: 2, action: "Scan for Schema.org/Offer on incorporation services", finding: "No pricing or fixed-fee startup incorporation packages disclosed in microdata.", result: "warning" },
        { step: 3, action: "Attempt machine submission of incorporation intake", finding: "Blocked: Form lacks machine API or OpenAPI webhook.", result: "blocked" }
      ],
      verdict: "Failed: Firm relies entirely on manual intake coordinator consultation for new corporate engagements.",
      missingDataNotes: ["Fixed-fee startup package schema", "Automated intake webhook", "llms.txt context document"]
    }
  ],
  benchmark: {
    industryId: "law_practice",
    industryName: "Law Practice & Legal Services",
    industryMedian: 62,
    top10Percentile: 82,
    targetRank: 4,
    totalCompaniesInCohort: 8,
    percentileRank: 50,
    peerCohort: [
      {
        name: "Latham & Watkins LLP",
        domain: "lw.com",
        compositeScore: 84,
        robotsTxtScore: 90,
        schemaScore: 86,
        actionabilityScore: 76,
        grade: "A",
        keyAdvantageOrFlaw: "Allows AI bots; comprehensive LegalService and attorney schemas with practice group taxonomy",
        rank: 1
      },
      {
        name: "Kirkland & Ellis LLP",
        domain: "kirkland.com",
        compositeScore: 78,
        robotsTxtScore: 85,
        schemaScore: 80,
        actionabilityScore: 69,
        grade: "B",
        keyAdvantageOrFlaw: "Strong practice group schemas and global office locations; lacks llms.txt context manifest",
        rank: 2
      },
      {
        name: "Skadden, Arps, Slate, Meagher & Flom",
        domain: "skadden.com",
        compositeScore: 74,
        robotsTxtScore: 80,
        schemaScore: 75,
        actionabilityScore: 67,
        grade: "B",
        keyAdvantageOrFlaw: "Attorney credentials and thought leadership schemas; consultation locked behind manual intake",
        rank: 3
      },
      {
        name: "Cooley LLP",
        domain: "cooley.com",
        isTarget: true,
        compositeScore: 68,
        robotsTxtScore: 75,
        schemaScore: 70,
        actionabilityScore: 59,
        rank: 4,
        grade: "C",
        keyAdvantageOrFlaw: "Current Audited Law Firm"
      },
      {
        name: "DLA Piper",
        domain: "dlapiper.com",
        compositeScore: 63,
        robotsTxtScore: 70,
        schemaScore: 66,
        actionabilityScore: 53,
        grade: "C",
        keyAdvantageOrFlaw: "Global office locations mapped, but dynamic JavaScript search hampers autonomous legal agents",
        rank: 5
      },
      {
        name: "Sidley Austin LLP",
        domain: "sidley.com",
        compositeScore: 57,
        robotsTxtScore: 65,
        schemaScore: 58,
        actionabilityScore: 48,
        grade: "C",
        keyAdvantageOrFlaw: "Standard Organization schema; lacks structured service fee disclosures and machine endpoints",
        rank: 6
      },
      {
        name: "Morgan, Lewis & Bockius LLP",
        domain: "morganlewis.com",
        compositeScore: 51,
        robotsTxtScore: 55,
        schemaScore: 52,
        actionabilityScore: 46,
        grade: "D",
        keyAdvantageOrFlaw: "Blocks several AI user-agents in robots.txt; attorney bios lack schema.org/Person microdata",
        rank: 7
      },
      {
        name: "Gibson, Dunn & Crutcher LLP",
        domain: "gibsondunn.com",
        compositeScore: 47,
        robotsTxtScore: 45,
        schemaScore: 50,
        actionabilityScore: 46,
        grade: "D",
        keyAdvantageOrFlaw: "Heavy bot firewall challenges restrict autonomous search engines; phone numbers rendered in assets",
        rank: 8
      }
    ]
  },
  remediation: {
    llmsTxtSnippet: `# Cooley LLP - Law Firm AI Agent & Search Manifest
> Machine-readable legal context manifest for AI Autonomous Agents & LLM Search

## Overview
Cooley LLP is a global law firm practicing at the intersection of innovation, technology, and regulation.
Official domain: https://www.cooley.com
This manifest allows LLMs (ChatGPT, Claude, Perplexity) to accurately discover practice groups, partner credentials, and consultation intake procedures without token overhead.

## Core Practice Groups & Capabilities
- Emerging Companies & Venture Capital: Formation, seed financing, Series A-D, growth equity.
- Mergers & Acquisitions: Strategic transactions, public takeovers, private equity buyouts.
- Capital Markets: Tech and life sciences IPOs, SPAC transactions, SEC compliance.
- Intellectual Property & Patent Litigation: ITC proceedings, patent prosecution, trade secrets.
- Regulatory & Government Affairs: Antitrust, FTC, CFIUS, and global privacy compliance.

## Office Locations
- North America: Palo Alto, San Francisco, New York, Boston, Washington D.C., Los Angeles, Seattle, Chicago, Austin.
- Europe & Asia: London, Brussels, Beijing, Shanghai, Singapore.

## Autonomous Action & Consultation Endpoints
- Firm Directory: https://www.cooley.com/people
- Practice Catalog: https://www.cooley.com/services
- Client Inquiry & Intake: https://www.cooley.com/contact-us
- News & Insights: https://www.cooley.com/news
`,
    robotsTxtSnippet: `# Optimized robots.txt for Law Firm AI Agent Readiness
# Permits legitimate user-facing AI agents while protecting private routes

User-agent: *
Disallow: /admin/
Disallow: /client-portal/
Disallow: /internal/

# Allow Top AI Assistant & Search Agents
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Sitemaps
Sitemap: https://www.cooley.com/sitemap.xml
`,
    jsonLdSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": "https://www.cooley.com/#legalservice",
      "name": "Cooley LLP",
      "url": "https://www.cooley.com",
      "logo": "https://www.cooley.com/assets/logo.png",
      "description": "Leading global law firm representing innovative technology and life sciences enterprises.",
      "telephone": "+1-650-843-5000",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3175 Hanover Street",
        "addressLocality": "Palo Alto",
        "addressRegion": "CA",
        "postalCode": "94304",
        "addressCountry": "US"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Legal Practice Areas",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Emerging Companies & Venture Capital"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mergers & Acquisitions"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Patent & Intellectual Property Litigation"
            }
          }
        ]
      }
    }
  ]
}
</script>`
  },
  wafOrBotShieldDetected: false,
  htmlMeta: {
    title: "Cooley LLP | Law Firm for Technology, Life Sciences & Venture",
    description: "Cooley works with the innovative companies driving the global economy, from venture-backed startups to the Fortune 500.",
    wordCount: 3420,
    hasMainTag: true,
    hasForms: true,
    totalLinks: 94
  }
};
