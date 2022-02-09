import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, Form } from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { currencies } from "../../variables/department";
import { Project_year } from "../../variables/project_date";
import swal from "sweetalert";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import server from "variables/port_server";
import Select from "react-select";
import PR_TYPE from "../../variables/Insap/PR_TYPE";
import ACCT from "../../variables/Insap/ACCT";
import FACTORY from "../../variables/Insap/FACTORY";
import Autocomplete from "@mui/material/Autocomplete";
export default function From_add_plan() {
  //===================inputList All=================================================
  const [inputList, setInputList] = useState([
    {
      detail_itempr_job: 1,
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
    {
      detail_itempr_job: 2,
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

  // const auto_add = (index) => {
  //   let data = []

  //   for (let i = 1; i < index + 10; i++) {
  //     data.push({...inputList ,
  //       detail_itempr_job: i,
  //       detail_list_job: "-",
  //       detail_qty_job: 0,
  //       detail_price_job: 0,
  //       detail_sum_job: 0,
  //       //new
  //       detail_unit_job: "EA",
  //       detail_unit_label: "each",

  //       detail_ACCT_job: "A",

  //       detail_CURR_job: "THB",
  //       detail_CURR_label: "Thailand Baht",

  //       detail_Priceperunit_job: 1,
  //       detail_material_job: "",

  //       detail_GL_job: "1299999",
  //       detail_GL_label: "Clearing Asset",

  //       detail_MatGroup_job: "80806",
  //       detail_MatGroup_label: "สินทรัพย์",

  //       detail_CostCenter_job: "",
  //       detail_CostCenter_label: "",
  //     })
  //    }
  //    console.log(data)
  //    setInputList(data)
  // }

  const [project_price, setProject_price] = useState(0);

  // const handleInputChange_Matgroup = (e, index) => {
  //   const list = [...inputList];
  //   list[index].detail_MatGroup_job = e.value;
  //   list[index].detail_MatGroup_label = e.label;
  //   setInputList(list);
  // };

  // const handleInputChange_CostCenter = (e, index) => {
  //   const list = [...inputList];
  //   list[index].detail_CostCenter_job = e.value;
  //   list[index].detail_CostCenter_label = e.label;
  //   setInputList(list);
  // };

  // const handleInputChange_GL = (e, index) => {
  //   const list = [...inputList];
  //   list[index].detail_GL_job = e.value;
  //   list[index].detail_GL_label = e.label;
  //   setInputList(list);
  // };

  // const handleInputChange_ACCT = (e, index) => {
  //   const list = [...inputList];
  //   list[index].detail_ACCT_job = e.target.value;
  //   setInputList(list);
  // };

  const handleInputChange_CURR = (e, newValue, index) => {
    const list = [...inputList];
    list[index].detail_CURR_job = newValue;
    list[index].detail_CURR_label = "-";
    setInputList(list);
  };
  const handleInputChange_select = (e, newValue, index) => {
    const list = [...inputList];
    list[index].detail_unit_job = newValue;
    list[index].detail_unit_label = "-";
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
    setProject_price(project_price_sum);
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
    list[count].detail_itempr_job = +list[index].itempr_job + 1;
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
  //====================================================================
  const department = localStorage.getItem("department");
  const assistant = localStorage.getItem("assistant");
  const [currency, setCurrency] = useState(department.slice(1, -1));
  const [project_year, setProject_year] = useState("2565");
  const [project_name, setProject_name] = useState("");
  const [job_time, setJob_time] = useState(0);
  const [budget_request_date, setBudget_request_date] = useState("");
  const [learn_job, setLearn_job] = useState("");
  const [learn_job_copy, setLearn_job_copy] = useState("");
  const [detail_job, setDetail_job] = useState("");

  const [unit_sap, setUnit_sap] = useState([]);
  const [matgroupData, setMatgroupData] = useState([]);
  const [glData, setGlData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [prtype_job, setPrtype_job] = useState("");
  const [factory, setFactory] = useState("1100");
  const [CostCenter, setCostCenter] = useState([]);

  const [detail_GL_job, setDetail_GL_job] = useState("");
  const [detail_MatGroup_job, setDetail_MatGroup_job] = useState("");
  const [detail_CostCenter_job, setDetail_CostCenter_job] = useState("");
  const [detail_ACCT_job, setDetail_ACCT_job] = useState("");
  const [detail_GL_label, setDetail_GL_label] = useState("");
  const [detail_MatGroup_label, setDetail_MatGroup_label] = useState("");
  const [detail_CostCenter_label, setDetail_CostCenter_label] = useState("");
  const [detail_ACCT_label, ] = useState("");

  const [, setError] = useState();
  const [, setLoading] = useState(true);

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

  //  console.log(currData);

  const data_sap_filter = [];
  unit_sap.forEach((data) => {
    data_sap_filter.push({ value: data.MSEH3, label: data.MSEHT });
  });

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangePrtype_job = (event) => {
    setPrtype_job(event.target.value);
  };

  const handleChangeYear = (event) => {
    setProject_year(event.target.value);
  };

  const handleChangeFactory = (event) => {
    setFactory(event.target.value);
  };

  async function Check_bom(credentials) {
    return fetch(server + "/post_plan_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  let assis = assistant.slice(1, -1);
  const input_budget_plan = async (event) => {
    event.preventDefault();
    const response = await Check_bom({
      assis,
      job_time,
      currency,
      project_price,
      project_year,
      project_name,
      budget_request_date,
      learn_job,
      learn_job_copy,
      detail_job,
      prtype_job,
      factory,

      inputList,
      detail_GL_label,
      detail_MatGroup_label,
      detail_CostCenter_label,
      detail_ACCT_label,
      detail_GL_job,
      detail_MatGroup_job,
      detail_CostCenter_job,
      detail_ACCT_job,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/Form_add_job";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  const Click_NextSap = () => {
    document.getElementById("form_sap").hidden = false;
    document.getElementById("form_app").hidden = true;
  };

  const Click_Nextdetail = () => {
    document.getElementById("form_detail").hidden = true;
  };

  const Click_PreviousSap = () => {
    document.getElementById("form_sap").hidden = false;
    document.getElementById("form_app").hidden = false;
    document.getElementById("form_detail").hidden = false;
  };

  // const styles = (theme) => ({
  //   textField: {
  //     width: "90%",
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     paddingBottom: 0,
  //     marginTop: 0,
  //     fontWeight: 500,
  //   },
  //   input: {
  //     color: "white",
  //   },
  // });

  return (
    <>
      <div className="content">
        <Form onSubmit={input_budget_plan} >
          <fieldset id="form_app">
            <Card>
              <CardBody>
                <h5> เพิ่มข้อมูล Plan Budget (JOB) </h5>

                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "23%", fontSize: "20px" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    id="standard-select-currency"
                    select
                    label="บริษัท"
                    value={factory}
                    onChange={handleChangeFactory}
                    size="small"
                    type="input"
                    color="warning"
                  >
                    {FACTORY.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <TextField
                    id="standard-select-currency"
                    select
                    label="ฝ่ายที่ขอ"
                    value={currency}
                    onChange={handleChange}
                    size="small"
                    type="input"
                    color="warning"
                    InputProps={{
                      readOnly: true,
                    }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    required
                    id="standard-select-currency"
                    label="เรียน"
                    size="small"
                    type="input"
                    color="warning"
                    onChange={(e) => {
                      setLearn_job(e.target.value);
                    }}
                  />

                  <TextField
                    required
                    id="standard-select-currency"
                    label="สำเนาเรียน"
                    size="small"
                    type="input"
                    color="warning"
                    onChange={(e) => {
                      setLearn_job_copy(e.target.value);
                    }}
                  />

                  <TextField
                    required
                    label="เรื่อง"
                    size="small"
                    type="input"
                    color="info"
                    onChange={(event) => {
                      setProject_name(event.target.value);
                    }}
                  />

                  <TextareaAutosize
                    required
                    placeholder="รายละเอียด"
                    style={{ width: "97%" }}
                    minRows={5}
                    onChange={(e) => {
                      setDetail_job(e.target.value);
                    }}
                  />
                </Box>
                <br />
                <h6>กำหนด Plan Budget</h6>

                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "23%", fontSize: "20px" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    required
                    label="วันที่ขอ Budget"
                    size="small"
                    color="warning"
                    type="date"
                    onChange={(event) => {
                      setBudget_request_date(event.target.value);
                    }}
                    focused
                  />
                  <TextField
                    id="standard-select-currency"
                    select
                    label="แผนงบประมาณ Project ประจำปี"
                    value={project_year}
                    onChange={handleChangeYear}
                    fullWidth
                    size="small"
                    type="input"
                    color="warning"
                  >
                    {Project_year.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    required
                    id="standard-select-currency"
                    label="ระยะเวลา (เดือน)"
                    type="number"
                    fullWidth
                    size="small"
                    onChange={(event) => {
                      setJob_time(event.target.value);
                    }}
                  ></TextField>

                  <TextField
                    required
                    id="standard-select-currency"
                    select
                    label="PR TYPE"
                    value={prtype_job}
                    onChange={handleChangePrtype_job}
                    fullWidth
                    size="small"
                    type="input"
                    color="warning"
                  >
                    {PR_TYPE.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <hr />

                <div className="update ml-auto mr-auto">
                  <Button
                    variant="contained"
                    className="btn-round"
                    color="info"
                    onClick={Click_NextSap}
                    style={{ float: "left" }}
                  >
                    ซ่อน Header
                  </Button>
                </div>
              </CardBody>
            </Card>
          </fieldset>
          {/* จบ from 1 */}

          <fieldset id="form_sap">
            <Card>
              <CardBody>
                <div>
                  <h5>รายละเอียด</h5>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                    งบประมาณทั้งหมด :{" "}
                    {project_price
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </span>
                  <fieldset id="form_detail">
                    <hr />
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col-xl-3">
                        <span>GL</span>
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,

                            colors: {
                              ...theme.colors,

                              primary: "orange",
                            },
                          })}
                          size="small"
                          type="input"
                          // placeholder={x.detail_GL_label}
                          class="form-control form-control-sm "
                          options={glData}
                          name="detail_GL_job"
                          onChange={(e) => {
                            // handleInputChange_GL(e, i);
                            setDetail_GL_job(e.value);
                            setDetail_GL_label(e.label);
                          }}
                        />
                      </div>

                      <div className="col-xl-3">
                        <span>MatGroup</span>
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,

                            colors: {
                              ...theme.colors,

                              primary: "orange",
                            },
                          })}
                          size="small"
                          type="input"
                          // placeholder={x.detail_MatGroup_label}
                          class="form-control form-control-sm "
                          options={matgroupData}
                          name="detail_MatGroup_job"
                          defaultValue=""
                          onChange={(e) => {
                            // handleInputChange_Matgroup(e, i);
                            setDetail_MatGroup_job(e.value);
                            setDetail_MatGroup_label(e.label);
                          }}
                        />
                      </div>
                      <div className="col-xl-3">
                        <span>COST CENTER</span>
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,

                            colors: {
                              ...theme.colors,

                              primary: "orange",
                            },
                          })}
                          size="small"
                          type="input"
                          placeholder="COST CENTER"
                          class="form-control form-control-sm "
                          options={CostCenter}
                          name="detail_CostCenter_job"
                          onChange={(e) => {
                            // handleInputChange_CostCenter(e, i);
                            setDetail_CostCenter_job(e.value);
                            setDetail_CostCenter_label(e.label);
                          }}
                        />
                      </div>

                      <div className="col-xl-3">
                        <span>ACCT</span>
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                            
                            colors: {
                              ...theme.colors,
                      
                              primary: 'orange',
                            },})}
                          size="small"
                          type="input"
                          placeholder="ACCT"
                          class="form-control form-control-sm "
                          options={ACCT}
                          name="detail_CostCenter_job"
                          onChange={(e) => {
                            // handleInputChange_CostCenter(e, i);
                            setDetail_ACCT_job(e.value);
                          }}
                        />
                      </div>
                    </div>
                    <br />
                    <Button
                      variant="contained"
                      className="btn-round"
                      color="info"
                      onClick={Click_Nextdetail}
                      style={{ float: "left" }}
                    >
                      ซ่อน Header
                    </Button>
                  </fieldset>
                </div>
              </CardBody>
            </Card>
            <Card style={{ fontSize: "16px" }}>
              <CardBody>
                {inputList.map((x, i) => {
                  return (
                    <div>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1, width: "100%" },
                        }}
                      >
                        <TextField
                          size="small"
                          id="outlined-size-small"
                          type="input"
                          color="warning"
                          label="ลำดับ"
                          value={i + 1}
                          style={{
                            width: "4%",
                            float: "left",
                            background: "#F0F0F0",
                          }}
                          focused
                        />

                        <TextField
                          required
                          size="small"
                          type="input"
                          color="info"
                          label="รายการ"
                          name="detail_list_job"
                          value={x.detail_list_job}
                          style={{ width: "20%", float: "left" }}
                          onChange={(e) => handleInputChange(e, i)}
                        />

                        <TextField
                          required
                          style={{
                            width: "7%",
                            float: "left",
                            background: "#F0F0F0",
                          }}
                          size="small"
                          color="info"
                          label="จำนวน"
                          type="number"
                          name="detail_qty_job"
                          value={x.detail_qty_job}
                          onChange={(e) => handleInputChange(e, i)}
                        />

                        <TextField
                          required
                          style={{ width: "8%", float: "left" }}
                          size="small"
                          color="info"
                          label="ราคาต่อหน่วย"
                          type="number"
                          name="detail_price_job"
                          value={x.detail_price_job}
                          onChange={(e) => handleInputChange(e, i)}
                        />

                        <Autocomplete
                          disableClearable
                          name="detail_unit_job"
                          value={x.detail_unit_job}
                          size="small"
                          options={data_sap_filter.map(
                            (option) => option.value
                          )}
                          style={{
                            width: "6%",
                            float: "left",
                            background: "#F0F0F0",
                          }}
                          onChange={(e, newValue) => {
                            handleInputChange_select(e, newValue, i);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Unit" />
                          )}
                        />

                        <TextField
                          required
                          
                          style={{ width: "10%", float: "left" }}
                          color="info"
                          label="รวม"
                          type="number"
                          size="small"
                          name="detail_sum_job"
                          value={x.detail_sum_job}
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <Autocomplete
                          disableClearable
                          name="detail_CURR_job"
                          freeSolo
                          size="small"
                          type="input"
                          value={x.detail_CURR_job}
                          options={currData.map((option) => option.value)}
                          style={{
                            width: "6%",
                            float: "left",
                            background: "#F0F0F0",
                          }}
                          onChange={(e, newValue) => {
                            handleInputChange_CURR(e, newValue, i);
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="สกุลเงิน"
                              size="small"
                              type="input"
                            />
                          )}
                        />
                        <TextField
                          require8
                          style={{ width: "4%" }}
                          color="info"
                          label="ต่อชิ้น"
                          size="small"
                          type="input"
                          name="detail_Priceperunit_job"
                          value={x.detail_Priceperunit_job}
                          onChange={(e) => handleInputChange(e, i)}
                        />

                        <TextField
                          style={{ width: "15%", background: "#F0F0F0" }}
                          color="info"
                          label="Material"
                          size="small"
                          type="input"
                          name="detail_material_job"
                          value={x.detail_material_job}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        {inputList.length !== 1 && (
                          <Button
                          
                            variant="contained"
                            color="warning"
                            onClick={() => handleRemoveClick(i)}
                            size="small"
                            style={{ width: "5%" ,fontSize: "10px"}}
                          >
                            Remove
                          </Button>
                        )}
                        {/* <div style={{ float: "left" }}> */}
                        {/* <TextField
                      required
                        id="standard-select-currency"
                        select
                        style={{ width: "6%", paddingRight: "15px" }}
                        label="ACCT"
                        value={x.detail_ACCT_job}
                        onChange={(e) => {
                          handleInputChange_ACCT(e, i);
                        }}
                        
                        size="small"
                        type="input"
                        color="warning"
                        name="detail_ACCT_job"
                      >
                        {ACCT.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField> */}
                        {/* </div> */}
                      </Box>
                      {/* <div className="row" style={{ width: "100%" }}>
                <div className="col-2">
                      <Select
                        size="small"
                        type="input"
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
                        // size="small"
                        type="input"
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
                      <span>GL</span>
                      <Select
                        size="small"
                        type="input"
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
                      <span>MatGroup</span>
                      <Select
                        size="small"
                        type="input"
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
                      <span>COST CENTER</span>
                      <Select
                        size="small"
                        type="input"
                        placeholder="COST CENTER"
                        class="form-control form-control-sm "
                        options={CostCenter}
                        name="detail_CostCenter_job"
                        onChange={(e) => {
                          handleInputChange_CostCenter(e, i);
                        }}
                      />
                    </div>  
                  </div> */}
                      <br />
                      <div className="row">
                        <div
                          style={{ paddingRight: "10px", paddingLeft: "20px" }}
                        >
                          <br />
                        </div>
                        <div>
                          <br />
                          {inputList.length - 1 === i && (
                            <Button
                            style={{ width: "5%" ,fontSize: "10px"}}
                              variant="contained"
                              onClick={() => handleAddClick(i)}
                              size="small"
                              type="input"
                            >
                              {" "}
                              Add{" "}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
            {/* <p style={{ marginTop: 20 }}> {JSON.stringify(inputList)} </p> */}

            <Card>
              <CardBody>
                <Button
                  variant="contained"
                  className="btn-round"
                  color="info"
                  onClick={Click_PreviousSap}
                >
                  แสดงทั้งหมด
                </Button>

                <Button
                  variant="contained"
                  className="btn-round"
                  color="success"
                  style={{ float: "right" }}
                  type="submit"
                  onClick={Click_PreviousSap}
                >
                  บันทึก Plan Budget
                </Button>
              </CardBody>
            </Card>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
