# Kanakku — installable setup

`kanakku.html` works on its own. Double-click it and everything runs. The rest of the
files in this folder are only needed if you want it to install like a real app.

## Files

| File | What it does |
|---|---|
| `kanakku.html` | The whole application |
| `manifest.webmanifest` | Name, icon and colours used when installing |
| `sw.js` | Service worker — caches the app so it opens without a network |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Home screen icons |

## Why installing needs a server

Browsers refuse to register a service worker on a `file://` address. It has to be
`https://` (or `http://localhost`). This is a security rule, not something that can be
worked around. Without it the app still runs — it just cannot be installed to a home
screen or reliably survive a browser storage sweep.

## Option 1 — try it locally first

From inside this folder:

```
python3 -m http.server 8080
```

Open `http://localhost:8080/kanakku.html`. Chrome will show an install icon in the
address bar. This only works while the command is running and only on that machine.

## Option 2 — put it somewhere permanent

Upload all the files in this folder to any static host. Free options that need no
server of your own:

- **GitHub Pages** — create a repository, upload the files, enable Pages in settings
- **Netlify Drop** — drag the folder onto netlify.com/drop
- **Cloudflare Pages**, **Vercel** — same idea

Make it a private repository if you use GitHub. The page itself carries no data —
your figures never leave your browser — but there is no reason to publish the app
publicly either.

If you would rather keep it inside Zoho, **Catalyst** serves static files and gives you
an HTTPS address without running a server.

Once it is on an HTTPS address, open it once, then use "Install app" in Chrome or
"Add to Home Screen" on iOS. After that it opens from an icon, runs full screen, and
works with the network off.

## After installing

Two things to do once, in Settings:

1. **Eviction protection → Request.** Browsers grant this more readily to installed
   apps. It stops the browser clearing your data on its own.
2. **Linked backup file → Link a file.** Chrome and Edge on a computer only. Point it
   at a file inside your WorkDrive or Drive folder. Every change then writes straight
   into that file, so your backup syncs and versions itself with no effort from you.

## Moving between devices

There is still no sync. To move data across, use Settings → Download backup on one
device and Restore backup on the other. Syncing is the next level of work.
