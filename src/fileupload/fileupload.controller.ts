import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileuploadService } from './fileupload.service';

@Controller('dashboard')
export class FileuploadController {
  constructor(private readonly fileUploadService: FileuploadService) {}

  @Post('img-upload')
  @UseInterceptors(
    FileInterceptor('image', {
      // Set the file size limit to 15MB
      limits: { fileSize: 15 * 1024 * 1024 },
      // Define a file filter to check the MIME type
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, and PNG files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  imageUpload(@UploadedFile() image: Express.Multer.File) {
    return this.fileUploadService.uploadImg(image);
  }
}
