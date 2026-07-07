import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Zeel Overseas | Book a Free Visa Consultation in Ahmedabad",
  description: "Get in touch with Zeel Overseas for expert immigration and visa consultancy in Ahmedabad. Book your free consultation today — call, WhatsApp, or visit our office.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
