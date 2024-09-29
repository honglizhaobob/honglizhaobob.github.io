---
layout: post
title: Portfolio Optimization
date: 2024-06-01 00:00:00
description: A real world application of optimization.
categories:
giscus_comments: false
related_posts: false
---

When we have a finite amount of resources, we want to choose decisions wisely. Investing is an area where one hopes to grow capital in an environment where some uncertainty is involved. In the case of investing, we generally care about two things:

1. Being profitable: achieve positive returns
2. Being consistent: reduce risks

### Portfolio of Assets
---
Assume there are $$N$$ assets available to invest in, with return profiles $$\mathbf{r} := (r_1, r_2,\ldots, r_N)^T$$, represented as random variables taking values in $$[0,1]$$. A portfolio is a linear combination of the assets with weights summing to 1. The return of the portfolio can be written:

$$
    r_p = \sum_{i=1}^Nw_ir_i = \mathbf{w}^T\mathbf{r}
$$

and we let $$\mathbf{w} = (w_1,\ldots, w_N)^T$$.

It may be worth mentioning that typically the returns have a time scale baked-in. If we say $$\mathbf{r}$$ represent *daily returns*, we are assuming that the frequency at which we evaluate our investment decisions is by days. When we *annualize*, we are assuming that over a year, the distribution of daily returns does not vary over time, and the returns are additive (log returns). Typically:

$$
    \mathbb{E}[r_{\text{year}}] = \sum_{i=1}^{252}\mathbb{E}[r_i] = 252\cdot \mathbb{E}[r_{\text{day}}], \text{Var}[r_{\text{year}}] = 252\cdot \text{Var}[r_{\text{day}}]
$$


### Average Return and Risk of a Portfolio
---

With the simplification of unchanging (over time) return probability distributions, it implies that we can understand average return as the expectation of the random variables:

$$
    \mathbb{E}[r_p] = \mathbf{w}^T\mathbf{E}[\mathbf{r}] = \mathbf{w}^T\boldsymbol{\mu}
$$ 

and we define the volatility as $$\sigma_p$$ where:

$$
    \sigma_p^2 = \text{Var}[r_p] = \mathbf{w}^T\Sigma\mathbf{w}
$$ 

where $$\Sigma$$ is the covariance matrix of the individual asset returns.

### Balancing Returns and Risks
---

With returns and risks defined, our general objective is to maximize return while minimizing risk. To understand what that might look like, let's pick three assets and imagine investing some portfolios with random weights. 

<figure>
  <img src="/assets/img/posts/portfolio-optimization/random_portfolios.png" alt="" style="width:40%;">
  <img src="/assets/img/posts/portfolio-optimization/random_portfolios_more_assets.png" alt="" style="width:40%;">
  <figcaption><strong>Figure 1:</strong> Example portfolio returns plotted against risks for 10000 randomly generated weights. Using stock data of NVDA, MSFT, BABA and AAPL from January 2020 to December 2024. The returns are annualized. </figcaption>
</figure>

The more to the top we move, the larger the expected return; and the more left we move, the smaller the risk. Furthermore, there is some discernible pattern to the return-risk profiles, which we will refer to [modern portfolio theory](https://en.wikipedia.org/wiki/Modern_portfolio_theory) for a detailed discussion. The hyperbola is referred to as the *efficient frontier*, which represents the highest expected return achievable at a fixed level of risk. There is also a reason why adding more assets will change the ``distribution'' of return-risk combinations in some predictable way, but we will not discuss it now.

### Some Intuitions
---
With a precise definition of portfolio returns, let us consider some preliminary results. Firstly, it is not possible to achieve a better return than the best performer:

$$
    \sum_{i=1}^Nw_i\mu_i \le \sum_{i=1}^Nw_i\max_{1\le i\le N}\mu_i  = \max_{1\le i\le N}\mu_i
$$

This should be natural, by allocating our investments strategically, we are somewhat hurting our return, compared to simply putting all eggs in the same, best basket. However, what we are gaining from not putting all eggs in one basket is that we can reduce risk (under specific configurations; not always). Suppose for simplicity that all assets have the same risk $$\sigma$$, and the same correlation $$\rho$$ ($$\text{Cov}(r_i,r_j) = \rho\sigma^2, i\neq j$$ as a result). Let's further imagine a basket with equal weights. Then:

$$
    \text{Var}[r_p] = \mathbf{w}^T\Sigma \mathbf{w} = 
    \begin{pmatrix}
        1/N & \cdots & 1/N
    \end{pmatrix}
    \begin{pmatrix}
        \sigma^2 & \rho\sigma^2 & \cdots & \rho\sigma^2 \\
        \rho\sigma^2 & \sigma^2 & \cdots & \rho\sigma^2 \\
        \vdots & \ddots & \ddots & \vdots \\
        \rho\sigma^2 & \cdots & \rho\sigma^2 & \sigma^2
    \end{pmatrix}
    \begin{pmatrix}
        1/N \\ \vdots \\ 1/N
    \end{pmatrix} = \frac{1}{N}\sigma^2 + \frac{N-1}{N}\rho\sigma^2
$$ 

We notice that as long as $$\rho<1$$, the above expression is less than $$\sigma^2$$, which is the risk we get by putting all eggs in one basket. Another observation is that as $$N\rightarrow\infty$$, the variance of this portfolio will tend to $$\rho\sigma^2$$. 

### Minimal Variance Portfolio
---

We have discussed the behavior of return and risks when we allocate weights. The question that arises naturally would be whether or not we can choose weights to satisfy some specific requirements. This is where (constrained) optimization comes in. Let's first consider forming a portfolio with minimal risk. This is a quadratic problem with linear constraints:

$$
    \begin{aligned}
        \min_{\mathbf{w}} \mathbf{w}^T\Sigma\mathbf{w} \\
        \text{subject to} \quad &\mathbf{w}^T\mathbf{1} = 1
    \end{aligned}
$$

where $$\mathbf{1}$$ is a vector of all 1's.

This can be solved by Lagrange multipliers. Here we need to assume that $$\Sigma$$ is positive definite; otherwise, the solution will be non-unique. Intuitively, if $$\Sigma$$ is not positive definite, it means there are some assets that do not increase the risk of our portfolio; then, whether or not to invest in such assets may depend on other preferences, but minimizing variance is not one of them.

We have the Lagrangian:

$$
    L(\mathbf{w}, \lambda) = \mathbf{w}^T\Sigma\mathbf{w} + \lambda (\mathbf{w}^T\mathbf{1} - 1)
$$

Then we do the usual routine of taking partial derivatives in $$\mathbf{w}, \lambda$$ and setting them to 0. We get the following equations:

$$
    \begin{cases}
        \mathbf{w}^T\mathbf{1} = 1 \\
        2\Sigma \mathbf{w} + \lambda\mathbf{1} = 0
    \end{cases}
$$

The second equation gives $$w = -\frac12\lambda\Sigma^{-1}\mathbf{1}$$. To solve for $$\lambda$$, we use the constraint and left multiply by $$\mathbf{1}^T$$, and get:

$$
    1 = \mathbf{1}^T\mathbf{w} = -\frac12\lambda\mathbf{1}^T\Sigma^{-1}\mathbf{1}
$$ 

or $$\lambda = -\frac{2}{\mathbf{1}^T\Sigma^{-1}\mathbf{1}}$$. Plugging this back to the equation gives us the optimal weights:

$$
    \mathbf{w}_* = \frac{\Sigma^{-1}\mathbf{1}}{\mathbf{1}^T\Sigma^{-1}\mathbf{1}}
$$

In the special case where $$\Sigma$$ is diagonal with entries $$\sigma_1^2,\ldots, \sigma_N^2$$, we have that the weights are $$\propto 1/\sigma^{i}$$, which matches our intuition that we would want to put fewer eggs in risky baskets.

#### What is the minimal variance achievable?

Using the above result, we can calculate:

$$
    \sigma_*^2 = \mathbf{w}_*^T\Sigma\mathbf{w}_* = \frac{1}{\mathbf{1}\Sigma^{-1}\mathbf{1}}
$$

and the return is:

$$
    \mathbb{E}[r_*] = \frac{\mathbf{1}^T\Sigma^{-1}\boldsymbol{\mu}}{\mathbf{1}^T\Sigma^{-1}\mathbf{1}}
$$

<figure>
  <img src="/assets/img/posts/portfolio-optimization/minimal_variance.png" alt="" style="width:40%;">
  <figcaption><strong>Figure 2:</strong> Example portfolio profile formed by minimal variance optimization (with AAPL, BABA, NVDA), allowing for shorting. </figcaption>
</figure>

Note that we did not constrain that the weights are positive. Negative weights would mean holding the ``opposite asset'', or *shorting* it.

### Maximal Sharpe Portfolio
---

With the results above, we notice that we can analytically find the solution that gives a globally minimal variance for our portfolio. However, it is not necessarily one that would give a great average return. Intuitively, the curve is a parabola, so it seems like we can achieve much better return if we are willing to sacrifice a little bit more risk.

Suppose now we want to embed the return into our optimization, while minimizing risk, we consider maximizing the Sharpe ratio, or *risk adjusted return*:

$$
    \begin{aligned}
        \max_{\mathbf{w}} \frac{\mathbb{E}[r_p]}{\sigma_p} &= 
        \frac{\mathbf{w}^T\boldsymbol{\mu}}{\sqrt{\mathbf{w}^T\Sigma\mathbf{w}}}
        \\
        \text{subject to} \quad &\mathbf{w}^T\mathbf{1} &= 1
    \end{aligned}
$$

Define the Lagrangian:

$$
    L(\mathbf{w}, \lambda) = \frac{\mathbf{w}^T\boldsymbol{\mu}}{(\mathbf{w}^T\Sigma\mathbf{w})^{1/2}} + \lambda(\mathbf{w}^T\mathbf{1} - 1)
$$

Then:

$$
    \nabla_{\mathbf{w}}L(\mathbf{w},\lambda) = \frac{\boldsymbol{\mu}}{(\mathbf{w}^T\Sigma\mathbf{w})^{1/2}} - \frac{(\mathbf{w}^T\boldsymbol{\mu})\Sigma\mathbf{w}}{(\mathbf{w}^T\Sigma\mathbf{w})^{3/2}} + \lambda\mathbf{1}
$$

Amusingly, the solution of the above requires some level of staring. We first left multiply by $$\mathbf{w}^T$$ in order to use the constraint. After simplifying, we arrive at the relation:

$$
    (\mathbf{w}^T\boldsymbol{\mu})\mathbf{w} = (\mathbf{w}^T\Sigma\mathbf{w})\Sigma^{-1}\boldsymbol{\mu}
$$

Since both sides involve the form $$\mathbf{w}^T(\star)\Sigma^{-1}(\star)$$, we guess the ansatz $$\mathbf{w} = \alpha\Sigma^{-1}\boldsymbol{\mu}$$ and find that it works. However, $$\alpha$$ needs to be constrained, since we need the sum to one condition. This means $$\alpha = \frac{1}{\boldsymbol{\mu}^T\Sigma^{-1}\mathbf{1}}$$. The final solution is:

$$
    \mathbf{w}_* = \frac{\Sigma^{-1}\boldsymbol{\mu}}{\mathbf{1}^T\Sigma^{-1}\boldsymbol{\mu}}
$$

In this case, the profile achieved for the data (AAPL, BABA, NVDA) is the following:


<table>
  <tr>
    <th>Annualized Return</th>
    <th>Variance</th>
    <th>Sharpe Ratio</th>
    <th>Weights</th>
  </tr>
  <tr>
    <td rowspan="3">1.823</td>
    <td rowspan="3">0.113</td>
    <td rowspan="3">5.433</td>
    <td>AAPL: 0.859</td>
  </tr>
  <tr>
    <td>BABA: -1.954</td>
  </tr>
  <tr>
    <td>NVDA: 2.094</td>
  </tr>
</table>






### Appendix: Code for Visualization
---

Use the following code to load data from Yahoo Finance and simulate random weights.

```python
import numpy as np
import matplotlib.pyplot as plt
import yfinance as yf

names = ["AAPL", "MSFT", "NVDA", "BABA"]
data = yf.download(names, start = "2020-01-01", end = "2023-12-31")["Adj Close"]
data.head()

# compute log return 
log_return = np.log(data / data.shift(1)).dropna()
log_return.head()

np.random.seed(10);

r1 = log_return["AAPL"]
r2 = log_return["BABA"]
r3 = log_return["NVDA"]
mu1 = r1.mean()
mu2 = r2.mean()
mu3 = r3.mean()
mu = np.array([mu1, mu2, mu3])
Sigma = np.cov([r1, r2, r3])

# construct many portfolios randomly
nmc = 10000
w = np.random.rand(nmc, 3)
w = w / np.sum(w, axis=1).reshape(-1, 1)

# compute mean and variances of portfoilo returns (annualized)
E_rp = (w @ mu) * 252
Var_rp = np.diag((w @ Sigma) @ w.T) * np.sqrt(252)
plt.figure(1, figsize=(5, 4));

r1 = log_return["AAPL"]
r2 = log_return["BABA"]
r3 = log_return["NVDA"]
r4 = log_return["AAPL"]
mu1 = r1.mean()
mu2 = r2.mean()
mu3 = r3.mean()
mu4 = r4.mean()

mu = np.array([mu1, mu2, mu3, mu4])
Sigma = np.cov([r1, r2, r3, r4])

# construct many portfolios randomly
nmc = 10000
w = np.random.rand(nmc, 4)
w = w / np.sum(w, axis=1).reshape(-1, 1)

# compute mean and variances of portfoilo returns (annualized)
E_rp2 = (w @ mu) * 252
Var_rp2 = np.diag((w @ Sigma) @ w.T) * np.sqrt(252)
plt.scatter(Var_rp, E_rp, color="orange", s=1.0);
plt.scatter(Var_rp2, E_rp2, color="blue", s=1.0);

plt.xlabel("Portfolio Risk"); plt.ylabel("Expected Portfolio Return");

plt.legend(["3 Assets", "4 Assets"]);


plt.savefig("./random_portfolios.png", dpi=300);

```