import { Injectable } from '@nestjs/common';
import { imageUpload } from 'src/lib/myHelper';

@Injectable()
export class FileuploadService {
  async uploadImg(image: Express.Multer.File) {
    const url = await imageUpload(image, 'image/book-pf');
    console.log(url);
    return { imgUrl: url };
  }
}
