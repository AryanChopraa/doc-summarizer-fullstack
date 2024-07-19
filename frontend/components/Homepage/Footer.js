import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-black ">
      <div className="w-full max-w-screen-xl mx-auto py-4 px-4 md:py-8 ">
        <div className="flex sm:items-center sm:justify-between  items-center justify-center flex-col sm:flex-row">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-thin whitespace-nowrap text-white">summarize.<text className="text-blue-500">ai</text></span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-thin text-white sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
       
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className='flex items-center justify-center'>
        <span className="block text-sm text-gray-500 sm:text-center font-thin">© 2024 <a href="#" className="hover:underline">summarize.ai</a>. All Rights Reserved.</span>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
