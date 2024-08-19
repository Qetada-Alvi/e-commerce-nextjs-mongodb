'use client'

import useLayoutService from '@/lib/hooks/useLayout'
import Link from 'next/link'
import useSWR from 'swr'

const Sidebar = () => {
  const { toggleDrawer } = useLayoutService()
  const { data: categories = [], error } = useSWR('/api/products/categories')

  if (error) {
    console.error('Failed to fetch categories:', error)
    return <div>Error: {error.message}</div>
  }

  if (categories.length === 0) return <div>No categories available</div>

  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li>
        <h2 className="text-xl">Shop By Department</h2>
      </li>
      {categories.map((category: string) => (
        <li key={category}>
          <Link href={`/search?category=${category}`} onClick={toggleDrawer}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Sidebar
