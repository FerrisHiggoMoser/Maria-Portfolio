# Maria Papatheodorou — portfolio

A self-contained portfolio site. No build step, no framework, no webfonts, no tracking.
Open `index.html` in any browser and it works — from a USB stick, from a folder, or from a web host.

```
.
├── index.html              the page itself (all written text lives here)
├── assets/
│   ├── artworks.js         ← the list of artworks: the only file to edit when adding work
│   ├── styles.css          typography and layout
│   └── site.js             rendering and the lightbox
├── images/
│   ├── acrylics/           ← 9 paintings
│   ├── paper/              ← 9 drawings
│   ├── applied/            ← chair, tote bag
│   ├── jewellery/          ← empty, waiting for photographs
│   ├── aquarelle/          ← empty, waiting for photographs
│   ├── tempera/            ← empty, waiting for photographs
│   └── portrait/           maria.jpg (About) and studio.jpg (Working method)
├── documents/              cv.pdf, price list, portfolio PDF
└── tools/prepare-images.sh batch-resize originals for the web
```

## Adding artworks

1. Put the photograph in the matching folder, e.g. `images/acrylics/harbour.jpg`.
2. Open `assets/artworks.js` and fill in the entry:

```js
{
  image:  "images/acrylics/harbour.jpg",
  title:  "Harbour, Late Light",
  year:   "2024",
  medium: "Acrylic on linen",
  size:   "80 × 100 cm",
  note:   "Private collection, Thessaloniki",
  alt:    "Harbour at dusk, warm ochres against a grey sea"
}
```

3. Save, reload the page. Order in the list is order on the page — strongest work first.

The six sections are **Jewellery, Acrylics, Works on Paper, Aquarelle, Natural Tempera** and
**Applied Work**. Three of them hold photographs already; Jewellery, Aquarelle and Tempera are
laid out and waiting. Titles, years and dimensions are blank throughout — they cannot be read off
a photograph, so they are Maria's to fill in. Until then each caption reads
"Title · year · medium · dimensions" as a reminder of what is missing.

Entries left with `image: ""` show an empty frame with the filename it is waiting for, so the
layout is visible before the photographs exist. Add or delete entries freely; the sections
grow and shrink on their own.

## Filling in the written parts

Everything meant to be written is marked in `index.html`:

- `class="blank"` — a ruled space with a grey italic prompt inside. **Delete the whole
  `<span class="hint">…</span>` and write the text in its place.**
- `class="fill"` — a short ruled line (a year, a venue, an email). Put the text between the tags:
  `<dd class="fill">maria@example.com</dd>`.

The sections written for job and residency applications are **Artist statement**, **Working
method**, the four section introductions, **Curriculum** (education, exhibitions, awards,
collections, teaching, press, skills) and **Letter of motivation**. Keep the letter here as a
general draft and adapt a copy for each application.

## Printing to PDF

The page has its own print stylesheet: File → Print → Save as PDF gives a clean submission
document, one section per page, with the navigation and the grey prompts removed. Chrome:
switch off "Headers and footers", switch on "Background graphics".

## Preparing photographs

Full-resolution camera files are far too heavy for a website — 30 MB of originals becomes a page
nobody waits for. Long edge 2000 px at JPEG quality 82 is indistinguishable on screen and lands
around 400–700 KB per image.

With ImageMagick installed:

```bash
tools/prepare-images.sh ~/Desktop/photos-jewellery images/jewellery
```

Or by hand, one folder at a time:

```bash
magick mogrify -path images/acrylics -resize 2000x2000\> -quality 82 -strip ~/originals/*.jpg
```

Keep the untouched originals somewhere else (external drive, Drive, Dropbox) — those are what a
printer or a magazine will ask for.

Photograph the work square-on in even daylight, against a plain wall, and crop to the edge of the
frame. Jewellery reads best on a neutral grey or linen ground with one soft light source.

## Putting it online

- **Netlify Drop** — netlify.com/drop, drag the `maria-portfolio` folder onto the page. Free, live
  in seconds, gives an address that can be pointed at a bought domain later.
- **GitHub Pages** — already wired up. `.github/workflows/pages.yml` publishes the repository on
  every push to `main`, and can also be run by hand from the Actions tab. The address is
  `https://<github-user>.github.io/maria-portfolio/`. Nothing is built: the files are uploaded as
  they stand, and every path in them is relative, so they work from that sub-path unchanged.
- **Any web host** — upload the folder by FTP; there is nothing to install.
