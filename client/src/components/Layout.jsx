import Sidebar from "./Sidebar"
import Footer from "./Footer"

function Layout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">

      {/* Fixed Sidebar */}

      <div className="w-64 fixed h-screen">

        <Sidebar />

      </div>


      {/* Main Content */}

      <div className="flex flex-col flex-1 ml-64">

        {/* Page Content */}

        <main className="flex-1 p-6">

          {children}

        </main>


        {/* Footer */}

        <Footer />

      </div>

    </div>

  )

}

export default Layout