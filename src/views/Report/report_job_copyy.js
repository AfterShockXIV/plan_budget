import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Card, CardBody, Form } from "reactstrap";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import server from "variables/port_server";
import Select from "react-select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PR_TYPE from "../../variables/Insap/PR_TYPE";
import ACCT from "../../variables/Insap/ACCT";
import FACTORY from "../../variables/Insap/FACTORY";
import MenuItem from "@mui/material/MenuItem";

function Report_job() {
  const department = localStorage.getItem("department");
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_status, setData_status] = useState([]);
  const [data_detail, setData_detail] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [job_run_id, setJob_run_id] = useState("");
  const [status, setStatus] = useState("");
  const [coio, setCoio] = useState("");
  const [date_approve, setDate_approve] = useState("");
  const [detail_run_id_job, setDetail_run_id_job] = useState("");
  const [detail_list_job, setDetail_list_job] = useState("");
  const [detail_qty_job, setDetail_qty_job] = useState("");
  const [detail_price_job, setDetail_price_job] = useState("");
  const [detail_sum_job, setDetail_sum_job] = useState("");

  const [project_name, setProject_name] = useState("");
  const [project_price, setProject_price] = useState(0);
  const [project_price_sum, setProject_price_sum] = useState(0);

  const [learn_job, setLearn_job] = useState("");
  const [learn_job_copy, setLearn_job_copy] = useState("");
  const [detail_job, setDetail_job] = useState("");
  const [job_date_request, setJob_date_request] = useState("");

  const [learn_job_edit, setLearn_job_edit] = useState("");
  const [learn_job_copy_edit, setLearn_job_copy_edit] = useState("");
  const [detail_job_edit, setDetail_job_edit] = useState("");
  const [job_date_request_edit, setJob_date_request_edit] = useState("");
  const [job_project_name_edit, setJob_project_name_edit] = useState("");

  const [unit_sap, setUnit_sap] = useState([]);
  const [matgroupData, setMatgroupData] = useState([]);
  const [glData, setGlData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [prtype_job, setPrtype_job] = useState("");
  const [factory, setFactory] = useState("1100");
  const [CostCenter, setCostCenter] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.30.108:7010/apis/getDATA/`)
      .then((response) => response.json())
      .then((result) => setUnit_sap(result.UNITDATA))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(`http://192.168.30.108:7010/apis/getDATA/`)
      .then((response) => response.json())
      .then((result) => setMatgroupData(result.MATGROUPDATA))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(`http://192.168.30.108:7010/apis/getDATA/`)
      .then((response) => response.json())
      .then((result) => setGlData(result.GLDATA))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(`http://192.168.30.108:7010/apis/getDATA/`)
      .then((response) => response.json())
      .then((result) => setCurrData(result.CURRDATA))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(`http://192.168.30.108:7010/apis/getDATA/`)
      .then((response) => response.json())
      .then((result) => setCostCenter(result.COSTDATA))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data_sap_filter = [];
  unit_sap.forEach((data) => {
    data_sap_filter.push({ value: data.MSEH3, label: data.MSEHT });
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open_status, setOpen_status] = React.useState(false);
  const handleOpen_status = () => setOpen_status(true);
  const handleClose_status = () => {
    setOpen_status(false);
    setCoio("");
    setDate_approve("");
  };

  const [open_add, setOpen_add] = React.useState(false);
  const handleOpen_add = () => setOpen_add(true);
  const handleClose_add = () => {
    setOpen_add(false);
  };

  const [open_edit, setOpen_edit] = React.useState(false);

  const handleOpen_edit = () => {
    setOpen_edit(true);
  };

  const handleClose_edit = () => {
    setOpen_edit(false);
    setDetail_run_id_job("");
    setDetail_list_job("");
    setDetail_qty_job("");
    setDetail_price_job("");
    setDetail_sum_job("");
  };

  const [open_delete, setOpen_delete] = React.useState(false);
  const handleOpen_delete = () => setOpen_delete(true);
  const handleClose_delete = () => {
    setOpen_delete(false);
  };

  const [inputList, setInputList] = useState([
    {
      detail_itempr_job: "1",
      detail_list_job: "-",
      detail_qty_job: 0,
      
      detail_price_job: 0,
      detail_sum_job: 0,
      //new
      detail_unit_job: "EA",
      detail_unit_label: "each",

      detail_ACCT_job: "A",

      detail_CURR_job: "THB",
      detail_CURR_label: "Thailand Baht",

      detail_Priceperunit_job: 1,
      detail_material_job: "",

      detail_GL_job: "1299999",
      detail_GL_label: "Clearing Asset",

      detail_MatGroup_job: "",
      detail_MatGroup_label: "",

      detail_CostCenter_job: "",
      detail_CostCenter_label: "",
    },
  ]);

  const handleInputChange_Matgroup = (e, index) => {
    const list = [...inputList];
    list[index].detail_MatGroup_job = e.value;
    list[index].detail_MatGroup_label = e.label;
    setInputList(list);
  };

  const handleInputChange_CostCenter = (e, index) => {
    const list = [...inputList];
    list[index].detail_CostCenter_job = e.value;
    list[index].detail_CostCenter_label = e.label;
    setInputList(list);
  };

  const handleInputChange_GL = (e, index) => {
    const list = [...inputList];
    list[index].detail_GL_job = e.value;
    list[index].detail_GL_label = e.label;
    setInputList(list);
  };

  const handleInputChange_ACCT = (e, index) => {
    const list = [...inputList];
    list[index].detail_ACCT_job = e.target.value;
    setInputList(list);
  };

  const handleInputChange_CURR = (e, index) => {
    const list = [...inputList];
    list[index].detail_CURR_job = e.value;
    list[index].detail_CURR_label = e.label;
    setInputList(list);
  };
  const handleInputChange_select = (e, index) => {
    const list = [...inputList];
    list[index].detail_unit_job = e.value;
    list[index].detail_unit_label = e.label;
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    list[index].detail_sum_job =
      list[index].detail_qty_job * list[index].detail_price_job;
    setInputList(list);
    let project_price_sum = 0;
    inputList.forEach((data) => {
      project_price_sum += +data.detail_sum_job;
    });
    setProject_price_sum(project_price_sum);
    console.log(project_price_sum);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    let count = index + 1;
    let item_pr = index + 2;
    console.log(count);
    const list = [
      ...inputList,
      {
        detail_itempr_job: item_pr,
        detail_list_job: "-",
        detail_qty_job: 0,
        detail_price_job: 0,
        detail_sum_job: 0,
        //new
        detail_unit_job: "EA",
        detail_unit_label: "each",

        detail_ACCT_job: "A",

        detail_CURR_job: "THB",
        detail_CURR_label: "Thailand Baht",

        detail_Priceperunit_job: 1,
        detail_material_job: "",

        detail_GL_job: "1299999",
        detail_GL_label: "Clearing Asset",

        detail_MatGroup_job: "",
        detail_MatGroup_label: "",

        detail_CostCenter_job: "",
        detail_CostCenter_label: "",
      },
    ];
    list[count].detail_MatGroup_job = list[index].detail_MatGroup_job;
    list[count].detail_MatGroup_job = list[index].detail_MatGroup_job;
    list[count].detail_ACCT_job = list[index].detail_ACCT_job;
    list[count].detail_CURR_job = list[index].detail_CURR_job;

    if (list[index].detail_ACCT_job === "A") {
      list[count].detail_GL_job = "1299999";
      list[count].detail_GL_label = "Clearing Asset";
    } else {
      list[count].detail_GL_job = "5290000";
      list[count].detail_GL_label = "Dummy Expense";
    }

    setInputList(list);
  };

  ///================= ADD =================================
  async function Check_bom(credentials) {
    return fetch(server + "/post_add_detail_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  const add_detail_job = async (event) => {
    event.preventDefault();
    const response = await Check_bom({
      project_price,
      inputList,
      job_run_id,
      prtype_job,
      factory,
      department,
      project_name,
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
  //===================================================================
  //====================================================================
  const [run_main, setRun_main] = useState("");
  useEffect(() => {
    fetch(server + "/report_job/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_status(result.data_main_job))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run_main]);

  useEffect(() => {
    fetch(server + "/report_job_detail/" + job_run_id)
      .then((response) => response.json())
      .then((result) => setData_detail(result.data_detail_job))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/report_job_detail/" + job_run_id)
      .then((response) => response.json())
      .then((result) => setStatus(result.status))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job_run_id]);

  async function fetch_data(credentials) {
    return fetch(server + "/post_approve", {
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
      job_run_id,
    });
    console.log(job_run_id);
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
          <Button
            className="mr10"
            size="small"
            onClick={() => {
              handleOpen();
              setJob_run_id(data.job_run_id);
              setProject_name(data.job_project_name);
              setProject_price(data.job_project_price);
              setLearn_job(data.learn_job);
              setLearn_job_copy(data.learn_job_copy);
              setDetail_job(data.detail_job);
              setJob_date_request(data.job_date_request);
              setFactory(data.factory);
              setPrtype_job(data.pr_type);
            }}
            variant="contained"
            color="info"
          >
            Detail
          </Button>
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
        } else {
          return (
            <span
              style={{ fontSize: "12px" }}
              class="badge  badge-pill badge-warning"
            >
              wait . . . .
            </span>
          );
        }
      })(),
      action_pdf: (() => {
        if (data.status === "dr_success" || data.status === "Approve") {
          return (
            <a href={"http://localhost:5050/pdf_budget_job/" + data.job_run_id}>
              <Button variant="contained" color="error" size="small">
                Print
              </Button>
            </a>
          );
        } else {
          return (
            <a href={"http://localhost:5050/pdf_budget_job/" + data.job_run_id}>
              <Button variant="contained" color="error" size="small">
                Print
              </Button>
            </a>
          );
        }
      })(),
      action_excel: (() => {
        if (data.status === "dr_success" || data.status === "Approve") {
          return (
            <a href={"http://localhost:5050/excel_js/" + data.job_run_id}>
              <Button variant="contained" color="success" size="small">
                Excel to SAP
              </Button>
            </a>
          );
        } else {
          // return (
          //   <a href={"http://localhost:5050/excel_js/" + data.job_run_id}>
          //     <Button variant="contained" color="success"  size="small">
          //      Excel to SAP
          //     </Button>
          //   </a>
          // );
        }
      })(),
      action_sig: (() => {
        if (data.status === "wait") {
          return (
            <a
              target="_blank"
              href={"http://localhost:5050/sig_mg_page/" + data.job_run_id}
              rel="noreferrer"
            >
              <Button
                className="mr10"
                size="small"
                variant="contained"
                color="warning"
              >
                ผู้จัดการเซ็นยอมรับ
              </Button>
            </a>
          );
        } else if (data.status === "mg_success") {
          return (
            <a href={"http://localhost:5050/sig_dr_page/" + data.job_run_id}>
              <Button
                className="mr10"
                size="small"
                onClick={() => {
                  // handleOpen_status();
                }}
                variant="contained"
                color="warning"
              >
                ผู้อำนวยการเซ็นยอมรับ
              </Button>
            </a>
          );
        } else if (data.status === "dr_success") {
          if (department.slice(1, -1) === "AC") {
            return (
              <div>
                <Button
                  className="mr10"
                  size="small"
                  onClick={() => {
                    handleOpen_status();
                    setJob_run_id(data.job_run_id);
                    setProject_price(data.job_project_price);
                  }}
                  variant="contained"
                  color="warning"
                >
                  Approve
                </Button>
              </div>
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
        field: "action_sig",
        width: 170,
        align: "center",
      },
      {
        label: "status",
        field: "action_status",
        width: 120,
        align: "center",
      },
      {
        label: "Detail",
        field: "action",
        width: 100,
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
        width: 100,
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
        width: 100,
        align: "center",
      },
      {
        label: "ระยะเวลา",
        field: "job_time",
        width: 100,
        align: "center",
      },
      {
        label: "วันที่ขอ job",
        field: "job_date_request",
        width: 150,
        align: "center",
      },

      {
        label: "PDF",
        field: "action_pdf",
        width: 100,
        align: "center",
      },
      {
        label: "Excel",
        field: "action_excel",
        width: 170,
        align: "center",
      },
    ],
    rows: row,
  };

  const row_detail = [];
  data_detail.forEach((data, key) => {
    row_detail.push({
      key: data.detail_itempr_job * 10,
      detail_list_job: data.detail_list_job,
      detail_qty_job: data.detail_qty_job,
      detail_price_job: data.detail_price_job
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      detail_sum_job: data.detail_sum_job
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      detail_unit_job: data.detail_unit_label,
      detail_CURR_job: data.detail_CURR_job,
      detail_Priceperunit_job: data.detail_Priceperunit_job,
      detail_ACCT_job: data.detail_ACCT_job,
      detail_material_job: data.detail_material_job,
      detail_GL_job: data.detail_GL_label,
      detail_MatGroup_job: data.detail_MatGroup_label,
      detail_CostCenter_job: data.detail_CostCenter_label,
      action: (() => {
        if (status !== "wait") {
          return (
            <Button
              disabled
              className="mr10"
              size="small"
              variant="contained"
              color="secondary"
            >
              edit
            </Button>
          );
        } else {
          return (
            <div>
              <Button
                className="mr10"
                size="small"
                onClick={() => {
                  handleOpen_edit();
                  setDetail_run_id_job(data.detail_run_id_job);
                  setDetail_list_job(data.detail_list_job);
                  setDetail_qty_job(data.detail_qty_job);
                  setDetail_price_job(data.detail_price_job);
                  setDetail_sum_job(data.detail_sum_job);
                  setEdit_list(data.detail_list_job);
                  setEdit_qty(data.detail_qty_job);
                  setEdit_price(data.detail_price_job);
                  setEdit_sum(data.detail_sum_job);
                }}
                variant="contained"
                color="secondary"
              >
                edit
              </Button>
            </div>
          );
        }
      })(),
      delete: (() => {
        if (status !== "wait") {
          return (
            <Button
              disabled
              className="mr10"
              size="small"
              variant="contained"
              color="error"
            >
              delete
            </Button>
          );
        } else {
          return (
            <div>
              <Button
                className="mr10"
                size="small"
                onClick={() => {
                  handleOpen_delete();
                  setDetail_run_id_job(data.detail_run_id_job);
                  setDetail_sum_job(data.detail_sum_job);
                }}
                variant="contained"
                color="error"
              >
                delete
              </Button>
            </div>
          );
        }
      })(),
    });
  });

  const datatable_detail = {
    columns: [
      {
        label: "ACTION",
        field: "action",
        width: 100,
        align: "center",
      },

      {
        label: "ITEM",
        field: "key",
        width: 100,
        align: "center",
      },
      {
        label: "รายการ",
        field: "detail_list_job",
        width: 200,
        align: "center",
      },
      {
        label: "จำนวน",
        field: "detail_qty_job",
        width: 100,
        align: "center",
      },
      {
        label: "ราคาต่อหน่วย",
        field: "detail_price_job",
        width: 100,
        align: "center",
      },
      {
        label: "Unit",
        field: "detail_unit_job",
        width: 100,
        align: "center",
      },

      {
        label: "รวม",
        field: "detail_sum_job",
        width: 100,
        align: "center",
      },
      {
        label: "CURR",
        field: "detail_CURR_job",
        width: 100,
        align: "center",
      },
      {
        label: "Price per unit",
        field: "detail_Priceperunit_job",
        width: 100,
        align: "center",
      },
      {
        label: "ACCT",
        field: "detail_ACCT_job",
        width: 100,
        align: "center",
      },
      {
        label: "Material",
        field: "detail_material_job",
        width: 130,
        align: "center",
      },
      {
        label: "GL",
        field: "detail_GL_job",
        width: 130,
        align: "center",
      },
      {
        label: "MatGroup",
        field: "detail_MatGroup_job",
        width: 130,
        align: "center",
      },
      {
        label: "CostCenter",
        field: "detail_CostCenter_job",
        width: 130,
        align: "center",
      },
      {
        label: "",
        field: "delete",
        width: 100,
        align: "center",
      },
    ],
    rows: row_detail,
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
  const style_delete = {
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
  ///================= EDIT =================================
  const [edit_list, setEdit_list] = useState("");
  const [edit_qty, setEdit_qty] = useState(0);
  const [edit_price, setEdit_price] = useState(0);
  const [edit_sum, setEdit_sum] = useState(0);

  async function Check_edit(credentials) {
    return fetch(server + "/post_edit_detail_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  const edit_detail_job = async (event) => {
    event.preventDefault();
    const response = await Check_edit({
      edit_list,
      edit_qty,
      edit_price,
      edit_sum,
      detail_run_id_job,
      detail_sum_job,
      job_run_id,
      project_price,
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
  ///==================================================

  ///================= DELETE =================================

  async function Check_delete(credentials) {
    return fetch(server + "/post_delete_detail_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  const delete_detail_job = async (event) => {
    event.preventDefault();
    const response = await Check_delete({
      detail_run_id_job,
      detail_sum_job,
      job_run_id,
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
  ///==================================================

  const [open_edit_header, setOpen_edit_header] = React.useState(false);
  const handleOpen_edit_header = () => {
    setOpen_edit_header(true);
  };
  const handleClose_edit_header = () => {
    setOpen_edit_header(false);
    setRun_main(run_main + 1);
  };

  async function fetch_data_header(credentials) {
    return fetch(server + "/update_budget_job_header", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const Click_update = async (event) => {
    event.preventDefault();
    const response = await fetch_data_header({
      learn_job_edit,
      learn_job_copy_edit,
      job_project_name_edit,
      job_date_request_edit,
      detail_job_edit,
      job_run_id,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href =
        // "/admin/Report_job"// + response.budget_run_id;
        handleClose_edit_header();
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
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

        {/* ============MODAL====================== */}
        <Modal
          style={{ overflow: "scroll" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {loading ? (
              <div class="loader"></div>
            ) : (
              <div sx={{ width: "100%" }}>
                <h6>
                  แผนงบประมาณ ของฝ่าย : {department}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {(() => {
                    if (status === "wait") {
                      return (
                        <Button
                          className="mr10"
                          size="small"
                          onClick={() => {
                            handleOpen_edit_header();
                            setLearn_job_edit(learn_job);
                            setLearn_job_copy_edit(learn_job_copy);
                            setDetail_job_edit(detail_job);
                            setJob_project_name_edit(project_name);
                            setJob_date_request_edit(job_date_request);
                          }}
                          variant="contained"
                          color="warning"
                        >
                          UPDATE header
                        </Button>
                      );
                    }
                  })()}
                </h6>
                <br />
                <h6>
                  เรื่อง : {project_name} &nbsp;&nbsp;|| &nbsp;&nbsp; เรียน :{" "}
                  {learn_job} &nbsp;&nbsp;|| &nbsp;&nbsp; สำเนาเรียน :{" "}
                  {learn_job_copy} || factory :{" "}
                  {(() => {
                    if (factory === "1100") {
                      return <span>บริษัท วีนายน์ เคเบิ้ล จำกัด</span>;
                    }
                    return <span>บริษัท วีนายน์ คอปเปอร์ จำกัด</span>;
                  })()}{" "}
                  || PR Type : {prtype_job}
                </h6>
                <br />
                <h6>รายละเอียด : {detail_job}</h6>

                <MDBDataTableV5
                  striped
                  bordered
                  hover
                  entriesOptions={[5]}
                  entries={5}
                  pagesAmount={1}
                  scrollX
                  data={datatable_detail}
                  searchTop
                  searchBottom={false}
                />
              </div>
            )}
            <div>
              {/* BTN Approve */}
              {(() => {
                if (status === "wait") {
                  return (
                    <div>
                      <Button
                        className="mr10"
                        size="small"
                        onClick={() => {
                          handleOpen_add();
                        }}
                        variant="contained"
                        color="info"
                      >
                        เพิ่มข้อมูล
                      </Button>
                      &nbsp;&nbsp;
                      <a
                        target="_blank"
                        href={"http://localhost:5050/sig_mg_page/" + job_run_id}
                        rel="noreferrer"
                      >
                        <Button
                          className="mr10"
                          size="small"
                          variant="contained"
                          color="warning"
                        >
                          ผู้จัดการเซ็นยอมรับ
                        </Button>
                      </a>
                    </div>
                  );
                } else if (status === "mg_success") {
                  return (
                    <a href={"http://localhost:5050/sig_dr_page/" + job_run_id}>
                      <Button
                        className="mr10"
                        size="small"
                        onClick={() => {
                          // handleOpen_status();
                        }}
                        variant="contained"
                        color="warning"
                      >
                        ผู้อำนวยการเซ็นยอมรับ
                      </Button>
                    </a>
                  );
                } else if (status === "dr_success") {
                  if (department.slice(1, -1) === "AC") {
                    return (
                      <div>
                        <Button
                          className="mr10"
                          size="small"
                          onClick={() => {
                            handleOpen_status();
                          }}
                          variant="contained"
                          color="warning"
                        >
                          Approve
                        </Button>
                      </div>
                    );
                  } else {
                  }
                } else if (status === "Approve") {
                }
              })()}
            </div>
          </Box>
        </Modal>

        {/*========================= */}

        {/* ============MODAL_status====================== */}
        <div>
          <Modal
            open={open_status}
            onClose={handleClose_status}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <span>{job_run_id}</span> */}
              <h6>
                Approve Budget : {project_name} || ราคา : {project_price}
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
        </div>
        {/*========================= */}

        {/* ============MODAL_add====================== */}
        <div>
          <Modal
            open={open_add}
            onClose={handleClose_add}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <span>{job_run_id}</span> */}
              <h6>
                เพิ่มข้อมูลรายละเอียด: {project_name} || ราคา : {project_price}{" "}
                || ยอดที่เพิ่มมา : {project_price_sum} || รวมทั้งหมด{" "}
                {+project_price_sum + +project_price}
              </h6>
              <br />
              <div>
                <h5>รายละเอียด</h5>
                <div
                  style={{
                    height: "300px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  {inputList.map((x, i) => {
                    return (
                      <Card>
                        <CardBody>
                          <div>
                            <br />

                            <Button
                              variant="contained"
                              onClick={() => handleAddClick(i)}
                              size="small"
                            >
                              {" "}
                              Add{" "}
                            </Button>
                          </div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1, width: "20%" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              size="small"
                              color="warning"
                              variant="standard"
                              label="ลำดับ"
                              value={i + 1}
                              style={{ width: "5%" }}
                              focused
                            />

                            <TextField
                              size="small"
                              color="info"
                              variant="standard"
                              label="รายการ"
                              name="detail_list_job"
                              value={x.detail_list_job}
                              style={{ width: "30%" }}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <TextField
                              style={{ width: "10%" }}
                              size="small"
                              color="info"
                              variant="standard"
                              label="จำนวน"
                              type="number"
                              name="detail_qty_job"
                              value={x.detail_qty_job}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <TextField
                              style={{ width: "10%" }}
                              size="small"
                              color="info"
                              variant="standard"
                              label="ราคาต่อหน่วย"
                              type="number"
                              name="detail_price_job"
                              value={x.detail_price_job}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <TextField
                              style={{ width: "10%" }}
                              color="info"
                              variant="standard"
                              label="รวม"
                              type="number"
                              size="small"
                              name="detail_sum_job"
                              value={x.detail_sum_job}
                              InputProps={{
                                readOnly: true,
                              }}
                            />

                            <TextField
                              style={{ width: "5%" }}
                              color="info"
                              variant="standard"
                              label="Price per unit"
                              size="small"
                              name="detail_Priceperunit_job"
                              value={x.detail_Priceperunit_job}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <TextField
                              id="standard-select-currency"
                              select
                              style={{ width: "6%" }}
                              label="ACCT"
                              value={x.detail_ACCT_job}
                              onChange={(e) => {
                                handleInputChange_ACCT(e, i);
                              }}
                              variant="standard"
                              size="small"
                              color="warning"
                              name="detail_ACCT_job"
                            >
                              {ACCT.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              style={{ width: "15%" }}
                              color="info"
                              variant="standard"
                              label="Material"
                              size="small"
                              name="detail_material_job"
                              value={x.detail_material_job}
                              onChange={(e) => handleInputChange(e, i)}
                            />

                            <div className="row" style={{ width: "100%" }}>
                              <div className="col-2">
                                <Select
                                  size="small"
                                  placeholder="THB"
                                  class="form-control form-control-sm "
                                  options={currData}
                                  name="detail_CURR_job"
                                  onChange={(e) => {
                                    handleInputChange_CURR(e, i);
                                  }}
                                />
                              </div>

                              <div className="col-2">
                                <Select
                                  size="small"
                                  placeholder="each"
                                  class="form-control form-control-sm"
                                  options={data_sap_filter}
                                  name="detail_unit_job"
                                  onChange={(e) => {
                                    handleInputChange_select(e, i);
                                  }}
                                />
                              </div>

                              <div className="col-2">
                                <Select
                                  size="small"
                                  placeholder={x.detail_GL_label}
                                  class="form-control form-control-sm "
                                  options={glData}
                                  name="detail_GL_job"
                                  onChange={(e) => {
                                    handleInputChange_GL(e, i);
                                  }}
                                />
                              </div>

                              <div className="col-3">
                                <Select
                                  size="small"
                                  placeholder="MAT GROUP"
                                  class="form-control form-control-sm "
                                  options={matgroupData}
                                  name="detail_MatGroup_job"
                                  defaultValue=""
                                  onChange={(e) => {
                                    handleInputChange_Matgroup(e, i);
                                  }}
                                />
                              </div>
                              <div className="col-3">
                                <Select
                                  size="small"
                                  placeholder="COST CENTER"
                                  class="form-control form-control-sm "
                                  options={CostCenter}
                                  name="detail_CostCenter_job"
                                  onChange={(e) => {
                                    handleInputChange_CostCenter(e, i);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div style={{ paddingRight: "10px" }}>
                                {inputList.length !== 1 && (
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleRemoveClick(i)}
                                    size="small"
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>
                            </div>
                            <hr style={{ width: "100%" }} />
                          </Box>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
                <br />

                <div>
                  <Button
                    variant="contained"
                    onClick={add_detail_job}
                    size="small"
                    style={{ width: "33%" }}
                    fullWidth
                    color="success"
                  >
                    เพิ่มข้อมูล
                  </Button>
                </div>
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
            </Box>
          </Modal>
        </div>
        {/*========================= */}

        {/* ============MODAL_edit====================== */}
        <div>
          <Modal
            open={open_edit}
            onClose={handleClose_edit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <span>{job_run_id}</span> */}
              <h6>แก้ไขข้อมูลรายละเอียด</h6>
              <br />
              <div>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    color="info"
                    variant="standard"
                    label="รายการ"
                    name="detail_list_job"
                    defaultValue={detail_list_job}
                    style={{ width: "50%" }}
                    onChange={(e) => {
                      setEdit_list(e.target.value);
                    }}
                  />

                  <TextField
                    color="info"
                    variant="standard"
                    label="จำนวน"
                    type="number"
                    name="detail_qty_job"
                    defaultValue={detail_qty_job}
                    style={{ width: "10%" }}
                    onChange={(e) => {
                      setEdit_qty(e.target.value);
                      setEdit_sum(e.target.value * edit_price);
                    }}
                  />

                  <TextField
                    color="info"
                    variant="standard"
                    label="ราคาต่อหน่วย"
                    type="number"
                    name="detail_price_job"
                    defaultValue={detail_price_job}
                    style={{ width: "10%" }}
                    onChange={(e) => {
                      setEdit_price(e.target.value);
                      setEdit_sum(e.target.value * edit_qty);
                    }}
                  />

                  <TextField
                    color="info"
                    variant="standard"
                    label="รวม"
                    type="number"
                    value={edit_sum}
                    style={{ width: "20%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <div>
                  <Form onSubmit={edit_detail_job}>
                    <Button
                      variant="contained"
                      type="submit"
                      size="small"
                      style={{ width: "33%" }}
                      fullWidth
                      color="success"
                    >
                      UPDATE
                    </Button>
                  </Form>
                </div>
                <br />
                {/* {edit_list} <br />
                {edit_qty} <br />
                {edit_price} <br /> {edit_sum} */}
                {/* {edit_qty * edit_price} */}
                {/* {test_text}
                <div style={{ marginTop: 20 }}>{JSON.stringify(editList)}</div> */}
              </div>
            </Box>
          </Modal>
        </div>
        {/*========================= */}

        {/* ============MODAL_delete====================== */}
        <div>
          <Modal
            open={open_delete}
            onClose={handleClose_delete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style_delete}>
              {/* <span>{job_run_id}</span> */}
              <h5 className="text-center">
                <b>ต้องการลบข้อมูลนี้ ? </b>
              </h5>
              <br />
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
                    onClick={delete_detail_job}
                    size="small"
                    style={{ width: "30%" }}
                    fullWidth
                    color="error"
                  >
                    ตกลง
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleClose_delete}
                    size="small"
                    style={{ width: "30%" }}
                    fullWidth
                    color="warning"
                  >
                    ยกเลิก
                  </Button>
                </Box>

                <br />
                {/* {edit_list} <br />
                {edit_qty} <br />
                {edit_price} <br /> {edit_sum} */}
                {/* {edit_qty * edit_price} */}
                {/* {test_text}
                <div style={{ marginTop: 20 }}>{JSON.stringify(editList)}</div> */}
              </div>
            </Box>
          </Modal>

          <Modal
            open={open_edit_header}
            onClose={handleClose_edit_header}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <span>{job_run_id}</span> */}
              <h6>แก้ไขข้อมูลโครงการ</h6>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "45%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  label="เรื่อง"
                  size="small"
                  variant="standard"
                  color="info"
                  defaultValue={project_name}
                  onChange={(event) => {
                    setJob_project_name_edit(event.target.value);
                  }}
                />

                <TextField
                  id="standard-select-currency"
                  label="เรียน"
                  variant="standard"
                  size="small"
                  color="warning"
                  defaultValue={learn_job}
                  onChange={(e) => {
                    setLearn_job_edit(e.target.value);
                  }}
                />

                <TextField
                  id="standard-select-currency"
                  label="สำเนาเรียน"
                  variant="standard"
                  size="small"
                  color="warning"
                  defaultValue={learn_job_copy}
                  onChange={(e) => {
                    setLearn_job_copy_edit(e.target.value);
                  }}
                />

                <TextField
                  required
                  label="วันที่ขอ"
                  size="small"
                  type="date"
                  variant="standard"
                  color="info"
                  defaultValue={job_date_request}
                  onChange={(event) => {
                    setJob_date_request_edit(event.target.value);
                  }}
                />
                <TextareaAutosize
                  placeholder="รายละเอียด"
                  style={{ width: "97%" }}
                  minRows={5}
                  defaultValue={detail_job}
                  onChange={(e) => {
                    setDetail_job_edit(e.target.value);
                  }}
                />

                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={Click_update}
                >
                  update
                </Button>
              </Box>
              <div>
                <br />
              </div>
            </Box>
          </Modal>
        </div>
        {/*========================= */}
      </div>
    </>
  );
}
export default Report_job;
