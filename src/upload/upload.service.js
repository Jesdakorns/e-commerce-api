"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const fs_1 = require("fs");
const response_model_1 = require("../response/response-model");
let UploadService = exports.UploadService = class UploadService {
    uploadImage(image) {
        this.resizeImage({ file: image });
        return new response_model_1.ResponseModel({
            data: { ...image, path: image.path.replaceAll('\\', '/') },
        });
    }
    async uploadImages(images) {
        console.log(`🚀 ~ file: upload.service.ts ~ line 18 ~ UploadService ~ uploadImages ~ images`, images);
        const files = await Promise.all(images.map(async (file) => {
            this.resizeImage({ file });
            return { ...file, path: file.path.replaceAll('\\', '/') };
        }));
        console.log(`🚀 ~ file: upload.service.ts ~ line 24 ~ UploadService ~ uploadImages ~ files`, files);
        return new response_model_1.ResponseModel({
            data: files,
        });
    }
    async resizeImage({ file, size }) {
        const resizedPath = `./public/image/${file.filename.replace(/\..+$/, file.mimetype === 'image/jpeg' ? '.png' : '.jpg')}`;
        await sharp(file.path)
            .resize({
            width: size ?? 500,
        })
            .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .toFile(resizedPath);
        await fs_1.promises.unlink(file.path);
        await fs_1.promises.rename(resizedPath, file.path);
    }
};
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map