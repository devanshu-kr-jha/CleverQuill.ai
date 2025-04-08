import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Image as ImageIcon,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const appScreenshot = "/app-screen.png";
const logoImage = "/feather.png";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800 font-sans">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-lg bg-white/80 border-b border-gray-200/80">
        <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <div className="w-6 h-6 relative">
              <Image
                src={logoImage}
                alt="CleverQuill Logo"
                fill
                className="object-contain"
              />
            </div>
            <span>CleverQuill</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5">
                Get Started
              </Button>
            </Link>
          </nav>
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              >
                Start
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 pb-14 md:pt-48 md:pb-26 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/60 rounded-full filter blur-[150px] opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200/60 rounded-full filter blur-[120px] opacity-50 animate-pulse-slower"></div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 pb-2">
              Where Your Ideas
            </span>
            <span className="block text-gray-900">Meet Intelligence.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            CleverQuill is the AI-powered notebook that understands your
            context. Capture, refine, and interact with your notes effortlessly,
            minimizing cognitive load.
          </p>

          <div className="mt-8 h-8 md:h-10 text-lg md:text-xl text-emerald-600">
            <span>
              <TypewriterTitle />
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href={"/dashboard"}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-10 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Visual Element */}
          <div className="mt-16 md:mt-24 relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-3/4 h-1/2 mx-auto bg-gradient-to-tr from-emerald-200/80 to-blue-200/80 rounded-full filter blur-[80px] opacity-60"></div>
            <Image
              src={appScreenshot}
              alt="CleverQuill AI Note Taking App Interface"
              width={1000}
              height={563}
              className="relative z-10 rounded-lg shadow-xl border border-gray-200/80 mx-auto transition duration-500 hover:scale-[1.02]"
              priority
            />
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-900">
              Work Smarter, Not Harder
            </h2>
            <p className="text-lg text-gray-600">
              CleverQuill integrates AI seamlessly, so you can focus on your
              thoughts, not the tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Feature 1: Intelligent Editor */}
            <div className="p-6 bg-slate-50/70 border border-gray-200/70 rounded-lg shadow-md transition-all duration-300 hover:border-emerald-400/60 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 mb-5">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Intelligent Editor
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Go beyond basic notes. Get AI-powered autocomplete based on your
                note's context and title, helping you write faster and overcome
                blocks.
              </p>
            </div>

            {/* Feature 2: Contextual AI Chat */}
            <div className="p-6 bg-slate-50/70 border border-gray-200/70 rounded-lg shadow-md transition-all duration-300 hover:border-blue-400/60 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 mb-5">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Contextual AI Chat
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chat with your notes! Ask questions, summarize, translate, or
                brainstorm – the AI understands your context for relevant,
                helpful responses.
              </p>
            </div>

            {/* Feature 3: Auto Cover Art */}
            <div className="p-6 bg-slate-50/70 border border-gray-200/70 rounded-lg shadow-md transition-all duration-300 hover:border-purple-400/60 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 mb-5">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Auto Cover Art
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Never search for a notebook cover again. CleverQuill
                automatically generates beautiful, relevant cover images based
                on your note's title.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Minimal Cognitive Load */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Bot className="w-16 h-16 mx-auto mb-6 text-emerald-500" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Focus on Flow, Not Friction
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We designed CleverQuill's AI to feel like a natural extension of
            your thinking process. No complex prompts, no steep learning curve –
            just intuitive assistance when you need it.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CleverQuill. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
