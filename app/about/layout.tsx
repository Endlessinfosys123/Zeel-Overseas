import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Zeel Overseas | Immigration & Visa Consultancy, Ahmedabad",
  description: "Learn about Zeel Overseas, Ahmedabad's trusted immigration and visa consultancy — our mission, values, and the team helping clients build their future abroad.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
