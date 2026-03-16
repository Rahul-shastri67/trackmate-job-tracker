import {
FaLinkedin,
FaGithub,
FaPhoneAlt,
FaEnvelope,
FaHeart
} from "react-icons/fa"

import { FaXTwitter } from "react-icons/fa6"

function Footer() {

return (

<footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10">

<div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

{/* Brand */}

<div>

<h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
TrackMate
</h2>

<p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
TrackMate helps you manage job applications,
interviews and offers in one place with a
clean dashboard experience.
</p>

</div>


{/* Support */}

<div>

<h3 className="font-semibold text-gray-800 dark:text-white mb-4">
Help & Support
</h3>

<div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">

<div className="flex items-center gap-2">
<FaPhoneAlt className="text-blue-500"/>
<span>+91 6397228330</span>
</div>

<div className="flex items-center gap-2">
<FaEnvelope className="text-blue-500"/>
<span>trackmate.support@mail.in</span>
</div>

</div>

</div>


{/* Social */}

<div>

<h3 className="font-semibold text-gray-800 dark:text-white mb-4">
Connect With Me
</h3>

<div className="flex gap-5 text-xl text-gray-600 dark:text-gray-300">

<a
href="https://github.com/Rahul-shastri67/"
target="_blank"
rel="noopener noreferrer"
className="hover:text-black dark:hover:text-white transition"
>
<FaGithub/>
</a>

<a
href="https://www.linkedin.com/in/rahul-shastri-b690ba2b8/"
target="_blank"
rel="noopener noreferrer"
className="hover:text-blue-600 transition"
>
<FaLinkedin/>
</a>

<a
href="https://x.com/i_am_Rahul_786"
target="_blank"
rel="noopener noreferrer"
className="hover:text-black dark:hover:text-white transition"
>
<FaXTwitter/>
</a>

</div>

</div>

</div>


{/* Bottom */}

<div className="border-t border-gray-200 dark:border-gray-800 py-4">

<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">

<p className="flex items-center gap-1">
Made with <FaHeart className="text-red-500"/> by Rahul
</p>

<p>
© {new Date().getFullYear()} TrackMate. All rights reserved.
</p>

</div>

</div>

</footer>

)

}

export default Footer