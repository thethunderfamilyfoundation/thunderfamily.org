---
layout: default
title: Home
description: The Thunder Family Foundation raises funds to support Manual Middle School and its students.
---

{% assign hero = site.sections | where: "slug", "hero" | first %}
{% assign mission = site.sections | where: "slug", "mission" | first %}
{% assign fundraiser = site.fundraisers | first %}
{% assign donation_url = site.data.organization.donation_url %}
{% assign fundraiser_ready = false %}
{% if fundraiser.enabled and fundraiser.event_id and fundraiser.event_id != "" and fundraiser.title and fundraiser.title != "" and fundraiser.cta_url and fundraiser.cta_url != "" %}
  {% assign fundraiser_ready = true %}
{% endif %}

<section class="hero page-width" aria-labelledby="hero-title">
  <div class="hero__copy">
    <h1 id="hero-title">{{ hero.title | escape }}</h1>
    <div class="prose hero__intro">{{ hero.content | markdownify }}</div>
    {% if donation_url and donation_url != "" or fundraiser_ready %}
      <div class="hero__actions">
        {% if donation_url and donation_url != "" %}
          <a class="button" href="{{ donation_url | escape }}">Donate to support Manual</a>
        {% endif %}
        {% if fundraiser_ready %}
          <a class="text-link" href="#fundraiser-info" data-fundraiser-trigger>Upcoming fundraiser <span aria-hidden="true">↗</span></a>
        {% endif %}
      </div>
    {% endif %}
  </div>
  {% if hero.image and hero.image != "" and hero.image_alt and hero.image_alt != "" %}
    <figure class="hero__media">
      <img
        src="{{ hero.image | relative_url }}"
        {% if hero.image_640 and hero.image_640 != "" and hero.image_1200 and hero.image_1200 != "" %}
          srcset="{{ hero.image_640 | relative_url }} 640w, {{ hero.image_1200 | relative_url }} 1200w, {{ hero.image | relative_url }} {{ hero.image_width | default: 2048 }}w"
        {% endif %}
        alt="{{ hero.image_alt | escape }}"
        width="{{ hero.image_width | default: 1200 }}"
        height="{{ hero.image_height | default: 800 }}"
        sizes="(min-width: 48rem) 48vw, 100vw"
        fetchpriority="high">
    </figure>
  {% endif %}
</section>

<section class="mission" aria-labelledby="mission-title">
  <div class="mission__inner page-width">
    <div class="mission__heading">
      <p class="eyebrow">{{ mission.eyebrow | escape }}</p>
      <h2 id="mission-title">{{ mission.title | escape }}</h2>
    </div>
    <div class="prose mission__copy">{{ mission.content | markdownify }}</div>
    <div class="mission__school">
      <img src="{{ '/assets/manual_middle_logo.png' | relative_url }}" alt="" width="2048" height="1072" loading="lazy">
      <span>Manual Middle School</span>
    </div>
  </div>
</section>

<section class="giving page-width" aria-labelledby="giving-title">
  <p class="eyebrow eyebrow--light">Ways to give</p>
  <h2 id="giving-title">Make a difference at Manual.</h2>
  <div class="giving__grid">
    {% assign giving_methods = site.giving | sort: "order" %}
    {% for method in giving_methods %}
      {% if method.enabled %}
        <article class="giving-card">
          <h3>{{ method.title | escape }}</h3>
          <p class="giving-card__description">{{ method.description | escape }}</p>
          <div class="prose">{{ method.content | markdownify }}</div>
          {% if method.slug == "online" and donation_url and donation_url != "" %}
            <a class="button button--small" href="{{ donation_url | escape }}">{{ method.link_label | default: "Donate now" | escape }}</a>
          {% elsif method.slug == "other" and site.data.organization.contact_email and site.data.organization.contact_email != "" %}
            <a class="text-link" href="mailto:{{ site.data.organization.contact_email | escape }}">{{ method.link_label | default: "Contact us" | escape }}</a>
          {% endif %}
        </article>
      {% endif %}
    {% endfor %}
  </div>
  <p class="giving__disclaimer">The Thunder Family Foundation is a 501(c)(3) nonprofit. Contributions are tax-deductible to the extent permitted by law.</p>
</section>

{% if fundraiser_ready %}
  <section class="fundraiser-fallback page-width" id="fundraiser-info" aria-labelledby="fundraiser-fallback-title">
    <p class="eyebrow eyebrow--light">Upcoming fundraiser</p>
    <h2 id="fundraiser-fallback-title">{{ fundraiser.title | escape }}</h2>
    {% if fundraiser.date_text and fundraiser.date_text != "" %}<p>{{ fundraiser.date_text | escape }}</p>{% endif %}
    {% if fundraiser.location and fundraiser.location != "" %}<p>{{ fundraiser.location | escape }}</p>{% endif %}
    <div class="prose">{{ fundraiser.content | markdownify }}</div>
    <a class="button" href="{{ fundraiser.cta_url | escape }}">{{ fundraiser.cta_label | default: "View event & tickets" | escape }}</a>
  </section>
  {% include fundraiser-dialog.html fundraiser=fundraiser %}
  <script defer src="{{ '/assets/js/fundraiser.js' | relative_url }}"></script>
{% endif %}
