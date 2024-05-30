import OpenAI from "openai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const openaiPincone = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export default openaiPincone;

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an creative and professional AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titles ${name}`,
        },
      ],
    });
    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    // const response = await openai.createImage({
    //   prompt: image_description,
    //   n: 1,
    //   size: "256x256",
    // });
    const response = await openaiPincone.images.generate({
      model: "dall-e-3",
      prompt: image_description,
      n: 1,
      size: "1024x1024",
    });

    // const data = await response.json();
    const image_url = response.data[0].url;
    return image_url as string;
  } catch (err) {
    console.log(err);
  }
}

export async function getEmbedding(text: string) {
  const response = await openaiPincone.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = response.data[0].embedding;

  if (!embedding) throw Error("Error generating embedding.");

  // console.log(embedding);

  return embedding;
}
