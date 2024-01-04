import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const filePath = "NewYork City1703877436758.jpeg"
        await supabase.storage.from('noteBanner').remove([filePath])
        

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