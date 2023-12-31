import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React,{useState} from "react";
import {SearchBar} from "./SearchBar";
import {Link} from "react-router-dom";

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Forecast', href: '/forecast', current: false },
  { name: 'Analytics', href: '/analytics', current: false },
]

const userNavigate =[
  { name: 'Sign out', link: '/logout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavBar({ children }) {
  const token = localStorage.getItem('token')
  const storedData = localStorage.getItem('data');
  const data = storedData ? JSON.parse(storedData) : null;
  return (
      <>
        <div className="">
          <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                              <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                      item.current ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                      'rounded-md px-3 py-2 text-sm font-medium'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <SearchBar />
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                      {/* Profile dropdown */}
                      {token && (<Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button
                              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-4 text-gray-700">
                              <div className="flex flex-col">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Username:</p>
                                <p className="text-x font-bold text-gray-800">{data.username}</p>
                                {/*<p className="text-xs font-semibold text-gray-500 mb-1">Role:</p>
                                <p className="text-x font-bold text-gray-800">{data.role}</p>*/}
                              </div>
                            </div>
                            {userNavigate.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({active}) => (
                                      <Link
                                          to={item.link}
                                          className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block px-4 py-2 text-x text-gray-700 text-red-500'
                                          )}
                                      >
                                        {item.name}
                                      </Link>
                                  )}
                                </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>)}
                    </div>
                  </div>
                </div>
              </>
          )}
        </Disclosure>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </>

  )
}

export default NavBar;
