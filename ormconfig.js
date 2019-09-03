console.log(__dirname);
const env = require('dotenv')
env.config()

const isProd = process.env.NODE_ENV === 'production'
const entitiesExtension = isProd ? 'js' : 'ts'
const entitiesDir = isProd ? 'dist' : 'src'
const migrationsDir = isProd ? 'dist/migration/*.js' : 'src/migration/*.ts'

module.exports = {
  type: "mysql",
  host:"127.0.0.1",
  port:"3306"||process.env.SERVERPORT,
  username:"root",
  password:"d0tN3t123",
  database:"retailstore",
  synchronize:true,
  logging:true,
  migrations: [migrationsDir],
  cli: {
    migrationsDir: 'src/migration'
  },
  entities: [
    `${__dirname}/${entitiesDir}/**/*.entity.${entitiesExtension}`
  ],
 
}
