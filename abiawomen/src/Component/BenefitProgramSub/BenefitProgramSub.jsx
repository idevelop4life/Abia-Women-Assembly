import React from 'react'
import { AlertTriangle } from 'lucide-react';
import BenefitProgramForm from '../BenefitProgramForm/BenefitProgramForm';


export const BenefitProgramSub = () => {
  return (
    <div>
        <div className="flex flex-col justify-between my-6 border-l-4 mx-auto">
  <h1 className="text-left text-2xl font-bold text-green-700 mb-2">
    Benefit Program <br /> Subscription
  </h1>
</div>
        <p className='text-center mt-4'>Submit an application to recieve benefits from AWA.</p>

        <div className="flex items-center bg-yellow-100 max-w-xl space-y-6 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md my-4 mx-auto p-6">
            <AlertTriangle className="mr-3 text-yellow-600" />
            <p className="text-sm">Only Eligible members can apply for this program.</p>
        </div>
        <BenefitProgramForm/>

    </div>

  )
}
