import { parseAsString, parseAsStringEnum } from 'nuqs';
import { CREATE_POST_STEPS } from '../constants/post.constants';
import { QUERY_PARAM_KEYS } from '@/shared/config/query-param-keys';

export const postSearchParams = {
  [QUERY_PARAM_KEYS.new_content_sheet]: parseAsString,
  [QUERY_PARAM_KEYS.new_content_step]: parseAsStringEnum(
    Object.values(CREATE_POST_STEPS),
  ),
};
