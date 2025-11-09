// resources/js/entry-server.jsx
import React from 'react'
import { renderToString } from 'react-dom/server'
import Web from '@app/web'

export function render() {
    const html = renderToString(<Web />)
    return { html }
}
