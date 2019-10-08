import LoadableComponent from './../Loadable/index';

export const userRouter: any = [
  {
    path: '/account',
    name: 'account',
    title: '帐号',
    component: LoadableComponent(() => import('../../pages/Account')),
    isLayout: true,
    showInMenu: false,
  }
];

export const appRouters: any = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: '首页',
    icon: 'home',
    component: LoadableComponent(() => import('../../pages/Home')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: 'home',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Dashboard')),
  },
  {
    path: '/man',
    permission: '',
    title: '档案管理',
    name: 'man',
    icon: 'appstore',
    showInMenu: true,
    childs: [,
      {
        path: '/niaojian',
        permission: 'Pages.Tenants',
        title: 'Tenants',
        name: 'tenant',
        icon: 'appstore',
        showInMenu: true,
        component: LoadableComponent(() => import('../../pages/Niaojian')),
      },
      {
        path: '/visitor',
        permission: 'Pages.Tenants',
        title: 'Tenants',
        name: 'tenant',
        icon: 'appstore',
        showInMenu: true,
        component: LoadableComponent(() => import('../../pages/Vistitor')),
      }]
  },
  {
    path: '/exception',
    permission: '',
    title: 'exception',
    name: 'exception',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Exception')),
  }
];

export const routers = [...userRouter, ...appRouters];
