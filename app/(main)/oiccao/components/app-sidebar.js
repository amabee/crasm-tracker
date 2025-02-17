"use client";

import React from "react";
import { Frame, PersonStanding, PieChart } from "lucide-react";

import { MdOutlinePeople } from "react-icons/md";

import { NavUser } from "./nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItems } from "./nav-items";

const data = {
  projects: [
    { name: "Overview", url: "/oiccao", icon: Frame },
    { name: "Applications", url: "/oiccao/applications", icon: PieChart },
  ],
};

export function AppSidebar({ props, userData }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-center w-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/25/Philippine_Statistics_Authority.svg"
            alt="PSA Logo"
            loading="eager"
            className="w-auto h-auto max-w-full max-h-[100px] object-contain"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavItems projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
