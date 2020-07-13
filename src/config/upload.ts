import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpDiretory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  diretory: tmpDiretory,
  storage: multer.diskStorage({
    destination: tmpDiretory,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname} `;

      return callback(null, filename);
    },
  }),
};
