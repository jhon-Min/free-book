import * as fs from 'fs';
import * as path from 'path';
import { firebaseAdmin } from './firebase';

async function imageUpload(file: any, uploadDir: string): Promise<string> {
  const filename = `${Date.now()}-${file.originalname}`;
  const filepath = path.join(uploadDir, filename);

  // Ensure the upload directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Save the file
  fs.writeFileSync(filepath, file.buffer);

  const url = process.env.APP_URL + filepath;
  return url;
}

function deleteImage(url) {
  const relativePath = url.replace(process.env.APP_URL, '');
  const imgPath = path.join(__dirname, `../../`, relativePath);
  if (fs.existsSync(imgPath)) {
    fs.unlinkSync(imgPath);
    console.log('deleted!');
  }
  return true;
}

async function firebaseVerifyToken(idToken: string) {
  return await firebaseAdmin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      const firebaseUser = firebaseAdmin.auth().getUser(uid);
      return firebaseUser;
    })
    .catch((error) => {
      console.log(error);
      // throw new UnauthorizedException('Unauthorized access');
    });
}

export { imageUpload, deleteImage, firebaseVerifyToken };
