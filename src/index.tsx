import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './components/Toast/index.css'
import { Store } from './store'
import App from '@/components/Toast'

const DEFAULT_NAME = 'toaster'
const store = new Store<{ id: string; root: any }>()

const render = (props: any = {}) => {
  const { element } = props
  const id = element || DEFAULT_NAME
  const currentElement = store.find(id)

  if (currentElement) {
    currentElement.root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    )
    return
  }

  const htmlElement = document.getElementById(id) as HTMLElement

  if (!htmlElement) {
    const div = document.createElement('div')
    div.id = id
    div.style.zIndex = '9999'

    document.body.append(div)
  }

  const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement)
  store.add({ id, root })

  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  )
}

const windowAny = global.window as any
windowAny.showToast = render
