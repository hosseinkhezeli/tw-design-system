import { formatCaption } from '../../lib/format-caption';

export const PostCaption = ({ caption }: { readonly caption?: string }) => {
  if (!caption) return null;
  return (
    <p className='text-sm leading-relaxed mt-2'>{formatCaption(caption)}</p>
  );
};
