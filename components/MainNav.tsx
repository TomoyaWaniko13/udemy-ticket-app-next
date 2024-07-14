import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';

const MainNav = () => {
  return (
    <div className={'flex justify-between'}>
      <div className={'flex items-center space-x-2'}>
        <Link href={'/'}>Dashboard</Link>
        <Link href={'/tickets'}>Tickets</Link>
        <Link href={'/users'}>Users</Link>
      </div>
      <div className={'flex items-center space-x-2'}>
        <Link href={'/'}>Logout</Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default MainNav;
