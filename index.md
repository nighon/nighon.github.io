---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<div class="posts-list">
  <ul>
  {% for post in site.posts %}
    <li class="posts-list-item">
      <a href="{{ post.url }}" class="animate">
        <h2>{{ post.title }}</h2>
      </a>
    </li>
  {% endfor %}
  </ul>
</div>
