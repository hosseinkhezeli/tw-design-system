export type PickImageResult = {
  file: File;
  previewUrl: string;
};

export interface CameraService {
  pickImage(): Promise<PickImageResult | null>;

  pickImages(maxCount?: number): Promise<PickImageResult[]>;

  takePhoto(): Promise<PickImageResult | null>;
}
