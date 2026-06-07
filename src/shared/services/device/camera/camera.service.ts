export type PickImageResult = {
  file: File;
  previewUrl: string;
};

class CameraService {
  async pickImage(): Promise<PickImageResult | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');

      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';

      input.onchange = () => {
        const file = input.files?.[0];

        if (!file) {
          resolve(null);
          return;
        }

        const previewUrl = URL.createObjectURL(file);

        resolve({
          file,
          previewUrl,
        });
      };

      input.click();
    });
  }
}

export const camera = new CameraService();
