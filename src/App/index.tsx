import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LinearProgress from '@material/react-linear-progress'
import './index.sass'
import { fromGoogle, fromUniversal } from '../request'

export default function App() {
  const [withBlocked, setWithBlocked] = useState('')
  const [withoutBlocked, setWithoutBlocked] = useState('')
  const [isDone, setDone] = useState<boolean[]>([])
  useEffect(() => {
    fromGoogle()
      .then(({ origin }) => setWithBlocked(origin))
      .finally(() => setDone(prev => prev.concat(true)))
    fromUniversal()
      .then(({ ip }) => setWithoutBlocked(ip))
      .finally(() => setDone(prev => prev.concat(true)))
  }, [])
  const ips = [
    {
      type: 'Google',
      ip: withBlocked
    },
    {
      type: 'Universal',
      ip: withoutBlocked
    }
  ]
  return (
    <>
      <LinearProgress indeterminate closed={isDone.length >= 2} />
      <Main className='dark'>
        {ips.map(collection => (
          <section className='section' key={collection.type}>
            <Title>From {collection.type}</Title>
            <IP>
              {collection.ip || (isDone.length >= 2 ? 'Failed' : 'Loading')}
            </IP>
          </section>
        ))}
      </Main>
    </>
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
