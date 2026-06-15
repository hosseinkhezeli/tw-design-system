import { MEDIA_TYPE } from "../constants/media.constants";

export type MediaType = (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE];