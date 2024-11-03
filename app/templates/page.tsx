"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { PrivateNavbar } from "../components/PrivateNavbar";
import { AppSidebar } from "../components/Sidebar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Code, Languages, LetterText, Mail, Network, Newspaper, Pencil, SquareChartGantt, TextSelect } from "lucide-react";
const MAX_PART_LENGTH = 280;

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const templates = [
    {
        id: 1,
        title: "Blog article",
        description: "Generate a blog article for any topics",
        icon: <Newspaper />
    },
    {
        id: 2,
        title: "Product description writing",
        description: "Generate compelling and persuasive product descriptions",
        icon: <SquareChartGantt />
    },
    {
        id: 3,
        title: "Social Media Post",
        description: " Craft catchy and shareable social media posts for various platforms",
        icon: <Network />
    },
    {
        id: 4,
        title: "Creative Writing (Poetry, Short Stories)",
        description: "Explore your creative side by generating different forms of creative writing",
        icon: <Pencil />
    },
    {
        id: 5,
        title: "Email Generation",
        description: "Compose professional and personalized emails for various purposes",
        icon: <Mail />
    },
    {
        id: 6,
        title: "Code Generation",
        description: "Generate code snippets in various programming languages",
        icon: <Code />
    },
    {
        id: 7,
        title: "Summarization",
        description: "Condense lengthy texts into concise and informative summaries, extracting the key information quickly",
        icon: <LetterText />
    },
    {
        id: 8,
        title: "Translation",
        description: "Translate text between different languages",
        icon: <Languages />
    },
    {
        id: 9,
        title: "Paraphrasing",
        description: "Rephrase existing text while maintaining the original meaning",
        icon: <TextSelect />
    },

]

export default function Roadmap() {
    const [prompt, setPrompt] = useState('');

    return (
        <div>
            <PrivateNavbar />
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <div className="flex flex-col px-4 mb-8 sm:px-6 lg:px-8 py-8 w-full">
                    <h2 className="text-2xl font-bold">All templates</h2>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {templates.map(template => {
                            return (
                                <Card className="p-4 cursor-pointer flex flex-row gap-4"
                                    key={template.id.toString()}>
                                    <div>
                                        {template.icon}
                                    </div>
                                    <div>
                                        <CardTitle>
                                            {template.title}
                                        </CardTitle>
                                        <CardDescription>{template.description}</CardDescription>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </SidebarProvider>

        </div>
    )
}