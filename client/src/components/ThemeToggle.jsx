import { FaMoon, FaSun } from "react-icons/fa"
import { useEffect, useState } from "react"

function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(prev => !prev)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle