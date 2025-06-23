# 知识产权管理系统

## 项目概述
知识产权管理系统是一个基于前后端分离架构的企业级应用，旨在帮助组织高效管理专利、商标、版权等知识产权资产，提供数据可视化分析和权限控制功能。

## 技术栈

### 前端
- React 18
- Ant Design
- Axios
- Vite
- ECharts 5 (数据可视化)

### 后端
- Node.js 20
- Koa
- Sequelize (ORM)
- PostgreSQL

### 开发/部署工具
- Git
- Docker & Docker Compose
- Nginx

## 环境配置

### 前置要求
- Docker Desktop
- Node.js 20+ (可选，本地开发用)

### 环境变量
项目使用环境变量进行配置，主要环境变量包括：
- 数据库连接信息
- JWT密钥
- 服务端口号

## 快速启动

### 使用Docker Compose (推荐)
```bash
# 克隆仓库
git clone <仓库地址>
cd IntellectualPropertySystem

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

服务启动后，可通过以下地址访问：
- 前端应用: http://localhost:80
- 后端API: http://localhost:3001/api

### 本地开发

#### 后端
```bash
cd backend
npm install
npm run dev
```

#### 前端
```bash
cd frontend
npm install
npm run dev
```

## 项目结构
```
IntellectualPropertySystem/
├── .gitignore           # Git忽略文件配置
├── README.md            # 项目说明文档
├── docker-compose.yml   # Docker Compose配置
├── backend/             # 后端服务
│   ├── Dockerfile.dev   # 后端开发环境Dockerfile
│   ├── config/          # 配置文件
│   ├── package.json     # 后端依赖
│   └── src/             # 源代码
├── frontend/            # 前端应用
│   ├── Dockerfile.dev   # 前端开发环境Dockerfile
│   ├── package.json     # 前端依赖
│   ├── src/             # 源代码
│   └── vite.config.js   # Vite配置
└── nginx/               # Nginx配置
    └── nginx.conf       # Nginx服务配置
```

## 功能模块
- 用户认证与权限管理 (RBAC)
- 专利管理
- 商标管理
- 版权管理
- 数据可视化仪表盘

## 开发指南

### 代码规范
- 前端遵循ESLint配置
- 后端使用Prettier进行代码格式化

### 数据库迁移
```bash
cd backend
npm run db:migrate
```

## 常见问题

1. **服务启动失败？**
   检查Docker是否正常运行，端口是否被占用

2. **数据库连接错误？**
   确认环境变量配置正确，PostgreSQL服务是否正常启动

## 许可证
[MIT](LICENSE)