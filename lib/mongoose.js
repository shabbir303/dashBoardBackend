import mongoose from "mongoose";

export function mongooseConnect(){
    if(mongoose.connect.redyState===1){
        return mongoose.connection.asPromise();
    }
    else{
        const uri =process.env.MONGODB_URI;
        // console.log(uri);
        return mongoose.connect(uri);
    }
}

// import mongoose from "mongoose";

// export function mongooseConnect() {
//     // const uri = process.env.MONGODB_URI;
//     const uri = "mongodb+srv://dashboard:dashboard@dashboard.zdhmq.mongodb.net/adminDashboard"

//     if (!uri) {
//         throw new Error("MONGODB_URI is not defined in the environment variables.");
//     }

//     if (mongoose.connection.readyState === 1) {
//         return mongoose.connection.asPromise();
//     } else {
//         return mongoose.connect(uri).toString();
//     }
// }