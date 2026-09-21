import Document from "@/components/layout/Document";
export { metadata } from "@/components/layout/Document";

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="ja">{children}</Document>;
}
