import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Success Stories | Zeel Overseas Immigration Consultants",
  description: "Read real success stories from students and professionals who achieved their visa approval with Zeel Overseas' immigration and visa consultancy services.",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
