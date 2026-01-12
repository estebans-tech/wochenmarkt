# Wochenmarkt — Interactive Market Map (SvelteKit + Leaflet)

A small web app that visualizes a weekly market at a fixed location (e.g. Stephansplatz, Hanover) with interactive stalls. Each stall can be selected on the map or via a side panel, and the UI stays in sync (highlight, focus/zoom, and details like product categories).

> Portfolio focus: clean component structure, predictable state handling, and testable UI behavior around map interactions.

---

## Demo

- Live: _add link if available_
- Screenshot: see repository preview / `/static`

---

## Features

- 🗺️ **Leaflet map** with OpenStreetMap basemap
- 📍 **Stalls rendered as map features** (markers/polygons depending on implementation)
- 🔁 **Two-way interaction**
  - click a stall on the map → highlight + popup/details
  - click a stall in the list → focus/zoom + highlight on the map
- 🏷️ **Category labels/tags** per stall (e.g. vegetables, flowers, specialties)
- 🧩 **Component-based UI** (map, sidebar, labels/tags, data model)
- 🧪 **Tests** for UI logic and helper utilities (where it makes sense)
- ♿ **Basic accessibility**: clear hit targets and sensible focus behavior

---

## Tech Stack

- **SvelteKit**
- **Leaflet**
- **OpenStreetMap** tiles
- **Vite**
- **TypeScript** (if enabled)
- Testing: **Vitest** + **@testing-library/svelte** (if enabled)

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

