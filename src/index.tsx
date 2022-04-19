import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './components/Toast/index.css'
import App from '@/components/Toast'

const render = (element: string, props: any) => {
  const root = ReactDOM.createRoot(document.getElementById(element) as HTMLElement)
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  )
}
const windowAny = global.window as any
windowAny.showToast = render
