import { appConfig } from '@/app/components/baseComponents/utils/helpers'
import React from 'react'
import Toggler from './Sidebar/Toggler'
import ThemeController from './ThemeController'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="navbar bg-base-100 justify-between">
      <div className="w-1/3">
        <Toggler action={'toggle'} />
        <a className="btn btn-ghost text-xl" href='/'>{appConfig.name}</a>
      </div>
      <div className="navbar-center hidden w-1/3">
        <ul className="menu menu-horizontal px-1 z-20">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="w-1/3 flex justify-center">
        <ThemeController />
      </div>
    </div>
  )
}

export default Navbar