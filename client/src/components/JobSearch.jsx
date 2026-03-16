import { FaSearch } from "react-icons/fa"
import { useState } from "react"

function JobSearch({ setSearch }) {

  const [text, setText] = useState("")

  const handleSearch = () => {
    setSearch(text)
  }

  return (

    <div className="flex gap-3 mb-6">

      <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full shadow-sm">

        <FaSearch className="text-gray-400 mr-2" />

        <input
          type="text"
          placeholder="Search company or position..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none w-full bg-transparent text-black dark:text-white placeholder-gray-400"
        />

      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
      >
        Search
      </button>

    </div>

  )

}

export default JobSearch