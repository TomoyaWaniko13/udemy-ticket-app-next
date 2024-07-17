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

  user.password = '';
  return <UserForm user={user}></UserForm>;
};

export default EditUserPage;
