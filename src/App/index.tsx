import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { detectFromGoogle, normalDetect } from '../request'

const DETECT_MAP: {
  [type: string]: () => Promise<{ [key: string]: string }>
} = {
  google: detectFromGoogle,
  normal: normalDetect
}

function useDetectNetWork(type: string) {
  const [ip, setIP] = useState('')
  useEffect(() => {
    if (DETECT_MAP[type]) {
      DETECT_MAP[type]().then(({ origin, ip }) => {
        setIP(origin || ip)
      })
    }
  })
  return {
    ip,
    type
  }
}

export default function App() {
  return (
    <Main className="dark">
      {[useDetectNetWork('google'), useDetectNetWork('normal')].map(
        (ipInfo, index) => (
          <section className="section" key={index}>
            <Title>From {ipInfo.type}</Title>
            <IP>{ipInfo.ip || 'Loading'}</IP>
          </section>
        )
      )}
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .section + .section {
    margin-left: 2rem;
  }
`

const Title = styled.h3`
  text-transform: capitalize;
  text-align: center;
`

const IP = styled.p`
  text-align: center;
`
