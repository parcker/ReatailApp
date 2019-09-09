console.log(__dirname);
const env = require('dotenv')
env.config()

const isProd = process.env.NODE_ENV === 'production'
const entitiesExtension = isProd ? 'js' : 'ts'
const entitiesDir = isProd ? 'dist' : 'src'
const migrationsDir = isProd ? 'dist/migration/*.js' : 'src/migration/*.ts'

module.exports = {
  type: "mysql",
  host:process.env.TYPEORM_HOST,
  port:process.env.TYPEORM_PORT,
  username:process.env.TYPEORM_USERNAME ,
  password:process.env.TYPEORM_PASSWORD,
  database:process.env.TYPEORM_DATABASE,
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
