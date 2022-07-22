import { DataTypes } from 'sequelize'
import 'dotenv/config'

import { Sequelize } from 'sequelize'

const PostgresSequelize = new Sequelize(
  `postgres://postgres:123456@127.0.0.1/arena_fullstack_app`,
  {
    logging: false,
  },
)

// console.log(process.env.POSTGRES_HOST)
const Test = PostgresSequelize.define('test', { name: DataTypes.STRING, age: DataTypes.INTEGER })
// const Task = PostgresSequelize.define('task', { name: DataTypes.STRING }, { timestamps: false })
// const Tool = PostgresSequelize.define(
//   'tools',
//   {
//     name: DataTypes.STRING,
//     size: DataTypes.STRING,
//   },
//   { timestamps: false },
// )
// User1.hasMany(Task)
// Task.belongsTo(User1)
// User1.hasMany(Tool, { as: 'Instruments' })

// const tasks = await Task.findAll({ include: User1 })
// console.log(JSON.stringify(tasks, null, 2))

// User1.sync()
// Task.sync()
// Tool.sync()
Test.sync()
