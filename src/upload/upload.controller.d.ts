import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(image: any): import("../response/response-model").ResponseModel<any>;
    uploadImages(images: any): Promise<import("../response/response-model").ResponseModel<any[]>>;
}
