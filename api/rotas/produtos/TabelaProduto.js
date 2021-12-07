const Modelo = require('./ModeloTabelaProduto')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
     listar() {
          return Modelo.findAll({ raw: true })
     },
     inserir(produto) {
          return Modelo.create(produto)
     },
     async buscarPorId(id){
          const encontrado = await Modelo.findOne({
               where: {
                    id:id
               }
          })
          if(!encontrado)
               throw new NaoEncontrado('produto')
          return encontrado
     },
     atualizar(id, dadosParaAtualizar) {
          return Modelo.update(
               dadosParaAtualizar,
               {
                    where: { id:id }
               }
          )
     },
     remover(id) {
          return Modelo.destroy({
               where: { id:id }
          })
     }
}