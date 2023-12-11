---
layout: post
title: Julia Implementation of Adaptive Kernel Density Estimator
date: 2023-12-10 17:30:00
tags: research code
---

In this post I put my implementation (in Julia 1.8.0) of the [kernel density estimator via diffusion](https://arxiv.org/abs/1011.2602) (Botev 2010).

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/code/adaptive_kde.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/code/adaptive_kde.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
    {% jupyter_notebook jupyter_path %}
{% else %}
    <p>Sorry, the notebook is playing hide and seek.</p>
{% endif %}
{:/nomarkdown}

And a vectorized version below, with clearer outputs:

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/code/vectorizing_kde.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/code/vectorizing_kde.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
    {% jupyter_notebook jupyter_path %}
{% else %}
    <p>Sorry, the notebook is playing hide and seek.</p>
{% endif %}
{:/nomarkdown}
