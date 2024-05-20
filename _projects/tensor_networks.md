---
layout: page
title: Tensor Networks
description: Scalable computations with functional tensor-trains.
img: assets/img/projects/tensor_networks/curdemo.png
importance: 1
category: Research Experiments
related_publications: khoo2023tensorizing, zhao2024datadriven
---

# Introduction

## Functional Tensor Train Decomposition

### Multivariate Integration with Functional Tensor Trains

This section constitutes a tutorial for integrating a multivariate function in MATLAB. The following resources provide an overview of the tensor-train decomposition and integration of multivariate functions. 

- [Tensor Train Decomposition](https://epubs.siam.org/doi/10.1137/090752286)
- [Tensor Train Numerical Integration](https://arxiv.org/abs/2103.12129)

Furthermore, a highly useful custom library is the [TT-Toolbox](https://github.com/oseledets/TT-Toolbox).

---

The test example is to use trapezoidal rule to compute:

$$
    I = \int_0^1\int_0^1\exp\big(
        \sin(x * y)
    \big)dxdy
$$ with stepsizes $$\Delta x = 10^{-3}, \Delta y = 5\times 10^{-4}$$. The integral can be computed exactly and should be approximately equal to $1.29885$. 

```matlab
% MATLAB integration
dx = 0.001; dy = 0.0005; % rectangular grid
% create 1d grid
X = 0:dx:1; Y = 0:dy:1; 
Nx = length(X); Ny = length(Y);
% meshgrid
[Y_grid, X_grid] = meshgrid(Y,X);
% evaluate function on grid
f_mat = exp(sin(Y_grid.*X_grid));
% surf(X_grid, Y_grid, f_mat);
% trapz from matlab
int_matlab = trapz(dy, trapz(dx, f_mat, 2), 1);

% hard code trapz using weight matrix
wx_1d = zeros(1, Nx)+1*dx; wx_1d(1) = wx_1d(1)/2; wx_1d(end) = wx_1d(end)/2;
wy_1d = zeros(1, Ny)+1*dy; wy_1d(1) = wy_1d(1)/2; wy_1d(end) = wy_1d(end)/2;
% outer product (can also do meshgrid multiply)
[wy, wx] = meshgrid(wy_1d, wx_1d);
W = wx.*wy;
% W = wy_1d'*wy_1d;
int_trap_matrix = sum(sum(W.*f_mat));

% TT integration
xtt = tt_tensor(X); 
ytt = tt_tensor(Y);
grid_points = tt_meshgrid_vert(xtt, ytt);
% tt compressed weights
wx_tt = tt_tensor(wx_1d);
wy_tt = tt_tensor(wy_1d);
W_tt_grid = tt_meshgrid_vert(wx_tt, wy_tt);
Weights_tt = amen_cross(W_tt_grid, @(W)prod(W,2), 1e-10, 'nswp', 20);

% approximate f_tt
exp_sin_func = @(X) exp(sin(X(:,1).*X(:,2)));
f_tt = amen_cross(grid_points, exp_sin_func, 1e-10, 'nswp', 20);
% approximate integral
integral_TT = sum(f_tt.*Weights_tt);
```
### Sampling High-Dimensional Probability Distributions

Please find [the note here](http://honglizhaobob.github.io/assets/pdf/projects/tensor_networks/sampling_notes.pdf). 


