Build a complete, production-ready Jekyll website for The Thunder Family Foundation, a 501(c)(3) nonprofit that raises funds for Manual Middle School.

Use the supplied desktop/mobile design comp and brand assets as the visual reference. Implement the actual website, not another mockup. Preserve the design while making practical improvements for responsive behavior, accessibility, and maintainability.

TECHNICAL APPROACH

- Jekyll and Liquid templates, semantic HTML, plain CSS, and minimal vanilla JavaScript.
- Deploy to GitHub Pages through GitHub Actions.
- No React, Vue, Tailwind, Bootstrap, jQuery, animation libraries, or unnecessary Jekyll plugins.
- No Node build pipeline unless there is a clear, unavoidable need.
- Use Bundler, commit Gemfile.lock, and document the supported Ruby version.
- No external CMS, database, or server-side application.
- Donations and event registration link to configurable external services. Do not build payment processing.
- Keep all essential page content usable without JavaScript.

DESIGN AND PAGE STRUCTURE

Follow the latest supplied comp:

1. Header
   - Approved Thunder Family Foundation SVG logo.
   - A primary Donate button.
   - No navigation menu, hamburger menu, or in-page navigation.

2. Hero
   - Headline: “A community behind every student.”
   - Brief introduction explaining the foundation’s purpose.
   - Primary “Donate to support Manual” button.
   - Supplied student/community photograph with a subtle gold accent.
   - An “Upcoming fundraiser” trigger only when a fundraiser is enabled.
   - No secondary “Our mission” link.

3. Mission
   - High-contrast navy background.
   - Gold eyebrow and accents, white heading and body text.
   - Heading: “One school. A shared commitment.”
   - Incorporate the supplied Manual Middle School M as a supporting school mark.
   - Desktop: heading, mission copy, and school mark arranged with comfortable spacing.
   - Mobile: stacked content with a compact M and school-name row beneath the copy.
   - Keep the foundation logo as the primary identity.

4. Ways to give
   - Light background with navy text and gold dividers.
   - Heading: “Make a difference at Manual.”
   - Online giving, giving by check, and matching/other gifts.
   - Three columns on wider screens, stacked on small screens.
   - Each giving method can be enabled or disabled independently.
   - Include the confirmed 501(c)(3) status and appropriate tax-deductibility wording.

5. Footer
   - Foundation logo, contact information, EIN, and relevant links.
   - Only display links when their destinations are configured.
   - Keep it simple and compact.

BRAND

- Navy: #243F7D
- Gold: #FFDA4B
- Cyan: #00ADD4, used sparingly and in the school M
- Warm white: #F7F6F0
- White: #FFFFFF

Use Manrope for website typography. Self-host WOFF2 fonts, include the license, use font-display: swap, and load only the weights needed.

Use the actual supplied SVG logos and original photograph. Do not recreate logos with text, extract them from the mockup, or use AI-generated versions of the photograph.

CONTENT MANAGEMENT

Content will be edited directly in the repository. Make routine edits possible without touching HTML, Liquid, CSS, or JavaScript.

Use a small, explicit content structure:
- Markdown files with YAML front matter for hero, mission, giving methods, and fundraiser content.
- A small YAML data file for shared organization details, contact information, donation URL, EIN, and footer links.
- _config.yml for technical Jekyll settings.

A suitable structure is:
- _sections/hero.md
- _sections/mission.md
- _giving/online.md
- _giving/check.md
- _giving/other.md
- _fundraisers/current.md
- _data/organization.yml
- _layouts/
- _includes/
- assets/css/
- assets/js/
- assets/images/
- assets/fonts/

Configure collections intentionally. Avoid generating separate public pages for content fragments unless needed for a fallback.

Keep paragraphs in Markdown bodies. Use front matter for titles, labels, ordering, enabled flags, image paths, alt text, and link destinations.

Render Markdown correctly through Jekyll. Do not require editors to write HTML or parse Markdown in browser JavaScript.

Use clear field names and sensible defaults. Avoid an elaborate page-builder schema for this small website.

Do not invent event details, addresses, contact information, EIN, or donation destinations. Clearly document missing values. Never render broken buttons, “#” placeholder links, empty headings, or raw placeholder text on the public page. List required launch information in the README.

OPTIONAL FUNDRAISER MODAL

The fundraiser is not always active. Its configuration and content must live in one easy-to-edit Markdown file.

Provide fields such as:
- enabled: false
- id: a stable identifier for this event
- title
- date_text
- location
- cta_label
- cta_url
- auto_open: false

Default to disabled. When disabled:
- Do not render its trigger or dialog.
- Do not leave empty spacing.
- Do not run fundraiser initialization logic.

When enabled:
- The “Upcoming fundraiser” trigger opens an accessible modal.
- Show event content and the external registration/ticket link.
- Include both a visible Close control and “Maybe later.”
- Closing must not navigate away.
- The event can be reopened using its trigger.
- Do not add an inline fundraiser band to the main page.

Prefer the native HTML dialog element with showModal().
- Provide an accessible dialog name.
- Set appropriate initial focus.
- Keep keyboard focus within the open modal.
- Support Escape to close.
- Restore focus to the opening trigger.
- Prevent interaction and background scrolling while open.
- Support long content and small viewports without hiding the close control.
- Avoid unnecessary ARIA that duplicates native semantics.

If auto_open is enabled, show the event at most once per browser session per event ID. Store dismissal using sessionStorage with graceful error handling. Keep manual reopening available. Default to user-initiated opening.

Provide a sensible non-JavaScript fallback for enabled fundraiser information, without introducing a visible event band in the normal JavaScript experience.

Do not implement date-based expiration that silently becomes stale on a static site. Use the explicit enabled flag unless scheduled rebuilds are deliberately added and documented.

RESPONSIVE DESIGN

- Mobile-first CSS.
- Support widths from 320px upward without horizontal overflow.
- Choose breakpoints based on content, not specific devices.
- Use fluid typography and spacing where appropriate.
- Preserve readable text sizes and comfortable line lengths.
- Keep buttons and controls easy to tap.
- Do not shrink the logo until its small text becomes illegible.
- Give the student photograph a deliberate crop at each layout size.
- Allow content to expand naturally without fixed-height text containers.
- Ensure dialogs work in portrait, landscape, and short viewports.

ACCESSIBILITY

Target WCAG 2.2 AA and verify the implementation rather than claiming compliance based on tooling alone.

Include:
- Semantic landmarks and a logical heading hierarchy.
- A skip link.
- Visible, high-contrast keyboard focus.
- Correct button versus link semantics.
- Appropriate image alternatives.
- Sufficient text, control, and focus-indicator contrast.
- No gold or cyan body text on light backgrounds unless contrast is verified.
- No information communicated by color alone.
- Controls sized for touch.
- Support for browser zoom, text resizing, and reflow.
- Reduced-motion support.

Decorative rules and accents should not add screen-reader noise. Avoid duplicate announcements when logos appear beside the same organization name.

CSS AND ANIMATION

Write clean, readable CSS with:
- Custom properties for colors, spacing, type, widths, and motion.
- A small consistent class-naming convention.
- Low-specificity selectors.
- Clearly organized base, layout, component, and utility sections.
- Minimal duplication and no unnecessary !important declarations.

Use tasteful, restrained animation:
- Subtle hover/focus transitions.
- A short modal fade or slight movement.
- Prefer opacity and transform.
- No parallax, scroll hijacking, continuous motion, or elaborate reveal effects.
- Content must never depend on animation or JavaScript to become visible.
- Disable nonessential animation with prefers-reduced-motion.

PERFORMANCE AND METADATA

- Optimize the supplied photograph and provide appropriate responsive image sizes.
- Set intrinsic image dimensions to prevent layout shifts.
- Do not lazy-load the main hero image.
- Lazy-load below-the-fold images where appropriate.
- Keep JavaScript small and defer execution.
- Avoid third-party scripts unless explicitly required.
- Include page title, description, canonical URL, social-sharing metadata, and a favicon.
- Do not add analytics or tracking by default.

GITHUB PAGES

- Include a working GitHub Actions build/deployment workflow.
- Validate builds on pull requests without deploying them.
- Deploy the main branch using the standard GitHub Pages artifact/deployment flow.
- Use appropriate workflow permissions and the github-pages environment.
- Support both a repository subpath and a custom domain.
- Use Jekyll URL filters consistently for internal links and assets.
- Document url and baseurl with concrete examples.
- Do not add a CNAME file without a supplied domain.
- Keep generated output and local dependencies out of version control.

README

Write clear instructions for someone editing content through GitHub’s web interface as well as a developer working locally.

Document:
1. Project overview and architecture.
2. Prerequisites and exact local setup commands.
3. Local preview and production build commands.
4. Repository structure.
5. Where to edit each visible section.
6. Markdown and front-matter examples.
7. How to change donation links, contact details, and EIN.
8. How to replace the photograph and edit alt text.
9. How to enable, update, disable, and preview the fundraiser.
10. Optional auto-open and session-dismissal behavior.
11. How to enable or disable individual giving methods.
12. GitHub Pages and GitHub Actions setup.
13. Repository-subpath and custom-domain configuration.
14. Accessibility and reduced-motion behavior.
15. Font and asset licensing.
16. Required launch information and known limitations.
17. Common troubleshooting and how to revert an edit.

VALIDATION AND HANDOFF

Before finishing:
- Run a production Jekyll build.
- Verify internal links and assets with a nonempty baseurl.
- Check desktop and mobile layouts, including 320px width.
- Test keyboard navigation and modal focus behavior.
- Test fundraiser enabled and disabled states.
- Test repeated dismissal, reopening, and a new event ID.
- Check reduced motion and JavaScript-disabled behavior.
- Check for overflow, missing images, broken links, and console errors.
- Use available accessibility auditing tools alongside manual checks.
- Keep any testing dependencies development-only and proportionate.

Deliver the complete repository implementation, workflow, and README. Summarize what was built, what was verified, and any remaining configuration needed before launch.

Make reasonable implementation decisions and proceed. Ask questions only when genuinely blocked.
