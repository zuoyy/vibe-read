# Design Document: Sapiens (人类简史)

## 1. Vibe & Philosophy
**Keywords**: Epic, Structured, Evolution, Time, Narrative.

**Visual Metaphor**:
- **The Timeline**: A long, continuous line connecting the past to the future.
- **The Fingerprint**: Uniqueness of humanity (or biology).
- **Scale**: Small human vs. Big History.

**Design System**: **Typography System (瑞士排版)**
- Why? History is written. Large, bold typography with strong grid alignment conveys the weight of history and the structure of the narrative. It feels like a museum archive or a monumental inscription.

**Color Palette**:
- Paper White/Beige: `#F2F0E9` (Background)
- Ink Black: `#000000` (Text)
- Clay Red: `#A63D40` (Accent - primitive art/blood)

## 2. Interactive Experience
**Core Component: `<TimeScale />`**
- A zoomable/scrollable timeline.
- Users scroll to traverse from 70,000 BC (Cognitive Revolution) to Present.
- As you scroll, the "density" of events increases.

**Secondary Interactions**:
- **Data Cards**: Floating facts about population/extinction rates.

## 3. Structure
- **Hero**: Giant "SAPIENS" text sliced by a timeline.
- **Part 1: The Cognitive Revolution**: Why we rule the world (Ability to gossip/fiction).
- **Part 2: The Agricultural Revolution**: History's biggest fraud.
- **Part 3: The Scientific Revolution**: The discovery of ignorance.

## 4. Tech Stack
- `framer-motion` for scroll-linked animations.
- Sticky positioning for the timeline years.
