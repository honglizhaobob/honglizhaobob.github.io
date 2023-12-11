---
layout: post
title: The Hutchson Estimator
date: 2023-12-10 16:40:00
description: Experimenting with the Hutchinson trace estimator.
categories: quick-code
giscus_comments: false
related_posts: false
---

In this note (timestamp 2022-04-07), our main goal was to consider computing the log determinant of the Jacobian of a function, in particular of the following form

$$
    f(z) := z + g(z; \theta)
$$ 

where $$g:\mathbb{R}^d \rightarrow \mathbb{R}^d$$, parameterized by some parameters $$\theta$$, which we do not explicitly consider here. This form is quite common, especially if one is working with [residual connections in neural net layers](https://arxiv.org/abs/1811.00995). 


# 1. Series approximation of log determinant
---

The Jacobian matrix with of $$f$$ with respect to input $$z$$ is given by:

$$
    \frac{df}{dz} = I_d + \frac{dg_{\theta}}{dz}
$$

or in an alternative notation

$$
    J_f = I_d + J_g
$$

where we assume $$g(\cdot;\theta) = g_{\theta}(\cdot)$$ is Lipschitz with constant $$<1$$. Then necessarily, $$\det J_f > 0$$. We can then apply the identity that $$\log \det(A) = \text{tr} \log A$$ for $$A$$ nonsingular. In particular:

$$
    \text{tr}(\log J_f) = \text{tr}(\log(I + J_g)) = \sum_{k=1}^{\infty}(-1)^{k+1}\frac{\text{tr}(J_g^k)}{k}
$$

which converges with the Lipschitz constraint. 

# 2. Hutchinson trace estimator
---

Without delving into the details, we claim that a [classic trick](https://www.tandfonline.com/doi/abs/10.1080/03610919008812866) (1990) to compute the trace of a matrix $$B$$ is to approximate:

$$
    \text{tr}(B) = \mathbb{E}[v^TBv] \approx \frac{1}{m}\sum_{i=1}^m(v^{(i)})^T(Bv^{(i)})
$$ 

where $$v$$ denotes a random vector, $$v_i$$ is a realization.

$$
    \mathbb{E}[v] = 0, \text{Var}[v] = I
$$

An example of such $$v$$ can be that each entry is independently drawn from a Radamacher distribution.

Accepting that the above approach works, the situation in which one wants to consider such an approximation is when $$d$$ is exceptionally large, and $$B$$ is dense. In this case, computing the trace of $$B^k$$ is at least the cost of doing eigenvalue decomposition, which is $$O(d^3)$$. 

In the case of the estimator, suppose $$O(m)$$ samples are sufficient for convergence, computing the trace of $$B^k$$ amounts to repeated matrix-vector multuplications, which is only $$O(kmd^2)$$ in total, since we'd have to accumulate the multiplied random vectors from indices $$j=1, \ldots, k-1, k$$. 

We provide an implementation below and show that it converges. In this quick note, we did not discuss the following good questions:

* Convergence order of the series.

* Special structures of Jacobian $$J_g$$ and speedups.

* Distributions of $$v$$ and associated biases, variances.

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/demo/hutchinson.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/demo/hutchinson.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
    {% jupyter_notebook jupyter_path %}
{% else %}
    <p>Sorry, the notebook is playing hide and seek.</p>
{% endif %}
{:/nomarkdown}


