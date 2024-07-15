import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import MainNavLinks from '@/components/MainNavLinks';

const MainNav = () => {
  return (
    <div className={'flex justify-between'}>
      <MainNavLinks />
      <div className={'flex items-center space-x-2'}>
        <Link href={'/'}>Logout</Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default MainNav;
