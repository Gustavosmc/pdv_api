
var helper = require('sendgrid').mail;
var sg = require('sendgrid')("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")
 
//var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

export function sendRecoverEmail(email, user, url, handleResponse=undefined){
    const fromEmail = new helper.Email('epmind@hotmail.com');
    const toEmail = new helper.Email(email)
    const subject = 'Recuperação de Senha'
    const content = new helper.Content('text/plain', `Crie uma nova senha para o usuário ${user} em : ${url}`)
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);
    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });
    sg.API(request, function (error, response) {
        if (error) {
            if(handleResponse){
                handleResponse(false)
            }
        }
        if(handleResponse){
            handleResponse(true)
        }
    });

}
