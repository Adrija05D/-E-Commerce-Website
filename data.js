// ==========================================================================
// BookNest — Online Bookstore Catalog & Knowledge Base
// Model: B2C Independent E-Commerce with Digital Goods & Physical Books
// Operating from: College Street Publishing Hub, Kolkata, India
// ==========================================================================

const PRODUCTS_DATA = [
  // ------------------------------------------------------------------------
  // 1. Academic Books
  // ------------------------------------------------------------------------
  {
    id: "bn-acad-01",
    title: "Management Information Systems: Managing the Digital Firm",
    author: "Kenneth C. Laudon & Jane P. Laudon",
    category: "academic",
    categoryLabel: "Academic & University Textbooks",
    format: "Paperback + Digital E-Book",
    availableFormats: [
      { type: "Paperback (Print Edition)", priceUSD: 32.00, originalPriceUSD: 55.00, delivery: "Ships in 2-3 business days" },
      { type: "Digital E-Book (PDF + EPUB)", priceUSD: 18.00, originalPriceUSD: 35.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "34.5 MB",
    pages: 688,
    isbn13: "978-0136971542",
    publisher: "Pearson Education",
    publicationYear: 2022,
    edition: "17th Global Edition",
    language: "English",
    inStock: true,
    stockCount: 42,
    badge: "Bestselling Text",
    rating: 4.9,
    reviewsCount: 218,
    price: 32.00,
    originalPrice: 55.00,
    shortDescription: "The authoritative textbook on enterprise systems, digital goods economics, cloud computing, and strategic MIS frameworks.",
    fullDescription: "Widely prescribed across leading business schools for BBA and MBA curricula, Laudon & Laudon provides the most comprehensive treatment of how business firms utilize information technologies and systems to achieve operational excellence, develop new products, improve decision making, and gain competitive advantage. Features in-depth chapters on E-Commerce business models (B2C, B2B, C2C), digital market microeconomics, supply chain integration, enterprise resource planning (ERP), and cybersecurity management.",
    features: [
      "Authoritative global edition on modern management information systems",
      "Comprehensive analysis of digital goods economics and non-rivalrous consumption",
      "Detailed enterprise architecture: ERP, Supply Chain Management (SCM), and CRM systems",
      "Cloud infrastructure, Big Data analytics, AI algorithms, and IT governance",
      "Includes 40+ corporate case studies from Amazon, Google, Walmart, and Uber"
    ],
    downloadsCount: 3840,
    downloadFilename: "Laudon-MIS-17th-Edition-StudentGuide.pdf",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: Information Systems in Global Business Today",
      pagesAvailable: 18,
      tableOfContents: [
        "1.1 How Information Systems Are Transforming Business",
        "1.2 What Is an Information System and How Does It Work?",
        "1.3 Dimensions of Information Systems: Organizations, Management, and Technology",
        "1.4 Contemporary Approaches to Information Systems",
        "1.5 Hands-On MIS Projects: E-Commerce Spreadsheet & Database Exercises"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: The Role of Information Systems in Business Today</h4>
          <p>In 2026, you cannot imagine doing business without information systems. What began as automated accounting back in the 1950s has evolved into the neural network of the modern enterprise. A digital firm is one in which nearly all of the organization's significant business relationships with customers, suppliers, and employees are digitally enabled and mediated.</p>
          <blockquote>"Information technology is the foundation for business in the twenty-first century. In many industries, survival and even existence without extensive use of IT is inconceivable." — Laudon & Laudon</blockquote>
          <p><strong>Core Business Objectives of Information Systems:</strong></p>
          <ul>
            <li><strong>Operational Excellence:</strong> Improving efficiency to attain higher profitability.</li>
            <li><strong>New Products, Services, & Business Models:</strong> Describing how a company produces, delivers, and sells products (e.g., Apple iTunes, Netflix, BookNest).</li>
            <li><strong>Customer and Supplier Intimacy:</strong> Serving customers well leads to repeat purchases; close ties with suppliers lower costs.</li>
            <li><strong>Improved Decision Making:</strong> Real-time data streams eliminate reliance on guesswork and luck.</li>
            <li><strong>Competitive Advantage:</strong> Doing things better than competitors, charging less, and delivering instant digital fulfillment.</li>
          </ul>
        </div>
      `
    },
    reviews: [
      { author: "Rahul Sen", role: "BBA 2nd Year Student", rating: 5, date: "Oct 19, 2026", text: "The foundational textbook for our Management Information Systems course. The digital version is super clear and search-friendly." },
      { author: "Prof. Ananya Sen", role: "MIS Lecturer", rating: 5, date: "Oct 02, 2026", text: "The definitive guide to understanding modern information architectures and e-commerce models. Highly recommended." },
      { author: "Sneha Mukherjee", role: "Business Analytics Student", rating: 4.8, date: "Sep 24, 2026", text: "Case studies on Amazon and ERP systems gave immense practical clarity for our university coursework." }
    ]
  },
  {
    id: "bn-acad-02",
    title: "Principles of Marketing",
    author: "Philip Kotler & Gary Armstrong",
    category: "academic",
    categoryLabel: "Academic & University Textbooks",
    format: "Paperback + Digital E-Book",
    availableFormats: [
      { type: "Paperback (Print Edition)", priceUSD: 28.00, originalPriceUSD: 48.00, delivery: "Ships in 2-3 business days" },
      { type: "Digital E-Book (PDF + EPUB)", priceUSD: 16.00, originalPriceUSD: 30.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "28.1 MB",
    pages: 744,
    isbn13: "978-0135766590",
    publisher: "Pearson Education",
    publicationYear: 2020,
    edition: "18th Global Edition",
    language: "English",
    inStock: true,
    stockCount: 35,
    badge: "Bestseller",
    rating: 4.8,
    reviewsCount: 165,
    price: 28.00,
    originalPrice: 48.00,
    shortDescription: "The gold-standard marketing textbook explaining consumer value creation, digital channels, and modern branding.",
    fullDescription: "Philip Kotler's Principles of Marketing helps students master the foundational concepts of creating customer value, omnichannel digital promotion, behavioral pricing strategies, and social media analytics in the contemporary digital marketplace.",
    features: [
      "The 5-step customer value creation framework",
      "Digital Marketing, SEO, Social Media, and Omnichannel Commerce",
      "Dynamic pricing models and psychological pricing tactics",
      "Marketing ethics, consumer protection laws, and data privacy"
    ],
    downloadsCount: 2210,
    downloadFilename: "Kotler-Principles-Of-Marketing-18thEd-Excerpt.pdf",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: Marketing: Creating Customer Value and Engagement",
      pagesAvailable: 15,
      tableOfContents: [
        "1.1 What Is Marketing? Understanding the Marketplace and Customer Needs",
        "1.2 Designing a Customer Value-Driven Marketing Strategy",
        "1.3 Preparing an Integrated Marketing Plan and Program",
        "1.4 Managing Customer Relationships and Capturing Customer Value",
        "1.5 The Changing Marketing Landscape in the Digital Age"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: The Marketing Process & Customer Value</h4>
          <p>Today's marketing is all about creating customer value and building strong customer relationships in order to capture value from customers in return. In the digital economy, marketing is no longer just telling and selling; it is satisfying customer needs seamlessly through digital touchpoints.</p>
          <p><strong>The Five-Step Marketing Process:</strong></p>
          <ol>
            <li>Understand the marketplace and customer needs and wants.</li>
            <li>Design a customer value-driven marketing strategy (Targeting & Positioning).</li>
            <li>Construct an integrated marketing program that delivers superior value (4 Ps: Product, Price, Place, Promotion).</li>
            <li>Engage customers, build profitable relationships, and create customer delight.</li>
            <li>Capture value from customers to create profits and customer equity.</li>
          </ol>
        </div>
      `
    },
    reviews: [
      { author: "Debanjan Das", role: "Marketing Major", rating: 5, date: "Oct 12, 2026", text: "Every chapter has actionable frameworks for digital branding and promotion." },
      { author: "Rituja Roy", role: "BBA Student", rating: 4.7, date: "Sep 28, 2026", text: "Clear diagrams and straightforward explanation of dynamic pricing." }
    ]
  },
  {
    id: "bn-acad-03",
    title: "Financial Accounting for Management: An Analytical Perspective",
    author: "N. Ramachandran & Ram Kumar Kakani",
    category: "academic",
    categoryLabel: "Academic & University Textbooks",
    format: "Paperback + PDF Notes",
    availableFormats: [
      { type: "Paperback (Print Edition)", priceUSD: 24.00, originalPriceUSD: 42.00, delivery: "Ships in 2-3 business days" },
      { type: "Digital Study Companion (PDF)", priceUSD: 14.00, originalPriceUSD: 25.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "22.4 MB",
    pages: 592,
    isbn13: "978-9354245619",
    publisher: "McGraw Hill India",
    publicationYear: 2021,
    edition: "5th Edition",
    language: "English",
    inStock: true,
    stockCount: 28,
    badge: "Core Subject",
    rating: 4.7,
    reviewsCount: 112,
    price: 24.00,
    originalPrice: 42.00,
    shortDescription: "Essential guide to reading corporate balance sheets, cash flow statements, and financial ratio analysis.",
    fullDescription: "A pragmatic financial accounting manual tailored for management students and corporate executives. Emphasizes interpretation over rote mechanical entries, teaching how corporate financial statements inform managerial decisions.",
    features: [
      "Balance Sheet, P&L Account, and Cash Flow Statement analysis",
      "Liquidity, Solvency, Turnover, and Profitability Ratio formulas",
      "Working capital management and inventory valuation (FIFO, LIFO, Weighted Average)",
      "IFRS and Indian Accounting Standards (Ind AS) compliance guidelines"
    ],
    downloadsCount: 1740,
    downloadFilename: "Financial-Accounting-Management-Summary.pdf",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: The Accounting Framework & Balance Sheet Logic",
      pagesAvailable: 14,
      tableOfContents: [
        "1.1 Nature and Scope of Financial Accounting",
        "1.2 Accounting Principles, Concepts, and Conventions",
        "1.3 The Fundamental Accounting Equation (Assets = Liabilities + Equity)",
        "1.4 Structure of the Corporate Balance Sheet",
        "1.5 Practical Exercise: Analyzing Working Capital in E-Commerce"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: The Dual Aspect Concept in Digital Commerce</h4>
          <p>Every business transaction involves a two-fold aspect: a giving and a receiving. For an e-commerce platform like BookNest, receiving payment from a student increases Cash (Asset) while simultaneously creating a Sales Revenue entry (Owner's Equity addition) or Unearned Revenue liability until delivery.</p>
          <p><strong>The Fundamental Accounting Equation:</strong></p>
          <code>Total Assets = Total Liabilities + Shareholders' Equity</code>
        </div>
      `
    },
    reviews: [
      { author: "Arjun Verma", role: "Finance Student", rating: 4.8, date: "Oct 05, 2026", text: "Simplifies complex balance sheet ratio calculations significantly." }
    ]
  },

  // ------------------------------------------------------------------------
  // 2. Novels & Bestsellers
  // ------------------------------------------------------------------------
  {
    id: "bn-nov-01",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    category: "novels",
    categoryLabel: "Novels & Bestsellers",
    format: "Hardcover / E-Book",
    availableFormats: [
      { type: "Hardcover (Collector Edition)", priceUSD: 15.00, originalPriceUSD: 24.00, delivery: "Ships in 1-2 business days" },
      { type: "Digital E-Book (EPUB + PDF)", priceUSD: 9.00, originalPriceUSD: 16.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "14.2 MB",
    pages: 320,
    isbn13: "978-0735211292",
    publisher: "Avery / Penguin Random House",
    publicationYear: 2018,
    edition: "International Bestseller",
    language: "English",
    inStock: true,
    stockCount: 65,
    badge: "Global #1",
    rating: 5.0,
    reviewsCount: 420,
    price: 15.00,
    originalPrice: 24.00,
    shortDescription: "A revolutionary system for getting 1% better every single day through the science of micro-behaviors.",
    fullDescription: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    features: [
      "The 4 Laws of Behavior Change: Make it Obvious, Attractive, Easy, and Satisfying",
      "Why small 1% improvements compound exponentially over a year (37x better)",
      "Identity-based habits vs. outcome-based habits",
      "Overcoming the Plateau of Latent Potential"
    ],
    downloadsCount: 5120,
    downloadFilename: "Atomic-Habits-Sample-Chapter1.pdf",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: The Surprising Power of Atomic Habits",
      pagesAvailable: 16,
      tableOfContents: [
        "The Story of the British Cycling Team's 1% Aggregations",
        "Why Small Habits Make a Big Difference (The Math of 1% Better)",
        "What Progress Really Looks Like: The Plateau of Latent Potential",
        "Forget About Goals, Focus on Systems Instead"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: The Power of 1% Compounding</h4>
          <p>It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. Too often, we convince ourselves that massive success requires massive action.</p>
          <p>Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. The difference a tiny improvement can make over time is astounding.</p>
          <blockquote>"If you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done. Conversely, if you get 1 percent worse each day for one year, you'll decline nearly down to zero." — James Clear</blockquote>
        </div>
      `
    },
    reviews: [
      { author: "Kavita Rao", role: "Avid Reader", rating: 5, date: "Oct 14, 2026", text: "Completely changed how I schedule study time for semester exams." },
      { author: "Siddharth Bose", role: "Software Developer", rating: 5, date: "Sep 22, 2026", text: "Systems over goals. One of the best non-fiction books ever written." }
    ]
  },
  {
    id: "bn-nov-02",
    title: "The Psychology of Money: Timeless Lessons on Wealth",
    author: "Morgan Housel",
    category: "novels",
    categoryLabel: "Novels & Bestsellers",
    format: "Paperback + Audio Companion",
    availableFormats: [
      { type: "Paperback Edition", priceUSD: 14.00, originalPriceUSD: 22.00, delivery: "Ships in 2-3 business days" },
      { type: "Digital E-Book (EPUB + PDF)", priceUSD: 8.50, originalPriceUSD: 15.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "16.8 MB",
    pages: 256,
    isbn13: "978-0857197689",
    publisher: "Harriman House",
    publicationYear: 2020,
    edition: "1st Edition",
    language: "English",
    inStock: true,
    stockCount: 48,
    badge: "Trending",
    rating: 4.9,
    reviewsCount: 310,
    price: 14.00,
    originalPrice: 22.00,
    shortDescription: "19 short stories exploring the strange ways people think about money, wealth, greed, and happiness.",
    fullDescription: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people. Morgan Housel shares 19 short stories exploring the personal psychology behind financial decisions.",
    features: [
      "Why personal experience dictates 80% of how people view financial risk",
      "The role of luck vs. risk in outsized corporate success",
      "Controlling your time as the highest dividend money pays",
      "The difference between being rich (current income) and being wealthy (unspent freedom)"
    ],
    downloadsCount: 3680,
    downloadFilename: "Psychology-Of-Money-Sample-Chapter.pdf",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: No One's Crazy",
      pagesAvailable: 12,
      tableOfContents: [
        "1. No One's Crazy: Your Personal Experiences with Money Shape Your Worldview",
        "2. Luck & Risk: The Seductive Nature of Financial Success",
        "3. Never Enough: When Rich People Do Crazy Things",
        "4. Confounding Compounding: Warren Buffett's Secret"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: Your View of Money Is Based on Where You Grew Up</h4>
          <p>Your personal experiences with money make up maybe 0.00000001% of what's happened in the world, but maybe 80% of how you think the world works. A person who grew up during the Great Depression thinks about risk and reward in ways that someone who grew up during the tech boom of the 1990s cannot fathom.</p>
          <p>No amount of intelligence or open-mindedness can genuinely recreate the feeling of fear and uncertainty. Dogs that have been whipped cowers when you raise a hand. Humans who lived through hyperinflation never look at bank notes the same way again.</p>
        </div>
      `
    },
    reviews: [
      { author: "Pooja Das", role: "Management Trainee", rating: 5, date: "Oct 11, 2026", text: "Short, crisp chapters that deliver profound financial wisdom." }
    ]
  },
  {
    id: "bn-nov-03",
    title: "1984: The Definitive Dystopian Classic",
    author: "George Orwell",
    category: "novels",
    categoryLabel: "Novels & Bestsellers",
    format: "Paperback / EPUB",
    availableFormats: [
      { type: "Paperback Classic", priceUSD: 9.00, originalPriceUSD: 16.00, delivery: "Ships in 1-2 business days" },
      { type: "Digital Unabridged E-Book", priceUSD: 4.50, originalPriceUSD: 10.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "8.5 MB",
    pages: 328,
    isbn13: "978-0451524935",
    publisher: "Signet Classics",
    publicationYear: 1950,
    edition: "Centennial Classic Edition",
    language: "English",
    inStock: true,
    stockCount: 75,
    badge: "Classics Pick",
    rating: 4.9,
    reviewsCount: 540,
    price: 9.00,
    originalPrice: 16.00,
    shortDescription: "Orwell's prophecy about totalitarian surveillance, Big Brother, Newspeak, and historical alteration.",
    fullDescription: "Winston Smith is a low-ranking member of the ruling Party in London, in the nation of Oceania. Everywhere Winston goes, even inside his own cubicle at the Ministry of Truth, the party watches him through telescreens. Big Brother is always watching.",
    features: [
      "Complete original unabridged text with historical annotations",
      "Analysis of Newspeak, Doublethink, and the Ministry of Truth",
      "Critique of information control and state-managed surveillance systems"
    ],
    downloadsCount: 6890,
    downloadFilename: "1984-Orwell-Sample-Chapter1.pdf",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Part One: Chapter 1",
      pagesAvailable: 15,
      tableOfContents: [
        "Part One: Winston Smith at the Ministry of Truth",
        "Part Two: The Brotherhood, Julia, and the Antique Shop",
        "Part Three: Room 101 and the Ministry of Love",
        "Appendix: The Principles of Newspeak"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Part One: Chapter 1 Excerpt</h4>
          <p>It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.</p>
          <p>The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features.</p>
          <blockquote>"WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH."</blockquote>
        </div>
      `
    },
    reviews: [
      { author: "Aniket Ghosh", role: "Literature Enthusiast", rating: 5, date: "Oct 01, 2026", text: "As relevant in today's algorithmic surveillance age as when it was written in 1948." }
    ]
  },

  // ------------------------------------------------------------------------
  // 3. Digital E-Books (Instant Download)
  // ------------------------------------------------------------------------
  {
    id: "bn-ebook-01",
    title: "Zero to One: Notes on Startups, or How to Build the Future",
    author: "Peter Thiel with Blake Masters",
    category: "ebooks",
    categoryLabel: "Digital E-Books (Instant Delivery)",
    format: "Instant PDF + EPUB + Kindle Format",
    availableFormats: [
      { type: "Digital E-Book Bundle (PDF + EPUB + MOBI)", priceUSD: 11.00, originalPriceUSD: 19.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "18.3 MB",
    pages: 224,
    isbn13: "978-0804139298",
    publisher: "Crown Business",
    publicationYear: 2014,
    edition: "Digital Master Edition",
    language: "English",
    inStock: true,
    stockCount: 999, // Infinite digital inventory
    badge: "Startup Bible",
    rating: 4.8,
    reviewsCount: 290,
    price: 11.00,
    originalPrice: 19.00,
    shortDescription: "How to build companies that create new things: going from 0 to 1 rather than copying what already exists (1 to n).",
    fullDescription: "The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. In Zero to One, legendary entrepreneur and investor Peter Thiel shows how we can find singular ways to create those new things.",
    features: [
      "Horizontal progress (globalization: 1 to n) vs. Vertical progress (technology: 0 to 1)",
      "Why proprietary technology must be 10x better than the closest substitute",
      "Network effects, economies of scale, and branding advantages of digital firms",
      "The Power Law of Venture Capital and startup equity distributions"
    ],
    downloadsCount: 4120,
    downloadFilename: "Zero-To-One-Thiel-Digital-Edition.pdf",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: The Challenge of the Future",
      pagesAvailable: 14,
      tableOfContents: [
        "1. The Challenge of the Future: What Important Truth Do Very Few People Agree with You On?",
        "2. Party Like It's 1999: Lessons from the Dot-Com Crash",
        "3. All Happy Companies Are Different: Monopoly Capitalism",
        "4. The Ideology of Competition: Creative Monopolies vs. Perfect Competition"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: The Contrarian Interview Question</h4>
          <p>Whenever I interview someone for a job, I like to ask this question: <em>"What important truth do very few people agree with you on?"</em></p>
          <p>This question sounds easy because it's straightforward. Actually, it's very hard to answer. It's intellectually difficult because the knowledge that everyone is taught in school is by definition agreed upon. And it's psychologically difficult because anyone trying to answer must say something unpopular.</p>
          <p>Most answers are different ways of seeing the present; good answers are as close as we can come to looking into the future. Progress can take one of two forms. Horizontal or extensive progress means copying things that work—going from 1 to n. Vertical or intensive progress means doing new things—going from 0 to 1.</p>
        </div>
      `
    },
    reviews: [
      { author: "Kunal Shah", role: "Founder", rating: 5, date: "Sep 29, 2026", text: "Essential reading for anyone interested in network effects and high-margin software business models." }
    ]
  },
  {
    id: "bn-ebook-02",
    title: "Designing Data-Intensive Applications: The Big Ideas Behind Scalable Systems",
    author: "Martin Kleppmann",
    category: "ebooks",
    categoryLabel: "Digital E-Books (Instant Delivery)",
    format: "Instant PDF + Interactive E-Book",
    availableFormats: [
      { type: "Digital Master Edition (Searchable PDF + EPUB)", priceUSD: 19.00, originalPriceUSD: 38.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "42.1 MB",
    pages: 616,
    isbn13: "978-1449373320",
    publisher: "O'Reilly Media",
    publicationYear: 2017,
    edition: "Enterprise Edition",
    language: "English",
    inStock: true,
    stockCount: 999,
    badge: "Tech Classic",
    rating: 5.0,
    reviewsCount: 380,
    price: 19.00,
    originalPrice: 38.00,
    shortDescription: "The definitive engineering handbook on databases, distributed consensus, stream processing, and scalability.",
    fullDescription: "Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. Martin Kleppmann cuts through the buzzwords to examine the fundamental architectures of modern data systems.",
    features: [
      "Reliability, Scalability, and Maintainability deep dive",
      "Relational vs. Document vs. Graph Data Models",
      "Storage engines: LSM-Trees, B-Trees, and indexes",
      "Replication, Partitioning, Transactions, and Distributed Consensus (Raft / Paxos)"
    ],
    downloadsCount: 2950,
    downloadFilename: "Designing-Data-Intensive-Apps-Sample.pdf",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Chapter 1: Reliable, Scalable, and Maintainable Applications",
      pagesAvailable: 20,
      tableOfContents: [
        "1.1 Thinking About Data Systems",
        "1.2 Reliability: Hardware Faults, Software Errors, and Human Mistakes",
        "1.3 Scalability: Describing Load, Describing Performance, Percentiles",
        "1.4 Maintainability: Operability, Simplicity, Evolvability"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Chapter 1 Excerpt: Describing Performance and Percentiles</h4>
          <p>When you scale a modern web service, average response time (mean) is rarely a good metric because it hides outliers. A customer who experienced a 5-second delay is dissatisfied regardless of whether the mean was 200 milliseconds.</p>
          <p>Instead, we use <strong>percentiles</strong> (p50, p95, p99, p99.9). High percentiles of response time, also known as tail latencies, are especially important because the customers who make the most requests (and generate the most revenue) are the ones who experience the tail latencies most frequently!</p>
        </div>
      `
    },
    reviews: [
      { author: "Aditi Sen", role: "Cloud Architect", rating: 5, date: "Oct 08, 2026", text: "The clearest breakdown of database internals and distributed systems ever published." }
    ]
  },

  // ------------------------------------------------------------------------
  // 4. Semester Study Notes & Revision Guides
  // ------------------------------------------------------------------------
  {
    id: "bn-notes-01",
    title: "Management Information Systems (MIS) Comprehensive Revision Pack & Solved Papers",
    author: "BookNest Academic Editorial & Faculty Panel",
    category: "notes",
    categoryLabel: "Semester Notes & Exam Revision",
    format: "Instant PDF Download + Formula Sheets",
    availableFormats: [
      { type: "Digital Revision Pack (PDF + Solved Papers)", priceUSD: 8.00, originalPriceUSD: 18.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "12.8 MB",
    pages: 148,
    isbn13: "BN-BBA3-MIS-2026",
    publisher: "BookNest Academic Press",
    publicationYear: 2026,
    edition: "2026 University Exam Edition",
    language: "English",
    inStock: true,
    stockCount: 999,
    badge: "100% Exam Aligned",
    rating: 5.0,
    reviewsCount: 360,
    price: 8.00,
    originalPrice: 18.00,
    shortDescription: "Complete unit-wise revision notes, solved 5-year question papers, MIS flowcharts, and 100+ viva questions.",
    fullDescription: "Specifically compiled for undergraduate and postgraduate business students studying Management Information Systems. Contains simplified bullet-point summaries of all 5 curriculum modules, enterprise system architecture diagrams, digital markets economics, and solved previous-year examination questions.",
    features: [
      "Unit 1: Introduction to MIS, Dimensions of IS, Information vs. Data",
      "Unit 2: System Classification (TPS, OAS, MIS, DSS, ESS, KMS)",
      "Unit 3: Database Management Systems, SQL basics, Cloud Infrastructure",
      "Unit 4: E-Commerce Architecture, Digital Goods Economics, Payment Rails",
      "Unit 5: Information Security, Ethics, Cyber Law, and Disaster Recovery",
      "Bonus: 5 Full-Length Solved Model Examination Papers with Marking Keys"
    ],
    downloadsCount: 4890,
    downloadFilename: "BBA-MIS-Comprehensive-Revision-Notes.pdf",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Unit 1 & Unit 4 Quick Revision Summary (Management Information Systems)",
      pagesAvailable: 16,
      tableOfContents: [
        "Unit 1: Core MIS Concepts & Value Chain Framework",
        "Unit 2: Hierarchy of Information Systems in Management",
        "Unit 3: Relational Database Models & Normalization",
        "Unit 4: E-Commerce Business Models (B2C, B2B, C2C) & Digital Goods",
        "Unit 5: Cybersecurity (Firewalls, SSL, Digital Signatures) & MIS Audit"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Unit 4 Quick Exam Notes: Digital Markets & Digital Goods</h4>
          <p><strong>1. Characteristics of Digital Markets vs. Traditional Markets:</strong></p>
          <ul>
            <li><strong>Reduced Information Asymmetry:</strong> Buyers and sellers have transparent access to prices, reviews, and product specifications.</li>
            <li><strong>Lower Search Costs:</strong> Instant indexing allows consumers to compare hundreds of vendors in milliseconds.</li>
            <li><strong>Dynamic Pricing:</strong> Prices fluctuate based on demand, stock, and consumer segments (e.g., student coupons).</li>
            <li><strong>Disintermediation:</strong> Removing middlemen (distributors, retail physical store rental) allows platforms like BookNest to pass savings directly to students.</li>
          </ul>
          <p><strong>2. Economic Properties of Digital Goods:</strong></p>
          <ul>
            <li><strong>Marginal Cost:</strong> Cost of producing the first copy is high; cost of producing subsequent digital copies is zero (MC = 0).</li>
            <li><strong>Non-Rivalrous Consumption:</strong> 10,000 students can download the same MIS note PDF simultaneously without diminishing availability.</li>
          </ul>
        </div>
      `
    },
    reviews: [
      { author: "Sruti Das", role: "Business Administration Student", rating: 5, date: "Oct 21, 2026", text: "Comprehensive coverage of all 5 modules with high-yield revision flowcharts and model answers. Outstanding study companion!" },
      { author: "Vikram Singhania", role: "BBA Class Representative", rating: 5, date: "Oct 16, 2026", text: "Saved our entire batch during midterm revision. Super clear summaries." }
    ]
  },
  {
    id: "bn-notes-02",
    title: "Business Environment & Commercial Law Quick-Revision Master Notes",
    author: "BookNest Legal & Commerce Academic Faculty",
    category: "notes",
    categoryLabel: "Semester Notes & Exam Revision",
    format: "Instant PDF Download",
    availableFormats: [
      { type: "Digital Master PDF", priceUSD: 7.00, originalPriceUSD: 15.00, delivery: "Instant sub-second download" }
    ],
    fileSize: "10.4 MB",
    pages: 116,
    isbn13: "BN-BBA3-LAW-2026",
    publisher: "BookNest Academic Press",
    publicationYear: 2026,
    edition: "2026 Revised Edition",
    language: "English",
    inStock: true,
    stockCount: 999,
    badge: "High Yield",
    rating: 4.8,
    reviewsCount: 145,
    price: 7.00,
    originalPrice: 15.00,
    shortDescription: "High-yield revision notes on the Indian Contract Act 1872, Sale of Goods Act, Companies Act 2013, and Consumer Protection.",
    fullDescription: "A concise exam-oriented revision handbook breaking down intricate legal statutes into simple flowcharts, leading case summaries (e.g., Balfour v. Balfour, Carlill v. Carbolic Smoke Ball Co.), and exam answer formats.",
    features: [
      "Essentials of a Valid Contract (Offer, Acceptance, Consideration, Capacity)",
      "Breach of Contract and Remedies available to aggrieved parties",
      "Sale of Goods Act: Conditions vs. Warranties, Caveat Emptor doctrine",
      "Consumer Protection Act 2019 and E-Commerce rules for digital platforms"
    ],
    downloadsCount: 2150,
    downloadFilename: "Commercial-Law-BBA-Revision-Guide.pdf",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=700&auto=format&fit=crop&q=80",
    preview: {
      sampleChapterTitle: "Module 1: The Indian Contract Act, 1872",
      pagesAvailable: 12,
      tableOfContents: [
        "1. Definition and Essentials of Contract (Section 10)",
        "2. Offer and Acceptance: Legal Rules and Revocation",
        "3. Consideration: 'No Consideration, No Contract' and its Exceptions",
        "4. Free Consent (Coercion, Undue Influence, Fraud, Misrepresentation)"
      ],
      excerptHtml: `
        <div class="sample-excerpt">
          <h4>Module 1 Excerpt: Essentials of a Valid Contract</h4>
          <p>According to Section 2(h) of the Indian Contract Act, 1872: <em>"An agreement enforceable by law is a contract."</em></p>
          <p><strong>Section 10 Requirements:</strong></p>
          <ol>
            <li>Offer and Acceptance with lawful intention.</li>
            <li>Lawful Consideration (Quid Pro Quo - something in return).</li>
            <li>Capacity of Parties (Major, Sound Mind, Not disqualified).</li>
            <li>Free Consent (Not obtained via Coercion, Fraud, or Mistake).</li>
            <li>Lawful Object and Not expressly declared void.</li>
          </ol>
        </div>
      `
    },
    reviews: [
      { author: "Megha Gupta", role: "BBA Student", rating: 4.9, date: "Sep 27, 2026", text: "Case law summaries are so concise and easy to memorize for exams." }
    ]
  }
];

// Promotional Coupons
const PROMO_CODES = {
  "BOOK20": { discountPercent: 20, description: "20% Off All Academic Books, Novels & Notes" },
  "STUDENT10": { discountPercent: 10, description: "10% Student Community Discount" },
  "SRUTI50": { discountPercent: 50, description: "50% Special Campus Reader Discount" }
};

// Company Information
const COMPANY_INFO = {
  name: "BookNest — Online Bookstore",
  legalName: "BookNest Digital & Academic Publications Pvt. Ltd.",
  tagline: "Your Premier Academic Haven for University Textbooks, Bestselling Novels & Instant Digital Notes",
  founded: "2024",
  headquarters: "College Street Academic Hub, Kolkata, West Bengal, India",
  natureOfBusiness: "B2C E-Commerce Bookstore & Digital Publishing Distribution Platform",
  mission: "To democratize academic learning and literary discovery by connecting university students and lifelong readers with affordable physical textbooks, bestselling novels, and instantaneous sub-second digital study downloads.",
  targetAudience: [
    "University Students (BBA, B.Com, MBA, Tech) needing prescribed academic textbooks and exam revision notes",
    "Lifelong Readers & Fiction Enthusiasts seeking bestselling novels, classics, and non-fiction",
    "Competitive Exam Aspirants requiring high-yield study notes, solved question papers, and formula guides",
    "Professors and Educators procuring digital academic reference materials"
  ],
  businessModel: {
    primary: "B2C (Business-to-Consumer) Online Bookstore with Digital Intangible Goods",
    modelDescription: "BookNest operates a direct Business-to-Consumer (B2C) e-commerce model. The company procures or publishes physical books, university-prescribed textbooks, bestselling novels, digital e-books, and curated semester notes, retailing them directly to students and consumers through an integrated digital web platform.",
    revenueStreams: [
      "Direct Retail Sales: Margin on physical academic textbooks and popular novels (15–30% retail margin)",
      "Digital E-Book & Notes Sales: High-margin (85–95%) sales of intangible electronic editions with zero marginal reproduction cost",
      "Semester Academic Bundles: Bundled textbook + revision notes packages at discounted prices",
      "Institutional Digital Subscriptions: College library multi-user licenses for digital notes and e-books"
    ]
  }
};
