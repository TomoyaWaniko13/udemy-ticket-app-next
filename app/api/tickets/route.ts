import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import prisma from '@/prisma/db';

export async function POST(request: NextRequest) {
  // taking JSON as input and parsing it to produce a JavaScript object
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });

  // 201 Created
  return NextResponse.json(newTicket, { status: 201 });
}
