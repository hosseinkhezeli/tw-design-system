import { Slot } from '@radix-ui/react-slot';
import { Typography } from '../ui/typography/typography';
import { TextProps } from './text.types';
import { textVariants } from './variants';
import { cn } from '@/shared/utils/cn';

export function Text({
  title,
  text,
  semicolon = true,
  classNames,
  size = 'default',
  titleAsChild = false,
  textAsChild = false,
}: TextProps) {
  const { title: titleVariant, text: textVariant } = textVariants[size];

  const Title = titleAsChild ? Slot : Typography;
  const Content = textAsChild ? Slot : Typography;

  return (
    <section className={cn(classNames?.container, 'flex gap-1')}>
      {title && (
        <Title
          className={classNames?.title}
          {...(!titleAsChild && {
            as: 'h6',
            variant: titleVariant,
          })}
        >
          {title}
          {!titleAsChild && semicolon && ':'}
        </Title>
      )}

      {text && (
        <Content
          className={classNames?.text}
          {...(!textAsChild && {
            as: 'p',
            variant: textVariant,
          })}
        >
          {text}
        </Content>
      )}
    </section>
  );
}
