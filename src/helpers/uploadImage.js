import axios from 'axios';

export const uploadImage = async (image) => {

    const formData = new FormData()
    
    formData.append('file', image)
    formData.append("upload_preset", "mern-blog-app")
    formData.append("api_key", "333793857942195")

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: false,

    }
    const res = await axios.post("https://api.cloudinary.com/v1_1/dqkagqhg2/image/upload",
        formData,
        config

    )
    const data = await res.data;
    if(!data){
        throw new Error("Error uploading image.")
    }
    const imageData = {
        publicId:data.public_id,
        url:data.secure_url,

    }
    return imageData
}