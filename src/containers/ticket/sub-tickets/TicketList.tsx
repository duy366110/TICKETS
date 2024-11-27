import {
  List,
  DatagridConfigurable,
  TextField,
} from "react-admin";
import { useEffect } from "react";
import { DefaultApi  } from "@/data/output/api";
import { FilterComment } from "@/components/filters/Filters";
import { ActionComment } from "@/components/actions/Actions";
import { AsideComment } from "@/components/asides/Asides";

const TicketList = (props: any) => {

  useEffect(() => {
    let callApi = async() => {
      let res = await new DefaultApi().itemsGet();
      console.log("Check log generator openapi");
      console.log(res.data);
    }

    callApi();
  }, [])

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

export default TicketList;
