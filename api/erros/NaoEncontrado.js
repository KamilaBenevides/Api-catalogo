class NaoEncontrado extends Error {
     constructor(campo) {
          const mensagem = `${campo} não encontrada!`
          super(mensagem)
          this.name = 'NaoEncontrado'
          this.idErro = 0
     }
}
module.exports = NaoEncontrado