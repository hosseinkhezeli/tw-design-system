import { uploadFile } from './upload.api';
import { fileService } from '@/shared/services/device/file/file.service';

class UploadService {
  async uploadImage(file: File) {
    const formData = fileService.toFormData(file);

    const result = await uploadFile(formData);

    return {
      url: result.url,
      key: result.key,
    };
  }

  async uploadMultiple(files: File[]) {
    const uploads = files.map((file) => this.uploadImage(file));

    return Promise.all(uploads);
  }
}

export const uploadService = new UploadService();
