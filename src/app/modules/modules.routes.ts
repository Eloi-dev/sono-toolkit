export const modulesPages = [
  {
    title: 'Limiteur',
    url: '/dashboard/limiter-threshold',
    path: 'limiter-threshold',
    icon: 'timer',
    loadChildren: () => import('../modules/limiter-threshold/limiter-threshold.module').then(m => m.LimiterThresholdPageModule)
  }
]
