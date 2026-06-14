import { IconCamera, IconPhoto } from '@tabler/icons-react';
import { ContentSource } from '../types/source.types';

export const sourceOptions = [
  {
    id: 'camera' as ContentSource,
    label: 'دوربین',
    icon: <IconCamera className='size-6' />,
  },
  {
    id: 'gallery' as ContentSource,
    label: 'گالری',
    icon: <IconPhoto className='size-6' />,
  },
];
