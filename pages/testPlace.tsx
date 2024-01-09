import type { PutBlobResult } from '@vercel/blob';
import axios from 'axios';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [arr , setArr] = useState([])
  
  useEffect(()=>{
    const func = async () =>{
        const { data } = await axios.get("http://localhost:3000/api/uploadImage")
        setArr(data)
    }
    func()
  },[])

  return (
    <>
      <h1 className='text-white'>Upload Your Avatar</h1>
 
      <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];
 
          const response = await fetch(
            `/api/uploadImage?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );
 
          const newBlob = (await response.json()) as PutBlobResult;
 
          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit" className='text-white'>Upload</button>
      </form>
      {blob && (
        <div className='text-white'>
          Blob url: <Image src={blob.url} width={300} height={300} alt='alt'/>
        </div>
      )}
      <div className='text-white'>
      {
        arr.map((item: Record<string ,any>)=>{
            return(
                <Image src={item.url} width={100} height={100} alt='alt'/>
            )
        })
      }
        </div>
    </>
  );
}