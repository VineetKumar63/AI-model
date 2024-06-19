
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { google } from '@ai-sdk/google';
import {GoogleGenerativeAI} from "@google/generative-ai"
import { AIStream } from "ai"
import supabase from "@/utils/supabaseClient/server";
import { useChat } from "ai/react";

async function promptToDatabase(prompt: string) {
    const { error } = await supabase.from("chat_messages").insert({user_type:"person", messages: prompt });
    if (error) {
      console.error('Error storing prompt:', error);
    }
  }

async function saveCompletionToDatabase(completion: string) {
    const { error } = await supabase.from('chat_messages').insert({ messages: completion });
    if (error) {
      console.error('Error storing completion:', error);
    }
    }

export async function POST(req:Request, res: Response) {
        const reqBody = await req.json();
    const propmt = reqBody.data.prompt;
 const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
 const model = genAI.getGenerativeModel({model:'gemini-1.5-pro-latest'})
 const streamingResponse = await model.generateContentStream(propmt)
 return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse,{
    onStart: async() =>{
        await promptToDatabase(propmt)
    },
    onToken: async(token:string)=>{
        console.log(token)
    },
    onCompletion: async(competion:string)=>{
        await saveCompletionToDatabase(competion)
    }
 }))
}

