
export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  slug: string;
  iconName: "GraduationCap" | "Briefcase" | "FileText" | "Globe" | "Landmark" | "ShieldCheck";
  shortDesc: string;
  longDesc: string;
  eligibility: string[];
  documents: string[];
  faqs: FAQ[];
  successRate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  destination: string;
  flag: string;
  visaType: string;
  rating: number;
  image: string;
  videoUrl?: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  skylineImage: string;
  tagline: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const servicesData: Service[] = [
  {
    title: "Study Visa",
    slug: "study-visa",
    iconName: "GraduationCap",
    shortDesc: "Access world-class education. Secure your admissions and study permits in top global destinations.",
    longDesc: "Open doors to global academic excellence. Our Study Visa service provides end-to-end guidance, from selecting the right university and course to securing your student permit and preparing for departure. We specialize in top-tier destinations including Canada, Australia, the United Kingdom, USA, Germany, and New Zealand.",
    successRate: "99.2%",
    eligibility: [
      "Letter of Acceptance (LOA) from a Designated Learning Institution (DLI).",
      "Valid passport with at least 6 months validity from planned entry.",
      "Proof of sufficient funds to cover tuition fees, living expenses, and return transportation.",
      "Proof of language proficiency (IELTS, TOEFL, PTE, or Duolingo) meeting institution standards.",
      "Clean medical record and police clearance certificate (if applicable)."
    ],
    documents: [
      "Official Letter of Acceptance from DLI.",
      "Academic Transcripts, Degrees, and Diplomas.",
      "Language Proficiency Test scorecard.",
      "Proof of funds: GIC (Canada), Bank Statements, Loan approval letters, or sponsor affidavits.",
      "Statement of Purpose (SOP) detailing academic and career plans.",
      "Passport-sized photographs conforming to country visa specifications."
    ],
    faqs: [
      {
        question: "Can I work while studying on a student visa?",
        answer: "Yes, in most major study destinations like Canada, Australia, and the UK, students are permitted to work part-time (typically up to 20 hours per week) during academic terms and full-time during scheduled breaks."
      },
      {
        question: "What is a GIC and is it mandatory for Canada?",
        answer: "A Guaranteed Investment Certificate (GIC) is a secure investment showing proof of funds for living expenses in Canada. For the Student Direct Stream (SDS) pathway, it is highly recommended/mandatory to purchase a $10,000 to $20,635 CAD GIC from a participating bank."
      },
      {
        question: "How long does it take to process a study visa?",
        answer: "Processing times vary significantly by country and application stream. Canadian SDS visas typically take 4-6 weeks, while UK Student visas take 3-4 weeks. We recommend starting your application 3-4 months prior to course commencement."
      }
    ]
  },
  {
    title: "Work Visa",
    slug: "work-visa",
    iconName: "Briefcase",
    shortDesc: "Advance your career globally. Secure employer-sponsored permits and independent work rights.",
    longDesc: "Secure your professional future in high-growth economies. We guide you through employer-sponsored work permits, working holiday visas, and post-study work authorization streams. Align your skills with global market demands and navigate complex labor market assessments with ease.",
    successRate: "97.5%",
    eligibility: [
      "A valid job offer from a licensed employer in the destination country.",
      "Labor Market Impact Assessment (LMIA) or equivalent labor clearance (if required).",
      "Relevant educational credentials and verifiable work experience mapping to the job profile.",
      "Language proficiency matching job classification requirements.",
      "A clean background with no security or medical inadmissibility."
    ],
    documents: [
      "Signed Employment Contract / Offer Letter.",
      "Approved LMIA or country-specific labor market authorization.",
      "Detailed resume with reference letters from previous employers.",
      "Educational Credential Assessment (ECA) report (if applicable).",
      "Valid passport and civil status documents (marriage certificate, etc.).",
      "Proof of financial sufficiency for initial settlement."
    ],
    faqs: [
      {
        question: "What is an LMIA?",
        answer: "A Labor Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. It proves that there is a need for a foreign worker to fill the job and that no Canadian worker is available to do it."
      },
      {
        question: "Can I bring my family on a work visa?",
        answer: "In many cases, yes. Spouses of skilled workers are often eligible for open work permits or dependent visas, and children can obtain study permits or visitor records to accompany the principal applicant."
      }
    ]
  },
  {
    title: "Permanent Residency",
    slug: "permanent-residency",
    iconName: "ShieldCheck",
    shortDesc: "Establish a permanent global home. Navigate Express Entry, PNP, and skilled independent pathways.",
    longDesc: "Make your global move permanent. Our PR visa services guide you through points-based immigration selection mechanisms such as Canada's Express Entry, Provincial Nominee Programs (PNP), Australia's Skilled Independent subclass 189/190, and regional talent streams. Achieve peace of mind with legal residency status.",
    successRate: "96.8%",
    eligibility: [
      "Points-based score threshold (age, education, experience, language skills).",
      "Educational Credentials Assessment (ECA) proving parity with local standards.",
      "Language test results (IELTS General or CELPIP) scoring high (CLB 9+ recommended for Canada).",
      "Proof of funds to support yourself and dependents upon arrival.",
      "Character check (Police clearance) and Medical examinations."
    ],
    documents: [
      "Language proficiency test results.",
      "ECA evaluation report from agencies like WES.",
      "Verifiable employment letters, payslips, and tax records.",
      "Proof of settlement funds (bank certificates, deposits).",
      "Clear police records from all countries resided in for 6+ months.",
      "Biometrics and passport copy."
    ],
    faqs: [
      {
        question: "How does the points-based system work?",
        answer: "Countries like Canada and Australia rank candidates using grids (e.g., Comprehensive Ranking System - CRS). Points are awarded for age (younger applicants get more), education level, skilled work experience, and bilingualism. Candidates above the cut-off receive an Invitation to Apply (ITA)."
      },
      {
        question: "What is the difference between Express Entry and PNP?",
        answer: "Express Entry is a federal system managing permanent residency applications. Provincial Nominee Programs (PNP) are run by individual provinces to select candidates who meet specific local economic needs, which grants an extra 600 CRS points in Express Entry."
      }
    ]
  },
  {
    title: "Tourist Visa",
    slug: "tourist-visa",
    iconName: "Globe",
    shortDesc: "Explore the world seamlessly. Swift document review and file preparation for hassle-free travel.",
    longDesc: "Travel the world without stress. Whether you are visiting family, taking a vacation, or attending business conferences, we handle the application file creation, hotel bookings, flight itineraries, and financial profile preparation to ensure maximum approval odds for tourist and visitor visas.",
    successRate: "98.4%",
    eligibility: [
      "Clear purpose of visit (leisure, family visit, business conference).",
      "Intent to return to home country (stable job, property, family ties).",
      "Adequate funds to support the stay without local employment.",
      "Clean travel history (beneficial but not mandatory).",
      "No security risks or active immigration violations."
    ],
    documents: [
      "Valid passport with previous visas (if any).",
      "Detailed travel itinerary and hotel/accommodation bookings.",
      "Return flight reservation details.",
      "Bank statements showing stable balance for the past 6 months.",
      "Income Tax Returns (ITR) for the last 2-3 years.",
      "Leave approval letter from current employer or business registration documents."
    ],
    faqs: [
      {
        question: "How do I prove my intent to return home?",
        answer: "By submitting strong ties to your home country. This includes an employment contract, property ownership deeds, active business registrations, and family ties (spouse/children staying behind)."
      },
      {
        question: "Do I need travel insurance for a Schengen Visa?",
        answer: "Yes, travel insurance is mandatory for Schengen visitor visas, with a minimum coverage of €30,000 for medical emergencies and repatriation, valid across all Schengen member states."
      }
    ]
  },
  {
    title: "Business Visa",
    slug: "business-visa",
    iconName: "Landmark",
    shortDesc: "Expand your enterprise. Access foreign markets, set up branches, or invest in global businesses.",
    longDesc: "Establish a global footprints. Our Business Visa program assists entrepreneurs, corporate executives, and high-net-worth investors in securing entry for market exploratory trips, starting subsidiaries, investing in local businesses, or obtaining golden visas and residency-by-investment permits.",
    successRate: "95.5%",
    eligibility: [
      "Substantial capital for investment or proven business net worth.",
      "Detailed business proposal aligned with destination economy requirements.",
      "Prior entrepreneurial or executive-level management experience.",
      "Proof of source of funds used for investment.",
      "Fulfillment of minimum job creation requirements (for investor streams)."
    ],
    documents: [
      "Comprehensive Business Plan.",
      "Audited financial statements of existing businesses.",
      "Source of funds verification reports.",
      "Incorporation documents or partnership agreements.",
      "Invitation letter from local chamber of commerce or trade partners.",
      "Asset valuation reports."
    ],
    faqs: [
      {
        question: "What is a Residency-by-Investment (Golden Visa)?",
        answer: "It is a program that grants residency or citizenship to foreign individuals who invest a significant amount of money in the host country's real estate, government bonds, or businesses, allowing seamless travel and business expansion."
      }
    ]
  },
  {
    title: "Visa Documentation",
    slug: "visa-documentation",
    iconName: "FileText",
    shortDesc: "Ensure zero errors. Professional review of SOPs, financial filings, and document portfolios.",
    longDesc: "Avoid costly rejections. Our specialized Visa Documentation services offer expert proofing of Statement of Purposes (SOPs), sponsor affidavits, financial net worth certificates, and cover letters. We ensure your application package aligns exactly with the strict legal guidelines of embassy officers.",
    successRate: "99.8%",
    eligibility: [
      "Applying for any visa type independently or through other agencies.",
      "Requires professional formatting, translation, or legal verification of application documents.",
      "Need correction of previous visa refusal files."
    ],
    documents: [
      "Draft files of current visa application.",
      "Previous visa refusal letters (if applicable) for gap analysis.",
      "Financial documents for auditing.",
      "Personal statements or academic study plans requiring structural rewriting."
    ],
    faqs: [
      {
        question: "Why are visa applications rejected most often?",
        answer: "The primary reasons are weak SOPs, inconsistent financial explanations, inadequate proof of ties to home country, or misaligned educational/professional records. Professional documentation mitigates these issues."
      }
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Rohan Sharma",
    quote: "Zeel Overseas made my dream of studying in Canada a reality. Their team audited my SOP and guided me through the GIC setup step-by-step. My study visa was approved in less than 4 weeks!",
    destination: "Toronto, Canada",
    flag: "🇨🇦",
    visaType: "Study Visa",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "2",
    name: "Priya Patel",
    quote: "Securing an Australian PR subclass 190 was a massive undertaking. Zeel Overseas kept my documents spotless. Their communication was immaculate and they maximized my points profile.",
    destination: "Melbourne, Australia",
    flag: "🇦🇺",
    visaType: "Permanent Residency",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "3",
    name: "Dr. Aditya Sen",
    quote: "After a refusal from another consultant, I approached Zeel Overseas for a UK skilled worker permit. Their forensic analysis of my previous application spotted the error and got it approved.",
    destination: "London, United Kingdom",
    flag: "🇬🇧",
    visaType: "Work Visa",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "4",
    name: "Meera Nair",
    quote: "Our family visa application for Germany was handled with absolute professionalism. Zeel Overseas prepared the Schengen document file perfectly, explaining every insurance detail.",
    destination: "Munich, Germany",
    flag: "🇩🇪",
    visaType: "Tourist Visa",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const countriesData: Country[] = [
  {
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    skylineImage: "https://images.unsplash.com/photo-1503970993-90f0587ab35e?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "The land of maple leaves and endless PR opportunities.",
    description: "Canada remains the top choice for global citizens, offering streamlined Express Entry PR systems, top universities, and post-graduation work rights."
  },
  {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    skylineImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "High quality of life, sunny horizons, and skilled pathways.",
    description: "With high wages, abundant sunshine, and robust points-based Subclass visa streams, Australia is perfect for skilled professionals and students."
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    skylineImage: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "A historic hub for academic and professional growth.",
    description: "Home to Russell Group universities and a highly competitive tech sector, the UK provides rich careers via Skilled Worker and Student routes."
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    skylineImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "The ultimate hub of innovation and business expansion.",
    description: "From STEM OPT extensions for graduates to corporate investment pathways (L-1/EB-5), the USA offers the ultimate platform for ambition."
  },
  {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    skylineImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "Europe's economic engine offering tuition-free study.",
    description: "With low or zero university tuition fees and the Opportunity Card for job-seekers, Germany is a premier gateway to European residency."
  },
  {
    name: "New Zealand",
    code: "NZ",
    flag: "🇳🇿",
    skylineImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "Unmatched safety, scenic beauty, and work pathways.",
    description: "Known for work-life balance and high security, New Zealand offers great green-list residency options for professional profiles."
  }
];

export const milestonesData: Milestone[] = [
  {
    year: "2015",
    title: "Foundation of Zeel Overseas",
    description: "Started with a small team in India to help students connect with international universities."
  },
  {
    year: "2018",
    title: "Expansion to Skilled Migration",
    description: "Launched PR and Work visa services for Canada and Australia, tripling our client base."
  },
  {
    year: "2021",
    title: "Going Digital & Tech-Enabled",
    description: "Introduced advanced document audit workflows and secured a 98% overall success rate."
  },
  {
    year: "2024",
    title: "Global Footprint & Recognition",
    description: "Recognized as a leading consultancy with 5,000+ happy clients and new global office affiliations."
  }
];

export const processStepsData: ProcessStep[] = [
  {
    number: "01",
    title: "Expert Consultation",
    description: "We review your academic history, skills, and goals to choose the optimal visa route."
  },
  {
    number: "02",
    title: "Document Compilation",
    description: "Professional checklists for financial records, transcripts, reference letters, and SOP checks."
  },
  {
    number: "03",
    title: "Application Lodgment",
    description: "Submission of your application to the embassy portals with detailed, error-free formatting."
  },
  {
    number: "04",
    title: "Interview Preparation",
    description: "Mock interviews with former visa officers to build confidence and refine response profiles."
  },
  {
    number: "05",
    title: "Visa Approval",
    description: "Receive your visa stamped passport. We celebrate your first milestone together!"
  },
  {
    number: "06",
    title: "Pre-Departure Briefing",
    description: "Guidance on local laws, banking, GIC payouts, housing, and booking your travel tickets."
  }
];
