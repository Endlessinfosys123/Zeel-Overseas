import { Metadata } from "next";
import { servicesData } from "@/lib/data";

interface Props {
  params: { slug: string };
}

const metaMap: Record<string, { title: string; description: string }> = {
  "study-visa": {
    title: "Study Visa Consultants in Gandhinagar | Zeel Overseas",
    description: "Get expert study visa guidance from Zeel Overseas — university shortlisting, documentation, and visa filing support for Canada, UK, Australia, Germany, USA & more."
  },
  "work-visa": {
    title: "Work Visa Consultants in Gandhinagar | Zeel Overseas",
    description: "Zeel Overseas helps skilled professionals secure work permits and job-seeker visas for Canada, Germany, Australia, UK & more — complete documentation and employer-sponsorship guidance."
  },
  "permanent-residency": {
    title: "PR Visa Consultants in Gandhinagar | Zeel Overseas",
    description: "Zeel Overseas guides applicants through Canada, Australia & other points-based PR systems — eligibility assessment, documentation, and complete application support."
  },
  "tourist-visa": {
    title: "Tourist Visa Assistance in Gandhinagar | Zeel Overseas",
    description: "Fast, accurate tourist and visit visa documentation support from Zeel Overseas — for family visits, vacations, and short-term international travel."
  },
  "business-visa": {
    title: "Business Visa Consultants in Gandhinagar | Zeel Overseas",
    description: "Zeel Overseas supports entrepreneurs and business travelers with visa documentation for conferences, meetings, and overseas business opportunities."
  },
  "documentation-audit": {
    title: "Visa Documentation & Embassy Audit Services | Zeel Overseas",
    description: "Zeel Overseas offers complete visa documentation preparation and embassy-ready file audits for any visa category — reduce rejection risk with expert review."
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = metaMap[params.slug];
  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
    };
  }

  const service = servicesData.find((s) => s.slug === params.slug);
  const title = service 
    ? `${service.title} Consultant in Gandhinagar | Zeel Overseas` 
    : "Immigration & Visa Consultants | Zeel Overseas";
  const description = service 
    ? `Expert ${service.title.toLowerCase()} guidance from Zeel Overseas — eligibility assessment, documentation support, and end-to-end application assistance in Gandhinagar.`
    : "Expert immigration and visa guidance from Zeel Overseas Gandhinagar.";

  return {
    title,
    description,
  };
}

export default function ServiceDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
