import { ReactNode } from 'react';

export type TextProps = {
  title?: ReactNode;
  text?: ReactNode;
  semicolon?: boolean;

  size?: 'default' | 'sm' | 'lg';

  classNames?: {
    title?: string;
    text?: string;
    container?: string;
  };

  titleAsChild?: boolean;
  textAsChild?: boolean;
};
