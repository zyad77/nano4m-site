# nano4M Structured Masking — Project Website

**COM-304 Foundation Models · EPFL · 2025**

> Structured Masking Strategies for nano4M on MultiCLEVR  
> Comparing random, span, block, and mixed masking for multimodal pretraining

---

## Team

| Name | SCIPER |
|---|---|
| Ayman Belbachir | 356695 |
| Zyad Tajeddine | 362730 |
| Ali Tahri Hassani | 375756 |
| Nour Alaoui Ismaili | 373068 |

---

## How to Open the Website Locally

### Option 1 — Just open the file (simplest)

1. Double-click `index.html` in your file explorer, or drag it into a browser window.
2. The site works without a server for most features.

> **Note:** `data.json` is loaded via `fetch()`, which may be blocked by browsers when opening files directly from disk (CORS restriction). Use Option 2 to be safe.

### Option 2 — Local server (recommended)

**With Python (no install needed):**

```bash
# Navigate to the website folder
cd nano4m-website/

# Python 3
python -m http.server 8080

# Then open: http://localhost:8080
```

**With Node.js:**

```bash
npx serve .
# Then open the URL shown in the terminal
```

**With VS Code:**  
Install the "Live Server" extension → right-click `index.html` → "Open with Live Server".

---

## File Structure

```
nano4m-website/
├── index.html          # Home page
├── report.html         # Report download page
├── code.html           # GitHub profiles & implementation
├── slides.html         # Slides download page
├── graphs.html         # Graphs & visual results
├── style.css           # All styles
├── script.js           # Dynamic rendering from data.json
├── data.json           # Project data (team, models, metrics)
├── README.md           # This file
│
├── final_report_IA.pdf # ← Place here (same folder as HTML)
├── Presentation.pdf    # ← Place here (same folder as HTML)
│
└── assets/             # ← Create this folder for graphs
    ├── masking_random.png
    ├── masking_span.png
    ├── masking_block.png
    ├── masking_mixed.png
    ├── training_loss_5_models.png
    ├── image_to_text_results.png
    └── text_to_image_results.png
```

---

## How to Customize

### Update GitHub links

Open `data.json` and replace `"https://github.com/USERNAME"` with the actual GitHub profile URL for each team member.

### Add graphs

1. Create an `assets/` folder next to the HTML files.
2. Place your image files in it (see filenames above).
3. In `graphs.html`, for each graph: remove the `<div class="graph-placeholder">` block and uncomment the `<img>` tag above it.

### Update PDF files

Place `final_report_IA.pdf` and `Presentation.pdf` in the **same folder** as the HTML files. The download buttons link directly to them.

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Project overview, model cards, results tables |
| Report | `report.html` | PDF download for the final report |
| Code | `code.html` | GitHub profiles, implementation details |
| Slides | `slides.html` | PDF download for the presentation |
| Graphs | `graphs.html` | Training curves & visual results (add images here) |

---

## Technical Notes

- Pure HTML/CSS/JS — no frameworks, no build step, no backend
- Responsive design — works on mobile and desktop
- `data.json` is used to dynamically render model cards and results tables via JavaScript
- The site degrades gracefully: if `data.json` fails to load, static HTML fallbacks are displayed
- Google Fonts (DM Sans, Libre Baskerville, IBM Plex Mono) loaded from CDN — requires internet
