import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
  Alert,
} from "reactstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";
var DatePicker = require("reactstrap-date-picker");

const StudentEditorModel = ({ showModelObj, toggleEditorModel }) => {
  //   const { buttonLabel, className } = props;
  console.log("StudentEditorModel id = ", showModelObj.id);

  const [studData, setStudData] = useState();

  const [isError, setIsError] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  let studId = showModelObj.id;

  let modaleIsOpen = showModelObj.showModel;

  useEffect(() => {
    if (studId) {
      let apiUrl = `http://localhost:8081/students-list-app/api/v1/students/${studId}`;
      console.log("StudentEditorModel useEffect apiUrl = ", apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          console.log("response = ", response);
          let studdData = response.data.data[0];
          setStudData(studdData);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          return (
            <div>
              <span
                style={{
                  fontSize: "30px",
                  color: "red",
                }}
              >
                <Alert style={{ textAlign: "center" }} color="danger">
                  Failed to fetch data!
                </Alert>
              </span>
            </div>
          );
        });
    }
  }, [studId]);

  const handleSportsChange = (e) => {
    const { target } = e;
    console.log(target.name + " = " + target.checked);
  };

  const handleCurriculumsChange = (e) => {
    const { target } = e;
    console.log(target.value + " = " + target.checked);
  };

  const dataSubmit = (data, e) => {
    console.log("StudentEditorModel submitted data = ", data);
    let sportStr = new Set();

    if (data.cricket) {
      sportStr.add("cricket");
    }

    if (data.football) {
      sportStr.add("football");
    }

    if (data.hockey) {
      sportStr.add("hockey");
    }

    data = { ...data, sports: new Array(...sportStr).join(",") };

    console.log(
      "StudentEditorModel submitted after added sports data = ",
      data
    );

    let apiUrl = studId
      ? `http://localhost:8081/students-list-app/api/v1/students/${studId}`
      : `http://localhost:8081/students-list-app/api/v1/students`;

    console.log("StudentEditorModel dataSubmit useEffect apiUrl = ", apiUrl);

    if (studId) {
      axios
        .put(apiUrl, data)
        .then((response) => {
          console.log("StudentEditorModel dataSubmit response = ", response);
          toggleEditorModel(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          return (
            <div>
              <span
                style={{
                  fontSize: "30px",
                  color: "red",
                }}
              >
                <Alert style={{ textAlign: "center" }} color="danger">
                  Failed to fetch data!
                </Alert>
              </span>
            </div>
          );
        });
    } else {
      axios
        .post(apiUrl, data)
        .then((response) => {
          console.log("StudentEditorModel dataSubmit response = ", response);
          toggleEditorModel(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          return (
            <div>
              <span
                style={{
                  fontSize: "30px",
                  color: "red",
                }}
              >
                <Alert style={{ textAlign: "center" }} color="danger">
                  Failed to fetch data!
                </Alert>
              </span>
            </div>
          );
        });
    }
  };

  if (isError) {
    return (
      <div>
        <span
          style={{
            fontSize: "30px",
            color: "red",
          }}
        >
          <Alert className="text-center" color="danger">
            Failed to fetch / update data!
          </Alert>
        </span>
      </div>
    );
  } else {
    console.log("StudentEditorModel studData = ", studData);
    return (
      <div>
        <Modal size="lg" centered isOpen={modaleIsOpen}>
          <ModalHeader>
            {studId && studData && studData.name
              ? `Edit Student - ${studData.name}`
              : "Add Student"}
          </ModalHeader>
          <Form onSubmit={handleSubmit(dataSubmit)}>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  invalid={errors.name && errors.name.message}
                  placeholder="Enter Student Name"
                  innerRef={register({ required: "Name is required" })}
                  defaultValue={studData && studData.name}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input
                  type="select"
                  name="gender"
                  id="gender"
                  invalid={errors.gender}
                  placeholder="Select Student Gender"
                  innerRef={register({ required: "Gender is required" })}
                  defaultValue={studData && studData.gender}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </Input>
                <ErrorMessage
                  errors={errors}
                  name="gender"
                  className="text-center"
                ></ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label for="dateOfBirth">Date of Birth</Label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  invalid={errors.dateOfBirth}
                  placeholder="Enter Date of Birth"
                  innerRef={register({ required: "Date of Birth is required" })}
                  defaultValue={studData && studData.dateOfBirth}
                />
                <ErrorMessage errors={errors} name="dateOfBirth"></ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type="textarea"
                  name="address"
                  id="address"
                  invalid={errors.address}
                  placeholder="Enter Student Address"
                  innerRef={register({ required: "Address is required" })}
                  defaultValue={studData && studData.address}
                />
                <ErrorMessage
                  errors={errors}
                  name="address"
                  className="text-center"
                ></ErrorMessage>
              </FormGroup>
              <br />
              <FormGroup>
                <Label for="contactNumber">Contact No</Label>
                <Input
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  invalid={errors.contactNumber}
                  placeholder="Enter Student Contact No"
                  innerRef={register({ required: "Contact No is required" })}
                  defaultValue={studData && studData.contactNumber}
                />

                <ErrorMessage
                  errors={errors}
                  name="contactNumber"
                  className="text-center"
                ></ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label>Sports</Label>
                <div>
                  <input
                    type="checkbox"
                    id="cricket"
                    name="cricket"
                    defaultChecked={
                      studData && studData.sports.includes("cricket")
                    }
                    onChange={handleSportsChange}
                    ref={register({ value: "cricket" })}
                  />
                  <Label style={{ marginLeft: "10px" }}>Cricket</Label>
                  <input
                    type="checkbox"
                    id="football"
                    name="football"
                    defaultChecked={
                      studData && studData.sports.includes("football")
                    }
                    onChange={handleSportsChange}
                    style={{ marginLeft: "15px" }}
                    ref={register({ value: "football" })}
                  />
                  <Label style={{ marginLeft: "10px" }}>Football</Label>
                  <input
                    type="checkbox"
                    id="hockey"
                    name="hockey"
                    defaultChecked={
                      studData && studData.sports.includes("hockey")
                    }
                    onChange={handleSportsChange}
                    style={{ marginLeft: "15px" }}
                    ref={register({ value: "hockey" })}
                  />
                  <Label style={{ marginLeft: "10px" }}>Hockey</Label>
                </div>
              </FormGroup>
              <FormGroup>
                <Label>Curriculums</Label>
                <div>
                  <input
                    type="radio"
                    id="drawing"
                    name="curriculums"
                    defaultChecked={
                      studData && studData.curriculums.includes("drawing")
                    }
                    ref={register}
                    value="drawing"
                    onChange={handleCurriculumsChange}
                  />
                  <label style={{ marginLeft: "10px" }}>Drawing</label>
                  <input
                    type="radio"
                    id="poetry"
                    name="curriculums"
                    defaultChecked={
                      studData && studData.curriculums.includes("poetry")
                    }
                    ref={register}
                    value="poetry"
                    onChange={handleCurriculumsChange}
                    style={{ marginLeft: "15px" }}
                  />
                  <label style={{ marginLeft: "10px" }}>Poetry</label>
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" onClick={toggleEditorModel}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  } /* else {
    return (
      <div>
        <span
          style={{
            fontSize: "30px",
            color: "blue",
          }}
        >
          <Alert className="text-center" color="primary">
            No Data Available!
          </Alert>
        </span>
      </div>
    );
  } */
};

export default StudentEditorModel;
