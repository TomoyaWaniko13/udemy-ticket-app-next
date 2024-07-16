import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <>
      <Button variant={'default'}>
        <Link href={'/tickets/new'}>New Ticket</Link>
      </Button>
      <TicketsDataTable tickets={tickets} />
    </>
  );
};

export default TicketsPage;
