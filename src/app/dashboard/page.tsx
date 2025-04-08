import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { UserButton, auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import CreateNoteDialog from '@/components/CreateNoteDialog'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { $notes } from '@/lib/db/schema'
import AIChatButton from '@/components/AIChatButton'
import Image from 'next/image'
type Props = {}

const DashboardPage = async (props: Props) => {
  const { userId } = auth();
  if (!userId) {
    // Handle appropriately - redirect or error
    return <div>Please log in.</div>;
  }
  const notes = await db.select().from($notes).where(eq($notes.userId, userId));

  return (
    <>
      {/* Enhanced Background: Subtle gradient */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Optional: Subtle background pattern overlay (requires careful implementation) */}
        {/* <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/path/to/subtle-pattern.svg')] bg-repeat"></div> */}

        {/* Main content container with relative positioning for potential absolute elements */}
        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">

          {/* Header Section with subtle bottom border */}
          <div className="flex justify-between items-center flex-wrap gap-4 py-6 border-b border-slate-200/80">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                  <ArrowLeft className="mr-1.5 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Notes</h1>
            </div>

            {/* Optional: Add a Search Bar here if desired */}
            {/* <div className="relative flex-grow max-w-xs hidden md:block mx-4">
              <Input type="search" placeholder="Search notes..." className="pl-9" />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div> */}

            <div className="flex items-center gap-3 sm:gap-4">
              <AIChatButton />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>

          {/* Spacing after header */}
          <div className="pt-8">

            {/* Conditional Rendering for No Notes - Enhanced Visual */}
            {notes.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center mt-12 mb-8 p-8 sm:p-12 bg-white rounded-xl shadow-sm border border-slate-200/70">
                 {/* Larger Icon */}
                 <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full mb-6 inline-block">
                 </div>
                 <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Your workspace is ready!</h2>
                 <p className="text-gray-500 mb-6 max-w-md">
                   Looks like you have not created any notes yet. Click below to capture your first thought or idea.
                 </p>
                 {/* Integrated CreateNoteDialog trigger */}
                 <CreateNoteDialog />
               </div>
            )}

            {/* Display Notes Grid (only if notes exist) */}
            {notes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Dedicated "Create Note" Card - Enhanced Style */}
                <CreateNoteDialog/>

                {/* Notes List */}
                {notes.map((note) => (
                  <Link href={`/notebook/${note.id}`} key={note.id} legacyBehavior>
                    <a className="group block bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      <div className="aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                        <Image
                          width={400}
                          height={225}
                          alt={note.name || "Note image"}
                          src={note.imageUrl || "/placeholder-image.png"} // Use your placeholder
                          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105" // Subtle zoom on hover
                          // onError={(e) => e.currentTarget.src = '/placeholder-image.png'}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-800 truncate leading-tight mb-1"> {/* Slightly adjusted font */}
                          {note.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(note.createdAt).toLocaleDateString("en-US", {
                             year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
