# Roshan E S portfolio

Responsive, buildless HTML/CSS/JavaScript portfolio. The deployable website is in `dist/`.

The red, black, and paper collage aesthetic follows the supplied reference. The portrait is the user's supplied photo. Twelve original image assets were extracted from pages 5 and 6 of the supplied portfolio PDF: six Al Rayyan restaurant images and six Cntrl M campaign images. They are shown intact with project context rather than invented campaign results. Content follows the supplied CV, portfolio PDF, and latest user corrections; confirmed Dubai location and employment dates take precedence over older PDF details.

## Features

- Desktop and mobile layouts, responsive navigation, reduced-motion support.
- Work category filters and accessible native dialogs with full images and project details.
- Expandable expertise sections, email copy, mail and phone links, LinkedIn.
- Print-friendly resume with browser PDF saving.
- Self-hosted fonts and local assets; no external tracking or API dependency.

## Local preview

Serve `dist/` using any static HTTP server. No build step is required.

## Content

Edit `dist/index.html` for main content and `dist/script.js` for project dialogs. The collage design is in `dist/portfolio.css`, on top of the base responsive styles. Keep `dist/resume.html` synchronized with updated career details. User-supplied 2.5–5% conversion range is not attributed to a specific employer or represented as a percentage increase. Original work images are in `dist/assets/work/`.

Hosting configuration is in `.openai/hosting.json`. Preserve its project identity.
