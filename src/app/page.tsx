import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import landing from "../../public/landing.jpg";
import Image from "next/image";
import Link from "next/link";
// import {SignInButton} from "@clerk/nextjs"
// import { useAuth } from "@clerk/nextjs"
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-black">
      
      <div className="pt-56">
          <p className="font-workFont font-semibold text-7xl text-center text-landingclr1  whitespace-nowrap  " >
            CleverQuill
          </p>
        </div>
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        
        <div className="flex flex-col items-center">
          <p className="font-workFont font-semibold text-6xl text-center text-clr2  whitespace-nowrap">
            Your personal AI thought partner
          </p>
          <div className="mt-4"></div>
          <p className="font-workFont text-gray-400 font-semibold text-2xl px-4">
          Record, improve, and harness your thoughts using our intelligent editor
          </p>
        </div>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-clr3">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          <Link href={"/dashboard"}>
            <Button className="bg-green-600 text-xl">
              Get Started{" "}
              <ArrowRight className="ml-2 w-5 h-5 " strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
