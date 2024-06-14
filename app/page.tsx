'use client';

import { useChat } from 'ai/react';
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api:'api/geminiai'
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
 {RenderForm()}
 {RenderMessages()}
 {JSON.stringify(messages)}  {/* since message are in json format so we convert it into string */}

    </main>
  );
  function RenderForm(){
  
    return <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit(event, {
        data:{
          prompt: input
        }
      })
    }} className="w-full flex flex-row gap-2 items-center h-full" >
      <input type="text" value={input} onChange={handleInputChange} placeholder={isLoading ?"generating" : "ask something......"} disabled={isLoading} className="border-b border-dashed outline-none w-full px-4 py-2 text-[#8428A0] placeholder:text-[#8428A099] text-right focus:placeholder-transparent"/>
      <button type="submit" className="rounded-full shadow-md p-2 flex flex-row ">send</button>
    </form>
  }
  
  function RenderMessages() {
    return <div className='flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap'>
      {
        messages.map((mes, index) =>{
          return <><div className={`p-4 shadow-md rounded-md ml-10 relative ${mes.role === 'user'? "bg-stone-300":""}`}>
            {mes.content}
            {mes.role === 'user' ? (<h5 className='absolute top-2 -left-19'>USER</h5>) : (<h5 className='absolute top-2 -left-19'>Gemini</h5>)}
          </div></>
        })
      }
    </div>
  }
}

