import prisma from '@/prisma/db';
import UserForm from '@/components/UserForm';

interface Props {
  params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className={'text-destructive'}>User Not Found.</p>;
  }

  // パスワードの実際の値をクライアントサイドに送信しないようにする。
  user.password = '';

  return <UserForm user={user}></UserForm>;
};

export default EditUserPage;
