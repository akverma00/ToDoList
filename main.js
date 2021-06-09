const { app, BrowserWindow } = require("electron");
const path = require("path");
require('./app.js');

//Function to define applications
const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    mainWindow.loadURL(`http://localhost:3000/`);

    //mainWindow.loadFile(path.join(__dirname, "index.html"));
}

//Waiting for the window to get ready
app.whenReady().then(() => {
    loadMainWindow()


    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            loadMainWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});