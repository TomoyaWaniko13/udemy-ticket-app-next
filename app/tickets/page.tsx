import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface PageProps {
  searchParams: { page: string };
}

const TicketsPage = async (props: PageProps) => {
  const { searchParams } = props;
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();
  const pageSize = 10;

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <>
      <Button variant={'default'}>
        <Link href={'/tickets/new'}>New Ticket</Link>
      </Button>
      <TicketsDataTable tickets={tickets} />
      <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
    </>
  );
};

export default TicketsPage;
