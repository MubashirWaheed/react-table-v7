import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { find } from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

import { COLUMNS } from "./Columns";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
import EditableCell from "./EditableCell";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import { AlertAcrossApplicationContext } from "../../Context/AlertAcrossApplicationContext";
import UpdatingDBMessage from "../Utilities/UpdatingDBMessage";
// import "./JewelryOrdersTable.css";
import data from "./MOCK_DATA.json";
import { useResizeColumns, useFlexLayout, useBlockLayout } from "react-table";
import "./new.css";
// We decided to use a Context approach
// for the YesNoDropDownTable because we wanted the JewelryOrdersTable to control the yes no drop-down from
// And we weren't able to do so via props

function ReactTableSales() {
  // This is a message that we are pending while trying to connect to DB
  const [pendingMessage, setPendingMessage] = useState(false);

  const {
    // SalesInfo: data,
    ItemsUpdatedArray,
    setItemsUpdatedArray,
  } = useContext(JewelryOrdersInfoContext);

  // Relevant for AlertAcrossApplication
  const { showAlert, variantAlert, alertHeading, alertText } = useContext(
    AlertAcrossApplicationContext
  );

  const [stateShowAlert, setStateShowAlert] = showAlert;
  const [stateVariantAlert, setStateVariantAlert] = variantAlert;
  const [stateAlertHeading, setStateAlertHeading] = alertHeading;
  const [StateAlertText, setStateAlertText] = alertText;

  // End AlertAcrossApplicationContent

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
      Cell: EditableCell,

      // width: 500,
      // minWidth: 100,
      // maxWidth: 200,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data,
      defaultColumn,
      // Describes on set up how many columns to show
      initialState: { pageSize: 10 },
      // disable auto reset which is the default behavior
      autoResetSortBy: false,
      autoResetFilters: false,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useResizeColumns,
    // useFlexLayout
    useBlockLayout
    // useRowSelect
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {}, [ItemsUpdatedArray]);

  const updateDB = () => {
    setPendingMessage(true);

    removeDuplicates();

    // This in on array of objects that has
    // the items that there are changes for and that we need to updated the DB with
    let allOrdersToUpdateInfo = [];

    // We are using original_id just in case the ID changes in the future
    ItemsUpdatedArray.forEach((ItemsUpdated) => {
      allOrdersToUpdateInfo.push(find(data, { original_id: ItemsUpdated }));
    });

    sendNewItemsInfoToDB();

    async function sendNewItemsInfoToDB() {
      let result = await fetch(
        `${process.env.REACT_APP_DATABASE}sales_update_info`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(allOrdersToUpdateInfo),
        }
      );

      if (result.ok) {
        const responseText = await result.text();

        let responseTextArray = JSON.parse(responseText);
        responseTextArray = responseTextArray[0];

        // We start managing the alert to the user regarding what items have been updated successfully
        let alertHeading;

        let alertType;
        if (responseTextArray.includes("Not updated")) {
          alertType = "info";
          alertHeading = "info";
        } else {
          alertType = "success";
          alertHeading = "!You have success";
        }

        const alertHtml = () => (
          <ul>
            {responseTextArray.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        );

        setPendingMessage(false);

        setStateShowAlert(true);
        setStateVariantAlert(alertType);
        setStateAlertHeading(alertHeading);
        setStateAlertText(alertHtml);

        document.getElementById("GlobalAlerts").scrollIntoView();
      } else {
        const responseText = await result.text();

        setPendingMessage(false);
        setStateShowAlert(true);
        setStateVariantAlert("danger");
        setStateAlertHeading("!Error while updating");
        setStateAlertText("We had an error while updating the Database");
        document.getElementById("GlobalAlerts").scrollIntoView();
        console.log(
          "There was an error while submitting your data to the Database"
        );
      }
    }
  };

  function removeDuplicates() {
    //   Before updating what items need to be updated on the DB
    // we want to be sure that we remove duplicates of the items that need to be updated
    // sometimes their can duplicate if the order # is entered as a string

    // We do the following process:

    // 1.	Convert all the items to number
    // 2.	Make sure to remove duplicates

    // Convert all the items to number
    let TempUpdatedArray = ItemsUpdatedArray.map(Number);
    //  Make sure to remove duplicates

    TempUpdatedArray = TempUpdatedArray.filter(
      (item, index) => TempUpdatedArray.indexOf(item) === index
    );

    setItemsUpdatedArray(TempUpdatedArray);
  }

  const renderTooltipFirstPage = (props) => (
    <Tooltip id="TooltipFirstPage" {...props}>
      Go to first page
    </Tooltip>
  );

  const renderTooltipLastPage = (props) => (
    <Tooltip id="TooltipLastPage" {...props}>
      Go to Last page
    </Tooltip>
  );

  return (
    <>
      <div className="col-xs-8 col-sm-3">
        <div className="info_table">
          <br />
          <br />
          <br />

          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

          {/* table */}
          <div
            className="table_div"
            {...getTableProps()}
            tripped
            bordered
            hover
            size="sm"
          >
            {/* thead */}
            <div>
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => {
                    return (
                      <div {...column.getHeaderProps()} className="th">
                        <div {...column.getSortByToggleProps()}>
                          {column.render("Header")}
                          <div {...column.getResizerProps()}>HEllo</div>
                        </div>
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                        <span {...column.getSortByToggleProps()}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon icon={faSortDown} size="2x" />
                            ) : (
                              <FontAwesomeIcon icon={faSortUp} size="2x" />
                            )
                          ) : (
                            <FontAwesomeIcon icon={faSort} size="2x" />
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* tbody */}
            <div {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  // tr
                  <div {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        // td
                        <div
                          {...cell.getCellProps({
                            style: { color: "blue" },
                          })}
                        >
                          {cell.render("Cell")}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Paggination  */}
          <div className="pagination_sales_table">
            <span>
              <strong>
                Page {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>

            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
            </span>
            <div>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipFirstPage}
                text={"text"}
              >
                <button
                  className="pagination_button_sales_table"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {" "}
                  {"<<"}{" "}
                </button>
              </OverlayTrigger>
              <button
                className="pagination_button_sales_table"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {" "}
                Previous
              </button>
              <button
                className="pagination_button_sales_table"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {" "}
                Next{" "}
              </button>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipLastPage}
                text={"text"}
              >
                <button
                  className="pagination_button_sales_table"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {" "}
                  {">>"}{" "}
                </button>
              </OverlayTrigger>
            </div>
            {pendingMessage ? <UpdatingDBMessage /> : ""}
            <div>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="padding-left_button">
              <Button onClick={updateDB} variant="primary">
                Update database
              </Button>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default ReactTableSales;
