import Router from 'koa-router';
import healthRouter from './health.routes.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import patentRouter from './patent.routes.js';
import trademarkRouter from './trademark.routes.js';
import copyrightRouter from './copyright.routes.js';
import dashboardRouter from './dashboard.routes.js';

const router = new Router({
  prefix: '/api'
});

// 挂载各模块路由
router.use(healthRouter.routes(), healthRouter.allowedMethods());
router.use('/auth', authRouter.routes(), authRouter.allowedMethods());
router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.use('/patents', patentRouter.routes(), patentRouter.allowedMethods());
router.use('/trademarks', trademarkRouter.routes(), trademarkRouter.allowedMethods());
router.use('/copyrights', copyrightRouter.routes(), copyrightRouter.allowedMethods());
router.use('/dashboard', dashboardRouter.routes(), dashboardRouter.allowedMethods());

// 404 路由
router.all('*', (ctx) => {
  ctx.status = 404;
  ctx.body = {
    success: false,
    message: `Route not found: ${ctx.method} ${ctx.path}`
  };
});

export default router;