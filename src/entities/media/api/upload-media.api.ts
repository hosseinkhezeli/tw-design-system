import { UploadMediaDto } from '../schemas/media.schema';
import { MediaApi } from './media.api';

export const uploadMedia = async (dto: UploadMediaDto) => {
  return MediaApi.upload(dto);
};
