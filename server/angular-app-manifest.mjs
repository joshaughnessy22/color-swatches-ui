
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://joshaughnessy22.github.io/color-swatches-ui/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/color-swatches-ui"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23632, hash: '6fc734cb4ff862006b7a44774f363a99d23c4de130e6003cb7758097b4a90610', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17206, hash: '9ea638497fa66ba475cb6a7fa046e885db7402fb218519439b807affe030a4e6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 90512, hash: '2fa0b297ff3875622dcf2b080358374fe16d5573b94669c10f1d1c650b456710', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
