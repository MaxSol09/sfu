import React from 'react'
import { TypeTags } from '../../../types/types'

type Props = {
    tag: TypeTags
}

export const Tag: React.FC<Props> = ({tag}) => {
    return (
        <p># {tag.tag}</p>
    )
}
