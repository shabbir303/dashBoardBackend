
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';

export default function Blog() {
    


    return <>
       <div>
        <form className='addWebsiteform'>
            {/* blog title */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder='Enter small title'/>
            </div>

            {/* blog slug url */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="Slug">Slug (seo friendly url)</label>
                <input type="text" id="title" placeholder='Enter Slug url'/>
            </div>

            {/* blog category */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="Category">Select Category (for multi select click ctrl + mouse left key)</label>
                <select name="category" id="category" multiple>
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
                    <input type="file" id="fileInput" className='mt-1' accept='image/*' multiple  />
                </div>
            </div>
            <div className='w-100 flex flex-left mt-1'>
                <Spinner/>
            </div>
            {/* image preview and image sortable */}
            {/* pending */}
            {/* markdown description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="description">Blog Content (for image: first upload and copy link and paste in![alt text](link))</label>
                <MarkdownEditor
                 style={{width:"100%", height:"400px"}}
                />
            </div>
        </form>
       </div>
    </>
}

