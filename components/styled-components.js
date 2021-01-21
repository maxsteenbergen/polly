import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled('main')`
  width: 100vw;
  height: 100vh;
  background: hsl(100,80%, 75%);
  display: flex;
  align-items: center;
  overflow: hidden;
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
    z-index: 4;
    & > * {
      width: 100%;
      height: 64px;
      padding-left: 16px;
      opacity: 0.3;
      display: flex;
      align-items: center;
      font-size: 20px;
      & > svg {
        width: 64px;
        height: 64px;
        display: inline-block;
      }
      & > span{
        margin-left: 12px;
        display: none;
        @media(max-width: 768px){
          display: inline-block;
        }
      }
      &.active {
        opacity: 1 !important;
      }
    }
    @media(max-width: 768px){
      z-index: 2;
      width: 100%;
    }
  }
  & > .menuToggle {
    position: absolute;
    bottom: 64px;
    left: 0;
    z-index: 1;
    width: 64px;
    height: 64px;
    @media(min-width: 768px){
      display: none;
    }
    &:first-of-type{
      z-index: 3;
      bottom: 0px;
    }
  }
  
  & > .modeSettings {
    z-index: 1;
    height: 100%; 
    position: absolute;
    top: 0;
    width: 100%;
    user-select: none; 
    display: flex; 
    flex-direction: column;
    justify-content: center;
    left: 160px;
    padding: 10vh 0;
    @media(max-width: 768px){
      background: hsla(0,0%,100%,0.9);
      padding-left: 25vw;
      left: 0;
    }
  }
`

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 30px 60px hsla(100, 30%, 35%, 0.4);
  width: calc(85vmin * 0.75);
  height: 85vmin;
  //max-width: 80vw;
`

export const ContentNode = styled('h1')`
  text-align: center;
  font-size: 8vmin;
  color: hsla(0, 0%, 0%, 0.8);
  user-select: none;
  width: 100%;
  font-weight: 300;
`

export const ClockContainer = styled('svg')`
  width: 33vmin;
  height: 33vmin;
`
