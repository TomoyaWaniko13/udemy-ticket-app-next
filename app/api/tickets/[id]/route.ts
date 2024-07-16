import { NextRequest } from 'next/server';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {}
