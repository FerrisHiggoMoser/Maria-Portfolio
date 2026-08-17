# Maria Papatheodorou — portfolio

**Live site:** https://ferrishiggomoser.github.io/Maria-Portfolio/
**Repository that publishes it:** https://github.com/FerrisHiggoMoser/Maria-Portfolio

A self-contained portfolio site. No build step, no framework, no webfonts, no tracking.
`index.html` opens directly in any browser — from this folder, a USB stick, or the web.
Sections: **Acrylics · Aquarelle · Jewellery · Natural Tempera**, plus About, a CV built
for applications, and Contact. On phones the sections are reached through the ☰ menu.

```
.
├── index.html              the page itself (all written text lives here)
├── assets/
│   ├── artworks.js         ← the list of artworks: the only file to edit when adding work
│   ├── styles.css          typography and layout
│   └── site.js             rendering, lightbox, phone menu
├── images/
│   ├── acrylics/           9 paintings on canvas
│   ├── aquarelle/          9 watercolours
│   ├── jewellery/          empty, waiting for photographs
│   ├── tempera/            empty, work in progress
│   ├── applied/            painted chair and tote bag — photographed, not shown on the page
│   └── portrait/           maria.jpg (About) and studio.jpg (Working method)
├── documents/              put cv.pdf, price list, portfolio PDF here
└── tools/prepare-images.sh batch-resizes camera originals for the web
```

---

## How publishing works

Every push to the `main` branch of the **Maria-Portfolio** repository republishes the
site automatically (GitHub Actions → GitHub Pages, `.github/workflows/pages.yml`).
There is nothing to build or upload by hand: change a file, push (or edit and commit
directly on github.com — that counts as a push), and the site updates in about a minute.
Progress is visible under the repository's **Actions** tab.

## Adding an artwork

1. Put the photograph in the matching folder, e.g. `images/tempera/first-panel.jpg`.
2. Open `assets/artworks.js` and fill in an entry:

```js
{
  image:  "images/tempera/first-panel.jpg",
  title:  "First Panel",
  year:   "2026",
  medium: "Egg tempera on gesso panel",
  size:   "30 × 40 cm",
  note:   "Pigments ground in the studio",
  alt:    "Ochre panel with a seated figure"     // short description for screen readers
}
```

3. Commit/push. Order in the list is order on the page — strongest work first.

Any field may stay `""`; nothing breaks. Entries with `image: ""` show an empty frame
naming the file they are waiting for. Titles, years and dimensions are currently blank
throughout — they cannot be read off a photograph, so they are Maria's to fill in. Until
then each caption reads "Title · year · medium · dimensions" as a reminder.

The painted chair and tote bag photographs are in `images/applied/` but appear nowhere —
they belong to none of the four sections. Add entries pointing at them if wanted.

## Filling in the written parts

Everything meant to be written is marked in `index.html`:

- `class="blank"` — a ruled space with a grey italic prompt. **Delete the whole
  `<span class="hint">…</span>` and write the text in its place.**
- `class="fill"` — a short ruled line (a year, a venue, an email). Put the text between
  the tags: `<dd class="fill">maria@example.com</dd>`.

The parts written for applications: artist statement, working method, the four section
introductions, the whole Curriculum block (education, exhibitions, awards, collections,
teaching, press, skills), the letter-of-motivation draft, and Contact.

## Photographs

Camera originals are too heavy for the web. Resize copies to **2000 px long edge,
JPEG quality ~82** (≈½ MB each) and keep the originals elsewhere — printers and
magazines will want those. With ImageMagick installed:

```bash
tools/prepare-images.sh ~/Desktop/new-photos images/jewellery
```

iPhone HEIC files must become JPEG for the web — the script does that too.
Photograph work square-on in even daylight against a plain wall and crop to the edge
of the piece. Jewellery reads best on a neutral grey or linen ground, one soft light.

## Printing to PDF

File → Print → Save as PDF produces a clean submission document: one section per page,
menus and grey prompts removed. In Chrome switch **off** "Headers and footers" and
**on** "Background graphics".

---

## Working on the site as a team

**Adding a collaborator** (repo owner does this once): repository → **Settings →
Collaborators → Add people** → their GitHub username → role **Write**. They accept the
email invitation and from then on they can edit files, upload photographs, and push —
every push publishes.

**A collaborator can do everything through Claude.** Anyone with write access can open
their own Claude session (claude.ai/code, the Claude Code CLI, or the GitHub app),
connect it to their own GitHub account, point it at this repository and simply ask —
"add these five photos to the jewellery section", "here are the titles and sizes",
"rewrite my artist statement from this draft". Claude sessions are per-person: each
person works from their own account and their own conversation; nothing needs to be
shared beyond the repository itself.

**Uploading without any tools:** github.com → this repository → open the target folder
(e.g. `images/jewellery/`) → **Add file → Upload files** → drag the images in → Commit.
Then edit `assets/artworks.js` in the browser (pencil icon) to add the entries. The
site updates on its own. Resize photos before uploading (see above) — the repository
should not fill up with 8 MB originals.

## Custom domain (Cloudflare)

The domain stays in whichever Cloudflare account owns it; it only needs DNS records
pointing at GitHub. Nothing about the deploy workflow changes, and the github.io
address keeps working alongside.

**In Cloudflare** (the account that holds the domain) — DNS → Records:

| Type  | Name  | Content                      | Proxy status |
|-------|-------|------------------------------|--------------|
| A     | `@`   | `185.199.108.153`            | **DNS only** |
| A     | `@`   | `185.199.109.153`            | **DNS only** |
| A     | `@`   | `185.199.110.153`            | **DNS only** |
| A     | `@`   | `185.199.111.153`            | **DNS only** |
| CNAME | `www` | `ferrishiggomoser.github.io` | **DNS only** |

The orange/grey cloud toggle **must be grey ("DNS only")** — with Cloudflare's proxy
on, GitHub cannot verify the domain and will not issue the HTTPS certificate. Grey is
fine permanently; GitHub serves HTTPS itself. (For a subdomain instead — say
`art.example.com` — a single CNAME `art → ferrishiggomoser.github.io` is enough.)

**On GitHub** (repo owner): repository → Settings → Pages → **Custom domain** → enter
the domain → Save. Wait for the DNS check (minutes) and the certificate (up to an
hour), then tick **Enforce HTTPS**.

Optional hardening: GitHub account → Settings → Pages → **Add a verified domain**,
which stops anyone else ever pointing that domain name at their own Pages site.

## Who can see what

Three different things, three different answers:

- **The website is public by nature.** Anyone who has the address can view it —
  that is true of every website and is the point of a portfolio. A custom domain
  changes the address, not the visibility.
- **The repository must stay public** for GitHub Pages on a free account. That means
  the files — the same photographs and texts the site already shows — are also
  browsable on github.com. It contains nothing that the site itself does not show.
- **Search engines are the part you can control.** By default the site may be indexed
  and appear in Google results for Maria's name. If it should be reachable only by
  people who are given the link, a one-line `noindex` tag keeps it out of search
  results while the link keeps working — ask Claude to add it, and it can be removed
  again the day the site should be findable.

A truly private site (login required) is not something GitHub Pages offers on any
plan; that would mean moving hosting (e.g. Cloudflare Pages with Access, or Netlify
with password protection). Worth doing only if genuinely needed — for job and gallery
applications, a link that opens for whoever receives it is exactly what reviewers expect.

---

*All works and images © Maria Papatheodorou. Reproduction only with written permission.*
