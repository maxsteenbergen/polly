import {useEffect,useState,useRef} from 'react'
import Head from 'next/head'
import styled from "styled-components";
import baffle from "baffle"
import {Words, Duosounds, Letters} from '../resources/dictionary.js'

const Container = styled('main')`
  width: 100vw;
  height: 100vh;
  background: hsl(100,80%, 75%);
  & menu {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    height: 48px;
    width: 100%;
    justify-content: center;
    & img {
     width: 100px;
     opacity: 0.3;
     &.active {
      opacity: 1;
     }
    }
  }
    & div {
  display: flex;
  align-items: center;
  justify-content: center;
    width: 100%;
    height: 100%;
    }
`
const ContentNode = styled('h1')`
  text-align: center;
  font-size: 15vmax;
  color: hsla(0,0%,0%,0.8);
  user-select: none;
  width: 100%;
  cursor: pointer;
  font-weight: 300;
`

export default function Home() {
  const ContentRef = useRef(null)
  const [Content, setContent] = useState('')
  const [ActiveDictionary, setActiveDictionary] = useState(Words)

  useEffect(()=>{
    baffle(ContentRef.current)
      .set({characters: '░▒▓!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_'})
      .reveal(5000);
  },[Content])

  const changeCharacter = () => {
    const randomIndex = Math.floor(Math.random() * (ActiveDictionary.length - 1));
    setContent(ActiveDictionary[randomIndex])
  }
  useEffect(changeCharacter,[ActiveDictionary])

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <menu>
        <img className={ActiveDictionary === Letters ? 'active' : null} onClick={()=>{setActiveDictionary(Letters)}} alt="Woorden" src={'/img/letter.svg'} />
        <img className={ActiveDictionary === Duosounds  ? 'active' : null} onClick={()=>{setActiveDictionary(Duosounds)}} alt="Letters" src={'/img/duo.svg'} />
        <img className={ActiveDictionary !== Letters && ActiveDictionary !== Duosounds && ActiveDictionary !== Words ? 'active' : null} onClick={()=>{setActiveDictionary([...Letters, ...Duosounds])}} alt="Dubbelklanken" src={'/img/letter+duo.svg'} />
        <img className={ActiveDictionary === Words ? 'active' : null} onClick={()=>{setActiveDictionary(Words)}} alt="Letters en dubbelklanken" src={'/img/word.svg'} />
      </menu>
      <div onClick={changeCharacter} >
        <ContentNode ref={ContentRef}>{Content}</ContentNode>
      </div>

    </Container>
  )
}
