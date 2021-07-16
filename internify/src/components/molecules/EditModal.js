import React, { useState } from "react";
import { ButtonFilled, ButtonWhite } from "../atoms/index";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import { TextFieldInput, MultiLineTextField } from "../atoms/index";
import "./styles/EditModal.css";
import axios from "axios";

const EditModal = (props) => {
  let toggle = props.toggle;
  let setToggle = props.setToggle;
  let user = props.user;
  let setUser = props.setUser;
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    handle: "",
    email: "",
    location: "",
    bio: "",
    contactNumber: "",
    website: "",
    linkedIn: "",
    status: "",
    company: "",
  });

  const handleCancel = () => {
    setProfile({
      name: "",
      title: "",
      handle: "",
      email: "",
      location: "",
      bio: "",
      contactNumber: "",
      website: "",
      linkedIn: "",
      status: "",
      company: "",
    });
    setToggle(false);
  };


  const handleUpdate = (e) => {
    e.preventDefault();

    const newProfile = {
      authId: profile.authId,
      name: profile.name,
      title: profile.title,
      handle: profile.handle,
      email: profile.email,
      location: profile.location,
      bio: profile.bio,
      contactNumber: profile.contactNumber,
      website: profile.website,
      linkedIn: profile.linkedIn,
      status: profile.status,
      company: profile.company,
    }
    //TODO: Make POST request to update user information with `profile`
    // NOTE: must determine how to access user's authID. 
    // axios.post(`http://localhost:5000/users/update/${user.id}`, newProfile)
    
    console.log(newProfile);
  }

  return toggle ? (
    <Dialog open={toggle} onClose={() => (toggle = !toggle)} fullWidth>
      <DialogTitle style={{ padding: "2em 0 0 2em"}} className="dialog_title">Edit Profile</DialogTitle>
      <DialogContent style={{ padding: "2em"}} className="dialog_content">
        <Grid container spacing={2} style={{ padding: "0.5em 0"}}>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_name"
              className="edit_profile_name"
              label="Name"
              type="text"
              value={profile.name}
              placeholder="Tommy Tho"
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_handle"
              className="edit_profile_handle"
              label="Handle"
              type="text"
              value={profile.handle}
              placeholder="@tommytho"
              onChange={(e) =>
                setProfile({ ...profile, handle: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ padding: "0.5em 0"}}>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_title"
              className="edit_profile_title"
              label="Job Title"
              type="text"
              value={profile.title}
              placeholder="Technical Recruiter"
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_location"
              className="edit_profile_location"
              label="Company"
              type="text"
              value={profile.company}
              placeholder="Internify Solutions Inc."
              onChange={(e) =>
                setProfile({ ...profile, company: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <div className={"edit_profile_bio"}>
          <MultiLineTextField
            id={"edit_profile_bio"}
            className={"edit_profile_bio"}
            label={"Bio"}
            type={"text"}
            value={profile.bio}
            rows={4}
            defaultValue={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>
        <Grid container spacing={2} style={{ padding: "0.5em 0"}}>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_email"
              className="edit_profile_email"
              label="Email"
              type="text"
              value={profile.email}
              placeholder="tommy@internify.com"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_website"
              className="edit_profile_website"
              label="Website"
              type="text"
              value={profile.website}
              placeholder="tommytho.com"
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ padding: "0.5em 0"}}>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_linkedin"
              className="edit_profile_linkedin"
              label="LinkedIn"
              type="text"
              value={profile.linkedIn}
              placeholder="linkedin.com/in/tommythowm"
              onChange={(e) =>
                setProfile({ ...profile, linkedIn: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldInput
              id="edit_profile_location"
              className="edit_profile_location"
              label="Location"
              type="text"
              value={profile.location}
              placeholder="Vancouver, BC"
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="flex-end">
          <Grid item>
            <ButtonWhite onClick={() => handleCancel()}>Cancel</ButtonWhite>
          </Grid>
          <Grid item>
            <ButtonFilled onClick={() => handleUpdate()}>Update</ButtonFilled>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default EditModal;
