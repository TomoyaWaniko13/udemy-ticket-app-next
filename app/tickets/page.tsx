import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <TicketsDataTable tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
