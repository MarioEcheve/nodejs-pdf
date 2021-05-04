
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const aws = require('./aws/aws.js');
const pdf = require('./pdf/pdf.js');

const app = express();
const PORT = process.env.PORT || 8001;

app.set('view engine', 'pug');
app.use(bodyParser.json({ limit: '200MB' }));
app.use(cors());

app.post('/htmlToPdf', async function (request, response) {
  let respuesta = await pdf.crearPdf(request);
  if(respuesta){
    response.send(respuesta);
  }
});

app.post('/crearCarpetaEmpresa', async function (request, response) {
  let respuesta = aws.crearFolderAWS(request.body.nombreCarpeta);
  if(respuesta){
    return response.send(JSON.stringify("carpeta creada correctamente"));
  }else{
    return response.send(JSON.stringify("Error al crear la carpeta"));
  }
});

app.post('/guardarArchivo', async function (request, response) {
  let nombreCarpeta = request.body.folio.nombreCarpetaAws;
  let nombreArchivo = request.body.folio.correlativo+"-"+request.body.folio.asunto+"-"+request.body.folio.libro.contrato.nombre;
  let respuesta = await aws.guardarArchivo(nombreCarpeta, nombreArchivo, request.body.pdf);
  if(respuesta){
    return response.send(JSON.stringify(respuesta));
  }else{
    return response.send(JSON.stringify(respuesta));
  }
}); 

app.post('/eliminarCarpetaConArchivos', async function (request, response){
  key = request.body.nombreCarpeta;
  console.log(key)
  let respuesta = await aws.eliminarFolderAWS(key);
  if(respuesta){
    return response.send(JSON.stringify("carpeta eliminada correctamente"));
  }else{
    return response.send(JSON.stringify("Error al eliminar la carpeta"));
  }
});

app.post('/buscarArchivoAws', async function (request, response){
  console.log(request)
  let respuesta = await aws.buscarPdfBase64(request.body.key);
  return response.send(JSON.stringify(respuesta));
  /* key = request.body.nombreCarpeta;
  console.log(key)
  let respuesta = await aws.eliminarFolderAWS(key);
  if(respuesta){
    return response.send(JSON.stringify("carpeta eliminada correctamente"));
  }else{
    return response.send(JSON.stringify("Error al eliminar la carpeta"));
  } */
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;