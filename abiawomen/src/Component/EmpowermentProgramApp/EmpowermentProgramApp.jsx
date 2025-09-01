import { AlertTriangle } from "lucide-react";
import EmpowermentOpportunityForm from "../EmpowermentOpportunityForm/EmpowermentOpportunityForm";

export const EmpowermentProgramApp = () => {
  return (
    <div className="mx-60">
      <div className="">
        <h1 className=" font-bold text-green-800 text-4xl">
          Empowerment Opportunity
        </h1>
      </div>
      <p className="">The program is designed to uplift, educate, and equip members</p>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md my-4 mx-auto p-6">
        <AlertTriangle className="mr-3 text-yellow-600" />
        <p className="text-sm mb-4">
          <strong>Important: </strong> Only eligible members can apply for this program. 
          Please fill out the form below to help us understand your skills and match you with the right opportunity.
        </p>

        <p className="text-sm mb-4">
          <strong>Evaluation Interview/Screening: </strong> may be required before final selection, 
          based on volume of applications.
        </p>

        <p className="text-sm mb-4">
          <strong>Digital Access (where applicable): </strong> for virtual trainings, access to a smartphone or computer with internet

        </p>

      </div>

      <EmpowermentOpportunityForm />
    </div>
  );
};
