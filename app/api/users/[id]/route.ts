import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchemas/users';
import prisma from '@/prisma/db';
import bcrypt from 'bcrypt';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
  }

  if (body?.password && body.password != '') {
    // 新しいパスワードが提供された場合、セキュリティのためにハッシュ化して保存します。
    body.password = await bcrypt.hash(body.password, 10);
  } else {
    // パスワードが提供されていない、または空の場合、password fieldをdeleteして、
    // 後続の処理（例：データベース更新）でpassword fieldが不要に更新されることを防ぎます。
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (duplicateUsername) {
      return NextResponse.json({ message: 'duplicate username' }, { status: 409 });
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: { ...body },
  });

  return NextResponse.json(updateUser);
}
