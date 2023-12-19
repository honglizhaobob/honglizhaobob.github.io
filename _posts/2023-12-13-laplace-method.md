---
layout: post
title: Approximating Gaussian Integrals
date: 2023-12-13 14:32:00
tags: math-notes
---

In this note we consider the problem of computing a probability:

$$
    \mathbb{P}(F(\eta) \ge z)
$$

This is defined with respect to a finite number of (standard) normal random variables $$\eta := [\eta_1, \eta_2, \ldots, \eta_d]^T$$. $$z$$ is a fixed constant, and $$F: \mathbb{R}^d\rightarrow\mathbb{R}$$ is some (nonrandom) function that defines the event of interest:

$$
    E_z := \{\eta: F(\eta) > z\}
$$

If we recall the density for multivariate Gaussian random vectors, we have:

$$
    p_{\eta}(s) = \frac{1}{(2\pi)^{d/2}}\exp\bigg(
        -\frac12||s||_2^2
    \bigg)
$$

Then we have the integral:

$$
    \mathbb{P}(E_z) = 
    \frac{1}{(2\pi)^{d/2}}\int_{\mathbb{R}^d}\mathbf{1}_{E_z}\cdot \exp\bigg(
        -\frac12||s||^2
    \bigg)ds
$$

where $$\mathbf{1}_{E_z}(s)$$ is the indicator function that is 1 for any $$s\in E_z$$.

The issues preventing us from evaluating this integral in general are that:

* $$F$$ potentially may be difficult to evaluate.

* The boundaries of integration may not have simple geometry.



However, what we can notice is that the density function is rapidly decreasing with respect to $$\|s\|^2$$. Forgetting about the set $$E_z$$ for now and suppose we want to integrate with respect to the entire space (which should give us 1). The minimizer would certainly be the mode, $$s^* = [0, \ldots, 0]^T$$, then we recover 1 as the final integral indeed.



For more complicated sets $$E_z$$, it might be interesting to postulate that only points $$s$$ within some $$\delta$$ ball around a constrained minimizer, will matter in the integral.



That is:

$$
    \mathbb{P}(F(\eta) > z) \approx \frac{1}{(2\pi)^{d/2}}\int_{E_z}\exp\bigg( 
        -\frac12||s^*||^2
    \bigg)ds = \frac{\mu(E_z)}{(2\pi)^{d/2}}\exp(-\frac12||s^*||^2)
$$

where $$\mu(\cdot)$$ denotes the Lebesgue measure. And since $$E_z$$ does not necessarily contain $$0$$, we define:

\begin{equation} \label{eqn:constrained-optimization}
    s^* := \text{argmin}_{s\in E_z}\frac12||s||^2
\end{equation}

Assuming that the above works well, evaluating the desired probability numerically has been converted into two sub-problems:

* Evaluate $$\mu(E_z)$$.

* Solve constrained optimization problem \eqref{eqn:constrained-optimization}.

In particular, the above says roughly

$$
    \log \mathbb{P}(F(\eta) > z) \sim -\frac12\|s^*\|^2
$$