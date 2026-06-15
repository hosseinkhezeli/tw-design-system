export const formatCaption = (caption?: string): string => {
  if (!caption?.trim()) return '';
  return caption.length > 150 ? `${caption.substring(0, 147)}...` : caption;
};
