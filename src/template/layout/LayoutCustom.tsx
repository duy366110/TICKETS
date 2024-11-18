import { useState, useEffect } from "react";
import { Layout } from "react-admin";
import { useLocation } from "react-router-dom";
import AppBar from "./AppBar";
import Menu from "./Menu";
import CommentsComponent from "@/components/comments/Comment";
import { Grid, Container } from "@mui/material";

const CustomLayout = ({ children, resource }: any) => {
  const location = useLocation();
  const [detail, setDetail] = useState<boolean>(false);

  useEffect(() => {
    if (/^\/tickets\/(\d+|\*)$/.test(location.pathname)) {
      if (location.pathname.includes("create")) {
        setDetail(false);
      }
      setDetail(true);
    } else {
      setDetail(false);
    }

    console.log(resource);
  }, [location.pathname]);

  return (
    <Layout appBar={AppBar} menu={Menu}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={detail ? 6 : 12}>
            {children}
          </Grid>
          {detail && (
            <Grid item xs={detail ? 6 : 0}>
             {location.pathname.includes('tickets') && (
              <CommentsComponent />
             )}
            </Grid>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default CustomLayout;
