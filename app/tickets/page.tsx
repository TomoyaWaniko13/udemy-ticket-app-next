import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
}

const TicketsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();

  const orderBy = searchParams.orderBy ? searchParams.orderBy : 'createdAt';

  // OPEN, STARTED, CLOSED
  const statuses = Object.values(Status);
  // statusesの中にsearchParams.statusの値があるか確認
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  let where = {};

  if (status) {
    where = { status };
  } else {
    where = { NOT: [{ status: 'CLOSED' as Status }] };
  }

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: { [orderBy]: 'desc' },
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
      <TicketsDataTable tickets={tickets} searchParams={searchParams} />
      <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
    </>
  );
};

export default TicketsPage;
