# Personal Website with Jekyll Blog & Digital Garden

This website is a complete digital presence built with Jekyll, featuring a blog, microblog, projects showcase, and more.

## Features

- **Modern Homepage**: Clean, modern landing page with hero section and GitHub stats
- **Blog Section**: Long-form articles with full Markdown support
- **Microblog**: Twitter-like feed for quick thoughts and images
- **Project Grid**: Showcase your work with detailed project pages
- **Now Page**: What you're currently focused on (inspired by nownownow.com)
- **Reading List**: Track books you're reading, have finished, or want to read
- **Tools & Stack**: Display the technologies you use
- **Resume/CV**: Professional card-based resume layout
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **GitHub Stats**: Integrated GitHub activity widgets
- **Responsive Design**: Works beautifully on all devices
- **Easy Posting**: Simple Markdown-based workflow

## Quick Start

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

## Customization

### Colors
Edit CSS variables in `style.css`:

```css
:root {
  --link-color: #1C9C94;  /* Primary brand color */
  --link-hover: #147a73;  /* Hover state */
}
```

### Navigation
Edit `_layouts/default.html` to add/remove navigation items.

### Now Page
Edit `now/index.html` to update your current activities and goals.

### Tools Page
Edit `tools/index.html` to list your tech stack.

## Local Development

```bash
# Install dependencies
bundle install --path vendor/bundle

# Build the site
bundle exec jekyll build

# Serve locally with live reload
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Dark Mode

Dark mode is automatically available via the moon/sun icon in the navigation. The preference is saved to localStorage and persists across sessions.

## GitHub Pages Deployment

This site is designed for GitHub Pages. Simply:

1. Push to your repository
2. GitHub Pages will automatically build and deploy
3. Your site will be live at `https://username.github.io`

## File Structure

```
.
├── _config.yml          # Jekyll configuration
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

## Features in Detail

### GitHub Stats
The homepage includes live GitHub statistics using:
- GitHub Readme Stats
- GitHub Streak Stats
- Top Languages

These update automatically and respect dark mode.

### Responsive Design
All pages are fully responsive with breakpoints for:
- Desktop (>768px)
- Tablet (600-768px)
- Mobile (<600px)

### SEO
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

For Jekyll documentation: https://jekyllrb.com/docs/
For GitHub Pages help: https://docs.github.com/en/pages
