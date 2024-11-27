import { ReactNode, useState } from "react";
import { SimpleForm, SaveButton, useNotify } from "react-admin";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

import StepperToolbar from "./sup-steppers/StepperToolBar";

interface SteppersProps {
  children?: ReactNode;
  activeStep: number;
  steps: Array<string>;
  setActiveStep: (params?: any) => any;
}

const Steppers = (props: SteppersProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const notify = useNotify();


  const validateStep = async () => {
    const stepErrors: string[] = [];

    if (props.activeStep === 0) {
      const usernameField = document.querySelector<HTMLInputElement>(
        'input[name="username"]',
      );
      if (!usernameField?.value) {
        stepErrors.push("Username không được để trống.");
      }
    }

    if (props.activeStep === 1) {
      const contentField = document.querySelector<HTMLTextAreaElement>(
        'textarea[name="content"]',
      );
      if (!contentField?.value) {
        stepErrors.push("Content không được để trống.");
      }
    }

    setErrors(stepErrors);
    if (stepErrors.length > 0) {
      notify("Vui lòng kiểm tra lại thông tin.", { type: "warning" });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    // const isValid = await validateStep();
    // if (isValid) {
    props.setActiveStep((prev: any) => prev + 1);
    // }
  };

  const handleBack = () => {
    setErrors([]);
    props.setActiveStep((prev: any) => prev - 1);
  };

  return (
    <SimpleForm
      toolbar={
        <StepperToolbar
          steps={props.steps}
          activeStep={props.activeStep}
          handleBack={handleBack}
          handleNext={handleNext} />
      }
    >
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stepper activeStep={props.activeStep}>
          {props.steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {props.children}

      {errors.length > 0 && (
        <Box sx={{ color: "red", mt: 2 }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Box>
      )}


      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {props.activeStep === props.steps.length - 1 && (
          <Box>
            <SaveButton label="Lưu" />
          </Box>
        )}
      </Box>
    </SimpleForm>
  );
};

export default Steppers;
