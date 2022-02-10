import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
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

export default function Check_job(props) {
  const department = localStorage.getItem("department");
  const assistant = localStorage.getItem("assistant");
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [status, setData_status] = useState([]);

  const [data_detail, setData_detail] = useState([]);
  const [main_job, setMain_job] = useState([]);

  const [unit_sap, setUnit_sap] = useState([]);
  const [matgroupData, setMatgroupData] = useState([]);
  const [glData, setGlData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [prtype_job, setPrtype_job] = useState("");

  const [factory, setFactory] = useState("1100");
  const [CostCenter, setCostCenter] = useState([]);

  // const [project_name, setProject_name] = useState("");
  // const [project_price, setProject_price] = useState(0);
  const [, setProject_price_sum] = useState(0);

  const [learn_job_edit, setLearn_job_edit] = useState("");
  const [learn_job_copy_edit, setLearn_job_copy_edit] = useState("");
  const [detail_job_edit, setDetail_job_edit] = useState("");
  const [job_date_request_edit, setJob_date_request_edit] = useState("");
  const [job_project_name_edit, setJob_project_name_edit] = useState("");
  const [job_time_edit, setJob_time_edit] = useState("");
  const [prtype_job_edit, setPrtype_job_edit] = useState("");
  const [factory_edit, setFactory_edit] = useState("");

  const [detail_run_id_job, setDetail_run_id_job] = useState("");
  const [detail_itempr_job, setDetail_itempr_job] = useState("");
  const [detail_list_job, setDetail_list_job] = useState("");
  const [detail_qty_job, setDetail_qty_job] = useState("");
  const [detail_price_job, setDetail_price_job] = useState("");
  const [detail_sum_job, setDetail_sum_job] = useState("");
  const [detail_Priceperunit_job, setDetail_Priceperunit_job] = useState("");
  const [detail_ACCT_job, setDetail_ACCT_job] = useState("");
  const [detail_material_job, setDetail_material_job] = useState("");

  const [detail_unit_job, setDetail_unit_job] = useState("");
  const [detail_CURR_job, setDetail_CURR_job] = useState("");
  const [detail_GL_job, setDetail_GL_job] = useState("");
  const [detail_MatGroup_job, setDetail_MatGroup_job] = useState("");
  const [detail_CostCenter_job, setDetail_CostCenter_job] = useState("");

  const [detail_unit_label, setDetail_unit_label] = useState("");
  const [detail_CURR_label, setDetail_CURR_label] = useState("");
  const [detail_GL_label, setDetail_GL_label] = useState("");
  const [detail_MatGroup_label, setDetail_MatGroup_label] = useState("");
  const [detail_CostCenter_label, setDetail_CostCenter_label] = useState("");
  const [ole_price, setOle_price] = useState("");

  useEffect(() => {
    fetch(server + "/report_job_detail/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_detail(result.data_detail_job))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/report_job_detail/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_status(result.status))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/report_job_detail/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setMain_job(result.main_job))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [open_add, setOpen_add] = React.useState(false);
  const handleOpen_add = () => setOpen_add(true);
  const handleClose_add = () => {
    setOpen_add(false);
  };
  const [open_delete, setOpen_delete] = React.useState(false);
  const handleOpen_delete = () => setOpen_delete(true);
  const handleClose_delete = () => {
    setOpen_delete(false);
  };
  const [inputList, setInputList] = useState([
    {
      detail_itempr_job: "1",
      detail_list_job: "",
      detail_qty_job: "",
      detail_price_job: "",
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

      detail_MatGroup_job: "80806",
      detail_MatGroup_label: "สินทรัพย์",

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
        detail_list_job: "",
        detail_qty_job: "",
        detail_price_job: "",
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

        detail_MatGroup_job: "80806",
        detail_MatGroup_label: "สินทรัพย์",

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
  let job_run_id = props.match.params.id;
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
  let prtype = main_job.pr_type;
  let job_project_name = main_job.job_project_name;
  let job_project_price = main_job.job_project_price;
  const add_detail_job = async (event) => {
    event.preventDefault();
    const response = await Check_bom({
      prtype,
      job_project_name,
      job_project_price,
      inputList,
      job_run_id,
      prtype_job,
      factory,
      department,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/check_job/" + props.match.params.id;
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  //===================================================================
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
        window.location.href = "/admin/check_job/" + job_run_id;
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  ///==================================================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
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
  const row = [];
  data_detail.forEach((data, key) => {
    row.push({
      key: data.detail_itempr_job * 10,
      detail_list_job: data.detail_list_job,
      detail_qty_job: data.detail_qty_job,
      detail_price_job: data.detail_price_job
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      detail_sum_job: data.detail_sum_job
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      detail_unit_job: data.detail_unit_job,
      detail_CURR_job: data.detail_CURR_job,
      detail_Priceperunit_job: data.detail_Priceperunit_job,
      detail_ACCT_job: data.detail_ACCT_job,
      detail_material_job: data.detail_material_job,
      detail_GL_job: data.detail_GL_label,
      detail_MatGroup_job: data.detail_MatGroup_label,
      detail_CostCenter_job: data.detail_CostCenter_label,
      action_edit: (() => {
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
                  setDetail_itempr_job(data.detail_itempr_job);
                  setDetail_list_job(data.detail_list_job);
                  setDetail_qty_job(data.detail_qty_job);
                  setDetail_price_job(data.detail_price_job);
                  setDetail_sum_job(data.detail_sum_job);
                  setDetail_Priceperunit_job(data.detail_Priceperunit_job);
                  setDetail_ACCT_job(data.detail_ACCT_job);
                  setDetail_material_job(data.detail_material_job);

                  setDetail_unit_job(data.detail_unit_job);
                  setDetail_CURR_job(data.detail_CURR_job);
                  setDetail_GL_job(data.detail_GL_job);
                  setDetail_MatGroup_job(data.detail_MatGroup_job);
                  setDetail_CostCenter_job(data.detail_CostCenter_job);

                  setDetail_unit_label(data.detail_unit_label);
                  setDetail_CURR_label(data.detail_CURR_label);
                  setDetail_GL_label(data.detail_GL_label);
                  setDetail_MatGroup_label(data.detail_MatGroup_label);
                  setDetail_CostCenter_label(data.detail_CostCenter_label);
                  setOle_price(main_job.job_project_price);
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
  const datatable = {
    columns: [
      {
        label: "edit",
        field: "action_edit",
        width: 120,
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
        width: 150,
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
        label: "PPU",
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
    rows: row,
  };

  const [open_edit, setOpen_edit] = React.useState(false);
  const handleOpen_edit = () => {
    setOpen_edit(true);
  };
  const handleClose_edit = () => {
    setOpen_edit(false);
  };

  const [open_edit_header, setOpen_edit_header] = React.useState(false);
  const handleOpen_edit_header = () => {
    setOpen_edit_header(true);
  };
  const handleClose_edit_header = () => {
    setOpen_edit_header(false);
  };

  const [open_edit_header_check, setOpen_edit_header_check] =
    React.useState(false);
  const handleOpen_edit_header_check = () => {
    setOpen_edit_header_check(true);
  };
  const handleClose_edit_header_check = () => {
    setOpen_edit_header_check(false);
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
      job_time_edit,
      prtype_job_edit,
      factory_edit,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href =
        window.location.href = "/admin/check_job/" + props.match.params.id;
        handleClose_edit_header();
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  async function fetch_data_detail(credentials) {
    return fetch(server + "/post_edit_detail_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  const Click_update_detail = async (event) => {
    event.preventDefault();
    const response = await fetch_data_detail({
      detail_run_id_job,
      detail_list_job,
      detail_qty_job,
      detail_price_job,
      detail_sum_job,
      detail_Priceperunit_job,
      detail_ACCT_job,
      detail_material_job,

      detail_unit_job,
      detail_CURR_job,
      detail_GL_job,
      detail_MatGroup_job,
      detail_CostCenter_job,

      detail_unit_label,
      detail_CURR_label,
      detail_GL_label,
      detail_MatGroup_label,
      detail_CostCenter_label,
      ole_price,
      job_run_id,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href =
        window.location.href = "/admin/check_job/" + props.match.params.id;
        handleClose_edit_header();
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  const [open_status, setOpen_status] = React.useState(false);
  const handleOpen_status = () => setOpen_status(true);
  const [coio, setCoio] = useState("");
  const [date_approve, setDate_approve] = useState("");
  const handleClose_status = () => {
    setOpen_status(false);
    setCoio("");
    setDate_approve("");
  };
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

  return (
    <>
      <div className="content">
        {loading ? (
          <div class="loader"></div>
        ) : (
          <Card>
            <CardBody>
              {/* <h6>
                แผนงบประมาณ ของฝ่าย : {department.slice(1, -1)} || งบ Budget :
                {main_job.job_project_price}
                <br />
                <h6>
                  เรื่อง : {main_job.job_project_name} &nbsp;&nbsp;||
                  &nbsp;&nbsp; เรียน : {main_job.learn_job} &nbsp;&nbsp;||
                  &nbsp;&nbsp; สำเนาเรียน : {main_job.learn_job_copy}{" "}
                  &nbsp;&nbsp;||&nbsp;&nbsp; factory :{" "}
                  {(() => {
                    if (main_job.factory === "1100") {
                      return <span>บริษัท วีนายน์ เคเบิ้ล จำกัด</span>;
                    }
                    return <span>บริษัท วีนายน์ คอปเปอร์ จำกัด</span>;
                  })()}{" "}
                  &nbsp;&nbsp; ||&nbsp;&nbsp; PR Type : {main_job.pr_type}
                </h6>
              </h6> */}
              <br />

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
                            handleOpen_edit_header();
                            setPrtype_job(main_job.pr_type);
                            setFactory(main_job.factory);
                            setJob_project_name_edit(main_job.job_project_name);
                            setLearn_job_edit(main_job.learn_job);
                            setLearn_job_copy_edit(main_job.learn_job_copy);
                            setDetail_job_edit(main_job.detail_job);
                            setJob_date_request_edit(main_job.job_date_request);
                            setJob_time_edit(main_job.job_time);
                            setPrtype_job_edit(main_job.pr_type);
                            setFactory_edit(main_job.factory);
                          }}
                          variant="contained"
                          color="info"
                        >
                          UPDATE HEADER
                        </Button>
                        &nbsp;&nbsp;
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
                          href={server + "/sig_mg_page/" + job_run_id}
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
                      <div>
                        <Button
                          className="mr10"
                          size="small"
                          onClick={() => {
                            handleOpen_edit_header_check();
                            setPrtype_job(main_job.pr_type);
                            setFactory(main_job.factory);
                            setJob_project_name_edit(main_job.job_project_name);
                            setLearn_job_edit(main_job.learn_job);
                            setLearn_job_copy_edit(main_job.learn_job_copy);
                            setDetail_job_edit(main_job.detail_job);
                            setJob_date_request_edit(main_job.job_date_request);
                            setJob_time_edit(main_job.job_time);
                            setPrtype_job_edit(main_job.pr_type);
                            setFactory_edit(main_job.factory);
                          }}
                          variant="contained"
                          color="info"
                        >
                          HEADER
                        </Button>
                        &nbsp;&nbsp;
                        <a href={server + "/sig_dr_page/" + job_run_id}>
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
                      </div>
                    );
                  } else if (status === "dr_success") {
                    if (assistant.slice(1, -1) === "AMD") {
                      return (
                        <div>
                          <Button
                            className="mr10"
                            size="small"
                            onClick={() => {
                              handleOpen_edit_header_check();
                              setPrtype_job(main_job.pr_type);
                              setFactory(main_job.factory);
                              setJob_project_name_edit(
                                main_job.job_project_name
                              );
                              setLearn_job_edit(main_job.learn_job);
                              setLearn_job_copy_edit(main_job.learn_job_copy);
                              setDetail_job_edit(main_job.detail_job);
                              setJob_date_request_edit(
                                main_job.job_date_request
                              );
                              setJob_time_edit(main_job.job_time);
                              setPrtype_job_edit(main_job.pr_type);
                              setFactory_edit(main_job.factory);
                            }}
                            variant="contained"
                            color="info"
                          >
                            HEADER
                          </Button>
                          &nbsp;&nbsp;
                          <a href={server + "/sig_AMD_page/" + job_run_id}>

                            <Button
                              className="mr10"
                              size="small"
                              variant="contained"
                              color="warning"
                            >
                              AMD ส่วนงานผลิต เซ็นยอมรับ
                            </Button>

                          </a>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <Button
                            className="mr10"
                            size="small"
                            onClick={() => {
                              handleOpen_edit_header_check();
                              setPrtype_job(main_job.pr_type);
                              setFactory(main_job.factory);
                              setJob_project_name_edit(
                                main_job.job_project_name
                              );
                              setLearn_job_edit(main_job.learn_job);
                              setLearn_job_copy_edit(main_job.learn_job_copy);
                              setDetail_job_edit(main_job.detail_job);
                              setJob_date_request_edit(
                                main_job.job_date_request
                              );
                              setJob_time_edit(main_job.job_time);
                              setPrtype_job_edit(main_job.pr_type);
                              setFactory_edit(main_job.factory);
                            }}
                            variant="contained"
                            color="info"
                          >
                            HEADER
                          </Button>
                          &nbsp;&nbsp;
                          <a href={server + "/sig_AMD2_page/" + job_run_id}>

                            <Button
                              className="mr10"
                              size="small"
                              variant="contained"
                              color="warning"
                            >
                              AMD ส่วนงานสนับสนุน เซ็นยอมรับ
                            </Button>

                          </a>
                        </div>
                      );
                    }
                  } else if (status === "AMD_success") {
                    return (
                      <div>
                        <Button
                          className="mr10"
                          size="small"
                          onClick={() => {
                            handleOpen_edit_header_check();
                            setPrtype_job(main_job.pr_type);
                            setFactory(main_job.factory);
                            setJob_project_name_edit(main_job.job_project_name);
                            setLearn_job_edit(main_job.learn_job);
                            setLearn_job_copy_edit(main_job.learn_job_copy);
                            setDetail_job_edit(main_job.detail_job);
                            setJob_date_request_edit(main_job.job_date_request);
                            setJob_time_edit(main_job.job_time);
                            setPrtype_job_edit(main_job.pr_type);
                            setFactory_edit(main_job.factory);
                          }}
                          variant="contained"
                          color="info"
                        >
                          HEADER
                        </Button>
                        &nbsp;&nbsp;
                        <a href={server + "/sig_AMD2_page/" + job_run_id}>

                          <Button
                            className="mr10"
                            size="small"
                            variant="contained"
                            color="warning"
                          >
                            AMD ส่วนงานสนับสนุน เซ็นยอมรับ
                          </Button>

                        </a>
                      </div>
                    );
                  } else if (status === "AMD2_success") {
                    return (
                      <div>
                        <Button
                          className="mr10"
                          size="small"
                          onClick={() => {
                            handleOpen_edit_header_check();
                            setPrtype_job(main_job.pr_type);
                            setFactory(main_job.factory);
                            setJob_project_name_edit(main_job.job_project_name);
                            setLearn_job_edit(main_job.learn_job);
                            setLearn_job_copy_edit(main_job.learn_job_copy);
                            setDetail_job_edit(main_job.detail_job);
                            setJob_date_request_edit(main_job.job_date_request);
                            setJob_time_edit(main_job.job_time);
                            setPrtype_job_edit(main_job.pr_type);
                            setFactory_edit(main_job.factory);
                          }}
                          variant="contained"
                          color="info"
                        >
                          HEADER
                        </Button>
                        &nbsp;&nbsp;
                        <a href={server + "/sig_MD_page/" + job_run_id}>

                          <Button
                            className="mr10"
                            size="small"
                            variant="contained"
                            color="warning"
                          >
                            MD เซ็นยอมรับ
                          </Button>

                        </a>
                      </div>
                    );
                  } else if (status === "MD_success") {
                    if (department.slice(1, -1) === "ACM") {
                      return (
                        <div>
                          <Button
                            className="mr10"
                            size="small"
                            onClick={() => {
                              handleOpen_edit_header_check();
                              setPrtype_job(main_job.pr_type);
                              setFactory(main_job.factory);
                              setJob_project_name_edit(
                                main_job.job_project_name
                              );
                              setLearn_job_edit(main_job.learn_job);
                              setLearn_job_copy_edit(main_job.learn_job_copy);
                              setDetail_job_edit(main_job.detail_job);
                              setJob_date_request_edit(
                                main_job.job_date_request
                              );
                              setJob_time_edit(main_job.job_time);
                              setPrtype_job_edit(main_job.pr_type);
                              setFactory_edit(main_job.factory);
                            }}
                            variant="contained"
                            color="info"
                          >
                            HEADER
                          </Button>
                          &nbsp;&nbsp;

                          <Button
                            className="mr10"
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              handleOpen_status();
                            }}
                          >
                            APPROVE
                          </Button>

                        </div>
                      );
                    }
                  } else {
                    return (
                      <div>
                        <Button
                          className="mr10"
                          size="small"
                          onClick={() => {
                            handleOpen_edit_header_check();
                            setPrtype_job(main_job.pr_type);
                            setFactory(main_job.factory);
                            setJob_project_name_edit(main_job.job_project_name);
                            setLearn_job_edit(main_job.learn_job);
                            setLearn_job_copy_edit(main_job.learn_job_copy);
                            setDetail_job_edit(main_job.detail_job);
                            setJob_date_request_edit(main_job.job_date_request);
                            setJob_time_edit(main_job.job_time);
                            setPrtype_job_edit(main_job.pr_type);
                            setFactory_edit(main_job.factory);
                          }}
                          variant="contained"
                          color="info"
                        >
                          HEADER
                        </Button>
                        &nbsp;&nbsp;
                      </div>
                    )
                  }
                })()}
              </div>
              <br />
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
                    <br />
                    <div>
                      <h5>เพิ่มข้อมูลรายละเอียด</h5>
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
                                <Form onSubmit={add_detail_job}>
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
                                   
                                    sx={{
                                      "& > :not(style)": { m: 1, width: "20%" },
                                    }}

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
                                      required
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
                                      required
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
                                      required
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
                                      label="Price per unit"
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

                                    <div
                                      className="row"
                                      style={{ width: "100%" }}
                                    >
                                      <div className="col-2">
                                      <label>สกุลเงิน</label>
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
                                      <label>หน่วย</label>
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
                                      <label>GL</label>
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
                                      <label>MatGroup</label>
                                        <Select
                                          size="small"
                                          placeholder={x.detail_MatGroup_label}
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
                                      <label>COST CENTER</label>
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

                                    <div>
                                      <Button
                                        variant="contained"

                                        size="small"
                                        type="submit"
                                        style={{ width: "33%" }}
                                        fullWidth
                                        color="success"
                                      >
                                        เพิ่มข้อมูล
                                      </Button>
                                    </div>
                                  </Box>
                                </Form>
                              </CardBody>
                            </Card>
                          );
                        })}
                      </div>
                      <br />


                      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                    </div>
                  </Box>
                </Modal>
              </div>
              {/*========================= */}
              <div>
                <Modal
                  open={open_edit_header}
                  onClose={handleClose_edit_header}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <span>{job_run_id}</span> */}
                    <h6>แก้ไขข้อมูลหัวเรื่อง</h6>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "45%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-select-currency"
                        select
                        label="บริษัท"
                        defaultValue={factory}
                        onChange={(e) => {
                          setFactory_edit(e.target.value);
                        }}
                        variant="standard"
                        size="small"
                        color="warning"
                      >
                        {FACTORY.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="standard-select-currency"
                        select
                        label="PR TYPE"
                        defaultValue={prtype_job}
                        onChange={(e) => {
                          setPrtype_job_edit(e.target.value);
                        }}
                        variant="standard"
                        fullWidth
                        size="small"
                        color="warning"
                      >
                        {PR_TYPE.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        required
                        label="เรื่อง"
                        size="small"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_project_name}
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
                        defaultValue={main_job.learn_job}
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
                        defaultValue={main_job.learn_job_copy}
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
                        defaultValue={main_job.job_date_request}
                        onChange={(event) => {
                          setJob_date_request_edit(event.target.value);
                        }}
                      />

                      <TextField
                        required
                        label="แผนงบประมาณ Project ประจำปี"
                        size="small"
                        type="number"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_project_year}
                        onChange={(event) => {
                          setJob_date_request_edit(event.target.value);
                        }}
                      />

                      <TextField
                        required
                        label="ระยะเวลา (เดือน) "
                        size="small"
                        type="number"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_time}
                        onChange={(event) => {
                          setJob_time_edit(event.target.value);
                        }}
                      />

                      <TextareaAutosize
                        placeholder="รายละเอียด"
                        style={{ width: "97%" }}
                        minRows={5}
                        defaultValue={main_job.detail_job}
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
              {/*=============== Header ========= */}
              <div>
                <Modal
                  open={open_edit_header_check}
                  onClose={handleClose_edit_header_check}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <span>{job_run_id}</span> */}
                    <h6>หัวเรื่อง</h6>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "45%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        id="standard-select-currency"
                        select
                        label="บริษัท"
                        defaultValue={factory}
                        onChange={(e) => {
                          setFactory_edit(e.target.value);
                        }}
                        variant="standard"
                        size="small"
                        color="warning"
                      >
                        {FACTORY.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        id="standard-select-currency"
                        select
                        label="PR TYPE"
                        defaultValue={prtype_job}
                        onChange={(e) => {
                          setPrtype_job_edit(e.target.value);
                        }}
                        variant="standard"
                        fullWidth
                        size="small"
                        color="warning"
                      >
                        {PR_TYPE.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        required
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        label="เรื่อง"
                        size="small"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_project_name}
                        onChange={(event) => {
                          setJob_project_name_edit(event.target.value);
                        }}
                      />

                      <TextField
                        id="standard-select-currency"
                        label="เรียน"
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        variant="standard"
                        size="small"
                        color="warning"
                        defaultValue={main_job.learn_job}
                        onChange={(e) => {
                          setLearn_job_edit(e.target.value);
                        }}
                      />

                      <TextField
                        id="standard-select-currency"
                        label="สำเนาเรียน"
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        variant="standard"
                        size="small"
                        color="warning"
                        defaultValue={main_job.learn_job_copy}
                        onChange={(e) => {
                          setLearn_job_copy_edit(e.target.value);
                        }}
                      />

                      <TextField
                        required
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        label="วันที่ขอ"
                        size="small"
                        type="date"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_date_request}
                        onChange={(event) => {
                          setJob_date_request_edit(event.target.value);
                        }}
                      />

                      <TextField
                        required
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        label="แผนงบประมาณ Project ประจำปี"
                        size="small"
                        type="number"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_project_year}
                        onChange={(event) => {
                          setJob_date_request_edit(event.target.value);
                        }}
                      />

                      <TextField
                        required
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        label="ระยะเวลา (เดือน) "
                        size="small"
                        type="number"
                        variant="standard"
                        color="info"
                        defaultValue={main_job.job_time}
                        onChange={(event) => {
                          setJob_time_edit(event.target.value);
                        }}
                      />

                      <TextareaAutosize
                        placeholder="รายละเอียด"
                        inputProps={{
                          readOnly: Boolean(true),
                        }}
                        style={{ width: "97%" }}
                        minRows={5}
                        defaultValue={main_job.detail_job}
                        onChange={(e) => {
                          setDetail_job_edit(e.target.value);
                        }}
                      />
                    </Box>
                    <div>
                      <br />
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
                          size="small"
                          color="warning"
                          variant="standard"
                          label="ลำดับ"
                          style={{ width: "5%" }}
                          value={detail_itempr_job * 10}
                          focused
                        />

                        <TextField
                          size="small"
                          color="info"
                          variant="standard"
                          label="รายการ"
                          name="detail_list_job"
                          value={detail_list_job}
                          style={{ width: "30%" }}
                          onChange={(e) => setDetail_list_job(e.target.value)}
                        />

                        <TextField
                          style={{ width: "10%" }}
                          size="small"
                          color="info"
                          variant="standard"
                          label="จำนวน"
                          type="number"
                          value={detail_qty_job}
                          name="detail_qty_job"
                          onChange={(e) => setDetail_qty_job(e.target.value)}
                        />

                        <TextField
                          style={{ width: "10%" }}
                          size="small"
                          color="info"
                          variant="standard"
                          label="ราคาต่อหน่วย"
                          type="number"
                          name="detail_price_job"
                          value={detail_price_job}
                          onChange={(e) => setDetail_price_job(e.target.value)}
                        />

                        <TextField
                          style={{ width: "10%" }}
                          color="info"
                          variant="standard"
                          label="รวม"
                          type="number"
                          size="small"
                          name="detail_sum_job"
                          value={detail_price_job * detail_qty_job}
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField
                          style={{ width: "5%" }}
                          color="info"
                          variant="standard"
                          label="Price per unit"
                          size="small"
                          type="number"
                          name="detail_Priceperunit_job"
                          value={detail_Priceperunit_job}
                          onChange={(e) =>
                            setDetail_Priceperunit_job(e.target.value)
                          }
                        />

                        <TextField
                          id="standard-select-currency"
                          select
                          style={{ width: "6%" }}
                          label="ACCT"
                          onChange={(e) => {
                            setDetail_ACCT_job(e.target.value);
                          }}
                          variant="standard"
                          size="small"
                          color="warning"
                          name="detail_ACCT_job"
                          value={detail_ACCT_job}
                        >
                          {ACCT.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
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
                          value={detail_material_job}
                          onChange={(e) =>
                            setDetail_material_job(e.target.value)
                          }
                        />

                        <div className="row" style={{ width: "100%" }}>
                          <div className="col-2">
                            <label>CURR</label>
                            <Select
                              size="small"
                              placeholder={detail_CURR_job}
                              class="form-control form-control-sm "
                              options={currData}
                              name="detail_CURR_job"
                              onChange={(e) => {
                                setDetail_CURR_job(e.value);
                                setDetail_CURR_label(e.label);
                              }}
                            />
                          </div>

                          <div className="col-2">
                            <label>Unit</label>
                            <Select
                              size="small"
                              placeholder={detail_unit_job}
                              class="form-control form-control-sm"
                              options={data_sap_filter}
                              name="detail_unit_job"
                              onChange={(e) => {
                                setDetail_unit_job(e.value);
                                setDetail_unit_label(e.label);
                              }}
                            />
                          </div>

                          <div className="col-2">
                            <label>GL</label>
                            <Select
                              size="small"
                              placeholder={detail_GL_label}
                              class="form-control form-control-sm "
                              options={glData}
                              name="detail_GL_job"
                              onChange={(e) => {
                                setDetail_GL_job(e.value);
                                setDetail_GL_label(e.label);
                              }}
                            />
                          </div>

                          <div className="col-3">
                            <label>MatGroup</label>
                            <Select
                              size="small"
                              placeholder={detail_MatGroup_label}
                              class="form-control form-control-sm "
                              options={matgroupData}
                              name="detail_MatGroup_job"
                              onChange={(e) => {
                                setDetail_MatGroup_job(e.value);
                                setDetail_MatGroup_label(e.label);
                              }}
                            />
                          </div>
                          <div className="col-3">
                            <label>COST CENTER</label>
                            <Select
                              size="small"
                              placeholder={detail_CostCenter_label}
                              class="form-control form-control-sm "
                              options={CostCenter}
                              name="detail_CostCenter_job"
                              onChange={(e) => {
                                setDetail_CostCenter_job(e.value);
                                setDetail_CostCenter_label(e.label);
                              }}
                            />
                          </div>
                        </div>
                      </Box>
                      <div>
                        <Button
                          variant="contained"
                          type="submit"
                          size="small"
                          style={{ width: "33%" }}
                          fullWidth
                          color="success"
                          onClick={Click_update_detail}
                        >
                          UPDATE
                        </Button>
                      </div>
                      <br />
                    </div>
                  </Box>
                </Modal>
              </div>
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
                      Approve Budget : {main_job.job_project_name} || ราคา :{" "}
                      {main_job.job_project_price}
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
              </div>
              {/*========================= */}
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
