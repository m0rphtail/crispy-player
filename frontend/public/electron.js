const path = require("path")
const { app, BrowserWindow } = require("electron")
const isDev = require("electron-is-dev")
const { ipcMain } = require('electron')
// const { openInMPV } = require("../../openInMPV")

let mainWindow = null

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: __dirname + '/preload.js'
    },
  })

  mainWindow.setTitle('Crispy Player')
  // mainWindow.setFullScreen(true)
  mainWindow.setMenu(null)

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  )
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


function openInMPVFromElectron(event, videoPath) {
  console.log('this is in main.ts', videoPath)
  const NodeMPV = require('node-mpv')
  const filePaths = [
      '../../core/glsl_shaders/ak4.glsl',
      '../../core/glsl_shaders/fsrcnn.glsl',
      '../../core/glsl_shaders/inversion.glsl',
      '../../core/glsl_shaders/pixels.glsl',
  ]

  let mpvPlayer = new NodeMPV({}, [
    `--glsl-shaders="${filePaths.join(';')}"`,
  ])

  // console.log(mpvPlayer)
  mpvPlayer.load(videoPath.trim())
  // console.log(mpvPlayer)
  // mpvPlayer.on('stopped', function() {
  //     process.exit(0)
  // })
}

ipcMain.on('video-uploaded', openInMPVFromElectron)

module.exports = {
  openInMPVFromElectron
}
