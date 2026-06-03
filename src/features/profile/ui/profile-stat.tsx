import { Text } from '@/shared/components/text';

type Props = {
  title: string;
  value: number | string;
};

export function ProfileStat({ title, value }: Props) {
  return (
    <Text
      title={title}
      text={value}
      semicolon={false}
      classNames={{
        container: 'flex flex-col-reverse items-center max-w-max',
        text: 'max-w-max font-black text-md',
        title: 'max-w-max opacity-50 font-light text-sm',
      }}
    />
  );
}
