'use strict'

import {app, protocol, BrowserWindow, dialog, ipcMain} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import ElectronStore from 'electron-store'

ElectronStore.initRenderer()

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

let mainWindow: any

async function createWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 1200,
        minWidth: 900,
        webPreferences: {
            nodeIntegration: (process.env
                .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        },
        title: 'Display',
        icon: "./assets/icon.svg",
    })

    ipcMain.handle('open-document-folder', (event, arg) => {
        const result = dialog.showOpenDialog({
            buttonLabel: 'Use directory',
            properties: ['openDirectory']
        })

        return result
    })

    ipcMain.handle('open-full-screen', (event, arg) => {
        // Open full screen
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
        if (!process.env.IS_TEST) window.webContents.openDevTools()
    } else {
        createProtocol('app')
        window.loadURL('app://./index.html')
    }

    return window
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow()
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    mainWindow = createWindow()
})

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
