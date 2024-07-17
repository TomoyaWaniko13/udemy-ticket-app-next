import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchemas/users';
import prisma from '@/prisma/db';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicateUser = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (duplicateUser) {
    return NextResponse.json({ message: 'Duplicate username' }, { status: 409 });
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
