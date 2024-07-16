'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: string }[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChange = (statusValue) => {
    const params = new URLSearchParams();
    if (statusValue) params.append('status', statusValue);
    const query = params.size ? `?${params.toString()}` : '0';
    router.push(`/tickets${query}`);
  };

  return (
    <Select defaultValue={searchParams.get('status') || ''} onValueChange={onValueChange}>
      <SelectTrigger className={'w-[200px]'}>
        <SelectValue placeholder='Filter by status...' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.value || 0} value={status.value || '0'}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
