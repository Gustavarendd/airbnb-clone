'use client';

import { useRouter } from 'next/navigation';

import Button from './button/button.component';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
    h-[60vh]
    flex
    flex-col
    items-center
    justify-center
    gap-2
    "
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl">{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
