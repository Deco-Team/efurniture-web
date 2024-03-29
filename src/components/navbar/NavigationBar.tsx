'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Image,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { FaChevronDown, FaHome, FaRegEnvelope, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { logout } from '@actions/auth/auth.actions'
import { usePathname, useRouter } from 'next/navigation'
import { ICustomer } from '@src/interface/customer.interface'
import { MdSupportAgent } from 'react-icons/md'
import { set } from 'lodash'

interface NavigationBarProps {
  isLogin: boolean
  me: ICustomer | null
}

const NavigationBar = ({ isLogin, me }: NavigationBarProps) => {
  const router = useRouter()
  const activePathname = usePathname()
  const [searchValue, setSearchValue] = React.useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const logoutAction = () => {
    logout()
    router.refresh()
  }

  return (
    !(activePathname === '/order' || activePathname.includes('login')) && (
      <>
        <Navbar
          isBlurred={false}
          maxWidth='xl'
          classNames={{ wrapper: 'gap-8' }}
          className='h-[72px] sm:h-24 static sm:sticky sm:border-b sm:border-default-100'
        >
          <NavbarContent justify='start' className='max-w-fit'>
            <NavbarBrand>
              <Link href='/'>
                <Image removeWrapper radius='none' src='/logo.svg' alt='logo' className='!h-10' />
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className='hidden sm:flex gap-8' justify='start'>
            <NavbarItem>
              <Link
                underline={activePathname === '/' ? 'always' : 'hover'}
                href='/'
                className={`font-medium underline-offset-8 decoration-2 ${activePathname === '/' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
              >
                Trang chủ
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                underline={activePathname === '/products' ? 'always' : 'hover'}
                href='/products'
                className={`font-medium underline-offset-8 decoration-2 ${activePathname === '/products' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
              >
                Sản phẩm
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                underline={activePathname === '/contact' ? 'always' : 'hover'}
                href='/contact'
                className={`font-medium underline-offset-8 decoration-2 ${activePathname === '/contact' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
              >
                Liên hệ
              </Link>
            </NavbarItem>
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Link
                    disableRipple
                    underline={activePathname.includes('booking') ? 'always' : 'hover'}
                    as={Button}
                    variant='light'
                    className={`p-0 min-w-fit bg-transparent data-[hover=true]:bg-transparent aria-[expanded=true]:scale-100 aria-[expanded=true]:underline font-medium underline-offset-8 decoration-2 ${activePathname.includes('booking') ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                    endContent={<FaChevronDown className='max-h-3 max-w-3' />}
                  >
                    Dịch vụ
                  </Link>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                className='w-[200px]'
                itemClasses={{
                  base: 'gap-4'
                }}
                variant='flat'
                aria-label='Service action'
              >
                <DropdownItem
                  key='booking-visit'
                  as={Link}
                  href='/booking/visit'
                  className={` ${activePathname === '/booking/visit' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Đặt lịch tham quan
                </DropdownItem>
                <DropdownItem
                  key='booking-consultant'
                  as={Link}
                  href={isLogin ? '/booking/consultant' : '/login-register'}
                  className={` ${activePathname === '/booking/consultant' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Tư vấn thiết kế
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarContent as='div' className='items-center gap-2' justify='end'>
            <Input
              isClearable
              variant='bordered'
              classNames={{
                base: `${searchValue ? 'max-w-full' : 'max-w-12'}`,
                mainWrapper: 'h-full',
                input: 'text-small !pl-3 !pr-0 !mr-6',
                inputWrapper: `h-full text-center font-normal text-default-foreground shadow-none focus-within:rounded-lg focus-within:hover:!border-black focus-within:hover:bg-white ${searchValue ? 'rounded-lg' : 'rounded-full border-white hover:!border-default/5 hover:bg-default/30'}`
              }}
              placeholder='Tìm kiếm...'
              value={searchValue}
              onValueChange={(value: string) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
              onKeyDown={(e) =>
                e.key === 'Enter' && searchValue && router.push(`/products/search?search=${searchValue}`)
              }
              size='lg'
              startContent={<FaSearch className='min-w-5 min-h-5 pointer-events-none' />}
              className='focus-within:max-w-full transition-all !duration-300 !ease-linear hidden sm:flex'
            />
            <Button
              as={Link}
              href={isLogin ? '/cart' : '/login-register'}
              size='lg'
              isIconOnly
              variant='light'
              radius='full'
              className={`hidden sm:flex ${activePathname === '/cart' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
            >
              <FaShoppingCart className='min-w-5 min-h-5' />
            </Button>
            {isLogin && me ? (
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Button
                    size='lg'
                    isIconOnly
                    variant='light'
                    radius='full'
                    className={`${activePathname.includes('customer') ? 'text-[var(--primary-orange-text-color)]' : ''}`}
                  >
                    <FaUser className='min-w-5 min-h-5' />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem as={Link} href='/customer' key='profile' className='text-black'>
                    Tài khoản của tôi
                  </DropdownItem>
                  <DropdownItem
                    as={Link}
                    className='text-black hover:!text-[var(--primary-orange-text-color)]'
                    key='orders'
                    color='warning'
                    href='/customer/orders'
                  >
                    Lịch sử đơn hàng
                  </DropdownItem>
                  <DropdownItem
                    as={Link}
                    className='text-black hover:!text-[var(--primary-orange-text-color)]'
                    key='orders'
                    color='warning'
                    href='/customer/bookings/consultants'
                  >
                    Lịch sử tư vấn
                  </DropdownItem>
                  <DropdownItem key='logout' color='danger' onClick={logoutAction}>
                    Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button
                  as={Link}
                  variant='light'
                  href='/login-register'
                  size='lg'
                  isIconOnly
                  radius='full'
                  className='sm:hidden min-w-fit'
                >
                  <FaArrowRightToBracket className='min-w-5 min-h-5' />
                </Button>
                <Button
                  as={Link}
                  href='/login-register'
                  className='hidden sm:flex min-w-fit bg-black text-white font-medium'
                >
                  Đăng nhập
                </Button>
              </>
            )}
          </NavbarContent>
        </Navbar>

        {/* <ProgressLoading /> */}

        <Navbar
          isBlurred={false}
          maxWidth='xl'
          classNames={{ wrapper: 'justify-center' }}
          className='h-[72px] top-[calc(100%-72px)] fixed sm:hidden border-t border-default-100'
        >
          <NavbarContent className='flex gap-8 max-xs:gap-4 !justify-evenly'>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                as={Link}
                href='/'
                className={`${activePathname === '/' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaHome className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                onPress={onOpen}
                className={`${activePathname === '/search' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaSearch className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                as={Link}
                href={isLogin ? '/cart' : '/login-register'}
                className={`${activePathname === '/cart' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaShoppingCart className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                as={Link}
                href={'/contact'}
                className={`${activePathname === '/contact' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaRegEnvelope className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <Dropdown backdrop='blur'>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant='light'
                    size='lg'
                    radius='full'
                    as={Link}
                    className={`${activePathname.includes('booking') ? 'text-[var(--primary-orange-text-color)]' : ''}`}
                  >
                    <MdSupportAgent className='min-w-6 min-h-6' />
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                className='w-[200px]'
                itemClasses={{
                  base: 'gap-4'
                }}
                variant='flat'
                aria-label='Service action'
              >
                <DropdownItem
                  key='booking-visit'
                  as={Link}
                  href='/booking/visit'
                  className={` ${activePathname === '/booking/visit' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Đặt lịch tham quan
                </DropdownItem>
                <DropdownItem
                  key='booking-consultant'
                  as={Link}
                  href={isLogin ? '/booking/consultant' : '/login-register'}
                  className={` ${activePathname === '/booking/consultant' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Tư vấn thiết kế
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
        <Modal
          isOpen={isOpen}
          placement={'top-center'}
          backdrop='blur'
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Tìm kiếm</ModalHeader>
                <ModalBody>
                  <Input
                    isClearable
                    variant='bordered'
                    classNames={{
                      mainWrapper: 'h-full',
                      input: 'text-small',
                      inputWrapper: 'h-full text-center font-normal'
                    }}
                    placeholder='Tìm kiếm...'
                    value={searchValue}
                    onValueChange={(value: string) => setSearchValue(value)}
                    onClear={() => setSearchValue('')}
                    onKeyDown={(e) => {
                      e.key === 'Enter' && searchValue && router.push(`/products/search?search=${searchValue}`)
                      e.key === 'Enter' && searchValue && onClose()
                    }}
                    size='lg'
                    startContent={<FaSearch className='min-w-5 min-h-5 pointer-events-none' />}
                    className='focus-within:max-w-full transition-all !duration-300 !ease-linear'
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color='default' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    onPress={() => {
                      searchValue && router.push(`/products/search?search=${searchValue}`)
                      searchValue && onClose()
                    }}
                    className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)]'
                  >
                    Search
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
  )
}

export default NavigationBar
