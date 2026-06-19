---
layout: default
title: Skills
heading: Skills
tagline: Tools, techniques, and concepts across my projects.
permalink: /skills/
---

{% assign all_skills = "" | split: "," %}
{% for project in site.projects %}
  {% if project.skills %}
    {% assign all_skills = all_skills | concat: project.skills %}
  {% endif %}
{% endfor %}
{% assign unique_skills = all_skills | uniq | sort_natural %}

{% if unique_skills.size > 0 %}
<ul class="skills-index">
  {% for skill in unique_skills %}
  <li><a class="skill-tag" href="#{{ skill | slugify }}">{{ skill }}</a></li>
  {% endfor %}
</ul>

{% for skill in unique_skills %}
{% assign matching = site.projects | where_exp: "p", "p.skills contains skill" %}
<section class="skill-section" id="{{ skill | slugify }}">
  <h2>{{ skill }}</h2>
  {% include project-grid.html projects=matching %}
</section>
{% endfor %}
{% else %}
<p class="text-dim">Nothing here yet, check back soon.</p>
{% endif %}
