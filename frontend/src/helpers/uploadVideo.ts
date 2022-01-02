import axios, { AxiosResponse } from 'axios'
import { API_URL } from '../constants'

const uploadVideo = (video: File): Promise<AxiosResponse<any,any>> => {
    console.log(video)
    const path = API_URL + 'file/upload'
    let body: FormData = new FormData()
    body.append('file', video)
    console.log(body)
    return axios.post(
        path, 
        body
    )
}

export default uploadVideo