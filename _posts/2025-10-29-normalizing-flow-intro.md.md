---
title: 'A survey of math behind normalizing flows'
date: 2025-10-29
permalink: /posts/2025/10/normalizing-flow-intro/
tags:
  - AI notes
  - generative models
  - normalizing flows
---

In this short note, we present normalizing flow as an expressive and powerful generative model under which both sampling and density evaluations are efficiently able to be implemented. Possible applications of normalizing flow can be found in solving high-dimensional partial differential equations (PDE).

---

# 1. Notations, Definitions and Theorems

Below we present some common notations and results that we will use in the following sections. We assume that the audience has an application-focused understanding of probability theory (but not the measure-theoretic counterpart).

In the probabilistic setting, we denote $$x \sim p_X(x)$$ as “random variable $$x$$ is distributed according to probability distribution with density $$p_X(x)$$.”  
Let $$(\Omega,\mathcal{F},\mathbb{P})$$ denote a probability space.  
For the probability density function $$p_X$$, in certain cases we encounter the fact that it may be parametrized (such as in the setting of a Gaussian normal $$\mathcal{N}(\mu,\sigma)$$).  
We denote $$\theta$$ as our class of parameters, and $$p_\theta(x)$$ as the density.

A **random variable** $$X$$ is a mapping from $$\Omega \to \mathbb{R}^d$$.  
We will explicitly distinguish cases where measure theory needs to be considered.  
Otherwise, $$x$$ can be assumed as in $$\mathbb{R}^d$$, and let

$$
\mathbb{E}[x] = \int_{\Omega} x \, p_X(x)\, dx
$$

denote the expectation (expected value) of $$x \sim p_X(x)$$.

In numerical methods we often approximate true values; we use a hat to denote an approximation. For example, an approximation to the expected value is often done by sampling a probability distribution and taking the average over sample points $$\{x_i\}_{i=1}^N$$:

$$
\widehat{\mathbb{E}}[x] = \frac{1}{N}\sum_{i=1}^{N} x_i.
$$

Another commonly used quantity is the **variance**, defined as the expected squared deviation from the mean:

$$
\mathrm{Var}[x] = \mathbb{E}\big[(x-\mathbb{E}[x])^2\big].
$$

At times it is convenient to simplify notation: we may write the expectation as $$\hat{x}$$ or $$\langle x\rangle$$, and the variance as $$\sigma_x^2$$.  
When the underlying probability density needs to be explicit, we add subscripts:

$$
\mathbb{E}[x]_{x\sim p_X}, \qquad \sigma^2_{x\sim p_X}.
$$

- A random variable $$x$$ can be either **discrete** or **continuous**.  
  In the continuous setting $$(d=1)$$:

  $$
  \mathbb{P}(x\in [a,b]) = \int_{[a,b]} p_X(x)\,dx.
  $$

- In continuous space, integration is $$\int$$. The discrete counterpart (when verifying with data) is $$\sum$$.

- (**Normalizing**) A valid probability density is nonnegative and has unit mass.  
  When learning densities from data, we must enforce

  $$
  \int_{\mathbb{R}^d} p(x)\,dx = 1, \quad \text{or} \quad \sum_{i=1}^N p(x_i)=1.
  $$

- (**Chain rule of probability**)  
  High-dimensional settings allow us to decompose a multivariate density into a sequence of single-variable conditionals:

  $$
  p(x_1,\dots,x_d) = \prod_{j=1}^{d} p\big(x_j \mid x_1,\dots,x_{j-1}\big),
  $$

  where

  $$
  p(x_j\mid x_{<j}) = \frac{p(x_1,\dots,x_j)}{p(x_1,\dots,x_{j-1})},
  $$

  and marginals integrate out the remaining variables:

  $$
  p(x_{\le j}) = \int_{\mathbb{R}\times\cdots\times \mathbb{R}} p(x_1,\dots,x_d)\, dx_{j+1}\cdots dx_d.
  $$

- (**Change of variables, $$d=1$$**)  
  Let $$x\sim p_X(x)$$ and $$z=f(x)$$ (or $$x=f^{-1}(z)$$), where $$f$$ is invertible and differentiable. Then

  $$
  p_Z(z) = p_X(x)\,\left|\frac{dx}{dz}\right|.
  $$

  A derivation follows from the CDF

  $$
  F_X(x)=\int_{(-\infty,x]} p_X(x)\,dx,
  $$

  using $$x=f^{-1}(z)$$ and the inverse function theorem.

- (**Change of variables, general $$d$$**)  
  For $$f:\mathbb{R}^d\to\mathbb{R}^d$$, define the Jacobian $$J_f(z) = \frac{dz}{dx}$$ and determinant notation $$|\cdot| = \det(\cdot)$$.  
  For nonsingular $$A\in\mathbb{R}^{d\times d}$$, we have $$\det(A^{-1})=\det(A)^{-1}$$.  
  The determinant $$\left|\frac{dz}{dx}\right|$$ is the **volume correction**.

- (**Closure under composition**)  
  Let $$\{f_i\}_{i=1}^M$$ be invertible and differentiable. Then

  $$
  f = f_M\circ f_{M-1}\circ \cdots \circ f_1
  $$

  is invertible and differentiable, with inverse

  $$
  f^{-1} = f_1^{-1}\circ \cdots \circ f_M^{-1},
  $$

  and the Jacobian chain rule gives

  $$
  \frac{df}{dz} = \prod_{i=1}^{M} \frac{df_i}{df_{i-1}}, \quad \text{with } f_0(z)=z.
  $$

- (**Law of the Unconscious Statistician**)  
  Let $$z\sim p_Z(z)$$ be known and easy to evaluate.  
  If $$x=f(z)$$ with $$p_X$$ difficult or unknown, then

  $$
  \mathbb{E}[x] = \mathbb{E}[f(z)] = \int_{\mathbb{R}^d} f(z)\,p_Z(z)\,dz.
  $$

- (**Inverse-CDF sampling**)  
  Let $$x=(x_1,\dots,x_d)\in\mathbb{R}^d$$. By the product rule,

  $$
  p_X(x_1,\dots,x_d) = \prod_{i=1}^{d} p\big(x_i \mid x_{<i}\big).
  $$

  The CDF of each conditional is

  $$
  F_X(x_i\mid x_{<i}) = \int_{-\infty}^{x_i} p\big(u \mid x_{<i}\big)\,du.
  $$

  Define $$f_i(\cdot)=F_X(\cdot\mid x_{<i})$$ and set

  $$
  z_i = f_i(x_i).
  $$

  Then $$f=(f_1,\dots,f_d)$$ maps $$\mathbb{R}^d \to [0,1]^d$$, and it is invertible since each CDF is monotone:

  $$
  x_i = f_i^{-1}(z_i).
  $$

  By change of variables,

  $$
  p_Z(z) = p_X(x)\,\left|\det\!\left(\frac{dz}{dx}\right)\right|^{-1}.
  $$

  Here the Jacobian is **lower-triangular** because $$x_i$$ is independent of $$z_{>i}$$.  
  On the diagonal,

  $$
  \frac{dz_i}{dx_i} = \frac{d}{dx_i} f_i(x_i) = p\big(x_i \mid x_{<i}\big),
  $$

  so

  $$
  \left|\det\!\left(\frac{dz}{dx}\right)\right| = \prod_{i=1}^d p\big(x_i \mid x_{<i}\big) = p(x_1,\dots,x_d).
  $$

  Therefore

  $$
  p_Z(z) = p_X(x)\cdot \frac{1}{p_X(x)} = 1,
  $$

  which implies $$z \sim \mathrm{U}([0,1]^d)$$.

This derivation explains why normalizing flows are expressive enough to capture any distribution $$x\sim p_X(x)$$.  
In some literature, the **generative direction** is called the *conditional distribution sampling method*, where a random vector is generated step-by-step via inverse CDFs — equivalent to the same underlying process.

- (**Matrix calculus facts used for continuous-time flows**)  

  - *Adjugate matrix:* For an $$n\times n$$ matrix $$A$$,

    $$
    \operatorname{adj}(A) = C^{\mathsf T} = \det(A)\,A^{-1},
    $$

    where $$C$$ is the cofactor matrix.

  - *Jacobi’s formula:*  
    If $$A(t)$$ is differentiable with $$A:\mathbb{R}\to \mathbb{R}^{n\times n}$$, then

    $$
    \frac{d}{dt}\det\!\big(A(t)\big)
    = \operatorname{tr}\!\Big( \operatorname{adj}\!\big(A(t)\big)\,\frac{dA(t)}{dt} \Big).
    $$

## 2. Normalizing Flow as a Generative Model

In applications of machine learning, one major goal is to discover underlying patterns of data.  
In *generative models*, we achieve this by directly approximating the probability distribution from which samples are drawn, and provide an efficient way to generate or predict new samples.  

In short, the main goals we would like to achieve with a good *generative probabilistic model* are as follows:

- provide a satisfactory fit and generalization of training data with unknown distribution  
- computationally convenient sampling (prediction of new data) and density evaluation from the learned model, especially in the high-dimensional case  
- qualitatively explainable latent space or low-dimensional representation  

In the following sections, we briefly discuss why normalizing flow can achieve these criteria, and common directions for building such tools.

## 3. Forms of Normalizing Flow and Computational Complexity

In the following formulations we discuss the methods in the *generative direction*, which also gives us an algorithm for sampling from a complex distribution once we have trained a flow:

1. sample latent dataset $$z$$ according to desired $$p_Z(z)$$  
2. obtain $$x = f(z)$$ as samples from $$p_X(x)$$  

Equivalently, one can also describe the process in the *normalizing direction*, which describes how normalizing flow can be used for density evaluation:

1. dataset $$x$$ is acquired  
2. evaluate $$p_X(x)$$ by evaluating $$p_Z(f^{-1}(x))$$ and applying volume correction  

---

### 3.1 Computational Considerations

In the following method presentations, there is a balance between the ease of:

- *density evaluation*: cost of computing $$\left|\det\!\left(\frac{dx}{dz}\right)\right|$$.  
  The naive expansion of the determinant of a dense matrix is $$O(n!)$$.  
  One also considers LU factorization or SVD decomposition, which costs $$O(n^3)$$ at least.  
  Research efforts have focused on special $$\frac{dx}{dz}$$ matrix forms (triangular, diagonal, or block diagonal) to reduce time complexity.

- *sampling*: cost of computing $$f^{-1}$$.  
  The specific cost depends on the choice of $$f$$.  
  For instance, when $$f = A x + b$$ is an affine transformation and $$A$$ is dense, computing $$f^{-1}$$ amounts to finding $$A^{-1}$$, which by Gaussian elimination is at least $$O(n^3)$$.  
  In certain cases (such as neural networks), the inversion is intractable.

- *preservation of dimensions*: as dimensions between invertible maps must be the same, the cost of evaluating $$f(z)$$ itself scales with $$d$$.

---

### 3.2 Expressiveness of Normalizing Flow

We demonstrate the result in $$d = 1$$.  
Multivariate PDFs can be formed similarly by *conditional distribution sampling*.  
Inverse CDF sampling is a special case of normalizing flow.  
Namely, regardless of the complexity of $$p_X(x)$$, the target distribution can always be represented via the cumulative distribution function (CDF) as a suitable flow.  
CDFs are monotonically increasing and differentiable, and therefore satisfy the desired properties.

Precisely, inverse CDF sampling can be described as:

1. generate $$u \sim U([0,1])$$  
2. let $$f = F_X^{-1}$$ where $$F_X$$ is the CDF of $$p_X$$  
3. $$x = f(u)$$ produces the desired distribution $$x \sim p_X(x)$$  

By inverse CDF sampling, we have demonstrated that there always exists an invertible map $$f$$ such that $$f(z)$$ can be flexibly expressive.  
In other words, any complex distribution can be normalized as a uniform distribution.  
This also implies that the base distribution does not need to be $$U([0,1])$$, as compositions of flows form other flows.  

To transform an arbitrary distribution $$p_Z$$ to another arbitrary distribution $$p_X$$, one can consider:

$$
p_X \xrightarrow{f_1} U([0,1]) \xrightarrow{f_2} p_Z
$$


### 3.3 Affine Normalizing Flow: Building Block

$$
\theta = (A, b) \in \mathbb{R}^{d\times d} \times \mathbb{R}^d
$$

where we require $$A$$ to be invertible.

$$
x = f(z) = A z + b, \qquad \frac{df}{dz} = A^{\mathsf T}.
$$

The linear flow has several limitations both in expressiveness and computation.  
Suppose $$z \sim \mathcal{N}(0, I)$$, then

$$
p_X(x) = \frac{1}{|\det(A)|} \, p_Z(f^{-1}(x))
        = \frac{1}{|\det(A)|} \, p_Z(A^{-1}(x - b)).
$$

We have the multivariate Gaussian normal distribution:

$$
p_Z(z) = (2\pi)^{-d/2} \exp\!\left(-\tfrac{1}{2} z^{\mathsf T} z \right).
$$

Then

$$
\begin{aligned}
p_X(x)
  &= \frac{1}{|\det(A)|} (2\pi)^{-d/2}
     \exp\!\left(-\tfrac{1}{2}(A^{-1}(x-b))^{\mathsf T}(A^{-1}(x-b))\right) \\[6pt]
  &= \frac{1}{(2\pi)^{d/2}|\det(A)|\,|\det(A^{\mathsf T})|^{1/2}}
     \exp\!\left(-\tfrac{1}{2}(x-b)^{\mathsf T}(A A^{\mathsf T})^{-1}(x-b)\right)
\end{aligned}
$$

which means $$x \sim \mathcal{N}(b, A A^{\mathsf T})$$.

Furthermore, compositions of linear flows result in linear flows.  
Let $$f_1(z) = A z + b$$ and $$f_2(z) = C z + d$$.  
Then

$$
f_2(f_1(z)) = C(Az + b) + d = C A z + (C b + d).
$$

Finally, training $$O(d^3 + d)$$ parameters directly, evaluation of density and sampling are inefficient in high dimensions, as both computing $$A^{-1}$$ and $$|\det(A)|$$ require $$O(d^3)$$ flops.  
Further restrictions on $$A$$ can be made to simplify the computations (for instance, using diagonal or triangular $$A$$).


### 3.4 Coupling Layers

A *coupling layer* can benefit us in high dimensions in terms of the computational cost of evaluating the determinant while only using affine transformations.  
This is done by moving work to the region of the Jacobian that is *free of charge*, by taking advantage of the observation that the determinant of a triangular matrix is simply the product of its diagonals.

A coupling layer takes the general form (partitioning $$z$$) into two parts:

$$
z =
\begin{bmatrix}
z_{\le m} \\
z_{> m}
\end{bmatrix}
$$

and define

$$
x =
\begin{bmatrix}
x_{\le m} \\
x_{> m}
\end{bmatrix}
=
\begin{bmatrix}
z_{\le m} \\
f(z_{> m};\, h(z_{\le m}))
\end{bmatrix}
$$

where $$f$$ is invertible and $$h$$ has no restrictions.  
It is the restriction-free $$h(\cdot)$$ that introduces nonlinearity at a low computational cost during both training and evaluation.

We can explicitly compute the form of the Jacobian:

$$
\frac{dx}{dz} =
\begin{pmatrix}
I_m & 0 \\
\frac{dx_{> m}}{dz_{\le m}} & D
\end{pmatrix}
$$

where $$D$$ is a matrix with entries $$\frac{dx_{> m}}{dz_{> m}}$$.

This is an interesting construction because we are essentially allowed to have any nonlinearity without causing the computational cost to skyrocket in high dimensions, as the determinant is:

$$
\left|\det\!\left(\frac{dx}{dz}\right)\right|
= \prod_{i > m} \frac{d}{dz_i} f(z_{> m};\, h(z_{\le m})).
$$

Here, $$h(z_{\le m})$$ has no dependence on $$z_{> m}$$ and therefore does not need to be differentiated.  
Furthermore, the volume correction only requires the determinant rather than the full Jacobian matrix itself.  
Therefore, we need not be concerned with the lower-triangular part, even when $$h$$ is non-differentiable.

#### 3.4.1 Nonlinearity “for Free”

Due to this result, for example, early normalizing flow architectures were able to generate impressive results using only *additive coupling layers* and by learning $$h$$ as a neural network, without adding computational costs.

Since the lower triangular region of the Jacobian can help us perform operations *for free*, there have been research efforts focused on exploiting this region as much as possible. Some works propose recursive constructions to make this efficient.

It has been shown that multiple layers of coupling flow form a *universal approximator*.  
However, one needs to enforce sufficient *mixing* — namely, permuting the state variables so that information from each can be learned.  
A permutation of variables can also be viewed as a volume-preserving invertible map.

### 3.5 Autoregressive Flow

Autoregressive flow is one of the most commonly used flow structures with conveniently computable determinants.  
This is achieved by letting the flow map of each $$x_i$$ depend on certain parameters generated via all previous latent variables $$z_{<i}$$ but not *future ones* $$z_{\ge i}$$.

It takes the general form:

$$
x_i = f(z_i, h_i), \qquad h_i = h_i(z_{<i})
$$

Here, $$f$$ must be strictly monotonic, and $$h_i$$ serves as the parametrization.  
Similar to coupling layers, the Jacobian matrix also takes a lower-triangular form: since $$x_i = f(z_i, h_i(z_1, z_2, \dots, z_{i-1}))$$ depends on all previous variables, the upper-triangular derivatives are all zero:

$$
\frac{dx}{dz} =
\begin{pmatrix}
\frac{\partial x_1}{\partial z_1} & 0 & \cdots & 0 \\
A & \ddots & \ddots & \vdots \\
\vdots & \ddots & \frac{\partial x_d}{\partial z_d} & 0
\end{pmatrix}
$$

where $$A$$ contains the remaining derivatives.  
However, we do not need to compute them explicitly, since the determinant reduces to the diagonal product:

$$
\left|\det\!\left(\frac{dx}{dz}\right)\right|
  = \prod_{i=1}^{d} \frac{\partial x_i}{\partial z_i}.
$$

Autoregressive flows can be shown to be *universal approximators*.  
Equivalently, any autoregressive model corresponds to a one-layer autoregressive flow.  
Due to the lower-triangular property, similar to coupling layers, $$h(\cdot)$$ can also be quite flexible—it need not be invertible.

The training process of an autoregressive model can be understood as follows:

1. **Decompose the joint probability by the product rule**
   $$
   p(x_1, x_2, \dots, x_d)
     = \prod_{i=1}^{d} p(x_i \mid x_{<i})
   $$

2. **Model** $$p(x_i \mid x_{<i})$$ **as a parametrized single-variable distribution**  
   (such as a normal or mixture Gaussian):
   $$
   p(x_i \mid x_{<i}) = p(x_i; h_i(x_{<i}))
   $$

By the conditional distribution sampling result, we can let

$$
x_i = f(z_i, h_i)
     = F_X^{-1}(z_i; h_i),
$$

where

$$
F_X(x_i; h_i)
   = \int_{-\infty}^{x_i} p(x_i; h_i)\,dx_i.
$$

Thus, we obtain an autoregressive flow with $$z \sim U([0,1])$$ as the base distribution.

A main drawback of autoregressive flow is that computing the inverse is sequential and cannot be parallelized:

$$
z_i = f^{-1}(\cdot; h_i)(x_i),
$$

since one must wait until all $$x_{<i}$$ have been inverted to access the $$z_{<i}$$ information required in the parametrization of $$h_i$$.

A modification, called *Inverse Autoregressive Flow (IAF)*, moves this issue “to the other side.”  
Although inversion is parallelizable (but not the generative direction), IAF redefines the conditioning variables:

$$
x_i = f(z_i, h_i), \qquad h_i = h_i(x_{<i}),
$$

so that the correlations among these variables remain the same, giving similar expressive power as AF.

---

#### 3.5.1 Special Case: Elementwise Flow

To make parallelization always possible, one can also flow each variable independently of all others:

$$
x_i = f(z_i)
$$

This is the same as an autoregressive flow but without conditioning on any variables.  
It limits expressive power by removing cross-variable mixing, but it is highly parallelizable and has a very cheap determinant:

$$
\left|\det\!\left(\frac{dx}{dz}\right)\right|
  = \prod_{i=1}^{d} \frac{dx_i}{dz_i}.
$$

### 3.6 Continuous-Time Flow

So far, the flows we have discussed are characterized by discrete stages of finite transformations:

$$
x = f_K \circ f_{K-1} \circ \cdots \circ f_2 \circ f_1(z).
$$

We can naturally interpret the indices $$\{1,2,\dots,K\}$$ as discrete time snapshots of a continuous flow $f_t$ in the space of diffeomorphisms, where the group algebra satisfies  
$$f_{t_1} \circ f_{t_2} = f_{t_1+t_2}$$, reflecting that infinitesimally close compositions remain valid flows.  

Equivalently, one can view the discrete compositions as the evolution of the base distribution $$z \sim p_Z(z)$$:

$$
\begin{aligned}
z_1 &= \mathrm{id}(z_0),\\
z_2 &= f_1(z_1),\\
z_3 &= f_2(z_2),\\
&\vdots \\
z_{K+1} &= f_K(z_K),\\
x &= z_{K+1}.
\end{aligned}
$$

This is equivalent to discretizing a continuous underlying ODE:

$$
\frac{d}{dt} z(t) = f(t, z(t); \theta(t)).
$$

---

Given a base distribution $$z \sim p_Z(z)$$, we can obtain a complex distribution $$x \sim p_X(x)$$ using the fundamental theorem of calculus:

$$
x = z_T = z_0 + \int_0^T f(t, z(t); \theta(t))\,dt
       = z + \int_0^T f(t, z(t); \theta(t))\,dt,
$$

or equivalently, for the normalizing direction,

$$
z = x - \int_0^T f(t, z(t); \theta(t))\,dt.
$$

A continuous-time flow offers several advantages over discrete flows:

- ease of inverse flow,  
- fewer parameters to train than discrete counterparts,  
- flexible tolerance (granularity can be made arbitrarily fine),  
- optimization only requires ODE solvers rather than complex graph backpropagation.

---

#### Theorem 3.1 (Change of variables formula, continuous case)

Let $$z_t \in \mathbb{R}^d$$ be a random variable distributed according to $$p_Z(z_t)$$, and let

$$
\frac{dz_t}{dt} = f(t, z_t)
$$

describe its dynamics.  
If $$f : \mathbb{R} \times \mathbb{R}^d \to \mathbb{R}^d$$ is uniformly Lipschitz in $$z_t$$ and continuous in $$t$$, then the log-probability follows the ODE:

$$
\frac{\partial \log p_Z(z_t)}{\partial t}
  = -\,\mathrm{tr}\!\left( \frac{\partial f}{\partial z_t} \right).
$$

---

*Proof.*  
By definition of partial derivative in $$t$$,

$$
\frac{\partial \log p(z(t))}{\partial t}
  = \lim_{\epsilon \to 0^+}
    \frac{\log p(z(t+\epsilon)) - \log p(z(t))}{\epsilon}.
$$

The $$\epsilon$$-time evolution defines a mapping
$$f_\epsilon : \mathbb{R}^d \to \mathbb{R}^d$$
so that

$$
z(t+\epsilon)
   = f_\epsilon(z(t))
   := z(t) + \frac{dz(t)}{dt}\,\epsilon + O(\epsilon^2) + \cdots.
$$

As $$\epsilon \to 0^+$$, $$f_\epsilon \to \mathrm{id}$$.
By the change-of-variables formula,

$$
p(z(t+\epsilon))
 = p(f_\epsilon(z(t))) \cdot
   \left|\det\!\left(\frac{df_\epsilon(z(t))}{dz(t)}\right)\right|^{-1}.
$$

Taking logs gives

$$
\log p(z(t+\epsilon))
  = \log p(z(t)) -
    \log \left|\det\!\left(\frac{df_\epsilon(z(t))}{dz(t)}\right)\right|.
$$

Substitute back:

$$
\frac{\partial \log p(z(t))}{\partial t}
 = \lim_{\epsilon \to 0^+}
   \frac{-\log \left|\det\!\left(\frac{\partial f_\epsilon}{\partial z}\right)\right|}
        {\epsilon}.
$$

Both numerator and denominator vanish as $$\epsilon \to 0$$, so by L’Hôpital’s rule,

$$
= -\lim_{\epsilon \to 0^+}
    \frac{\partial}{\partial \epsilon}
    \log \left|\det\!\left(\frac{\partial f_\epsilon}{\partial z}\right)\right|.
$$

Using orientation-preserving assumption (so $$\det>0$$) and Jacobi’s formula,

$$
= -\lim_{\epsilon \to 0^+}
    \mathrm{tr}\!\left(
      \mathrm{adj}\!\left(\frac{\partial f_\epsilon}{\partial z}\right)
      \frac{\partial}{\partial \epsilon}
      \frac{\partial f_\epsilon}{\partial z}
    \right).
$$

As $$\epsilon\to 0^+$$, $$\frac{\partial f_\epsilon}{\partial z} \to I$$,
thus finally

$$
\frac{\partial \log p(z(t))}{\partial t}
  = -\,\mathrm{tr}\!\left(
      \frac{\partial f(t, z(t))}{\partial z}
    \right),
$$

which avoids computing determinants explicitly.
$$\square$$

---

#### Gradient Backpropagation in Continuous-Time Flows

To optimize a cost function $$L(\cdot)$$, one must backpropagate gradients through layers.
In the discrete case (one hidden layer):

$$
z \to x := f(z) \to L(f(z)),
$$

the gradient is

$$
\left(\frac{\partial L}{\partial z}\right)^{\!\!T}
  = \left(\frac{\partial L}{\partial x}\right)^{\!\!T}
    \frac{\partial x}{\partial z}.
$$

In continuous time, a similar process applies.  
Let

$$
a(t) = \frac{\partial L}{\partial z(t)},
$$

then $$a(t)$$ satisfies the ODE

$$
\frac{d}{dt} a(t)
  = -\,a(t)^{\mathsf T}
    \frac{\partial f(t, z(t))}{\partial z(t)}.
$$


Now use the definition of the derivative:

$$
\frac{d}{dt}a(t)
= \lim_{\epsilon\to 0^+}\frac{a(t+\epsilon)-a(t)}{\epsilon}
= \lim_{\epsilon\to 0^+}\frac{\frac{\partial L}{\partial z(t+\epsilon)}-\frac{\partial L}{\partial z(t)}}{\epsilon}.
$$

Using the relation
$$
\frac{\partial L}{\partial z(t)}
= \frac{\partial L}{\partial z(t+\epsilon)}\cdot\frac{\partial z(t+\epsilon)}{\partial z(t)},
$$
we rewrite the numerator:
$$
\frac{\partial L}{\partial z(t+\epsilon)}-\frac{\partial L}{\partial z(t)}
= \frac{\partial L}{\partial z(t+\epsilon)}\!\left(I-\frac{\partial z(t+\epsilon)}{\partial z(t)}\right).
$$

By Taylor expansion of the flow,
$$
z(t+\epsilon)=z(t)+\epsilon\,f(t,z(t))+O(\epsilon^2),
$$
so
$$
\frac{\partial z(t+\epsilon)}{\partial z(t)}
= I+\epsilon\,\frac{\partial f(t,z(t))}{\partial z(t)}+O(\epsilon^2).
$$

Therefore,
$$
I-\frac{\partial z(t+\epsilon)}{\partial z(t)}
= -\,\epsilon\,\frac{\partial f(t,z(t))}{\partial z(t)}+O(\epsilon^2),
$$

and

$$
\frac{a(t+\epsilon)-a(t)}{\epsilon}
= -\,\frac{\partial L}{\partial z(t+\epsilon)}\,
   \frac{\partial f(t,z(t))}{\partial z(t)}
   + O(\epsilon).
$$

Taking the limit $$\epsilon\to 0^+$$ yields the continuous-time backprop ODE:
$$
\frac{d}{dt}a(t)
= -\,\frac{\partial L}{\partial z(t)}\,
   \frac{\partial f(t,z(t))}{\partial z(t)}.
$$

Hence, since both the forward dynamics and this gradient ODE can be handled by an ODE solver, *density evaluation* and *sampling* can be implemented symmetrically and efficiently in continuous-time flows.


[Download full Normalizing Flow notes (PDF)](/files/posts/NormalizingFlowNotes.pdf)


## References

1. Tian Qi Chen *et al.* “Neural Ordinary Differential Equations.”  
   *CoRR* abs/1806.07366 (2018).  
   arXiv: [1806.07366](http://arxiv.org/abs/1806.07366).

2. Christina Gao, Joshua Isaacson, and Claudius Krause.  
   “i-Flow: High-Dimensional Integration and Sampling with Normalizing Flows.”  
   *Machine Learning: Science and Technology* 1.4 (Nov. 2020), p. 045023.  
   DOI: [10.1088/2632-2153/abab62](http://dx.doi.org/10.1088/2632-2153/abab62).

3. Will Grathwohl *et al.*  
   *FFJORD: Free-Form Continuous Dynamics for Scalable Reversible Generative Models.*  
   2018. arXiv: [1810.01367 [cs.LG]](https://arxiv.org/abs/1810.01367).

4. Jonathan Ho *et al.*  
   *Flow++: Improving Flow-Based Generative Models with Variational Dequantization and Architecture Design.*  
   2019. arXiv: [1902.00275 [cs.LG]](https://arxiv.org/abs/1902.00275).

5. Ivan Kobyzev, Simon Prince, and Marcus Brubaker.  
   “Normalizing Flows: An Introduction and Review of Current Methods.”  
   *IEEE Transactions on Pattern Analysis and Machine Intelligence* (2020), pp. 1–1.  
   DOI: [10.1109/TPAMI.2020.2992934](https://doi.org/10.1109/TPAMI.2020.2992934).

6. Jakob Kruse *et al.*  
   *HINT: Hierarchical Invertible Neural Transport for Density Estimation and Bayesian Inference.*  
   2021. arXiv: [1905.10687 [stat.ML]](https://arxiv.org/abs/1905.10687).

7. George Papamakarios *et al.*  
   *Normalizing Flows for Probabilistic Modeling and Inference.*  
   2021. arXiv: [1912.02762 [stat.ML]](https://arxiv.org/abs/1912.02762).

8. Danilo Jimenez Rezende and Shakir Mohamed.  
   *Variational Inference with Normalizing Flows.*  
   2016. arXiv: [1505.05770 [stat.ML]](https://arxiv.org/abs/1505.05770).
