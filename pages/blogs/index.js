import { useState } from "react";
import { FaBloggerB } from "react-icons/fa";
import fetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/Dataloading";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

export default function Blogs() {
    //fetch blog data
    const { allData, loading } = fetchData("api/blogs");

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    // for search
    const [searchQuery, setSearchQuery] = useState("");

    // function to handle page Change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // total number of blogs
    const allBlogs = allData.length;

    // filter all data based on search query
    const filteredBlogs = searchQuery.trim() === ""
        ? allData
        : allData.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Calculate indexes for pagination
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    // Get the current page's blogs
    const currentBlog = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog) || [];

    // Filter for published blogs
    const publishedBlog = currentBlog.filter(ab => ab.status === "publish");
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allBlogs / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Published <span>Blog</span></h2>
                    <h3>Admin panel</h3>
                </div>
                <div className="breadcrumb">
                    <FaBloggerB /><span>/</span><span>Blogs</span>

                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Blogs:</h2>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={ev => setSearchQuery(ev.target.value)}
                        placeholder="Search by title...." />
                </div>

                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>title</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ?
                            <>
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            </> :
                            <>
                                {publishedBlog.length === 0 ?
                                    (<tr>
                                        <td colSpan={4} className="text-center">NO Blog Found</td>
                                    </tr>) :
                                    (publishedBlog.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstBlog + index + 1}</td>
                                            <td><img src={blog.images[0]} width={180} alt="image" /></td>
                                            <td><h3>{blog.title} </h3> </td>
                                            <td className="flex gap-2 flex-center">
                                                <Link href={"/blogs/edit" + blog._id}> <button><FaEdit />
                                                </button>
                                                </Link>
                                                <Link href={"/blogs/edit" + blog._id}><button><RiDeleteBin5Line />
                                                </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )))
                                }
                            </>}
                    </tbody>
                </table>
            </div>

        </div>
    </>
}