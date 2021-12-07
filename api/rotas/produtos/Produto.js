const TabelaProduto = require('./TabelaProduto')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Produto {
     constructor({id, produto, valor, descricao, loja, categoria, dataCriacao, dataAtualizacao, versao}) {
          this.id = id, 
          this.produto = produto,
          this.valor = valor, 
          this.descricao = descricao, 
          this.loja = loja,
          this.categoria = categoria, 
          this.dataCriacao = dataCriacao, 
          this.dataAtualizacao = dataAtualizacao, 
          this.versao = versao
     }
     async criar() {
          this.validar()
          const result = await TabelaProduto.inserir({
               produto: this.produto,
               loja: this.loja,
               valor: this.valor,
               descricao: this.descricao,
               categoria: this.categoria
          })
          this.id = result.id,
          this.dataCriacao = result.dataCriacao,
          this.dataAtualizacao = result.dataAtualizacao,
          this.versao = result.versao
     }
     async carregar(){
          const encontrado = await TabelaProduto.buscarPorId(this.id)
          this.produto = encontrado.produto
          this.loja = encontrado.loja
          this.valor = encontrado.valor
          this.descricao = encontrado.descricao
          this.Categoria = encontrado.Categoria
     }
     async atualizar() {
          await TabelaProduto.buscarPorId(this.id)
          const campos = ['produto', 'loja', 'valor', 'descricao','Categoria']
          const dadosParaAtualizar = {}
          campos.forEach((campo) => {
               const valor = this[campo]
               if(typeof valor === 'string' && valor.length > 0) {
                    dadosParaAtualizar[campo] = valor
               }
          })
          if(Object.keys(dadosParaAtualizar).length === 0) {
               throw new DadosNaoFornecidos()
          }
          await TabelaProduto.atualizar(this.id, dadosParaAtualizar)
     }
     remover() {
          return TabelaProduto.remover(this.id)
     }
     validar() {
          const campos = [ 
          'produto', 'loja', 'valor', 'descricao', 'categoria'
          ]
          campos.forEach(campo => {
               const valor = this[campo]
               if(typeof valor !== 'string' || valor.length === 0){
                    throw new CampoInvalido(campo)
               }
          })
     }
}
module.exports = Produto