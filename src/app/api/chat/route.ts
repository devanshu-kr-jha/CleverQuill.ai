/**
 * Chat API route handler
 * 
 * This function handles POST requests to the chat API endpoint.
 * It performs language detection, retrieves relevant notes, and generates a response using the OpenAI chat completion model.
 * 
 * @param {Request} req - The incoming request object
 * @returns {Promise<Response>} A promise resolving to the response object
 */
import { db } from "@/lib/db";
import { eq } from "drizzle-orm"
import { notesIndex } from "@/lib/db/pinecone";
import { $notes } from "@/lib/db/schema";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

import { franc } from 'franc';

export async function POST(req: Request) {
  try {
    // Parse the request body as JSON
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages

    // Extract the message contents
    const messageContents = messages.map((message) => message.content);

    // Detect the language of the message contents
    // const detectedLanguage = franc(messageContents.join(' ')); // Detected language code
    // console.log("Detected Language:", detectedLanguage);

    // // Truncate the messages to the last 6
    // const messagesTruncated = messages.slice(-6);

    // // Generate an embedding for the truncated messages
    // const embedding = await getEmbedding(
    //   messagesTruncated.map((message) => message.content).join("\n"),
    // );

    // // Get the user ID from the authentication context
    // const { userId } = auth();

    // // Query the notes index for relevant notes
    // const vectorQueryResponse = await notesIndex.query({
    //   vector: embedding,
    //   topK: 1,
    //   filter: { userId },
    // }); 
    // // console.log(vectorQueryResponse)

    // // Retrieve the relevant notes from the database
    // const relevantNotes = await db.select().from($notes).where(eq($notes.id, parseInt(vectorQueryResponse.matches[0].id)))
    // // console.log(relevantNotes)

    // // Create a system message for the chat completion model
    // const systemMessageContent = `You are an intelligent note-taking app. You answer the user's question ${detectedLanguage === 'en' || detectedLanguage === 'hi' ? `in ${detectedLanguage}` : ''} based on their existing notes. The relevant notes for this query are:\n` +
    //   relevantNotes
    //     .map((note) => `Title: ${note.name}\n\nContent:\n${note.editorState}`)
    //     .join("\n\n");

    // const systemMessage: ChatCompletionMessage = {
    //   role: "assistant",
    //   content: systemMessageContent,
    // };

    // // Create a chat completion response using the OpenAI model
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   stream: true,
    //   messages: [systemMessage, ...messagesTruncated],
    // });

    // // Create a streaming text response from the OpenAI response
    // const stream = OpenAIStream(response);
    // return new StreamingTextResponse(stream);
    return new Response("Streaming temporarily disabled for testing", {
      status: 200,
    });
    
  } catch (error) {
    // Log any errors and return a 500 error response
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
