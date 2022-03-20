const NodeMPV = require('node-mpv')
const filePaths = [
    './core/glsl_shaders/ak4.glsl',
    './core/glsl_shaders/fsrcnn.glsl',
    './core/glsl_shaders/inversion.glsl',
    './core/glsl_shaders/pixels.glsl',
]

const openInMPV = (videoSrc) => {
    let mpvPlayer = new NodeMPV({}, [
        `--glsl-shaders="${filePaths.join(';')}"`,
    ])
    console.log(mpvPlayer)
    mpvPlayer.load(videoSrc)
    mpvPlayer.on('stopped', function() {
        process.exit(0)
    })
}

openInMPV("./video.mp4")

module.exports = {
    openInMPV
}