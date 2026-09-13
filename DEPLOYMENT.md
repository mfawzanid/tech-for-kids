# Deployment Plan: tech-for-kids

Publish the tutorials as a website on GitHub Pages with a custom domain.

## Step 1: Create a Landing Page

Create an `index.html` in the root of `tech-for-kids/` that lists both tutorials with links to their game and tutorial pages.

## Step 2: Push to GitHub

1. Create a new GitHub repository (e.g., `tech-for-kids`)
2. Initialize git in your project folder and push:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## Step 3: Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose `main` branch, `/ (root)` folder, click **Save**
4. Your site is live at `https://<yourusername>.github.io/tech-for-kids/`

## Step 4: Buy a Domain

Popular domain registrars:
- **Namecheap** (~$8-12/year for .com)
- **Cloudflare Registrar** (~$8-10/year, no markup)
- **Google Domains** (now Squarespace)

Search for your desired domain name, purchase it.

## Step 5: Connect Domain to GitHub Pages

1. In your repo → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `techforkids.com`)
3. Click **Save** — GitHub creates a `CNAME` file automatically
4. Enable **Enforce HTTPS** checkbox

## Step 6: Configure DNS

At your domain registrar, set these DNS records:

| Type | Name | Value                  |
| ---- | ---- | ---------------------- |
| A    | @    | `185.199.108.153`      |
| A    | @    | `185.199.109.153`      |
| A    | @    | `185.199.110.153`      |
| A    | @    | `185.199.111.153`      |
| CNAME| www  | `<yourusername>.github.io` |

## Step 7: Wait for DNS Propagation

Takes 5 minutes to 48 hours. Once done, `https://yourdomain.com` will serve your site.

---

**Total cost:** ~$8-12/year for the domain. GitHub Pages hosting is free.
