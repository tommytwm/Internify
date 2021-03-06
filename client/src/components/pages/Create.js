import React, { useState, useEffect } from "react";
import { CreateJobHeader, ContactDetails, TechRequirements, JobDetail, Review } from "./CreateJobPosting/index";
import Feedback from "../organisms/Feedback";
import { ButtonClear, ButtonFilled } from "../atoms/index";
import RegisteredKeys from "../molecules/RegisteredKeys";
import { Container, makeStyles, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { ChevronLeft } from "@material-ui/icons";
import { mockJobDetailData, chipsList, mockTechStackData, currStep } from "../../models/mockData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getStudents } from "../../store/actions/studentActions";
import { addJobsData, resetKey, updateRegKeys, setKey, resetJob } from "../../store/actions/jobPostActions";
import { processMatches } from "../../store/actions/matchesActions";
import firebase from "firebase/app";
import "firebase/auth";
import "./styles/Create.css";
import { createJobObject, checkIfEmpty } from "../../effects/filter.effects";
import { keysListEffect, setKeys, keysTextEffect  }from "../../effects/keys.effects";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "5em",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Create(props) {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(false);
  const registeredKeys = props.jobs.registeredKeys;
  const user = firebase.auth().currentUser;
  const [jobData, setJobData] = useState(props.jobs.currentPosting);
  const [key] = useState(setKeys(jobData));
  
  // Grab all students from database
  const allStudents = props.students.studentList;
  const page1Object = props.matches.page1Object;
  const page2Object = props.matches.page2Object;

  function addNewJob(data, jobId, props) {
    props.actions.addJob({
      ...data,
      profilePicture: props.users.user.profilePicture,
      authorName: props.users.user.name,
      dateCreated: Date.now(),
    });
    props.actions.updateJobsOfUser({ authId: user.uid, jobPostings: [jobId] });
    window.scrollTo(0, 0);
  }

  function updateKeysList(event, key, label) {
    keysListEffect(event, key, label, registeredKeys, props.actions.updateRegKeys);
  }

  function updateKeysText(v, data) {
    keysTextEffect(v, data, props.actions.updateRegKeys);
  }
  
  useEffect(() => {
    if (props.students.studentList.length === 0) {
      props.actions.getStudents();
    }
    props.actions.setKey(key);
    return () => {
      props.actions.resetKey();
      props.actions.resetJob();
    };
  }, [props.actions, props.students.studentList.length, jobData, key]);

  function updateStore() {
    // dispatch to matches reducer
    window.scrollTo(0, 0);
    const curr = currStep[currentStep];

    if (!checkIfEmpty(curr, jobData)) {
      setError(false);

      props.actions.addJobsData(jobData);
      const posting = createJobObject(jobData);

      if (currentStep === 1) {
        props.actions.processMatches({
          students: allStudents,
          posting: posting,
          page: currentStep,
        });
      }

      if (currentStep === 2) {
        props.actions.processMatches({
          students: page1Object.page1Students,
          posting: posting,
          page: currentStep,
        });
      }

      if (currentStep === 3) {
        props.actions.processMatches({
          students: page2Object.page2Students,
          posting: posting,
          page: currentStep,
        });
      }

      setCurrentStep(currentStep + 1);

      window.scrollTo(0, 0);
    } else {
      setError(true);
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        <Grid item xs={2}>
          <Grid
            container
            justifyContent="flex-end"
            style={{ paddingTop: "1em" }}
          >
            {currentStep > 1 ? (
              <ButtonClear
                onClick={() => setCurrentStep(currentStep - 1)}
                startIcon={<ChevronLeft />}
              >
                Back
              </ButtonClear>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={7} style={{ padding: "0 5em" }}>
          <CreateJobHeader
            currentStep={currentStep}
            handleChange={setJobData}
            jobData={jobData}
            title={"1. Create a Job Header"}
            keysList={chipsList}
            updateKeysList={updateKeysList}
            updateKeysText={updateKeysText}
          />
          <TechRequirements
            currentStep={currentStep}
            handleChange={setJobData}
            jobData={jobData}
            data={mockTechStackData}
            keysList={chipsList}
            updateKeysList={updateKeysList}
            updateKeysText={updateKeysText}
          />
          <JobDetail
            currentStep={currentStep}
            handleChange={setJobData}
            jobData={jobData}
            data={mockJobDetailData}
            keysList={chipsList}
            updateKeysList={updateKeysList}
            updateKeysText={updateKeysText}
          />
          <ContactDetails
            currentStep={currentStep}
            handleChange={setJobData}
            jobData={jobData}
            data={mockJobDetailData}
            keysList={chipsList}
            updateKeysList={updateKeysList}
            updateKeysText={updateKeysText}
          />
          <Review
            currentStep={currentStep}
            jobData={jobData}
            user={user}
            onSubmit={addNewJob}
            buttonName={"Create"}
          />
          {currentStep < 5 ? (
            <Container maxWidth="md">
              <ButtonFilled onClick={() => updateStore()}>
                Continue
              </ButtonFilled>
            </Container>
          ) : null}
          {error && (
            <div>
              <Container maxWidth="md" className={"form_validation_error"}>
                <Alert variant="outlined" severity="error">
                  Please Fill Out All Required Fields
                </Alert>
              </Container>
            </div>
          )}
        </Grid>
        <Grid item xs={3}>
          {Object.keys(props.jobs.registeredKeys).length > 0 ? (
            <>
              <h2 className="keys_title">Registered Keys</h2>
              <div className="reg_keys_container">
                <RegisteredKeys />
              </div>
            </>
          ) : null}
          <h2 className="keys_title">Summary</h2>
          <div className="feedback_notes_container">
            <Feedback page={currentStep} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    students: state.students,
    matches: state.matches,
    users: state.users,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addJobsData: addJobsData,
        processMatches: processMatches,
        getStudents: getStudents,
        updateRegKeys: updateRegKeys,
        resetKey: resetKey,
        setKey: setKey,
        resetJob: resetJob
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Create);
