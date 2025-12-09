export const endpoints = {
  auth: {
    login: "/auth/login/",
    register: "/auth/register/",
    refresh: "/auth/refresh/",
    me: "/auth/me/"
  },
  inventory: {
    list: "/inventory/items/",
    importCsv: "/inventory/import/",
    exportCsv: "/inventory/export/",
    islands: "/inventory/islands/",
    homeMaterials: "/inventory/home-materials/",
    cabinets: "/inventory/cabinets/",
    movements: "/inventory/movements/",
    procedures: "/inventory/procedures/",
    alerts: "/inventory/alerts/",
    metrics: "/inventory/metrics/"
  },
  admin: {
    users: "/admin/users/",
    roles: "/admin/roles/"
  }
};
