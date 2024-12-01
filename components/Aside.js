import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { IoMdPhotos } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";


export default function Aside({asideOpen, handleAsideOpen}) {

        const router = useRouter();
        const [clicked, setClicked] = useState(false);
        const [activeLink, setActiveLink] = useState("/");
        const handleClick = () => {
                setClicked(!clicked);
                // setActiveLink(router.pathname);
        }
        const handleLinkClick = (link) => {
                setActiveLink(prevActive => (prevActive === link ? null : link))
                setClicked(false);
        }
        useEffect(() => {
                //update active link state when the page is reloaded
                setActiveLink(router.pathname);
        }, [router.pathname])


        return <>
                <aside className={asideOpen?"asideleft active":"asideleft"}>
                        <ul>
                                <Link href="/">
                                        <li className="navactive">
                                                <IoHome />
                                                <span>Dashboard</span>
                                        </li>
                                </Link>
                                <li className={activeLink === "/blogs" ? " navactive  flex-col flex-left" : "flex-col flex-left"} onClick={() => handleLinkClick("/blogs")} >
                                        <div className="flex gap-1">
                                                <BsPostcard />
                                                <span>Blogs</span>
                                        </div>
                                        {activeLink === "/blogs" && (
                                                <ul>
                                                        <Link href="/blogs"> <li>All Blogs</li> </Link>
                                                        <Link href="/blogs/draft"> <li>Draft Blogs</li> </Link>
                                                        <Link href="/blogs/addblog"> <li>Add Blogs</li> </Link>
                                                </ul>
                                        )}


                                </li>
                                <li className={activeLink === "/projects" ? " navactive  flex-col flex-left" : "flex-col flex-left"} onClick={() => handleLinkClick("/projects")} >
                                        <div className="flex gap-1">
                                                <GrProjects />

                                                <span>Projects</span>
                                        </div>
                                        {activeLink === "/projects" && (
                                                <ul>
                                                        <Link href="/projects"> <li>All Projects</li> </Link>
                                                        <Link href="/projects/draftproject"> <li>Draft Projects</li> </Link>
                                                        <Link href="/projects/addproject"> <li>Add Projects</li> </Link>
                                                </ul>
                                        )}


                                </li>
                                <li className={activeLink === "/shops" ? " navactive  flex-col flex-left" : "flex-col flex-left"} onClick={() => handleLinkClick("/shops")} >
                                        <div className="flex gap-1">
                                                <FiShoppingBag />

                                                <span>Shop</span>
                                        </div>
                                        {activeLink === "/shops" && (
                                                <ul>
                                                        <Link href="/shops"> <li>All Products</li> </Link>
                                                        <Link href="/shops/draftshop"> <li>Draft Products</li> </Link>
                                                        <Link href="/shops/addproduct"> <li>Add Products</li> </Link>
                                                </ul>
                                        )}


                                </li>
                                <li className={activeLink === "/gallery" ? " navactive  flex-col flex-left" : "flex-col flex-left"} onClick={() => handleLinkClick("/gallery")} >
                                        <div className="flex gap-1">
                                                <IoMdPhotos />


                                                <span>Gallery</span>
                                        </div>
                                        {activeLink === "/gallery" && (
                                                <ul>
                                                        <Link href="/gallery"> <li>All Photos</li> </Link>
                                                        <Link href="/gallery/addPhoto"> <li>Add Photos</li> </Link>

                                                </ul>
                                        )}

                                </li>
                                   <Link href="/contacts">            
                                <li className={activeLink === "/contacts" ? " navactive  flex-col flex-left" : "flex-col flex-left"} onClick={() => handleLinkClick("/contacts")}>
                                        <div className="flex gap-1">
                                                <RiContactsBook2Fill />
                                                <span>Contacts</span>
                                        </div>
                                </li>
                                </Link> 
                                   <Link href="/setting">            
                                <li className={activeLink === "/setting" ? " navactive  flex-col flex-left" : "flex-col flex-left"} onClick={() => handleLinkClick("/setting")}>
                                        <div className="flex gap-1">
                                        <MdOutlineSettings />

                                                <span>Setting</span>
                                        </div>
                                </li>
                                </Link> 
                        </ul>
                        <button className="logoutbtn">
                                Logout
                        </button>
                </aside>

        </>


}