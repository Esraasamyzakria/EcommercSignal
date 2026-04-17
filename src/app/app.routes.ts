import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'brand',
    loadComponent: () =>
      import('./features/brands/brands.component').then(m => m.BrandsComponent),
    title: 'Brands',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(m => m.CartComponent),
    title: 'Cart',
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./features/categories/categories.component').then(m => m.CategoriesComponent),
    title: 'Category',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout',
  },
  {
    path: 'details/:id/:slug',
    loadComponent: () =>
      import('./features/details/details.component').then(m => m.DetailsComponent),
    title: 'Details',
  },
  {
    path: 'category-details/:id/:slug',
    loadComponent: () =>
      import('./features/category-details/category-details.component').then(m => m.CategoryDetailsComponent),
    title: 'categoryDetails',
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./features/orders/orders.component').then(m => m.OrdersComponent),
    title: 'Orders',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component').then(m => m.ShopComponent),
    title: 'Shop',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wisklist/wisklist.component').then(m => m.WisklistComponent),
    title: 'Wishlist',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(m => m.RegisterComponent),
    title: 'Register',
  },
  {
    path: 'forget',
    loadComponent: () =>
      import('./features/forgot/forgot.component').then(m => m.ForgotComponent),
    title: 'Forgot Password',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'Not Found',
  },
];