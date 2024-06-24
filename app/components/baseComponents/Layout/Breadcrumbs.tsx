import React from 'react'

type Props = {}

const Breadcrumbs = (props: Props) => {
    return (
        <div className="text-sm breadcrumbs">
            <ul>
                <li><a>Home</a></li>
                <li><a>Documents</a></li>
                <li className='cursor-default'>Add Document</li>
            </ul>
        </div>)
}

export default Breadcrumbs