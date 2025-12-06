# GitHub Pages Deployment Guide

This site is ready to deploy on GitHub Pages with Jekyll support.

## Automatic Deployment

GitHub Pages will automatically build and deploy this Jekyll site when you push to the main branch.

## Configuration for GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select the branch (usually `main`)
5. Keep the folder as `/ (root)`
6. Click "Save"

GitHub will automatically detect the Jekyll configuration and build your site.

## Important Notes

### Jekyll Plugins
GitHub Pages supports these Jekyll plugins by default:
- jekyll-feed (for RSS feeds) ✓
- jekyll-seo-tag (for SEO metadata) ✓

Both are already configured in this project.

### Build Settings
The `_config.yml` file contains all necessary settings for GitHub Pages:
- `url`: Set to your GitHub Pages URL
- `baseurl`: Empty string (for user/org pages)
- `markdown`: kramdown (GitHub Pages default)

### What Gets Deployed
GitHub Pages will automatically:
1. Install Jekyll dependencies
2. Build your site using `jekyll build`
3. Deploy the `_site` directory contents
4. Update your site at `https://yourusername.github.io`

### What NOT to Deploy
The following are automatically ignored (via `.gitignore`):
- `_site/` - Build output
- `vendor/` - Ruby gems
- `.jekyll-cache/` - Build cache
- `Gemfile.lock` - May differ between systems

## Testing Before Deployment

Always test locally before pushing:

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview your changes.

## Troubleshooting

### Build Fails on GitHub Pages
1. Check the "Actions" tab in your repository for build logs
2. Ensure all front matter is valid YAML
3. Verify image paths are correct
4. Check that post filenames follow `YYYY-MM-DD-title.md` format

### Site Not Updating
1. Check repository settings → Pages → Build status
2. Wait a few minutes after pushing (builds take 1-5 minutes)
3. Clear browser cache or try incognito mode

### Custom Domain
If using a custom domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS records with your domain provider
3. Update `url` in `_config.yml` to your custom domain

## Performance Tips

- Optimize images before uploading (recommended max width: 1200px)
- Use JPG for photos, PNG for graphics with transparency
- Keep individual posts under 10,000 words for fast loading

## Support

For Jekyll documentation: https://jekyllrb.com/docs/
For GitHub Pages help: https://docs.github.com/en/pages
