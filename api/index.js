const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json())

app.use((req, res, prox) => {
     let formatosRequisitado = req.header('Accept')
     if(formatosRequisitado === '*/*') {
          formatosRequisitado = 'application/json'
     }

     if(formatosAceitos.indexOf(formatosRequisitado) === -1) {
          res.status(406)
          res.end()
          return
     }
     res.setHeader('Content-Type', formatosRequisitado)
     prox()
})

const roteador = require('./rotas/loja')
app.use('/api/lojas/', roteador)

const roteador2 = require('./rotas/produtos')
app.use('/api/produtos/', roteador2)

app.use((erro, req, res, prox) => {
     let status = 500
     if(erro instanceof NaoEncontrado) {
          status = 404
     }
     if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
          status = 400
     }
     if(erro instanceof ValorNaoSuportado) {
          status = 406
     }
     const serializador = new SerializadorErro( res.getHeader('Content-Type') )
     res.status(status)
     res.send(
          serializador.serializar({
               mensagem: erro.message,
               id: erro.idErro
          })
     )
})


app.listen(config.get('api.porta'), () => console.log('A API está funcionando na porta 3000'))