interface Config {
  db?: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    operatorsAliases: boolean;
  };
  mongodb?: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
  };
}

export const config: Config = {};
export default config;

export const getConfig = async (type = 'http') => {
  // 远程拉取配置
  config.db = {
    username: 'root',
    password: '123456',
    database: 'scon_node_server',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,
  };
  config.mongodb = {
    host: '127.0.0.1',
    port: 27017,
    database: 'shenzhen_buy_room',
    username: 'admin',
    password: '123456',
  };
  return config;
};
