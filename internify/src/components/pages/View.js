import { React } from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { ButtonClear, ButtonOutlined } from "../atoms";
import { ViewPosting } from "../molecules/index";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LinkIcon from "@material-ui/icons/Link";
import { mockJobPosting } from "../../models/mockData";
import "./styles/View.css";

const View = () => {
  return (
    <Grid
      container
      style={{ paddingTop: "1em" }}
      direction="row"
      alignItems="flex-start"
      justify="flex-end"
    >
      {/** Left side button */}
      <Grid item xs={2}>
        <Grid container justify="flex-end">
          <Link to="/profile">
            <ButtonClear startIcon={<ChevronLeft />}>Back</ButtonClear>
          </Link>
        </Grid>
      </Grid>

      {/** Middle Job Posting */}
      <Grid item xs={7}>
        <Container maxWidth="md">
          <ViewPosting data={mockJobPosting} />
        </Container>
      </Grid>

      {/** Right side edditing -> matches as well? */}
      <Grid item xs={3}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="flex-end"
        >
          <div className="view_page_creation_details">
            <div className="view_page_details_list">
              <ul className="view_page_details_list">
                <li>
                  <b>Date created:</b> 05/25/2021
                </li>
                <li>
                  <b>Score: </b>80%
                </li>
              </ul>
            </div>
            <div className="view_page_buttons_list">
              <ButtonOutlined styles={{}} startIcon={<CreateOutlinedIcon />}>
                Edit
              </ButtonOutlined>
              {"    "}
              <ButtonOutlined styles={{}} startIcon={<LinkIcon />}>
                Copy Link
              </ButtonOutlined>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default View;