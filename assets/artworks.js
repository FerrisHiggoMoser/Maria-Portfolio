/* ============================================================
   THE ONLY FILE YOU NEED TO EDIT TO ADD OR CHANGE WORK.

   One entry = one artwork. Fill in what you know and leave the
   rest as empty quotes "" — nothing breaks if a field is blank.

     image   path to the photograph, e.g. "images/acrylics/bathtub.jpg"
             leave it "" and the page shows an empty frame instead
     title   name of the work (shown in italics)
     year    "2024", or "2021–2023" for a series
     medium  "Silver, garnet" / "Acrylic on canvas" / "Egg tempera on gesso panel"
     size    "45 × 60 cm" (jewellery: "L 42 cm" or "Ø 2.1 cm")
     note    one sentence — collection, prize, series, price, "available"
     alt     short plain description for screen readers and search engines

   TITLES, YEARS AND DIMENSIONS ARE LEFT EMPTY ON PURPOSE — they
   can't be read off a photograph. Until they are filled in, each
   caption reads "Title · year · medium · dimensions" as a reminder.

   Order in the list = order on the page. Put the strongest work
   first in every section; that is the one people remember.
   ============================================================ */

window.PORTFOLIO = {

  /* ---------- JEWELLERY — no photographs yet ---------- */
  jewellery: [
    { image: "", title: "", year: "", medium: "", size: "", note: "", alt: "", slot: "images/jewellery/01.jpg" },
    { image: "", title: "", year: "", medium: "", size: "", note: "", alt: "", slot: "images/jewellery/02.jpg" },
    { image: "", title: "", year: "", medium: "", size: "", note: "", alt: "", slot: "images/jewellery/03.jpg" },
    { image: "", title: "", year: "", medium: "", size: "", note: "", alt: "", slot: "images/jewellery/04.jpg" }
  ],

  /* ---------- ACRYLICS ---------- */
  acrylics: [
    { image: "images/acrylics/orange-house-pink-sky.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "Orange house with a red tiled roof against a pink and violet sky, a running silhouette beside it" },
    { image: "images/acrylics/house-with-snowflakes.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "House under pink clouds and falling snowflakes, a seated silhouette inside" },
    { image: "images/acrylics/checkered-house.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "Pink chequered house with a stairway to the sea, pink clouds and a sun" },
    { image: "images/acrylics/house-with-sun.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "Patterned houses with a yellow sun, a chimney and figures on the roof" },
    { image: "images/acrylics/running-figure.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "Silhouetted figure running through a flowering meadow under pink clouds" },
    { image: "images/acrylics/bathtub.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "Two figures in a bathtub on a yellow ground, shower and sun above" },
    { image: "images/acrylics/night-house.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "House at night with a crescent moon, stars and a tree, on a deep blue ground" },
    { image: "images/acrylics/globe-and-rocket.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "", alt: "Figure reaching towards a globe among stars, a rocket and a sun on a dark blue ground" },
    { image: "images/acrylics/two-small-panels.jpg", title: "", year: "", medium: "Acrylic on canvas", size: "", note: "A pair", alt: "Two small canvases, one blue with a tulip, one red with a flower" }
  ],

  /* ---------- AQUARELLE ---------- */
  aquarelle: [
    { image: "images/aquarelle/town-with-clocktower.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "Town with a clock tower, balconies and fish, above a violet sea" },
    { image: "images/aquarelle/acropolis.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "Rooftops and an orange tree with the Acropolis behind, two dancing silhouettes" },
    { image: "images/aquarelle/stairs-and-roofs.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "Dense composition of stairs, tiled roofs, balconies and plants" },
    { image: "images/aquarelle/cactus-and-balcony.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "Prickly pear cactus in front of a pink and violet house front" },
    { image: "images/aquarelle/houses-with-sun.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "Row of houses under a large yellow sun, a figure climbing a patterned stair" },
    { image: "images/aquarelle/house-with-cat.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "House with a balustrade and a black cat on the roof, under a washed blue sky" },
    { image: "images/aquarelle/house-and-sea.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "House behind an iron gate on a mottled green and turquoise ground" },
    { image: "images/aquarelle/bordered-panel.jpg", title: "", year: "", medium: "Watercolour on paper", size: "", note: "", alt: "Upright composition with a painted border, figures, a sun and a plant" },
    { image: "images/aquarelle/ink-drawing.jpg", title: "", year: "", medium: "Ink on paper", size: "", note: "", alt: "Line drawing in black ink of a house with a spiral of smoke and a figure" }
  ],

  /* ---------- NATURAL TEMPERA — in progress ---------- */
  tempera: [
    { image: "", title: "", year: "", medium: "Natural tempera on panel", size: "", note: "", alt: "", slot: "images/tempera/01.jpg" },
    { image: "", title: "", year: "", medium: "Natural tempera on panel", size: "", note: "", alt: "", slot: "images/tempera/02.jpg" },
    { image: "", title: "", year: "", medium: "Natural tempera on panel", size: "", note: "", alt: "", slot: "images/tempera/03.jpg" },
    { image: "", title: "", year: "", medium: "Natural tempera on panel", size: "", note: "", alt: "", slot: "images/tempera/04.jpg" }
  ]

  /* The painted chair and the printed tote bag are photographed and sitting in
     images/applied/ but are not shown anywhere: they belong to none of the four
     sections. To put them on the page, add a section back in index.html, or add
     them to a section above as entries pointing at
     images/applied/painted-chair.jpg and images/applied/tote-bag.jpg. */

};
