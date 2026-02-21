import { ReactNode } from "react";
import SidebarLayout from "../components/page";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
