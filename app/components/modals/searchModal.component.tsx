'use client';

import { useCallback, useState } from 'react';
import { formatISO } from 'date-fns';
import { Range } from 'react-date-range';
import Modal from './modal.component';
import useSearchModal from '@/app/hooks/useSearchModal';
import queryString from 'query-string';
import Button from '../button/button.component';
import { BiSearch } from 'react-icons/bi';
import Calendar from '../inputs/calendar.component';
import CountrySelect, {
  CountrySelectValue,
} from '../inputs/countrySelect.component';
import { useRouter, useSearchParams } from 'next/navigation';
import Counter from '../inputs/counter.component';
import LocationMap from '../map/map.component';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const onBack = useCallback(() => {
    setStep(value => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep(value => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      adultCount,
      childrenCount,
      infantCount,
      petCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/?',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    adultCount,
    childrenCount,
    infantCount,
    petCount,
    dateRange,
    onNext,
    params,
  ]);

  const bodyContent = (
    <div className="grid grid-cols-3 bg-gray-100 w-[90%] max-w-[700px] rounded-full items-center">
      <div
        onClick={() => setStep(STEPS.LOCATION)}
        className={`${
          step === STEPS.LOCATION ? 'drop-shadow-lg bg-white' : ''
        } flex flex-col gap-2 rounded-full py-2 pl-6 transition`}
      >
        <div className="text-xs font-semibold">Where</div>
        <div className="text-xs">
          {`${
            location
              ? location?.flag + ' ' + location?.label
              : 'Search destination'
          }`}
        </div>
      </div>
      <div
        onClick={() => setStep(STEPS.DATE)}
        className="grid grid-cols-2"
      >
        <div
          className={`${
            step === STEPS.DATE ? 'drop-shadow-lg bg-white' : ''
          } flex flex-col gap-2 rounded-full py-2 pl-5 transition`}
        >
          <div className="text-xs font-semibold">Check in</div>
          <div className="text-[10px]">{`${
            dateRange ? dateRange.startDate?.toDateString() : 'Add dates'
          }`}</div>
        </div>
        <div
          className={`${
            step === STEPS.DATE ? 'drop-shadow-lg bg-white' : ''
          } flex flex-col gap-2 rounded-full py-2 pl-5 transition`}
        >
          <div className="text-xs font-semibold">Check out</div>
          <div className="text-[10px]">{`${
            dateRange ? dateRange.endDate?.toDateString() : 'Add dates'
          }`}</div>
        </div>
      </div>
      <div
        onClick={() => setStep(STEPS.INFO)}
        className={`${
          step === STEPS.INFO ? 'drop-shadow-lg bg-white' : ''
        } flex justify-between rounded-full py-2 pl-8 pr-2 transition`}
      >
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold">Who</div>
          <div className="text-xs">{`${
            adultCount > 0 || petCount > 0
              ? adultCount + childrenCount + infantCount + ' ' + 'guests'
              : 'Add guests'
          } ${petCount > 0 ? petCount + ' ' + 'pets' : ''}`}</div>
        </div>
        <div className="justify-self-end">
          <Button
            label="Search"
            onClick={onSubmit}
            rounded
            icon={BiSearch}
          />
        </div>
      </div>
    </div>
  );

  let footerContent = (
    <div
      id="backdrop"
      className="flex w-full"
    >
      <div className="rounded-2xl border-[1px] drop-shadow-lg p-8 bg-white">
        <CountrySelect
          value={location}
          onChange={value => setLocation(value as CountrySelectValue)}
        />
        <LocationMap location={location?.latlng || [51, 10]} />
        <Button
          onClick={onSubmit}
          label="Continue"
        />
      </div>
    </div>
  );

  if (step === STEPS.DATE) {
    footerContent = (
      <div
        id="backdrop"
        className="flex justify-center w-full"
      >
        <div className="rounded-2xl overflow-hidden border-[1px] drop-shadow-lg p-8 bg-white">
          <Calendar
            value={dateRange}
            onChange={value => setDateRange(value.selection)}
          />
          <div className="flex gap-4 bg-white">
            <Button
              onClick={onBack}
              label="Back"
            />
            <Button
              onClick={onSubmit}
              label="Continue"
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    footerContent = (
      <div
        id="backdrop"
        className="flex justify-end w-full "
      >
        <div className="flex flex-col gap-4 rounded-2xl overflow-hidden border-[1px] drop-shadow-lg bg-white p-8">
          <Counter
            title="Adults"
            subtitle="Ages 13 or above"
            value={adultCount}
            onChange={value => setAdultCount(value)}
          />
          <hr />
          <Counter
            title="Children"
            subtitle="Ages 2-12"
            value={childrenCount}
            onChange={value => setChildrenCount(value)}
          />
          <hr />
          <Counter
            title="Infants"
            subtitle="Under 2"
            value={infantCount}
            onChange={value => setInfantCount(value)}
          />
          <hr />
          <Counter
            title="Pets"
            subtitle="Any animals"
            value={petCount}
            onChange={value => setPetCount(value)}
          />
          <div className="flex gap-4 bg-white">
            <Button
              onClick={onBack}
              label="Back"
            />
            <Button
              onClick={onSubmit}
              label="Continue"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={searchModal.isOpen}
      title="Finish signing up"
      actionLabel="Continue"
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      searchModal
      footer={footerContent}
    />
  );
};

export default SearchModal;
