# Portfolio

The portfolio page is in `../frontend/src/index.html`. The projects section is rendered with React from `src/Projects.jsx`.

## Run locally

From this directory, run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use Vite instead of opening `index.html` directly because the project section uses React modules.

## Add a project

Add a project entry to the `projects` array in `src/Projects.jsx`. Each entry has its own ID and its own modal state through `ProjectCard`, so each View Project button opens the matching project's details. Add screenshots to the `screenshots` list to enable its image carousel.
