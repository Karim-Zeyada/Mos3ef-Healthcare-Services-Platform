import React from 'react'
import { Button } from './ui/button'

export const IconButton = ({ IconName, label }) => {
    return (
        <div>
            <Button
                className="inline-flex items-center justify-center gap-1 px-8 py-2 h-auto bg-Blue-900 rounded-3xl overflow-hidden shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue-200 focus:bg-Blue transition-colors"
                aria-label={label}>
                {IconName}
            </Button>
        </div>
    )
}
