import React from "react";
import { ButtonFilled } from "../atoms/index";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import html2pdf from "html2pdf.js";
import "./styles/ViewPosting.css";

const ViewPosting = (props) => {
  const data = props.data;
  const header = data?.header
    ? data.header
    : {
        title: "",
        company: "",
        location: "",
        description: "",
      };
  const requirements = data?.requirements;
  const details = data?.details;
  const contact = data?.contact;

  const jobPoints = [
    ...header.position,
    details.positionType,
    details.pay,
    details.candidates,
  ];

  const handleClick = () => {
    var element = document.getElementsByClassName("view_posting_container")[0];
    const opt = {
      margin: 0,
      filename: `${header.title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, dpi: 300, letterRendering: true, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().from(element).set(opt).save();
  };

  const JobPosting = () => {
    return (
      <div className="view_posting_container">
        <h3 className="view_posting_title">{header.title}</h3>
        <h4 className="view_posting_subheader">{header.company}</h4>
        <p className="view_posting_subheader">{header.location}</p>
        <p className="view_posting_description">{details.description}</p>

        <h4 className="view_posting_subheader">Job points</h4>
        <ul className="view_posting_list">
          {jobPoints.map((list) => {
            return <li key={list}>{list}</li>;
          })}
          {details.coOp === "Yes" ? (
            <li key={"coop-true"}>
              Must be enrolled in an accredited Co-op program
            </li>
          ) : null}
        </ul>

        <h4 className="view_posting_subheader">Technical Requirements</h4>
        <ul className="view_posting_list_2">
          {requirements.experience ? (
            <li key={"working-experience"}>
              Must have <b>{requirements.experience}</b> of working experience
            </li>
          ) : (
            <li key={"no-working-experience"}>
              No prior work experience is required
            </li>
          )}
          {details.academicReq ? (
            <li key={"academic-requirements"}>
              Obtained or is currently enrolled in one or either:{" "}
              <ul>
                {details.academicReq.map((req) => {
                  return (
                    <li key={req}>
                      <b>{req}</b>
                    </li>
                  );
                })}
              </ul>
            </li>
          ) : null}
          {details.academicReq && requirements.isGpaRequired ? (
            <li key={"gpa-requirement"}>
              Must have at least or is at <b>{requirements.gpaValue} GPA</b>{" "}
              standing or equivalent
            </li>
          ) : null}
          <li
            key={"coding-language-requirement"}
            style={{ marginBottom: "0.25em" }}
          >
            Experience with the following programming languages:
          </li>
          <ul className="view_posting_list_nested">
            {requirements.languages.map((language) => {
              return (
                <li key={language}>
                  <b>{language}</b>
                </li>
              );
            })}
          </ul>
          <li key={"framework-requirement"}>
            Experience with the following frameworks:
          </li>
          <ul className="view_posting_list_nested">
            {requirements.frameworks.map((framework) => {
              return (
                <li key={framework}>
                  <b>{framework}</b>
                </li>
              );
            })}
          </ul>
          <li key={"tool-requirement"}>
            Experience with the following work tools:
          </li>
          <ul className="view_posting_list_nested">
            {requirements.tools.map((tool) => {
              return (
                <li key={tool}>
                  <b>{tool}</b>
                </li>
              );
            })}
          </ul>
          <li key={"concept-requirement"}>
            General understanding and comprehension of:
          </li>
          <ul className="view_posting_list_nested">
            {requirements.concepts.map((concept) => {
              return (
                <li key={concept}>
                  <b>{concept}</b>
                </li>
              );
            })}
          </ul>
        </ul>

        <h4 className="view_posting_subheader">Application Steps:</h4>
        <p>{contact.applicationSteps}</p>

        <h4 className="view_posting_subheader">Contact details:</h4>
        <p className="view_posting_contact_name">{contact.name}</p>
        <ul className="view_posting_list_nested">
          <li key={contact.email}>{contact.email}</li>
          <li key={contact.linkedIn}>{contact.linkedIn}</li>
          <li key={contact.other}>{contact.other ? contact.other : null}</li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <JobPosting />
      <div className="view_posting_submit">
        <ButtonFilled startIcon={<PictureAsPdfIcon />} onClick={handleClick}>
          Export to PDF
        </ButtonFilled>
      </div>
    </>
  );
};

export default ViewPosting;
