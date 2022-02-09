import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import server from "variables/port_server";
function Report_budget() {
  const department = localStorage.getItem("department");
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_status, setData_status] = useState([]);
  useEffect(() => {
    fetch(server + "/report_budget/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_status(result.data_main))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [project_name, setProject_name] = useState("");
  const [project_price, setProject_price] = useState(0);
  const [budget_run_id, setBudget_run_id] = useState([]);

  const [coio, setCoio] = useState("");
  const [date_approve, setDate_approve] = useState("");
  const [open_status, setOpen_status] = React.useState(false);
  const handleOpen_status = () => setOpen_status(true);
  const handleClose_status = () => {
    setOpen_status(false);
    setCoio("");
    setDate_approve("");
    setBudget_run_id("");
  };

  async function fetch_data(credentials) {
    return fetch(server + "/post_approve_budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const Click_approve = async (event) => {
    event.preventDefault();
    const response = await fetch_data({
      coio,
      date_approve,
      budget_run_id,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/Report_budget";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

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
      AUFNR: data.AUFNR, //COIO
      action: (() => {
        if (data.status !== "wait") {
          return (
            <div>
              <a
                target="_blank"
                href={"/admin/report_sap/" + data.budget_run_id}
                rel="noreferrer"
              >
                <Button
                  className="mr10"
                  size="small"
                  // onClick={() => handleRemoveClick_apr(i)}
                  variant="contained"
                  color="info"
                >
                  CHECK
                </Button>
              </a>
            </div>
          );
        } else {
          if (data.status === "Approve") {
            return (
              <Button
                disabled
                className="mr10"
                size="small"
                // onClick={() => handleRemoveClick_apr(i)}
                variant="contained"
                color="warning"
              >
                EDIT
              </Button>
            );
          } else {
            return (
              <a
                target="_blank"
                href={"/admin/edit_planbudget/" + data.budget_run_id}
                rel="noreferrer"
              >
                <Button
                  className="mr10"
                  size="small"
                  // onClick={() => handleRemoveClick_apr(i)}
                  variant="contained"
                  color="warning"
                >
                  EDIT
                </Button>
              </a>
            );
          }
        }
      })(),
      action_edit: (() => {
        if (data.status === "Approve") {
          return (
            <Button
              disabled
              className="mr10"
              size="small"
              // onClick={() => handleRemoveClick_apr(i)}
              variant="contained"
              color="warning"
            >
              EDIT
            </Button>
          );
        } else {
          return (
            <a
              target="_blank"
              href={"/admin/edit_planbudget/" + data.budget_run_id}
              rel="noreferrer"
            >
              <Button
                className="mr10"
                size="small"
                // onClick={() => handleRemoveClick_apr(i)}
                variant="contained"
                color="warning"
              >
                EDIT
              </Button>
            </a>
          );
        }
      })(),

      action_approve: (() => {
        if (data.status === "wait") {
          return (
            <a href={server + "/sig_plan_mg_page/" + data.budget_run_id}>
              <Button
                className="mr10"
                size="small"
                type="submit"
                variant="contained"
                color="warning"
              >
                ผู้จัดการเซ็นรับทราบ
              </Button>
            </a>
          );
        } else if (data.status === "mg_success") {
          return (
            <a href={server + "/sig_plan_dr_page/" + data.budget_run_id}>
              <Button
                className="mr10"
                size="small"
                type="submit"
                variant="contained"
                color="warning"
              >
                ผู้อำนวยการเซ็นรับทราบ
              </Button>
            </a>
          );
        } else if (data.status === "dr_success") {
          if (department.slice(1, -1) === "AC") {
            return (
              <Button
                className="mr10"
                size="small"
                type="submit"
                onClick={() => {
                  handleOpen_status();
                  setProject_name(data.budget_project_name);
                  setProject_price(data.budget_project_price);
                  setBudget_run_id(data.budget_run_id);
                }}
                variant="contained"
                color="warning"
              >
                Approve
              </Button>
            );
          } else {
            return (
              <span
                style={{ fontSize: "12px" }}
                class="badge  badge-pill badge-warning"
              >
                รอบัญชีกรอกเลข COIO
              </span>
            );
          }
        } else if (data.status === "Approve") {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-success"
            >
              Success
            </span>
          );
        }
      })(),
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
        } else {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              wait
            </span>
          );
        }
      })(),
      action_pdf: (() => {
        if (data.status === "dr_success" || data.status === "Approve") {
          return (
            <a href={server + "/pdf_budget/" + data.budget_run_id}>
              <Button variant="contained" color="error" size="small">
                Print
              </Button>
            </a>
          );
        } else {
          return (
            <a href={server + "/pdf_budget/" + data.budget_run_id}>
              <Button variant="contained" color="error" size="small">
                Print
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
        label: "ACTION",
        field: "action_approve",
        width: 170,
        align: "center",
      },
      {
        label: "ACTION",
        field: "action",
        width: 100,
        align: "center",
      },
      {
        label: "status",
        field: "action_status",
        width: 100,
        align: "center",
      },
      {
        label: "COIO",
        field: "AUFNR",
        width: 120,
        align: "center",
      },
      {
        label: "ฝ่ายที่ขอ",
        field: "budget_department",
        width: 70,
        align: "center",
      },
      {
        label: "Project Name",
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
        label: "วันที่ขอ Budget",
        field: "budget_date_request",
        width: 120,
        align: "center",
      },
      {
        label: "Budget ปี",
        field: "budget_project_year",
        width: 120,
        align: "center",
      },
      {
        label: "PDF",
        field: "action_pdf",
        width: 120,
        align: "center",
      },
    ],
    rows: row,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "25px",
    p: 4,
  };
  return (
    <>
      <div>
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
            {/* ============MODAL_status====================== */}
            <Modal
              open={open_status}
              onClose={handleClose_status}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <span>{job_run_id}</span> */}
                <h6>
                  Approve Budget : {project_name} || ราคา :{" "}
                  {project_price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </h6>

                <br />

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "30%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    name="detail_list"
                    label="เลข COIO"
                    variant="standard"
                    color="info"
                    size="small"
                    onChange={(e) => {
                      setCoio(e.target.value);
                    }}
                  />

                  <TextField
                    required
                    label="วันที่ Approve"
                    size="small"
                    variant="standard"
                    color="warning"
                    type="date"
                    onChange={(e) => {
                      setDate_approve(e.target.value);
                    }}
                    focused
                  />

                  <Button
                    className="mr10"
                    style={{ width: "20%" }}
                    size="small"
                    type="submit"
                    onClick={Click_approve}
                    variant="contained"
                    color="success"
                  >
                    Approve
                  </Button>
                </Box>
              </Box>
            </Modal>
            {/*========================= */}
          </div>
        )}
      </div>
    </>
  );
}
export default Report_budget;
