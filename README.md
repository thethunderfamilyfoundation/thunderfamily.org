# The Thunder Family Foundation

A small, responsive Jekyll website for the Thunder Family Foundation and Manual Middle School. Page copy and fundraiser details live in Markdown; shared organization settings live in one YAML file. There is no CMS, JavaScript build step, analytics, or payment processing.

## Project structure

```text
_data/organization.yml       Shared contact, donation, EIN, and footer settings
_sections/                   Hero and mission copy
_giving/                     Independently enabled giving methods
_fundraisers/current.md      Optional fundraiser content and modal settings
_includes/                   Small reusable Liquid fragments
_layouts/                    Shared page layout and metadata
assets/css/site.css          Responsive styling and design tokens
assets/js/fundraiser.js      Optional fundraiser dialog behavior
assets/fonts/                Self-hosted Manrope font and license
assets/                       Supplied logos and approved photographs
.github/workflows/pages.yml  Pull request build and GitHub Pages deployment
```

The collections are intentionally not published as separate pages. The home page renders their Markdown content. `_config.yml` contains Jekyll and deployment settings.

## Edit content on GitHub

1. Open a file from `_sections/`, `_giving/`, `_fundraisers/`, or `_data/`.
2. Select the pencil icon to edit. Keep the YAML front matter between the opening and closing `---` lines valid.
3. Preview the diff, then commit the change to a branch and open a pull request. The workflow builds pull requests without deploying them.
4. Merge to `main` to publish through GitHub Pages.

Edit Markdown paragraphs below the closing front-matter delimiter. Use ordinary Markdown (paragraphs, emphasis, and links); do not add HTML for normal content edits.

## Local setup and preview

Prerequisites: Ruby 3.4.x and Bundler 4.1.0 (the version recorded in `Gemfile.lock`). The `.ruby-version` file records the tested Ruby version.

```sh
gem install bundler -v 4.1.0
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000`. To make a production build:

```sh
bundle exec jekyll build
```

The generated site is in `_site/` and is not committed.

## Routine content changes

### Hero and mission

Edit `_sections/hero.md` for the main headline, introduction, and optional photograph; edit `_sections/mission.md` for its eyebrow, heading, and paragraphs. Example:

```yaml
---
title: A community behind every student.
image: /assets/manual-middle-students.jpg
image_1200: /assets/manual-middle-students-1200.jpg
image_640: /assets/manual-middle-students-640.jpg
image_alt: Manual students and community members celebrating together.
image_width: 2048
image_height: 1700
---

Write the section's paragraph here.
```

The supplied original student/community photo is already saved at `assets/manual-middle-students.jpg` (2048 × 1700). Optimized 1200px and 640px-wide copies are used in a responsive `srcset`; the hero has intrinsic dimensions, a descriptive alt text, eager loading, and high fetch priority. When replacing it, add the original and matching `-1200` and `-640` variants under `assets/`, then update `image`, `image_1200`, `image_640`, the actual original dimensions, and alt text. Use tools such as `sips --resampleWidth 1200 original.jpg --out image-1200.jpg` and `sips --resampleWidth 640 original.jpg --out image-640.jpg` to generate resized copies.

### Donations, contact, and organization details

Edit `_data/organization.yml`:

```yaml
donation_url: "https://your-approved-donation-provider.example/"
contact_email: "hello@example.org"
ein: "XX-XXXXXXX"
footer_links:
  - label: Privacy
    url: "https://example.org/privacy"
  - label: Financial information
    url: "https://example.org/financial-information"
```

Replace these examples only with confirmed information. Until a donation URL is supplied, the header and hero buttons lead to a coming-soon notice, and the online donation button is disabled. A missing contact email or EIN is labeled as coming soon; footer links without a destination are omitted. Use a secure, confirmed external donation destination. The site does not collect or process payments.

Edit the `board_members` list in the same file to update the names shown in the footer.

### Giving methods

Each `_giving/*.md` file controls one card. Set `enabled: false` to hide it, or `true` to show it. Change `order` to reorder cards. Use the front matter for the title and short description; edit the Markdown body for its longer copy.

```yaml
---
title: Give online
description: Support students at Manual with an online gift.
link_label: Donate now
order: 1
enabled: true
---

Add or edit the explanatory paragraph here.
```

The online-giving card uses `donation_url` from `_data/organization.yml`. The matching-gifts card links to the configured contact email when present. Edit `_giving/check.md` to update the check drop-off and mailing instructions. The 501(c)(3) status and tax-deductibility note are shown with the giving methods.

### Fundraiser: edit, preview, and disable

All event settings and copy are in `_fundraisers/current.md`. It currently displays a clearly labeled placeholder with ticket sales disabled; this is not an announcement of a real event. While the fundraiser is disabled, there is no event trigger, dialog, fallback section, or fundraiser JavaScript on the page.

To publish a real event, set `placeholder: false` and `enabled: true`, give it a stable unique `event_id` (for example `spring-benefit-2027`), fill in the title and confirmed external event URL, and edit its Markdown description. Date and location are optional. `cta_label` and `auto_open` may also be changed. Do not invent dates, venues, or ticket destinations.

- Set `enabled: false` to remove the event from the normal page.
- In a JavaScript-enabled browser, the “Upcoming fundraiser” link opens the native dialog. It has a Close control, a “Maybe later” control, Escape support, focus containment, and focus restoration. The link still points to the event information when JavaScript is unavailable; in that case, the event details and a configured registration link appear inline.
- To preview locally, edit the file and run `bundle exec jekyll serve`. Test both the enabled and disabled settings before publishing.
- `auto_open: false` is the default. If enabled, the modal auto-opens at most once per browser session for each `event_id`. Dismissal is stored in `sessionStorage`; changing the event ID permits one new auto-open. The trigger always remains available to reopen the event.

The event is controlled by its explicit `enabled` flag, not its date. Disable or update it manually; there is no date-based expiration on this static site.

## GitHub Pages setup

The workflow in `.github/workflows/pages.yml` builds pull requests without deploying, and builds and deploys pushes to `main` through the GitHub Pages artifact flow. Both jobs use the pinned `ubuntu-24.04` runner image to avoid automatic `ubuntu-latest` migrations. It uses `configure-pages` to read the configured site origin and base path, then writes a temporary Jekyll config override for production metadata and URL generation. Pull requests intentionally build with `/preview` to exercise non-root asset paths. Production deployments are not canceled once started; superseded pull-request builds may be canceled.

1. Push this repository to GitHub and make sure its default publishing branch is `main` (or update the workflow branch filter).
2. In **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
3. Merge a change to `main`; the workflow publishes the site. Check the Actions tab if a deployment does not complete.

For a repository site such as `https://example.github.io/thunderfamily`, select **GitHub Actions** in Pages settings; the workflow detects the repository path and site origin. For a custom domain such as `https://foundation.example`, configure the domain in GitHub Pages and DNS; the workflow uses its origin and an empty base path. No domain or `CNAME` file is assumed here. For a local project-site preview, temporarily set:

```yaml
url: "https://example.github.io"
baseurl: "/thunderfamily"
```

For a local custom-domain preview, use `url: "https://foundation.example"` and `baseurl: ""`. Then run `bundle exec jekyll serve`. The production workflow supplies the detected values automatically. Internal links and assets use Jekyll's `relative_url` filter.

## Accessibility and motion

The page uses semantic landmarks and headings, a skip link, visible keyboard focus, responsive text and layouts, descriptive image alternatives, and native dialog behavior. Transitions and the dialog entrance animation are disabled for visitors who prefer reduced motion. Check the final contrast and keyboard behavior after changing colors or styles; no automated tool can establish WCAG conformance by itself.

## Fonts and asset licensing

Manrope is self-hosted as WOFF2, served with `font-display: swap`; its SIL Open Font License is included at `assets/fonts/OFL.txt`. The supplied foundation SVG and an optimized Manual Middle School logo are included in `assets/`. Confirm permission and usage rights for any new photograph, logo, or other material before publishing it.

## Launch checklist and limitations

Before launch, confirm and configure:

- The approved online donation URL.
- Any approved privacy/financial-information links.
- The original, approved student/community photo, its dimensions, and alt text if a hero image is desired.
- The canonical site URL, repository `baseurl` or custom domain, and GitHub Pages settings.
- Any real fundraiser title, stable ID, event details, and registration URL before replacing the placeholder.

This static site does not process donations, manage registrations, provide legal/tax advice, or automatically expire events. Do not publish personal contact details or donor information without approval.

## Troubleshooting and reverting

- **A build fails:** check the Actions log or run `bundle exec jekyll build` locally. YAML indentation and unmatched quotes in front matter are common causes.
- **A donation button is disabled:** add the confirmed donation URL in `_data/organization.yml`. Add a contact email there to make the contact link open an email.
- **An image is missing:** check the path begins with `/assets/`, the file exists, and the path and alt text are both set in `_sections/hero.md`.
- **A fundraiser does not appear:** confirm `enabled: true`, an `event_id`, and a title are present; a real event also needs a valid `cta_url`.
- **A recent edit should be undone:** on GitHub, open the merged commit and choose **Revert**, or create a new commit restoring the previous file contents. Do not rewrite shared branch history.
