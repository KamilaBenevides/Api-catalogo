const roteador = require('express').Router()
const TabelaLoja = require('./TabelaLoja')
const Loja = require('./Loja')
const SerializadorLoja = require('../../Serializador').SerializadorLoja

roteador.get('/', async (req, res) => {
     const resultados = await TabelaLoja.listar()
     res.status(200)
     const serializador = new SerializadorLoja(
          res.getHeader('Content-Type')
     )
     res.send(
          serializador.serializar(resultados)
     )
})

roteador.post('/', async (req, res, prox) => {
     try{
          const dadosRecebidos = req.body
          const loja = new Loja(dadosRecebidos)
          console.log(dadosRecebidos)
          await loja.criar()
          res.status(201)
          const serializador = new SerializadorLoja(
               res.getHeader('Content-Type')
          )
          res.send(
               serializador.serializar(loja)
          )
     } catch(erro) {
          console.log(erro)
          prox(erro)
     }
     
})
roteador.get('/:idloja', async (req, res, prox) => {
     try{
          const id = req.params.idloja
          const loja = new Loja({ id:id })
          await loja.carregar()
          res.status(200)
          const serializador = new SerializadorLoja(
               res.getHeader('content-Type'),
               ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
          )
          res.send(
               serializador.serializar(loja)
          )
     } catch(erro) {
          prox(erro)
     }
     
})
roteador.put('/:idloja', async (req, res, prox) => {
     try{
          const id = req.params.idloja
          const dadosRecebidos = req.body
          const dados = Object.assign({}, dadosRecebidos, {id: id})
          const loja = new Loja(dados)
          await loja.atualizar()
          res.status(204)
          res.end()
     } catch(erro) {
          prox(erro)
     }
     
})
roteador.delete('/:idloja', async (req, res, prox) => {
     try{
          const id = req.params.idloja
          const loja = new Loja({id: id})
          await loja.carregar()
          await loja.remover()
          res.status(204)
          res.end()
     } catch(erro) {
          prox(erro)
     }
     
})
module.exports = roteador