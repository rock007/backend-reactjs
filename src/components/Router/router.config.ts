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
    title: '档案详细',
    path: '/man-view/:id',
    name: 'man_view',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Man/View'))
  },
  {
    permission: '',
    title: '档案编辑',
    path: '/man-edit/:id',
    name: 'man_edit',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Man/Edit/ManEditPage'))
  },
  {
    permission: '',
    title: '戒毒人员>亲属关系',
    path: '/man-relate/:id',
    name: 'man_relate',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Man/Edit/RelationShipPage'))
  },
  {
    permission: '',
    title: '戒毒人员>六保一',
    path: '/man-contact/:id',
    name: 'man_relate',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Man/Edit/ManContactPage'))
  },
  {
    permission: '',
    title: '戒毒人员>工作经历',
    path: '/man-work/:id',
    name: 'man_relate',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Man/Edit/ManWorkPage'))
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
    title: '社戒管理-报到',
    path: '/process-regist/:id',
    name: 'man_process_regist',
    icon: '9square-2',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/Buss/ManRegist'))
  },
  {
    permission: '',
    title: '社戒管理-告诫书',
    path: '/process-notice/:id',
    name: 'man_process_notice',
    icon: '9square-2',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/Buss/ManNotice'))
  },
  {
    permission: '',
    title: '社戒管理-通知函',
    path: '/process-warn/:id',
    name: 'man_process_warn',
    icon: '9square-2',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/Buss/ManWarn'))
  },
  {
    permission: '',
    title: '社戒管理-变更社区',
    path: '/process-trans/:id',
    name: 'man_process_trans',
    icon: '9square-2',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/Buss/ManTrans'))
  },
  {
    permission: '',
    title: '社戒管理-解除戒毒',
    path: '/process-release/:id',
    name: 'man_process_release',
    icon: '9square-2',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/Buss/ManRelease'))
  },
  {
    permission: '',
    title: '社戒管理-执行强戒',
    path: '/process-reback/:id',
    name: 'man_process_reback',
    icon: '9square-2',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/Buss/ManReback'))
  },
  {
    permission: '',
    title: '社戒详细',
    path: '/process-view/:id',
    name: 'man_process_view',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Process/View/ViewPage'))
  },
  {
    path: '/niaojian',
    title: '尿检记录',
    name: 'niaojian',
    icon: 'pencil',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Niaojian'))
  },
  {
    path: '/niaojian-edit/:id',
    title: '尿检记录-编辑',
    name: 'niaojian_edit',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Niaojian/Edit'))
  },
  {
    path: '/niaojian-detail/:id',
    title: '尿检记录-查看',
    name: 'niaojian_detail',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Niaojian/View'))
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
    path: '/visit-edit/:id',
    title: '走访记录-编辑',
    name: 'visit_edit',
    icon: 'rulerpen-o',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Visit/Edit'))
  },{
    path: '/visit-detail/:id',
    title: '走访记录-详细',
    name: 'visit_view',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Visit/View'))
  },{
    path: '/dayoff',
    title: '请假',
    name: 'dayoff',
    icon: 'caven',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Dayoff'))
  },{
    path: '/dayoff-edit/:id',
    title: '请假-审核',
    name: 'dayoff_edit',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Dayoff/Edit'))
  },{
    path: '/dayoff-detail/:id',
    title: '请假-查看',
    name: 'dayoff_view',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Dayoff/View'))
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
  },
  {
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
  },
  {
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
  },
  {
    path: '/man13',
    title: '今日签到',
    name: 'man1',
    icon: 'caven',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Man'))
  },
  {
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
    title: '菜单权限',
    name: 'sys_menu',
    icon: 'caven',
    showInMenu: true,
    component: LoadableComponent(() => import('../../pages/Sys/Menu'))
  },{
    permission: '',
    path: '/permission-edit/:id',
    title: '菜单权限编辑',
    name: 'sys_permisson_edit',
    icon: 'caven',
    showInMenu: false,
    component: LoadableComponent(() => import('../../pages/Sys/Menu/Edit'))
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

export const sceneRouters: any = [
  {
    name:'wellcome',
    title:'欢迎页',
    component: LoadableComponent(() => import('../../pages/Scenes/Wellcome'))
  },
  {
    name:'articleDemo',
    title:'富文本测试',
    component: LoadableComponent(() => import('../../pages/Scenes/ArticleDemo'))
  },
  {
    name:'chartDemo',
    title:'图表测试',
    component: LoadableComponent(() => import('../../pages/Scenes/ChartDemo'))
  },
  {
    name:'mapDemo',
    title:'地图测试',
    component: LoadableComponent(() => import('../../pages/Scenes/MapDemo'))
  }
]

export const routers = [...userRouter, ...appRouters,...sceneRouters];
