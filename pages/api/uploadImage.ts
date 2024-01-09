import { put ,list} from '@vercel/blob';
import type { NextApiResponse, NextApiRequest, PageConfig } from 'next';
import { NextResponse } from 'next/server';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if(request.method === "POST"){
    const blob = await put(request.query.filename as string, request, {
      access: 'public',
    });
    return response.status(200).json(blob);
  }
  
  if(request.method === "GET"){
    const {blobs} = await list()
    return response.status(200).json(blobs)
  }
  
}
 
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};