import {
  CameraService,
  CameraStartOptions,
  PickImageOptions,
  PickImagesOptions,
} from './camera.types';

const DEFAULT_ACCEPT = 'image/*';

export class WebCameraService implements CameraService {
  private assertBrowser(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      throw new Error('Camera service can only be used in the browser.');
    }
  }

  private createFileInput(options: {
    multiple?: boolean;
    capture?: boolean;
    accept?: string;
  }): HTMLInputElement {
    this.assertBrowser();

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = options.accept ?? DEFAULT_ACCEPT;
    input.multiple = Boolean(options.multiple);
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.style.top = '0';
    input.style.width = '1px';
    input.style.height = '1px';
    input.style.opacity = '0';
    input.style.pointerEvents = 'none';
    input.tabIndex = -1;

    if (options.capture && !options.multiple) {
      input.setAttribute('capture', 'environment');
    }

    return input;
  }

  private openFilePicker(options: {
    multiple?: boolean;
    capture?: boolean;
    accept?: string;
  }): Promise<FileList> {
    this.assertBrowser();

    return new Promise((resolve) => {
      const input = this.createFileInput(options);
      const emptyFiles = new DataTransfer().files;
      let settled = false;

      const cleanup = () => {
        window.removeEventListener('focus', onWindowFocus);
        input.remove();
      };

      const finish = (files: FileList) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(files);
      };

      const onChange = () => {
        finish(input.files ?? emptyFiles);
      };

      const onWindowFocus = () => {
        window.setTimeout(() => {
          finish(input.files ?? emptyFiles);
        }, 0);
      };

      input.addEventListener('change', onChange, { once: true });
      window.addEventListener('focus', onWindowFocus, { once: true });

      document.body.appendChild(input);
      input.click();
    });
  }

  async pickImage(options: PickImageOptions = {}): Promise<File | null> {
    const files = await this.openFilePicker({
      multiple: false,
      accept: options.accept ?? DEFAULT_ACCEPT,
      capture: false,
    });

    return files[0] ?? null;
  }

  async pickImages(options: PickImagesOptions = {}): Promise<File[]> {
    const files = await this.openFilePicker({
      multiple: true,
      accept: options.accept ?? DEFAULT_ACCEPT,
      capture: false,
    });

    const results = Array.from(files);
    return typeof options.maxCount === 'number'
      ? results.slice(0, options.maxCount)
      : results;
  }

  async startCamera(options: CameraStartOptions = {}): Promise<MediaStream> {
    this.assertBrowser();

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Camera API is not supported in this browser.');
    }

    return navigator.mediaDevices.getUserMedia({
      audio: options.audio ?? false,
      video: {
        facingMode: { ideal: options.facingMode ?? 'environment' },
        width: options.width ? { ideal: options.width } : undefined,
        height: options.height ? { ideal: options.height } : undefined,
      },
    });
  }
}

export const webCameraService = new WebCameraService();
