import { Injectable } from '@nestjs/common';
import { imageUpload } from 'src/lib/myHelper';

@Injectable()
export class FileuploadService {
  async uploadImg(image: Express.Multer.File, pathName = 'image/book-pf') {
    const url = await imageUpload(image, pathName);
    console.log(url);
    return { imgUrl: url };
  }
}
