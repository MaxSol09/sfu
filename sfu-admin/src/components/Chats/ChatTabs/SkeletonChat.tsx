import { CardHeader, Skeleton } from '@mui/material'
import React from 'react'

export const SkeletonChat: React.FC = () => {
  return (
    <>
        <CardHeader
            avatar={
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={
                <Skeleton
                    animation="wave"
                    height={10}
                    width="100%"
                />
            }
            subheader={
                <Skeleton animation="wave" height={10} width="50%" />
            }
        />
    </>
  )
}
