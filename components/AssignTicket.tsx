'use client';

import { Ticket, User } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  ticket: Ticket;
  users: User[];
}

const AssignTicket = ({ ticket, users }: Props) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');

  const assignTicket = async (userId: string) => {
    setError('');
    setIsAssigning(true);

    await axios.patch(`/api/tickets/${ticket.id}`, {}).catch(() => {
      setError('Unable to Assign Ticket.');
    });

    setIsAssigning(false);
  };

  return (
    <Select
      defaultValue={ticket.assignedToUserId?.toString() || '0'}
      onValueChange={assignTicket}
      disabled={isAssigning}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select user...' defaultValue={ticket.assignedToUserId?.toString() || '0'} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='0'>Unassign</SelectItem>
        {users?.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssignTicket;
