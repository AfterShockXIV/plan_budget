import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Card, CardBody} from "reactstrap";
import server from "variables/port_server";

function Report_budget() {
  const department = localStorage.getItem("department");
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_status, setData_status] = useState([]);
  //====================================================================
  useEffect(() => {
    fetch(server + "/report_budget/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_status(result.data_main))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const row = [];
  data_status.forEach((data, key) => {
    row.push({
      key: key + 1,
      budget_project_name: data.budget_project_name,
      budget_project_price: data.budget_project_price
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      budget_date_request: data.budget_date_request,
      budget_project_year: data.budget_project_year,
      budget_department: data.budget_department,
      budget_time: data.budget_time + " เดือน",
      AUFNR: data.AUFNR, //COIO
      action: (
        <div>
          <a
            target={"_blank"}
            href={"/admin/report_sap/" + data.budget_run_id}
            rel="noreferrer"
          >
            <Button
              className="mr10"
              size="small"
              variant="contained"
              color="info"
            >
              Detail
            </Button>
          </a>
        </div>
      ),
      action_status: (() => {
        if (data.status === "Approve") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-success"
            >
              Approve
            </span>
          );
        } else if (data.status === "wait") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              Wait . . Manager
            </span>
          );
        } else if (data.status === "mg_success") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              Wait . . Director
            </span>
          );
        } else if (data.status === "dr_success") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              Wait . . AMD
            </span>
          );
        } else if (data.status === "AMD2_success") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              Wait . . MD
            </span>
          );
        } else if (data.status === "AMD_success") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              Wait . . AMD2
            </span>
          );
        } else if (data.status === "MD_success") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              Wait . . IOCO
            </span>
          );
        }
      })(),

      action_pdf: (() => {
          return (
            <a href={server+"/pdf_budget/"+ data.assistant + "/" + data.budget_run_id}>
              <Button variant="contained" color="error" size="small">
                Print
              </Button>
            </a>
          );
      })(),

      action_excel: (() => {
        if (data.status === "dr_success" || data.status === "Approve") {
          return (
            <a href={server+"/excel_js/" + data.budget_run_id}>
              <Button variant="contained" color="success" size="small">
                Excel to SAP
              </Button>
            </a>
          );
        } 
      })(),
    });
  });
  const datatable = {
    columns: [
      {
        label: "#",
        field: "key",
        width: 50,
        align: "center",
      },
      {
        label: "Detail",
        field: "action",
        width: 100,
        align: "center",
      },
      {
        label: "status",
        field: "action_status",
        width: 140,
        align: "center",
      },
      {
        label: "COIO",
        field: "AUFNR",
        width: 150,
        align: "center",
      },
      {
        label: "โครงการ ปี",
        field: "budget_project_year",
        width: 130,
        align: "center",
      },
      {
        label: "ฝ่ายที่ขอ",
        field: "budget_department",
        width: 100,
        align: "center",
      },
      {
        label: "ชื่อโครงการ",
        field: "budget_project_name",
        width: 200,
        align: "center",
      },
      {
        label: "ราคา",
        field: "budget_project_price",
        width: 100,
        align: "center",
      },
      {
        label: "วันที่ขอโครงการ",
        field: "budget_date_request",
        width: 150,
        align: "center",
      },

      {
        label: "PDF",
        field: "action_pdf",
        width: 100,
        align: "center",
      },
      // {
      //   label: "Excel",
      //   field: "action_excel",
      //   width: 170,
      //   align: "center",
      // },
    ],
    rows: row,
  };
 
  return (
    <>
      <div className="content">
        <Card>
          <CardBody>
            {loading ? (
              <div class="loader"></div>
            ) : (
              <div sx={{ width: "100%", overflow: "hidden" }}>
                <MDBDataTableV5
                  striped
                  bordered
                  hover
                  entriesOptions={[5, 10, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  scrollX
                  data={datatable}
                  searchTop
                  searchBottom={false}
                />
              </div>
            )}
          </CardBody>
        </Card>

      </div>
    </>
  );
}
export default Report_budget;
