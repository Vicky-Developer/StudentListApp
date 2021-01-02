// import { format } from "date-fns";
import { Link } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
    Cell: function (props) {
      return (
        <Link
          to={{
            pathname: "/students/" + props.row.original.id ,
            search: window.location.search,
            state: {
              allCadencesData: props.cadenceData,
              origin: location.pathname,
            },
          }}
          className="text-header text-break"
        >
          <strong>{props.value}</strong>
        </Link>
      );
    },
  },
  {
    Header: "Date Of Birth",
    Footer: "Date Of Birth",
    accessor: "dateOfBirth",
  },
  {
    Header: "Address",
    Footer: "Address",
    accessor: "address",
  },
  {
    Header: "Gender",
    Footer: "Gender",
    accessor: "gender",
  },
  {
    Header: "Contact No",
    Footer: "Contact No",
    accessor: "contactNumber",
  },
  {
    Header: "Sports",
    Footer: "Sports",
    accessor: "sports",
  },
  {
    Header: "Curriculums",
    Footer: "Curriculums",
    accessor: "curriculums",
  },
];
