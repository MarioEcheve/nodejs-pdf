var AWS = require("aws-sdk");

module.exports.crearFolderAWS = (key) => {
    AWS.config.update({
        accessKeyId: "AKIAWUHFQWCG56GZBUHU",
        secretAccessKey: "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"
    });
    s3 = new AWS.S3();
    var bucketParams = {
        Bucket: "lodigital-s3",
        ACL: "public-read",
        Key: `empresas/${key}/`,
        Body: ''
    };
    return s3.upload(bucketParams, function(err, data) {
        if(err){
          return err;
        }else{
          return data.Location;
        }
    });
};

module.exports.guardarArchivo = (key, archivo) => {
    AWS.config.update({
        accessKeyId: "AKIAWUHFQWCG56GZBUHU",
        secretAccessKey: "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"
    });
    s3 = new AWS.S3();
    var bucketParams = {
        Bucket: "lodigital-s3",
        ACL: "public-read",
        Key: `empresas/${key}`,
        Body: archivo
    };
    return s3.upload(bucketParams, function(err, data) {
        if(err){
          return err;
        }else{
          return data.Location;
        }
    });
};
