let mpvPlayer = require("node-mpv");

let mpv_options = [
  "--title=Crispy-Player",
  // "--vo=gpu",
  // "--profile=gpu-hq",
  "--glsl-shader=glsl_shaders/ak4.glsl",
  // "--scale=ewa_lanczos",
  // "--fbo-format=rgba16hf",
];

let mpv = new mpvPlayer({},mpv_options);

console.log("Crispy Player...")

mpv
  .start()
  .then(() => {
    if (process.argv[2] != null) {
      return mpv.load(process.argv[2]);
    } else {
      console.log("Please enter a video file as an argument!");
      process.exit();
    }
  })

  .catch((error) => {
    console.log(error.verbose);
    process.exit();
  });

mpv.on("stopped", function () {
  process.exit();
});
