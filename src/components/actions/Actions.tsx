import {
  TopToolbar,
  CreateButton,
  SelectColumnsButton,
  ExportButton,
} from "react-admin";

export const ActionComment = () => {
  return (
    <TopToolbar>
      <CreateButton />
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  );
};
