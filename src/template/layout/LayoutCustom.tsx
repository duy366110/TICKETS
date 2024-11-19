import { useState, useEffect } from "react";
import { Layout } from "react-admin";
import { useLocation } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import AppBar from "./AppBar/AppBar";
import Menu from "./Menu";

import AppBarCustom from "@/template/layout/AppBar/AppBarCustom";
import CommentsComponent from "@/components/comments/Comment";

const CustomLayout = ({ children, resource }: any) => {
  const location = useLocation();
  const [detail, setDetail] = useState<boolean>(false);
  const [isCustomAppBar, setIsCustomAppBar] = useState<boolean>(false);

  useEffect(() => {
    if (/^\/tickets\/(\d+|\*)$/.test(location.pathname)) {
      if (location.pathname.includes("create")) {
        setDetail(false);
      }
      setDetail(true);
    } else {
      setDetail(false);
    }

    if(location.pathname.includes("create")) {
      setIsCustomAppBar(true);
    } else {
      setIsCustomAppBar(false);
    }
  }, [location.pathname]);

  return (
    <Layout appBar={isCustomAppBar? AppBarCustom : AppBar} menu={Menu}>
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
