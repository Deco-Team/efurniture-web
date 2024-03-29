'use client'

import { Button, ScrollShadow } from '@nextui-org/react'
import CategoryCard from '@components/cards/CategoryCard'
import React from 'react'
import { ICategory } from '@global/interface'

interface CategoryListProps {
  categories: ICategory[]
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const [showAllCategories, setShowAllCategories] = React.useState(false)

  const visibleCategories = categories.slice(0, 3)
  const hiddenCategories = categories.slice(3)

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories)
  }
  return (
    <div className='max-w-screen-lg p-4 w-full'>
      <h2 className='mb-5 font-bold text-xl sm:text-2xl text-black'>Danh mục</h2>
      <ScrollShadow orientation='horizontal' offset={0} size={20} className='overflow-x-auto scroll-pl-4 snap-x '>
        <div className='flex sm:hidden gap-4 mb-4'>
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </ScrollShadow>
      <div className='hidden sm:grid sm:grid-cols-3 mb-4 gap-4'>
        {visibleCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      <div
        className={`${showAllCategories ? 'max-h-[1000px] mb-4' : 'max-h-0'} sm:grid sm:grid-cols-3 hidden overflow-hidden gap-4 transition-all !duration-400 !ease-linear`}
      >
        {hiddenCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      {categories.length > 3 && (
        <div className={`hidden sm:flex ${showAllCategories && 'mt-4'}`}>
          <Button
            onClick={toggleShowAllCategories} // skipcq: JS-0417
            variant='bordered'
            className='font-semibold text-[var(--primary-orange-text-color)] border-solid border-1 border-[var(--primary-orange-color)] rounded-full h-12 px-7 mx-auto'
          >
            {showAllCategories ? 'Thu gọn danh mục' : 'Mở rộng danh mục'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryList
