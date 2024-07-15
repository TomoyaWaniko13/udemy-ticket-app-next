'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavLinks = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tickets', href: '/tickets' },
    { label: 'Users', href: '/users' },
  ];

  const currentPath = usePathname();

  return (
    <div className={'flex items-center space-x-2'}>
      {links.map((link) => (
        <Link
          href={link.href}
          className={`navbar-link ${currentPath == link.href && 'cursor-default text-primary/100 hover:text-primary/80'}`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
