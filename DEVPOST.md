# Devpost Submission Copy (paste into Devpost)

## Project Name
TomorrowGrid

## Tagline
The operating system for tomorrow's cities — turn citizen reports into actionable urban intelligence.

## Inspiration
Future cities won't run on top-down systems alone. When floods hit, heat waves strike, or infrastructure fails, the people on the ground see it first. We built TomorrowGrid because less than 20% of residents use official 311 apps — yet hazards appear in neighborhoods within minutes. Tomorrow's cities need a decentralized intelligence layer that listens to citizens and prioritizes response automatically.

## What it does
TomorrowGrid is a web platform where residents report urban hazards (flooding, heat, safety, accessibility, air quality, infrastructure). Reports appear instantly on a live map. A priority scoring engine ranks issues by severity and community confirmations. A Future City Simulator lets planners model how green roofs, solar, bike lanes, and smart sensors improve city resilience by 2035. Live weather data powers a real heat index on the dashboard.

## How we built it
We used Next.js with TypeScript for the frontend and API routes, Tailwind CSS for a polished dark UI, React Leaflet with OpenStreetMap for the interactive map, and the free Open-Meteo API for live weather. Reports persist in the browser for the demo; the scoring algorithm is transparent and explainable.

## Challenges we ran into
Integrating Leaflet with Next.js SSR required dynamic imports. Balancing a feature-rich demo with a tight hackathon deadline meant focusing on the highest-impact user flows: report → map → prioritize → simulate future impact.

## Accomplishments that we're proud of
- A fully working deployed demo judges can interact with
- Real-time weather integration for heat index
- Explainable priority scoring (not a black box)
- Future City Simulator that directly ties to the "city of tomorrow" theme

## What we learned
How civic tech platforms bridge the gap between social media speed and government response reliability. Urban resilience isn't just about sensors — it's about turning every citizen into a data point.

## What's next for TomorrowGrid
- Backend database + municipal admin dashboard
- AI-powered report deduplication and clustering
- Integration with official 311 APIs
- Mobile app with offline-first reporting

## Video Script (2–3 min)

**[0:00–0:20] Hook**
"Cities of tomorrow can't wait for slow reporting systems. Meet TomorrowGrid."

**[0:20–0:50] Problem**
"Less than 20% of people use official city apps. But flooding, heat, and broken infrastructure happen every day. Who sees it first? The people who live there."

**[0:50–1:30] Demo — Dashboard + Map**
Show dashboard metrics → live map with colored markers → click a report → show priority score.

**[1:30–2:00] Demo — Report**
Submit a new hazard report → it appears on the map instantly → confirm it → status changes to verified.

**[2:00–2:30] Demo — Future Lab**
Open Future Lab → move sliders for green roofs and solar → show resilience score and CO₂ impact improving.

**[2:30–3:00] Close**
"TomorrowGrid — build the city of tomorrow, today. Built for FutureHacks 2026."
