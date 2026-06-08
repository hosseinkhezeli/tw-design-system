import { CameraService, PickImageResult } from './camera.types';

export class WebCameraService implements CameraService {
  private createFileInput(options: { multiple?: boolean; capture?: boolean }) {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';

    if (options.multiple) {
      input.multiple = true;
    }

    if (options.capture) {
      input.capture = 'environment';
    }

    return input;
  }

  private mapFiles(files: FileList): PickImageResult[] {
    return Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
  }

  async pickImage(): Promise<PickImageResult | null> {
    return new Promise((resolve) => {
      const input = this.createFileInput({});

      input.onchange = () => {
        const file = input.files?.[0];

        if (!file) {
          resolve(null);
          return;
        }

        resolve({
          file,
          previewUrl: URL.createObjectURL(file),
        });
      };

      input.click();
    });
  }

  async pickImages(maxCount?: number): Promise<PickImageResult[]> {
    return new Promise((resolve) => {
      const input = this.createFileInput({
        multiple: true,
      });

      input.onchange = () => {
        const files = input.files;

        if (!files?.length) {
          resolve([]);
          return;
        }

        const results = this.mapFiles(files);

        resolve(maxCount ? results.slice(0, maxCount) : results);
      };

      input.click();
    });
  }

  async takePhoto(): Promise<PickImageResult | null> {
    return new Promise((resolve) => {
      const input = this.createFileInput({
        capture: true,
      });

      input.onchange = () => {
        const file = input.files?.[0];

        if (!file) {
          resolve(null);
          return;
        }

        resolve({
          file,
          previewUrl: URL.createObjectURL(file),
        });
      };

      input.click();
    });
  }
}
