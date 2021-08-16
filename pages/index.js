import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import { Duosounds, Letters, LettersAndSounds, Words } from '../resources/dictionary.js'
import Slider from 'rc-slider'
import { motion } from "framer-motion";
import {
  NumberCircleFive,
  Clock as ClockIcon,
  CheckSquare,
  Square,
  TextT,
  Plus,
  X,
  XCircle,
  List,
  DotsThree,
  PlusCircle, GearSix
} from "phosphor-react";

import {Container, Card, ContentNode } from "../components/styled-components";
import { Clock } from "../components/Clock";


export default function Home() {
  const [Content, setContent] = useState('')
  const [MaxNumber, setMaxNumber] = useState(20)
  const [CardState, setCardState] = useState('front')
  const [ActiveDictionary, setActiveDictionary] = useState('Tafels')
  const [ClockHands, setClockHands] = useState([0,0])
  const [TafelSom, setTafelSom] = useState([0,0])
  const [ActiveTafels, setActiveTafels] = useState([1])
  const [SettingsOpen, setSettingsOpen] = useState(false)
  const [MenuOpen, setMenuOpen] = useState(true)
  const [IsMobile] = useState(true)

  // useEffect(()=>{
  //   window.addEventListener(('resize'), ()=>{
  //     setIsMobile(window.innerWidth < 768)
  //   })
  //   setIsMobile(window.innerWidth < 768)
  // },[])


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

  //--------------------------------------------------------------------------------------------------------------------

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
      setTafelSom([LeftHand, RightHand])
    }

    else {
      const randomIndex = Math.floor(Math.random() * (ActiveDictionary.length - 1));
      setContent(ActiveDictionary[randomIndex])
    }
    setCardState( CardState === 'front' ? 'back' : 'front')
  }

  //--------------------------------------------------------------------------------------------------------------------

  const toggleTafel = (e, num) => {
    e.stopPropagation()
    let tafels = [...ActiveTafels]
    if(tafels.includes(num))
      tafels.splice(tafels.findIndex(t => t === num), 1)
    else
      tafels.push(num)

    setActiveTafels(tafels)
    changeCharacter()
  }

  //--------------------------------------------------------------------------------------------------------------------

  const getSamenvoegenSom = () => {
    const num = Math.floor(Math.random() * 10)
    return Math.random() > 0.5 ?
      <>{num} <Plus style={{width: "8vmin", height: "8vmin"}}/> {MaxNumber - num} </>
      :
      <>{MaxNumber-10+num} <Plus style={{width: "8vmin", height: "8vmin"}}/> <DotsThree style={{width: "8vmin", height: "8vmin"}} /> = {MaxNumber}</>
  }

  //--------------------------------------------------------------------------------------------------------------------

  useEffect(changeCharacter, [ActiveDictionary, MaxNumber])

  // useEffect(()=>{
  //   if(MenuOpen && !IsMobile) {
  //     setMenuOpen(false)
  //     setSettingsOpen(false)
  //   }
  // },[ActiveDictionary])

  // useEffect(()=>{
  //   if(SettingsOpen && IsMobile) setMenuOpen(false)
  // }, [SettingsOpen])


  //--------------------------------------------------------------------------------------------------------------------

  return (
    <Container>
      <Head>
        <title>Polly - Flitsen voor basisschoolleerlingen</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet='utf-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
        <meta name='description' content='Description'/>
        <meta name='keywords' content='Keywords'/>
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json"/>
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16'/>
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'/>
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB"/>
      </Head>

      <Card onClick={changeCharacter} style={{originY: 1, position: 'absolute'}} variants={CardVariants} animate={CardState === 'front' ? 'back' : 'front'} initial={'visible'} />

      <Card onClick={changeCharacter} style={{originY: 1}} variants={CardVariants} animate={CardState} initial={'hidden'} />

      <div style={{position: 'absolute', zIndex: 2}}>
        { ActiveDictionary === 'Clocks' && <Clock hands={ClockHands} /> }
        {/*{ ActiveDictionary === Pictograms &&  <AnimatePresence ><Pictogram src={Content} /> </AnimatePresence >}*/}
        { (typeof ActiveDictionary === 'object' || ActiveDictionary === 'Numbers') && <ContentNode>{Content}</ContentNode>}
        { ActiveDictionary === 'Tafels' &&  <ContentNode>{TafelSom[0]} <X style={{width: "8vmin", height: "8vmin"}} /> {TafelSom[1]}</ContentNode> }
        { ActiveDictionary === 'Samenvoegen' && <ContentNode>{getSamenvoegenSom()}</ContentNode> }
      </div>

      {(ActiveDictionary === 'Numbers' || ActiveDictionary === 'Tafels' || ActiveDictionary === 'Samenvoegen') &&
        <motion.div className={'modeSettings'} animate={IsMobile ? {x: SettingsOpen ? 0 : "-200%"} : {}}>

          { ActiveDictionary === "Tafels" ?
            <div>
              <h1>Oefen de tafels van...</h1>
              {[...Array(10)].map((o, index) =>
                <div key={"tafel_van" + (index+1)} >
                  { ActiveTafels.includes(index+1) ?
                    <CheckSquare style={{width: 32, height: 32}} onClick={(e)=>toggleTafel(e, index+1)}/>
                    :
                    <Square style={{width: 32, height: 32}} onClick={(e)=>toggleTafel(e, index+1)}/>
                  }
                  <span style={{position: 'relative', top: -5, right:-5, fontSize: 16}}>{index+1}</span>
                </div>
              )}
            </div>

            :

            <div style={{height: "100%"}}>
              <h1>Oefen de getallen tot...</h1>
              <Slider
                reverse
                vertical
                dots
                min={10}
                marks={Marks}
                step={10}
                onChange={v => setMaxNumber(v)}
                defaultValue={MaxNumber}
                style={{ color: "red", height: '75%'}}
              />
            </div>

          }
        </motion.div>
      }

      <motion.menu animate={{x: IsMobile ? MenuOpen ? 0 : '-200%' : 0}}>
        <div className={ActiveDictionary === Letters ? 'active' : null} onClick={()=>{setActiveDictionary(Letters)}}>
          <TextT alt="Letters" />
          <span>Letters</span>
        </div>

        <div className={ActiveDictionary === Duosounds  ? 'active' : null} onClick={()=>{setActiveDictionary(Duosounds)}}>
          <img alt="Letters" src={'/img/duo.svg'} style={{height: '100%'}}/>
          <span>Dubbelklanken</span>
        </div>
        <div className={ActiveDictionary === LettersAndSounds ? 'active' : null} onClick={()=>{setActiveDictionary(LettersAndSounds)}}>
          <img alt="Letters & Dubbelklanken" src={'/img/letter+duo.svg'} style={{height: '100%'}}/>
          <span>Letters & Dubbelklanken</span>
        </div>
        <div className={ActiveDictionary === Words ? 'active' : null} onClick={()=>{setActiveDictionary(Words)}}>
          <img alt="Woorden" src={'/img/word.svg'} style={{height: '100%'}}/>
          <span>Woorden</span>
        </div>

        <div className={ActiveDictionary === 'Numbers' ? 'active' : null} onClick={()=>{setActiveDictionary('Numbers')}} >
          <NumberCircleFive alt="Getallen" src={'/img/numbers.svg'} />
          <span>Getallen</span>
        </div>
        <div className={ActiveDictionary === 'Tafels' ? 'active' : null} onClick={()=>{setActiveDictionary('Tafels')}} >
          <XCircle alt="Tafels"  />
          <span>Tafels</span>
        </div>
        <div className={ActiveDictionary === 'Samenvoegen' ? 'active' : null} onClick={()=>{setActiveDictionary('Samenvoegen')}} >
          <PlusCircle alt="Samenvoegen"  />
          <span>Samenvoegen</span>
        </div>
        <div className={ActiveDictionary === 'Clocks' ? 'active' : null}  onClick={()=>{setActiveDictionary('Clocks')}} >
          <ClockIcon alt="Klokkijken"/>
          <span>Klokkijken</span>
        </div>
      </motion.menu>

      {!SettingsOpen &&
        <List className={'menuToggle'} onClick={()=>{setMenuOpen(!MenuOpen)}}/>
      }
      {
        (ActiveDictionary === "Samenvoegen" || ActiveDictionary === "Tafels" || ActiveDictionary === "Numbers") && !MenuOpen &&
        <GearSix className={'menuToggle offset'}  onClick={()=>{setSettingsOpen(!SettingsOpen)}}/>
      }

    </Container>
  )
}
