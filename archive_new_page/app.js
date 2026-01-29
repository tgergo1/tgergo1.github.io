const postList = document.getElementById("post-list");
const searchInput = document.getElementById("post-search");
const tagFilter = document.getElementById("tag-filter");
const themeToggle = document.getElementById("theme-toggle");

const SOURCE_LABELS = {
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  threads: "Threads"
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric"
});

let allPosts = [];
let activeTag = "all";
let searchTerm = "";

const safeLower = (value) => (value ? value.toLowerCase() : "");

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return dateFormatter.format(date);
};

const dateValue = (value) => {
  if (!value) return 0;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 0;
  return date.getTime();
};

const truncate = (text, max = 160) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
};

const slugify = (value) => safeLower(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const setTheme = (theme) => {
  const normalized = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = normalized;
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", normalized === "dark");
    themeToggle.textContent = normalized === "dark" ? "Light mode" : "Dark mode";
  }
  localStorage.setItem("theme", normalized);
};

const initTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) {
    setTheme(stored);
    return;
  }

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
};

const buildTagFilter = (posts) => {
  const tags = new Set();
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => tags.add(tag));
  });

  const tagList = ["all", ...Array.from(tags).sort()];
  tagFilter.innerHTML = "";

  tagList.forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.tag = tag;
    button.textContent = tag === "all" ? "All" : `#${tag}`;
    if (tag === activeTag) button.classList.add("active");
    button.addEventListener("click", () => {
      activeTag = tag;
      Array.from(tagFilter.querySelectorAll("button")).forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tag === tag);
      });
      renderPosts();
    });
    tagFilter.appendChild(button);
  });
};

const createMetaPill = (label) => {
  const pill = document.createElement("span");
  pill.textContent = label;
  return pill;
};

const buildPost = (post, index) => {
  const article = document.createElement("article");
  article.className = "post";
  article.style.setProperty("--delay", `${index * 60}ms`);
  article.id = `post-${post.id}`;

  if (post.image) {
    article.classList.add("has-image");
    const figure = document.createElement("figure");
    figure.className = "post-media";
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.imageAlt || post.title || "Post image";
    figure.appendChild(img);
    article.appendChild(figure);
  }

  const body = document.createElement("div");
  body.className = "post-body";

  const header = document.createElement("div");
  header.className = "post-header";

  const title = document.createElement("div");
  title.className = "post-title";

  const titleText = post.title || (post.source ? `${SOURCE_LABELS[post.source]} update` : "Note");
  if (post.url) {
    const link = document.createElement("a");
    link.href = post.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = titleText;
    title.appendChild(link);
  } else {
    title.textContent = titleText;
  }

  const meta = document.createElement("div");
  meta.className = "post-meta";

  const time = document.createElement("time");
  time.dateTime = post.date || "";
  time.textContent = formatDate(post.date);
  meta.appendChild(time);

  const typeLabel = post.type === "link" ? "Link" : post.type === "social" ? "Social" : "Note";
  meta.appendChild(createMetaPill(typeLabel));

  if (post.source) {
    meta.appendChild(createMetaPill(SOURCE_LABELS[post.source] || "Social"));
  }

  header.appendChild(title);
  header.appendChild(meta);

  const text = document.createElement("p");
  text.textContent = post.content || "";

  body.appendChild(header);
  body.appendChild(text);

  if (post.url) {
    const link = document.createElement("a");
    link.href = post.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.className = "post-link";
    link.textContent = "Open link";
    body.appendChild(link);
  }

  if (post.tags && post.tags.length) {
    const tagRow = document.createElement("div");
    tagRow.className = "post-tags";
    post.tags.forEach((tag) => {
      const pill = document.createElement("span");
      pill.className = "post-tag";
      pill.textContent = `#${tag}`;
      tagRow.appendChild(pill);
    });
    body.appendChild(tagRow);
  }

  article.appendChild(body);
  return article;
};

const matchesFilters = (post) => {
  const tagMatch = activeTag === "all" || (post.tags || []).includes(activeTag);
  if (!tagMatch) return false;

  if (!searchTerm) return true;
  const haystack = [post.title, post.content, post.source, ...(post.tags || [])]
    .map(safeLower)
    .join(" ");
  return haystack.includes(searchTerm);
};

const renderPosts = () => {
  const filtered = allPosts
    .slice()
    .sort((a, b) => dateValue(b.date) - dateValue(a.date))
    .filter(matchesFilters);

  postList.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "post";
    empty.textContent = "No posts match your filter yet.";
    postList.appendChild(empty);
    return;
  }

  filtered.forEach((post, index) => {
    postList.appendChild(buildPost(post, index));
  });
};

const readInlineJson = (id) => {
  if (!id) return null;
  const node = document.getElementById(id);
  if (!node) return null;
  try {
    return JSON.parse(node.textContent);
  } catch (error) {
    return null;
  }
};

const loadJson = async (path, inlineId) => {
  const inline = readInlineJson(inlineId);
  if (window.location.protocol === "file:" && inline) {
    return inline;
  }

  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return inline;
  }
};

const stripHtml = (html = "") => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const buildBlueskyUrl = (handle = "") => {
  const clean = handle.replace(/^@/, "").trim();
  if (!clean) return "https://bsky.app";
  return `https://bsky.app/profile/${clean}`;
};

const parseBlueskyItems = (data) => {
  if (!data || !Array.isArray(data.feed)) return [];
  return data.feed.map((entry) => {
    const post = entry.post || {};
    const text = post.record?.text || "";
    const uri = post.uri || "";
    const author = post.author?.handle || "";
    const rkey = uri.split("/").pop();
    const url = author && rkey ? `https://bsky.app/profile/${author}/post/${rkey}` : "https://bsky.app";
    return {
      text,
      url,
      date: post.indexedAt
    };
  });
};

const buildProxyUrl = (url, proxy) => {
  if (!proxy || !url) return url;
  if (proxy.includes("{url}")) {
    return proxy.replace("{url}", encodeURIComponent(url));
  }
  if (proxy.endsWith("=")) {
    return `${proxy}${encodeURIComponent(url)}`;
  }
  return `${proxy}${url}`;
};

const fetchJson = async (url, proxy) => {
  const response = await fetch(buildProxyUrl(url, proxy));
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
};

const fetchText = async (url, proxy) => {
  const response = await fetch(buildProxyUrl(url, proxy));
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.text();
};

const loadBluesky = async (config, cache, limit, preferCache = false, proxy) => {
  const fallback = Array.isArray(cache) ? cache : [];
  const profileUrl = config?.profileUrl || buildBlueskyUrl(config?.handle || "");

  if (!config || !config.handle) {
    return { items: fallback.slice(0, limit), profileUrl };
  }

  if (preferCache) {
    return { items: fallback.slice(0, limit), profileUrl };
  }

  const endpoint = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${encodeURIComponent(config.handle)}&limit=${limit}`;
  try {
    const data = await fetchJson(endpoint, proxy);
    const items = parseBlueskyItems(data).slice(0, limit);
    return { items, profileUrl: config.profileUrl || buildBlueskyUrl(config.handle) };
  } catch (error) {
    return { items: fallback.slice(0, limit), profileUrl };
  }
};

const parseMastodonHandle = (handle = "", instance = "") => {
  const clean = handle.replace(/^@/, "").trim();
  if (!clean && !instance) return { username: "", instance: "" };
  const parts = clean.split("@");
  if (parts.length === 2) {
    return { username: parts[0], instance: parts[1] };
  }
  return { username: clean, instance };
};

const buildMastodonUrl = (handle = "", instance = "") => {
  const { username, instance: server } = parseMastodonHandle(handle, instance);
  if (!username || !server) return "https://mastodon.social";
  return `https://${server}/@${username}`;
};

const loadMastodon = async (config, cache, limit, preferCache = false, proxy) => {
  const fallback = Array.isArray(cache) ? cache : [];
  const profileUrl = config?.profileUrl || buildMastodonUrl(config?.handle || "", config?.instance || "");
  const { username, instance } = parseMastodonHandle(config?.handle || "", config?.instance || "");

  if (!username || !instance) {
    return { items: fallback.slice(0, limit), profileUrl };
  }

  if (preferCache) {
    return { items: fallback.slice(0, limit), profileUrl };
  }

  const base = `https://${instance}`;
  try {
    const account = await fetchJson(
      `${base}/api/v1/accounts/lookup?acct=${encodeURIComponent(username)}`,
      proxy
    );
    const data = await fetchJson(
      `${base}/api/v1/accounts/${account.id}/statuses?limit=${limit}&exclude_reblogs=true`,
      proxy
    );

    const items = (Array.isArray(data) ? data : []).map((status) => ({
      text: stripHtml(status.content || ""),
      url: status.url,
      date: status.created_at
    }));

    return { items: items.slice(0, limit), profileUrl: config.profileUrl || `${base}/@${username}` };
  } catch (error) {
    return { items: fallback.slice(0, limit), profileUrl };
  }
};

const parseRssItems = (rssText) => {
  if (!rssText) return [];
  const doc = new DOMParser().parseFromString(rssText, "application/xml");
  const items = Array.from(doc.querySelectorAll("item"));
  if (items.length) {
    return items.map((item) => ({
      text: stripHtml(item.querySelector("title")?.textContent || item.querySelector("description")?.textContent || ""),
      url: item.querySelector("link")?.textContent || "",
      date: item.querySelector("pubDate")?.textContent || ""
    }));
  }

  const entries = Array.from(doc.querySelectorAll("entry"));
  return entries.map((entry) => {
    const linkNode = entry.querySelector("link");
    const link = linkNode?.getAttribute("href") || linkNode?.textContent || "";
    const content = entry.querySelector("summary")?.textContent || entry.querySelector("content")?.textContent || "";
    return {
      text: stripHtml(entry.querySelector("title")?.textContent || content || ""),
      url: link,
      date: entry.querySelector("updated")?.textContent || entry.querySelector("published")?.textContent || ""
    };
  });
};

const buildThreadsRssUrl = (handle = "") => {
  const clean = handle.replace(/^@/, "").trim();
  if (!clean) return "";
  return `https://rss-bridge.org/bridge01/?action=display&bridge=ThreadsBridge&u=${encodeURIComponent(clean)}&format=Atom`;
};

const loadThreads = async (config, cache, limit, preferCache = false, proxy) => {
  const fallback = Array.isArray(cache) ? cache : [];
  const profileUrl = config?.profileUrl || "https://www.threads.com";
  const rssUrl = config?.rssUrl || buildThreadsRssUrl(config?.handle || "");

  if (!config || !rssUrl) {
    return { items: fallback.slice(0, limit), profileUrl };
  }

  if (preferCache) {
    return { items: fallback.slice(0, limit), profileUrl };
  }

  try {
    const text = await fetchText(rssUrl, proxy);
    const items = parseRssItems(text).slice(0, limit);
    return { items, profileUrl };
  } catch (error) {
    return { items: fallback.slice(0, limit), profileUrl };
  }
};

const toSocialPosts = (items, source) => {
  return (items || []).map((item, index) => {
    const idBase = slugify(`${source}-${item.date || index}`) || `${source}-${index}`;
    return {
      id: `social-${idBase}`,
      date: item.date,
      type: "social",
      source,
      title: SOURCE_LABELS[source],
      content: truncate(item.text || "", 220),
      url: item.url,
      tags: ["social", source]
    };
  });
};

const updateSocialLinks = (links) => {
  Object.entries(links).forEach(([key, url]) => {
    const anchor = document.querySelector(`[data-social="${key}"]`);
    if (anchor && url) {
      anchor.href = url;
    }
  });
};

const loadPostsData = async () => {
  const data = await loadJson("posts.json", "posts-data");
  return Array.isArray(data?.posts) ? data.posts : [];
};

const loadSocialData = async () => {
  const config = await loadJson("social.json", "social-data");
  const cache = (await loadJson("social-cache.json", "social-cache-data")) || {};
  if (!config) return [];

  const limit = config.limit || 3;
  const corsProxy = config.corsProxy || "";
  const preferCache = config.preferCache === true;
  const threadsEnabled = Boolean(config.threads?.rssUrl || config.threads?.handle || config.threads?.profileUrl);
  const [bluesky, mastodon] = await Promise.all([
    loadBluesky(config.bluesky, cache.bluesky, limit, preferCache, corsProxy),
    loadMastodon(config.mastodon, cache.mastodon, limit, preferCache, corsProxy)
  ]);
  const threads = threadsEnabled
    ? await loadThreads(config.threads, cache.threads, limit, preferCache, corsProxy)
    : { items: [], profileUrl: config.threads?.profileUrl || "https://www.threads.com" };

  updateSocialLinks({
    bluesky: bluesky.profileUrl,
    mastodon: mastodon.profileUrl,
    threads: threads.profileUrl
  });

  const socialPosts = [
    ...toSocialPosts(bluesky.items, "bluesky"),
    ...toSocialPosts(mastodon.items, "mastodon")
  ];

  if (threadsEnabled) {
    socialPosts.push(...toSocialPosts(threads.items, "threads"));
  }

  return socialPosts;
};

const initialize = async () => {
  const [basePosts, socialPosts] = await Promise.all([loadPostsData(), loadSocialData()]);
  allPosts = [...basePosts, ...socialPosts];
  buildTagFilter(allPosts);
  renderPosts();
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const value = event.target.value.trim().replace(/^#/, "");
    searchTerm = safeLower(value);
    renderPosts();
  });
}

initTheme();
initialize();
