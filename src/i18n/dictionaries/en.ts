import { plural } from "@/i18n/format";

/**
 * English: the source of truth. Every string here is the site's live copy,
 * verbatim, and its shape is the `Dictionary` type the other languages must
 * match key for key.
 *
 * Conventions a translator needs:
 * - `{name}` is filled in by the code; keep it, move it anywhere.
 * - `<b>…</b>` marks the emphasised phrase, `<br/>` a line break; keep the
 *   tags around whatever the translation emphasises.
 * - A list of strings for a heading is its lines, broken as the design
 *   breaks them; a translation may use more or fewer lines.
 * - `plural({...})` entries take the language's own plural forms.
 * - Proper names (Moria Ventures, KNEKS, NusaQu, SME names, people) stay as
 *   written.
 *
 * Grouped by page, then by section in page order.
 */
const en = {
  _meta: {
    locale: "en",
    status: "source of truth: live English copy, verbatim",
  },

  site: {
    name: "Moria Ventures",
    titleTemplate: "%s — Moria Ventures",
    description:
      "PT Moria Ventures Capital — Islamic Principle-compliant capital connecting Indonesia and the Gulf through venture capital, project finance, and venture building.",
  },

  common: {
    imInvestor: "I'm an Investor",
    imFounder: "I'm a Founder",
    imBusiness: "I'm a Business",
    contactUs: "Contact Us",
    applyForFunding: "Apply for Funding",
    imagePlaceholder: "Image placeholder",
    logoAlt: "{name} logo",
    skylineAlt: "{city} skyline",
  },

  languageSwitcher: {
    label: "Language",
    /** Read out on the trigger, e.g. "Language: English". */
    current: "Language: {language}",
  },

  header: {
    homeLabel: "Moria Ventures — home",
    toggleNav: "Toggle navigation",
    about: "About",
    whatWeDo: "What We Do",
    portfolio: "Portfolio",
    partners: "Partners",
    contact: "Contact Us",
    portfolioMenu: {
      portfolio: "Portfolio",
      forBusinesses: "For Businesses",
      forLimitedPartners: "For Limited Partners",
      corridor: "Indonesia–Saudi Corridor",
    },
    partnersMenu: {
      kneks: "KNEKS",
    },
  },

  footer: {
    tagline:
      "PT Moria Ventures Capital bridging Southeast Asia and the Gulf Cooperation Council.",
    platform: {
      title: "Platform",
      about: "About Us",
      whatWeDo: "What We Do",
    },
    lpBiz: {
      title: "For LP & Biz",
      lps: "For LPs",
      businesses: "For Businesses",
      corridor: "Corridor",
    },
    resources: {
      title: "Resources",
      insights: "Insights & News",
      careers: "Careers",
      contact: "Contact Us",
    },
    copyright:
      "© 2026 PT Moria Ventures Capital. All rights reserved. Registered under OJK and Saudi CMA.",
    legal: {
      certification: "Islamic Principle Board Certification",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  ctaBand: {
    title: ["Ready to invest in the future", "of Islamic Principle", "compliant innovation?"],
  },

  heroSlider: {
    region: "Highlights",
    slide: "{index} of {total}: {label}",
    showSlide: "Show slide {index}: {label}",
    previous: "Previous slide",
    next: "Next slide",
  },

  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved.",
    home: "Back to home",
  },

  home: {
    hero: {
      slideLabel: "Moria Ventures",
      title: ["Compliant Capital.", "Connecting the Gulf", "and Indonesia"],
      lede: "<b>PT Moria Ventures Capital</b> is an Islamic principles investment firm backing technology driven companies across Indonesia and the Gulf, connecting global investors with regional expertise and long term commitment to founders.",
    },
    kneksSlide: {
      slideLabel: "Moria Ventures × KNEKS",
      title: ["Partners in", "Indonesia's", "Islamic economy"],
      lede: "<b>KNEKS</b>, the National Committee for Islamic Economy and Finance, coordinates Indonesia's Islamic economy across ministries and institutions. Together we bring its SMEs in front of investors from the Gulf and Southeast Asia.",
      explore: "Explore the program",
      about: "About KNEKS",
      facts: [
        {
          value: "2020",
          label:
            "Established by Presidential Regulation No. 28 of 2020, building on the KNKS formed in 2016.",
        },
        {
          value: "President & VP",
          label: "Chaired directly by Indonesia's President and Vice President.",
        },
        {
          value: "4 pillars",
          label: "Halal industry, Islamic finance, Islamic-values business, and zakat and waqf.",
        },
      ],
    },
    quote: {
      text: "“We didn't want to build a VC that just avoids haram. We wanted to build one where everything we touch, every company, every deal, every structure, is genuinely built the right way.”",
      attribution: "Husni Muhammad B, Managing Partner, Moria Ventures",
    },
    stats: [
      { value: "$25M+", label: "Deployed Capital" },
      { value: "~40%", label: "Blended ROI" },
      { value: "15+", label: "Portfolio Companies" },
      { value: "2", label: "Active Markets" },
    ],
    engines: {
      title: "Investment Engines",
      items: [
        {
          name: "Venture Capital",
          body: "Backing tomorrow's technology leaders in Southeast Asia through equity investment, with a 3–7 year horizon and hands-on support as portfolio companies scale into the Middle East and North Africa. We focus on Fintech, Logistics, Agritech, and Halal-tech, sectors where the region's next wave of growth is being built.",
        },
        {
          name: "Short-Cycle Yield",
          body: "Structured, low-volatility liquidity injections using Murabaha, Istisna'a, and Musharakah structures. We manage PO financing and supply chain trade with tight 30–180 day maturity cycles, mitigating cross-border currency and operational risks via institutional escrow.",
        },
        {
          name: "Venture Builder",
          body: "Hands-on venture building that turns early-stage ideas into investment-ready companies. We work alongside founders on product, structure, and commercial strategy — de-risking the business before capital moves. Focus sectors: Fintech, AI, Islamic-tech, F&B, and Healthtech.",
        },
      ],
    },
    valueProps: {
      title: "Value Proposition",
      imageAlt: "Jakarta skyline at dusk",
      items: [
        {
          term: "Islamic-Principles",
          body: "Every deployment operates under strict compliance models audited by globally recognized Islamic scholars. We eliminate riba, Gharar, and maysir without sacrificing yielding capabilities.",
        },
        {
          term: "Dual-Market Access",
          body: "Direct operational bridge between Southeast Asia's powerhouse economy (Indonesia) and the Gulf Cooperation Council (GCC). We assist enterprises in crossing borders seamlessly.",
        },
        {
          term: "Beyond Capital",
          body: "Our partners bring deep regulatory, institutional, and commercial relationships across both jurisdictions, enabling joint ventures, licensing pathways, and engagement with sovereign-level institutional capital.",
        },
        {
          term: "Proven Returns",
          body: "A disciplined return framework targeting consistent risk-adjusted performance through our dual-engine allocation — pairing high-upside venture equity with predictable short-cycle project yields.",
        },
      ],
    },
    corridor: {
      title: "Indonesia — Saudi Arabia",
      subtitle: "A Trillion-Dollar Economic Corridor",
      body: "As the world's largest Muslim-majority nation, Indonesia holds massive untapped consumer markets and highly active digital-native sectors. Saudi Arabia, driving Vision 2030, commands unmatched liquid capital reserves. Moria Ventures serves as the institutional gateway, ensuring fast, regulatory-compliant pipelines that connect sovereign-backed Middle Eastern mandates with Southeast Asian growth engines.",
      linksLabel: "Strategic Eco-System Links",
      ecosystem: [
        {
          name: "KNEKS",
          body: "Indonesian National Committee for Islamic Economy and Finance alignment.",
        },
        {
          name: "Fintech Saudi",
          body: "Saudi regulatory-sandbox acceleration integration pathway for regional entrants.",
        },
        {
          name: "Saudi CMA (Capital Market Authority)",
          body: "Strict institutional compliance alignment for sovereign allocation clearance.",
        },
      ],
    },
    portfolio: {
      title: "Portfolio",
    },
  },

  about: {
    meta: {
      title: "About",
      description:
        "An Islamic finance-based venture capital firm for the Indonesia–Gulf corridor, pairing early-stage equity with short-cycle project financing. Every deal is asset-backed and interest-free from the first term sheet.",
    },
    hero: {
      title: "About Moria Ventures",
      lede: "Moria Ventures is an Islamic finance-based venture capital firm built for the Indonesia–Gulf corridor, running a dual engine of equity in early-stage companies and short-cycle project financing that puts capital back to work faster. Every deal is asset-backed and interest-free structured that way from the first term sheet, not certified after the fact.",
    },
    anchors: {
      whoWeAre: "Who We Are",
      compliance: "Islamic Principle Compliance",
      leadership: "Leadership",
    },
    whoWeAre: {
      eyebrow: "Who We Are",
      title: "Architects of Bilateral Growth",
      jakartaAlt: "Jakarta central business district",
      riyadhAlt: "Riyadh skyline",
      storyTitle: "Our Founding Story",
      story:
        "Moria Ventures Capital was built to open a corridor that didn't exist: structured, institutional capital flow between Indonesia, the world's largest Muslim-majority market, and the deep liquidity reserves of the GCC. We built the regulatory, operational, and Islamic finance-compliant infrastructure to move that capital directly into market leaders.",
      mandateTitle: "The Dual-Engine Mandate",
      mandate:
        "Moria Ventures runs on two engines, not one: equity investment in early-stage companies built for the long run, and short-cycle project financing that returns and redeploys faster than a traditional fund cycle. Together, they let us serve both ends of the corridor — patient capital for founders building ahead, and fast capital for businesses that need it now.",
      milestonesEyebrow: "Key Milestones",
      milestones: [
        { year: "2021", text: "Moria Ventures Founded in Jakarta" },
        { year: "2022", text: "GCC Corridor established & first Saudi LP alignment" },
        { year: "2023", text: "Project Finance Engine launched with BSI integration" },
        { year: "2024", text: "Active deployment surpasses $25M across 15+ companies" },
      ],
    },
    governance: {
      eyebrow: "Islamic Principle Governance",
      title: ["Pure Compliance.", "Applied End-to-End."],
      lede: "Unlike traditional funds that limit Islamic Principle compliance to the top-level fund wrapper, Moria actively audits and structures every underlying portfolio deployment.",
      items: [
        {
          title: "Independent Islamic Principle Advisory Board",
          body: "All investment contracts, fund structures, and term sheets are reviewed and certified before any capital is deployed.<br/>(Board appointments in progress — Q2 2026)",
        },
        {
          title: "Musharakah Equity Partnerships",
          body: "Equity investments are structured as genuine profit-and-loss sharing partnerships, not interest-bearing instruments — true alignment between investor, fund, and founder.",
        },
        {
          title: "Murabaha Instruments",
          body: "Project finance uses cost-plus trade (Murabaha). All transactions are linked to real, tangible economic activity.",
        },
        {
          title: "MUI & AAOIFI Alignment",
          body: "Our framework aligns with MUI accounting standards and global AAOIFI principles — qualifying the fund for Islamic capital mandates and ethical impact LP pools.",
        },
      ],
    },
    leadership: {
      eyebrow: "The People Behind It",
      title: "Decades of Cross-Border Stewardship",
      portraitPlaceholder: "Portrait to come",
      board: [
        {
          role: "CEO & Managing Partner",
          body: "Over 18 years driving bilateral investment flow between Jakarta and GCC markets. Architect of Moria's sovereign-access pipeline structure.",
        },
        {
          role: "Head of Finance & Risk Analysis",
          body: "Oversees strict Islamic Principle compliance auditing, capital call calculations, and treasury functions in active multi-currency setups.",
        },
        {
          role: "General Partner",
          body: "Specialist in cross-border execution logistics, regulatory operations under OJK/BI frameworks, and enterprise scaling.",
        },
        {
          role: "General Partner",
          body: "Veteran Saudi investment strategist overseeing GCC sovereign allocator alignments and Murabaha structured project portfolios.",
        },
      ],
    },
  },

  whatWeDo: {
    meta: {
      title: "What We Do",
      description:
        "Two capital products. One venture-building platform. Islamic Principle-compliant from screening to exit.",
    },
    hero: {
      title: "What We Do",
      lede: "Two capital products. One venture-building platform. Islamic Principle-compliant from screening to exit. Connecting Southeast Asian innovation with Gulf Cooperation Council markets.",
    },
    anchors: {
      ventureCapital: "01 / Venture Capital",
      projectFinance: "02 / Project Finance",
      ventureBuilding: "03 / Venture Building",
      criteria: "04 / Investment Criteria",
    },
    ventureCapital: {
      title: "Venture Capital",
      imageAlt: "Jakarta city skyline",
      body: [
        "Our Venture Capital engine invests equity in high-growth digital pioneers across Southeast Asia, with a focus on Indonesia — backing category-leading business models solving structural inefficiencies in tech-backed SMEs, commodity, and agriculture.",
        "Beyond capital, we're a bridge to the Gulf. We guide portfolio companies through international scaling — connecting them to Middle Eastern sovereign allocators, strategic corporate partners, and GCC commercial networks that drive sustained growth.",
      ],
      specs: [
        { label: "Check Size", value: "$10K-$100K" },
        { label: "Horizon", value: "3-7 Years" },
        { label: "Structure", value: "Equity" },
      ],
    },
    projectFinance: {
      title: "Project Finance",
      imageAlt: "Trade finance documentation",
      body: [
        "Our Project Finance division builds short-cycle, asset-backed transactions designed for predictable yields with minimized volatility, using structured liquidity paths matched to each deal.",
        "We focus on institutional escrow accounts, purchase order financing, and trade supply chains, systematically reducing operational and cross-border transaction risk. The result: short cycles built for velocity, delivering consistent, Islamic finance-compliant returns.",
      ],
      specs: [
        { label: "Structure", value: "Murabaha / PO" },
        { label: "Cycle", value: "30-180 Days" },
        { label: "Avg ROI", value: "~40%" },
      ],
    },
    ventureBuilding: {
      title: "Venture Building",
      imageAlt: "Portfolio operators in a working session",
      items: [
        {
          term: "Founder Development",
          body: "Deep, hands-on administrative guidance ensuring organizational efficiency, solid operational framework development, and scalable team building systems.",
        },
        {
          term: "Venture Building",
          body: "Direct physical, corporate, and sovereign bridge channels into Saudi Arabia, the UAE, and broader Gulf economic clusters to fast-track regional launches.",
        },
        {
          term: "Commercial Growth",
          body: "Comprehensive regulatory mapping and clearance protocols aligned across OJK and Bank Indonesia in Jakarta to the Capital Market Authority in Riyadh.",
        },
        {
          term: "Investment Readiness",
          body: "Rigorous model design under audited guidelines to eliminate riba, Gharar, and maysir structural risks from transaction flows, operations, and exits.",
        },
        {
          term: "Capital Access",
          body: "Direct linkage to private and state-sponsored venture ecosystems, regional corporate groups, and reliable technology scale partners.",
        },
        {
          term: "Portfolio Growth",
          body: "Ongoing advisory, regional market access, follow-on funding support, and board-level guidance — support doesn't end at investment.",
        },
      ],
    },
    criteria: {
      title: "Investment Criteria",
      items: [
        {
          label: "Stage",
          value: "Seed, Pre-Series A, Series A, and short-cycle Supply Chain Trade",
        },
        {
          label: "Geography",
          value:
            "Southeast Asia (Indonesia) and Gulf Cooperation Council (Saudi Arabia / UAE)",
        },
        {
          label: "Sectors",
          value:
            "Fintech Infrastructure, Halal Logistics & Distribution, Sustainable Food Supply Chains, Agritech platforms",
        },
        {
          label: "Islamic Principle Compliance",
          value:
            "Strict ethical frameworks, certified non-riba transaction mechanics, vetted commercial execution",
        },
        {
          label: "Check Size",
          value:
            "Varies by engine model ($100K-$500K Equity, transactional capacity scaling for trade finance allocation)",
        },
        {
          label: "Strong Candidate Profile",
          value:
            "High-growth technology enterprises with validated revenue, seeking scaling expansion paths across the Indonesia-Saudi economic corridor.",
        },
      ],
    },
  },

  portfolio: {
    meta: {
      title: "Portfolio",
      description:
        "15+ companies across fintech, logistics, agritech, and the halal economy, bridging Indonesia and the GCC.",
    },
    hero: {
      title: "Portfolio",
      lede: "<b>Equity / Venture Builder</b><br/>A portfolio of category-leading companies across fintech, logistics, and agritech. Built, not just funded.<br/><br/><b>Project Financing</b><br/>Trusted by businesses across agriculture, property, F&B, and FMCG moving capital through structured, asset-backed cycles.",
      requestDataRoom: "Request Data Room",
      applyForFunding: "Apply for Funding",
    },
    stats: [
      { value: "15+", label: "Companies" },
      { value: "$25M+", label: "Deployed" },
      { value: "~40%", label: "Blended ROI" },
      { value: "2", label: "Markets" },
    ],
    register: {
      filterLabel: "Filter by Sector",
      all: "All",
      types: {
        poFinancing: "PO Financing",
        projectFinancing: "Project Financing",
        khadamat: "Khadamat",
      },
      title: "Active Investments",
      columns: {
        no: "No",
        project: "Project",
        type: "Type",
        investment: "Investment",
      },
      empty: "No projects of this type yet.",
    },
    allocation: {
      title: "Sector Allocation",
      items: [
        { pct: "35%", name: "Tech Based Company", count: "6 Companies" },
        { pct: "20%", name: "Logistics & Supply Chain", count: "3 Companies" },
        { pct: "15%", name: "Agritech", count: "2 Companies" },
        { pct: "15%", name: "SaaS & Enterprise", count: "2 Companies" },
        { pct: "15%", name: "Halal Economy Tech", count: "2 Companies" },
      ],
    },
    caseStudy: {
      title: "Case Study Spotlight",
      items: [
        {
          term: "Problem Statement",
          body: "Women in dense Indonesian metropolitan areas face persistent safety and accessibility challenges when moving around cities.",
        },
        {
          term: "Solution",
          body: "HerMoves delivers a women-only ride-sharing platform with verified female drivers, real-time safety features, and customized comfort tiers.",
        },
        {
          term: "Outcome",
          body: "3x rider growth in 6 months, expanded to 3 Indonesian cities.",
        },
      ],
    },
    exits: {
      imageAlt: "A gold arrow climbing upward",
      title: "Exits & Milestones",
      items: [
        {
          name: "PT Dhuha Logistics",
          body: "Acquired by GCC Maritime Group for cross-border halal supply network integration",
          year: "2024",
        },
        {
          name: "NusaQu Infra",
          body: "Completed major Islamic Principle API integration with Bank Syariah Indonesia (BSI)",
          year: "2023",
        },
        {
          name: "HalalCommerce",
          body: "Merged with strategic Saudi Arabian sovereign investment vehicle",
          year: "2022",
        },
      ],
    },
    join: {
      imageAlt: "Two colleagues reviewing growth figures on a tablet",
      title: ["Want to Join Our", "Portfolio?"],
      body: "We are actively selecting top-tier projects seeking compliant venture backing or fast-horizon project financing.",
      cta: "Contact Us",
    },
  },

  forBusinesses: {
    meta: {
      title: "For Businesses",
      description:
        "Equity for founders scaling toward exit, and short-cycle project financing for businesses that need working capital fast — structured around your business.",
    },
    hero: {
      title: ["Two Ways We Back", "Business Owners"],
      lede: "Whether you're building for the long run or need capital to move now, we structure it around your business, not the other way around. Equity for founders scaling toward exit. Short-cycle project financing for businesses that need working capital fast.",
      apply: "Apply for Funding",
      thesis: "Our Thesis",
    },
    criteria: {
      title: "Investment Criteria",
      imageAlt: "Founders reviewing deal documents across a desk",
      items: [
        {
          term: "Category-Leading Business Models",
          body: "We back companies solving real structural inefficiencies — not incremental improvements. If the business model doesn't have a clear path to category leadership in its market, it's not a fit.",
        },
        {
          term: "SME-Focused",
          body: "We back small and medium enterprises with real operational traction — businesses solving structural inefficiencies in their market, not early-stage ideas still searching for a model.",
        },
        {
          term: "Islamic Finance-Compliant Structure",
          body: "Every deal must be structurable on asset-backed, interest-free terms. If the underlying business model can't be structured this way, it's outside our mandate regardless of return potential.",
        },
        {
          term: "Founder-Market Fit",
          body: "We invest in founders as much as businesses — leadership capable of executing through governance, scale, and the operational discipline institutional capital requires.",
        },
        {
          term: "Sector Focus",
          body: "Priority sectors include agriculture and commodities, property, food & beverage (F&B), and FMCG — where structural inefficiencies are largest, and our operational experience adds the most value beyond capital.",
        },
      ],
    },
    beyondCapital: {
      title: "Beyond Capital",
      imageAlt: "The team in a working session around a proposal",
      count: "06",
      countLabel: "Structural Value Additions",
      items: [
        {
          term: "Governance & Institutional Readiness",
          body: "We build the governance, financial reporting, and due diligence infrastructure companies need to qualify for institutional capital — not just advice, actual structure.",
        },
        {
          term: "Cross-Border Market Access",
          body: "Direct introductions to Gulf sovereign allocators, strategic corporate partners, and GCC commercial networks — access most Indonesian businesses can't build on their own.",
        },
        {
          term: "Islamic Finance-Compliant Deal Structuring",
          body: "Every transaction structured on asset-backed, interest-free terms from the outset — not bolted on later. Compliance is built into the deal architecture itself.",
        },
        {
          term: "Operational Build-Out",
          body: "Hands-on support across product, branding, legal structuring, and operations — we work inside the business, not just advise it from outside.",
        },
        {
          term: "Ongoing Portfolio Management",
          body: "Support doesn't end at the term sheet. Continued advisory, board-level guidance, and follow-on funding support through the company's growth.",
        },
        {
          term: "Repeatable Investment Discipline",
          body: "Every deal runs through the same structured process from opportunity sourcing through exit — so value creation isn't dependent on any single deal or person.",
        },
      ],
    },
    process: {
      title: "Our Process",
      imageAlt: "A desk set out with a laptop and a project milestones calendar",
      steps: [
        {
          title: "Initial Screening",
          body: "Staged evaluation of Islamic Principle structural alignment, core unit-economics, and regional bridge viability.",
        },
        {
          title: "Deep Dive",
          body: "Comprehensive technical due diligence, strategic unit stress-testing, and compliance alignment audit.",
        },
        {
          title: "IC Presentation",
          body: "Bilateral Investment Committee validation drawing on expert insights from both Jakarta and GCC hubs.",
        },
        {
          title: "Term Sheet",
          body: "Optimized non-dilutive liquidity or equity frameworks mapped seamlessly against scaling metrics.",
        },
        {
          title: "Post-Investment",
          body: "Onboarding into our institutional corridor network, driving immediate sovereign-link synergies.",
        },
      ],
    },
    backed: {
      title: "Companies We've Backed",
      imageAlt: "The team on site at a portfolio property development",
    },
    pitch: {
      title: "Submit Your Pitch",
      body: "Fill out the institutional entry form below. Our cross-border evaluation committee processes requests weekly.",
      cta: "Contact Us",
    },
  },

  forLimitedPartners: {
    meta: {
      title: "For Limited Partners",
      description:
        "Institutional access to the Indonesia–GCC investment corridor, built on structured, Islamic finance-compliant deal architecture.",
    },
    hero: {
      title: "For Limited Partners",
      lede: "Institutional access to the Indonesia–GCC investment corridor, built on structured, Islamic finance-compliant deal architecture. We pair disciplined underwriting with a six-stage investment process designed for consistent, risk-adjusted returns.",
      register: "Register",
      trackRecord: "View Track Record",
    },
    photos: {
      whyInvest: "The Moria team",
      trackRecord: "A portfolio performance dashboard",
      fundStructure: "Fund documentation",
      gcc: "The Riyadh skyline at dusk",
    },
    why: {
      title: "Why Invest With Moria",
      items: [
        {
          term: ["Real Numbers, Not Projections"],
          body: "Our portfolio has delivered a 40.5% blended investor ROI, tracked deal by deal across active portfolio companies including HerMoves, NusaQu, PT Dhuha, PT KGB, EV Bike and BeliAyam. Not a forecast — actual performance.",
        },
        {
          term: ["Compliance Built In,", "Checked Constantly"],
          body: "Every deal is structured asset-backed and interest-free from the term sheet, not signed off after the fact. And we don't just structure it once — every portfolio company runs through ongoing shareholder monitoring, with risk tracked in real time, not just at close.",
        },
        {
          term: ["We Catch What Other Decks Miss"],
          body: "Before we invest, every model gets audited the way we'd want an LP to audit us — we've caught margin compression, mislabeled equity tranches, and valuation math errors in deals we reviewed. That discipline applies to our own numbers first.",
        },
        {
          term: ["Two Engines, One Portfolio"],
          body: "We don't just write equity checks and wait. Alongside long-term equity in early-stage market leaders, we run short-cycle project financing that returns and redeploys capital faster — so LPs get growth exposure and working liquidity in the same mandate, not a bet on one model.",
        },
      ],
    },
    performance: {
      title: "Performance Metrics",
      headline: { value: "~40%", label: "Blended ROI Across Strategies" },
      metrics: [
        { value: "~74%", label: "PO Finance ROI" },
        { value: "$1.2M", label: "Deployed Capital" },
        { value: "15+", label: "Active Investments" },
      ],
      note: "Detailed data and formal audit reviews are available in our confidential data room.",
    },
    seedFund: {
      title: "Seed Fund",
      lede: "Structural parameters for sovereign-compliant private allocations.",
      terms: [
        { label: "Fund Size Target", value: "$5,000,000 USD" },
        { label: "Fund Term", value: "7 Years, with 2 × 1-Year Extension Options (GP Discretion)" },
        { label: "Investment Period", value: "3 Years from First Close" },
        { label: "Target First Close", value: "Early 2027" },
        { label: "Minimum LP Commitment", value: "50K USD" },
        { label: "GP Commitment", value: "2% of Fund" },
        { label: "Management Fee", value: "3.0% per annum" },
        {
          label: "Profit Share Structure",
          value: "20% Mudarib Share, after 8% Preferred Return to LPs",
        },
        { label: "Currency", value: "USD / SAR Structured" },
        {
          label: "Islamic Finance Structure",
          value: "Mudarabah, Musyarakah & Wakalah Architecture",
        },
      ],
      footnote:
        "*Full limited partnership agreement terms are accessible upon formal data room clearance.",
    },
    gulf: {
      title: "Gulf Presence",
      lede: "Operational foundations linking GCC liquidity mandates directly with ASEAN tech leaders.",
      items: [
        {
          title: "Saudi CMA Licensing Compliance",
          body: "Rigorous operational alignment matching Capital Market Authority parameters for outbound sovereign private capital deployments.",
        },
        {
          title: "Fintech Saudi Acceleration",
          body: "Co-sponsored pathways built directly inside local sandboxes to fast-track incoming Indonesian tech ventures into Riyadh.",
        },
        {
          title: "SCBD to KAFD Axis",
          body: "Direct physical operations spanning Jakarta SCBD and Riyadh King Abdullah Financial District for immediate institutional pipeline sync.",
        },
      ],
      stats: [
        { value: "100%", label: "Audited Islamic Principle Pipeline Compliant" },
        { value: "SAR 94M", label: "GCC Native Commitments Deployed" },
      ],
    },
    focus: {
      title: "Portfolio Focus",
      columns: {
        assetGroup: "Asset Group",
        corridorFocus: "Corridor Focus",
        jurisdiction: "Jurisdiction",
        allocationStage: "Allocation Stage",
      },
      rows: [
        { focus: "Agro", jurisdiction: "Indonesia", stage: "Project Financing" },
        { focus: "Property", jurisdiction: "Indonesia", stage: "Project Financing" },
        { focus: "Woman Community tech back up", jurisdiction: "Indonesia", stage: "Pre Seed" },
      ],
    },
    dataRoom: {
      title: "Request Data Room Access",
      lede: "Qualified Institutional Investors and Sovereign Allocators may submit authentication parameters to initialize full regulatory clearance reviews.",
      fields: {
        fullName: { label: "Full Name", placeholder: "e.g. Tariq Bin Fahad" },
        institution: { label: "Institution / Firm", placeholder: "e.g. GCC Capital Advisory" },
        email: { label: "Business Email", placeholder: "tariq@gcccapital.com" },
        phone: { label: "Contact Phone", placeholder: "+966 50 000 0000" },
        ticket: { label: "Intended Ticket Size (USD)", placeholder: "e.g. $5,000,000+" },
      },
      submit: "Submit Request",
      download: "Download Moria Ventures Institutional One-Pager",
      privacy:
        "PT Moria Ventures Capital processes investor data strictly in compliance with global secure access firewalls. Verification latency typically spans 24-48 institutional business hours.",
    },
  },

  contact: {
    meta: {
      title: "Contact",
      description:
        "Reach out to our teams in Jakarta and Riyadh. We bridge institutional capital demands with high-growth Islamic Principle-compliant operations.",
    },
    hero: {
      title: "Contact",
      lede: "Reach out to our teams in Jakarta and Riyadh. We bridge institutional capital demands with high-growth Islamic Principle-compliant operations.",
    },
    routed: {
      imageAlt: "The Moria reception",
      title: "Routed Paths",
      routes: [
        {
          title: "For Investors & LPs",
          body: "Interested in allocating to our Islamic Principle bilateral fund corridor or requesting data room access?",
          cta: "Contact Investment Team",
        },
        {
          title: "For Businesses & Founders",
          body: "Looking for Islamic Principle-compliant growth capital, project financing, or GCC expansion support?",
          cta: "Contact Portfolio Team",
        },
      ],
    },
    offices: [
      { region: "Southeast Asia HQ", city: "Jakarta" },
      { region: "GCC Regional HQ", city: "Riyadh" },
    ],
    inquiries: {
      title: "General Inquiries",
      lede: "Submit your investment criteria or business details. Our Islamic Principle compliance board and underwriting team review inquiries within 3 business days.",
      fields: {
        fullName: { label: "Full Name", placeholder: "e.g. Sarah Mansour" },
        email: { label: "Email Address", placeholder: "e.g. sarah.m@company.com" },
        phone: { label: "Phone Number", placeholder: "e.g. +62 812 3456 7890" },
      },
      submit: "Submit Inquiry",
    },
    directLines: {
      title: "Direct Lines",
      lede: "Contact specific global execution teams directly for rapid resolution of operational, Islamic Principle compliance, or investor queries.",
      lines: [
        { team: "Investor Relations", person: "Musab Bin Nosair" },
        { team: "Media and Press", person: "Corporate Communications" },
        { team: "Portfolio Support", person: "Faris Achmad Kuddah" },
        { team: "General Counsel", person: "Islamic Principle Audit & Regulatory Desk" },
      ],
    },
  },

  corridor: {
    meta: {
      title: "Indonesia–Saudi Corridor",
      description:
        "Bridging Southeast Asia's largest economy with the Gulf's fastest-growing market.",
    },
    hero: {
      title: ["Indonesia–Saudi", "Corridor"],
      lede: "Bridging Southeast Asia's largest economy with the Gulf's fastest-growing market.",
      imageAlt: "Jakarta and Riyadh at dusk",
    },
    stats: [
      { value: "$23B+", label: "Bilateral Trade" },
      { value: "270M", label: "Muslim Consumers" },
      { value: "$3.2T", label: "Combined GDP" },
      { value: "60%", label: "Under 30 Pop." },
      { value: "7.2%", label: "Saudi GDP Growth" },
      { value: "5.0%", label: "Indo GDP Growth" },
    ],
    opportunity: {
      title: "The Opportunity",
      imageAlt: "A bilateral partnership meeting",
      figure: "$3.2T",
      figureLabel: "Combined Corridor GDP Opportunity",
      lead: "The corridor linking Indonesia and the Kingdom of Saudi Arabia represents one of the most powerful, underserved Islamic Principle-compliant trade and investment pipelines in the global economy.",
      body: [
        "Driven by Saudi Arabia's ambitious Vision 2030 and Indonesia's projection as a top-five global economy by 2030, this corridor connects high-growth technological ecosystems in Southeast Asia with deep institutional liquidity in the GCC. Moria Ventures serves as the primary conduit ensuring compliant flow.",
        "Through strategic alignment with sovereign entities, national banks, and regulatory bodies across both regions, we facilitate seamless market expansions, trade clearing, and capital allocations that respect Islamic Principle compliance at every milestone.",
      ],
    },
    bridge: {
      title: "How We Bridge",
      imageAlt: "A cross-border deal room",
      items: [
        {
          title: "Market Entry Advisory",
          body: "Deploying market readiness blueprints, licensing support, and localize structuring framework to ensure seamless landing of leading SEA digital scale-ups in Saudi Arabia.",
        },
        {
          title: "Capital Bridging",
          body: "Connecting institutional LPs and sovereign family offices in the Gulf directly to premium investment rounds, ensuring pure compliant equity structures.",
        },
        {
          title: "Regulatory Navigation",
          body: "Liaising strategically with OJK, BI, and Saudi CMA to provide rigorous framework compliance, avoiding operational and transactional friction.",
        },
        {
          title: "Network Access",
          body: "Unlocking direct executive pipelines to sovereign wealth operators, bank networks, leading regional distributors, and key economic ministries.",
        },
      ],
    },
    partners: {
      title: "Our Partners",
      imageAlt: "A partner integration briefing",
      status: "Active Cooperation",
      items: [
        { name: "Fintech Saudi", body: "Saudi CMA and Central Bank sandbox integration node." },
        {
          name: "Bank Syariah Indonesia (BSI)",
          body: "Retail and trade Islamic banking framework.",
        },
        {
          name: "Saudi CMA (Licensed Alignments)",
          body: "Regulated fund flows and compliance frameworks.",
        },
        {
          name: "Embassy of the Republic of Indonesia",
          body: "Diplomatic and G2G bilateral trade support in Riyadh.",
        },
      ],
    },
    inAction: {
      eyebrow: "Corridor in Action",
      title: "Scaling Islamic Fintech Across Regions",
      imageAlt: "The NusaQu product in use",
      caseTitle: "NusaQu Islamic Tech",
      caseBody:
        "NusaQu, a pioneering Indonesian Islamic finance infrastructure platform, needed to secure Gulf institutional allocation to launch its regulatory pilot within Saudi Arabia.",
      stats: [
        { value: "$4.5M", label: "Capital Deployed" },
        { value: "90 Days", label: "CMA Sandbox Clearance" },
      ],
      blocks: [
        {
          label: "The Challenge",
          body: "Regulatory sandboxes in Saudi Arabia require local backing, complex structural entity alignment, and highly precise capital compliance auditing to protect GCC allocators from compliance issues.",
        },
        {
          label: "Our Solution",
          body: "Moria Ventures structured a dual-SPV capital architecture between Jakarta and Riyadh. We partnered with local legal counsel in the GCC to clear CMA guidelines and secure pilot licenses via Fintech Saudi.",
        },
        {
          label: "The Outcome",
          body: "Successful regional pilot landing with full operational capability, unlocking access to 10M+ local users under Islamic Principle-compliant finance operations.",
        },
      ],
    },
    dualEntity: {
      imageAlt: "The Jakarta and Riyadh desks",
      title: "Dual-Entity Advantage at Every Transaction",
      body: "We maintain dedicated investment and operational task forces in both Jakarta and Riyadh, giving our LPs and portfolio companies on-the-ground access in both corridors.",
      tag: "Capability",
      capabilities: [
        "Direct OJK and CMA Regulatory Integration",
        "Bilateral Banking Relationships (BSI, local GCC banks)",
        "In-Country Due Diligence Teams",
        "Cross-Border Legal and Islamic Finance Structuring",
      ],
    },
    qris: {
      title: "QRIS Cross-Border Payment Initiative",
      body: "Moria Fund Global is actively facilitating the integration of Bank Indonesia's national QR payment standard (QRIS) into Saudi Arabia's payment ecosystem, enabling real-time cross-border merchant settlements.",
      imageAlt: "A QRIS merchant settlement terminal",
      eyebrow: "The Infrastructure Bridge",
      bridgeBody:
        "QRIS links Indonesian merchants to GCC consumers, creating a seamless cross-border settlement layer that reduces friction, improves liquidity, and expands regional commerce.",
      stats: [
        { value: "$3.4B+", label: "Annual Bilateral Trade" },
        { value: "$120M", label: "Pipeline Target Allocation" },
      ],
    },
    explore: {
      title: "Explore the Corridor",
      imageAlt: "A corridor trade map",
      investors: {
        title: "For Investors",
        body: "Access curated high-growth Islamic Principle-compliant opportunities spanning fintech, sustainable supply chains, and consumer portals across the high-yield SEA-GCC corridor.",
        cta: "Request LP Presentation",
      },
      businesses: {
        title: "For Businesses",
        body: "Scale your Islamic finance tech stack internationally. Leverage our regulatory licenses, bank networks, and capital backing to launch successfully into Riyadh and the wider Gulf region.",
        cta: "Apply for Corridor Access",
      },
    },
  },

  kneks: {
    meta: {
      title: "KNEKS × Moria",
      description:
        "Moria Ventures works with KNEKS to put Islamic Principle-compliant Indonesian SMEs in front of investors and VCs from MENA and Southeast Asia.",
    },
    logoAlt: "KNEKS — Komite Nasional Ekonomi dan Keuangan Syariah",
    hero: {
      title: ["Indonesian SMEs,", "ready for", "global capital."],
      lede: "Moria Ventures works with KNEKS to put Islamic Principle-compliant SMEs in front of investors and VCs from MENA and Southeast Asia.",
      meetSmes: "Meet the SMEs",
      becomePartner: "Become an investor partner",
      tagline: "Islamic Principle-aligned businesses. Cross-border opportunity.",
      stats: {
        smes: "SMEs in pipeline",
        funded: "Funded graduates",
        raised: "Raised",
        sectors: "Sectors",
        note: "Live figures from the program pipeline.",
      },
    },
    about: {
      eyebrow: "The institutional foundation",
      title: "What KNEKS does",
      body: [
        "KNEKS leads Indonesia's push to grow its Islamic economy and Islamic finance, bringing government, industry and financial institutions together around halal value chains and Islamic Principle-based business.",
        "SMEs sit at the center; many are strong operators with limited access to capital, and this program closes that gap.",
      ],
      supportTitle: "How the program supports SMEs",
      support: [
        "Business and Islamic Principle compliance coaching",
        "Investment readiness (financials, governance, pitch)",
        "Introductions to investors, VCs and funding partners",
        "Cross-border access via the Moria Ventures network",
      ],
    },
    program: {
      title: "How the program works",
      steps: [
        { title: "Apply", body: "Share your business profile." },
        { title: "Screen", body: "Business and Islamic Principle review." },
        { title: "Prepare", body: "Build financials and your pitch." },
        { title: "Pitch", body: "Meet aligned investors." },
        { title: "Get funded", body: "Close the round and grow." },
      ],
      stageOf: "Stage {current} of {total}: {title}",
    },
    explorer: {
      title: "SMEs in the program",
      lede: "Explore the pipeline by sector, city and readiness.",
      previous: "Previous SMEs",
      next: "Next SMEs",
      searchLabel: "Search SMEs",
      searchPlaceholder: "Search name, sector, city",
      filterLabel: "Filter by sector",
      all: "All",
      empty: "No SMEs match that search.",
      countSmes: plural({ one: "{count} SME", other: "{count} SMEs" }),
      countSectors: plural({ one: "{count} sector", other: "{count} sectors" }),
      sampleProfiles: "Sample profiles",
      scrollHint: "Scroll to explore →",
      openBrief: "Open brief: {name}",
      funded: "Funded",
      roundClosed: "Round closed",
      interest: "Investor interest: {pct}% of ask (sample)",
      ask: "Ask",
      raised: "Raised",
      notDisclosed: "Not disclosed",
      curatedProfiles: "Curated for Halal Startup Demo Day 2026",
    },
    brief: {
      close: "Close brief",
      stage: "Stage",
      ask: "Ask",
      askValue: "USD {amount}K",
      traction: "Traction",
      status: "Status",
      fundedStatus: "Funded: USD {amount}K from {investor}",
      inProgram: "In the program",
      add: "Add to shortlist",
      remove: "Remove from shortlist",
      readiness: "Readiness",
      legalForm: "Legal form",
      legalForms: {
        pt: "Limited liability company (PT)",
        cv: "CV / partnership firm",
        none: "No legal entity yet",
      },
      supportingOrg: "Supporting organisation",
      equity: "Equity offered",
      useOfFunds: "Use of funds",
      notDisclosed: "Not disclosed",
      fundedFrom: "Funded: {amount} from {investor}",
      fundedBy: "Funded by {investor}",
    },
    shortlist: {
      title: "Your shortlist",
      empty: "None yet.",
      hint: "Star an SME, or pick it in the form, to include it with your request.",
      add: "Add {name} to shortlist",
      remove: "Remove {name} from shortlist",
    },
    graduates: {
      title: "Graduates who raised funding",
      lede: "Two sample graduates illustrate the cross-border funding pathway.",
      featured: {
        name: "Aman Logistik",
        amount: "USD 600K",
        source: "Raised from a MENA family office",
        story:
          "Placeholder story: logistics services connecting Indonesian SMEs with regional supply chains.",
        quote: "“The program helped us prepare for conversations beyond our home market.”",
      },
      second: {
        name: "Sehat Herbal",
        amount: "USD 200K",
        source: "Southeast Asia VC",
        quote: "“A clearer investment story opened the door to new partners.”",
      },
      quoteCaption: "Illustrative founder quote · placeholder",
      disclaimer: "Mockup only. Names, figures and quotes are placeholders.",
    },
    hubs: {
      title: "Open to international investors",
      lede: "Tap a hub to see who we are looking for there.",
      homeBase: "Home base",
      pickAway: "{name}: see who we are looking for there",
      pickHome: "{name}, home base: see what we do there",
      selected: "{name} · Selected",
      items: {
        riyadh: {
          name: "Riyadh",
          blurb:
            "Riyadh and the wider GCC: family offices, funds and institutions seeking halal-aligned growth deals.",
        },
        dubai: {
          name: "Dubai",
          blurb:
            "Dubai: regional VCs and cross-border platforms that co-invest in emerging markets.",
        },
        kualaLumpur: {
          name: "Kuala Lumpur",
          blurb:
            "Kuala Lumpur: Islamic finance houses and strategic partners for regional expansion.",
        },
        singapore: {
          name: "Singapore",
          blurb:
            "Singapore: VCs and corporates looking for vetted Indonesian SMEs to co-invest and partner.",
        },
        jakarta: {
          name: "Jakarta",
          blurb:
            "Jakarta: home base. Deal screening, Islamic Principle review and local execution with KNEKS.",
        },
      },
    },
    access: {
      eyebrow: "Your next step",
      title: ["Request investor", "access"],
      lede: "Tell us your region and ticket size. We will send the current SME list and set up an intro call.",
    },
    form: {
      name: { label: "Name", placeholder: "Your full name" },
      email: { label: "Email", placeholder: "you@example.com" },
      region: { label: "Region", placeholder: "Select region" },
      ticket: { label: "Ticket size", placeholder: "Select ticket size" },
      message: { label: "Message", placeholder: "Tell us about your investment interests." },
      honeypot: "Company website",
      smesLabel: "SMEs you're interested in",
      selected: "{count} selected",
      pickAtLeastOne: "Pick at least one",
      funded: "Funded",
      fundedSr: ", funded",
      privacy: "Your details are used only to coordinate investor access and introductions.",
      send: "Send request",
      sending: "Sending…",
      filterSmes: "Filter SMEs",
      filterSmesPlaceholder: "Filter by name, sector or city",
      filterSmesEmpty: "No SMEs match that filter.",
      sent: {
        title: "Request sent",
        body: "Thanks, we'll be in touch. Expect the current SME list and an invitation to an intro call.",
        shortlist: "Your shortlist went with it: {names}.",
      },
    },
    /**
     * Messages the access form's Server Action returns. The action reads the
     * page's language from a hidden field and picks these, so they share the
     * dictionary with the form.
     */
    errors: {
      name: "Enter your name.",
      email: "Enter a valid email.",
      region: "Select a region.",
      ticket: "Select a ticket size.",
      shortlist: "Choose at least one SME you're interested in.",
      tooLong: "Keep this under {limit} characters.",
      rateLimited: "Too many requests from your network. Please try again later.",
      storeFailed: "We could not send your request just now. Please try again in a moment.",
    },
  },
};

export default en;
