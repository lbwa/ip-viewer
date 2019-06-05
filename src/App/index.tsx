import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { detectFromGoogle } from '../request'

const DETECT_MAP: {
  [type: string]: () => Promise<{ [key: string]: string }>
} = {
  google: detectFromGoogle
}

function useDetectNetWork(type: string) {
  const [ip, setIP] = useState('')
  useEffect(() => {
    if (DETECT_MAP[type]) {
      DETECT_MAP[type]().then(({ origin }) => setIP(origin))
    }
  })
  return ip
}

export default function App() {
  return (
    <Main className="dark">
      {[useDetectNetWork('google')].map((ip, index) => (
        <section key={index}>
          <h3>From Google</h3>
          <IP>{ip || 'Loading'}</IP>
        </section>
      ))}
    </Main>
  )
}

const Main = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const IP = styled.p`
  text-align: center;
`
