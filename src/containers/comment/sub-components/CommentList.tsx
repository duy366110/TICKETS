import {
  List,
  DatagridConfigurable,
  TextField,
  useRecordContext,
} from "react-admin";
import { useEffect } from "react";
import { FilterComment } from "@/components/filters/Filters";
import { ActionComment } from "@/components/actions/Actions";
import { AsideComment } from "@/components/asides/Asides";

const CommentList = (props: any) => {
  const record = useRecordContext();

  useEffect(() => {
    console.log(record);
  }, [record]);

  return (
    <List
      {...props}
      filters={true ? FilterComment : undefined}
      sort={{ field: "content", order: "DESC" }}
      aside={<AsideComment />}
      actions={<ActionComment />}
      perPage={25}
      className="custom-list"
    >
      <DatagridConfigurable rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="postId" label="Post Id" />
        <TextField source="content" label="Content" />
      </DatagridConfigurable>
    </List>
  );
};

export default CommentList;
