const NodeMPV = require('node-mpv')

// const fileURL = 'F:/mpv-test-node/a4k.glsl'
const filePaths = [
    './shaders/downscale.glsl',
    './shaders/clamp.glsl',
    './shaders/downscale2.glsl',
    './shaders/restore.glsl',
    './shaders/upscale2.glsl',
    './shaders/upscale.glsl'
]
const filePathJoined = filePaths.join(';')

// const shader = require('../../../core/glsl_shaders/ak4.glsl')


// console.log(mpvPlayer, filePathJoined)
// mpvPlayer.load('./video2.mp4')

const openInMPV = (videoSrc: string) => {
    // console.log(shader)
    let mpvPlayer = new NodeMPV({}, [
        // "--fullscreen",
        `--glsl-shaders="${filePathJoined}"`,
        // "--o=test.mkv"
    ])
    console.log(videoSrc)
    // mpvPlayer.load()
}

export default openInMPV