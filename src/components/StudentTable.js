import React, { useState, useCallback, memo, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Button } from "reactstrap";
import "./table.css";

const StudentTable = ({ data, handleShowEditModel, handleDeleteAction }) => {
  console.log(" StudentTable reached");
  console.log(" StudentTable data = ", data);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Footer: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
        // Cell: function (props) {
        //   // <StudentEditorModel
        //   //   showModelObj={showEditorModelObj}
        //   //   // handleShowEditModel={handleShowEditModel}
        //   // />;
        //   // return (
        //   //   <Link
        //   //     to={{
        //   //       pathname:
        //   //         "/cadences/" + props.row.original.id + "/touches/view",
        //   //       search: window.location.search,
        //   //       state: {
        //   //         allCadencesData: props.cadenceData,
        //   //         origin: location.pathname,
        //   //         filterParams: location.search,
        //   //         cadence: props.row.original,
        //   //         cadenceName: props.value,
        //   //       },
        //   //     }}
        //   //     className="text-header text-break"
        //   //   >
        //   //     <strong>{props.value}</strong>
        //   //   </Link>
        //   // );
        // }
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
      {
        Header: "Action",
        Footer: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? "  - Desc"
                      : "  - Asc"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.original.id} {...row.getRowProps()}>
              {row.cells.map((cell, i) => {
                if (row.cells.length - 1 !== i) {
                  return (
                    <td key={i} {...cell.getCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                } else {
                  return (
                    <td key={i}>
                      <div>
                        <span className="col text-center">
                          <Button
                            color="primary"
                            onClick={() =>
                              handleShowEditModel(cell.row.original.id)
                            }
                            className="text-center"
                          >
                            Edit
                          </Button>
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            id={cell.row.original.id}
                            name="delete"
                            onChange={handleDeleteAction}
                            defaultChecked={false}
                          />
                        </span>
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
      {/* <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </table>
  );
};

export default memo(StudentTable);
