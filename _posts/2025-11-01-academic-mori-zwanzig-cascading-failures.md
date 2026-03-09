---
title: 'Data-driven Mori--Zwanzig reduction for cascading failures'
date: 2025-11-01
permalink: /posts/2025/11/academic-mori-zwanzig-cascading-failures/
tags:
  - uncertainty quantification
  - stochastic dynamics
  - reduced-order modeling
  - academic posts
---

In this note, I revisit an older research direction at the intersection of stochastic dynamical systems, reduced-order modeling, and power-system stability. The motivating question is how to construct effective low-dimensional models for rare but consequential events such as cascading line failures. 

<div class="pdf-display-window">
    <iframe src="/files/posts/academic-mori-zwanzig-cascading-failures/power-systems.pdf" width="100%" height="100%" style="border: none;"></iframe>
</div>
<style>
.pdf-display-window {
    width: 600px;
    height: 400px;
    border: 2px solid #333;
    overflow: hidden;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>



The broader goal is to understand how data-driven Mori--Zwanzig (MZ) reduction might be used to study coarse observables in nonlinear stochastic systems without explicitly resolving the full state.

## Motivation

A transient-stability viewpoint suggests three natural questions:

1. What disturbances can drive the system away from equilibrium?
2. How can one characterize the new equilibria that may arise after cascading failures?
3. Can one design reduced models that are useful for prediction or control of such events?

Rather than modeling the full system at all times, it is often more useful to focus on a quantity of interest that captures system degradation at a coarse level.

## Full stochastic model

We will use a power system example. Consider a power grid with $$N+1$$ buses and $$L$$ transmission lines, modeled as a connected graph. The buses consist of generators, load buses, and one slack/reference bus. Let

$$
\boldsymbol{\alpha} =
\begin{bmatrix}
\alpha_0 \\
\vdots \\
\alpha_N
\end{bmatrix} \in \mathbb{R}^{N+1},
$$

where $$\alpha_j = \delta_j - \delta_0$$ is the voltage angle at bus $$j$$ relative to the slack bus, with $$\alpha_0 = 0$$. Relative differences $$\alpha_i - \alpha_k$$ represent phase-angle separation between buses.

A compact stochastic formulation is

$$
d\mathbf{x}_t = (J-S)\nabla \Phi(\mathbf{x}_t)\,dt + \sqrt{2\tau S}\,d\mathbf{W}_t,
$$

where $$J$$ is skew-symmetric, $$S$$ is dissipative, $$\Phi$$ is an energy-like potential, and $$\mathbf{W}_t$$ is standard Brownian motion. The associated Fokker--Planck equation for the density $$p(t,\mathbf{x})$$ is

$$
\partial_t p
+
\nabla_{\mathbf{x}} \cdot \bigl[(J-S)\nabla_{\mathbf{x}}\Phi(\mathbf{x})\,p\bigr]
=
\nabla_{\mathbf{x}} \cdot \bigl[\tau S \nabla_{\mathbf{x}} p\bigr].
$$

Under suitable assumptions, this dynamics admits an equilibrium Gibbs-type measure.

## Arbitrary quantities of interest

A natural coarse observable is the number of failed lines,

$$
z = L - \sum_{r=1}^L \gamma_r,
$$

where $$L$$ is the total number of transmission lines and each $$\gamma_r$$ is a smoothed indicator of whether line $$r$$ remains operative.

In a more detailed model, the dynamics may be written schematically as

$$
\begin{cases}
\dot{\omega}_g = -\mathbf{M}_g^{-1}\mathbf{D}_g \omega_g - \mathbf{M}_g^{-1}\mathbf{\Pi}_1^T f(\alpha, V_l, \gamma), \\
\dot{\alpha} = \mathbf{\Pi}_1 \omega - [\mathbf{\Pi}_2 \mathbf{D}_l^{-1} \mathbf{\Pi}_2^T] f(\alpha, V_l, \gamma), \\
\dot{V}_l = -\mathbf{D}_v^{-1} g(\alpha, V_l, \gamma), \\
\dot{\gamma} = -\mathbf{D}_{\gamma}^{-1} h(\alpha, V_l, \gamma).
\end{cases}
$$

Since $$z$$ depends only on the line-status variables $$\gamma$$, its evolution satisfies

$$
\dot{z}
=
-\sum_{r=1}^L \dot{\gamma}_r
=
\sum_{r=1}^L [\mathbf{D}_{\gamma}^{-1} h(\alpha, V_l, \gamma)]_r.
$$

Thus, if we augment the full system with the coarse variable $$z$$, we may write

$$
\begin{bmatrix}
\dot{\mathbf{x}}_1 \\
\dot{x}_2
\end{bmatrix}
=
\begin{bmatrix}
\mathbf{A}\nabla \Phi(\mathbf{x}_1) \\
R(x_2; \mathbf{x}_1)
\end{bmatrix},
$$

where $$\mathbf{x}_1$$ denotes the original high-dimensional state and $$x_2 := z$$ is the quantity of interest.

## Reduced density viewpoint

Suppose the initial condition is random, $$\mathbf{x}_0 \sim \rho_0$$. The full density satisfies a Fokker--Planck equation in the full phase space. If we are interested only in the marginal dynamics of $$x_2=z$$, then integrating out the remaining variables formally yields a reduced transport equation of the form

$$
\partial_t p(t,x_2)
+
\partial_{x_2}
\Bigl[
\mathbb{E}(\Psi(\mathbf{x}) \mid X_2 = x_2)\, p(t,x_2)
\Bigr]
=
0.
$$

This equation is exact at the formal level, but it is not closed. The conditional expectation term depends on the unresolved variables through the conditional law $$p(\mathbf{x}_1 \mid x_2)$$. In principle, that quantity can be estimated from Monte Carlo simulation, but doing so reliably in high dimension is difficult.

## Mori--Zwanzig formalism

The Mori--Zwanzig formalism provides a systematic way to eliminate unresolved variables by projection. Consider the general stochastic system

$$
d\mathbf{x}_t = \mathbf{F}(\mathbf{x}_t)\,dt + \boldsymbol{\sigma}(\mathbf{x}_t)\,d\mathbf{W}_t,
\qquad
\mathbf{x}_0 \sim p_0.
$$

Its density evolves according to the Fokker--Planck equation

$$
\frac{\partial}{\partial t}p(t,\mathbf{x})
-
\nabla_{\mathbf{x}} \cdot \bigl[\mathbf{F}(\mathbf{x})p(t,\mathbf{x})\bigr]
+
\nabla_{\mathbf{x}} \cdot
\left[
\frac12 \boldsymbol{\sigma}(\mathbf{x})\boldsymbol{\sigma}(\mathbf{x})^T
\nabla_{\mathbf{x}} p(t,\mathbf{x})
\right]
= 0.
$$

Let $$u(\mathbf{x}_t)$$ be an observable of interest. The noise-averaged observable can be written as

$$
w_t = \mathbb{E}[u(\mathbf{x}_t)\mid \mathbf{x}_0] = e^{t\mathcal{K}} u(\mathbf{x}_0),
$$ where $$\mathcal{K}$$ is the backward Kolmogorov operator.

Introducing a projection $$\mathcal{P}$$ onto resolved observables, with complementary projection $$\mathcal{Q} = I-\mathcal{P}$$, the Mori--Zwanzig identity yields an exact equation of the form

$$
\frac{d}{dt}\mathcal{P}e^{t\mathcal{K}} w_0
=
\underbrace{\mathcal{P}e^{t\mathcal{K}}\mathcal{P}\mathcal{K}w_0}_{\text{Markovian term}}
+
\underbrace{
\int_0^t
\mathcal{P}e^{s\mathcal{K}}
\mathcal{P}\mathcal{K}
e^{(t-s)\mathcal{Q}\mathcal{K}}
\mathcal{Q}\mathcal{K}w_0\,ds
}_{\text{memory term}}.
$$

The reduced dynamics is therefore not generally Markovian. Even if the original system is Markovian in the full state, the coarse observable inherits a memory integral after unresolved variables are eliminated. Coarse dynamics are often governed not by a closed ODE, but by an integro-differential equation with memory.

## Data-driven effective MZ equation

A convenient reduced form is

$$
\frac{d}{dt} w(t) = R(w(t)) + \int_0^t K(t-s) w(s)\,ds + f(t),
$$

where $$R$$ is the Markovian part; $$K$$ is the memory kernel, $$f$$ is the fluctuation term.

After projection, one obtains an effective reduced equation for the resolved observable,

$$
\frac{d}{dt}\mathcal{P}w(t)
=
R(\mathcal{P}w(t))
+
\int_0^t K(t-s)\mathcal{P}w(s)\,ds.
$$

The main difficulty is therefore to estimate the memory term from data.

## Two data-driven methods

### 1. Kernel regression for the memory term

One approach is to expand the memory kernel in a basis,

$$
K(t) = \sum_{i=0}^n k_i \psi_i(t),
$$ with basis functions $$\psi_i$$ on $$\mathbb{R}_{\ge 0}$$. If one has simulated trajectories of the full system and has already identified the Markovian contribution $$R$$, then the coefficients $$k_i$$ can be estimated by regressing

$$
\frac{d\widehat{w}}{dt} - R(\widehat{w}(t))
$$

against the convolutions

$$
\int_0^t \psi_i(s)\widehat{w}(s)\,ds.
$$

This leads to a least-squares problem over a time interval $$I$$,

$$
\left\|
\left(
\frac{d\widehat{w}}{dt} - R(\widehat{w}(t))
\right)
-
\sum_{i=0}^n
k_i \int_0^t \psi_i(s)\widehat{w}(s)\,ds
\right\|_{L^2(I)}.
$$

Once the coefficients are learned, the reduced equation may be simulated directly. The appeal of this approach is that it preserves the integro-differential structure of the effective MZ equation.

### 2. Neural networks with memory

A second direction is to bypass explicit kernel identification and instead learn the reduced dynamics directly from lagged observations of the quantity of interest.

Suppose the resolved observable is denoted by $$\mathbf{z}(t)$$, and assume the relevant memory is concentrated over a finite horizon $$T_M$$. Then one may approximate the memory integral by a neural network taking a window of lagged states as input,

$$
\int_0^{T_M} K(t-s)\mathbf{z}(s)\,ds
\approx
\mathbf{N}_{\theta}(\mathbf{z}_{n-n_M},\dots,\mathbf{z}_{n-1},\mathbf{z}_n).
$$

This leads to a recurrent update of the form

$$
\mathbf{z}_{n+1}
=
\mathbf{z}_n
+
\mathbf{N}_{\theta}(\mathbf{z}_{n-n_M},\dots,\mathbf{z}_n).
$$

This viewpoint is appealing because it does not require an explicit analytic form of either the Markovian term or the memory kernel. The tradeoff is that the model is much less interpretable and introduces hyperparameters such as the memory length $$T_M$$ and network architecture.


## References

- Fu, X., Chang, L.-B., and Xiu, D. (2020). *Learning reduced systems via deep neural networks with memory*. arXiv:2003.09451.

- Maltba, T. E., Zhao, H., and Tartakovsky, D. M. (2021). *Autonomous learning of nonlocal stochastic neuron dynamics*. arXiv:2011.10955.

- Mori, H. (1965). *Transport, collective motion, and Brownian motion*. **Progress of Theoretical Physics**, 33(3), 423–455.

- Qin, T., Chen, Z., Jakeman, J., and Xiu, D. (2020). *Data-driven learning of non-autonomous systems*. arXiv:2006.02392.

- Zhu, Y., and Lei, H. (2021). *Effective Mori--Zwanzig equation for the reduced-order modeling of stochastic systems*. arXiv:2102.01377.