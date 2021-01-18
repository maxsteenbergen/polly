import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import styled from "styled-components";
import {Duosounds, Letters, LettersAndSounds, Words} from '../resources/dictionary.js'
// import {Pictograms} from '../resources/pictograms.js'
import Slider from 'rc-slider'
import {AnimatePresence, motion} from "framer-motion";
import {
  NumberCircleFive,
  Clock as ClockIcon,
  CheckSquare,
  Square,
  TextT,
  Plus,
  X,
  XCircle,
  DotsThree,
  PlusCircle
} from "phosphor-react";

const Container = styled('main')`
  width: 100vw;
  height: 100vh;
  background: hsl(100,80%, 75%);
  display: flex;
  align-items: center;
  //padding-top: 5vmin;
  justify-content: center;
  & menu {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 96px;
    background: #fff;
    justify-content: center;
    align-items: center;
    & > * {
      width: 64px;
      height: 64px;
      opacity: 0.3;
      &.active {
        opacity: 1 !important;
      }
    }
  }
  & > div {
  }
`

const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 30px 60px hsla(100, 30%, 35%, 0.4);
  width: calc(70vmin * 0.75);
  height: 70vmin;
  max-height: 70vh;
  max-width: 80vw;
`

const ContentNode = styled('h1')`
  text-align: center;
  font-size: 8vmin;
  color: hsla(0, 0%, 0%, 0.8);
  user-select: none;
  width: 100%;
  font-weight: 300;
`

const ClockContainer = styled('svg')`
  width: 33vmin;
  height: 33vmin;
`

const Clock = ({className, style, onClick, hands = [0,0]}) => {
  return <ClockContainer onClick={onClick} viewBox={'0 0 100 100'} style={style} className={className}>
    <g opacity={0.8}>
      <circle cx={50} cy={50} r={48} stroke={'hsl(0,0%,0%)'} strokeWidth={2} fill={'none'}/>
      <circle cx={50} cy={50} r={4} fill={'hsl(0,0%,0%)'}/>
      {/*minute hand*/}
      <motion.line x1={50} y1={50} x2={50} y2={15} stroke={'hsl(0,0%,0%)'} strokeWidth={2} strokeLinecap={'round'}
                   style={{originX: 0.5, originY: 1}} animate={{rotate: hands[0]}}/>
      {/*hour hand*/}
      <motion.line x1={50} y1={50} x2={50} y2={30} stroke={'hsl(0,0%,0%)'} strokeWidth={4} strokeLinecap={'round'}
                   style={{originX: 0.5, originY: 1}} animate={{rotate: hands[1]}}/>
    </g>
    {[...Array(12)].map((nil, i) =>
      <g key={'clockmark_' + i} transform={`translate(50,10) rotate(${(360 / 12) * (i + 1)})`}>
        <text textAnchor={'middle'} fontSize={6} transform={`rotate(-${(360 / 12) * (i + 1)}, 0, -42)`}>{i + 1}</text>
        {/*<text textAnchor={'middle'} fontSize={6} transform={`rotate(-${(360/12)*(i+1)})`}>{i+1}</text>*/}
      </g>
    )}
  </ClockContainer>
}

// const Pictogram = ({src = ''}) => <img style={{position: 'absolute', maxHeight: '40vmin', maxWidth: '40vmin'}} src={`./img/pictograms/${src}.svg`} alt={src} />


export default function Home() {
  const [Content, setContent] = useState('')
  const [MaxNumber, setMaxNumber] = useState(20)
  const [CardState, setCardState] = useState('front')
  const [ActiveDictionary, setActiveDictionary] = useState('Tafels')
  const [ClockHands, setClockHands] = useState([0,0])
  const [TafelSom, setTafelSom] = useState([0,0])
  const [ActiveTafels, setActiveTafels] = useState([1])

  const toggleTafel = (num) => {
    let tafels = [...ActiveTafels]
    if(tafels.includes(num))
      tafels.splice(tafels.findIndex(t => t === num), 1)
    else
      tafels.push(num)

    setActiveTafels(tafels)
    changeCharacter()
  }

  const Marks = {
    10: {style: {fontSize: 24, color: '#000', transform: 'translate(10px, -10px)'}, label:10},
    20: {style: {fontSize: 24, color: '#000', transform: 'translate(10px, -10px)'}, label:20},
    30: {style: {fontSize: 24, color: '#000', transform: 'translate(10px, -10px)'}, label:30},
    50: {style: {fontSize: 24, color: '#000', transform: 'translate(10px, -10px)'}, label:50},
    100: {style: {fontSize: 24, color: '#000', transform: 'translate(10px, -10px)'}, label:100},
  };

  const CardVariants = {
    back: {
      rotateZ: -8,
      translateY: 0,
      zIndex: 0
    },
    front: {
      rotateZ: 0,
      translateY: 0,
      zIndex: 1
    }
  }


  const changeCharacter = () => {
    if(typeof ActiveDictionary === 'string' && ActiveDictionary === 'Numbers'){
      const min = 0;
      const randomNumber = Math.floor(Math.random() * (MaxNumber - min ) + min)
      setContent(randomNumber)
    }
    else if (typeof ActiveDictionary === 'string' && ActiveDictionary === 'Clocks'){
      const m = Math.floor(Math.random() * 4)
      const h = Math.floor(Math.random() * 12)
      const MinuteHandRotation = (360/4)*m
      const HourHandRotation = (360/12)* h + (30 * (MinuteHandRotation/360))
      setClockHands([MinuteHandRotation, HourHandRotation])
    }

    else if (typeof ActiveDictionary === 'string' && ActiveDictionary === 'Tafels'){
      const LeftHand = Math.max(1, Math.floor(Math.random() * 10))
      const RightHand = ActiveTafels[Math.floor(Math.random() * ActiveTafels.length)]

      /*
      if (Math.random() > 0.5) setTafelSom([LeftHand, RightHand])
      else setTafelSom([RightHand, LeftHand])
       */
      setTafelSom([LeftHand, RightHand])
    }

    else {
      const randomIndex = Math.floor(Math.random() * (ActiveDictionary.length - 1));
      setContent(ActiveDictionary[randomIndex])
    }
    setCardState( CardState === 'front' ? 'back' : 'front')
  }

  useEffect(changeCharacter,[ActiveDictionary, MaxNumber])

  const getSamenvoegenSom = () => {
    const num = Math.floor(Math.random() * 10)
    return Math.random() > 0.5 ?
      <>{num} <Plus style={{width: 64, height: 64}}/> {MaxNumber - num} </>
      :
      <>{MaxNumber-10+num} <Plus style={{width: 64, height: 64}}/> <DotsThree style={{width: 64, height: 64}} /> = {MaxNumber}</>
  }
  return (
    <Container>

      <Head>
        <title>Polly - Flash cards for toddlers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.menu>
        <TextT className={ActiveDictionary === Letters ? 'active' : null} onClick={()=>{setActiveDictionary(Letters)}} alt="Letters" />
        <AnimatePresence>
        {
          typeof ActiveDictionary === 'object' &&
            <>
              <motion.img initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 0.3}} exit={{ height: 0, opacity: 0}} className={ActiveDictionary === Duosounds  ? 'active' : null} onClick={()=>{setActiveDictionary(Duosounds)}} alt="Letters" src={'/img/duo.svg'} />
              <motion.img initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 0.3}} exit={{ height: 0, opacity: 0}} className={ActiveDictionary === LettersAndSounds ? 'active' : null} onClick={()=>{setActiveDictionary(LettersAndSounds)}} alt="Dubbelklanken" src={'/img/letter+duo.svg'} />
              <motion.img initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 0.3}} exit={{ height: 0, opacity: 0}} className={ActiveDictionary === Words ? 'active' : null} onClick={()=>{setActiveDictionary(Words)}} alt="Woorden" src={'/img/word.svg'} />
            </>
        }
        </AnimatePresence>
        <NumberCircleFive className={ActiveDictionary === 'Numbers' ? 'active' : null} onClick={()=>{setActiveDictionary('Numbers')}} alt="Getallen" src={'/img/numbers.svg'} />
        {/*<img className={ActiveDictionary === Pictograms ? 'active' : null} onClick={()=>{setActiveDictionary(Pictograms)}} alt="Pictogrammen" src={`/img/pictograms/${Pictograms[0]}.svg`} />*/}
        <XCircle className={ActiveDictionary === 'Tafels' ? 'active' : null} onClick={()=>{setActiveDictionary('Tafels')}} alt="Tafels"  />
        <PlusCircle className={ActiveDictionary === 'Samenvoegen' ? 'active' : null} onClick={()=>{setActiveDictionary('Samenvoegen')}} alt="Samenvoegen"  />
        <ClockIcon className={ActiveDictionary === 'Clocks' ? 'active' : null}  onClick={()=>{setActiveDictionary('Clocks')}} alt="Klokken"/>
      </motion.menu>

      {(ActiveDictionary === 'Numbers' || ActiveDictionary === 'Tafels' || ActiveDictionary === 'Samenvoegen') &&
      <div style={{width: 400, height: 400, position: 'absolute', top: 'calc(50% - 200px)', left: 160, userSelect: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        { ActiveDictionary !== 'Tafels' &&
          <Slider
            reverse
            vertical
            dots
            min={10}
            marks={Marks}
            step={10}
            onChange={v => setMaxNumber(v)}
            defaultValue={MaxNumber}
            style={{ color: "red"}}
          />
        }
        { ActiveDictionary === "Tafels" &&
          [...Array(10)].map((o, index) =>
            <div key={"tafel_van" + (index+1)} >
              { ActiveTafels.includes(index+1) ? <CheckSquare style={{width: 32, height: 32}} onClick={()=>toggleTafel(index+1)}/> : <Square style={{width: 32, height: 32}} onClick={()=>toggleTafel(index+1)}/> }
              <span style={{position: 'relative', top: -5, right:-5, fontSize: 16}}>{index+1}</span>
            </div>
          )
        }
      </div>
      }

      <Card onClick={changeCharacter} style={{originY: 1, position: 'absolute'}} variants={CardVariants} animate={CardState === 'front' ? 'back' : 'front'} initial={'visible'}>
        { ActiveDictionary === 'Clocks' && <Clock hands={ClockHands} /> }
        {/*{ ActiveDictionary === Pictograms &&  <AnimatePresence ><Pictogram src={Content} /> </AnimatePresence >}*/}
        { (typeof ActiveDictionary === 'object' || ActiveDictionary === 'Numbers') && <ContentNode>{Content}</ContentNode>}
        { ActiveDictionary === 'Tafels' && <ContentNode>{TafelSom[0]} <X style={{width: 64, height: 64}} /> {TafelSom[1]}</ContentNode> }
        { ActiveDictionary === 'Samenvoegen' && <ContentNode>{getSamenvoegenSom()}</ContentNode> }
      </Card>

      <Card onClick={changeCharacter} style={{originY: 1}} variants={CardVariants} animate={CardState} initial={'hidden'}>
        { ActiveDictionary === 'Clocks' && <Clock hands={ClockHands} /> }
        {/*{ ActiveDictionary === Pictograms &&  <AnimatePresence ><Pictogram src={Content} /> </AnimatePresence >}*/}
        { (typeof ActiveDictionary === 'object' || ActiveDictionary === 'Numbers') && <ContentNode>{Content}</ContentNode>}
        { ActiveDictionary === 'Tafels' &&  <ContentNode>{TafelSom[0]} <X style={{width: 64, height: 64}} /> {TafelSom[1]}</ContentNode> }
        { ActiveDictionary === 'Samenvoegen' && <ContentNode>{getSamenvoegenSom()}</ContentNode> }
      </Card>

    </Container>
  )
}
