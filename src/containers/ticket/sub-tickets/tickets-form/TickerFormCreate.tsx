import { useState } from "react";
import { SimpleForm, TextInput } from "react-admin";
import { Typography } from "@mui/material";
import InputField from "@/components/ui/InputField/InputField";
import EditorField from "@/components/ui/EditorField/EditorField";
import ToolBarActionFormCreate from "../tickets-utils/ToolBarActionFormCreate";

const TicketsFormCreacte = (props: any) => {
  const [formKey, setFormKey] = useState(Date.now());

  return (
    <SimpleForm
      key={formKey}
      toolbar={
        <ToolBarActionFormCreate
          handleCancel={props.handleCancel}
          handleReset={props.handleReset}
          handleSubmit={props.handleSubmit}
        />
      }
      mode="onChange"
    >
      <Typography variant="h6">Ticket information</Typography>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <InputField source="username" label="Username" validate={[]} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <InputField source="username" label="Username" validate={[]} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <InputField source="username" label="Username" validate={[]} />
        </div>
        <div className="col-span-12">
          <EditorField source="content" validate={[]} />
        </div>
      </div>
    </SimpleForm>
  );
};

export default TicketsFormCreacte;
