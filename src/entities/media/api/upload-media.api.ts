import { UploadMediaDto, UploadMediaOptions } from '../schemas/media.schema';
import { MediaApi } from './media.api';

export const uploadMedia = async (dto: UploadMediaDto & UploadMediaOptions) => {
  return MediaApi.upload(dto);
};
