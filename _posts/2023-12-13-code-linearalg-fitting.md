---
layout: post
title: Finding (square) matrices
date: 2023-12-13 12:52:00
description: MATLAB code for some linear algebra experiments. 
tags: quick-code
---

In this note, we discuss finding matrices. By that I mean, suppose one observes some vectors in $$\mathbb{R}^d$$, $$\{x_i, y_i\}_{i=1}^m$$, one wishes to find the best matrix $$A\in\mathbb{R}^{d\times d}$$ such that:

\begin{equation}
    y_i \approx Ax_i
\end{equation} 

for all $$i=1,2,\ldots, m$$. The natural start is to first collect the vectors in matrices:

$$
    X = 
    \begin{bmatrix}
        \mid & \mid & \mid & \mid\\
        x_1 & x_2 & \cdots & x_m \\
        \mid & \mid & \mid & \mid
    \end{bmatrix}, 
    Y = 
    \begin{bmatrix}
        \mid & \mid & \mid & \mid\\
        y_1 & y_2 & \cdots & y_m \\
        \mid & \mid & \mid & \mid
    \end{bmatrix}
$$

Then one aims to find

$$
    Y \approx AX
$$


## Unconstrained problem, full rank
---
Perhaps, by solving:

$$  
    \min_{A\in\mathbb{R}^{d\times d}}|| Y - AX ||_F^2
$$

Suppose for simplicity that $$X$$ is full-rank. An SVD of $$X$$ would give us:

$$
    X = U\Sigma V^T
$$ 

$$U\in\mathbb{R}^{d\times d}, V\in \mathbb{R}^{m\times m}$$ are orthogonal matrices, $$\Sigma\in\mathbb{R}^{d\times m}$$ is diagonal, containing the singular values (assume sorted). 

Then we have that the solution should be $$A^* = YX^{\dagger}$$, where $$X^{\dagger}$$ is the (left) pseudoinverse of $$X$$, such that $$Y - YX^{\dagger}X = 0$$. 

We might wish to use this matrix to predict things given a vector. The following MATLAB code implements just this: let $$u$$ be a set of training data, $$u_0$$ is some new observation. We generate a sequence of new observations after fitting.

```matlab
function u_new = predict(u0, u, m)
    % ----------
    % u: training data
    % u0: initial condition
    % m: number of snapshots to use
    % ----------
    [d, n] = size(u);
    % take m snapshots
    X = u(:, 1:m);
    Y = u(:, 2:m+1);
    % fit matrix
    A = Y*pinv(X);
    % generate m new vectors
    u_new = zeros(d, m);
    u_new(:, 1) = u0;
    for i = 2:m
        u_new(:,i) = A*u_new(:,i-1);
    end
end

```

More generally, we might say 
$$
    y_i \approx f(x_i)
$$

And minimize:

$$
    \min_{f}\sum_{i=1}^m||y_i-f(x_i)||_2^2
$$

Let's stick to linear $$f$$ and say:

$$
    y_i \approx x_i + Bx_i
$$

Then in matrix form:

$$
    Y-X = BX
$$

whose solution follows from before, and $$B^* = (Y-X)X^{\dagger}$$. 

```matlab
function u_new = predict(u0, u, m)
    % ----------
    % u: training data
    % u0: initial condition
    % m: number of snapshots to use
    % ----------
    [d, n] = size(u);
    % take m snapshots
    X = u(:, 1:m);
    Y = u(:, 2:m+1);
    % fit matrix
    B = (Y-X)*pinv(X);
    % generate m new vectors
    u_new = zeros(d, m);
    u_new(:, 1) = u0;
    for i = 2:m
        u_new(:,i) = u_new(:,i-1) + B*u_new(:,i-1);
    end
end
```

We can add some other terms, such as the following

$$
    y_i \approx Ax_i + b
$$

and find $$A, b$$. This is readily solved from before because we can re-write:

$$
    Y \approx 
    \begin{bmatrix}
        A & b
    \end{bmatrix} \cdot
    \begin{bmatrix}
        X\\
        \mathbf{1}^T
    \end{bmatrix} =: \tilde{A}\tilde{X}
$$

where $$\mathbf{1}$$ is a vector of all $$1$$'s.

```matlab
function u_new = predict(u0, u, m)
    % ----------
    % u: training data
    % u0: initial condition
    % m: number of snapshots to use
    % ----------
    [d, n] = size(u);
    % take m snapshots
    X = u(:, 1:m);
    X_tilde = [X; ones(m,1)'];
    Y = u(:, 2:m+1);
    % fit matrix
    A_tilde = Y*pinv(X_tilde);
    A = A_tilde(:,1:end-1);
    b = A_tilde(:,end);
    % generate m new vectors
    u_new = zeros(d, m);
    u_new(:, 1) = u0;
    for i = 2:m
        u_new(:,i) = A*u_new(:,i-1) + b;
    end
end
```

We can also write:

$$
    y_i \approx x_i + Bx_i + b
$$

which has the same form as before.

```matlab
function u_new = predict(u0, u, m)
    % ----------
    % u: training data
    % u0: initial condition
    % m: number of snapshots to use
    % ----------
    [d, n] = size(u);
    % take m snapshots
    X = u(:, 1:m);
    X_tilde = [X; ones(m,1)'];
    Y = u(:, 2:m+1);
    % fit matrix
    B_tilde = (Y-X)*pinv(X_tilde);
    B = B_tilde(:,1:end-1);
    b = B_tilde(:,end);
    % generate m new vectors
    u_new = zeros(d, m);
    u_new(:, 1) = u0;
    for i = 2:m
        u_new(:,i) = u_new(:,i-1) + B*u_new(:,i-1) + b;
    end
end
```
We will continue the code in another note, where we find slightly more interesting matrices. Also, it is not always necessary to assume $$X$$ is full rank.

---