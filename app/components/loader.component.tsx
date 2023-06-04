'use client';

import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <PuffLoader size={150} />
    </div>
  );
};

export default Loader;
