import { Create, SimpleForm } from 'react-admin';
import InputField from "@/components/ui/InputField/InputField";
import { RULES } from "@/constants/rules";
import EditorField from "@/components/ui/EditorField/EditorField";

const TicketCreate = (props: any) => {

  return (
    <Create redirect="list" {...props}>
      <SimpleForm>
        <InputField source="username" label="username" validate={[RULES.notEmpty]} />
        <EditorField source="content" validate={[RULES.notEmpty]} />
      </SimpleForm>
    </Create>
  );
};

export default TicketCreate;
