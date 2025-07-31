import React from "react";
import { AlertTriangle } from "lucide-react";
import BenefitProgramForm from "../BenefitProgramForm/BenefitProgramForm";

export const EmpowermentProgramApp = () => {
  return (
    <div className="mx-60">
      <div className="">
        <h1 className=" font-bold text-green-700 text-6xl">
          Benefit <br /> Programs
        </h1>
      </div>
      <p className="">Submit an application to recieve benefits from AWA.</p>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md my-4 mx-auto p-6">
        <AlertTriangle className="mr-3 text-yellow-600" />
        <p className="text-sm">
          Only Eligible members can apply for this program.
        </p>
      </div>
      <BenefitProgramForm />
    </div>
  );
};
