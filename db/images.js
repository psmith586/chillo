//image storage configuration

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: 'dlCVfwirMf2WGdilUS/Px72vXkWE48yqeagg5bGU',
  accessKeyId: 'AKIAIDR4RAXH2KGVGVDA',
  region: 'us-west-1'
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null, true);
  }else{
    cb(new Error('File type not supported'), false);
  }
};
 
const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'chillo-photos',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    filename: function (req, file, cb) {
      cb(null, new Date.toISOString() + '-' + file.originalname)
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
 
module.exports = upload;