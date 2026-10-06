(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================
     SITE DEPTH — the site now has pages at three different
     folder depths (root, pages/, pages/blog/), but js/data.js
     always stores asset paths the simple way ("assets/x.jpg").
     This works out, from the current URL alone, how many
     "../" to prepend so those paths resolve correctly no
     matter which page is rendering them.
     ========================================================== */

  function computeSiteDepth() {
    const path = window.location.pathname;
    if (/\/pages\/blog\/[^/]+\.html?$/.test(path)) return "../../";
    if (/\/pages\/[^/]+\.html?$/.test(path)) return "../";
    return "";
  }
  const SITE_DEPTH = computeSiteDepth();

  function assetPath(p) {
    return p ? SITE_DEPTH + p : p;
  }

  /* ---------- small helpers ---------- */

  const TONES = ["#0056B3", "#003D82", "#3E7DCB", "#00306B", "#5B9BE8"];

  function toneFor(id) {
    return TONES[id % TONES.length];
  }

  function initialsOf(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00Z");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  }

  const ICONS = {
    linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M7.8 10v6.2M7.8 7.7v.01M12 16.2v-3.6c0-1.3.9-2.3 2.1-2.3 1.2 0 1.9.9 1.9 2.3v3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    instagram: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
    email: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M4 6.5l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  function socialLink(href, label, iconSvg) {
    const a = document.createElement("a");
    a.href = href;
    if (href.indexOf("mailto:") !== 0) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.setAttribute("aria-label", label);
    a.innerHTML = iconSvg; // static, author-authored SVG only — never user input
    return a;
  }

  /* ==========================================================
     HEADER: sticky shadow + mobile nav toggle. Runs on every page.
     ========================================================== */

  function initHeader() {
    const header = document.getElementById("siteHeader");
    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("no-scroll", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
        toggle.focus();
      }
    });
  }

  /* ==========================================================
     TEAM — renders team.html's grid from js/data.js
     ========================================================== */

  function renderTeam() {
    const grid = document.getElementById("teamGrid");
    if (!grid || typeof TEAM_MEMBERS === "undefined") return;

    const frag = document.createDocumentFragment();

    TEAM_MEMBERS.forEach((member) => {
      const card = el("article", "team-card");

      const photoWrap = el("div", "team-photo");
      if (member.photo) {
        const img = el("img");
        img.src = assetPath(member.photo);
        img.alt = member.name;
        img.loading = "lazy";
        img.width = 92;
        img.height = 92;
        img.addEventListener("error", () => {
          photoWrap.innerHTML = "";
          photoWrap.style.background = toneFor(member.id);
          photoWrap.appendChild(el("span", "team-initials", initialsOf(member.name)));
        }, { once: true });
        photoWrap.appendChild(img);
      } else {
        photoWrap.style.background = toneFor(member.id);
        photoWrap.appendChild(el("span", "team-initials", initialsOf(member.name)));
      }

      card.appendChild(photoWrap);
      card.appendChild(el("h3", "team-name", member.name));
      card.appendChild(el("p", "team-position", member.position));

      const socials = member.socials || {};
      const hasAnySocial = Object.values(socials).some((v) => v && v.trim());
      if (hasAnySocial) {
        const row = el("div", "team-socials");
        if (socials.linkedin) row.appendChild(socialLink(socials.linkedin, `${member.name} on LinkedIn`, ICONS.linkedin));
        if (socials.instagram) row.appendChild(socialLink(socials.instagram, `${member.name} on Instagram`, ICONS.instagram));
        if (socials.email) row.appendChild(socialLink(`mailto:${socials.email}`, `Email ${member.name}`, ICONS.email));
        card.appendChild(row);
      }

      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  /* ==========================================================
     GALLERY — renders gallery.html's grid + lightbox
     ========================================================== */

  function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid || typeof GALLERY_ITEMS === "undefined") return;

    const frag = document.createDocumentFragment();

    GALLERY_ITEMS.forEach((item, idx) => {
      const tile = el("button", "gallery-tile");
      tile.type = "button";
      tile.setAttribute("aria-label", `Open photo: ${item.caption}`);

      if (item.src) {
        const img = el("img");
        img.src = assetPath(item.src);
        img.alt = item.caption;
        img.loading = "lazy";
        tile.appendChild(img);
      } else {
        tile.classList.add("gallery-tile--placeholder");
        tile.style.setProperty("--tile-tone", toneFor(idx));
        tile.appendChild(el("span", "gallery-tile-label", item.caption));
      }

      tile.addEventListener("click", () => openLightbox(item));
      frag.appendChild(tile);
    });

    grid.appendChild(frag);
  }

  let lastFocused = null;

  function openLightbox(item) {
    const lightbox = document.getElementById("lightbox");
    const frame = document.getElementById("lightboxFrame");
    const caption = document.getElementById("lightboxCaption");
    if (!lightbox || !frame || !caption) return;

    frame.innerHTML = "";
    if (item.src) {
      const img = el("img");
      img.src = assetPath(item.src);
      img.alt = item.caption;
      frame.appendChild(img);
    } else {
      const placeholder = el("div", "lightbox-placeholder");
      placeholder.style.setProperty("--tile-tone", toneFor(item.id));
      frame.appendChild(placeholder);
    }
    caption.textContent = item.caption;

    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    document.getElementById("lightboxClose").focus();
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  }

  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.getElementById("lightboxClose");
    if (!lightbox || !closeBtn) return;

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ==========================================================
     BLOG LISTING — renders blog.html's cards + pagination from
     js/data.js, newest post first. Page size is controlled by
     BLOG_PAGE_SIZE below.
     ========================================================== */

  const BLOG_PAGE_SIZE = 6;
  const EXCERPT_LIMIT = 140;

  function renderBlogList() {
    const grid = document.getElementById("blogGrid");
    if (!grid || typeof BLOG_POSTS === "undefined") return;

    const sorted = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const totalPages = Math.max(1, Math.ceil(sorted.length / BLOG_PAGE_SIZE));

    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get("page"), 10);
    if (!Number.isFinite(page) || page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const start = (page - 1) * BLOG_PAGE_SIZE;
    const pagePosts = sorted.slice(start, start + BLOG_PAGE_SIZE);

    if (!pagePosts.length) {
      grid.appendChild(el("p", "blog-empty", "No posts yet — check back soon."));
      return;
    }

    pagePosts.forEach((post, idx) => {
      const postHref = `blog/${post.slug}.html`;

      const card = el("article", "blog-card");

      const media = document.createElement("a");
      media.className = "blog-card-media";
      media.href = postHref;
      if (post.cover) {
        const img = el("img");
        img.src = assetPath(post.cover);
        img.alt = post.title;
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        const placeholder = el("div", "blog-card-media--placeholder");
        placeholder.style.setProperty("--tile-tone", toneFor(idx));
        media.appendChild(placeholder);
      }
      card.appendChild(media);

      const body = el("div", "blog-card-body");
      body.appendChild(el("p", "blog-card-date", formatDate(post.date)));

      const titleEl = el("h3", "blog-card-title");
      const titleLink = document.createElement("a");
      titleLink.href = postHref;
      titleLink.textContent = post.title;
      titleEl.appendChild(titleLink);
      body.appendChild(titleEl);

      const excerptEl = el("p", "blog-card-excerpt");
      excerptEl.dataset.slug = post.slug;
      body.appendChild(excerptEl);

      const readLink = document.createElement("a");
      readLink.className = "blog-card-link";
      readLink.href = postHref;
      readLink.textContent = "Read post →";
      body.appendChild(readLink);

      card.appendChild(body);
      grid.appendChild(card);

      // Pull the excerpt from the post's own first paragraph so it
      // never has to be written twice. Same-origin fetch — works once
      // the site is served over http(s); see README for local preview.
      fetchExcerpt(postHref).then((text) => {
        excerptEl.textContent = text;
      });
    });

    renderPagination(page, totalPages);
  }

  async function fetchExcerpt(postHref) {
    try {
      const res = await fetch(postHref);
      if (!res.ok) throw new Error("fetch failed");
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const firstPara = doc.querySelector(".post-content p");
      if (!firstPara) return "";
      let text = (firstPara.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length > EXCERPT_LIMIT) {
        text = text.slice(0, EXCERPT_LIMIT).replace(/\s+\S*$/, "") + "…";
      }
      return text;
    } catch (err) {
      return "";
    }
  }

  function renderPagination(page, totalPages) {
    const nav = document.getElementById("blogPagination");
    if (!nav || totalPages <= 1) return;

    function pageLink(label, targetPage, opts) {
      opts = opts || {};
      const a = document.createElement("a");
      a.className = "page-link" + (opts.current ? " is-current" : "") + (opts.disabled ? " is-disabled" : "");
      a.href = targetPage === 1 ? "blog.html" : `blog.html?page=${targetPage}`;
      a.textContent = label;
      if (opts.current) a.setAttribute("aria-current", "page");
      if (opts.disabled) a.setAttribute("tabindex", "-1");
      a.setAttribute("aria-label", opts.ariaLabel || `Page ${targetPage}`);
      return a;
    }

    nav.appendChild(pageLink("‹ Prev", Math.max(1, page - 1), { disabled: page === 1, ariaLabel: "Previous page" }));
    for (let p = 1; p <= totalPages; p++) {
      nav.appendChild(pageLink(String(p), p, { current: p === page }));
    }
    nav.appendChild(pageLink("Next ›", Math.min(totalPages, page + 1), { disabled: page === totalPages, ariaLabel: "Next page" }));
  }

  /* ==========================================================
     BLOG POST PAGE — injects the cover image (if any) from
     js/data.js so cover art only has to be set in one place.
     ========================================================== */

  function initPostCover() {
    const coverSlot = document.getElementById("postCover");
    if (!coverSlot || typeof BLOG_POSTS === "undefined") return;

    const slug = window.location.pathname.split("/").pop().replace(/\.html?$/, "");
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (post && post.cover) {
      const img = el("img");
      img.src = assetPath(post.cover);
      img.alt = post.title;
      coverSlot.appendChild(img);
    } else {
      coverSlot.remove();
    }
  }

  /* ==========================================================
     CONTACT — submits the enquiry form via Web3Forms
     ========================================================== */

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const statusBox = document.getElementById("formStatus");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.value) return;

      const accessKey = form.querySelector('input[name="access_key"]').value;
      if (!accessKey || accessKey.indexOf("YOUR_") === 0) {
        showStatus("error", "The form isn't fully set up yet — add a Web3Forms access key in contact.html before this goes live.");
        return;
      }

      submitBtn.disabled = true;
      showStatus("loading", "Sending your message…");

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();

        if (data.success) {
          showStatus("success", "Thanks — your message has been sent. We'll get back to you soon.");
          form.reset();
        } else {
          showStatus("error", "Something went wrong on the sending end. Please try again in a moment.");
        }
      } catch (err) {
        showStatus("error", "Couldn't reach the server — check your connection and try again.");
      } finally {
        submitBtn.disabled = false;
      }
    });

    function showStatus(kind, message) {
      if (!statusBox) return;
      statusBox.className = `form-status is-${kind}`;
      statusBox.textContent = message;
      statusBox.setAttribute("role", kind === "error" ? "alert" : "status");
    }
  }

  /* ==========================================================
     REVEAL ON SCROLL
     ========================================================== */

  function initReveal() {
    const targets = document.querySelectorAll(
      ".team-card, .gallery-tile, .section-head, .highlight-card, .pillar-card, .blog-card"
    );
    if (!targets.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
  }

  /* ---------- misc ---------- */

  function initFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- boot ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    renderTeam();
    renderGallery();
    initLightbox();
    renderBlogList();
    initPostCover();
    initContactForm();
    initReveal();
    initFooterYear();
  });
})();
