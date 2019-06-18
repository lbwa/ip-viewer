import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { detectFromGoogle, normalDetect } from '../request'

export default function App() {
  const [ipFromBlocked, setIpFromBlocked] = useState('')
  const [ipInfoFromNotBlocked, setIpInfoFromNotBlocked] = useState({
    ip: '',
    location: {
      city: ''
    }
  })
  useEffect(() => {
    detectFromGoogle().then(({ origin }) => setIpFromBlocked(origin))
    normalDetect().then(({ location, ip }) =>
      setIpInfoFromNotBlocked({ ip, location })
    )
  }, [])
  const ipCollections = [
    {
      type: 'Google',
      ip: ipFromBlocked
    },
    {
      type: 'Normal',
      ip: ipInfoFromNotBlocked.ip,
      location: {
        ...ipInfoFromNotBlocked.location
      }
    }
  ]
  return (
    <Main className="dark">
      {ipCollections.map(collection => (
        <section className="section" key={collection.type}>
          <Title>From {collection.type}</Title>
          <IP>
            {collection.ip || 'Loading'}
            {collection.location && collection.location.city && (
              <span>&nbsp;{collection.location.city}</span>
            )}
          </IP>
        </section>
      ))}
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
