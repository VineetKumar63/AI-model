import { GoogleGenerativeAIStream, StreamingTextResponse, streamToResponse } from "ai";
import { google } from '@ai-sdk/google';
import {GoogleGenerativeAI} from "@google/generative-ai"
export async function POST(req:Request, res: Response) {
        const reqBody = await req.json();
    const propmt = reqBody.data.prompt;
 const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
 const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'})
 const streamingResponse = await model.generateContentStream(propmt)
 return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse))
}