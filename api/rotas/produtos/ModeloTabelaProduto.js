const Sequelize = require('sequelize')
const instancia = require('../../bd')

const colunas = {
     produto: {
          type: Sequelize.STRING,
          allowNull: false
     },
     loja: {
          type: Sequelize.STRING,
          allowNull: false
     },
     valor: {
          type: Sequelize.STRING,
          allowNull: false
     },
     descricao: {
          type: Sequelize.STRING,
          allowNull: false
     },
     categoria: {
          type: Sequelize.ENUM('Comida', 'artesanato', 'vestuário', 'serviço doméstico'),
          allowNull: false
     }
}
const opcoes = {
     freezeTableName: true,
     tableName: 'produtos',
     timestamps: true,
     createdAt: 'dataCriacao',
     updatedAt: 'dataAtualizacao',
     version: 'versao'
}
module.exports = instancia.define('produtos', colunas, opcoes)