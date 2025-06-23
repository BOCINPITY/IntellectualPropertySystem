import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import router from './routes/index.js';
import { sequelize } from '../config/database.js';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(helmet()); // 安全头部
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(logger()); // 日志
app.use(bodyParser({
  jsonLimit: '10mb'
})); // 请求体解析

// 错误处理中间件
app.use(errorHandler);

// 路由注册
app.use(router.routes()).use(router.allowedMethods());

// 数据库连接测试
sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// 启动服务器
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;