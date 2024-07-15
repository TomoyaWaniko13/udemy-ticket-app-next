import { Ticket } from '@prisma/client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';

interface Props {
  tickets: Ticket[];
}

const TicketsDataTable = ({ tickets }: Props) => {
  return (
    <div className={'w-full mt-5'}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>
              <div className={'flex justify-center'}>Status</div>
            </TableHead>
            <TableHead>
              <div className={'flex justify-center'}>Priority</div>
            </TableHead>
            <TableHead>Crated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href={'/'}>
                  <TableCell>{ticket.title}</TableCell>
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
