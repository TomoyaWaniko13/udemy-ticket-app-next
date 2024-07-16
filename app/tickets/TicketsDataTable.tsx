import { Ticket } from '@prisma/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { SearchParams } from '@/app/tickets/page';
import { ArrowDown } from 'lucide-react';

// interface SearchParams {
//   status: Status;
//   page: string;
//   orderBy: keyof Ticket;
// }

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const TicketsDataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div className={'w-full mt-5'}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>Title</Link>
              {'title' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
            </TableHead>
            <TableHead>
              <div className={'flex justify-center'}>
                <Link href={{ query: { ...searchParams, orderBy: 'status' } }}>Status</Link>
                {'status' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
              </div>
            </TableHead>
            <TableHead>
              <div className={'flex justify-center'}>
                <Link href={{ query: { ...searchParams, orderBy: 'priority' } }}>Priority</Link>
                {'priority' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
              </div>
            </TableHead>
            <TableHead>
              <Link href={{ query: { ...searchParams, orderBy: 'createdAt' } }}>Created At</Link>
              {'createdAt' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href={'/'}>
                  <TableCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                  </TableCell>
                  <TableCell>
                    <div className={'flex justify-center'}>
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={'flex justify-center'}>
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
                  <TableCell>{ticket.createdAt.toLocaleString()}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketsDataTable;
