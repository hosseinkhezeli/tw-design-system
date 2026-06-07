class FileService {
  toFormData(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return formData;
  }
}

export const fileService = new FileService();
