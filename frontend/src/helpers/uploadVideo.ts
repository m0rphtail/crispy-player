import axios from 'axios'
import { API_URL } from '../constants'

const uploadVideo = (video: File): void => {

    const path = API_URL + 'file/upload'
    let body: FormData = new FormData()
    body.append('file', video)
    // axios.post(
    //     path, 
    //     {
    //         file: new FormData().append('file', video)
    //     }, 
    //     {
    //         headers: {
    //             'Access-Control-Allow-Origin': 'http://localhost:3000'
    //         }
    //     }
    // )
    // .then(response => console.log(response))
    // .catch(error => console.log(error))
    fetch(
        path, {
            method: 'POST',
            body: body,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    ).then(response => console.log(response))
    .catch(error => console.log(error))
}

export default uploadVideo