'use client'
import React from 'react'

type Props = {
    action: 'open' | 'close' | 'toggle'
}

const Toggler = ({ action = 'open' }: Props) => {

    const handleClick = () => {
        const appLeftDrawer = document.getElementById('appLeftDrawer')
console.log(action, appLeftDrawer)
        if (appLeftDrawer) {
            if (action == 'toggle') {
                const width = window.innerWidth
                if (width > 1027) {
                    appLeftDrawer.classList.toggle('drawer-toggle')

                }else {
                    appLeftDrawer.classList.add('drawer-toggle')

                }
                console.log(width)
                // appLeftDrawer.classList.add('drawer-close')
            } else {
                appLeftDrawer.classList.add('drawer-toggle')
            }
        }
    }

    return (
        <div className="flex justify-end">
            <label htmlFor="appLeftDrawer" className="btn drawer-button" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    )
}

export default Toggler