import { Create, SimpleForm } from 'react-admin';
import Input from "@/components/ui/input/Input";
import { RULES } from "@/constants/rules";
import CKEditorComponent from "@/components/ui/CKEditorField/Editor";

const CommentCreate = (props: any) => {

  return (
    <Create redirect="list" {...props}>
      <SimpleForm>
        <Input source="username" label="username" validate={[RULES.notEmpty]} />
        <CKEditorComponent source="content"  />
      </SimpleForm>
    </Create>
  );
};

export default CommentCreate;
