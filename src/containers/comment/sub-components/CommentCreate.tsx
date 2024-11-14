import { Create, SimpleForm } from "react-admin";
import Input from "@/components/ui/input/Input";
import { RULES } from "@/constants/rules";

const CommentCreate = (props: any) => {
  return (
    <Create redirect="list" {...props}>
      <SimpleForm>
        <Input source="username" label="username" validate={[RULES.notEmpty]} />
      </SimpleForm>
    </Create>
  );
};

export default CommentCreate;
