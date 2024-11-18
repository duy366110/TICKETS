import { useState } from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
import { Drawer } from "@mui/material";
import InputField from "@/components/ui/InputField/InputField";
import { RULES } from "@/constants/rules";

const TicketEdit = (props: any) => {
  const [asideOpen, setAsideOpen] = useState(false);

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  const handleFocus = () => {
    setAsideOpen(true);
  };

  const handleBlur = () => {
    setAsideOpen(false);
  };

  return (
    <Create redirect="list" {...props}>
      <SimpleForm>
        <InputField source="username" label="username" validate={[RULES.notEmpty]} />

        <TextInput
          source="desc"
          label="Description"
          multiline
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <Drawer
          anchor="right"
          open={asideOpen}
          onClose={toggleAside}
          variant="persistent"
        >
          <div style={{ padding: "75px 20px 20px 20px", width: "250px" }}>
            <h3>Thông tin bổ sung</h3>
            <p>Thêm các chi tiết hoặc ghi chú cho bình luận.</p>
          </div>
        </Drawer>
      </SimpleForm>
    </Create>
  );
};

export default TicketEdit;
