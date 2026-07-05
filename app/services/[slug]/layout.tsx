import { Metadata } from "next";
import { servicesData } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  const title = service 
    ? `${service.title} Consultant in Ahmedabad | Zeel Overseas` 
    : "Immigration & Visa Consultants | Zeel Overseas";
  const description = service 
    ? `Expert ${service.title.toLowerCase()} guidance from Zeel Overseas — eligibility assessment, documentation support, and end-to-end application assistance in Ahmedabad.`
    : "Expert immigration and visa guidance from Zeel Overseas Ahmedabad.";

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
