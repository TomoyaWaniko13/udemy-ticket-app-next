import UserForm from '@/components/UserForm';
import DataTableSimple from '@/app/users/data-table-simple';
import prisma from '@/prisma/db';

const UsersPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <>
      <UserForm />
      <DataTableSimple users={users} />
    </>
  );
};

export default UsersPage;
