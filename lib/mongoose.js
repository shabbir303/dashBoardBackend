import mongoose from "mongoose";

export function mongooseConnect(){
    if(mongoose.connect.redyState===1){
        return mongoose.connection.asPromise();
    }
    else{
        const uri ="mongodb+srv://admin_dashboard:passwordadmin@admin.et2an.mongodb.net";
        // console.log(uri);
        return mongoose.connect(uri);
    }
}