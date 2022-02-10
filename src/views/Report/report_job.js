import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Card, CardBody } from "reactstrap";
import server from "variables/port_server";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import swal from "sweetalert";
function Report_budget() {
  const department = localStorage.getItem("department");
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_status, setData_status] = useState([]);
  const [open_return, setOpen_return] = React.useState(false);
  const handleOpen_return = () => setOpen_return(true);
  const handleClose_return = () => {
    setOpen_return(false);
    setJob_run_id_return("");
  };
  const [job_run_id_return, setJob_run_id_return] = useState("");
  //====================================================================

  useEffect(() => {
    fetch(server + "/report_job/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_status(result.data_main_job))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const row = [];
  data_status.forEach((data, key) => {
    row.push({
      key: key + 1,
      job_project_name: data.job_project_name,
      job_project_price: data.job_project_price
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      job_date_request: data.job_date_request,
      job_project_year: data.job_project_year,
      job_department: data.job_department,
      job_time: data.job_time + " เดือน",
      AUFNR: data.AUFNR, //COIO
      action: (
        <div>
          <a
            target={"_blank"}
            href={"/admin/check_job/" + data.job_run_id}
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
          <a
            href={
              server +
              "/pdf_budget_job_" +
              data.assistant +
              "/" +
              data.job_run_id
            }
          >
            <Button variant="contained" color="success" size="small">
              Print
            </Button>
          </a>
        );
      })(),

      action_excel: (() => {
        if (data.status === "dr_success" || data.status === "Approve") {
          return (
            <a href={server + "/excel_js/" + data.job_run_id}>
              <Button variant="contained" color="success" size="small">
                Excel to SAP
              </Button>
            </a>
          );
        }
      })(),

      action_return: (() => {
        if (data.status !== "wait") {
          return (
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => {
                handleOpen_return();
                setJob_run_id_return(data.job_run_id);
              }}
            >
              return
            </Button>
          );
        } else {
          return ( <Button variant="contained" color="warning" size="small" disabled>
            return
          </Button> )
        }
      })(),

      action_delete: (() => {
        if (data.status === "wait") {
          return (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleOpen_return();
                setJob_run_id_return(data.job_run_id);
              }}
            >
              delete
            </Button>
          );
        }else{
          return ( <Button variant="contained" color="error" size="small" disabled>
         delete
        </Button> )
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
        width: 150,
        align: "center",
      },
      {
        label: "status",
        field: "action_status",
        width: 150,
        align: "center",
      },
      {
        label: "COIO",
        field: "AUFNR",
        width: 150,
        align: "center",
      },
      {
        label: "job ปี",
        field: "job_project_year",
        width: 100,
        align: "center",
      },
      {
        label: "ฝ่ายที่ขอ",
        field: "job_department",
        width: 150,
        align: "center",
      },
      {
        label: "Project Name",
        field: "job_project_name",
        width: 200,
        align: "center",
      },
      {
        label: "ราคา",
        field: "job_project_price",
        width: 150,
        align: "center",
      },
      {
        label: "ระยะเวลา",
        field: "job_time",
        width: 150,
        align: "center",
      },
      {
        label: "วันที่ขอ job",
        field: "job_date_request",
        width: 180,
        align: "center",
      },

      {
        label: "PDF",
        field: "action_pdf",
        width: 100,
        align: "center",
      },

      {
        label: "return",
        field: "action_return",
        width: 100,
        align: "center",
      },
      // {
      //   label: "delete",
      //   field: "action_delete",
      //   width: 100,
      //   align: "center",
      // },
      // {
      //   label: "Excel",
      //   field: "action_excel",
      //   width: 170,
      //   align: "center",
      // },
    ],
    rows: row,
  };

  async function Check_return(credentials) {
    return fetch(server + "/return_status_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const Return_status = async (event) => {
    event.preventDefault();
    const response = await Check_return({
      job_run_id_return,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/Report_job";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "25px",
    p: 4,
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
        {/* ============MODAL_return ====================== */}
        <div>
          <Modal
            open={open_return}
            onClose={handleClose_return}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <span>{job_run_id}</span> */}
              <h5 className="text-center">
                <b>ต้องการย้อนกลับไปแก้ไขข้อมูลนี้ ? </b>
              </h5>
              <br />
              <h5 className="text-center">
                ถ้าย้อนกลับไปแก้ไขต้องมีการเซ็นใหม่ทั้งหมด
              </h5>
              <div className="text-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Button
                    variant="contained"
                    onClick={Return_status}
                    size="small"
                    style={{ width: "30%" }}
                    fullWidth
                    color="success"
                  >
                    ตกลง
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleClose_return}
                    size="small"
                    style={{ width: "30%" }}
                    fullWidth
                    color="error"
                  >
                    ยกเลิก
                  </Button>
                </Box>

                <br />
              </div>
            </Box>
          </Modal>
        </div>
        {/* ============MODAL_return ====================== */}
      </div>
    </>
  );
}
export default Report_budget;
