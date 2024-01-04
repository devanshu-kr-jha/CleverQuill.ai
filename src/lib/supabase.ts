import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadToSupabase(imageUrl: string, name: string) {
    try {
        const response = await fetch(imageUrl)
        const imageData = await response.arrayBuffer()
        const file_name = name.replace(" ", "") + Date.now() + ".jpeg"
        const { data, error: uploadError } = await supabase.storage.from('noteBanner').upload(file_name, imageData)
        if (uploadError) {
            throw new Error(`Failed to upload image to Supabase Storage: ${uploadError.message}`);
        }
        const supabaseStorageUrl = 'https://blpfrjsykimhjfprbxts.supabase.co/storage/v1/object/public/noteBanner'
        const imgSupaUrl = `${supabaseStorageUrl}/${data?.path}`

        return imgSupaUrl
    } catch (error) {
        console.log(error)
    }
}