const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// 初始化Sequelize实例
const sequelize = new Sequelize(
  process.env.DB_NAME || 'intellectual_property',
  process.env.DB_USER || 'ipadmin',
  process.env.DB_PASSWORD || 'SecurePass123!',
  {
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+08:00' // 设置时区为北京时间
  }
);

// 模型关联函数
const associateModels = () => {
  const models = sequelize.models;
  // 在这里定义模型之间的关联关系
  // 例如: models.User.hasMany(models.Patent);
};

module.exports = sequelize;
module.exports.sequelize = sequelize;
module.exports.associateModels = associateModels;