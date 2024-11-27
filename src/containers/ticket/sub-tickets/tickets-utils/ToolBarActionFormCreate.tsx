import { Button } from "@mui/material";
import { SaveButton } from "react-admin";

const ToolBarActionFormCreate = (props: any) => {
  return (
    <div className="flex items-center justify-between p-4">
      <Button variant="outlined" onClick={props.handleCancel}>
        cancel
      </Button>
      <div className="flex gap-2">
        {false && (
          <SaveButton
            label="Ok"
            disabled={false}
            onClick={props.handleSubmit}
          />
        )}
        
        <Button variant="outlined" color="error" onClick={props.handleReset}>
          Reset
        </Button>

        <SaveButton
          label="Submit"
          disabled={!false}
          onClick={props.handleSubmit}
        />
      </div>
    </div>
  );
};

export default ToolBarActionFormCreate;
