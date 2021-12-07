const ModeloTabela = require('../rotas/produtos/ModeloTabelaProduto')

ModeloTabela
     .sync()
     .then(() => console.log('Tabela de produtos criada com sucesso'))
     .catch(console.log)