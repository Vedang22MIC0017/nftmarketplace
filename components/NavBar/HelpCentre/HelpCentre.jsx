import React from 'react'
import Link from "next/link";
import Style from './HelpCentre.module.css'


const HelpCentre = ({ isFooter }) => {
  const helpcenter=[
    {
      name:"About",
      link:"about",
    },
    {
      name:"Contact Us",
      link:"contact",
    },
    {
      name:"Sign Up",
      link:"signup",
    },
    {
      name:"Sign In",
      link:"signin",
    },
    {
      name:"Subscription",
      link:"subscription",
    },
  ]
  return (
    <div className={isFooter ? Style.helpCentre_box_footer : Style.helpCentre_box}>
      {
        helpcenter.map((el, i) => (
          <div className={Style.helpCentre} key={i}>
            <Link href={{pathname: `/${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default HelpCentre