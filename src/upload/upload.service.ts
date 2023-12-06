import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { ResponseModel } from 'response/response-model';

@Injectable()
export class UploadService {
  uploadImage(image) {
    this.resizeImage({ file: image });
    return new ResponseModel({
      data: { ...image, path: image.path.replaceAll('\\', '/') },
    });
  }

  async uploadImages(images) {
    console.log(
      `🚀 ~ file: upload.service.ts ~ line 18 ~ UploadService ~ uploadImages ~ images`,
      images,
    );
    const files = await Promise.all(
      images.map(async (file) => {
        this.resizeImage({ file });
        return { ...file, path: file.path.replaceAll('\\', '/') };
      }),
    );
    console.log(
      `🚀 ~ file: upload.service.ts ~ line 24 ~ UploadService ~ uploadImages ~ files`,
      files,
    );

    return new ResponseModel({
      data: files,
    });
  }

  async resizeImage({ file, size }: { file: any; size?: number }) {
    const resizedPath = `./public/image/${file.filename.replace(
      /\..+$/,
      file.mimetype === 'image/jpeg' ? '.png' : '.jpg',
    )}`;
    await sharp(file.path)
      .resize({
        width: size ?? 500,
      })
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(resizedPath);

    await fsPromises.unlink(file.path);
    await fsPromises.rename(resizedPath, file.path);
  }
}
