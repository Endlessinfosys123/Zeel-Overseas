import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Zeel Overseas | Book a Free Visa Consultation",
  description: "Get in touch with Zeel Overseas for expert visa and immigration advice. Book a free consultation online or visit our Ahmedabad office.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
