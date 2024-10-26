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

// Menu items.
const items = [
  {
    title: "Social Post and Ads",
    url: "/generate",
    icon: Network,
  },
  {
    title: "Startup Ideas",
    url: "#",
    icon: Lightbulb,
  },
  {
    title: "Startup Roadmap",
    url: "#",
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
    title: "Marketing Videos Generation",
    url: "#",
    icon: Video,
  },
  {
    title: "Blog Article",
    url: "#",
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
        <Button className="max-w-[150px] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors">
          Upgrade your plan
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
