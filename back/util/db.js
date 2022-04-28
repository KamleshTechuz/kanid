const Sequelize = require('sequelize')

const sequelize = new Sequelize('test4', 'kamlesh', 'Kam_7718', {
    dialect : 'mysql',
    host : 'localhost'
})

module.exports = sequelize;