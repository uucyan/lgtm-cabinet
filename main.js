/*
 **  Nuxt
 */
let config = require('./nuxt.config.js')
let _NUXT_URL_ = null
const http = require('http')
// Build only in dev mode
if (config.dev) {
  const {
    Nuxt,
    Builder
  } = require('nuxt')
  const nuxt = new Nuxt(config)
  const builder = new Builder(nuxt)
  const server = http.createServer(nuxt.render)
  builder.build().catch(err => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
  // Listen the server
  server.listen()
  _NUXT_URL_ = `http://localhost:${server.address().port}`
} else {
  _NUXT_URL_ = `file://${__dirname}/index.html`
}
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
 ** Electron
 */
require('electron-debug')({
  showDevTools: true
})
let win = null // Current window
const electron = require('electron')
const { Menu } = require('electron')
const path = require('path')
const app = electron.app
const globalShortcut = electron.globalShortcut

const newWin = () => {
  win = new electron.BrowserWindow({
    icon: path.join(__dirname, 'static/icon.icns'),
    width: 1500,
    height: 1000,
    // backgroundColor: '#573216'
  })
  win.on('closed', () => win = null)

  // メニュー
  const template = [
    {
      label: app.getName(),
    },
    {
      label: '編集',
      submenu: [
        {
          label: '元に戻す',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'やり直し',
          accelerator: 'CmdOrCtrl+Y',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: '切り取り',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'コピー',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: '貼り付け',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'すべて選択',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: '表示',
      submenu: [
        // {
        //   label: '最読み込み',
        //   accelerator: 'CmdOrCtrl+R',
        //   click: function (item, focusedWindow) {
        //     if (focusedWindow)
        //       focusedWindow.reload();
        //   }
        // },
        {
          label: 'フルスクリーン',
          accelerator: (function () {
            if (process.platform == 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function (item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        // {
        //   label: 'Toggle Developer Tools',
        //   accelerator: (function () {
        //     if (process.platform == 'darwin')
        //       return 'Alt+Command+I';
        //     else
        //       return 'Ctrl+Shift+I';
        //   })(),
        //   click: function (item, focusedWindow) {
        //     if (focusedWindow)
        //       focusedWindow.webContents.toggleDevTools();
        //   }
        // },
      ]
    },
    {
      label: 'ウィンドウ',
      role: 'window',
      submenu: [
        {
          label: '最小化',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: '閉じる',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    // {
    //   label: 'ヘルプ',
    //   role: 'help',
    //   submenu: [{
    //     label: 'Learn More',
    //     click: function () {
    //       require('electron').shell.openExternal('http://electron.atom.io')
    //     }
    //   }]
    // }
  ]
  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // グローバルショートカット
  // ウィンドウを表示してフォーカスする
  globalShortcut.register('CommandOrControl+Alt+L', () => {
    win.show()
  })

  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id).catch(err => console.log('An error occurred: ', err))
    // Wait for nuxt to build
    const pollServer = () => {
      http.get(_NUXT_URL_, (res) => {
        if (res.statusCode === 200) {
          win.loadURL(_NUXT_URL_)
        } else {
          setTimeout(pollServer, 300)
        }
      }).on('error', pollServer)
    }
    pollServer()
  } else {
    win.loadURL(_NUXT_URL_)
  }
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
