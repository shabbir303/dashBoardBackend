import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBloggerB } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";


export default function DeleteProduct() {
    const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get("/api/blogs?id=" + id).then(response => {
                setProductInfo(response.data);
            })
        }
    }, [id])

    function goBack() {
        router.push("/blogs");
    }

    async function DeleteBlog() {
        await axios.delete("/api/blogs?id=" + id);
        toast.success("delete successfully")
        goBack();
    }

    return <>
        <Head>
            <title>Delete Blog</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete <span>{productInfo?.title}</span></h2>
                    <h3>Admin Panel</h3>
                </div>
                <div className="breadcrumb">
                    <FaBloggerB /><span>/</span><span>Blog Deleted</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                        <g fill="#fa5252" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{
                            mixBlendMode: "normal",
                        }}><g transform="scale(2,2)"><path d="M49,1c-1.66,0 -3,1.34 -3,3c0,1.66 1.34,3 3,3h30c1.66,0 3,-1.34 3,-3c0,-1.66 -1.34,-3 -3,-3zM24,15c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13h77v63c0,9.37 -7.63,17 -17,17h-40c-9.37,0 -17,-7.63 -17,-17v-52c0,-1.66 -1.34,-3 -3,-3c-1.66,0 -3,1.34 -3,3v52c0,12.68 10.32,23 23,23h40c12.68,0 23,-10.32 23,-23v-63.35937c5.72,-1.36 10,-6.50062 10,-12.64062c0,-7.17 -5.83,-13 -13,-13zM24,21h80c3.86,0 7,3.14 7,7c0,3.86 -3.14,7 -7,7h-80c-3.86,0 -7,-3.14 -7,-7c0,-3.86 3.14,-7 7,-7zM50,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3zM78,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3z"></path></g></g>
                    </svg>
                     <p className="cookieHeading">Are you sure?</p>
                     <p className="cookieDescription">If you delete this website content it will permanently deleted</p>
                     <button onClick={DeleteBlog} className="acceptButton">Delete</button>
                     <button onClick={goBack} className="declineButton">Cancel</button>
                </div>
            </div>

        </div>
    </>
}