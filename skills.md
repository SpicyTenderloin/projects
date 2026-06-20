---
layout: default
title: Skills
heading: Skills
tagline: Click a skill to see the projects that use it.
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

{% for group in site.data.skill_groups %}
  {% assign group_count = 0 %}
  {% for skill in group.skills %}
    {% if unique_skills contains skill %}
      {% assign group_count = group_count | plus: 1 %}
    {% endif %}
  {% endfor %}
  {% if group_count > 0 %}
<h2 class="skill-group-heading">{{ group.name }}</h2>
<div class="skills-list">
    {% for skill in group.skills %}
      {% if unique_skills contains skill %}
        {% assign matching = site.projects | where_exp: "p", "p.skills contains skill" %}
  <details id="{{ skill | slugify }}" class="skill-accordion">
    <summary><span class="skill-name">{{ skill }}</span><span class="skill-count">{{ matching.size }} project{% if matching.size != 1 %}s{% endif %}</span></summary>
    {% include project-grid.html projects=matching %}
  </details>
      {% endif %}
    {% endfor %}
</div>
  {% endif %}
{% endfor %}

{% assign other_count = 0 %}
{% for skill in unique_skills %}
  {% assign found_in_group = false %}
  {% for group in site.data.skill_groups %}
    {% if group.skills contains skill %}
      {% assign found_in_group = true %}
    {% endif %}
  {% endfor %}
  {% unless found_in_group %}
    {% assign other_count = other_count | plus: 1 %}
  {% endunless %}
{% endfor %}

{% if other_count > 0 %}
<h2 class="skill-group-heading">Other</h2>
<div class="skills-list">
  {% for skill in unique_skills %}
    {% assign found_in_group = false %}
    {% for group in site.data.skill_groups %}
      {% if group.skills contains skill %}
        {% assign found_in_group = true %}
      {% endif %}
    {% endfor %}
    {% unless found_in_group %}
      {% assign matching = site.projects | where_exp: "p", "p.skills contains skill" %}
  <details id="{{ skill | slugify }}" class="skill-accordion">
    <summary><span class="skill-name">{{ skill }}</span><span class="skill-count">{{ matching.size }} project{% if matching.size != 1 %}s{% endif %}</span></summary>
    {% include project-grid.html projects=matching %}
  </details>
    {% endunless %}
  {% endfor %}
</div>
{% endif %}

{% else %}
<p class="text-dim">Nothing here yet, check back soon.</p>
{% endif %}
