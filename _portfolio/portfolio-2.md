---
title: "Tensor Networks"
excerpt: "Scalable computations with functional tensor-trains"
collection: portfolio
---

# Introduction

## Functional Tensor Train Decomposition


### Multivariate Interpolation with Tensor Trains

```matlab
    % Interpolation using TT
    clear; clc
    % first with a 2d function,
    % % classical way without TT using the MATLAB "peaks" function
    x = sym("x");
    y = sym("y");
    func_sym =  3*(1-x).^2.*exp(-(x.^2) - (y+1).^2) ... 
    - 10*(x/5 - x.^3 - y.^5).*exp(-x.^2-y.^2) ... 
    - 1/3*exp(-(x+1).^2 - y.^2);
    % convert into handle
    func = matlabFunction(func_sym);
    % specify grid
    stpsz = 0.1;
    x_grid_arr = -3:stpsz:3; y_grid_arr = -3:stpsz:3;
    [y_grid, x_grid] = meshgrid(y_grid_arr, x_grid_arr);

    f_grid_coarse = func(x_grid, y_grid);
    % surf(x_grid, y_grid, func(x_grid, y_grid));

    % change step size to 0.05
    % suppose we want to know func(x=1.35, y=-2.25) = -0.5551
    stpsz_update = 0.1/2;
    x_grid_arr_fine = -3:stpsz_update:3; 
    y_grid_arr_fine = -3:stpsz_update:3;
    [y_grid_fine, x_grid_fine] = meshgrid(y_grid_arr_fine, x_grid_arr_fine);
    f_grid_fine = interp2(y_grid,x_grid,f_grid_coarse,...
        y_grid_fine,x_grid_fine,'linear');
    % surf(x_grid_fine, y_grid_fine, f_grid_fine)

    % locate point on grid
    x_query_ind = dsearchn(x_grid_arr_fine', 1.35); 
    y_query_ind = dsearchn(y_grid_arr_fine', -2.25);
    % get point on f
    f_grid_fine(x_query_ind, y_query_ind)


    % begin TT version

    % check exists
    x_grid_arr; y_grid_arr; func_sym;
    % create TT compression
    x_grid_arr_tt = tt_tensor(x_grid_arr);
    y_grid_arr_tt = tt_tensor(y_grid_arr);
    X = tt_meshgrid_vert(x_grid_arr_tt, y_grid_arr_tt);
    func_amen = matlabFunction(func_sym, 'Vars', {[x,y]});

    f_tt_coarse = amen_cross(X, func_amen, 1e-9, 'nswp', 20);
    % use linear interpolation by updating cores
    % the number of cores is same as number of dimensions
    d = 2;
    f_tt = f_tt_coarse;

    % do cores manually (code up a for loop later)
    % still evaluate func(x=1.35, y=-2.25) = -0.5551
    % locate on coarse grid
    x_query = 1.35; y_query = -2.25;
    x_query_ind = dsearchn(x_grid_arr', x_query); % seems to find the rounded up point, if positive
    y_query_ind = dsearchn(y_grid_arr', y_query); % check by looking at grid_arr(query_ind), rounds down if negative

    % follow notation in paper: Page 607 of Dolgov et al. TT-IRT

    % index for x
    i_1 = x_query_ind - 1;
    assert((x_grid_arr(i_1) <= x_query) && (x_grid_arr(i_1+1) >= x_query));

    % index for y
    i_2 = y_query_ind;
    assert((y_grid_arr(i_2) <= y_query) && (y_grid_arr(i_2+1) >= y_query));

    % compute f_tt(x, y)

    % compute unfolding matrix update for x
    a_x = ( (x_query - x_grid_arr(i_1)) / (x_grid_arr(i_1+1) - x_grid_arr(i_1)) );
    unfold_a_x = reshape(f_tt{1}(:,i_1+1,:), [1 3]);
    b_x = ( (x_grid_arr(i_1+1)- x_query) / (x_grid_arr(i_1+1) - x_grid_arr(i_1)) );
    unfold_b_x = reshape(f_tt{1}(:,i_1,:), [1 3]);

    update_unfold_x = a_x * unfold_a_x + b_x * unfold_b_x;

    % compute unfolding matrix update for y
    a_y = ( (y_query - y_grid_arr(i_2)) / (y_grid_arr(i_2+1) - y_grid_arr(i_2)) );
    unfold_a_y = f_tt{2}(:,i_2+1,:);
    b_y = ( (y_grid_arr(i_2+1)- y_query) / (y_grid_arr(i_2+1) - y_grid_arr(i_2)) );
    unfold_b_y = f_tt{2}(:,i_2,:);

    update_unfold_y = a_y * unfold_a_y + b_y * unfold_b_y;

    % result
    update_unfold_x * update_unfold_y
```

### Multivariate Integration with Tensor Trains

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
$$ with stepsizes $$\Delta x = 10^{-3}, \Delta y = 5\times 10^{-4}$$. The integral can be computed exactly and should be approximately equal to $$1.29885$$. 

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

<div class="pdf-display-window">
    <iframe src="/files/projects/tensor-networks/sampling_notes.pdf" width="100%" height="100%" style="border: none;"></iframe>
</div>
<style>
.pdf-display-window {
    width: 800px;
    height: 600px;
    border: 2px solid #333;
    overflow: hidden;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>


### High-Dimensional Function Interpolations

<div class="pdf-display-window">
    <iframe src="/files/projects/tensor-networks/interpolation_notes.pdf" width="100%" height="100%" style="border: none;"></iframe>
</div>
<style>
.pdf-display-window {
    width: 800px;
    height: 600px;
    border: 2px solid #333;
    overflow: hidden;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
