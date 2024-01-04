import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import landing from '../../public/landing.jpg'
import Image from "next/image";
import Link from "next/link"
// import {SignInButton} from "@clerk/nextjs"
// import { useAuth } from "@clerk/nextjs"
export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <p className="font-workFont font-semibold text-6xl text-center text-landingText  whitespace-nowrap">
          Your personal AI thought partner
          </p>
          <div className="mt-4"></div>
          <p className="font-workFont text-landingCLR font-semibold text-2xl px-4">
          Save, develop, and leverage your own thoughts, with the power of GPT
          </p>
        </div>
        <div className="mt-4"></div>
          <h2 className="font-semibold text-3xl text-center text-slate-700">
            <TypewriterTitle/>
          </h2>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          <Link href={'/dashboard'}>
              <Button className="bg-green-600 text-xl">
                Get Started <ArrowRight className="ml-2 w-5 h-5 " strokeWidth={3}/>
              </Button>
              </Link>
        </div>
      </main>
    </div>
  )
}
