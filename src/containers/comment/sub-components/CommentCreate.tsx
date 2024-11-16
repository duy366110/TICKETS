import { Create, SimpleForm } from 'react-admin';
import InputField from "@/components/ui/InputField/InputField";
import { RULES } from "@/constants/rules";
import EditorField from "@/components/ui/EditorField/EditorField";
import { required, regex } from 'react-admin';

const CommentCreate = (props: any) => {

  return (
    <Create redirect="list" {...props}>
      <SimpleForm>
        <InputField source="username" label="username" validate={[RULES.notEmpty]} />
        <EditorField source="content" validate={required("Not empty")} />
      </SimpleForm>
    </Create>
  );
};

export default CommentCreate;
