import { FaSearch, FaTimes } from "react-icons/fa"
import { useState, useEffect } from "react"

function JobSearch({ setSearch }) {
  const [text, setText] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(text)
    }, 300)
    return () => clearTimeout(timer)
  }, [text])

  const handleClear = () => {
    setText("")
    setSearch("")
  }

  return (
    <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 shadow-sm w-full">
      <FaSearch className="text-gray-400 mr-2 shrink-0" />
      <input
        type="text"
        placeholder="Search company or position..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="outline-none w-full bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
      />
      {text && (
        <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ml-2 shrink-0">
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default JobSearch