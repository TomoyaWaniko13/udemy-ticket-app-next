import prisma from '@/prisma/db';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();

  console.log(tickets);

  return <>tickets</>;
};

export default TicketsPage;
