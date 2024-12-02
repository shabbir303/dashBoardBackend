
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Blog({
    _id
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [comments, setComments] = useState([]);
    const [status, setStatus] = useState("");
    const [tags, setTags] = useState("");
    const [blogcategory, setBlogcategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];

    async function createBlog(ev) {
        ev.preventDefault();

        const data = { title, slug, comments, status, tags, blogcategory, description, images };

        if (_id) {
            await axios.put("/api/blogs", { ...data, _id });//explain this line
            toast.success("data updated");
        }
        else {
            await axios.post("/api/blogs", data);
            toast.success("Blog Created");
        }
        setRedirect(true);
    }

    // for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');//replace spaced with hyphenes
        setSlug(newSlug);
    }

    return <>
        <div>
            <form className='addWebsiteform' onSubmit={createBlog}>
                {/* blog title */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder='Enter small title'
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                </div>

                {/* blog slug url */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="Slug">Slug (seo friendly url)</label>
                    <input
                        type="text"
                        id="title"
                        placeholder='Enter Slug url'
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </div>

                {/* blog category */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="Category">Select Category (for multi select click ctrl + mouse left key)</label>
                    <select
                        name="category"
                        id="category"
                        multiple
                        onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, options => options.value))}
                        value={blogcategory}
                    >
                        <option value="Node js">Node Js</option>
                        <option value="React js">React Js</option>
                        <option value="CSS">CSS</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Database">Database</option>
                        <option value="Deployment">Deployment</option>
                    </select>
                </div>

                {/* blog images */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <div className='w-100'>
                        <label htmlFor="images">Images(first Image will show as a thumbnil, you can drug)</label>
                        <input type="file" id="fileInput" className='mt-1' accept='image/*' multiple />
                    </div>
                </div>
                <div className='w-100 flex flex-left mt-1'>
                    <Spinner />
                </div>
                {/* image preview and image sortable */}
                {/* pending */}
                {/* markdown description */}
                <div className='description w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="description">Blog Content (for image: first upload and copy link and paste in![alt text](link))</label>


                    <MarkdownEditor
                        value={description}
                        onChange={ev => setDescription(ev.text)}
                        style={{ width: "100%", height: "400px" }}
                        renderHTML={(text) => (
                            <ReactMarkdown
                                components={{
                                    code: ({ node, inline, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        if (inline) {
                                            return <code {...props}>{children}</code>;
                                        } else if (match) {
                                            return (
                                                <div>
                                                    {/* Add your custom rendering logic for code blocks here */}
                                                    <div style={{ position: "relative" }}>
                                                        <pre style={{ padding: "0", borderRadius: "5px", overflowX: "auto", whiteSpace: "pre-wrap" }}{...props}>
                                                            <code>{children}</code>
                                                        </pre>
                                                        <button style={{ position: "absolute", top: "0", right: "0", zIndex: "1" }} onClick={navigator.clipboard.writeText(children)}>Copy Code</button>

                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return <code {...props}>{children}</code>;
                                        }
                                    },
                                }}
                            >
                                {text}
                            </ReactMarkdown>
                        )}
                    />

                </div>
                {/* tags */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="tags">Tags</label>
                    <select
                        name="tags"
                        id="tags"
                        onChange={(e) => setTags(Array.from(e.target.selectedOptions, options => options.value))}
                        value={tags}
                    >
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="javascript">javascript</option>
                        <option value="database">database</option>
                    </select>
                </div>
                {/* blog status */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="status">Status</label>
                    <select 
                    name="status" 
                    id="status"
                    value={status}
                    onChange={ev=>setStatus(ev.target.value)}
                    >
                        <option value="">No select</option>
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>
                </div>
                <div className='w-100 mb-2'>
                    <button type='submit' className='w-100 addwebbtn flex-center'> Save Blog </button>
                </div>
            </form>
        </div>
    </>
}

