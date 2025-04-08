import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs"; // Make sure useUser is imported
import { Message } from "ai";
import { useChat } from "ai/react";
import { Bot, SendHorizonal, Trash, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react"; // Added useState, useCallback
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

// Define a constant for the storage key prefix
const CHAT_STORAGE_PREFIX = "aiChatHistory_";

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const { user } = useUser(); // Get user info for userId
  const userId = user?.id;

  // State to hold initial messages loaded from storage
  const [initialMessages, setInitialMessages] = useState<Message[] | undefined>(
    undefined
  );
  // State to track if initial load is done (prevents race conditions)
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate storage key based on userId
  const storageKey = userId ? `${CHAT_STORAGE_PREFIX}${userId}` : null;

  // Effect to load messages from localStorage ONCE when userId is available
  useEffect(() => {
    if (userId && !isLoaded && typeof window !== "undefined") {
      // Ensure userId exists and runs client-side only
      const storedMessages = localStorage.getItem(storageKey!); // Use non-null assertion as we checked userId
      if (storedMessages) {
        try {
          setInitialMessages(JSON.parse(storedMessages));
        } catch (error) {
          console.error("Failed to parse stored chat messages:", error);
          localStorage.removeItem(storageKey!); // Clear corrupted data
        }
      }
      setIsLoaded(true);
    }
  }, [userId, isLoaded, storageKey]); // Depend on userId and isLoaded

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
    // Pass initialMessages only when they are loaded from storage
    // Important: useChat should only initialize *once* with these.
    // If initialMessages changes AFTER useChat is hooked, it won't re-initialize.
    // The key prop on the container might be needed if userId changes dynamically
    // but for typical login flows, this useEffect approach should work.
  } = useChat({
    // Only provide initialMessages when they've been loaded and the hook hasn't run yet
    // Note: The hook itself runs early. A better approach might be needed if
    // initialMessages load significantly after the hook initializes.
    // Let's handle setting messages *after* the hook initializes if needed.
    // initialMessages: initialMessages, // Pass initial state here
    // Let's try setting messages AFTER load instead:
    api: "/api/chat", // Explicitly set the API endpoint if needed
  });

  // Effect to set messages AFTER initial load if needed
  // This runs if useChat initialized before initialMessages were ready
  useEffect(() => {
    if (isLoaded && initialMessages && messages.length === 0) {
      setMessages(initialMessages);
    }
    // We only want to do this once after initial load if messages are empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, initialMessages, setMessages]); // Only run when loaded status or initialMessages change

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Effect to SAVE messages to localStorage whenever they change
  useEffect(() => {
    // Only save if loading is done, there's a storage key, and runs client-side
    if (
      isLoaded &&
      storageKey &&
      typeof window !== "undefined" &&
      messages.length > 0
    ) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat messages to localStorage:", error);
        // Handle potential storage limit errors if necessary
      }
    } else if (isLoaded && storageKey && messages.length === 0) {
      // If messages array becomes empty (e.g., after clearing), remove from storage
      localStorage.removeItem(storageKey);
    }
  }, [messages, storageKey, isLoaded]); // Depend on messages array and storageKey

  // --- Clear Chat Handler ---
  const handleClearChat = useCallback(() => {
    setMessages([]); // Clear state in useChat
    if (storageKey && typeof window !== "undefined") {
      localStorage.removeItem(storageKey); // Clear localStorage
    }
  }, [setMessages, storageKey]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  // Render null or a loading indicator until userId is available and initial load is attempted
  if (!isLoaded && !userId) {
    // Optional: You could show a spinner or just render nothing
    // return null; // Or a loading indicator component
    // Or allow rendering but localStorage features won't work yet
  }

  return (
    <div
      // Conditionally add a key prop if you need to force re-initialization of useChat
      // when the userId changes drastically (e.g., user logs out and logs in as someone else
      // without a full page reload). Usually not needed for SPA navigation persistence.
      // key={userId || 'no-user'}
      className={cn(
        // ... (rest of your className setup remains the same)
        "fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-lg rounded-xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-gray-100 shadow-xl transition-all duration-300 ease-in-out",
        open
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      )}
    >
      {/* Chatbox Structure */}
      <div className="flex h-[600px] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-200/90 bg-white/50 rounded-t-xl">
          {/* ... (header content) */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full">
              <Sparkles className="h-4 w-4 text-green-700" />{" "}
              {/* AI Indicator Icon */}
            </div>
            <h3 className="font-semibold text-sm text-slate-700">
              AI Assistant
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              title="Clear chat"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100"
              type="button"
              // Use the new handler
              onClick={handleClearChat}
              // Disable if no messages or if loading initial messages
              disabled={messages.length === 0 || !isLoaded}
            >
              <Trash size={16} />
            </Button>
            {/* ... (close button) */}
            <Button
              title="Close chat"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100"
              onClick={onClose}
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Message Area */}
        <div
          className="flex-grow overflow-y-auto p-4 space-y-4"
          ref={scrollRef}
        >
          {/* Render only after initial load attempt is done */}
          {isLoaded &&
            messages.map((message) => (
              <ChatMessage message={message} key={message.id} />
            ))}

          {/* Loading State */}
          {isLoaded && isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{ role: "assistant", content: "Thinking..." }}
              isLoading={true}
            />
          )}

          {/* Error State */}
          {isLoaded && error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
              }}
              isError={true}
            />
          )}

          {/* Empty State - Show only if loaded and no messages/error/loading */}
          {isLoaded && !error && messages.length === 0 && !isLoading && (
            // ... (your empty state JSX)
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 px-6">
              <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-4">
                <Bot size={32} className="text-slate-600" />
              </div>
              <p className="font-medium text-slate-600">Ready to assist!</p>
              <p className="text-sm">
                Ask me anything about your notes, or start a new conversation.
              </p>
            </div>
          )}
          {/* Optional: Show loading indicator before initial load */}
          {!isLoaded && (
            <div className="flex h-full items-center justify-center text-slate-500">
              Loading chat...
            </div>
          )}
        </div>

        {/* Input Form Area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-slate-200/90 p-3 bg-white/50 rounded-b-xl"
        >
          {/* ... (input and send button - disable input if not loaded?) */}
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
            ref={inputRef}
            className="flex-grow rounded-full border-slate-300 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-green-400 focus:ring-offset-0 focus:border-transparent px-4 h-10"
            // Disable input while initial messages are loading or during AI response
            disabled={isLoading || !isLoaded}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shrink-0 disabled:opacity-70 h-10 w-10"
            // Disable if loading, input empty, or initial load not done
            disabled={isLoading || !input.trim() || !isLoaded}
            title="Send message"
          >
            <SendHorizonal size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}

// --- ChatMessage Component ---

interface ChatMessageProps {
  message: Pick<Message, "role" | "content">;
  isLoading?: boolean;
  isError?: boolean;
}

function ChatMessage({
  message: { role, content },
  isLoading,
  isError,
}: ChatMessageProps) {
  const { user } = useUser();
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isAiMessage ? "justify-start" : "justify-end"
      )}
    >
      {/* AI Icon */}
      {isAiMessage && (
        <div className="shrink-0 self-start p-1.5 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full">
          <Bot size={18} className="text-slate-600" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-line rounded-xl px-3.5 py-2 shadow-sm",
          isAiMessage
            ? "bg-slate-100 text-slate-800 rounded-bl-none"
            : "bg-blue-500 text-white rounded-br-none",
          isLoading && "animate-pulse text-slate-500",
          isError && "bg-red-100 text-red-700 border border-red-200"
        )}
      >
        {content}
      </div>

      {/* User Avatar */}
      {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="My Avatar"
          width={32} // Slightly smaller avatar
          height={32}
          className="h-8 w-8 rounded-full object-cover shrink-0 border border-slate-200"
        />
      )}
    </div>
  );
}
