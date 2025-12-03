import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './ui/Loader';
import type { PerformanceMetrics, Message } from '../types';
import { Textarea } from './ui/Textarea';

interface OutputPanelProps {
  title: string;
  copyType: string;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  performance: PerformanceMetrics | null;
  onContinueChat?: (e: React.FormEvent) => Promise<void>;
  chatInput?: string;
  setChatInput?: React.Dispatch<React.SetStateAction<string>>;
}

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ModelIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25c.41 0 .75.34.75.75v3c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75Zm0 15c-.41 0-.75.34-.75.75v3c0 .41.34.75.75.75s.75-.34.75-.75v-3c0-.41-.34-.75-.75-.75ZM5.25 12c0 .41-.34.75-.75.75h-3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75Zm15 0c0 .41-.34.75-.75.75h-3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75ZM17.6 7.4a.75.75 0 0 0 -1.06-1.06l-2.12 2.12a.75.75 0 0 0 1.06 1.06l2.12-2.12ZM8.46 16.54a.75.75 0 0 0 -1.06-1.06L5.28 17.6a.75.75 0 0 0 1.06 1.06l2.12-2.12ZM17.6 17.6a.75.75 0 0 0 -1.06-1.06l-2.12 2.12a.75.75 0 1 0 1.06 1.06l2.12-2.12ZM8.46 8.46a.75.75 0 0 0 -1.06-1.06L5.28 9.52a.75.75 0 0 0 1.06 1.06l2.12-2.12Z"/>
    </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const SaveIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const MessageBubble: React.FC<{ message: Message; onSave: () => void; }> = ({ message, onSave }) => {
  const isModel = message.role === 'model';
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy'), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        setCopyStatus('Failed');
        setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  };

  return (
    <div className={`flex items-start gap-4 my-4 ${isModel ? '' : 'justify-end'}`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isModel ? 'bg-primary-light text-white' : 'bg-gray-200 text-gray-600'}`}>
        {isModel ? <ModelIcon /> : <UserIcon />}
      </div>
      <div className={`relative rounded-xl p-4 max-w-2xl ${isModel ? 'bg-white shadow-sm border' : 'bg-primary text-white'}`}>
        <pre className="whitespace-pre-wrap font-sans text-base">{message.content}</pre>
        {isModel && (
           <div className="absolute -bottom-4 right-2 flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs bg-white text-gray-500 hover:text-primary px-2 py-1 rounded-full shadow border transition-colors"
                aria-label="Copy message to clipboard"
            >
                <CopyIcon className="h-4 w-4" />
                {copyStatus}
            </button>
            <button
                onClick={onSave}
                className="flex items-center gap-1 text-xs bg-white text-gray-500 hover:text-primary px-2 py-1 rounded-full shadow border transition-colors"
                aria-label="Save conversation as a text file"
            >
                 <SaveIcon className="h-4 w-4" />
                Save
            </button>
           </div>
        )}
      </div>
    </div>
  );
};

export const OutputPanel: React.FC<OutputPanelProps> = ({
  title,
  copyType,
  messages,
  isLoading,
  error,
  performance,
  onContinueChat,
  chatInput,
  setChatInput,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
      chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
    }
  }, [chatInput]);
  
  const handleSaveConversation = () => {
    if (!messages.length) return;

    const fileContent = messages.map(msg => {
      const role = msg.role.charAt(0).toUpperCase() + msg.role.slice(1);
      return `${role}:\n${msg.content}`;
    }).join('\n\n----------------------------------------\n\n');

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const safeTitle = title.replace(/\s+/g, '-').toLowerCase();
    const safeCopyType = copyType.replace(/\s+/g, '-').toLowerCase();
    link.download = `gemini-chat-${safeCopyType}-${safeTitle}.txt`;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && onContinueChat && chatInput?.trim()) {
      e.preventDefault();
      onContinueChat(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="bg-surface rounded-xl shadow-lg border border-gray-200 flex flex-col h-[calc(100vh-140px)]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} onSave={handleSaveConversation} />
        ))}

        {isLoading && messages.length > 0 && (
          <div className="flex items-start gap-4 my-4">
             <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-primary-light text-white">
                <ModelIcon />
            </div>
             <div className="rounded-xl p-4 bg-white shadow-sm border">
                <Loader />
             </div>
          </div>
        )}

        {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}

        <div ref={messagesEndRef} />
      </div>

      {onContinueChat && setChatInput && (
         <div className="p-4 border-t bg-white rounded-b-xl">
           <form onSubmit={onContinueChat} className="flex items-start gap-2">
            <Textarea
              ref={chatInputRef}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up or give instructions..."
              className="flex-1 resize-none max-h-40"
              rows={1}
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
                type="submit"
                disabled={isLoading || !chatInput?.trim()}
                className="py-2 px-4 bg-primary hover:bg-primary-light text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                aria-label="Send message"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
           </form>
            {performance && (
                <p className="text-xs text-text-secondary mt-2 text-right">
                    Response generated in {performance.generationTime}s
                </p>
            )}
         </div>
      )}
    </div>
  );
};