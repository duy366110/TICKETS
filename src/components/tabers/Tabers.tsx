import { Button, Tabs, Tab, Typography } from "@mui/material";

interface TabersProps {
    currentTab: number;
    handleTabChange: (event: React.SyntheticEvent, newTab: number) => void;
}

const Tabers = (props: TabersProps) => {
  return (
    <Tabs
      value={props.currentTab}
      onChange={props.handleTabChange}
      indicatorColor="primary"
    >
      <Tab label="Tickets" />
      <Tab label="Process" />
    </Tabs>
  );
};

export default Tabers;
