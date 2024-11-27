import { useState } from "react";
import { Create } from "react-admin";
import { Box } from "@mui/material";
import InputField from "@/components/ui/InputField/InputField";
import EditorField from "@/components/ui/EditorField/EditorField";
import Steppers from "@/components/steppers/Steppers";
import Tabers from "@/components/tabers/Tabers";
import TicketsFormCreacte from "./tickets-form/TickerFormCreate";
import { RULES } from "@/constants/rules";

const TicketCreate = (props: any) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState<Array<string>>([
    "Information",
    "Content",
    "success",
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  const handleCancel = () => {
    console.log("Cancel ticket tab");
  };

  const handleReset = () => {
    console.log("Reset ticket tab");
  };

  const handleSubmit = () => {
    console.log("Submit ticket tab");
  };

  return (
    <Create className="relative" redirect="list" {...props}>
      <Tabers currentTab={currentTab} handleTabChange={handleTabChange} />

      {currentTab === 0 && (
        <TicketsFormCreacte
          handleCancel={handleCancel}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      )}

      {currentTab === 1 && (
        <Steppers
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        >
          <>
            {activeStep === 0 && (
              <div className="grid grid-cols-12 gap-4 w-full">
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputField
                    source="username"
                    label="Username"
                    validate={[RULES.notEmpty]}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputField
                    source="username"
                    label="Username"
                    validate={[RULES.notEmpty]}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputField
                    source="username"
                    label="Username"
                    validate={[RULES.notEmpty]}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputField
                    source="username"
                    label="Username"
                    validate={[RULES.notEmpty]}
                  />
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div className="w-full">
                <EditorField source="content" validate={[RULES.notEmpty]} />
              </div>
            )}
            {activeStep === 2 && (
              <Box>
                <p>Hãy kiểm tra lại thông tin trước khi lưu!</p>
              </Box>
            )}
          </>
        </Steppers>
      )}
    </Create>
  );
};

export default TicketCreate;
