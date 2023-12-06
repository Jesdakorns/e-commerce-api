import { ResponseModel } from '../response/response-model';
export declare class UploadService {
    uploadImage(image: any): ResponseModel<any>;
    uploadImages(images: any): Promise<ResponseModel<any[]>>;
    resizeImage({ file, size }: {
        file: any;
        size?: number;
    }): Promise<void>;
}
