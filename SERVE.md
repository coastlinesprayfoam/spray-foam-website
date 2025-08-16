# Serve the Coastline Spray Foam static site locally

Recommended: the repository root contains the live static site (index.html, assets/).

Quick start (PowerShell):

```pwsh
# start the built-in Python static server and open the browser
./serve-local.ps1

# or run manually on a different port
python -m http.server 4322
# then open http://localhost:4322/
```

Alternative (Node):

```pwsh
# if you prefer Node.js
npx serve . -l 4322
```

Optional: map your machine to use the site domain (coastlinesprayfoam.com) for local testing
- Edit your hosts file (requires admin privileges)
  - Windows: edit `C:\Windows\System32\drivers\etc\hosts`
  - Add a line:

```
127.0.0.1 coastlinesprayfoam.com
```

- With that in place, start the server and open `http://coastlinesprayfoam.com:4322/` in your browser.

Security note: only add hosts entries temporarily for local testing and remove when done.
