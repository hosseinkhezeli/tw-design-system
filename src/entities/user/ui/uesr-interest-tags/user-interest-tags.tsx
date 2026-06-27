import { Tag } from '@/shared/ui/tag';

export function UserInterestTags() {
  const intereset = ['🎯برنامه نویسی', 'تکنولوژی', 'AI'];
  return (
    <div className='h-8 flex gap-2 w-full overflow-y-hidden overflow-x-auto no-scrollbar'>
      {intereset.map((interest) => {
        return <Tag key={interest}>{interest}</Tag>;
      })}
    </div>
  );
}
