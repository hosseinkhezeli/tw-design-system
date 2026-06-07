export type UploadResult = {
  url: string;
  key?: string;
};

export type UploadProgress = {
  loaded: number;
  total: number;
  percent: number;
};
