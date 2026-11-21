# Thunder Family Foundation favicon

The collegiate T from the approved foundation logo, in gold (#FFDA4B) on navy (#243F7D). Vector paths only: no font, script, or external dependency.

## Jekyll / GitHub Pages integration

The shared layout (`../../_layouts/default.html`) loads the icons from this folder:

```liquid
<link rel="icon" href="{{ '/assets/favicon/favicon.ico' | relative_url }}" sizes="16x16 32x32 48x48">
<link rel="icon" href="{{ '/assets/favicon/favicon.svg' | relative_url }}" type="image/svg+xml" sizes="any">
<link rel="apple-touch-icon" href="{{ '/assets/favicon/apple-touch-icon.png' | relative_url }}" sizes="180x180">
```

The `relative_url` filter supports a GitHub Pages project subdirectory. The Jekyll config excludes this README, the individual raster exports, and the optional preview from the published site.

## Files

- favicon.svg: scalable master, rounded navy tile.
- favicon.ico: embedded 16, 32, and 48 px fallback images.
- apple-touch-icon.png: opaque 180 px square; Apple applies its own corner mask.
- favicon-16.png, favicon-32.png, favicon-48.png: individual raster exports for inspection or other consumers; no extra link tags needed.
- preview.png (optional): enlarged mark and actual-size exports on light and dark backgrounds; not published.

A web app manifest and service worker are not needed for this informational site's favicon. If installable app functionality is added later, supply manifest icons separately.

## Verification

After deployment, check that icon URLs return images, including on a project subdirectory. Check tabs in Safari, Firefox, and Chromium, and Add to Home Screen on an iPhone. Favicons may remain cached after a change; test in a fresh browser profile or temporarily add a version query to each href.

References checked November 20, 2026:
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata
- https://web.dev/learn/html/document-structure
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons
