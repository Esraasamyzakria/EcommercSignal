import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // 🔹 Dynamic routes → Server (SSR)
  {
    path: 'details/:id/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'category-details/:id/:slug',
    renderMode: RenderMode.Server
  },

  // 🔹 Static pages فقط
  {
    path: '',
    renderMode: RenderMode.Prerender
  },

  // 🔹 fallback (مهم جدًا)
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];