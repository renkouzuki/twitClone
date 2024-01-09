import React from 'react'
import Avatar from '../Avatar'
import useUsers from '@/hooks/useUsers'
import useCurrentUser from '@/hooks/useCurrentUser';

const WhoFllw = () => {
  const {data: users = []} = useUsers();
  const {data: currentUser} = useCurrentUser();
  let filter = users.filter((obj:any)=>{
    return obj.name !== currentUser?.name
  })

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
           {filter.map((user: Record<string, any>) => (
            <div key={user.id} className="flex justify-between gap-4 px-6 py-4">
              <div className='flex flex-row'>
              <Avatar userId={user.id} />
              <div className="flex flex-col px-3">
                <p className="text-white font-semibold text-lg">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
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

export default WhoFllw