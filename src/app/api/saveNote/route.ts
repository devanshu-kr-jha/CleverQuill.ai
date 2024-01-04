import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { getEmbedding } from "@/lib/openai"
import { notesIndex } from "@/lib/db/pinecone"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { noteId, editorState } = body;
        if (!editorState || !noteId) {
          return new NextResponse("Missing editorState or noteId", { status: 400 });
        }

        noteId = parseInt(noteId);
        const notes = await db.select().from($notes).where(eq($notes.id, noteId));
        if (notes.length != 1) {
          return new NextResponse("failed to update", { status: 500 });
        }

        const { userId } = auth()
        if(!userId) {
          return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const note = notes[0];

        if (note.editorState !== editorState) {
          const embedding = await getEmbeddingForNote(note.name, editorState)
          await db.update($notes).set({ editorState }).where(eq($notes.id, noteId));

          await notesIndex.upsert([{
            id: note.id.toString(),
            values: embedding,
            metadata:{ userId }
          }])
        }
        return NextResponse.json(
          {
            success: true,
          },
          { status: 200 }
        )
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
async function getEmbeddingForNote(title: string, content: string | undefined) {
  return getEmbedding(title + "\n\n" + content ?? "");
}
