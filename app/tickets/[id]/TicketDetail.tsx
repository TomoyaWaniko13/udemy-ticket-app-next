import { Ticket } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className={'lg:grid lg:grid-cols-4'}>
      <Card className={'mx-4 mb-4 lg:col-span-3 lg:mr-4'}>
        <CardHeader>
          <div className={'flex justify-between mb-3'}>
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>Created: {ticket.createdAt.toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent className={'prose dark:prose-invert'}>
          <Markdown>{ticket.description}</Markdown>
        </CardContent>
        <CardFooter>Updated: {ticket.updatedAt.toLocaleString()}</CardFooter>
      </Card>
      <div className={'mx-4 flex lg:flex-col lg:mx-0 gap-2'}>
        <Button variant={'default'}>
          <Link href={`/tickets/edit/${ticket.id}`}>Edit Ticket</Link>
        </Button>
        <Button variant={'destructive'}>
          <Link href={`/tickets/delete/${ticket.id}`}>Delete Ticket</Link>
        </Button>
      </div>
    </div>
  );
};

export default TicketDetail;
