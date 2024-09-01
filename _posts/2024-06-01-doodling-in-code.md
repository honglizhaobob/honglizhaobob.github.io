---
layout: post
title: Doodling in Code
date: 2024-06-01 00:00:00
tags: quick-code
---

This is a twin post of "Doodling Math" where I organize random (pun) code snippets. Typically they are code that solve some probability problems. I like to use Python most of the time; you may find trace amounts of Julia.

---

##### Counterexample of Joint Gaussian Distribution

Two random variables being marginally Gaussian does not imply they are jointly Gaussian. Joint Gaussianity of a random vector $$\mathbf{X}\in\mathbb{R}^d$$ means any linear combination of the components is Gaussian. The following is a counterexample: Let $$X, Z\sim \mathcal{N}(0,1)$$. Define:
$$
    Y = \begin{cases} Z,  XZ\ge 0 \\ -Z, XZ\lt 0 \end{cases}
$$

```python
nmc = 10000
x = np.random.randn(nmc)
z = np.random.randn(nmc)
idx = x*z > 0
idx2 = x*z <= 0
y = np.zeros(nmc)
y[idx] = z[idx]
y[idx2] = -z[idx2]
plt.figure(1)
fig, ax = plt.subplots(1, 3, figsize=(20, 4))
nbins = 100
ax[0].hist(x, nbins, color="red"); ax[0].set_title("X")
ax[1].hist(y, nbins, color="blue"); ax[1].set_title("Y")
ax[2].scatter(x, y, color="purple", s=2.0); ax[2].set_title("Joint")
ax[2].set_xlabel("X"); ax[2].set_ylabel("Y")
```

The plot confirms that they are not jointly Gaussian despite being marginally Gaussian.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/posts/doodling-in-code/gaussian_counterexample.png" class="img-fluid rounded z-depth-1" zoomable=true zoomable=true style="width: 50%;" %}
    </div>
</div>
---

##### Good old gambler's ruin & Black-Scholes 

The following notebook contains a simple code snippet to confirm two of the most classical stochastic calculus examples.

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/posts/doodling-in-code/Monte_Carlo_Simulations_and_ Options_Pricing.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/demo/hutchinson.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
    {% jupyter_notebook jupyter_path %}
{% else %}
    <p>Sorry, the notebook is playing hide and seek.</p>
{% endif %}
{:/nomarkdown}