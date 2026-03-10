---
title: "An optimizer's view of rare event analysis"
date: 2025-11-03
permalink: /posts/2025/11/academic-optimizer-rare-event/
tags:
  - rare event analysis
  - stochastic dynamics
  - path-space optimization
  - academic posts
---

### Risk analysis

Consider an $$n$$-dimensional vector space where an event is defined via a state space function $$g$$. We assume for now that $$g$$ is at least second-order continuously differentiable, and define the event:

$$
    E := \{x\in \mathbb{R}^n:g(x)<0\}
$$

Let $$X=[X_1,X_2,\ldots, X_d]^\top$$ be random variables with joint density $$f_X$$, the main task of risk assessment is concerned with estimating the probability $$P(g(X)<0)$$. From now on, it is enough to assume that $$X$$ is standard normal defined on $$\mathbb{R}^n$$. For general random vectors $$X$$, the Rosenblatt transformation can be applied. 

In explicit form, we may write the failure probability as a multi-normal integral supported on the set $$E$$:

$$
p = P(g(X)<0) = \frac{1}{(2\pi)^{n/2}}\int_{g(x)<0}\exp\bigg(-\frac12\|x\|^2\bigg)dx
$$

The geometry of the boundary of $$E$$ may be complex. Furthermore, the probability density decays rapidly as $$\|x\|\rightarrow\infty$$. Therefore, it is natural to look for a point $$x^*\in\partial E \quad (g(x^*)=0)$$ such that the probability density is maximized, and replace $$g$$ by its Taylor expansion around $$x^*$$.  

$$
    \begin{align}
    g_2(x) &= g(x^*) + \nabla g(x^*)^T(x-x^*)+\frac12(x-x^*)^T\nabla^2g(x^*)(x-x^*) \\
    &= \nabla g(x^*)^T(x-x^*)+\frac12(x-x^*)^T\nabla^2g(x^*)(x-x^*)
    \end{align}
$$ 

where

$$
    x^* = \arg\max_{g(x)=0}e^{-\frac12\|x\|^2}=\arg\min_{g(x)=0}\frac12\|x\|^2
$$

In what follows, we define the Lagrangian as

$$
L(x,\lambda):=\frac12\|x\|^2-\lambda g(x)
$$ 

where $$g$$ may be approximated.

### First order method

The advantage of such an approximation is the fact that now an approximation to the probability of failure $p$ can be expressed in closed form. At optimality, $$x^*$$ must be the tangent point between the boundary $$g=0$$ and the circle with radius $$\|x^*\|$$. The directions of $$x^*$$ and $$\nabla g_*$$ are perpendicular to the boundary, and there exists a real number $$\lambda$$ such that

$$
  x^* = \lambda \nabla g_*
$$

We implicitly assume that $$x^*\neq 0$$ for this to hold. We outline the derivation below, starting with the first-order approximation $$p\approx P(g_1(X)<0)$$.

$$
  g_1(x) = \nabla g(x^*)^T(x-x^*)
$$

To evaluate the above probability, we notice that $$g_1(X)$$ is a linear function in $$X$$, therefore, $$g_1(X)\sim \mathcal{N}(-(\nabla g_{*})^Tx^*, \|\nabla g_*\|^2)$$, therefore, we can evaluate the integral using the standard Gaussian CDF

$$
    P(g_1(X)<0)=P\bigg(
    \frac{g_1(X)+(\nabla g_*)^Tx^*}{\|\nabla g_*\|} < \frac{(\nabla g_*)^Tx^*}{\|\nabla g_*\|}
    \bigg) = \Phi\bigg(\frac{\nabla g_*^Tx^*}{\|\nabla g_*\|}\bigg)=\Phi(\lambda)
$$

The above approximation can be written in another form if we assume that $g$ is properly defined / oriented such that

$$
    \frac{x^*}{\|x^*\|} = -\frac{\nabla g_*}{\|\nabla g_*\|}
$$

This is the same as saying that the directions of $$x^*$$ and $$\nabla g_*$$ are parallel, as a result of constrained optimizer. However, the alignment / sign is not known a priori, and requires a definition of the failure region as oriented away from the origin. In the above case, we have

$$
    P(g_1(X)<0)=\Phi\bigg(\frac{\nabla g_*^Tx^*}{\|\nabla g_*\|}\bigg) = \Phi(-\|x^*\|).
$$

The first order approximation only works well function $$g$$ is nearly linear in $x$ in a neighborhood of $$x^*$$. (To avoid ambiguity, one may also consider a constrained optimization with inequality constraints, however, the constraint must be active at $$x^*$$ for the following hypersurface approximation to hold.

Asymptotically, the Gaussian CDF function can be approximated

$$
    \Phi(-\beta)\approx (2\pi)^{-1/2}\beta^{-1}\exp\bigg(-\frac12\beta^2\bigg), \quad \beta\rightarrow\infty.
$$

### Second order method

We now move on to the second order model. Let $$\nabla g_*$$ denote the gradient of $$g$$ at $$x^*$$, and let $$H_{g}^*$$ denote the Hessian of $$g$$, we have

$$
    g_2(x)=\nabla g_*^T(x-x^*)+\frac12(x-x^*)^TH_g^*(x-x^*).
$$

Since $$g_2(X)$$ now is not a linear transformation anymore, we need to seek other methods to evaluate the integral exactly. Below, we assume that the LICQ condition is satisfied at $$x^*$$ (for a definition of LICQ, see Nocedal Definition 12.4, Lemma 12.2, Definition 12.5). For a scalar function $$g:\mathbb{R}^d\rightarrow \mathbb{R}$$, LICQ is satisfied trivially. It is sufficient to consider the directions tangent to the hypersurface $$\{g(x)=0\}$$. Suppose there is a unique Lagrange multiplier $$\lambda^*$$ such that the KKT conditions

$$
  \begin{align}
    \nabla_xL(x^*,\lambda^*)&=0\quad\Rightarrow x^*=\lambda^*\nabla g_*\\
     g(x^*)&=0
  \end{align}
$$

are satisfied. (Technically, the null space of the gradient of active constraints is $$(n-1)$$-dimensional, see Nocedal (12.37), containing all vectors $w$ such that $$\nabla g_*^Tw=0$$, i.e., the tangent directions). For any such $$w$$, we have

$$
  w^T\nabla_{xx}^2L(x^*,\lambda^*)w\succeq 0.
$$

In other words, along the tangent directions, the Hessian of Lagrangian is positive semidefinite. More explicitly, we may write

$$
    \nabla_{xx}^2L(x^*,\lambda^*)=\nabla_{xx}^2\bigg(\frac12\|\cdot\|^2-\lambda^*g(\cdot)\bigg)\bigg|_{x=x^*}=I-\lambda^*H_g^*
$$

Let us define $$\beta := \|x^*\|$$, and assume a proper constraint definition $$g$$ such that the KKT conditions can be written as

$$
    x^* = -\beta\frac{\nabla g_*}{\|\nabla g_*\|}.
$$

Recall we are interested in the integral

$$
    (2\pi)^{-n/2}\int_{g_2(x)<0}\exp\bigg(-\frac12\|x\|^2\bigg)dx.
$$

Below, we will exploit properties of the tangent directions, and attempt to approximate the above integral in a more tractable form. The intuition is that $$x^*$$ is related to $$\alpha := -\nabla g_*/\|\nabla g_*\|$$, the tangent directions $$\{w: w^T\nabla g_*=0\}$$ represent directions where one can move without violating the constraint $$g(x)=0$$; therefore, we may say that most of the uncertainty is contained there. Consider the following matrix:

$$
    W = \begin{bmatrix}
    \alpha^T\\
    Z^T
    \end{bmatrix}
$$

where $$Z$$ spans the tangent directions of $$g(x^*)$$. In particular, $$Z^T\nabla g_*=0$$. We assume $$W$$ is orthogonalized; i.e. $$W^TW=WW^T=I$$. Numerically, this can be done via a Gram-Schmidt procedure on the vector $$\alpha$$. With the above definitions, it is clear that $$Z^T\alpha = 0, \alpha^Tx^* = \beta\|\alpha\| = \beta$$. Therefore

$$
    Wx^*=\begin{bmatrix}
    \beta\\
    0_{n-1}
    \end{bmatrix}, \quad W\nabla g_*=
    \begin{bmatrix}
        -1\\
    0_{n-1}
    \end{bmatrix}
$$

where $0_{n-1}$ represents a length $(n-1)$ vector of all 0’s. With the above transformation, let us rewrite the first term

$$
    \begin{align}
        &(\nabla g_*)^T(x-x^*)=(W\nabla g_*)^TW(x-x^*)\\
        &=
        \begin{bmatrix}
        -1 & 0_{n-1}^T
        \end{bmatrix}\bigg(
        \begin{bmatrix}
        y_1\\
        y'
        \end{bmatrix}-
        \begin{bmatrix}
        \beta\\
        0_{n-1}
        \end{bmatrix}
        \bigg) \\
        &=-y_1+\beta
    \end{align}
$$

where we define $$y=Wx$$. In particular, $$y$$ is also independent standard normal due to $$W$$ being an orthogonal rotation. $$y'\in\mathbb{R}^{n-1}$$ is defined as the $$(n-1)$$-components excluding the first component, $$y_1$$. These definitions lead to the last equality. Now, we proceed to approximate the quadratic term. One may also adopt the transformed variables $$y$$ and obtain

$$
    (x-x^*)^TH_g^*(x-x^*)=(y-Wx^*)^TWHW^T(y-Wx^*).
$$

Here, we may write $$WH_g^*W^T$$ more explicitly

$$
    WHW^T=
      \begin{bmatrix}
      \alpha^T\\
      Z^T
      \end{bmatrix}H_g^*
      \begin{bmatrix}
      \alpha & Z
      \end{bmatrix} = 
      \begin{bmatrix}
      \alpha^TH_g^*\alpha & \alpha^TH_g^*Z\\
      Z^TH_g^*\alpha & Z^TH_g^*Z
      \end{bmatrix} = 
      \begin{bmatrix}
      \gamma & h^T\\
      h & Z^TH_g^*Z
      \end{bmatrix}
$$

where we defined $$\gamma := \alpha^TH_g^*\alpha$$, $$h:=Z^TH_g^*\alpha\in\mathbb{R}^{n-1}$$. Something can be said about $$Z^TH_g^*Z$$ since it is part of the projeced Hessian. Second order optimality condition tells us that

$$
    Z^T\nabla_{xx}^2L(x^*,\lambda^*)Z = Z^TZ -\lambda^*Z^TH_g^*Z\succeq 0.
$$

This implies

$$
    \text{spectrum}(Z^TH_g^*Z)\le \frac{1}{\lambda^*}.
$$

Now, we make the approximation

$$
    \begin{bmatrix}
        \gamma & h^T\\
        h & Z^TH_g^*Z
        \end{bmatrix} \approx 
        \begin{bmatrix}
        0 & 0_{n-1}^T\\
        0_{n-1} & Z^TH_g^*Z
    \end{bmatrix}
$$

Thus, the second order term can be written compactly as

$$
    \frac12(y')^TZ^TH_g^*Zy' = \frac12\sum_{k=2}^{n}\xi_ky_k^2
$$

where $$\xi_k$$ is the  $$k$$-th eigenvalue. Computing the above inner product amounts to computing the eigenvalues of the projected Hessian $$Z^TH_g^*Z$$, hence the last equality. We thus arrive at our second order approximation of the boundary surface in $$y$$

$$
    g_2(x)\approx -y_1+\beta+\frac12\sum_{k=2}^{n}\xi_ky_k^2.
$$

The failure probability is then approximated as (expressed in $$y$$, as orthogonal rotation does not alter the density). 

$$
    (2\pi)^{-n/2}\int_{-y_1+\beta+\frac12\sum_{k=2}^n\xi_ky_k^2<0}\exp\bigg(-\frac12\|y\|^2\bigg)dy.
$$

Adopting the variable scaling $$z=\beta^{-1}y$$, we have

$$
    (2\pi)^{-n/2}\int_{-z_1+1+\frac12\sum_{k=2}^n\beta\xi_kz_k^2<0}\exp\bigg(-\frac{\beta^2}{2}\|z\|^2\bigg)dz.
$$

To evaluate this integral, an asymptotically sharp result exists by the works of [[Bleistein 1986, Chapter 8]](https://store.doverpublications.com/products/9780486650821?srsltid=AfmBOop78f801B0MtJ2rhNQYyhV1AUyle-5Yhsg8DsQDx0PLAbSegJBn), subsequently applied in [[Breitung 1984]](https://ascelibrary.org/doi/10.1061/%28ASCE%290733-9399%281984%29110%3A3%28357%29), and reviewed in [[HMOD 2021]](https://link.springer.com/article/10.1007/s00158-021-03013-y). Without details, we state that, as $$\|x^*\|=\beta\rightarrow\infty$$, the probability of failure is approximated as

$$
    \Phi(-\beta)\prod_{k=2}^n(1+\xi_k\beta)^{-1/2}.
$$

An equivalent derivation has been provided in [[Schorlepp 2023]](https://link.springer.com/article/10.1007/s11222-023-10307-2) using a slightly different argument of perturbation. The final expression therein also involves the eigenvalues of the projected Hessian, however, the statement of $$x^* = \beta\cdot\alpha$$ is replaced by the statement $$x^* = \lambda\nabla g_*$$.

The above derivations suggests a clear algorithm

```
# calculate "instanton"
x, lambda = minimize(norm, constraint=g)
beta = norm(x)

# calculate gradient 
grad_g = gradient(g, x)
hess_g = hessian(g, x)

# normalize 
alpha = -grad_g / norm(grad_g)

# evaluate eigenvalues of projected Hessian
Z = gram_schmidt(alpha)
xi = eigen(Z'*hess_g*Z)

# compute first order probability
p_f = cdf(-beta)

# correction factor
cofactor = 1/sqrt(prod(1+beta*xi))

# compute second order probability
p_s = p_f * cofactor
```

