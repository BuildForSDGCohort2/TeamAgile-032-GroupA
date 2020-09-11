import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import Post from "./Post";
import LatestOrders from "./RecentFirstRespondents";
import LatestProducts from "./RecentEmergencyRequest";
import FirstRespondents from "./FirstRespondents";
import Emergency from "./Emergency";
import TotalUsers from "./TotalUsers";
import Crime from "./Crime";
import TrafficByDevice from "./TrafficByDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Post />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Emergency />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Crime />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <FirstRespondents />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
