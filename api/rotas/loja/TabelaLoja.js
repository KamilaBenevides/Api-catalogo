const Modelo = require('./ModeloTabelaLoja')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
     listar() {
          return Modelo.findAll({ raw: true })
     },
     inserir(loja) {
          return Modelo.create(loja)
     },
     async buscarPorId(id){
          const encontrado = await Modelo.findOne({
               where: {
                    id:id
               }
          })
          if(!encontrado)
               throw new NaoEncontrado('loja')
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