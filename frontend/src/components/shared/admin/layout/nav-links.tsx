
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { name: 'Bitcoin', path: '/?crpto=BTC', icon: "/assets/btc.png" },
  { name: 'Ethereum', path: '/?crpto=ETH', icon: "/assets/eth.png" },
  { name: 'Tether', path: '/?crpto=USDT', icon: "/assets/usdt.png" },
  { name: 'BNB', path: '/?crpto=BNB', icon: "/assets/bnb.png"},
  { name: 'Solana', path: '/?crpto=SOL', icon: "/assets/sol.png" },
];

const NavLinks = () => {
  const { pathname } = useLocation();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        let NavLinks
         NavLinks=<NavLink
            key={link.name}
            to={link.path}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md headermenu p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              { 'bg-red-100 text-purple-600': pathname === link.path }
            )}
          >
            <img alt="logo" src={LinkIcon} className='w-5 h-5'/>
            <p className="hidden md:block">{link.name}</p>
          </NavLink>
        return NavLinks
      })}
    </>
  );
};



export default NavLinks;
