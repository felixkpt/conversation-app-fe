import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
    children: React.ReactNode
}

const BaseLayout = ({ children }: Props) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="appLeftDrawer" type="checkbox" className="drawer-toggle hidden" />
            <div className="drawer-content">
                <Navbar />
                <div>
                    <div className="flex min-h-screen">
                        <main className="flex-1 p-6">{children}</main>
                    </div>
                    <Footer />
                </div>

            </div>
            <div className="drawer-side z-[500]">
                <label htmlFor="appLeftDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    )
}

export default BaseLayout