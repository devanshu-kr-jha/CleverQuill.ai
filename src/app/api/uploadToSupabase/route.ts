import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { uploadToSupabase } from "@/lib/supabase"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { noteId } = await req.json()
        //extract the dalle imgUrl and save it to storage
        const note = await db.select().from($notes).where(eq($notes.id, parseInt(noteId)))
        if(!note[0].imageUrl){
            return new NextResponse('no image url',{ status: 400 })
        }
        
        const supabase_url = await uploadToSupabase(note[0].imageUrl, note[0].name)
        await db.update($notes).set({
            imageUrl: supabase_url
        }).where(eq($notes.id, parseInt(noteId)))

        return new NextResponse('ok', {status:200})
    } catch (err) {
        console.log(err)
        return new NextResponse("error", {status: 500})
    }
}