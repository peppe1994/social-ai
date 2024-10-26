"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/Sidebar";
import { PrivateNavbar } from "../components/PrivateNavbar";
import { Chat } from "../components/chat/Chat";
import { useEffect, useRef, useState } from "react";
import { Message } from "../types";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI!.getGenerativeModel({ model: "gemini-1.5-pro" });

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async (message: Message) => {
        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);

        const partsMessages = updatedMessages.map(mes => mes.content).join(',')

        setLoading(true);
        const parts: (string | Part)[] = [partsMessages];
        const result = await model.generateContent(parts);
        const data = result.response.text();

        if (!data) {
          return;
        }

        setLoading(false);
        setMessages([...updatedMessages, {role:'assistant', content: data}]);

    }

    const handleReset = () => {
        setMessages([
            {
                role: "assistant",
                content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
            }
        ]);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
            }
        ]);
    }, []);

    return (
        <div>
            <PrivateNavbar />
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <div className="flex flex-row px-4 mb-8 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-2xl font-bold">Marketing Expert Chatbot</h2>
                    <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
                        <Chat
                            messages={messages}
                            loading={loading}
                            onSend={handleSend}
                            onReset={handleReset}
                        />
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}