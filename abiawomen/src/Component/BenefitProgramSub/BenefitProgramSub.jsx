import React from 'react'
import { AlertTriangle } from 'lucide-react';
import BenefitProgramForm from '../BenefitProgramForm/BenefitProgramForm';


export const BenefitProgramSub = () => {
  return (
    <div className='mx-60'>
      <div className="">
        <h1 className="">
          Benefit Program <br /> Subscription
        </h1>
      </div>
      <p className=''>Submit an application to recieve benefits from AWA.</p>

      <div className="">
          <AlertTriangle className="mr-3 text-yellow-600" />
          <p className="text-sm">Only Eligible members can apply for this program.</p>
      </div>
      <BenefitProgramForm/>

    </div>

  )
}
