import multer from 'multer'

module.exports = (multer({
   storage: multer.diskStorage({
       destination: (req, file, cb) => {
           cb(null, appRoot+'/uploads');
       },
       filename: (req, file, cb) => {
           cb(null, Date.now().toString() + '-' + file.originalname);
       }
   }), // FIM DA CONFIGURAÇÃO DE ARMAZENAMENTO

   fileFilter: (req, file, cb) => {
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( format => format == file.mimetype );
        if(isAccepted){
            return cb(null, true);
        }
        return cb(null, false);
    }
}));

