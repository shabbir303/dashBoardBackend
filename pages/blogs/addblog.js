import Blog from "@/components/Blog";
import { FaBloggerB } from "react-icons/fa";


export default function Addblog() {



    return <>
       <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add <span>Blog</span></h2>
                    <h3>Admin panel</h3>
                </div>
                <div className="breadcrumb">
                <FaBloggerB /><span>/</span><span>Add Blog</span>

                </div>
            </div>
            <div className="blogsadd">
               <Blog/>
            </div>
       </div>
    </>
}