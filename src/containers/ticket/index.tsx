import TicketList from "./sub-tickets/TicketList";
import TicketCreate from "./sub-tickets/TicketCreate";
import TicketEdit from "./sub-tickets/TicketEdit";

const resource = (permissions: any) => {
  return {
    list: <TicketList />,
    create: permissions === 'admin'? <TicketCreate /> : undefined,
    edit: permissions === 'admin'? <TicketEdit /> : undefined,
  };
};

export default resource;
