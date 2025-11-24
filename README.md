# Personal Website with Jekyll Blog & Digital Garden

A clean, minimal academic-style digital garden built with Jekyll. Features a blog, microblog, projects showcase, and professional dark mode support.

## Features

- **Clean Design**: Minimal, academic-style aesthetic inspired by research personal sites
- **Blog Section**: Long-form articles with full Markdown support
- **Microblog**: Twitter-like feed for quick thoughts and images
- **Project Grid**: Showcase your work with detailed project pages
- **Now Page**: What you're currently focused on (inspired by nownownow.com)
- **Reading List**: Track books you're reading, have finished, or want to read
- **Tools & Stack**: Display the technologies you use
- **Resume/CV**: Professional card-based resume layout
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Responsive Design**: Works beautifully on all devices
- **Easy Posting**: Simple Markdown-based workflow

## Quick Start

### Prerequisites

- Ruby 3.0 or higher
- Bundler gem (`gem install bundler`)

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tgergo1/tgergo1.github.io.git
   cd tgergo1.github.io
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```
   
   Or if you prefer to install gems locally:
   ```bash
   bundle install --path vendor/bundle
   ```

3. **Build the site**:
   ```bash
   bundle exec jekyll build
   ```
   
   The site will be generated in the `_site` directory.

4. **Serve the site locally**:
   ```bash
   bundle exec jekyll serve
   ```
   
   Or with live reload:
   ```bash
   bundle exec jekyll serve --livereload
   ```

5. **View the site**:
   Open your browser to [http://localhost:4000](http://localhost:4000)

### Troubleshooting Local Development

**Issue: `bundle: command not found`**
```bash
gem install bundler
```

**Issue: Permission errors when installing gems**
```bash
bundle install --path vendor/bundle
```

**Issue: Jekyll not found after installing**
```bash
bundle exec jekyll serve
```
Always use `bundle exec` to ensure you're using the correct gem versions.

## Deployment to GitHub Pages

This site is configured to deploy automatically to GitHub Pages.

### How it Works

1. **Automatic Build**: When you push to the `main` branch, GitHub Pages automatically detects the Jekyll site and builds it
2. **No Action Required**: GitHub Pages runs `jekyll build` on their servers
3. **Live in Minutes**: Your site will be live at `https://username.github.io` within a few minutes

### GitHub Pages Configuration

The site is already configured for GitHub Pages:

- ✅ Jekyll 4.4 compatible
- ✅ Only approved plugins (`jekyll-feed`, `jekyll-seo-tag`)
- ✅ Proper `_config.yml` settings
- ✅ No custom plugins that would break GitHub Pages

### Repository Settings

To enable GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**

GitHub Pages will automatically build and deploy your site.

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the root of your repository with your domain name:
   ```
   example.com
   ```
2. Configure your DNS provider to point to GitHub Pages:
   ```
   A record: 185.199.108.153
   A record: 185.199.109.153
   A record: 185.199.110.153
   A record: 185.199.111.153
   ```

## Adding Content


### Adding Content

#### Blog Posts
Create a file in `_posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-11-24 10:00:00 +0100
tags: [AI, technology]
image: /img/your-image.jpg
---

Your long-form content here...
```

#### Microblog Posts
Create a file in `_microblog/` named `YYYY-MM-DD-title.md`:

```markdown
---
layout: microblog
date: 2025-11-24 14:30:00 +0100
tags: [thoughts, life]
image: /img/your-image.jpg
---

Quick thought or update here (280 characters or less recommended)
```

#### Projects
Create a file in `_projects/` named `project-slug.md`:

```markdown
---
layout: project
title: "Project Name"
tagline: "One-line description"
tech_stack: [Python, TensorFlow, Docker]
github: https://github.com/username/repo
demo: https://demo-url.com
image: /img/project.jpg
---

Detailed project description...
```

#### Books
Create a file in `_books/` named `book-slug.md`:

```markdown
---
layout: book
title: "Book Title"
author: "Author Name"
status: "reading" # or "finished" or "want"
rating: 5 # 1-5 stars (for finished books)
date_finished: 2023-06-15
cover: /img/book-cover.jpg
tags: [category, topic]
---

Your thoughts and notes on the book...
```

## Workflow

### Typical Development Workflow

1. **Create content** (blog post, microblog, project, etc.)
2. **Test locally**: `bundle exec jekyll serve`
3. **Preview** at http://localhost:4000
4. **Commit changes**: `git add .` and `git commit -m "Add new post"`
5. **Push to GitHub**: `git push origin main`
6. **Wait 1-2 minutes** for GitHub Pages to build and deploy

### Quick Commands

```bash
# Start local server
bundle exec jekyll serve

# Start with live reload
bundle exec jekyll serve --livereload

# Build only (no server)
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean

# Build with drafts visible
bundle exec jekyll serve --drafts
```

## Customization


### Colors
Edit CSS variables in `style.css`:

```css
:root {
  --accent: #2d6a4f;  /* Primary brand color */
  --accent-light: #52b788;  /* Hover state */
}
```

### Navigation
Edit `_layouts/default.html` to add/remove navigation items.

### Personal Info
Update these files with your information:
- `_config.yml` - Site title, description, email, social links
- `index.html` - Hero section bio
- `now/index.html` - Current activities and goals
- `tools/index.html` - Tech stack
- `resume/index.html` - Professional experience

## Local Development

```bash
# Install dependencies
bundle install --path vendor/bundle

# Build the site
bundle exec jekyll build

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Visit http://localhost:4000
```

## Dark Mode

Dark mode is automatically available via the moon/sun icon in the navigation. The preference is saved to localStorage and persists across sessions.

## File Structure

```
.
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── _layouts/            # Page templates
│   ├── default.html     # Base layout with nav and dark mode
│   ├── blog.html        # Blog feed
│   ├── post.html        # Individual blog post
│   ├── microblog.html   # Microblog post
│   ├── project.html     # Project detail
│   └── book.html        # Book review
├── _posts/              # Blog posts
├── _microblog/          # Microblog posts
├── _projects/           # Project pages
├── _books/              # Reading list
├── blog/                # Blog index
├── microblog/           # Microblog index
├── projects/            # Projects grid
├── reading/             # Reading list
├── now/                 # Now page
├── tools/               # Tools & stack
├── resume/              # Resume/CV
├── img/                 # Images
├── style.css            # Styles with dark mode
└── index.html           # Homepage
```

## Responsive Design
All pages are fully responsive with breakpoints for:
- Desktop (>768px)
- Tablet (600-768px)
- Mobile (<600px)

## SEO
Built-in SEO optimization with:
- jekyll-seo-tag plugin
- jekyll-feed for RSS
- Proper meta tags
- Semantic HTML

## Tips

- Keep microblog posts short (like tweets)
- Use high-quality images (recommended: 1200px wide)
- Tag content consistently for better organization
- Update your Now page monthly
- Link projects to GitHub repositories when possible

## Support

- Jekyll documentation: https://jekyllrb.com/docs/
- GitHub Pages help: https://docs.github.com/en/pages
- Issues: https://github.com/tgergo1/tgergo1.github.io/issues
