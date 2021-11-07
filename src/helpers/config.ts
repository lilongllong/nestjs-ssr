interface Config {
  db?: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    operatorsAliases: string;
  };
}

export const config: Config = {};
export default config;

export const getConfig = async () => {
  // 远程拉取配置
  return {
    db: {
      username: 'root',
      password: '123456',
      database: 'scon_node_server',
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      operatorsAliases: false,
    },
  };
};
