import React, { useState, useCallback, useRef } from 'react';
import type { Chat } from '@google/genai';
import { ControlsPanel } from './components/ControlsPanel';
import { OutputPanel } from './components/OutputPanel';
import { Header } from './components/Header';
import { startChat, sendMessage, buildUserMessage } from './services/geminiService';
import type { GenerateOptions, PerformanceMetrics, Message } from './types';
import { CopyType } from './types';

const initialGenerationOptions: GenerateOptions = {
  copyType: CopyType.PRODUCT_DESCRIPTION,
  productName: 'SmartHome Hub',
  targetAudience: 'Tech-savvy homeowners',
  features: '- Voice-activated controls\n- Integrates with 200+ smart devices\n- Energy-saving scheduling',
  tone: 'Persuasive',
  length: 'Medium',
  creativity: 0.7,
};

const App: React.FC = () => {
  const [generationOptions, setGenerationOptions] = useState<GenerateOptions>(initialGenerationOptions);
  const [view, setView] = useState<'customization' | 'conversation'>('customization');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [chatInput, setChatInput] = useState('');

  const chatRef = useRef<Chat | null>(null);
  const lastCopyTypeRef = useRef<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPerformanceMetrics(null);

    const startTime = window.performance.now();

    try {
      // Start a new chat if the copy type has changed or chat doesn't exist
      if (!chatRef.current || lastCopyTypeRef.current !== generationOptions.copyType) {
        chatRef.current = startChat(generationOptions);
        lastCopyTypeRef.current = generationOptions.copyType;
        setMessages([]); // Clear history when context changes
      }

      const userMessageContent = buildUserMessage(generationOptions);

      // Add a simplified user message to the chat history for display
      setMessages(prev => [...prev, {
        role: 'user',
        content: `Generate a ${generationOptions.length} ${generationOptions.copyType} for "${generationOptions.productName}" with a ${generationOptions.tone} tone.`,
      }]);

      if (!chatRef.current) {
        throw new Error("Chat is not initialized.");
      }

      const result = await sendMessage(chatRef.current, userMessageContent);

      setMessages(prev => [...prev, {
        role: 'model',
        content: result,
      }]);

      if (view === 'customization') {
        setView('conversation');
      }
      
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate content: ${err.message}. Please check your API key and network connection.`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      const endTime = window.performance.now();
      setPerformanceMetrics({
        generationTime: ((endTime - startTime) / 1000).toFixed(2),
      });
      setIsLoading(false);
    }
  }, [generationOptions, view]);

  const handleContinueChat = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!chatInput.trim() || isLoading || !chatRef.current) return;

    const userMessage = chatInput;
    setChatInput(''); // Clear input after sending
    setIsLoading(true);
    setError(null);
    setPerformanceMetrics(null);
    const startTime = window.performance.now();

    // Add user message to UI
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
    }]);

    try {
      if (!chatRef.current) {
        throw new Error("Chat is not initialized.");
      }

      const result = await sendMessage(chatRef.current, userMessage);

      setMessages(prev => [...prev, {
        role: 'model',
        content: result,
      }]);

    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to send message: ${err.message}. Please check your API key and network connection.`);
      } else {
        setError('An unknown error occurred.');
      }
      // Re-add the failed message to the input box for editing
      setChatInput(userMessage);
    } finally {
      const endTime = window.performance.now();
      setPerformanceMetrics({
        generationTime: ((endTime - startTime) / 1000).toFixed(2),
      });
      setIsLoading(false);
    }
  }, [chatInput, isLoading]);


  const handleStartNew = useCallback(() => {
    setMessages([]);
    setError(null);
    setPerformanceMetrics(null);
    chatRef.current = null;
    lastCopyTypeRef.current = null;
    setGenerationOptions(initialGenerationOptions);
    setView('customization');
    setChatInput('');
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <Header onStartNew={view === 'conversation' ? handleStartNew : undefined} />
      <main className="container mx-auto p-4 lg:p-8">
        {view === 'customization' ? (
           <div className="max-w-2xl mx-auto">
             <ControlsPanel
                options={generationOptions}
                setOptions={setGenerationOptions}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
           </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <OutputPanel
              title={generationOptions.productName}
              copyType={generationOptions.copyType}
              messages={messages}
              isLoading={isLoading}
              error={error}
              performance={performanceMetrics}
              onContinueChat={handleContinueChat}
              chatInput={chatInput}
              setChatInput={setChatInput}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;