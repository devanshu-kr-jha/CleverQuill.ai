import { Pinecone } from "@pinecone-database/pinecone"

const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey: process.env.PINECONE_API_KEY!
})

export const notesIndex = pinecone.Index("nextjs-ai-note-app")