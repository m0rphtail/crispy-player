import axios from 'axios'
import { API_URL } from '../constants'

const uploadVideo = (video: File): void => {

    const path = API_URL + 'file/upload'
    axios.post(
        path, 
        {
            file: video
        }
    )
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

export default uploadVideo