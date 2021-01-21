import React from "react";
import {motion} from "framer-motion";
import {ClockContainer} from "./styled-components";

export const Clock = ({className, style, onClick, hands = [0,0]}) => {
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