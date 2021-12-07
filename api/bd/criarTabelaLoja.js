const ModeloTabela = require('../rotas/loja/ModeloTabelaLoja')

ModeloTabela
     .sync()
     .then(() => console.log('Tabela de loja criada com sucesso'))
     .catch(console.log)