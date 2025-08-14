
import axios from 'axios';

const useUpdateImgBB = async(imageData) => {
    const imageFormData = new FormData()
    imageFormData.append('image', imageData)
    const {data:imageURL} = await axios.post(`https://api.imgbb.com/1/upload?key=3dbb027b498e0121c63b27ae7810d0c7`, imageFormData)
    

    const imageUrl =await imageURL.data.display_url
    return imageUrl
}
export default useUpdateImgBB;