import { useState } from "react"
import { SortedDropZone } from "./SortedDropZone"

const imgSet = ['https://mir-s3-cdn-cf.behance.net/project_modules/disp/8a1f1813765711.56277edb36b94.gif',
    'http://shop.asmer.fe.a-level.com.ua/loading.gif',
    'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
]

const getRandomItemFromArr = arr => arr[Math.floor(Math.random() * arr.length)]

const PostImage = ({ image, onDelete }) =>
    <img src={image.url} key={image._id} onClick={() => onDelete(image)} />

const EditPost = ({ onSave }) => {
    const [post, setPost] = useState({ title: '', text: '', images: [] })
    const addImageToState = () => setPost({
        ...post,
        images: [...post.images,
        { _id: Math.random(), url: getRandomItemFromArr(imgSet) }]
    })
    const deleteImage = image => setPost({ ...post, images: post.images.filter(i => i !== image) })

    const localPostImage = ({ image }) => <PostImage image={image}
        onDelete={imgToDelete => deleteImage(imgToDelete)} />
    console.log(post)
    return (
        <div>
            <input type='text' value={post.title} placeholder="title"
                onChange={e => setPost({ ...post, title: e.target.value })} />
            <input type='text' value={post.text} placeholder="text"
                onChange={e => setPost({ ...post, text: e.target.value })} />
            <div>
                <SortedDropZone items={post.images} render={localPostImage} itemProp="image" keyField="_id"
                    onChange={images => setPost({ ...post, images })}
                    horizontal
                />
                <button onClick={addImageToState}>+</button>
            </div>
            <button onClick={() => onSave(post)}>Save</button>
        </div>
    )
}

const data = [{ name: 'aaa', _id: 'a1' }, { name: 'bbb', _id: 'b2' }, { name: 'ccc', _id: 'c3' }]


const Item = ({ data: { name } }) =>
    <div style={{ backgroundColor: 'yellow', fontSize: '2em', padding: '20px', borderRadius: '10px', margin: '10px' }}>
        {name}
    </div>

export { EditPost }