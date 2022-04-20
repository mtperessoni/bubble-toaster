import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import successIcon from '@/assets/check.svg'
import errorIcon from '@/assets/error.svg'
import infoIcon from '@/assets/info.svg'
import warningIcon from '@/assets/warning.svg'

interface IToast {
  color?: string
  direction?: 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right'
  type?: 'sucess' | 'warning' | 'error' | 'info'
  duration?: number
  message: string
}

const TOAST_INFO: { [key: string]: { img: any; className: string; text: string } } = {
  success: {
    img:
      process.env.NODE_ENV === 'development'
        ? successIcon
        : 'https://besafe-scripts.s3.amazonaws.com/Toast/media/check.d639b7bb0ac3c4477b7b2334eca8819f.svg',
    className: 'toast__success',
    text: 'Sucesso',
  },
  error: {
    img: errorIcon,
    className: 'toast__error',
    text: 'Erro',
  },
  info: {
    img:
      process.env.NODE_ENV === 'development'
        ? infoIcon
        : 'https://besafe-scripts.s3.amazonaws.com/Toast/media/info.b6c887b0ecc2b6b16219aa7b0b99a91b.svg',
    className: 'toast__info',
    text: 'Informação',
  },
  warning: {
    img:
      process.env.NODE_ENV === 'development'
        ? warningIcon
        : 'https://besafe-scripts.s3.amazonaws.com/Toast/media/warning.9bbdb2f304bf3510ffe2505f1db75dc9.svg',
    className: 'toast__warning',
    text: 'Alerta',
  },
}
const App: React.FC<IToast> = ({ type, duration, direction, message, color }) => {
  const { img, className, text } = type !== undefined ? TOAST_INFO[type] : TOAST_INFO.success
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (message) {
      setShow(true)
      const timeout: NodeJS.Timeout = setTimeout(() => {
        setShow(false)
      }, duration || 6000)

      return () => clearTimeout(timeout)
    }
  }, [message])

  if (!show) return null

  return (
    <div className='App'>
      <div
        className={classNames('toast', className, {
          toast__top_right: direction === 'top-right',
          toast__top_left: direction === 'top-left',
          toast__bottom_right: direction === 'bottom-right' || !direction,
          toast__bottom_left: direction === 'bottom-left',
        })}
        style={{ background: color }}
        onClick={() => setShow(false)}
      >
        <div className='toast__image'>
          <img src={img} />
        </div>
        <div className='toast__container'>
          <span className='toast__title'>{text}</span>
          <span className='toast__content'>{message}</span>
        </div>
        <div className='toast__close'>
          <span>X</span>
        </div>
      </div>
    </div>
  )
}

export default App
