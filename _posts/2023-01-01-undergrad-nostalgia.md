---
layout: post
title: Nostalgic Problem Solving
date: 2024-01-01 00:00:00
tags: math-notes
---

I have lying in my computer a set of interest readings and problems in math and stats from the undergrad good ol' days. This post will be a place to stash all of them.


# Probability Theory
---

## Random Variables, PDFs, and Markov Chains 
--

### Markov Chains 

This post aims to give an introduction to Markov chains. Currently under construction ...

First, we verify the following properties for irreducible chains:

* The following are equivalent

	- The chain is recurrent
	
	- For every $x, y\in A$ where $A$ is a countable set (state space), we have $\mathbb{E}^x[V_y] = \infty$, where $V_x = \sum_{n=0}^{\infty}\mathbf{1}\{X_n=x\}$.
	
	- There exists $x, y\in A$ such that $\mathbb{E}^x[V_y] = \infty$
	
	- FOr every $x,y\in A$, $\mathbb{P}^x\{V_y = \infty\} = 1$
	
	- There exists $x,y \in A$ such that $\mathbb{P}^x\{V_y = \infty\} = 1$.

Proof
---

Let a Markov chain be described as a sequence of random variables $X_0,X_1,X_2,\cdots$ taking values in an at most countable set ${A}$, that satisfies \emph{Markov property} and \emph{time-homogeneity}.

Statements colored blue are "hand-wavy".
\subsection{Exercise 1.3}
Let the Markov chain be recurrent, let $x,y\in A$ be arbitrary. Then:
$$
	\mathbb{E}^x[V_y] = \mathbb{E}^x[\sum_{i=0}^{\infty}\mathbf{1}\{X_n = y\}] = \sum_{n=0}^{\infty}p_n(x,y)
$$ since the chain is recurrent, let $\tau_y = \min\{k\ge 1: X_k=y\}$ and we have $\tau_y = C < \infty$ for some constant $C$ almost surely. This also implies $p_C(x,y) = 1, p_{2C}(x,y) = 1, \cdots, p_{kC}(x,y) = 1,\cdots$, therefore we have $\mathbb{E}^x[V_y] = \infty$ (due to time-homogeneity).

Statement 3, 5 are vacuous given statement 2, 4. 


Now we show that statement 2 implies statement 4. We have that there exists $C<\infty$ such that $1= p_C(x,y) = \cdots = p_{kC}(x,y) = \cdots $. This means $1=\mathbf{1}\{X_{C}=y\} = \cdots = \mathbf{1}\{X_{kC}=y\}$ almost surely, thus almost surely we have $V_y = \infty$, or $\mathbb{P}^x\{V_y=\infty\} = 1$. 

Finally it is enough to demonstrate statement 3 implies statement 2. Since the chain is irreducible, there exists $n_x$ such that $p_{n_x}(x,y)>0$, and there exists $n_y$ such that $p_{n_y}(y,x)>0$. We consider $p(y,x)$ (probability of starting from $y$ and reaching $x$). By total probability, we find:
$$
	p_{n_y+kC+n_x}(y,x) \ge p_{n_y}(y,x)p_{kC}(x,y)p_{n_x}(y,x)
$$ namely one way of reaching $x$ in $n_y+kC+n_x$ steps from $y$ is to go to $x$, go back to $y$, and then go to $x$. Summing over $k$ on both sides, we have:
$$
	\sum_{k=1}^{\infty}p_{n_y+kC+n_x}(y,x) \ge p_{n_y}\bigg(\sum_{k=1}^{\infty}p_{kC}(x,y)\bigg)p_{n_x}(y,x) = \infty
$$ this implies $\mathbf{1}\{n_y +kC + n_x\} = 1$ must occur infinitely often. Thus we conclude $x$ gets visited infinitely many times starting from $y$, given $y$ gets visited infinitely many times starting from $x$. With the same argument applied to any node on the path, we conclude that in an irreducible Markov chain, every node is recurrent.

* Consider the following transition probabilities:

$$
	p(x, x+1) = q, p(x, x-1) = 1-q
$$ with $q\in (0,1)$. Let $p_n = p_n(0,0) = \mathbb{P}^0\{X_n = 0\}$. We show the following properties:

	- If $n$ is odd, $p_n=0$
	
	- $p_{2n} = {2n \choose n}q^n(1-q)^n$
	
	- Assuming Stirling's formula:
	$$
		\lim_{n\rightarrow\infty}\frac{n!}{n^{n+1/2}e^{-n}} = \sqrt{2\pi}
	$$ we have if $q=1/2$, then:
	$$
		\lim_{n\rightarrow\infty}n^{1/2}p_{2n} = 1/\sqrt{\pi}
	$$
	
	- If $q=1/2$ the chain is recurrent, otherwise it is transient.
	
Proof
---

(1) Each step of transition the walker can only go up or down by 1. Starting from the origin, to get back to the origin it must go up exactly $n/2$ times and down $n/2$ times along the way. And this is not achievable by odd $n$.

(2) As in (1), in $2n$ steps, we must have $n$ steps going up, and $n$ steps going down. Each step is a Bernoulli-$q$ trial leading to $+1$ or $-1$. Thus the formula follows from binomial distribution. 


(3) $$
	p_{2n} = {2n \choose n}\frac{1}{2^{2n}} = \frac{(2n)!}{(n!)^2}\cdot\frac{1}{2^{2n}}
$$ we try to put the expression above into the form given by Stirling. 
$$
	n^{1/2}p_{2n} = \frac{(2n)!}{(n!)(n!)}\cdot \frac{n^{1/2}}{2^{2n}} = \frac{(2n)!}{(n!)(n!)}\cdot \frac{(n^{n+1/2}e^{-n})^2}{(2n)^{2n+1/2}e^{-2n}}\cdot 2^{-2n}\cdot C_n\cdot\sqrt{n}
$$ where $C_n$ is the reciprocal of the middle term. Then the middle term:
$$
	\frac{(n^{n+1/2}e^{-n})^2}{(2n)^{2n+1/2}e^{-2n}} = \frac{n^{2n+1}e^{-2n}}{(2n)^{2n+1/2}e^{-2n}} = 2^{-(2n+\frac12)}\cdot n^{2n+1-2n-\frac12} = 2^{-2n}\cdot \frac{1}{\sqrt{2}}\cdot\sqrt{n}
$$ then we find:
$$
C_n = 2^{2n}\sqrt{2}\frac{1}{\sqrt{n}}
$$ then taking limit, using product of limits, using Stirling, and multiplying by $C_n$, we find:
$$
	\lim_{n\rightarrow\infty}n^{1/2}p_{2n} = \sqrt{2\pi}\cdot\frac{1}{2\pi}\cdot\sqrt{2} = \frac{1}{\sqrt{\pi}}
$$

(4) The above result shows that for $q=1/2$, 
$$
	p_{2n}=\sum \frac{1}{\sqrt{\pi n}}
$$ for $n$ large, then we have:
$$
	\sum_{k=0}^{\infty}p_k(0,0) = \sum_{n=0}^{\infty}p_{2n}(0,0) = \frac{1}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{1}{\sqrt{n}} = \infty
$$ using 1.3's results, this implies that the chain is recurrent.

Similar to the $p=\frac12$ case, we attempt to derive a closed form formula using Stirling's approximation. We previously had:
$$	
p_{2n} = {2n\choose n}q^{n}(1-q)^{n} = \frac{(2n)!}{(n!)(n!)}[q(1-q)]^n = \frac{(2n)!}{(n!)(n!)}\cdot \frac{(n^{n+\frac12}e^{-n})^2}{(2n)^{2n+\frac12}e^{-2n}}\cdot C_n\cdot q^n(1-q)^n
$$ where 
$$
	C_n = \frac{(2n)^{2n+\frac12}\cdot e^{-2n}}{(n^{n+\frac12}e^{-n})^2} = \frac{2^{2n+\frac12}n^{2n+\frac12}e^{-2n}}{n^{2n+1}e^{-2n}} = 2^{2n+\frac12}\cdot\frac{1}{\sqrt{n}}
$$ take $n\rightarrow\infty$, we have:
$$
	\sqrt{n}p_{2n}\sim \sqrt{n}\cdot\sqrt{2\pi}\cdot\frac{1}{2\pi}\cdot 2^{2n+\frac12}\cdot \frac{1}{\sqrt{n}}q^n(1-q)^n
$$
$$
	\sim \frac{1}{\sqrt{\pi}}[4q(1-q)]^n
$$

This means as $n$ becomes large, $p_{2n}$ behaves like:
$$
	p_{2n} \sim \frac{1}{\sqrt{n}}[4q(1-q)]^n
$$ now sum over $n$:
$$
	\sum_{n=0}^{\infty}p_{2n} \sim \sum_{n=0}^{\infty}\frac{1}{\sqrt{n}}(4q(1-q))^n
$$ we notice that for $q\neq 1/2$, $q(1-q)<1/4$ since it is maximized at $(1/2, 1/4)$. This means $4q(1-q)<1$. Now we see that each term in this series decays faster than a geometric series with terms $<1$ (due to the $1/\sqrt{n}$) term. We conclude that $\sum_np_{2n}<\infty$, or the chain is transient.



### Playing with the Bernoulli random variable

The Bernoulli random variable, or indicator function on an event $E\subset\Omega$, is a random variable $\Omega\rightarrow 
\\{0,1\\}$ with the following definition:

$$
	\mathbf{1}_{E}(\omega) = 
	\begin{cases}
		1, \text{ if $\omega\in E$ }\\
		0,  \text{ else}
	\end{cases}
$$

Algebra
---
Let uppercase letters denote events.

* Multiplication:
$$
	\mathbf{1}_{E_i} \cdot \mathbf{1}_{E_j} = 
	\begin{cases}
		1, \text{ if $\omega \in E_i$ and $\omega \in E_j$}\\
		0, \text{ otherwise}
	\end{cases} = \mathbf{1}_{E_i\cap E_j}
$$

* Complement:
$$
	\mathbf{1}_{\overline{E}} = 1 - \mathbf{1}_{E}
$$

* Union: By De Morgan's law, for finite $N$, $\overline{\bigcup_{i=1}^nE_i} = \bigcap_{i=1}^N\overline{E}_i$.

$$
	\mathbf{1}_{\bigcup_i E_i} = 1 - \mathbf{1}_{\overline{\bigcup_i E_i}}
$$

$$
	= 1 - \mathbf{1}_{\bigcap_i\overline{E}_i} = 1 - \prod_{i=1}^N\mathbf{1}_{\overline{E}_i}
$$

$$
	= 1 - \prod_{i=1}^N(1-\mathbf{1}_{E_i})
$$ which relates to the principle of inclusion-exclusion.

Statistics
---
Let $A\in\Omega$ be an event, which occurs with probability $p_A$ (we assume it has nonzero probability for now). 

* Mean:

$$
	\mathbb{E}[\mathbf{1}_A] = 0\cdot (1-p_A) + 1\cdot p_A = p_A
$$

* Variance:

$$
	\text{Var}(\mathbf{1}_A) = \mathbb{E}[\mathbf{1}_A^2] - \mathbb{E}[\mathbf{1}_A]^2 = 1^2\cdot p_A + 0^2\cdot (1-p_A) - p_A^2 = p_A-p_A^2= p_A(1-p_A)
$$

Let $A,B$ be two events with nonzero probabilities $p_A,p_B$.

* Covariance:

$$
	\text{cov}[\mathbf{1}_A, \mathbf{1}_B] = \mathbb{E}[\mathbf{1}_A\mathbf{1}_B] - \mathbb{E}[\mathbf{1}_A]\cdot\mathbb{E}[\mathbf{1}_B] = \mathbb{P}(A\cap B)- p_Ap_B
$$ where $\mathbb{P}(A\cap B)$ is unknown.

* Correlation:

$$
	\rho_{A,B} = \frac{\text{cov}[\mathbf{1}_A, \mathbf{1}_B]}{\sigma_A\cdot\sigma_B}
$$ where $\sigma_{(\cdot)}$ denotes standard deviation.

* Higher-order moments

In general:

$$
	\mathbb{E}[(\mathbf{1}_A)^n] = p_A
$$

Possible range
---

We noticed that the covariance and correlation depend on the quantity $\mathbb{P}(A\cap B)$, which depending on the structure of sets $A, B$ can vary. We provide a lower and upper bound.

We have:

$$
	\underbrace{0}_{\text{disjoint events}} \le \mathbb{P}(A\cap B) \le \underbrace{ \min(p_A, p_B) }_{\text{one of is contained in the other. }}
$$

Therefore:

$$
	-p_Ap_B \le \text{cov}[\mathbf{1}_A, \mathbf{1}_B] \le \min(p_A, p_B) - p_Ap_B = \min(p_A, p_B)(1- \max(p_A, p_B))
$$

And:

$$
	-\sqrt{\frac{p_A}{1-p_A}}\cdot\sqrt{\frac{p_B}{1-p_B}} \le \rho_{A,B} \le \frac{\min(p_A, p_B)(1- \max(p_A, p_B))}{\sqrt{p_A(1-p_A)}\cdot\sqrt{p_B(1-p_B)}}
$$


Measure Zero Event
---

Let $E$ be an event with probability measure 0, $p_E = 0$. Let $X$ be any random variable with well-defined expected value. Then:

$$
	\mathbb{E}[X\mathbf{1}_E] = \int_{\Omega}X(\omega)\mathbf{1}_E(\omega)d\mathbb{P}(\omega) = \int_E(\cdot) + \int_{\overline{E}}(\cdot) = 0
$$ the first integral is over a null set, which yields 0, and in the second integral, the indicator always evaluates to 0, therefore it also becomes 0, hence the final equality.

"Truncating'' a random variable
---

The following property concerns taking expected value of a random variable only when it exceeds some threshold value. Let $X$ be a random variable that is almost surely positive, and $c$ be a constant. Then define the event $C = \\{X\ge c\\}$:

$$
	\mathbb{E}[X] = \mathbb{E}[X(\mathbf{1}_{C} + \mathbf{1}_{\overline{C}}] \ge \mathbb{E}[X\mathbf{1}_{C}]
$$

Further readings
---

* We know the sum of i.i.d. Bernoulli random variables is binomial. But [what if they have different mean and variance](https://en.wikipedia.org/wiki/Poisson_binomial_distribution)?

## Order Statistics
---

### Distribution and Statistics of Max and Min

Let $X_1,\ldots, X_n$ be i.i.d. random variables with density $f_X(x)$ and cumulative density function (CDF) $F_X(x)$. We define two random variables:

$L_n = \min\\{X_1,\ldots, X_n\\}$, $U_n = \max\\{X_1,\ldots, X_n\\}$. The natural curiosity is to compute some statistics with them. Before that, we need to characterize their densities, which is not difficult due to the following set equivalences:

* If the minimum is larger than some value $x$, it means each of $X_1,\ldots, X_n$ is larger than that value.

$$
	\{L_n \ge x\} = \{X_1 \ge x\}\cap \cdots\cap \{X_n \ge x\}
$$

* If the maximum is smaller than some value $x$, it means each of $X_1,\ldots, X_n$ is smaller than that value.

$$
	\{U_n \le x\} = \{X_1 \le x\}\cap \cdots\cap \{X_n \le x\}
$$

PDF of $L_n$
---
$$
	\mathbb{P}(L_n \ge x) = 1 - F_{L_n}(x)
$$ therefore it is enough to derive $\mathbb{P}(L_n \ge x)$, which gives the following expression due to i.i.d.:

$$
	\mathbb{P}(L_n \ge x) = \bigg[
		1 - F_{X}(x)
	\bigg]^n
$$ rearranging:

$$
	F_{L_n}(x) = 1 - (1 - F_{X}(x))^n
$$ taking derivative on both sides to get the PDF:

$$
	f_{L_n}(x)=\frac{dF_{L_n}}{dx} = n(1-F_X(x))^{n-1}\cdot\frac{dF_X}{dx} = n(1-F_X(x))^{n-1}f_X(x)
$$

PDF of $U_n$
---
By similar argument as for $L_n$ using i.i.d., we have:

$$
	f_{U_n}(x) = nf_X(x)[F_X(x)]^{n-1}	
$$

We now consider some concrete examples.

Statistics of Uniform Order Statistics
---

Let $X_1,\ldots, X_n$ be i.i.d. uniform $[0,1]$ random variables. 

PDF and CDF of $U_n$
---

The PDF and CDF of uniform random variable are:

$$
	f_X(x) = 1, F_X(x) = x, x\in [0,1]
$$

Then using the formula for $U_n$:

$$
	f_{U_n}(x) = nx^{n-1}, F_{U_n}(x) = x^n
$$

Mean of $U_n$
---

$$
	\mathbb{E}[U_n] = \int_0^1x\cdot nx^{n-1}dx = \frac{n}{n+1}
$$

Variance of $U_n$
---

* Second moment:
$$
	\mathbb{E}[U_n^2] = \int_0^1x^2\cdot nx^{n-1}dx = \frac{n}{n+2}
$$

Therefore:

$$
	\text{Var}[U_n] = \mathbb{E}[U_n^2] - \mathbb{E}[U_n]^2 = \frac{n}{n+2} - \frac{n^2}{(n+1)^2} = \frac{2n^3+4n^2+n}{n^3+4n^2+5n+2}
$$

PDF and CDF of $L_n$
---

Plugging in the formula:

$$
	f_{L_n}(x) = n(1-F_X(x))^{n-1}f_X(x) = n(1-x)^{n-1}
$$

$$
	F_{L_n}(x) = \bigg[
		1 - F_{X}(x)
	\bigg]^n = (1-x)^n
$$

Mean and Variance of $L_n$
---

* Mean (substitute change of variables $u = 1-x$):

$$
	\mathbb{E}[L_n] = \int_0^1xn(1-x)^{n-1}dx = \frac{1}{n+1}
$$

* Second moment:

$$
	\mathbb{E}[L_n^2] = \int_0^1x^2n(1-x)^{n-1}dx = n\int_0^1[u^{n+1}-2u^n+u^{n-1}]du
$$

$$
	= \frac{n}{n+2}-\frac{2n}{n+1}+1
$$

* Variance:

$$
	\text{Var}(L_n) = \mathbb{E}[L_n^2] - \mathbb{E}[L_n]^2
$$

$$
	= \frac{n}{n+2}-\frac{2n}{n+1}+1 - \frac{1}{(n+1)^2}
$$

$$
	= \frac{n}{n^3+4n^2+5n+2}
$$

### Correlation of Max and Min

See the previous section for a background. In this post, we consider a simpler case (generalization is to be discussed later).

Let $X_1,X_2$ be independent uniform $[0,1]$ random variables. Define $L = \min\\{X_1,X_2\\}$, $U = \max\\{X_1,X_2\\}$. We explore the covariance of $L, U$.

Recalling PDF and CDF
---

From before, we have:

$$
	f_L(x) = -2x+2, F_L(x) = -x^2+2x, f_U(x) = 2x, F_U(x) = x^2
$$

Warm-up probabilities
---

Let's compute:

$$
	\mathbb{P}(L\ge y|U\le z) = \frac{\mathbb{P}(L\ge y, U\le z)}{\mathbb{P}(U\le z)}
$$

The denominator is straightforward since we know the CDF of $U$:

$$
	\mathbb{P}(U\le z) = F_U(z) = z^2
$$

The numerator is equivalent to $\mathbb{P}(y\le X_1\le z, y\le X_2\le z)$ (see the set equivalence of max and min in the [previous post](https://honglizhaobob.github.io/posts/2023/01/blog-post-2/)). Then we have:

$$
	\mathbb{P}(L\ge y|U\le z) = \frac{\mathbb{P}(L\ge y, U\le z)}{\mathbb{P}(U\le z)} = \frac{(z-y)^2}{z^2}
$$

Covariance of $L$ and $U$
---

We have:

$$
	\text{cov}(L, U) = \mathbb{E}[LU] - \mathbb{E}[L]\cdot\mathbb{E}[U]
$$ in the previous post, we computed the means: $\mathbb{E}[L] = \frac{1}{3}, \mathbb{E}[U] = \frac{2}{3}$. We need to consider:
$$
	\mathbb{E}[LU] = \int_0^1\int_0^1xyf_{L,U}(x,y)dxdy
$$ where $f_{L,U}$ is the joint density. We need to derive this from the following probability:

$$
	\mathbb{P}(L\le y, U\le z)
$$ by the set equivalence, $\\{U\le z\\}$ is equivalent to $\\{X_1\le z\cap X_2\le z\\}$. The minimum $\\{L\le z\\}$ means either $X_1\le z$ or $X_2\le z$, but leaving the other one inconclusive. This suggests conditioning. By some simple mental argument, we realize that $\\{L\le y, U\le z\\}$ is equivalent to the set:

$$
	E_{y,z} = \{X_1\le z, X_2\le z\} \setminus (\{X_1\ge y, X_2\ge y\}\cap\{X_1\le z, X_2\le z\})
$$ 

This set $E_{y,z}$ has probability:

$$
	\mathbb{P}(E_{y,z}) = z^2 - (z-y)^2 =: F_{L,U}(y,z)
$$

Given the joint CDF, the joint PDF is derived by taking partial derivatives:

$$
	f_{L,U}(y,z) = \frac{\partial^2F_{L,U}}{\partial y\partial z} = 2
$$ from which, the cross expectation term can be computed:

$$
	\mathbb{E}[LU] = 2\int_0^1\int_0^1xydxdy = \frac{1}{4}
$$

Finally, the covariance is finished:

$$
	\text{cov}(L,U) = \frac14 - \frac{2}{9} = \frac{1}{36}
$$

Correlation of $L, U$
---

The correlation is only one step away; we use the variance formula from the previous post:

$$
	\rho_{Y,Z} = \frac{\text{cov}(Y, Z)}{\sigma_Y\cdot\sigma_Z} = \sqrt{18^2}\cdot \frac{1}{36} = \frac12
$$


What's next
---

Now that we've solved a simple version (of $X_1,X_2$), it is natural to consider defining:

$$
	L_n = \min\{X_1,\ldots, X_n\}
$$

$$
	U_n = \max\{X_1,\ldots, X_n\}
$$ and see what their correlation is.

### Correlation of Max and Min ($$n$$-variable case)

This post is about finding a formula for general $n$ case, with uniform $[0,1]$ distributions. See the [previous problem here](https://honglizhaobob.github.io/posts/2023/01/blog-post-3/) ($n=2$). Let us define for i.i.d. $X_i$'s:

$$
	L_n = \min_{1\le i\le n}X_i, U_n = \max_{1\le i\le n}X_i
$$

PDF and CDF
---

Using the formulas from [Order Statistics I](https://honglizhaobob.github.io/posts/2023/01/blog-post-2/), we have:

$$
	f_{L_n}(x) = n(1-\underbrace{F_X(x)}_{=x})^{n-1}\underbrace{f_X(x)}_{=1} = n(1-x)^{n-1}
$$

$$
	F_{L_n}(x) = 1-(1-x)^n
$$

$$
	f_{U_n}(x) = nx^{n-1}, F_{U_n}(x) = x^n
$$

Covariance of $L_n$ and $U_n$
---
We need to compute the following:

$$
	\mathbb{E}[L_nU_n] = \int_0^1\int_0^1yzf_{L_n,U_n}(y,z)dydz
$$ by finding the joint density $f_{L_n,U_n}(y,z)$. We take a similar approach of starting with the joint CDF: $F_{L_n,U_n}(y,z) = \mathbb{P}(L_n\le y, U_n\le z)$. The set equivalence simply generalizes from squares to hypercubes:

$$
	E_{n;y,z} := \{L_n\le y, U_n\le z\} = \bigg[\bigcap_{i}\{X_i\le z\}\bigg]\setminus\bigg(
		\bigcap_i\{X_i\in [y, z]\}
	\bigg)
$$

The probability measure is then:

$$
	\mathbb{P}(E_{n;y,z}) = \frac{\text{Vol}(E_{n;y,z})}{\text{Vol}([0,1]^n)} = z^n - (z-y)^n =: \mathbb{P}(L_n\le y, U_n\le z)
$$

Now by taking partial derivatives we find:

$$
	f_{L_n,U_n}(y,z) = \frac{\partial^2F_{L_n,U_n}}{\partial y\partial z} = n(n-1)(z-y)^{n-2}
$$ we see if $n=2$, it indeed evaluates to $2$.

Then:

$$
	\mathbb{E}[L_nU_n] = n(n-1)\int_0^1\int_0^1yz(z-y)^{n-2}dydz
$$

<details>
<summary>We provide the details of this integral below (click to view)</summary>
<br>

$$
	\int_0^1y\underbrace{\bigg[\int_0^1z(z-y)^{n-2}dz\bigg]}_{=:I_n(y)}dy
$$ let us solve the inner integral first. Do a change of variables $u = z-y, du=dz, z=u+y$. 

$$
	I_n(y) = \int_{-y}^{1-y}u^{n-2}(u+y)du = \int_{-y}^{1-y}[u^{n-1}+y\cdot u^{n-2}]du
$$ which are polynomial terms in $u$. After some simple antiderivative evaluations:

$$
	= \frac{1}{n}\bigg[(1-y)^n - (-1)^ny^n\bigg] + \frac{y}{n-1}\bigg[
		(1-y)^{n-1} - (-1)^{n-1}y^{n-1}
	\bigg]
$$

Now we integrate $I_n(y)$, and make two cases:


1. $n$ is even:

$$
	I_n(y) = \frac{1}{n}\bigg[(1-y)^n - y^n\bigg] + \frac{y}{n-1}\bigg[
		(1-y)^{n-1} + y^{n-1}
	\bigg]
$$ therefore:

$$
	\int_0^1yI_n(y)dy = \int_0^1\bigg[
	\frac1n((1-y)^{n}y - y^{n+1}) + \frac{1}{n-1}((1-y)^{n-1}y^2 + y^{n+1})dy
	\bigg]
$$

$$
	= \frac{1}{n}\bigg[
		\frac{1}{n^2+3n+2} - \frac{1}{n+2}
	\bigg] + 
	\frac{1}{n-1}\bigg[
		\frac{2}{n(n+1)(n+2)} + \frac{1}{n+2}
	\bigg] = \frac{2}{n(n-1)(n+2)}
$$

2. $n$ is odd:

$$
	I_n(y) = \frac{1}{n}\bigg[(1-y)^n + y^n\bigg] + \frac{y}{n-1}\bigg[
		(1-y)^{n-1} - y^{n-1}
	\bigg]
$$

Then:

$$
	\int_0^1yI_n(y)dy = \frac1n\bigg[
		\frac{1}{n^2+3n+2} + \frac{1}{n+2}
	\bigg] + 
	\frac{1}{n-1}\bigg[
		\frac{2}{n(n+1)(n+2)} - \frac{1}{n+2}
	\bigg] = 0
$$

</details>

By the integral above, we have that:

$$
	\mathbb{E}[L_nU_n] = 
	\begin{cases}
		\frac{1}{n+2}, \text{ if $n$ is even}\\
		0, \text{ if $n$ is odd}
	\end{cases}
$$

Then the covariance is:

$$
	\text{cov}(L_n, U_n) = 
	\begin{cases}
		\frac{1}{(n+1)^2(n+2)},  \text{ if $n$ is even}\\
		-\frac{n}{(n+1)^2},  \text{ if $n$ is odd}
	\end{cases}
$$

Correlation
---

1. If $n$ is even:

$$
	\rho_{L_n,U_n} = \frac{\text{cov}(L_n,U_n)}{\sigma_{L_n}\cdot\sigma_{U_n}} = 
	\frac{ \frac{1}{(n+1)^2(n+2)}}{
		\sqrt{
			\frac{n(2n(n+2)+1)}{(n+1)^2(n+2)}\cdot\frac{n}{(n+1)^2(n+2)}
		}
	} = \frac{1}{\sqrt{n}\cdot\sqrt{n}}= \frac{1}{n}
$$ if we let $n=2$, we see that we indeed recover $\frac12$, from [Order Statistics II](https://honglizhaobob.github.io/posts/2023/01/blog-post-3/).

2. If $n$ is odd:

$$
	\rho_{L_n,U_n} = \frac{
		-\frac{n}{(n+1)^2}
	}{
		\sqrt{
			\frac{n(2n(n+2)+1)}{(n+1)^2(n+2)}\cdot\frac{n}{(n+1)^2(n+2)}
		}
	} = -\frac1n
$$



### More Order Statistics

We've already done a bit with order statistics of uniform random variables, see [Order Stats I](https://honglizhaobob.github.io/posts/2023/01/blog-post-2/), [Order Stats II](https://honglizhaobob.github.io/posts/2023/01/blog-post-3/) and [Order Stats III](https://honglizhaobob.github.io/posts/2023/01/blog-post-4/). In this post, we start playing with different densities. 

The first density that comes to mind is standard normal. As usual, we will start with two variables -- the simple case.

Define: $U = \max\{X,Y\}$ where $X, Y$ are independent $\mathcal{N}(0,1)$ random variables.

PDF of $U$
---

We consider again the probability:

$$
	F_U(z) = \mathbb{P}(U \le z) = \mathbb{P}(X \le z)^2  = F_X^2(z)
$$ by set equivalence. Then:

$$
	f_U(z) = \frac{dF_U}{dz} = 2F_X(z)f_X(z) = \Phi(z)\cdot\sqrt{\frac{2}{\pi}}\exp(-\frac12z^2)
$$ which involves the CDF function of the normal density, $\Phi$.

Mean of $U$
---

For the mean of $U$, instead of direct algebraic computations, we use law of total expectation:

$$
	\mathbb{E}[U] = \mathbb{E}[U|X>Y]\mathbb{P}(X>Y) + \mathbb{E}[U|X\le Y]\mathbb{P}(X\le Y) = 2\mathbb{E}[U|X>Y]\mathbb{P}(X>Y)
$$ the last equality is by symmetry. Furthermore, $\mathbb{P}(X>Y)=\frac12$ due to their joint distribution being symmetric around the line $y=x$. Then it is enough to compute:

$$
	\mathbb{E}[U|X>Y] = \mathbb{E}[X|X>Y]
$$

We then apply [conditional tower property](https://en.wikipedia.org/wiki/Law_of_total_expectation) and write:

$$
	\mathbb{E}[X|X>Y] = \mathbb{E}[\mathbb{E}[X|Y]|X>Y]
$$ now it amounts to deriving an expression for $\mathbb{E}[X|Y=y]$. But $X,Y$ are independent, therefore we only have $\mathbb{E}[X]$, which is equal to 0. The computations stop here, not super interesting.

Detour: $X,Y$ are correlated with correlation $\rho$
---

We take a detour to consider the case when $X,Y$ are not independent; suppose they follow a joint Gaussian distribution:

$$
	\mathcal{N}(
		\left[
		\begin{array}{c}
			0 \\
			0 \\
		\end{array}
		\right],
		\left[
		\begin{array}{cc}
			1 & \rho \\
			\rho & 1\\
		\end{array}
		\right]
	)
$$ 


### Random distance to center of circle

In this post, we consider a uniform distribution over a circle with radius $r$. The distribution is specified as the following:

$$
	f_{X,Y}(x,y) = 
	\begin{cases}
		\frac{1}{\pi r^2}, \text{ if } \sqrt{x^2+y^2}\le r\\
		0, \text{ otherwise}
	\end{cases}
$$ 

Therefore, to find expected distance $d = \sqrt{x^2+y^2}$ from the center, it is enough to compute:

Expected value
---

$$
	\mathbb{E}[d] = \int_{\{(x,y): \sqrt{x^2+y^2}\le r\}}\sqrt{x^2+y^2}f_{X,Y}(x,y)dxdy
$$ using polar coordinates: $dxdy \mapsto rdrd\theta$, we have:

$$
	= \frac{1}{\pi r^2}\int_0^{2\pi}\int_0^rr^2drd\theta = \frac{1}{\pi r^2}\cdot \frac{2\pi r^3}{3} = \frac{2r}{3}
$$

Variance
---

Similarly, we can attempt to find the second moment:

$$
	\mathbb{E}[d^2] = \int_{\{(x,y): \sqrt{x^2+y^2}\le r\}}(x^2+y^2)f_{X,Y}(x,y)dxdy = \frac{1}{\pi r^2}\int_0^{2\pi}\int_0^rr^3drd\theta = \frac12r^2
$$

Then:

$$
	\text{Var}(d) = \mathbb{E}[d^2] - \mathbb{E}[d]^2 = \frac12r^2 - \frac{4}{9}r^2 = \frac{1}{18}r^2
$$




## Stochastic Processes
---
### Things about the Poisson process

The Poisson process is a counting process, denoted as $N_t$, that describes the number of random arrivals within the time interval $[0,t]$. The (discrete) distribution takes the form:

$$
	P(N_t = n) = \frac{(\lambda t)^n\exp(-\lambda t)}{n!}
$$ where $\lambda$ is a parameter. We first verify that it indeed sums to 1:

$$
	\sum_{n=0}^{\infty}P(N_t = n) = \sum_{n=0}^{\infty}\frac{(\lambda t)^n\exp(-\lambda t)}{n!}
$$ recall the formula for $e^x$:

$$
	e^x = \sum_{n=0}^{\infty}\frac{x^n}{n!}
$$ here let $x=\lambda t$, we see that the sum is 1.


We then derive the mean and variance of this random variable.

$$
	\mathbb{E}[N_t] = \sum_{n=0}^{\infty}n\cdot\frac{(\lambda t)^n\exp(-\lambda t)}{n!} = 0 + \sum_{n=1}^{\infty}n\cdot\frac{(\lambda t)^{n}\exp(-\lambda t)}{n!}
$$ 

$$
	= (\lambda t)\sum_{n=1}^{\infty}\frac{(\lambda t)^{n-1}\exp(-\lambda t)}{(n-1)!}
$$ let $m=n-1$, we have:
$$
	= (\lambda t)\underbrace{\sum_{m=0}^{\infty}\frac{(\lambda t)^m\exp(-\lambda t)}{m!}}_{=1} = \lambda t
$$

The variance derivation follows the same format of isolating a $\lambda t$ term, except that now one starts with $n^2$ in the summation. After cancelling with a factor of $n$ in the denominator, one is left with $$n(n-1)$$ in the summation, which is further cancelled with an $(n-1)$ factor from the remaining factorial $$(n-1)!$$ in the denominator. Finally, one writes $$n = (n-1)+1$$ in the sum, and break the sum into two separate ones. The first sum is the same case as the mean. And a factor $(\lambda t)^2$ can be taken from the second sum, effectively leaving $\mathbb{E}[N_t^2] = (\lambda t) + (\lambda t)^2$. Subtracting $$\mathbb{E}[N_t]^2$$ as required in the variance calculation $\text{Var}[N_t] = \mathbb{E}[N_t^2]-\mathbb{E}[N_t]^2$, one comes to the conclusion that the variance is also $\lambda t$. 

## Measure Theory
---
### Almost surely constant random variable
What does $$P(X = a) = 1$$ mean for a random variable?
---

$$X$$ is a random variable that is equal to $1$ with probability one. It is tempting to say that $$X$$ is constant. However, we need to remember that $$X$$ is not a variable in the traditional sense, but a mapping $$\Omega\rightarrow \mathbb{R}$$ from probability space to (a subset of) real numbers.

If we define $$X$$ as the following:

$$
	X(\omega) = 
	\begin{cases}
		a, & \text{ if } \omega\in\mathbb{R}\setminus\mathbb{Q}\\
		0, & \text{ if } \omega\in\mathbb{Q}
	\end{cases}
$$

We see that the set where $$\{X\neq a\}$$ has Lebesgue measure 0. But $$X$$ is not constant.



## Stochastic Calculus
---
### Ito calculus computations: joint density

#### Computing the joint density of two random processes
Let $W_t$ denote a standard Brownian motion, in this post, we walk through the derivation of the joint density for $$Z = (W_t, \int_0^tW_sds)$$, which reviews a few key properties of Brownian motions.

Define the random vector:

$$
	Z_t^{(n)} = (W_t, \sum_{j=1}^nW_{t_j}(t_j-t_{j-1}))
$$ where $$t_j = jt/n$$, for some $$j\in \{1,2,\ldots, n\}$$, and defines a partition. 

$$Z_t^{(n)}\rightarrow Z_t$$ almost surely. Since a linear combination of Gaussian random variables is still Gaussian, this means that the Ito integral $$\int_0^tW_sds$$ is also Gaussian. 

Furthermore, $$Z_t^{(n)}$$ is [jointly Gaussian](https://en.wikipedia.org/wiki/Multivariate_normal_distribution) for all $$n$$, $$t>0$$. 

Therefore, it is enough to determine the mean and covariance matrix of $$Z_t$$. 

We have:

* $$\mathbb{E}[W_t] = 0, \text{Var}[W_t] = t$$ for all $$t$$.

* $$\mathbb{E}[\int_0^tW_tdt] = 0$$ as each linear combination has mean 0.

It remains to consider:

$$
	\text{Var}[\int_0^tW_sds] = \mathbb{E}\bigg[
		\bigg( \int_0^tW_sds \bigg)^2
	\bigg]
$$

$$
	= \mathbb{E}\bigg[
		\int_0^t\int_0^tW_sW_{s'}dsds'
	\bigg] = \int_0^t\int_0^t\mathbb{E}[W_sW_{s'}]dsds'
$$

$$
	= \int_0^t\int_0^t\min\{s,s'\}dsds' = \frac{1}{3}t^3
$$ here we used the fact that $W_t$ has independent increments, thus for $a<b$, $\mathbb{E}[W_aW_b] = \mathbb{E}[W_a(W_a+W_b-W_a)] = a + \mathbb{E}[W_b]\cdot\underbrace{\mathbb{E}[W_b-W_a]}_{=0} = a$. By symmetry, it is equal to $b$ if $b<a$. Thus it comes to $\min\{a,b\}$.

Finally:

$$
	\text{Cov}[W_t, \int_0^tW_sds] = \mathbb{E}\bigg[
		W_t\int_0^{t}W_sds
	\bigg]
$$

$$
	= \int_0^t\underbrace{\mathbb{E}[W_tW_s]}_{=s, \text{ since $s<t$}}ds = \int_0^tsds = \frac12t^2
$$

Therefore, we see that:

$$
	Z_t \sim \mathcal{N}\bigg(
		\left[
		\begin{array}{c}
			0 \\
			0 \\
		\end{array}
		\right],
		\left[
		\begin{array}{cc}
			t & t^2/2 \\
			t^2/2 & t^3/3\\
		\end{array}
		\right]
	\bigg)
$$



# Linear Algebra
---

## Calculus
---

### Parameterized matrix calculus
---

When one mentions matrix calculus, one typically means gradient/jacobian with respect to non-scalar inputs those types that you can play with in this [Matrix Calculus](https://www.matrixcalculus.org/) calculator. 

This post records useful properties when the matrix is parameterized. That is functions of the form: $A(t):\mathbb{R}\rightarrow\mathbb{R}^{m\times n}$. Smoothness properties / well-definedness of derivatives are always assumed.

Derivative
---
$$
	A'(t) = 
	\left[
	\begin{array}{cccc}
		a_{11}'(t) & a_{12}'(t) & \cdots & a_{1n}'(t) \\
		a_{21}'(t) & a_{22}'(t) & \cdots & a_{2n}'(t) \\
		\vdots     & \cdots     & \ddots & \vdots     \\
		a_{n1}'(t) & a_{n2}'(t) & \cdots & a_{nn}'(t)
	\end{array}
	\right]
$$

Derivative of inverse
---

$$
	\frac{dA^{-1}}{dt} = -A^{-1}(t)A'(t)A^{-1}(t)
$$

*Proof*:

$$
	I = A^{-1}(t)A(t)
$$ then take derivatives on both sides and use product rule:

$$
	\mathbf{0} = \bigg[\frac{dA^{-1}}{dt}\bigg]A(t) + A^{-1}(t)A'(t) 
$$ then rearrange.

Derivative of inner product
---
Let $\mathbf{v}(t),\mathbf{w}(t)$ be vectors parameterized by $t$, then product rule gives:

$$
	\frac{d}{dt}[\mathbf{v}^T(t)\mathbf{w}(t)] = \bigg[\frac{d\mathbf{v}}{dt}\bigg]^T\mathbf{w}(t) + [\mathbf{v}(t)]^T\bigg[\frac{d\mathbf{w}}{dt}\bigg]
$$

Derivative of log-determinant
---

$$
	\frac{d\log\det A(t)}{dt} = \text{tr}(A^{-1}(t)A'(t))
$$

Derivative of inverse-transpose-times-inverse
---

$$
	\frac{d}{dt}[A^{-T}A^{-1}] = \frac{d(A^{-1})^T}{dt}A^{-1}+(A^{-1})^T\frac{dA^{-1}}{dt}
$$

$$
	= \bigg(
		\frac{dA^{-1}}{dt}
	\bigg)^TA^{-1} + (A^{-1})^T\frac{dA^{-1}}{dt}
$$

Using the previous formula for matrix inverse:

$$
	= -A^{-T}\frac{dA}{dt}A^{-T}A^{-1} - A^{-T}A^{-1}\frac{dA}{dt}A^{-1}
$$








# Calculus
---

### Calculating the Gaussian integral

How to compute the integral of $$\exp(-x^2)$$ from $$0$$ to $$\infty$$?
---
The function $\exp(-x^2)$ is an example of a function [without an elementary antiderivative](https://en.wikipedia.org/wiki/Nonelementary_integral). But since $\exp(-x^2)$ rapidly decreases at positive or negative infinities, we should expect to compute some finite number. 

Let $I = \int_0^{\infty}e^{-x^2}dx$, then:
$$
	I^2 = \bigg(\int_0^{\infty}e^{-x^2}dx\bigg)^2 = \bigg(\int_0^{\infty}e^{-x^2}dx\bigg)\bigg(\int_0^{\infty}e^{-y^2}dy\bigg)
$$ the second equality is just renaming the dummy variable. 

Then:

$$
	= \int_0^{\infty}e^{-(x^2+y^2)}dxdy
$$ 

Now we use polar coordinates, $$r = \sqrt{x^2+y^2}$$, $$x=r\cos\theta$$, $$y=r\sin\theta$$. After substitution, and $$dxdy = rdrd\theta$$ (the angle runs from $0$ to $\pi/2$ since $(x,y)$ covers that he first quadrant). 

We have:
$$
	= \int_0^{\pi/2}\int_0^{\infty}e^{-r^2}rdrd\theta
$$ 

which (inner) is a 1-dimensional integral. The function $$re^{-r^2}$$ does not depend on $$\theta$$, we can replace the outer integral with a constant $$\pi/2$$. To integrate $$re^{-r^2}$$, let $u = r^2$, then $$\frac12du = rdr$$. 

Finally we have:
$$
	= \frac{\pi}{4}\cdot\int_0^{\infty}e^{-u}du = \frac{\pi}{4}\cdot \underbrace{\bigg(0 + 1 \bigg)}_{\lim_{u\rightarrow\infty}(-e^{-u}) - (-e^{-0})} = \frac{\pi}{4}
$$

Since $$I^2 = \frac{\pi}{4}$$, the original integral is $$\sqrt{\pi}/2$$. 


### Integrating $$\min(x, y)$$

This set of posts are written to record interesting integral problems. That is, problems that contain some tricks or geometrical argument. The integrals are often in the Lebesgue sense. In this post, we integrate:

$$
	I(z) = \int_0^{z}\int_0^z\min(x,y)dxdy
$$ the domain $\\{0\le x\le z, 0\le y\le z\\}$ is separated by the set $\\{y=x\\}$. The subset below the straight line $y=x$ means $y\le x$, and being above the straight line means $y\ge x$. Then we have:

$$
	I(z) = \int_{\{y\le x, x\in [0,z]\}}\min(x,y)dydx + \int_{\{y\ge x, y\in [0,z]\}}dydx = 2\int_{\{y\le x, x\in [0,z]\}}\min(x,y)dydx
$$ the last equality is by symmetry (if we rename $x,y$). Then:

$$
	= 2\int_{0}^zydydx = 2z
$$

