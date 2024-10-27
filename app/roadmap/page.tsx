"use client";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { PrivateNavbar } from "../components/PrivateNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/Sidebar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
const MAX_PART_LENGTH = 280;

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default function Roadmap() {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string[]>([]);

    const handleGenerate = async () => {
        setIsLoading(true);

        try {
            const model = genAI!.getGenerativeModel({ model: "gemini-1.5-pro" });
            let promptText = `Generate a roadmap about "${prompt}". Provide a thread of 5 parts, each under 280 characters.`;
            const parts: (string | Part)[] = [promptText];
            const result = await model.generateContent(parts);
            const generatedText = result.response.text();

            let content: string[] = generatedText
                .split("\n\n")
                .filter((part) => part.trim() !== "");

            setGeneratedContent(content);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div>
            <PrivateNavbar />
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <div className="flex flex-col px-4 mb-8 sm:px-6 lg:px-8 py-8 w-full">
                    <h2 className="text-2xl font-bold">Roadmap Generation</h2>
                    <div className="bg-zinc-800 mt-6 p-6 rounded-2xl space-y-6">
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Write what you want to achieve, and I'll help you build a roadmap to get there
                        </label>
                        <Input
                            id="prompt"
                            placeholder="Enter your goal here..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-zinc-700 border-none rounded-xl resize-none"
                        />
                        <Button
                            onClick={handleGenerate}
                            disabled={!prompt || isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                `Generate Content`
                            )}
                        </Button>
                    </div>
                    {/* Generated content display */}
                    {(generatedContent?.length > 0) && (
                        <div className="bg-zinc-800 mt-6 p-6 rounded-2xl space-y-6">
                            <h2 className="text-2xl font-semibold">
                                Generated Roadmap
                            </h2>
                            <div className="space-y-4">
                                {(generatedContent).map((part, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-700 p-4 rounded-xl relative">
                                        <ReactMarkdown className="prose prose-invert max-w-none mb-2 text-sm">
                                            {part}
                                        </ReactMarkdown>
                                        <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
                                            <span>
                                                {part.length}/{MAX_PART_LENGTH}
                                            </span>
                                            <Button
                                                onClick={() => copyToClipboard(part)}
                                                className="bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SidebarProvider>

        </div>
    )
}