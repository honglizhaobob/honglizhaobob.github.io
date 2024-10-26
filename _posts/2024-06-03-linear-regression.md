---
layout: post
title: Trivia on Linear Regression
date: 2024-06-03 00:00:00
description: This is a comprehensive bank of questions on linear regression that one can ever imagine, from deriving theoretical results to how to compute things numerically. 
categories:
giscus_comments: false
related_posts: false
---

Over the years I have collected different problems regarding linear regression, to the extent that it deserves a separate post to document their solutions. I promise you will have a good time here if you enjoy deriving math by hand. As  we tended to (I certainly did) overlook these aspects of something as simple as linear regression as undergraduate students juggling many technical classes at the same time.


### Linear Model
---

Simple linear regression describes a hypothesized linear relationship between observed signals / dependent variable $$y$$ and predictor / independent variable $$x$$. "Simple" means univariate, or the input is 1-dimensional.

$$
    \mathbf{y} = \beta_0 + \beta_1\mathbf{x} + \boldsymbol{\epsilon}
$$ 

Here $$\mathbf{x}, \mathbf{y}\in \mathbb{R}^{n}$$, where $$n$$ is sample size. $$\boldsymbol{\epsilon}$$ is the vector of errors. And $$\boldsymbol{\epsilon} \sim \mathcal{N}(0, \sigma^2I)$$. 

The goal of regression in general is to find a mapping $$f$$ such that $$y = f(x) + \epsilon$$. In **simple linear regression**, we are saying $$f(x) = \beta_0 + \beta_1x$$. We call $$f$$ here our hypothesis; we are hypothesizing the relationship between your input and output is linear, up to some random error. 

If you believe that the signal $$y$$ is influenced jointly by a few other variables $$x_1, x_2, \ldots, x_p$$, we have multiple linear regression:

$$
    y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \cdots + \beta_px_p + \epsilon
$$

or in matrix form:

$$
    y = X\beta + \epsilon, \quad \epsilon\sim \mathcal{N}(0,\sigma^2I)
$$

where $$X$$ has size $$n\times (p+1)$$, and $$\beta$$ is a vector of length $$(p+1)$$. The $$+1$$ is due to the intercept term $$\beta_0$$, where you consider $$X$$ having a column vector of 1's. It is not difficult to see that simple linear regression is a special case of multiple linear regresson, where $$X = \begin{bmatrix}1 & x\end{bmatrix}$$.

### Assumptions of Linear Regression
---

Any hypothesis comes with assumptions in order to proceed with computations. The assumptions of linear regression can generally be summarized in 6 points. While different people have different interpretations of linear regression, the most important point is to stay consistent regardless of the specific assumptions. 

1. **The relationship is linear**: we believe that $$y = X\beta$$; it's the errors $$\epsilon$$ that's causing them to be not exactly equal.

2. **The errors are Gaussian with mean 0**.

3. **The errors have no autocorrelation among them**: This + Gaussian implies they are independent. 

4. **The errors have the same marginal variance**: Also called *homoscedasticity*. 

5. **$$X$$ has full rank**: also called no perfect *multicolinearity*. If the columns of $$X$$ are multicolinear, it means there is a column that can be expressed as a linear combination of the other columns.

6. **The errors are independent from $$X$$**: this means in analysis we can treat $$X$$ as fixed values instead of random variables. The randomness comes from $$\epsilon$$ only. This is also called *no endogeneity*.

The above assumptions are technically conditioning on $$X$$, since $$X$$ may itself be random. With these assumptions, we proceed to discuss solutions.

### Ordinary Least Sqaures (OLS)
---

In order to find the coefficients $$\beta$$, we need some criteria and solve an associated optimization problem. The most commonly applied approach is OLS, where one finds $$\beta$$ that minimizes the residual sum of squares:

$$
    \text{RSS} := \sum_{i=1}^n(y_i - \hat{y_i})^2
$$

where $$\hat{y} = X\hat{\beta}$$, for estimated coefficients $$\hat{\beta}$$. 

#### Why use sum of squares?
---

Under the assumptions that we have posed earlier. Minimizing sum of squares yields a BLUE (best linear unbiased estimator). Under Gaussian noise assumption, it will also maximize likelihood of the predicted signals given data $$X$$. In particular:

$$
    y\sim \mathcal{N}(X\beta, \sigma^2I) 
$$

Then, we can evaluate the likelihood of data as:

$$
    \mathcal{L}(\beta|X,y) := \frac{1}{(2\pi n\sigma^2)^{n/2}}\exp\bigg( -\frac{1}{2\sigma^2}\|y - X\beta\|_2^2 \bigg) \Rightarrow \log\mathcal{L}(y|X,\beta) \propto \|y - X\beta\|_2^2
$$

Maximizing $$\mathcal{L}$$ is equivalent to minimizing the RSS.

#### Solution of OLS
---

We first describe the multiple linear regression solution. We solve:

$$
    \min_{\beta}\sum_{i=1}^n(y_i - x_i^T\beta)^2 = \|y - X\beta\|_2^2
$$

To solve, we first see that if $$X$$ is full rank, then $$X^TX$$ will be positive definite, and is the Hessian of the RSS with respect to $$\beta$$. Then, we can solve the problem by taking the partial derivative and setting it to 0:

$$
    \nabla_{\beta}\text{RSS}(\beta) = 2(X\beta - y)^TX = 0 \Rightarrow X^TX\beta = X^Ty
$$

then $$\hat{\beta} = (X^TX)^{-1}X^Ty$$. 

#### Solution of simple linear regression
---

Since simple linear regression is a special case, we can apply the above solution.

Let $$X = \begin{bmatrix} \mathbf{1} & \mathbf{x} \end{bmatrix}$$. Then:

$$
    X^TX = 
    \begin{bmatrix}
        n & n\bar{x} \\
        n\bar{x} & \sum_{i}x_i^2
    \end{bmatrix} \Rightarrow (X^TX)^{-1} = \frac{1}{n\sum_{i}x_i^2 - n^2(\bar{x})^2}
    \begin{bmatrix}
        \sum_{i}x_i^2 & -n\bar{x} \\
        -n\bar{x} & n
    \end{bmatrix}
$$

where we define $$\bar{x} = \frac{1}{n}\sum_{i=1}^nx_i$$, or sample average.

Furthermore:

$$
    X^Ty = 
    \begin{bmatrix}
        \sum_{i}y_i \\
        \sum_{i}x_iy_i
    \end{bmatrix}
$$

Therefore by some rearranging, 

$$
    \hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}
$$

$$
    \hat{\beta}_1 = \frac{n\sum_i x_iy_i - \big(\sum_i x_i\big)\big(\sum_i y_i\big)}{n\sum_i x_i^2 - \big(\sum_i x_i\big)^2} = \frac{s_{xy}}{s_x^2}
$$

where $$s_{xy}, s_x^2$$ are sample covariance, sample variance.

#### OLS is BLUE
---

Going back to our original argument, we would like to understand properties of $$\hat{\beta} = (X^TX)^{-1}X^Ty$$.

* Unbiased:

$$
    \mathbb{E}[\hat{\beta}] = \mathbb{E}[(X^TX)^{-1}X^T(X\beta + \epsilon)] = (X^TX)^{-1}X^TX\beta + (X^TX)^{-1}X^T\mathbb{E}[\epsilon] = \beta
$$

* Linear: 

$$
    \hat{\beta} = (X^TX)^{-1}X^Ty
$$

which is a linear function of the signals.

* Variance of estimator:

$$
    \begin{align}
        \text{Var}[\hat{\beta}] = \text{Var}[(X^TX)^{-1}X^T\epsilon] &= \sigma^2(X^TX)^{-1}X^TX(X^TX)^{-1} \\
        &= \sigma^2(X^TX)^{-1}
    \end{align}
$$

* Minimal variance:

Let:

$$
    \hat{\beta}' = Cy
$$

be another unbiased estimator. In particular, $$CX = I$$ must be satisfied in order for it to be unbiased.

Then the covariance matrix of such an estimator will be $$\sigma^2CC^T$$. Denote $$A = (X^TX)^{-1}X^T$$. And $$E = C-A$$ Then:

$$
    \text{Var}[\hat{\beta}'] = \sigma^2CC^T = \sigma^2(E+A)(E+A)^T = \sigma^2(EE^T + EA^T + AE^T + AA^T)
$$

Notice that $$EA^T = AE^T = 0$$ because $$EA^T = (C - A)A^T = CA^T - AA^T = (X^TX)^{-1} - (X^TX)^{-1}$$. We are left with:

$$
    \text{Var}[\hat{\beta}'] = \sigma^2EE^T + \sigma^2(X^TX)^{-1} \succeq \sigma^2(X^TX)^{-1}
$$

because $$EE^T$$ is always positive semidefinite.

#### Variance of $$\beta$$ for Simple Linear Regression
---

The variance of $$\beta_0, \beta_1$$ are more concrete for the simple linear regression case. We have:

$$
    \sigma^2(X^TX)^{-1} = \frac{\sigma^2}{n\sum_{i}x_i^2 - n^2(\bar{x})^2}
    \begin{bmatrix}
        \sum_{i}x_i^2 & -n\bar{x} \\
        -n\bar{x} & n
    \end{bmatrix} = 
    \frac{\sigma^2}{(n-1)s_x^2}
    \begin{bmatrix}
        x^Tx & -\bar{x} \\
        -\bar{x} & 1
    \end{bmatrix}
$$

The above expression $$\hat{\beta} = \beta + (X^TX)^{-1}X^T\epsilon$$ also implies that the coefficients are normally distributed with mean $$\beta$$ and covariance matrix $$\sigma^2(X^TX)^{-1}$$. 

#### Mean-centering on Simple Linear Regression
---

Before linear regression, one may apply a feature transformation by subtracting the mean from each observation (i.e. effectively set $$\bar{x} = 0$$ and $$\bar{y} = 0$$). Based on what we derived for simple linear regression. We see that:

* $$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x} \Rightarrow 0$$ (no incercept)

* $$\hat{\beta}_1 = \frac{s_{xy}}{s_x^2}$$ (no change)

* $$\text{Cov}(\hat{\beta}_0, \hat{\beta}_1) = -\frac{\bar{x}\sigma^2}{(n-1)s_x^2} \Rightarrow 0$$ (coefficient estimates become uncorrelated)


#### Infinite Data Case: Linear Minimal Mean Squared Error (MMSE) Estimator 
---

$$
    \min_{a, b}\mathbb{E}[(Y - (aX + b))^2]
$$

Taking partial derivatives and setting them to 0, we obtain:

$$
    a = \mathbb{E}[Y] - b\mathbb{E}[X]
$$

$$
    b = \frac{\text{Cov}(X, Y)}{\text{Var}(X)}
$$


#### Geometric Interpretation
---

- $$H := X(X^TX)^{-1}X^T$$ is a projection matrix onto the column space of $$X$$, namely $$HX = X$$ and $$H^2 = H$$.

- $$\hat{y}$$ is uncorrelated with $$e = y - \hat{y}$$

    * *Proof*: $$\text{Cov}(\hat{y}, y-\hat{y}) = \mathbb{E}[\hat{y}(y - \hat{y})^T] - 0$$ since $$\mathbb{E}[y-\hat{y}] = 0$$. Furthermore:

$$
    \mathbb{E}[\hat{y}y^T] = H\mathbb{E}[yy^T] - \mathbb{E}[\hat{y}\hat{y}^T] = H\mathbb{E}[yy^T](I-H) = 0
$$
where one can either use a projection argument ($$I-H$$ is orthogonal to columns of $$X$$), or directly write $$y = X\beta + \epsilon$$ and see that both terms become $$\sigma^2H$$.

- $$e$$ is uncorrelated with features $$X$$. 

    * *Proof:* Assume $$X$$ is centered (if not centered, the other term still vanishes due to $$\mathbb{E}[e] = 0$$). Then from normal equation we have $$X^T(y - X\beta) = 0$$. 

- By 2., we have also verified that $$\text{Cov}(\hat{y},y) = \sigma^2H$$ along the way.



### Other Fitting Methods

We have discussed various properties of the OLS estimator, the natural question would be whether this is the only way to fit a linear model to data. And why or why not might we prefer one over another.

#### Ridge Regression