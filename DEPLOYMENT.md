# 🚀 Quick Deployment Guide

## Step 1: Prepare Your Repository

1. **Fork or clone this repository**
2. **Customize your content**:
   - Run `./setup.sh` for quick setup
   - Or manually edit `data/profile.json` and `data/affiliates.json`
3. **Add your images**:
   - Replace `assets/images/profile.jpg` with your photo
   - Add product images referenced in `affiliates.json`

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The site will automatically deploy when you push to main branch

## Step 3: Custom Domain (Optional)

1. Buy a domain from any registrar
2. In your repo settings, add your domain under **Pages** → **Custom domain**
3. Create a CNAME file in your repo root with your domain name
4. Configure DNS records at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

## Step 4: Verify Deployment

1. Check the **Actions** tab to see deployment status
2. Visit `https://yourusername.github.io/repository-name`
3. Test on mobile devices for responsive design

## Common Issues

### Deployment Failed
- Check the Actions tab for error details
- Ensure all JSON files are valid
- Verify image paths exist

### Images Not Loading
- Check file paths in JSON files
- Ensure images are in correct directory
- Use lowercase filenames

### Site Not Updating
- Clear browser cache
- Wait 5-10 minutes for GitHub Pages to update
- Check if commit triggered the action

## 🎯 Quick Checklist

- [ ] Personal info updated in `data/profile.json`
- [ ] Affiliate products added to `data/affiliates.json`
- [ ] Profile image added as `assets/images/profile.jpg`
- [ ] Product images added to `assets/images/`
- [ ] GitHub Pages enabled in repository settings
- [ ] First deployment successful
- [ ] Site tested on mobile device
- [ ] Social links working correctly
- [ ] Affiliate links working correctly

## Performance Tips

1. **Optimize images** before uploading (use tools like TinyPNG)
2. **Keep file sizes small** (under 500KB per image)
3. **Test load speed** on 3G connection
4. **Validate HTML/CSS** for errors

Your site should be live within 5-10 minutes of enabling GitHub Pages!