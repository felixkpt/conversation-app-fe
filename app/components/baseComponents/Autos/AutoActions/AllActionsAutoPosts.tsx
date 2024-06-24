import React from 'react'
import AutoPost from '../AutoPost'

type Props = {
    componentId: string
}

const AllActionsAutoPosts = ({ componentId }: Props) => {
    return (
        <>
            <AutoPost componentId={`${componentId}CreateOrUpdate`} />
            <AutoPost componentId={`${componentId}UpdateStatus`} />
            <AutoPost componentId={`${componentId}Archive`} />
            <AutoPost componentId={`${componentId}Delete`} />
        </>
    )
}

export default AllActionsAutoPosts