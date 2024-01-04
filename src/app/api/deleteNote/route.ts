import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { notesIndex } from "@/lib/db/pinecone"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) { 
    try {
        const { noteId } = await req.json()
        //delete vector embedding 
        await notesIndex.deleteOne(noteId.toString())

        // fetch noteBanner from DB and delete img from storage
        const file_name = await db.select().from($notes).where(eq($notes.id, noteId))
        const supaPath = file_name[0].imageUrl!.split('/')
        await supabase.storage.from('noteBanner').remove([supaPath[supaPath.length - 1]])
        
        //delete record from db
        await db.delete($notes).where(eq($notes.id, parseInt(noteId)))

        return new NextResponse('ok', {status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json(
          {
            success: false,
          },
          { status: 500 }
        )
    }
}