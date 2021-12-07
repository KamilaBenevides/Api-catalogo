const roteador = require('express').Router()
const TabelaProduto = require('./TabelaProduto')
const Produto = require('./Produto')
const SerializadorProduto = require('../../Serializador').SerializadorProduto

roteador.get('/', async (req, res) => {
     const resultados = await TabelaProduto.listar()
     res.status(200)
     const serializador = new SerializadorProduto(
          res.getHeader('Content-Type')
     )
     res.send(
          serializador.serializar(resultados)
     )
})

roteador.post('/', async (req, res, prox) => {
     try{
          const dadosRecebidos = req.body
          const produto = new Produto(dadosRecebidos)
          await produto.criar()
          res.status(201)
          const serializador = new SerializadorProduto(
               res.getHeader('Content-Type')
          )
          res.send(
               serializador.serializar(produto)
          )
     } catch(erro) {
          prox(erro)
     }
     
})
roteador.get('/:idproduto', async (req, res, prox) => {
     try{
          const id = req.params.idproduto
          const produto = new Produto({ id:id })
          await produto.carregar()
          res.status(200)
          const serializador = new SerializadorProduto(
               res.getHeader('content-Type'),
               ['dataCriacao', 'dataAtualizacao', 'versao']
          )
          res.send(
               serializador.serializar(produto)
          )
     } catch(erro) {
          prox(erro)
     }
     
})
roteador.put('/:idproduto', async (req, res, prox) => {
     try{
          const id = req.params.idproduto
          const dadosRecebidos = req.body
          const dados = Object.assign({}, dadosRecebidos, {id: id})
          const produto = new Produto(dados)
          await produto.atualizar()
          res.status(204)
          res.end()
     } catch(erro) {
          prox(erro)
     }
     
})
roteador.delete('/:idproduto', async (req, res, prox) => {
     try{
          const id = req.params.idproduto
          const produto = new Produto({id: id})
          await produto.carregar()
          await produto.remover()
          res.status(204)
          res.end()
     } catch(erro) {
          prox(erro)
     }
     
})
module.exports = roteador