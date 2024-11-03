import { Calendar, Clapperboard, Code, Inbox, Lightbulb, Map, MessageCircle, Network, Newspaper, Search, Settings, Video, Zap } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Social Post and Ads",
    url: "/generate",
    icon: Network,
  },
  {
    title: "Startup Roadmap",
    url: "/roadmap",
    icon: Map,
  },
  {
    title: "Marketing Expert Chatbot",
    url: "/chatbot",
    icon: MessageCircle,
  },
  {
    title: "Landing Pages Generation",
    url: "#",
    icon: Code,
  },
  {
    title: "All templates",
    url: "/templates",
    icon: Newspaper,
  },
  {
    title: "Startup Guides and Courses",
    url: "#",
    icon: Clapperboard,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 mb-10">
            <div className='flex items-center gap-3'>
              <Zap className='w-8 h-8 text-blue-500' />
              <span className='text-xl sm:text-2xl font-bold'>Social AI</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="items-center pb-4">
        <Link href={'/pricing'} className="max-w-[150px] p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          Upgrade Plan
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
