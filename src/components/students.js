import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import axios from "axios";
import StudentTable from "./StudentTable";
import StudentEditorModel from "./StudentEditorModel";
import { Link } from "react-router-dom";
import { Alert, Button, ButtonGroup } from "reactstrap";

const Students = ({ location, history }) => {
  console.log(" Students is started ");
  console.log(" Students location = ", location);
  console.log(" Students history = ", history);

  const [data, setData] = useState([]);
  console.log(" Students data = ", data);

  const [isError, setIsError] = useState(false);

  const [deleteIds, setDeleteIds] = useState(new Set());

  const [showEditorModelObj, setShowEditorModelObj] = useState({
    showModel: false,
    id: "",
  });

  const fetchData = useCallback(() => {
    console.log("Students useEffect is started ");

    let apiUrl = "http://localhost:8081/students-list-app/api/v1/students";

    console.log("Students useEffect apiUrl = ", apiUrl);

    (async () => {
      await axios
        .get(apiUrl)
        .then((response) => {
          console.log("Students - useEffect - response = ", response);
          setData([...response.data.data]);
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        });
    })();

    // fetch(apiUrl).then((res) => res.json).then((response) => setData([...response.data]).catch((error) => { setIsError(true); console.log(error) })
    // fetch(apiUrl)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     setData([...response.data]);
    //   })
    //   .catch((error) => {
    //     setIsError(true);
    //     console.log(error);
    //   });

    // working
    // axios
    //   .get(apiUrl)
    //   .then((response) => {
    //     console.log("Students - useEffect - response = ", response);
    //     setData([...response.data.data]);
    //     // setRefetch(false);
    //   })
    //   .catch((error) => {
    //     setIsError(true);
    //     console.log(error);
    //   });
    console.log("Students useEffect is ended ");
  }, []);

  const deleteData = useCallback(() => {
    console.log("deleteData useCallback is started ");

    if (!deleteIds || deleteIds.size === 0) {
      alert("Please select student(s)");
      return;
    }

    let deleteIdStr = new Array(...deleteIds).join(",");

    let apiUrl = `http://localhost:8081/students-list-app/api/v1/students/${deleteIdStr}`;

    console.log("Students useEffect apiUrl = ", apiUrl);

    (async () => {
      await axios
        .delete(apiUrl)
        .then((response) => {
          console.log("Students - useEffect - response = ", response);
          deleteIds.clear();
          // setDeleteIds(deleteIds);
          // fetchData();
          window.location.reload();
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        });
    })();
    console.log("deleteData useCallback is ended");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowEditModel = (rowId) => {
    console.log("Students  handleShowEditModel is called with rowId = ", rowId);
    setShowEditorModelObj({ showModel: true, id: rowId });
  };

  const toggleEditorModel = () => {
    console.log(
      "Students  toggleEditorModel is called showEditorModelObj = ",
      showEditorModelObj
    );
    setShowEditorModelObj({ showModel: false });
    fetchData();
  };

  const handleDeleteAction = (e) => {
    console.log(
      "Students  handleDeleteAction is started deleteId = ",
      e.target.id
    );

    if (!e.target.checked) {
      deleteIds.delete(e.target.id);
    } else {
      deleteIds.add(e.target.id);
    }

    setDeleteIds(deleteIds);

    console.log(
      "Students  handleDeleteAction is ended deleteIds = ",
      deleteIds
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), []);

  if (isError) {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-light bg-light text-cente">
            <span className="navbar-brand mb-0 h1r">Student - List - App</span>
            <span>
              <ButtonGroup>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => fetchData()}
                >
                  RESET
                </Button>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => handleShowEditModel()}
                >
                  ADD
                </Button>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => deleteData()}
                >
                  DELETE
                </Button>
              </ButtonGroup>
            </span>
          </nav>
          <span
            style={{
              fontSize: "30px",
              color: "red",
            }}
          >
            <Alert className="text-center" color="danger">
              Failed to fetch data!
            </Alert>
          </span>
        </div>
      </div>
    );
  } else if (data && data.length > 0) {
    console.log("StudentTable is called here");
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-light bg-light text-cente shadow-lg p-3 mb-5 bg-white rounded">
            <span className="navbar-brand mb-0 h1 text-center">
              STUDENT - LIST - APP
            </span>
            <span>
              <ButtonGroup>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => fetchData()}
                >
                  RESET
                </Button>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => handleShowEditModel()}
                >
                  ADD
                </Button>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => deleteData()}
                >
                  DELETE
                </Button>
              </ButtonGroup>
            </span>
          </nav>

          <StudentTable
            data={data}
            handleShowEditModel={handleShowEditModel}
            handleDeleteAction={handleDeleteAction}
          />
          {showEditorModelObj.showModel && (
            <StudentEditorModel
              showModelObj={showEditorModelObj}
              toggleEditorModel={toggleEditorModel}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-light bg-light text-cente">
            <span className="navbar-brand mb-0 h1r">Student - List - App</span>
            <span>
              <ButtonGroup>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => fetchData()}
                >
                  RESET
                </Button>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => handleShowEditModel()}
                >
                  ADD
                </Button>
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => deleteData()}
                >
                  DELETE
                </Button>
              </ButtonGroup>
            </span>
          </nav>
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

        {showEditorModelObj.showModel && (
          <StudentEditorModel
            showModelObj={showEditorModelObj}
            toggleEditorModel={toggleEditorModel}
          />
        )}
      </div>
    );
  }
};

export default memo(Students);
