import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Success Stories | Zeel Overseas Visa Consultancy",
  description: "Real stories from Zeel Overseas clients who successfully secured study, work, and PR visas with our guidance.",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
