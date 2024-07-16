import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status } from '@prisma/client';

interface PageProps {
  searchParams: { status: Status; page: string };
}

const TicketsPage = async (props: PageProps) => {
  const { searchParams } = props;

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();

  // OPEN, STARTED, CLOSED
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  let where = {};

  if (status) {
    where = { status };
  } else {
    where = { NOT: [{ status: 'CLOSED' as Status }] };
  }

  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <>
      <div className={'flex gap-2'}>
        <Button variant={'default'}>
          <Link href={'/tickets/new'}>New Ticket</Link>
        </Button>
        <StatusFilter />
      </div>
      <TicketsDataTable tickets={tickets} />
      <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
    </>
  );
};

export default TicketsPage;
