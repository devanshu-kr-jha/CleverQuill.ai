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

const DashboardPage =  async (props: Props) => {
  const { userId } = auth()
  const notes = await db.select().from($notes).where(eq($notes.userId, userId!))  // list of all notes that belongs to this user
   
  return (
   <>
   <div className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14"></div>
        <div className="flex justify-between items-center md:flex-row flex-col">
          <div className="flex items-center">
            <Link href='/'>
              <Button className="bg-green-600" size="sm">
                <ArrowLeft className="mr-1 w-4 h-4"/>
                Back
              </Button>
            </Link>
            <div className="w-4"></div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <div className="w-4"></div>
            <UserButton/>
          </div>
          <div className="ml-auto">
              <AIChatButton/>
          </div>
        </div>
        <div className="h-8"></div>
        <Separator/>
        <div className="h-8"></div>
        {/** conditionaly render */}
        {notes.length === 0 && (
          <div className="text-center">
          <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
        </div>
        )}
        {/** display all notes */}
        <div className="grid sm:grid-cols-3 md:grid-cols- grid-cols-1 gap-3">
          <CreateNoteDialog />
          {notes.map(note => (
            <a href={`/notebook/${note.id}`} key={note.id}>
              <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                <Image
                  width={400}
                  height={200}
                  alt={note.name}
                  src={note.imageUrl || ""}
                />
                <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {note.name}
                      </h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
              </div>
            </a>
          ))}
        </div>
      </div>
   </div>
   </>
  )
}
export default DashboardPage;
