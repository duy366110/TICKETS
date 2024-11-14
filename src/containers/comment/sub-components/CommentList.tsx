import {
  List,
  DatagridConfigurable,
  TextField,
  useRecordContext,
} from "react-admin";
import { useEffect } from "react";

const CommentList = (props: any) => {
  const record = useRecordContext();

  useEffect(() => {
    console.log(record);
  }, [record]);

  return (
    <div>
      <List
        {...props}
        sort={{ field: "createdAt", order: "DESC" }}
        perPage={25}
      >
        <DatagridConfigurable rowClick="edit">
          <TextField source="id" label="ID" />
          <TextField source="postId" label="Post Id" />
          <TextField source="content" label="Content" />
        </DatagridConfigurable>
      </List>
    </div>
  );
};

export default CommentList;
