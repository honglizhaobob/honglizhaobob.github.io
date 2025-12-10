% Solving the Poisson equation in 2d
%% Numerical solution
clear; clc;

% discretization level
h1 = 1/10; 
u1 = poisson2d(h1);
h2 = 1/20;
u2 = poisson2d(h2);
% exact u(1/2,1/2)
u = 0.5/(pi^2);
figure(1);
surf(u1);
title(sprintf("Numerical Solution of Poisson Equation, h = %0.2f", ...
       round(h1,2)))
view(140,45);
figure(2);
surf(u2);
title(sprintf("Numerical Solution of Poisson Equation, h = %0.2f", ...
       round(h2,2)))
view(140,45);
%% Evaluate error
disp("Displaying abs. error for h = 1/10")
disp("=====================")
disp(num2str(abs(u-u1(6,6))));
disp(" ");
disp("Displaying abs. error for h = 1/20")
disp("=====================")
disp(num2str(abs(u-u2(11,11))));

%% Improving estimate
sol1 = u1(6,6); % coarser solution
sol2 = u2(11,11);
% sum 
sol3 = (4*sol2-sol1)/3;
disp("h=1/10 abs. error")
disp("====================")
disp(num2str(abs(u-sol1)))
disp(" ")
disp("h=1/20 abs. error")
disp("====================")
disp(" ")
disp(num2str(abs(u-sol2)))
disp(" ")
disp("Extrapolated abs. error")
disp("====================")
disp(num2str(abs(u-sol3)))



%% Helper functions
function uh = poisson2d(h)
    % Given a stepsize h, returns the solution
    % to Poisson equation on (0,1)^2.
    xmin = 0;
    xmax = 1;
    x = xmin:h:xmax; 
    y = x;
    % inner solution
    x2 = x(2:end-1);
    y2 = y(2:end-1);
    N = length(x2);
    [x2,y2] = meshgrid(x2,y2);
    
    % build Laplacian matrix following column major solution
    D = sparse(diag(2*ones(1,N)) + ...
        diag(-ones(1,N-1),1) + diag(-ones(1,N-1),-1));
    L = kron(D,eye(N))+kron(eye(N),D);
    
    % evaluate right hand side and flatten (vectorized)
    f = sin(pi*x2).*sin(pi*y2)+sin(pi*x2).*sin(2*pi*y2);
    f = f(:);
    
    % solution
    uh = sparse(zeros(N+2,N+2));
    uh(2:end-1,2:end-1) = reshape((h^2)*(L\f),N,N);
end