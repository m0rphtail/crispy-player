let mpvPlayer = require("node-mpv");

let mpv_options = [
  "--title=Crispy-Player",
  // "--glsl-shader=glsl_shaders/CrispyShader_Upscale_CNN_x2_VL.glsl",
  "--glsl-shaders=glsl_shaders/CrispyShader_Clamp_Highlights.glsl:glsl_shaders/CrispyShader_Restore_CNN_VL.glsl:glsl_shaders/CrispyShader_Upscale_CNN_x2_VL.glsl:glsl_shaders/CrispyShader_AutoDownscalePre_x2.glsl:glsl_shaders/CrispyShader_AutoDownscalePre_x4.glsl:glsl_shaders/CrispyShader_Upscale_CNN_x2_M.glsl"
];

let mpv = new mpvPlayer({},mpv_options);

console.log("Crispy Player running...")

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
