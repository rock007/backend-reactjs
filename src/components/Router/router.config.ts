import LoadableComponent from './../Loadable/index';

export const userRouter: any = [
  {
    path: '/account',
    name: 'account',
    title: '帐号',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false
  },
  {
    path: '/account/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('../../pages/Account/Login')),
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
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: 'wechat',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Dashboard')),
  },
  {
    permission: '',
    title: '档案管理',
    name: 'man_mg',
    icon: 'search',
    showInMenu: true,
    childs:[{
      path: '/man',
      title: '档案库',
      name: 'man',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Man'))
    }]  
  },
  {
    path: '/process',
   // permission: 'Pages.Tenants',
    title: '社戒执行管理',
    name: 'process',
    icon: 'uf-file-s',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Process'))
  },
  {
    path: '/niaojian',
   // permission: 'Pages.Tenants',
    title: '康复检查',
    name: 'niaojian',
    icon: 'appstore',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Niaojian'))
  },
  {
    path: '/visitor',
    //permission: 'Pages.Tenants',
    title: '走访记录',
    name: 'visitor',
    icon: 'appstore',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Vistitor'))
  },
  {
    path: '/exception',
    permission: '',
    title: 'exception',
    name: 'exception',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Exception'))
  }
];

export const routers = [...userRouter, ...appRouters];
