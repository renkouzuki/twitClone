import Avatar from "@/components/Avatar";
import Header from "@/components/Header";
import { User } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import {useSearchParams} from 'next/navigation';
import useSWR from 'swr'

const fetchPosts = async(url:string)=>{
  const res = await fetch(url);

  if(!res.ok){
    throw new Error("Failed to fetch posts")
  }

  return res.json();
}

const Search = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const endcodedSearchQuery = encodeURI(searchQuery || "");

  const {data , isLoading} = useSWR<{ users: Array<User>}>(
    `/api/search?q=${endcodedSearchQuery}`,
    fetchPosts
  );

  if(!data?.users){
    return null
  }
  return ( 
    <>
      <Header label="Search" />
      <div className="text-white">
        {endcodedSearchQuery === "" ? (
          <></>
        ) : (
          <>
          {
            data.users.map((item)=>{
              return(
                <div key={item.id} className="flex flex-row items-center justify-center gap-3">
                  <Avatar userId={item.id} />
                  <div>
          <div className="flex flex-row items-center gap-2">
            <p 
             
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {item.name}
            </p>
            <span 
   
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{item.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {formatDistanceToNowStrict(new Date(item.createdAt))}
            </span>
          </div>
          
          </div>
        </div>
              )
            })
          }
          </>
        )}
        
      </div>
    </>
   );
}
 
export default Search;