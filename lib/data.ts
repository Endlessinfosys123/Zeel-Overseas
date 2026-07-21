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
    title: "Study Visa Consultation",
    slug: "study-visa",
    iconName: "GraduationCap",
    shortDesc: "University shortlisting, application support, and student visa documentation for top study destinations.",
    longDesc: "Choosing the right country, course, and university is the first step toward a successful study-abroad journey — and getting your student visa approved is the next. Zeel Overseas guides you through both, with counselors who understand what embassies and universities actually look for in a strong application.",
    successRate: "99%",
    eligibility: [
      "Valid academic transcripts and certificates",
      "English proficiency score (IELTS/PTE/TOEFL as required)",
      "Proof of financial capability",
      "Statement of Purpose",
      "Valid passport"
    ],
    documents: [
      "Valid passport copies",
      "Academic transcripts and certificates",
      "IELTS/PTE/TOEFL scorecard",
      "Statement of Purpose (SOP)",
      "Letters of Recommendation (LORs)",
      "Financial statements and proof of funds",
      "University offer letter"
    ],
    faqs: [
      {
        question: "How long does a study visa application take?",
        answer: "Processing times vary by country and season — typically [X–X weeks]. We'll give you a realistic, country-specific timeline during your consultation."
      },
      {
        question: "Do I need IELTS for every country?",
        answer: "Most English-speaking destinations require an English proficiency test, though requirements vary by university and visa category."
      },
      {
        question: "Can Zeel Overseas help if my visa was previously refused?",
        answer: "Yes — we review the refusal reasons and rebuild your application to address the specific gaps before reapplying."
      },
      {
        question: "What documents do I need to get started?",
        answer: "A valid passport and academic transcripts are enough to begin your free consultation."
      }
    ]
  },
  {
    title: "Work Visa & Skilled Migration",
    slug: "work-visa",
    iconName: "Briefcase",
    shortDesc: "Job-seeker visas, work permits, and employer-sponsored pathways for skilled professionals.",
    longDesc: "Working abroad opens doors most professionals only dream of — but employer-sponsorship rules, skills assessments, and job-seeker visa criteria differ sharply from country to country. Zeel Overseas helps skilled workers understand which pathway actually fits their profile, then handles the paperwork end to end.",
    successRate: "99%",
    eligibility: [
      "Relevant work experience and qualifications in an in-demand occupation",
      "Skills assessment or credential recognition (where required)",
      "English/local language proficiency as applicable",
      "Valid passport and clean background check",
      "Proof of funds (for job-seeker visa categories)"
    ],
    documents: [
      "Valid passport",
      "Updated resume/CV",
      "Experience and reference letters",
      "Educational certificates",
      "Skills assessment report",
      "Offer letter (if employer-sponsored)",
      "Proof of funds"
    ],
    faqs: [
      {
        question: "What's the difference between a job-seeker visa and an employer-sponsored work visa?",
        answer: "A job-seeker visa lets you enter a country to search for work within a set period; an employer-sponsored visa is tied to a confirmed job offer. We'll assess which fits your current situation."
      },
      {
        question: "Do I need a skills assessment for every country?",
        answer: "Several countries require formal recognition of your qualifications before you can apply — we'll confirm this during your consultation."
      },
      {
        question: "Can Zeel Overseas help me find a job abroad?",
        answer: "We focus on visa and documentation guidance; for job-seeker visa categories, we help ensure your profile and paperwork meet the country's requirements so you can pursue opportunities once there."
      },
      {
        question: "How long does work visa processing take?",
        answer: "Timelines vary widely by country and visa category — we'll give you a realistic estimate specific to your case."
      }
    ]
  },
  {
    title: "Permanent Residency (PR)",
    slug: "permanent-residency",
    iconName: "ShieldCheck",
    shortDesc: "End-to-end PR application support for Canada, Australia, and other points-based immigration systems.",
    longDesc: "Permanent residency is a long-term commitment — and points-based systems like Canada's Express Entry or Australia's skilled migration streams reward applicants who present a precise, well-documented profile. Zeel Overseas helps you understand your real points/eligibility standing before you invest time and money into an application.",
    successRate: "99%",
    eligibility: [
      "Relevant work experience in a skilled occupation",
      "Recognized educational qualifications (ECA may be required)",
      "Minimum language proficiency score",
      "Age and adaptability factors (program-dependent)",
      "Valid passport and clean background/medical checks"
    ],
    documents: [
      "Valid passport",
      "ECA (Educational Credential Assessment) report",
      "Language test scorecard (IELTS/PTE/CELPIP)",
      "Experience and reference letters",
      "Educational certificates",
      "Police clearance certificate",
      "Medical exam records"
    ],
    faqs: [
      {
        question: "How many points do I need for Canada PR?",
        answer: "The required score changes with each draw. We'll calculate your current Comprehensive Ranking System (CRS) score and advise on ways to improve it."
      },
      {
        question: "Do I need a job offer for PR?",
        answer: "Not always — many points-based programs don't require a job offer, though having one can add points in some categories."
      },
      {
        question: "What's an ECA and do I need one?",
        answer: "An Educational Credential Assessment verifies your qualifications match the destination country's standards — required for most points-based programs."
      },
      {
        question: "How long does the PR process take?",
        answer: "Timelines depend on the specific program and current processing backlogs — we'll share realistic, up-to-date estimates during your consultation."
      }
    ]
  },
  {
    title: "Tourist & Visit Visa",
    slug: "tourist-visa",
    iconName: "Globe",
    shortDesc: "Fast, accurate documentation for family visits, holidays, and short-term travel visas.",
    longDesc: "Whether you're visiting family, planning a vacation, or traveling short-term for personal reasons, a clean, complete visa application makes all the difference. Zeel Overseas handles the documentation and filing so your travel plans stay on track.",
    successRate: "99%",
    eligibility: [
      "Valid passport with sufficient validity",
      "Proof of sufficient funds for the trip",
      "Return travel intent documentation (employment/property/family ties)",
      "Invitation letter (for family visits, where applicable)",
      "Clean travel history (no prior overstays/violations)"
    ],
    documents: [
      "Valid passport",
      "Recent photographs conforming to specifications",
      "Bank statements for proof of funds",
      "Invitation letter (if applicable)",
      "Detailed travel itinerary",
      "Employment or business proof",
      "Travel insurance policy"
    ],
    faqs: [
      {
        question: "How quickly can a tourist visa be processed?",
        answer: "Processing times vary by country and season — we'll give you a realistic estimate and help you plan around it."
      },
      {
        question: "Do I need an invitation letter to visit family abroad?",
        answer: "Many countries require or strongly recommend one for family visit visas — we'll guide you on the exact requirement for your destination."
      },
      {
        question: "What if my visa gets rejected?",
        answer: "We review the rejection reason and help you reapply with a stronger, corrected application."
      },
      {
        question: "Can Zeel Overseas help with visas for elderly parents or children?",
        answer: "Yes — we handle documentation for applicants of all ages, including dependent family members traveling together."
      }
    ]
  },
  {
    title: "Business Visa Support",
    slug: "business-visa",
    iconName: "Landmark",
    shortDesc: "Visa assistance for entrepreneurs and business travelers pursuing overseas opportunities.",
    longDesc: "Business travel comes with its own documentation rules — invitation letters, company registration proofs, and purpose-of-visit justifications that differ from tourist applications. Zeel Overseas helps entrepreneurs and business professionals put together a clean, credible application for meetings, conferences, and exploratory business trips abroad.",
    successRate: "99%",
    eligibility: [
      "Valid passport with sufficient validity",
      "Proof of business ownership/employment (company registration, ID card, or employment letter)",
      "Business invitation letter from the host company/organization (where required)",
      "Proof of financial standing (personal or company)",
      "Clear travel purpose documentation"
    ],
    documents: [
      "Valid passport",
      "Business invitation letter",
      "Company registration documents",
      "Personal & company bank statements",
      "Employment or business ownership proof",
      "Detailed travel itinerary"
    ],
    faqs: [
      {
        question: "What's the difference between a business visa and a work visa?",
        answer: "A business visa covers short-term activities like meetings, conferences, or exploring opportunities — it doesn't authorize taking up employment abroad, unlike a work visa."
      },
      {
        question: "Do I need a formal invitation letter?",
        answer: "Most business visa categories require one from the host company — we'll guide you on the exact format required."
      },
      {
        question: "Can a first-time business traveler apply?",
        answer: "Yes — we help first-time applicants build a credible file even without a long travel history."
      },
      {
        question: "How long is a business visa typically valid for?",
        answer: "Validity and permitted stay duration vary by country — we'll confirm the specifics for your target destination during consultation."
      }
    ]
  },
  {
    title: "Visa Documentation & Embassy Audit",
    slug: "documentation-audit",
    iconName: "FileText",
    shortDesc: "Complete document preparation, verification, and embassy-ready file audits for any visa category.",
    longDesc: "Most visa rejections come down to documentation gaps — a missing financial proof, an inconsistent SOP, an incomplete form. Whether you're applying independently or through another consultant, Zeel Overseas offers a standalone documentation and embassy-audit service to catch issues before they cost you your application.",
    successRate: "99%",
    eligibility: [
      "Open to any applicant — whether self-filing or working with another consultant",
      "Applicable to study, work, PR, tourist, or business visa categories"
    ],
    documents: [
      "Valid passport",
      "Completed visa application form",
      "Statement of Purpose (SOP) and Letters of Recommendation (LORs)",
      "Financial proof and sponsorship documents",
      "Supporting certificates specific to the visa type"
    ],
    faqs: [
      {
        question: "Can I use this service if I'm already working with another consultant?",
        answer: "Yes — this is a standalone review service; we can audit documentation prepared elsewhere."
      },
      {
        question: "What's the most common reason visas get rejected?",
        answer: "Inconsistent or incomplete financial documentation and weak SOPs are among the most frequent issues we catch during audits."
      },
      {
        question: "How long does a documentation audit take?",
        answer: "Typically a few business days, depending on visa category and document volume — we'll confirm a timeline once we review your file."
      },
      {
        question: "Do you also file the application after the audit?",
        answer: "Yes, filing support is available as an add-on once your documentation is embassy-ready."
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
    tagline: "Study permits, Express Entry profiles, and work permits.",
    description: "Canada remains a top choice for students and skilled workers thanks to its points-based PR pathways and post-study work opportunities. We help with study permits, Express Entry profiles, and work permit applications."
  },
  {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    skylineImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "Student visas, skilled migration, and points-based PR pathways.",
    description: "From globally ranked universities to skilled migration visas, Australia offers strong long-term settlement options. We guide student visa, skilled migration, and PR applications tailored to Australia's points test."
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    skylineImage: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "Graduate routes, student permits, and skilled worker sponsorship.",
    description: "The UK's Graduate Route and skilled worker visa make it attractive for students and professionals alike. We handle student visa documentation, Certificate of Sponsorship requirements, and dependent visa guidance."
  },
  {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    skylineImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "Opportunity Card, job-seeker visas, and Blue Card pathways.",
    description: "Germany's Opportunity Card and strong demand for skilled engineers, IT professionals, and tradespeople make it a growing destination. We assist with job-seeker visas, Blue Card applications, and credential recognition."
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    skylineImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "F-1 student visas and H-1B work visa documentation.",
    description: "For students pursuing F-1 visas or professionals exploring H-1B/work-based pathways, we help build strong, well-documented applications suited to US visa scrutiny."
  },
  {
    name: "New Zealand",
    code: "NZ",
    flag: "🇳🇿",
    skylineImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600&h=400",
    tagline: "Student permit and skilled migrant category applications.",
    description: "A welcoming destination for students and skilled migrants, with clear pathways from study to residency. We support student visa and skilled migrant category applications."
  }
];

export const milestonesData: Milestone[] = [
  {
    year: "[Year]",
    title: "Zeel Overseas founded in Gandhinagar",
    description: "Starting our journey to offer honest, direct immigration counseling and visa support to students and skilled workers across Gujarat."
  },
  {
    year: "[Year]",
    title: "Reached [X] Successful Visa Approvals",
    description: "A key milestone demonstrating our rigorous documentation quality control, resulting in an exceptionally high approval rate."
  },
  {
    year: "[Year]",
    title: "Expanded service portfolios to include PR & Work Visas",
    description: "Adding Express Entry and Skilled Migration streams to support professionals and families seeking permanent resettlement options."
  },
  {
    year: "[Year]",
    title: "Office Expansion & Partnerships",
    description: "Expanding our headquarters to handle more complex cases, including document audits for previously rejected files."
  }
];

export const processStepsData: ProcessStep[] = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Discuss your goals and timeline during a completely free initial consultation with zero obligations."
  },
  {
    number: "02",
    title: "Profile Assessment & Documentation",
    description: "We review your academic/professional details to design a personalized pathway and provide a clear document checklist."
  },
  {
    number: "03",
    title: "Application Filing",
    description: "We prepare, verify, and audit every single document to embassy standard before submitting the file."
  },
  {
    number: "04",
    title: "Interview Preparation",
    description: "Receive mock interview training and guidance customized to the specific scrutiny parameters of your destination country."
  },
  {
    number: "05",
    title: "Visa Approval",
    description: "Get your passport back stamped with your visa and prepare to embark on your global journey."
  },
  {
    number: "06",
    title: "Pre-Departure Support",
    description: "Briefings on currency exchange, international banking, accommodation, and essential tips for your transition abroad."
  }
];
