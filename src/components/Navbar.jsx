import React from 'react'
import Logo from '../assets/Logo.png'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const menu = [
    {
      name: "Top Up",
      link: "/topup"
    },
    {
      name: "Transaction",
      link: "/transaction"
    },
    {
      name: "Akun",
      link: "/akun"
    }
  ]

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between items-center px-10 fixed top-0 left-0 w-full z-10">
      <div className="cursor-pointer">
        <Link to={'/home'} className='flex gap-3 justify-center items-center'>
          <img src={Logo} alt="" className='w-8' />
          <p className="font-bold md:text-lg">SIMS PPOB</p>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {menu.map((item) => {
            const isActive = location.pathname === item.link
            return (
              <li key={item.name}>
                <Link className={`md:text-lg font-semibold ${isActive ? 'text-red-600' : ''}`} to={item.link}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Navbar