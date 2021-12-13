import axios, { AxiosResponse } from 'axios'
import { API_URL } from '../constants'

const uploadVideo = (video: any): Promise<AxiosResponse<any,any>> => {
    
    const path = API_URL + 'file/upload'
    let body: FormData = new FormData()
    body.append('file', video)
    console.log(body)
    return axios.post(
        path, 
        null, 
        {
            params: {
                file: new FormData().append('file', video)
            }
        }
    )
}

export default uploadVideo