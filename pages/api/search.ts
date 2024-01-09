import type { NextApiRequest , NextApiResponse } from "next";

export default async function handler (
    req:NextApiRequest,
    res:NextApiResponse
){

    if(req.method === "GET"){
        try{
            const {q: query} = req.query;

            if(typeof query !== "string"){
                throw new Error("Invalid request");
            }

             const users = await prisma?.user.findMany({
                where:{
                    OR:[
                        {
                            username:{
                                contains:query,
                                mode:"insensitive",
                            }  
                        }
                    ]
                }
             })

            res.status(200).json({users})
        }catch(error){
            res.status(500).end()
        }
    }
}