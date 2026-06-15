import { IconCamera, IconPhoto } from '@tabler/icons-react';
import { POST_SOURCE } from '../constants/post.constants';

export const postSourceOptions = [
  {
    id: POST_SOURCE.CAMERA,
    label: 'دوربین',
    icon: <IconCamera className='size-6' />,
  },
  {
    id: POST_SOURCE.GALLERY,
    label: 'گالری',
    icon: <IconPhoto className='size-6' />,
  },
];
