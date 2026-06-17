import { IconCamera, IconPhoto } from '@tabler/icons-react';
import { MEDIA_SOURCE } from '../constants/media-selection.constants';

export const mediaSourceOptions = [
  {
    id: MEDIA_SOURCE.CAMERA,
    label: 'دوربین',
    icon: <IconCamera className='size-6' />,
  },
  {
    id: MEDIA_SOURCE.GALLERY,
    label: 'گالری',
    icon: <IconPhoto className='size-6' />,
  },
];
