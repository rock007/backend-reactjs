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
    title: '工作台',
    icon: 'pc',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Dashboard')),
  },
  {
    permission: '',
    title: '档案库',
    name: 'man_doc',
    icon: 'pencil-s',
    path: '/man',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Man'))
  },
  {
    permission: '',
    title: '社戒管理',
    path: '/process',
    name: 'man_process',
    icon: '9square-2',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Process'))
  },
  {
    permission: '',
    title: '社戒管控',
    name: 'process_mg',
    showInMenu: true,
    childs:[{
      path: '/niaojian',
      title: '尿检记录',
      name: 'niaojian',
      icon: 'pencil',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Niaojian'))
    },{
      path: '/niaojian-schedule',
      title: '尿检计划',
      name: 'niaojian_schedule',
      icon: 'calendar',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Niaojian/Schedule'))
    },{
      path: '/visit',
      title: '走访记录',
      name: 'visit',
      icon: 'rulerpen-o',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Visit'))
    },{
      path: '/dayoff',
      title: '请假',
      name: 'dayoff',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Dayoff'))
    },{
      path: '/forhelp',
      title: '求助',
      name: 'forhelp',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Forhelp'))
    },{
      path: '/location',
      title: '位置轨迹',
      name: 'location',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Location'))
    },{
      path: '/checkin',
      title: '签到',
      name: 'checkin',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Checkin'))
    }]  
  },
  {
    permission: '',
    title: '业务审核',
    name: 'buss_audit',
    icon: 'security-2',
    showInMenu: true,
    childs:[{
      path: '/audit-noticewarn',
      title: '通知函',
      name: 'audit_noticewarn',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Audit/NoticeWarn'))
    },{
      path: '/audit-mantrans',
      title: '社区转移',
      name: 'audit_mantrans',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Audit/ManTrans'))
    },{
      path: '/audit-mancate',
      title: '人员分类',
      name: 'audit_mancate',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Audit/ManCate'))
    }]
  },
  {
    permission: '',
    title: '业务查询',
    name: 'buss_search',
    icon: 'search-light-2',
    showInMenu: true,
    childs:[{
      path: '/notices',
      title: '告诫书',
      name: 'notices',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Notices'))
    },{
      path: '/yellowcard',
      title: '红黄牌',
      name: 'yellowcard',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/YellowCard'))
    }]
  },
  {
    permission: '',
    title: '统计分析',
    name: 'man_mg3',
    icon: 'histogram-s-o-2',
    showInMenu: true,
    childs:[{
      path: '/man13',
      title: '今日签到',
      name: 'man1',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Man'))
    }]
  },
  {
    permission: '',
    title: '系统管理',
    name: 'sys_mg',
    icon: 'settings',
    showInMenu: true,
    childs:[{
      path: '/org',
      title: '组织机构',
      name: 'sys_org',
      icon: 'group-2',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Sys/Org'))
    },{
      path: '/roles',
      title: '角色管理',
      name: 'sys_role',
      icon: 'role',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Sys/Role'))
    },{
      path: '/users',
      title: '用户管理',
      name: 'sys_user',
      icon: 'users-o',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Sys/User'))
    },{
      path: '/menus',
      title: '菜单管理',
      name: 'sys_menu',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Sys/Menu'))
    },{
      path: '/man4',
      title: '地区管理',
      name: 'man4',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Man'))
    },{
      path: '/man5',
      title: '网格管理',
      name: 'man5',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Man'))
    },{
      path: '/man6',
      title: '包办单位',
      name: 'man6',
      icon: 'caven',
      showInMenu: true,
      component: LoadableComponent(() => import('../../pages/Man'))
    }]  
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
