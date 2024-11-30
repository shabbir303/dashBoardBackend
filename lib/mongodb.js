import { MongoClient } from "mongodb";

export default async function connectToDatabase(){
    const client = new MongoClient(process.env.MONGODB_URI)
    try{

    }
    catch(error){
        console.error("error connecting to mongodb",error);
        throw error;
    }
}