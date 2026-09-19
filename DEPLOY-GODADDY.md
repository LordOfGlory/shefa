# Point shefaventurez.com at Vercel (from GoDaddy)

The site is hosted on Vercel. GitHub (`LordOfGlory/shefa`) is the source copy.

## 1. In Vercel

1. Import the GitHub repo `LordOfGlory/shefa`.
2. Framework preset: Other (static HTML).
3. Add domains:
   - `www.shefaventurez.com`
   - `shefaventurez.com`

## 2. In GoDaddy DNS

Sign in at GoDaddy → shefaventurez.com → DNS. Replace GitHub Pages records with:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

Remove old GitHub Pages A records (`185.199.108.x` / `185.199.109.x`) and any CNAME that still points `www` to `lordofglory.github.io`.

If GoDaddy is forwarding the apex (`shefaventurez.com` → www), you can keep forwarding instead of the A record.

## 3. Check

- https://www.shefaventurez.com loads the Shefa site
- HTTPS is issued by Vercel / Let’s Encrypt
- There are no bank, mobile-money or checkout pages — payment details go only by WhatsApp +256 763 533 786 or shefaventurez@outlook.com
