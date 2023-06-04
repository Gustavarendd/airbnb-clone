'use client';

import useSorryModal from '@/app/hooks/useSorryModal';
import Modal from './modal.component';
import Title from '../title.component';

const SorryModal = () => {
  const sorryModal = useSorryModal();

  const bodyContent = (
    <div>
      <Title
        title="Sorry!"
        subtitle="We have not added this feature yet!"
      />
    </div>
  );
  return (
    <Modal
      isOpen={sorryModal.isOpen}
      title=""
      actionLabel="Close"
      onClose={sorryModal.onClose}
      onSubmit={sorryModal.onClose}
      body={bodyContent}
    />
  );
};

export default SorryModal;
