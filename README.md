# TomorrowGrid

**Build the city of tomorrow, today.**

TomorrowGrid is a community-powered urban resilience platform built for [FutureHacks 2026](https://futurehacks.devpost.com/) (Intermediate Track).

## The Problem

Official city reporting apps (311 systems) are used by less than 20% of residents. Meanwhile, hazards — flooding, heat zones, broken infrastructure — show up in neighborhoods long before authorities can respond.

## The Solution

TomorrowGrid gives future cities a **decentralized intelligence layer**:

- **Live Hazard Map** — citizen reports visualized on an interactive map
- **Priority Scoring** — urgency calculated from hazard type + community confirmations
- **Real Weather Integration** — live heat index via Open-Meteo API
- **Future City Simulator** — model how green roofs, solar, bike lanes, and sensors improve resilience by 2035

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Leaflet + OpenStreetMap
- Open-Meteo Weather API

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Works on Vercel or Netlify (see `netlify.toml`).

```bash
npm run build
```

## FutureHacks Submission

- **Theme:** Future city civic infrastructure
- **Track:** Intermediate
- **Demo flow:** Dashboard → Report issue → Map → Future Lab simulator

Built during FutureHacks hackathon window (June 24–28, 2026).

## License

MIT
