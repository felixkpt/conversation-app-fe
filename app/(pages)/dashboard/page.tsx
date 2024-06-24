import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <div>
                <Link href="/dashboard/categories">Categories</Link>
            </div>
        </div>
    )
}

export default page