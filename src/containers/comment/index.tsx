import CommentList from "./sub-components/CommentList";
import CommentCreate from "./sub-components/CommentCreate";
import CommentEdit from "./sub-components/CommentEdit";

const resource = (permissions: any) => {
  return {
    list: <CommentList />,
    create: permissions === 'admin'? <CommentCreate /> : undefined,
    edit: permissions === 'admin'? <CommentEdit /> : undefined,
  };
};

export default resource;
