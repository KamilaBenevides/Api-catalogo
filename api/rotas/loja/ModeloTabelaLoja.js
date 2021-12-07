const Sequelize = require('sequelize')
const instancia = require('../../bd')

const colunas = {
     loja: {
          type: Sequelize.STRING,
          allowNull: false
     },
     vendedora: {
          type: Sequelize.STRING,
          allowNull: false
     },
     Contato: {
          type: Sequelize.STRING,
          allowNull: false
     },
     localizacao: {
          type: Sequelize.STRING,
          allowNull: false
     },
     instagram: {
          type: Sequelize.STRING,
          allowNull: true
     },
     facebook: {
          type: Sequelize.STRING,
          allowNull: true
     },
     email: {
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
     tableName: 'loja',
     timestamps: true,
     createdAt: 'dataCriacao',
     updatedAt: 'dataAtualizacao',
     version: 'versao'
}
module.exports = instancia.define('loja', colunas, opcoes)