import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import axios from 'axios';
import useLoginModal from '@/hooks/useLoginModal';

const FollowBar = () => {
  const router = useRouter();
  const { data: users = [] } = useUsers();
  const loginModal = useLoginModal()
  const { data: currentUser } = useCurrentUser();
  const [searchQuery , setSearchQuery] = useState('');
  const [arr , setArr] = useState<{userss: Array<User>}>([] as any)
  const [val , setVal] = useState("")

  const arrData = [
    {
      type:"gaming trending",
      group:"#Genshin win an award",
      posts:"47.8k posts"
    },
    {
      type:"gaming trending",
      group:"#Genshin win an award",
      posts:"47.8k posts"
    },
    {
      type:"gaming trending",
      group:"#Genshin win an award",
      posts:"47.8k posts"
    },
    {
      type:"gaming trending",
      group:"#React developers",
      posts:"47.8k posts"
    },
    {
      type:"gaming trending",
      group:"#hutao best girl",
      posts:"47.8k posts"
    },
    {
      type:"gaming trending",
      group:"#hutao best girl",
      posts:"47.8k posts"
    },
  ]

  let filter = users.filter((obj:any)=>{
    return obj.name !== currentUser?.name
  })

  if (users.length === 0) {
    return null;
  }

  const SearchInput = async (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearchQuery(e.target.value)
    const endcodedSearchQuery = encodeURI(e.target.value);
    setVal(`/search?q=${endcodedSearchQuery}`)
    const {data} = await axios.post("/api/filterUsers",{ searchQuery:e.target.value })
    setArr(data)
    
  }

  

  const Entering = (e:React.KeyboardEvent) =>{
    if(e.key === "Enter"){
      router.push(val);
    }
  }

  const trending = () =>{
    if(!currentUser){
      loginModal.onOpen()
    }else{
      router.push('/trending')
    }
  }

  const followUser = () =>{
    if(!currentUser){
      loginModal.onOpen()
    }else{
      router.push("/who_to_follows")
    }
  }
 

  return (
    <div className="px-6 py-4 hidden lg:block ">
      <div className='sticky top-3  z-40'>
      <div className="bg-neutral-800 rounded-md p-4">
        <input className='bg-neutral-800 text-white' placeholder='Search' value={searchQuery} onChange={SearchInput} onKeyDown={Entering}/>
      </div>
      
        {
          searchQuery === "" ? (
            <></>
          ) : (
            <div className=' relative '>
            <div className='absolute flex flex-col gap-6 mt-4 rounded-md p-4  z-10 w-full bg-white left-0'>
            {
              arr.userss?.map((item)=>{
                return(
                  <div key={item.id} className="flex flex-row gap-4">
                    <Avatar userId={item.id} />
                    <div className='flex flex-col'>
                      <p className="text-black font-semibold text-sm">{item.name}</p>
                      <p className="text-neutral-400 text-sm">@{item.username}</p>
                    </div>
                  </div>
                )
              })
            }
            {arrData.filter((item: Record<string, any>)=>{
              return searchQuery.toLowerCase() === ''
              ? item 
              : item.group.toLowerCase().includes(searchQuery);
            }).map((item: Record<string, any>) => (
              <div key={item.id} className="flex flex-row gap-4">
                <div className="flex flex-col">
                  <p className="text-black font-semibold text-sm">{item.group}</p>
                  <p className="text-neutral-600 text-sm">{item.posts}</p>
                </div>
              </div>
            ))}
            </div>
            </div>
          )
        }
      </div>
      
      <div className="bg-neutral-800 rounded-md p-4 mt-5">
        <h2 className="text-white text-xl font-semibold">Tending</h2>
        <div className="flex flex-col gap-6 mt-4">
        {arrData.slice(0,5).map((item: Record<string, any>) => (
            <div key={item.id} className="flex flex-row gap-4">
              <div className="flex flex-col">
                <p className="text-neutral-400 text-sm">{item.type}</p>
                <p className="text-white font-semibold text-sm">{item.group}</p>
                <p className="text-neutral-400 text-sm">{item.posts}</p>
              </div>
            </div>
          ))}
        </div>
        <button className='my-[10px] text-white' onClick={trending}>Mores...</button>
      </div>

      <div className="bg-neutral-800 rounded-md p-4 mt-5 sticky top-20">
        <h2 className="text-white text-xl font-semibold">Who To Follow</h2>
        <div className="flex flex-col gap-6 mt-4">
           {filter.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
        <button className='my-[10px] text-white' onClick={followUser}>Mores...</button>
      </div>
    </div>
  );
};

export default FollowBar;
