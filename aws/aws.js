var aws = require("aws-sdk");

module.exports.crearFolderAWS = (key) => {
    aws.config.update({
        accessKeyId: "AKIAWUHFQWCGWEYYDY5G",
        secretAccessKey: "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"
    });
    s3 = new aws.S3();
    let bucketParams = {
        Bucket: "lodigital-s3",
        ACL: "public-read",
        Key: `empresas/${key}/`,
        Body: ''
    };
    return s3.upload(bucketParams).promise();
};



module.exports.guardarArchivo = (nombreCarpeta, nombreArchivo, buffer) => {
    aws.config.update({
        accessKeyId: "AKIAWUHFQWCGWEYYDY5G",
        secretAccessKey: "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"
    });
    s3 = new aws.S3();
    let bucketParams = {
        Bucket: "lodigital-s3",
        ACL: "public-read",
        Key: `empresas/${nombreCarpeta}/${nombreArchivo}`,
        Body: Buffer.from(buffer, 'base64'),
        ContentType: 'application/pdf'
    };
    return s3.upload(bucketParams).promise();
};

module.exports.eliminarFolderAWS = async (key)=>{
    aws.config.update({
        accessKeyId: "AKIAWUHFQWCGWEYYDY5G",
        secretAccessKey: "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"
    });
    var params = {
      Bucket: "lodigital-s3",
      Prefix: `empresas/${key}/`
     
    };
    s3 = new aws.S3();
    let keys = [];
    let data = await s3.listObjects(params).promise();
    let objetos = data.Contents;

    if(objetos.length > 0){
        for await (let element of objetos){
            keys = [...keys, {Key: element.Key}];
        }
        var params2 = {
            Bucket: "lodigital-s3",
            Delete: { Objects: keys }
        };
        let response = await s3.deleteObjects(params2).promise()
        return response;
    }else{
        return null;
    }
}