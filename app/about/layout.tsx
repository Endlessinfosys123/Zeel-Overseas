import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Zeel Overseas | Immigration Consultants in Gandhinagar",
  description: "Learn about Zeel Overseas — Gandhinagar's immigration and visa consultancy built on transparent guidance, complete documentation support, and genuine student and client success.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
