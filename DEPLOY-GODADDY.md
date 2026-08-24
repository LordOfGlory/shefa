# Put Shefa Venturez on shefaventurez.com (free)

Do not pay Tiiny. Use GitHub Pages (free HTTPS).

## 1. Put the site on GitHub

1. Sign in at https://github.com/LordOfGlory
2. Create a repository named `shefa` (or open the one you already have).
3. Upload every file from this project into the repo root so `index.html` is at the top level (not inside a nested folder).
4. GitHub → repository → **Settings** → **Pages**
5. Source: **Deploy from a branch**
6. Branch: `main` / folder: `/ (root)` → Save
7. GitHub will give a URL such as:
   `https://lordofglory.github.io/shefa/`

Wait 1–2 minutes until that URL opens.

## 2. Point GoDaddy at GitHub Pages

1. Sign in at https://dcc.godaddy.com/
2. Open **shefaventurez.com** → **DNS**
3. Add or edit:

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | www | lordofglory.github.io | 1 hour |

4. Optional root redirect (apex `shefaventurez.com` → www):
   - If GoDaddy offers **Forwarding**, forward `shefaventurez.com` to `https://www.shefaventurez.com`
   - Or use an A record only if GitHub lists current Pages IPs in their docs (they change; CNAME on `www` is the reliable free method)

5. Back in GitHub → Settings → Pages → **Custom domain**
   - Enter `www.shefaventurez.com`
   - Save
   - Tick **Enforce HTTPS** when it becomes available (can take up to 24 hours)

## 3. Check

- https://www.shefaventurez.com should load the Shefa site
- Certificate is issued by GitHub/Let’s Encrypt, not Tiiny
