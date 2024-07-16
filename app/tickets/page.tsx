import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <>
      <Button variant={'default'}>
        <Link href={'/tickets/new'}>New Ticket</Link>
      </Button>
      <TicketsDataTable tickets={tickets} />
      <Pagination itemCount={26} pageSize={10} currentPage={2} />
    </>
  );
};

export default TicketsPage;
