import type { NextApiRequest , NextApiResponse } from "next";

export default async function handler (
    req:NextApiRequest,
    res:NextApiResponse
){

    if(req.method === "POST"){
        try{
            const {searchQuery: body} = req.body;

            if(typeof body !== "string"){
                throw new Error("Invalid request");
            }

             const userss = await prisma?.user.findMany({
                where:{
                    OR:[
                        {
                            username:{
                                contains:body,
                                mode:"insensitive",
                            }  
                        }
                    ]
                }
             })

            res.status(200).json({userss})
        }catch(error){
            res.status(500).end()
        }
    }
}