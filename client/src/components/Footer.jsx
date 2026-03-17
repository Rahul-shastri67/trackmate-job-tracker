import {
  FaLinkedin, FaGithub, FaPhoneAlt,
  FaEnvelope, FaHeart
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            TrackMate
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm leading-relaxed">
            Manage your job applications, interviews and offers in one place with a clean dashboard experience.
          </p>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 text-sm">
            Help & Support
          </h3>
          <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500 shrink-0" />
              <span>+91 6397228330</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500 shrink-0" />
              <span>trackmate.support@mail.in</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 text-sm">
            Connect With Me
          </h3>
          <div className="flex gap-4 text-xl text-gray-500 dark:text-gray-400">
            
             <a href="https://github.com/Rahul-shastri67/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
            >
              <FaGithub />
            </a>
            
             <a href="https://www.linkedin.com/in/rahul-shastri-b690ba2b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaLinkedin />
            </a>
            
             <a href="https://x.com/i_am_Rahul_786"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-red-500" /> by Rahul
          </p>
          <p>© {new Date().getFullYear()} TrackMate. All rights reserved.</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer