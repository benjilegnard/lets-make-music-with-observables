# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a presentation project about making music with (native) Observables, RxJS, and the WebAudio API. It's built as a Reveal.js slideshow with interactive examples demonstrating Observable concepts through musical programming.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (runs TypeScript compilation + Vite build)
- `pnpm preview` - Preview production build

## Architecture

### Main Presentation
- Main slideshow served from `/index.html` using Reveal.js
- Slides content in `/public/lets-make-music-with-observables.md` (Markdown format)
- Preact components can be embedded in slides via `/src/main.tsx`

### Examples Structure
- Examples live in `/examples/` folder with individual entry points
- Each example has its own `index.html` and TypeScript files
- Vite config automatically creates build entries for all examples
- Examples demonstrate Observable concepts with WebAudio/music

### Key Technologies
- **Presentation**: Reveal.js with Markdown slides
- **Framework**: Preact with TypeScript
- **Build**: Vite with multi-entry configuration
- **Package Manager**: pnpm with workspace configuration
- **Observable Libraries**: RxJS + native Observable API demonstrations

### Development Notes

- Vite config includes custom HMR for markdown file changes (full page reload)
- TypeScript configured with strict mode and Preact JSX settings
- Examples are Chrome-only (WebAudio API requirements)
- Presentation focuses on native Observables vs RxJS comparison