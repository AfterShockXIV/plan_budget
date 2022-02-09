import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Button from "@mui/material/Button";
import { Card, CardBody } from "reactstrap";
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
import { Project_month } from "../../variables/project_date";

export default function Check(props) {
  const department = localStorage.getItem("department");
  const assistant = localStorage.getItem("assistant");
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [status, setData_status] = useState([]);

  const [data_detail, setData_detail] = useState([]);
  const [main, setMain] = useState([]);

  const [unit_sap, setUnit_sap] = useState([]);
  const [matgroupData, setMatgroupData] = useState([]);
  const [glData, setGlData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [prtype, setPrtype] = useState("");

  const [factory, setFactory] = useState("1100");
  const [CostCenter, setCostCenter] = useState([]);

  const [project_name,] = useState("");

  const [, setProject_price_sum] = useState(0);

  const [learn_edit, setLearn_edit] = useState("");
  const [learn_copy_edit, setLearn_copy_edit] = useState("");
  const [detail_edit, setDetail_edit] = useState("");
  const [budget_date_request_edit, setbudget_date_request_edit] = useState("");
  const [budget_project_name_edit, setbudget_project_name_edit] = useState("");
  const [budget_time_edit, setbudget_time_edit] = useState("");
  const [prtype_edit, setPrtype_edit] = useState("");
  const [factory_edit, setFactory_edit] = useState("");

  const [detail_run_id, setDetail_run_id] = useState("");
  const [detail_month, setDetail_month] = useState("");
  const [detail_itempr, setDetail_itempr] = useState("");
  const [detail_list, setDetail_list] = useState("");
  const [detail_qty, setDetail_qty] = useState("");
  const [detail_price, setDetail_price] = useState("");
  const [detail_sum, setDetail_sum] = useState("");
  const [detail_Priceperunit, setDetail_Priceperunit] = useState("");
  const [detail_ACCT, setDetail_ACCT] = useState("");
  const [detail_material, setDetail_material] = useState("");

  const [detail_unit, setDetail_unit] = useState("");
  const [detail_CURR, setDetail_CURR] = useState("");
  const [detail_GL, setDetail_GL] = useState("");
  const [detail_MatGroup, setDetail_MatGroup] = useState("");
  const [detail_CostCenter, setDetail_CostCenter] = useState("");

  const [detail_unit_label, setDetail_unit_label] = useState("");
  const [detail_CURR_label, setDetail_CURR_label] = useState("");
  const [detail_GL_label, setDetail_GL_label] = useState("");
  const [detail_MatGroup_label, setDetail_MatGroup_label] = useState("");
  const [detail_CostCenter_label, setDetail_CostCenter_label] = useState("");
  const [ole_price, setOle_price] = useState("");

  useEffect(() => {
    fetch(server + "/report_budget_detail/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_detail(result.data_detail))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/report_budget_detail/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_status(result.status))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/report_budget_detail/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setMain(result.main))
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

  //===================JAN=================================================
  const [inputList, setInputList] = useState([
    {
      detail_itempr: 1,
      detail_month: "01",
      detail_name: "",
      detail_list: "-",
      detail_qty: 0,
      detail_price: 0,
      detail_sum: 0,
      //new
      detail_unit: "EA",
      detail_unit_label: "each",

      detail_ACCT: "A",

      detail_CURR: "THB",
      detail_CURR_label: "Thailand Baht",

      detail_Priceperunit: 1,
      detail_material: "",

      detail_GL: "1299999",
      detail_GL_label: "Clearing Asset",

      detail_MatGroup: "80806",
      detail_MatGroup_label: "สินทรัพย์",

      detail_CostCenter: "",
      detail_CostCenter_label: "",
    },
  ]);

  const handleInputChange_Matgroup = (e, index) => {
    const list = [...inputList];
    list[index].detail_MatGroup = e.value;
    list[index].detail_MatGroup_label = e.label;
    setInputList(list);
  };

  const handleInputChange_month = (e, index) => {
    const list = [...inputList];
    list[index].detail_month = e.target.value;
    setInputList(list);
  };

  const handleInputChange_CostCenter = (e, index) => {
    const list = [...inputList];
    list[index].detail_CostCenter = e.value;
    list[index].detail_CostCenter_label = e.label;
    setInputList(list);
  };

  const handleInputChange_GL = (e, index) => {
    const list = [...inputList];
    list[index].detail_GL = e.value;
    list[index].detail_GL_label = e.label;
    setInputList(list);
  };

  const handleInputChange_ACCT = (e, index) => {
    const list = [...inputList];
    list[index].detail_ACCT = e.target.value;
    setInputList(list);
  };

  const handleInputChange_CURR = (e, index) => {
    const list = [...inputList];
    list[index].detail_CURR = e.value;
    list[index].detail_CURR_label = e.label;
    setInputList(list);
  };
  const handleInputChange_select = (e, index) => {
    const list = [...inputList];
    list[index].detail_unit = e.value;
    list[index].detail_unit_label = e.label;
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    list[index].detail_sum = list[index].detail_qty * list[index].detail_price;
    setInputList(list);
    let project_price_sum = 0;
    inputList.forEach((data) => {
      project_price_sum += +data.detail_sum;
    });
    setProject_price_sum(project_price_sum);
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
        detail_itempr: item_pr,
        detail_month: "01",
        detail_name: "",
        detail_list: "-",
        detail_qty: 0,
        detail_price: 0,
        detail_sum: 0,
        //new
        detail_unit: "EA",
        detail_unit_label: "each",

        detail_ACCT: "A",

        detail_CURR: "THB",
        detail_CURR_label: "Thailand Baht",

        detail_Priceperunit: 1,
        detail_material: "",

        detail_GL: "1299999",
        detail_GL_label: "Clearing Asset",

        detail_MatGroup: "80806",
        detail_MatGroup_label: "สินทรัพย์",

        detail_CostCenter: "",
        detail_CostCenter_label: "",
      },
    ];
    list[count].detail_itempr = +list[index].itempr + 1;
    list[count].detail_MatGroup = list[index].detail_MatGroup;
    list[count].detail_ACCT = list[index].detail_ACCT;
    list[count].detail_CURR = list[index].detail_CURR;
    list[count].detail_month = list[index].detail_month;
    list[count].detail_name = list[index].detail_name;

    if (list[index].detail_ACCT === "A") {
      list[count].detail_GL = "1299999";
      list[count].detail_GL_label = "Clearing Asset";
    } else {
      list[count].detail_GL = "5290000";
      list[count].detail_GL_label = "Dummy Expense";
    }

    setInputList(list);
  };

  let budget_run_id = props.match.params.id;
  ///================= ADD =================================
  async function Check_bom(credentials) {
    return fetch(server + "/post_add_detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  let budget_project_price = main.budget_project_price;
  const add_detail = async (event) => {
    event.preventDefault();
    const response = await Check_bom({
      budget_project_price,
      inputList,
      budget_run_id,
      prtype,
      factory,
      department,
      project_name,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/report_sap/" + props.match.params.id;
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  //===================================================================

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

  const row = [];
  data_detail.forEach((data, key) => {
    row.push({
      key: data.detail_itempr * 10,
      detail_list: data.detail_list,
      detail_month: (() => {
        let Month_data = Project_month.filter((data_f) => {
          return data_f.value === data.detail_month;
        });
        console.log(Month_data);
        return <span>{Month_data[0].label}</span>;
      })(),
      detail_qty: data.detail_qty,
      detail_price: data.detail_price
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      detail_sum: data.detail_sum
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      detail_unit: data.detail_unit_label,
      detail_CURR: data.detail_CURR,
      detail_Priceperunit: data.detail_Priceperunit,
      detail_ACCT: data.detail_ACCT,
      detail_material: data.detail_material,
      detail_GL: data.detail_GL_label,
      detail_MatGroup: data.detail_MatGroup_label,
      detail_CostCenter: data.detail_CostCenter_label,
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
                  setDetail_month(data.detail_month);
                  setDetail_run_id(data.detail_run_id);
                  setDetail_itempr(data.detail_itempr);
                  setDetail_list(data.detail_list);
                  setDetail_qty(data.detail_qty);
                  setDetail_price(data.detail_price);
                  setDetail_sum(data.detail_sum);
                  setDetail_Priceperunit(data.detail_Priceperunit);
                  setDetail_ACCT(data.detail_ACCT);
                  setDetail_material(data.detail_material);

                  setDetail_unit(data.detail_unit);
                  setDetail_CURR(data.detail_CURR);
                  setDetail_GL(data.detail_GL);
                  setDetail_MatGroup(data.detail_MatGroup);
                  setDetail_CostCenter(data.detail_CostCenter);

                  setDetail_unit_label(data.detail_unit_label);
                  setDetail_CURR_label(data.detail_CURR_label);
                  setDetail_GL_label(data.detail_GL_label);
                  setDetail_MatGroup_label(data.detail_MatGroup_label);
                  setDetail_CostCenter_label(data.detail_CostCenter_label);
                  setOle_price(main.budget_project_price);
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
        label: "เดือน",
        field: "detail_month",
        width: 100,
        align: "center",
      },
      {
        label: "รายการ",
        field: "detail_list",
        width: 200,
        align: "center",
      },
      {
        label: "จำนวน",
        field: "detail_qty",
        width: 100,
        align: "center",
      },
      {
        label: "ราคาต่อหน่วย",
        field: "detail_price",
        width: 100,
        align: "center",
      },
      {
        label: "Unit",
        field: "detail_unit",
        width: 100,
        align: "center",
      },

      {
        label: "รวม",
        field: "detail_sum",
        width: 100,
        align: "center",
      },
      {
        label: "CURR",
        field: "detail_CURR",
        width: 100,
        align: "center",
      },
      {
        label: "PPU",
        field: "detail_Priceperunit",
        width: 100,
        align: "center",
      },
      {
        label: "ACCT",
        field: "detail_ACCT",
        width: 100,
        align: "center",
      },
      {
        label: "Material",
        field: "detail_material",
        width: 130,
        align: "center",
      },
      {
        label: "GL",
        field: "detail_GL",
        width: 130,
        align: "center",
      },
      {
        label: "MatGroup",
        field: "detail_MatGroup",
        width: 130,
        align: "center",
      },
      {
        label: "CostCenter",
        field: "detail_CostCenter",
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

  async function fetch_data_header(credentials) {
    return fetch(server + "/update_budget_header", {
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
      learn_edit,
      learn_copy_edit,
      budget_project_name_edit,
      budget_date_request_edit,
      detail_edit,
      budget_run_id,
      budget_time_edit,
      prtype_edit,
      factory_edit,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href =
        window.location.href = "/admin/report_sap/" + props.match.params.id;
        handleClose_edit_header();
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  async function fetch_data_detail(credentials) {
    return fetch(server + "/post_edit_detail", {
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
      detail_run_id,
      detail_list,
      detail_qty,
      detail_price,
      detail_sum,
      detail_Priceperunit,
      detail_ACCT,
      detail_material,

      detail_unit,
      detail_CURR,
      detail_GL,
      detail_MatGroup,
      detail_CostCenter,

      detail_unit_label,
      detail_CURR_label,
      detail_GL_label,
      detail_MatGroup_label,
      detail_CostCenter_label,
      ole_price,
      budget_run_id,
      detail_month , 
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href =
        window.location.href = "/admin/report_sap/" + props.match.params.id;
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
        window.location.href = "/admin/report_sap/"+props.match.params.id;
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
              <h6>
                แผนงบประมาณ ของฝ่าย : {department.slice(1, -1)} || งบ Budget :
                {main.budget_project_price}
                <br />
                <h6>
                  เรื่อง : {main.budget_project_name} &nbsp;&nbsp;||
                  &nbsp;&nbsp; เรียน : {main.learn} &nbsp;&nbsp;|| &nbsp;&nbsp;
                  สำเนาเรียน : {main.learn_copy} &nbsp;&nbsp;||&nbsp;&nbsp;
                  factory :{" "}
                  {(() => {
                    if (main.factory === "1100") {
                      return <span>บริษัท วีนายน์ เคเบิ้ล จำกัด</span>;
                    }
                    return <span>บริษัท วีนายน์ คอปเปอร์ จำกัด</span>;
                  })()}{" "}
                  &nbsp;&nbsp; ||&nbsp;&nbsp; PR Type : {main.pr_type}
                </h6>
              </h6>
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
                            setPrtype(main.pr_type);
                            setFactory(main.factory);
                            setbudget_project_name_edit(
                              main.budget_project_name
                            );
                            setLearn_edit(main.learn);
                            setLearn_copy_edit(main.learn_copy);
                            setDetail_edit(main.detail);
                            setbudget_date_request_edit(
                              main.budget_date_request
                            );
                            setbudget_time_edit(main.budget_time);
                            setPrtype_edit(main.pr_type);
                            setFactory_edit(main.factory);
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
                          href={server + "/sig_plan_mg_page/" + budget_run_id}
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
                      <a href={server + "/sig_plan_dr_page/" + budget_run_id}>
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
                    if (assistant.slice(1, -1) === "AMD") {
                      return (
                        <a href={server + "/sig_plan_AMD_page/" + budget_run_id}>
                          <div>
                            <Button
                              className="mr10"
                              size="small"
                              variant="contained"
                              color="warning"
                            >
                              AMD ส่วนงานผลิต เซ็นยอมรับ
                            </Button>
                          </div>
                        </a>
                      );
                    } else {
                      return (
                        <a href={server + "/sig_plan_AMD2_page/" + budget_run_id}>
                          <div>
                            <Button
                              className="mr10"
                              size="small"
                              variant="contained"
                              color="warning"
                            >
                              AMD ส่วนงานสนับสนุน เซ็นยอมรับ
                            </Button>
                          </div>
                        </a>
                      );
                    }
                  } else if (status === "AMD_success") {
                    return (
                      <a href={server + "/sig_plan_AMD2_page/" + budget_run_id}>
                        <div>
                          <Button
                            className="mr10"
                            size="small"
                            variant="contained"
                            color="warning"
                          >
                            AMD ส่วนงานสนับสนุน เซ็นยอมรับ
                          </Button>
                        </div>
                      </a>
                    );
                  } else if (status === "AMD2_success") {
                    return (
                      <a href={server + "/sig_plan_MD_page/" + budget_run_id}>
                        <div>
                          <Button
                            className="mr10"
                            size="small"
                            variant="contained"
                            color="warning"
                          >
                            MD เซ็นยอมรับ
                          </Button>
                        </div>
                      </a>
                    );
                  } else if (status === "MD_success") {
                    if (department.slice(1, -1) === "ACM") {
                      return (
                        <div>
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
                    {/* <span>{budget_run_id}</span> */}
                    <br />
                    <div>
                      <h5>เพิ่มข้อมูลรายละเอียด</h5>
                      <div
                        style={{
                          height: "350px",
                          overflow: "scroll",
                          overflowX: "hidden",
                        }}
                      >
                        {inputList.map((x, i) => {
                          return (
                            <Card>
                              <CardBody style={{ fontSize: "15px" }}>
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
                                    id="standard-select-currency"
                                    select
                                    label="เดือน"
                                    name="detail_month"
                                    value={x.detail_month}
                                    onChange={(e) => {
                                      handleInputChange_month(e, i);
                                    }}
                                    variant="standard"
                                    size="small"
                                    color="warning"
                                  >
                                    {Project_month.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>

                                  <br />

                                  <TextField
                                    size="small"
                                    color="info"
                                    variant="standard"
                                    label="รายการ"
                                    name="detail_list"
                                    value={x.detail_list}
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
                                    name="detail_qty"
                                    value={x.detail_qty}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  <TextField
                                    style={{ width: "10%" }}
                                    size="small"
                                    color="info"
                                    variant="standard"
                                    label="ราคาต่อหน่วย"
                                    type="number"
                                    name="detail_price"
                                    value={x.detail_price}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  <TextField
                                    style={{ width: "10%" }}
                                    color="info"
                                    variant="standard"
                                    label="รวม"
                                    type="number"
                                    size="small"
                                    name="detail_sum"
                                    value={x.detail_sum}
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
                                    name="detail_Priceperunit"
                                    value={x.detail_Priceperunit}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />

                                  <TextField
                                    id="standard-select-currency"
                                    select
                                    style={{ width: "6%" }}
                                    label="ACCT"
                                    value={x.detail_ACCT}
                                    onChange={(e) => {
                                      handleInputChange_ACCT(e, i);
                                    }}
                                    variant="standard"
                                    size="small"
                                    color="warning"
                                    name="detail_ACCT"
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
                                    name="detail_material"
                                    value={x.detail_material}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />

                                  <div
                                    className="row"
                                    style={{ width: "100%" }}
                                  >
                                    <div className="col-xl-2">
                                      <span>CURR</span>
                                      <Select
                                        size="small"
                                        placeholder="THB"
                                        class="form-control form-control-sm "
                                        options={currData}
                                        name="detail_CURR"
                                        onChange={(e) => {
                                          handleInputChange_CURR(e, i);
                                        }}
                                      />
                                    </div>

                                    <div className="col-xl-2">
                                      <span>Unit</span>
                                      <Select
                                        // size="small"
                                        placeholder="each"
                                        class="form-control form-control-sm"
                                        options={data_sap_filter}
                                        name="detail_unit"
                                        onChange={(e) => {
                                          handleInputChange_select(e, i);
                                        }}
                                      />
                                    </div>

                                    <div className="col-xl-2">
                                      <span>GL</span>
                                      <Select
                                        size="small"
                                        placeholder={x.detail_GL_label}
                                        class="form-control form-control-sm "
                                        options={glData}
                                        name="detail_GL"
                                        onChange={(e) => {
                                          handleInputChange_GL(e, i);
                                        }}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <span>MatGroup</span>
                                      <Select
                                        size="small"
                                        placeholder={x.detail_MatGroup_label}
                                        class="form-control form-control-sm "
                                        options={matgroupData}
                                        name="detail_MatGroup"
                                        defaultValue=""
                                        onChange={(e) => {
                                          handleInputChange_Matgroup(e, i);
                                        }}
                                      />
                                    </div>
                                    <div className="col-xl-3">
                                      <span>COST CENTER</span>
                                      <Select
                                        size="small"
                                        placeholder="COST CENTER"
                                        class="form-control form-control-sm "
                                        options={CostCenter}
                                        name="detail_CostCenter"
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
                                    <div>
                                      {inputList.length - 1 === i && (
                                        <Button
                                          variant="contained"
                                          onClick={() => handleAddClick(i)}
                                          size="small"
                                        >
                                          {" "}
                                          Add{" "}
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
                          onClick={add_detail}
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
              <div>
                <Modal
                  open={open_edit_header}
                  onClose={handleClose_edit_header}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <span>{budget_run_id}</span> */}
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
                        defaultValue={prtype}
                        onChange={(e) => {
                          setPrtype_edit(e.target.value);
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
                        defaultValue={main.budget_project_name}
                        onChange={(event) => {
                          setbudget_project_name_edit(event.target.value);
                        }}
                      />

                      <TextField
                        id="standard-select-currency"
                        label="เรียน"
                        variant="standard"
                        size="small"
                        color="warning"
                        defaultValue={main.learn}
                        onChange={(e) => {
                          setLearn_edit(e.target.value);
                        }}
                      />

                      <TextField
                        id="standard-select-currency"
                        label="สำเนาเรียน"
                        variant="standard"
                        size="small"
                        color="warning"
                        defaultValue={main.learn_copy}
                        onChange={(e) => {
                          setLearn_copy_edit(e.target.value);
                        }}
                      />

                      <TextField
                        required
                        label="วันที่ขอ"
                        size="small"
                        type="date"
                        variant="standard"
                        color="info"
                        defaultValue={main.budget_date_request}
                        onChange={(event) => {
                          setbudget_date_request_edit(event.target.value);
                        }}
                      />

                      <TextField
                        required
                        label="แผนงบประมาณ Project ประจำปี"
                        size="small"
                        type="number"
                        variant="standard"
                        color="info"
                        defaultValue={main.budget_project_year}
                        onChange={(event) => {
                          setbudget_date_request_edit(event.target.value);
                        }}
                      />

                      <TextField
                        required
                        label="ระยะเวลา (เดือน) "
                        size="small"
                        type="number"
                        variant="standard"
                        color="info"
                        defaultValue={main.budget_time}
                        onChange={(event) => {
                          setbudget_time_edit(event.target.value);
                        }}
                      />

                      <TextareaAutosize
                        placeholder="รายละเอียด"
                        style={{ width: "97%" }}
                        minRows={5}
                        defaultValue={main.detail}
                        onChange={(e) => {
                          setDetail_edit(e.target.value);
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

              {/* ============MODAL_edit====================== */}
              <div>
                <Modal
                  open={open_edit}
                  onClose={handleClose_edit}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <span>{budget_run_id}</span> */}
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
                          value={detail_itempr * 10}
                          focused
                        />

                        <TextField
                          id="standard-select-currency"
                          select
                          style={{ width: "20%" }}
                          label="เดือน"
                          onChange={(e) => {
                            setDetail_month(e.target.value);
                          }}
                          variant="standard"
                          size="small"
                          color="warning"
                          name="detail_month"
                          value={detail_month}
                        >
                          {Project_month.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <br />
                        <TextField
                          size="small"
                          color="info"
                          variant="standard"
                          label="รายการ"
                          name="detail_list"
                          value={detail_list}
                          style={{ width: "30%" }}
                          onChange={(e) => setDetail_list(e.target.value)}
                        />

                        <TextField
                          style={{ width: "10%" }}
                          size="small"
                          color="info"
                          variant="standard"
                          label="จำนวน"
                          type="number"
                          value={detail_qty}
                          name="detail_qty"
                          onChange={(e) => setDetail_qty(e.target.value)}
                        />

                        <TextField
                          style={{ width: "10%" }}
                          size="small"
                          color="info"
                          variant="standard"
                          label="ราคาต่อหน่วย"
                          type="number"
                          name="detail_price"
                          value={detail_price}
                          onChange={(e) => setDetail_price(e.target.value)}
                        />

                        <TextField
                          style={{ width: "10%" }}
                          color="info"
                          variant="standard"
                          label="รวม"
                          type="number"
                          size="small"
                          name="detail_sum"
                          value={detail_price * detail_qty}
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
                          name="detail_Priceperunit"
                          value={detail_Priceperunit}
                          onChange={(e) =>
                            setDetail_Priceperunit(e.target.value)
                          }
                        />

                        <TextField
                          id="standard-select-currency"
                          select
                          style={{ width: "6%" }}
                          label="ACCT"
                          onChange={(e) => {
                            setDetail_ACCT(e.target.value);
                          }}
                          variant="standard"
                          size="small"
                          color="warning"
                          name="detail_ACCT"
                          value={detail_ACCT}
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
                          name="detail_material"
                          value={detail_material}
                          onChange={(e) => setDetail_material(e.target.value)}
                        />

                        <div className="row" style={{ width: "100%" }}>
                          <div className="col-2">
                            <label>CURR</label>
                            <Select
                              size="small"
                              placeholder={detail_CURR}
                              class="form-control form-control-sm "
                              options={currData}
                              name="detail_CURR"
                              onChange={(e) => {
                                setDetail_CURR(e.value);
                                setDetail_CURR_label(e.label);
                              }}
                            />
                          </div>

                          <div className="col-2">
                            <label>Unit</label>
                            <Select
                              size="small"
                              placeholder={detail_unit_label}
                              class="form-control form-control-sm"
                              options={data_sap_filter}
                              name="detail_unit"
                              onChange={(e) => {
                                setDetail_unit(e.value);
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
                              name="detail_GL"
                              onChange={(e) => {
                                setDetail_GL(e.value);
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
                              name="detail_MatGroup"
                              onChange={(e) => {
                                setDetail_MatGroup(e.value);
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
                              name="detail_CostCenter"
                              onChange={(e) => {
                                setDetail_CostCenter(e.value);
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
                    {/* <span>{budget_run_id}</span> */}
                    <h6>
                      Approve Budget : {main.budget_project_name} || ราคา :{" "}
                      {main.budget_project_price}
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
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
