import Image from 'next/image'
import React from 'react'

const Tendings = () => {
  const arrData = [
    {
      type:"gaming trending",
      group:"#Genshin win an award",
      posts:"47.8k posts",
      img:'/genshin.jpg'
    },
    {
      type:"gaming trending",
      group:"#Genshin win an award",
      posts:"47.8k posts",
      img:'/genshin.jpg'
    },
    {
      type:"gaming trending",
      group:"#Genshin win an award",
      posts:"47.8k posts",
      img:'/genshin.jpg'
    },
    {
      type:"gaming trending",
      group:"#React developers",
      posts:"47.8k posts",
      img:'/reactjs.png'
    },
    {
      type:"gaming trending",
      group:"#hutao best girl",
      posts:"47.8k posts",
      img:'/hutao.jpg'
    },
    {
      type:"gaming trending",
      group:"#hutao best girl",
      posts:"47.8k posts",
      img:'/hutao.jpg'
    },
  ]
  return (
    <div>
      {arrData.slice(0,5).map((item: Record<string, any>) => (
            <div key={item.id} className="flex justify-between gap-4 py-4 px-6">
              <div className="flex flex-row">
                <Image alt="Avatar" src={item.img} width={60} height={60} className='rounded-lg'/>
                <div className='ml-[10px] flex flex-col justify-center'>
                <p className="text-white font-semibold text-lg">{item.group}</p>
                <p className="text-neutral-400 text-sm">{item.posts}</p>
                </div>
              </div>
              <div className='flex justify-center items-center'>
              <div className='text-white
              text-[22px] text-center
              font-bold
               bg-neutral-800 
               w-[30px] 
               h-[30px] 
               leading-[1.62rem] 
               cursor-pointer
               rounded-full
               hover:bg-slate-300
               hover:bg-opacity-10'>
                +
              </div>
              </div>
            </div>
          ))}
    </div>
  )
}

export default Tendings