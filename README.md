# Personal Website with Jekyll Blog

This website is built with Jekyll, a static site generator that allows you to create blog posts using simple Markdown files.

## Features

- **Personal Portfolio**: Showcases skills, experience, education, and news
- **Blog Section**: Twitter-like feed for posting articles and images
- **Jekyll-Powered**: Easy content management with Markdown
- **Responsive Design**: Works on desktop and mobile devices
- **Clean, Modern UI**: Aesthetic card-based design for blog posts

## How to Add a New Blog Post

1. Create a new Markdown file in the `_posts` directory
2. Name it following the format: `YYYY-MM-DD-title-of-post.md`
3. Add front matter at the top of the file:

```markdown
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0100
tags: [tag1, tag2, tag3]
image: /img/your-image.jpg  # Optional
---

Your post content goes here in Markdown format...
```

### Example Post

Create a file named `_posts/2025-11-25-my-new-article.md`:

```markdown
---
layout: post
title: "My New Article"
date: 2025-11-25 10:00:00 +0100
tags: [technology, AI, innovation]
image: /img/my-image.jpg
---

## Introduction

This is my new article about technology...

### Key Points

- Point 1
- Point 2
- Point 3

You can include images, links, code blocks, and more!
```

## Markdown Formatting

You can use standard Markdown in your posts:

- **Bold text**: `**bold**`
- *Italic text*: `*italic*`
- [Links](url): `[text](url)`
- Images: `![alt text](image-url)`
- Headers: `## Header 2`, `### Header 3`
- Lists: Use `-` or `1.` for lists
- Code: Use backticks `` `code` `` for inline code
- Code blocks: Use triple backticks with language

## Local Development

To run the site locally:

```bash
# Install dependencies
bundle install --path vendor/bundle

# Build and serve the site
bundle exec jekyll serve

# Visit http://localhost:4000 in your browser
```

## GitHub Pages

This site is designed to work with GitHub Pages. Simply push your changes to the main branch, and GitHub will automatically build and deploy your site.

## Directory Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
│   ├── default.html     # Base layout with navigation
│   ├── blog.html        # Blog feed layout
│   └── post.html        # Individual post layout
├── _posts/              # Blog posts (Markdown files)
├── blog/                # Blog index page
├── img/                 # Images
├── style.css            # Styles
├── index.html           # Homepage
└── README.md            # This file
```

## Customization

### Changing Colors

Edit `style.css` and look for the color values in the blog styles section (around line 290+). The main brand color is `#1C9C94`.

### Adding Images

1. Add images to the `img/` directory
2. Reference them in posts using `/img/filename.jpg`

### Modifying Navigation

Edit `_layouts/default.html` to add or remove navigation items.

## Support

For issues or questions, refer to the [Jekyll documentation](https://jekyllrb.com/docs/).
