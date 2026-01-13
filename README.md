# Wochenmarkt — Interactive Market Map (SvelteKit + Leaflet)

A small web app that visualizes a weekly market at a fixed location (e.g. Stephansplatz, Hanover) with interactive stalls. Each stall can be selected on the map or via a side panel, and the UI stays in sync (highlight, focus/zoom, and details like product categories).

> Portfolio focus: clean component structure, predictable state handling, and testable UI behavior around map interactions.

---

## Demo

- Live: _add link if available_
- Screenshot: see repository preview / `static/`

---

## Features

- 🗺️ Leaflet map with an OpenStreetMap basemap
- 📍 Stalls rendered as map features (markers/polygons depending on implementation)
- 🔁 Two-way interaction  
  - click a stall on the map → highlight + popup/details  
  - click a stall in the list → focus/zoom + highlight on the map
- 🏷️ Category labels/tags per stall (e.g. vegetables, flowers, specialties)
- 🧩 Component-based UI (map, sidebar, labels/tags, data model)
- 🧪 Tests for UI logic and helper utilities (where it makes sense)
- ♿ Basic accessibility: clear hit targets and sensible focus behavior

---

## Tech Stack

- SvelteKit
- Leaflet
- OpenStreetMap tiles
- Vite
- TypeScript (if enabled)
- Testing: Vitest + @testing-library/svelte (if enabled)

---

## Getting Started

### Prerequisites

- Node.js (recommended: LTS)
- npm / pnpm / yarn (use whatever the repo uses)

### Install

```bash
git clone <your-repo-url>
cd wochenmarkt
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in your terminal (commonly `http://localhost:5173`).

### Build & preview

```bash
npm run build
npm run preview
```

---

## Useful Scripts

Adjust to match your `package.json`:

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run preview` — preview production build locally
- `npm run test` — run unit/component tests
- `npm run lint` — lint (if configured)
- `npm run format` — format (if configured)

---

## Project Structure (overview)

Example layout (adapt to your actual repo):

```
src/
  lib/
    components/
      Map/
      Stalls/
      UI/
    data/
      stalls.ts
    utils/
      geo.ts
  routes/
    +page.svelte
static/
```

**Intent**

- `components/Map`: Leaflet integration (init, layers, events)
- `components/Stalls`: sidebar list, labels/tags, selection UI
- `data/`: stall dataset (coordinates + metadata)
- `utils/`: geo helpers (bounds, focus/zoom helpers, normalization)

---

## Data & Map Tiles

- Basemap: OpenStreetMap
- Stall data: _static dataset / JSON / in-repo model_ (describe briefly)
- Coordinates: WGS84 (`lat/lng`)

If you rely on public OSM tile servers, consider their usage policy and use a dedicated tile provider for heavier traffic.

---

## Testing

Examples of what may be covered:

- category label rendering
- “empty categories” edge cases
- selection sync between sidebar and map
- geo helper utilities (if applicable)

Run:

```bash
npm run test
```

---

## Design Notes

- A **single source of truth** for selection state (e.g. `selectedStallId`) keeps map and sidebar consistent.
- Leaflet code is **encapsulated** so map-specific concerns don’t spread across the app.
- The stall data model is structured so it can later be replaced by an API.

---

## Roadmap / Ideas

- [ ] Search & filters in the sidebar (by category/name)
- [ ] URL state (deep-link to a stall via query params)
- [ ] Marker clustering for larger markets
- [ ] Import/export GeoJSON
- [ ] E2E tests (Playwright) for map ↔ sidebar flows

---

## License

Choose one:

- MIT (common for portfolio projects)

---

## Contact

- GitHub: https://github.com/estebans-tech
