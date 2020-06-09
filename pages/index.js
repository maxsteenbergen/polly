import {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import styled from "styled-components";
import baffle from "baffle"
import {Duosounds, Letters, LettersAndSounds, Words} from '../resources/dictionary.js'
import Slider from 'rc-slider'


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
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`
const ContentNode = styled('h1')`
  text-align: center;
  font-size: 15vmax;
  color: hsla(0,0%,0%,0.8);
  user-select: none;
  width: 100%;
  font-weight: 300;
`

export default function Home() {
  const ContentRef = useRef(null)
  const [Content, setContent] = useState('')
  const [MaxNumber, setMaxNumber] = useState(20)
  const [ActiveDictionary, setActiveDictionary] = useState(Words)

  useEffect(()=>{
    baffle(ContentRef.current)
      .set({characters: '░▒▓!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_'})
      .start()
      .reveal(100,200);
  },[Content])

  const changeCharacter = () => {
    if(typeof ActiveDictionary === 'string' && ActiveDictionary === 'Numbers'){
      const min = 0;
      const randomNumber = Math.floor(Math.random() * (MaxNumber - min ) + min)
      setContent(randomNumber)
    }
    else {
      const randomIndex = Math.floor(Math.random() * (ActiveDictionary.length - 1));
      setContent(ActiveDictionary[randomIndex])
    }

  }
  useEffect(changeCharacter,[ActiveDictionary, MaxNumber])

  const marks = {
    0: {style: {fontSize: 16,}, label:0},
    10: {style: {fontSize: 16,}, label:10},
    20: {style: {fontSize: 16,}, label:20},
    30: {style: {fontSize: 16,}, label:30},
    50: {style: {fontSize: 16,}, label:50},
    100: {style: {fontSize: 16,}, label:100},
  };
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <menu>
        <img className={ActiveDictionary === Letters ? 'active' : null} onClick={()=>{setActiveDictionary(Letters)}} alt="Woorden" src={'/img/letter.svg'} />
        <img className={ActiveDictionary === Duosounds  ? 'active' : null} onClick={()=>{setActiveDictionary(Duosounds)}} alt="Letters" src={'/img/duo.svg'} />
        <img className={ActiveDictionary === LettersAndSounds ? 'active' : null} onClick={()=>{setActiveDictionary(LettersAndSounds)}} alt="Dubbelklanken" src={'/img/letter+duo.svg'} />
        <img className={ActiveDictionary === Words ? 'active' : null} onClick={()=>{setActiveDictionary(Words)}} alt="Letters en dubbelklanken" src={'/img/word.svg'} />
        <img className={ActiveDictionary === 'Numbers' ? 'active' : null} onClick={()=>{setActiveDictionary('Numbers')}} alt="Letters en dubbelklanken" src={'/img/numbers.svg'} />
      </menu>
      {ActiveDictionary === 'Numbers' &&
      <div style={{width: 400, marginTop: 50, height: 24, position: 'absolute', left: '50%', transform: 'translate(-50%)', userSelect: 'none'}}>
        <Slider dots min={-10} marks={marks} step={10} onChange={v=>setMaxNumber(v)} defaultValue={MaxNumber}/>
      </div>
      }
      <div onClick={changeCharacter} >
        <ContentNode ref={ContentRef}>{Content}</ContentNode>
      </div>

    </Container>
  )
}
