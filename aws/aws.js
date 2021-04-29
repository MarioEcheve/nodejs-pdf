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
