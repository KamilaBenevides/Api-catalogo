const TabelaLoja = require('./TabelaLoja')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Loja {
     constructor({id, loja, vendedora, Contato, localizacao, instagram, facebook, email, categoria, dataCriacao, dataAtualizacao, versao}) {
          this.id = id, 
          this.loja = loja, 
          this.vendedora = vendedora,
          this.Contato = Contato,
          this.localizacao = localizacao,
          this.instagram = instagram,
          this.facebook = facebook,
          this.email = email,
          this.categoria = categoria, 
          this.dataCriacao = dataCriacao, 
          this.dataAtualizacao = dataAtualizacao, 
          this.versao = versao
     }
     async criar() {
          this.validar()
          const result = await TabelaLoja.inserir({
               loja: this.loja,
               vendedora: this.vendedora,
               Contato: this.Contato,
               localizacao: this.localizacao,
               instagram: this.instagram,
               facebook: this.facebook,
               email: this.email,
               categoria: this.categoria
          })
          this.id = result.id,
          this.dataCriacao = result.dataCriacao,
          this.dataAtualizacao = result.dataAtualizacao,
          this.versao = result.versao
     }
     async carregar(){
          const encontrado = await TabelaLoja.buscarPorId(this.id)
          this.loja = encontrado.loja
          this.vendedora = encontrado.vendedora
          this.Contato = encontrado.Contato
          this.localizacao = encontrado.localizacao
          this.instagram = encontrado.instagram
          this.facebook = encontrado.facebook
          this.Categoria = encontrado.Categoria
     }
     async atualizar() {
          await TabelaLoja.buscarPorId(this.id)
          const campos = ['loja', 'vendedora', 'Contato', 'localizacao', 'instagram', 'facebook', 'Categoria']
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
          await TabelaLoja.atualizar(this.id, dadosParaAtualizar)
     }
     remover() {
          return TabelaLoja.remover(this.id)
     }
     validar() {
          const campos = [ 
          'loja', 'email', 'vendedora', 'Contato', 'localizacao', 'instagram', 'facebook', 'categoria'
          ]
          campos.forEach(campo => {
               const valor = this[campo]
               if(typeof valor !== 'string' || valor.length === 0){
                    throw new CampoInvalido(campo)
               }
          })
     }
}
module.exports = Loja