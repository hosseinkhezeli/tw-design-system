export type CameraFacingMode = 'user' | 'environment';

export type PickImageOptions = {
  accept?: string;
};

export type PickImagesOptions = {
  accept?: string;
  maxCount?: number;
};

export type CameraStartOptions = {
  facingMode?: CameraFacingMode;
  width?: number;
  height?: number;
  audio?: boolean;
};

export interface CameraService {
  pickImage(options?: PickImageOptions): Promise<File | null>;
  pickImages(options?: PickImagesOptions): Promise<File[]>;
  startCamera(options?: CameraStartOptions): Promise<MediaStream>;
}
