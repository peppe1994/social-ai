"use-client";

import { Message } from "@/app/types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`flex items-center ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-blue-500 text-white"} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        <ReactMarkdown className='flex flex-col items-start'>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
};