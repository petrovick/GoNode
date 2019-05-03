const Mail = require('../services/mail')

class PurchaseMail {
  get key() {
    return 'PurchaseMail'
  }

  async handle(jobs, done) {
    const { ad, user, content } = jobs.data
    
    await Mail.sendMail({
      from: '"Gabriel Petrovick" <petrovickg@hotmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad: ad }
    })

    return done()
  }

}

module.exports = new PurchaseMail()