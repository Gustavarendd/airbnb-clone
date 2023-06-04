'use client';

import useHostYourHomeModal from '@/app/hooks/useHostYourHomeModal';
import Modal from './modal.component';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Title from '../title.component';
import { categories } from '../categories/categories.component';
import CategoryInput from '../inputs/categoryInput.component';
import CountrySelect, {
  CountrySelectValue,
} from '../inputs/countrySelect.component';
import Counter from '../inputs/counter.component';
import Input from '../inputs/input.component';
import ImageUpload from '../inputs/imageUpload.component';
import LocationMap from '../map/map.component';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const HostYourHomeModal = () => {
  const hostYourHomeModal = useHostYourHomeModal();
  const router = useRouter();
  const [mapLocation, setMapLocation] = useState<CountrySelectValue>();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    if (id === 'location') {
      setMapLocation(value);
    }
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep(value => value - 1);
  };

  const onNext = () => {
    setStep(value => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);

    axios
      .post('/api/properties', data)
      .then(() => {
        toast.success('Property created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        hostYourHomeModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4 h-fit">
      <Title
        title="Category"
        subtitle="Which of these best describe your place?"
      />
      <div
        className="grid
            grid-cols-2
            md:grid-cols-3
            gap-3
            max-h-[60vh]
            md:max-h-[50vh]
            overflow-y-auto "
      >
        {categories.map(item => (
          <div
            key={item.label}
            className="col-span-1"
          >
            <CategoryInput
              onClick={category => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Title
          title="Where is your place located"
          subtitle="Let people where to find your place"
        />
        <CountrySelect
          value={location}
          onChange={value => setCustomValue('location', value)}
        />
        <LocationMap
          location={
            mapLocation?.latlng || [56.70954028190986, 11.555548396911327]
          }
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Title
          title="Details about your place"
          subtitle="Let people how big your place is"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms does your place have?"
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms does your place have?"
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Title
          title="Upload some pictures"
          subtitle="Let people see how your place looks like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={value => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Title
          title="What is your place called"
          subtitle="Describe your place for people"
        />
        <Input
          id="title"
          label="Title"
          type="text"
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          type="text"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Title
          title="Price per night"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          formatPrice
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={hostYourHomeModal.isOpen}
      title={`Host your home (step: ${step + 1} / 6)`}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={hostYourHomeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default HostYourHomeModal;
