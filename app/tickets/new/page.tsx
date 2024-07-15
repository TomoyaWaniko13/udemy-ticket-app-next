import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), { ssr: false });

const NewTicket = () => {
  return <TicketForm />;
};

export default NewTicket;
