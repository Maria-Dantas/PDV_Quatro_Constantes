const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const excluirImagem = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: path
    }).promise()
}
const uploadImagem = async(path, buffer, mimetype)=>{
    
  
    
    const imagem = await s3.upload({
        Bucket: process.env.BUCKET,
        Key:path,
        Body:buffer,
        ContentType:mimetype
    }).promise()
    return {
        path:imagem.Key,
        url:`https://${process.env.BUCKET}.${process.env.ENDPOINT_S3}.${imagem.Key}`
        
    }


}
const listarIMG = async(id)=>{
    const img = await s3.listObjects({
        Bucket: process.env.BUCKET,
        Prefix: `produtos/${id}`

    }).promise()
    return imagem.Contents;
}





module.exports = {
     uploadImagem,
    excluirImagem,
    listarIMG,
    s3
}