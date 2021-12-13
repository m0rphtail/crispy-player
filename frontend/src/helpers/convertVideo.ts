import VC from 'convert-video'

const convertVideo = (video: File) => {
    return VC.convert(video, 'mp4')
}

export default convertVideo