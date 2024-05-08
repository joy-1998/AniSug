import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png';

const Navbar = () => {
  return (
    <nav className='bg-bg-grey'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-1 items-center justify-center md:items-stretch'>
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <a
                  href='/'
                  className='text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                >
                  Home
                </a>
                <a
                  href='/AddAnime'
                  className='hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                >
                  Add Anime
                </a>
                <a
                  href='/Critics'
                  className='hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                >
                  Critics
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden' id='mobile-menu'>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <a
            href='/'
            className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
          >
            Home
          </a>
          <a
            href='/AddAnime'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
          >
            Add Anime
          </a>
          <a
            href='/Critics'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
          >
            Critics
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;