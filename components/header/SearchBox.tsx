'use client'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

export const SearchBox = () => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'All'

  const { data: categories = [], error } = useSWR('/api/products/categories')

  if (error) return <div className="text-red-500">Error: {error.message}</div>
  if (!categories.length) return <div>Loading...</div>

  return (
    <form action="/search" method="GET" className="flex items-center">
      <div className="flex items-center space-x-0 bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
        <select
          name="category"
          defaultValue={category}
          className="select w-32 bg-gray-50 border-none text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          {categories.map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="input input-bordered w-full text-sm bg-gray-50 border-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          type="submit" 
          className="btn bg-blue-600 text-white text-sm px-4 py-2 hover:bg-blue-700 transition-all duration-200"
        >
          Search
        </button>
      </div>
    </form>
  )
}
