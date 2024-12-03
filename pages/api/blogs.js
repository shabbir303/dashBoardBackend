import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
// import mongoose from "mongoose";



export default async function handle(req, res){
    await mongooseConnect();

    const {method} = req;

    if(method === "POST"){
        const {title, slug, comments,status, tags, blogcategory, description,images} = req.body;

        const blogDoc = await Blog.create({title, slug, comments,status, tags, blogcategory, description,images});
        res.json(blogDoc);
    }
    if(method === "GET"){
        if(req.query?.id){
            res.json(await Blog.findById(req.query.id));
        }
        else{
            res.json((await Blog.find()).reverse());
        }
    }
    if(method==="PUT"){
        const {_id, title, slug, comments, status, tags, blogcategory, description,images} = req.body;
        await Blog.updateOne({_id},{
            title,
            slug,
            comments,
            status,
            tags,
            blogcategory,
            description,
            images
        });
        res.json(true);
    }

    if(method === "DELETE"){
        await Blog.deleteOne({_id:req.query?.id})
        res.json(true);
    }
    
}