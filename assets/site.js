/* ============================================================
   Rendering for the portfolio. Plain JavaScript, no build step,
   no dependencies — the page works from a file:// path or from
   any web host. You should not need to edit this file; add work
   in assets/artworks.js instead.
   ============================================================ */

(function () {
  "use strict";

  var LINE = 1.75; /* rem — must match the ruling in styles.css */
  var data = window.PORTFOLIO || {};
  var lightboxItems = [];

  /* ---------- helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function join(parts, separator) {
    return parts.filter(function (p) { return p && String(p).trim(); }).join(separator);
  }

  /* ---------- captions ---------- */

  function buildCaption(work) {
    var caption = el("figcaption", "caption");
    var hasText = false;

    if (work.title) {
      var title = el("span", "title", work.title);
      caption.appendChild(title);
      hasText = true;
    }

    var meta = join([work.year, work.medium, work.size], " · ");
    if (meta) {
      caption.appendChild(el("span", "meta", meta));
      hasText = true;
    }

    if (work.note) {
      caption.appendChild(el("span", "note", work.note));
      hasText = true;
    }

    if (!hasText) {
      var pending = el("span", "meta", "Title · year · medium · dimensions");
      caption.appendChild(pending);
    }

    return caption;
  }

  function captionLine(work) {
    return join([work.title, join([work.year, work.medium, work.size], " · ")], " — ");
  }

  /* ---------- galleries ---------- */

  function buildPlate(work, index, section) {
    var figure = el("figure", "plate");
    var frame = el("div", "plate-frame");

    if (work.image) {
      var img = el("img");
      img.src = work.image;
      img.alt = work.alt || work.title || "Artwork by Maria Papatheodorou";
      img.loading = "lazy";
      img.decoding = "async";
      frame.appendChild(img);
      frame.classList.add("is-clickable");
      frame.setAttribute("role", "button");
      frame.setAttribute("tabindex", "0");

      var entry = { src: work.image, caption: captionLine(work), note: work.note || "" };
      lightboxItems.push(entry);
      var position = lightboxItems.length - 1;

      frame.addEventListener("click", function () { openLightbox(position); });
      frame.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(position);
        }
      });
    } else {
      frame.setAttribute("data-empty", "");
      var label = el("span", "frame-note");
      label.innerHTML =
        "Empty frame " + (index + 1) + "<br /><em>" +
        (work.slot || "images/" + section + "/" + (index + 1) + ".jpg") +
        "</em>";
      frame.appendChild(label);
    }

    figure.appendChild(frame);
    figure.appendChild(buildCaption(work));
    return figure;
  }

  function renderGalleries() {
    var galleries = document.querySelectorAll(".gallery[data-section]");
    Array.prototype.forEach.call(galleries, function (gallery) {
      var section = gallery.getAttribute("data-section");
      var works = data[section] || [];
      works.forEach(function (work, index) {
        gallery.appendChild(buildPlate(work, index, section));
      });
    });
  }

  /* ---------- blanks ---------- */

  function sizeBlanks() {
    var blanks = document.querySelectorAll(".blank[data-lines]");
    Array.prototype.forEach.call(blanks, function (blank) {
      var lines = parseInt(blank.getAttribute("data-lines"), 10);
      if (lines > 0) blank.style.minHeight = (lines * LINE) + "rem";
    });
  }

  /* ---------- portrait, if the photograph has been added ---------- */

  function loadPortrait() {
    var frame = document.querySelector(".portrait-frame[data-empty]");
    if (!frame) return;
    var probe = new Image();
    probe.onload = function () {
      frame.removeAttribute("data-empty");
      frame.innerHTML = "";
      probe.alt = "Maria Papatheodorou";
      frame.appendChild(probe);
    };
    probe.src = "images/portrait/maria.jpg";
  }

  /* ---------- lightbox ---------- */

  var lightbox = document.getElementById("lightbox");
  var lbImage = lightbox.querySelector(".lb-image");
  var lbCaption = lightbox.querySelector(".lb-caption");
  var current = 0;
  var lastFocus = null;

  function showItem(index) {
    if (!lightboxItems.length) return;
    current = (index + lightboxItems.length) % lightboxItems.length;
    var item = lightboxItems[current];
    lbImage.src = item.src;
    lbImage.alt = item.caption || "Artwork";
    lbCaption.innerHTML = "";
    if (item.caption) lbCaption.appendChild(document.createTextNode(item.caption));
    if (item.note) lbCaption.appendChild(el("span", "meta", item.note));
  }

  function openLightbox(index) {
    lastFocus = document.activeElement;
    showItem(index);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lb-close").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImage.removeAttribute("src");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lb-prev").addEventListener("click", function () { showItem(current - 1); });
  lightbox.querySelector(".lb-next").addEventListener("click", function () { showItem(current + 1); });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.classList.contains("lb-figure")) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showItem(current - 1);
    if (event.key === "ArrowRight") showItem(current + 1);
  });

  /* ---------- the menu (phones): a panel that slides in from the side ---------- */

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("sitenav");
  var backdrop = document.querySelector(".nav-backdrop");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    backdrop.classList.toggle("show", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle && nav && backdrop) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("open"));
    });
    backdrop.addEventListener("click", function () { setMenu(false); });
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) setMenu(false);
    });
  }

  /* ---------- go ---------- */

  renderGalleries();
  sizeBlanks();
  loadPortrait();

})();
