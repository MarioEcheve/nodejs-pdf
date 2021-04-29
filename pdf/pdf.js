const html_to_pdf = require('html-pdf-node');
const aws = require('../aws/aws.js');

module.exports.crearPdf = async (request) => {
    let respuesta;
    let file = { content: request.body.html };
    /* let config = {
    "quality": "100",           
    "format": "Letter", 
    paginationOffset: 1,       
    "header": {
      "height": "8mm",
    },
    "footer": {
      "height": "15mm",
      "contents": {
        default: '<div style="border-top: 1px solid #aaa; margin-left: 15px; margin-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; padding-top: 5px; line-height: 13px;">Código Verificación: WWJMLLKPI02<span style="float: right;">Página: {{page}} de {{pages}}</span><br/>Para verificar la validez del folio dirigirse a <a>http://www.lodigital.cl/verificacion</a></div>'
      }
    },
  }
  const pdf = require('html-pdf');
  pdf.create(request.body.html,config).toBuffer(function (error, buffer){
    return response.send(JSON.stringify(buffer.toString('base64'), null, 4));
  }); */

    let options = {
        format: 'Letter',
        printBackground: true,
        displayHeaderFooter: true,
        footerTemplate: `<div style="width: 100%; border-top: 1px solid #aaa; margin-left: 15px; margin-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 8px; padding-top: 5px; line-height: 9px;">Código Verificación: ${request.body.codigoVerificacion}<span style="float: right;">Página: <a class="pageNumber"></a> de <a class="totalPages"></a></span><br/>Verifique la validez de este documento en: <a>http://www.lodigital.cl/verificacion</a></div>`,
        headerTemplate: '<div></div>',
        margin: {
            top: '10mm',
            right: '20px',
            bottom: '20mm',
            left: '15px'
        },
    };
    await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
      respuesta = JSON.stringify(pdfBuffer.toString('base64'), null, 4);
    });
    return respuesta;
};
