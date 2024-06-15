'use client';
import { useChat } from 'ai/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from './component/markdown';
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: 'api/geminiai'
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {RenderForm()}
      {RenderMessages()}
      
    </main>
  );
  function RenderForm() {

    return <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit(event, {
        data: {
          prompt: input
        }
      })
    }} className="w-full flex flex-row gap-2 items-center h-full" >
      <input type="text" value={input} onChange={handleInputChange} placeholder={isLoading ? "generating" : "ask something......"} disabled={isLoading} className="border-b border-dashed outline-none w-full px-4 py-2 text-[#8428A0] placeholder:text-[#8428A099] text-right focus:placeholder-transparent" />
      <button type="submit"  className="rounded-full shadow-md px-2 p-1 flex flex-row border" style={{border:"solid",color:'#8428A099'}}>{isLoading ?<i className="bi bi-arrow-clockwise animate-spin"></i> :<i className="bi bi-send-fill"></i>} </button>
    </form>
  }

  function RenderMessages() {
    return <div className='flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap'>
      {
        messages.map((mes, index) => {
          return <><div id='chatbox' className={`p-4 shadow-md rounded-md ml-10 relative ${mes.role === 'user' ? "bg-stone-300" : ""}`}>
            <Markdown text= {mes.content} />
            {mes.role === 'user' ? (<i className="bi bi-person-arms-up absolute top-2 -left-10" style={{color: 'red'}}></i>) : (<i className={`bi  bi-robot absolute -left-10 top-2 ${isLoading && index === messages.length-1 ? 'animate-bounce':''}`}  style={{color:'blue'}}/>
          )}
          </div></>
        })
      }
    </div>
  }
}

