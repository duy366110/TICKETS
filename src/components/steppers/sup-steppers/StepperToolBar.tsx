import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { ReactNode } from "react";

interface StepperToolbarProps {
    children?: ReactNode;
    activeStep: number;
    steps: Array<string>;
    handleBack: () => void;
    handleNext: () => void;
}

const StepperToolbar = (props?: StepperToolbarProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}
    >
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/tickets")}
      >
        Cancel
      </Button>

      {/* Nút Lưu */}
      <div className="">
        <Button
          disabled={props?.activeStep === 0}
          onClick={props?.handleBack}
          variant="contained"
          color="secondary"
        >
          Previous
        </Button>
        {props?.activeStep < props?.steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={props?.handleNext}
            sx={{ ml: 2 }}
          >
            Next
          </Button>
        )}
      </div>
    </Box>
  );
};

export default StepperToolbar;
