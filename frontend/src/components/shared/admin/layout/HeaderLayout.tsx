
import { Link } from 'react-router-dom';
import NavLinks from './nav-links';
const HeaderLayout = () => {
  return <div className="flex h-full flex-col px-3 py-4 md:px-2  headermenu text-white">
  <Link
    className="mb-2 flex h-20 items-end justify-start rounded-md headermenu p-4 md:h-32"
    to="/"
  >
    <div className=" w-20">
    <img  alt="logo"
          src="/assets/logo.png"
        />
    </div>
  </Link>
  <div className="flex grow flex-row justify-between  space-x-2 md:flex-col md:space-x-0 md:space-y-2">
    <NavLinks />
    <div className="hidden h-auto w-full grow rounded-md headermenu md:block"></div>
  </div>
</div>
}


export default HeaderLayout