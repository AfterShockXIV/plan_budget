import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, Form } from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { currencies } from "../../variables/department";
import { Project_year, Project_month } from "../../variables/project_date";
import swal from "sweetalert";
import server from "variables/port_server";
import Select from "react-select";
import PR_TYPE from "../../variables/Insap/PR_TYPE";
import ACCT from "../../variables/Insap/ACCT";
import FACTORY from "../../variables/Insap/FACTORY";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function From_add_plan() {
  const department = localStorage.getItem("department");
  const assistant = localStorage.getItem("assistant");
  const [currency, setCurrency] = useState(department.slice(1, -1));
  const [project_year, setProject_year] = useState("2565");
  const [project_name, setProject_name] = useState("");

  const [learn, setLearn] = useState("");
  const [learn_copy, setLearn_copy] = useState("");
  const [detail, setDetail] = useState("");

  const [budget_request_date, setBudget_request_date] = useState("");

  const [unit_sap, setUnit_sap] = useState([]);
  const [matgroupData, setMatgroupData] = useState([]);
  const [glData, setGlData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [prtype, setPrtype] = useState("ZR11");
  const [factory, setFactory] = useState("1100");
  const [CostCenter, setCostCenter] = useState([]);
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);

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
  //===================JAN=================================================
  const [inputList, setInputList] = useState([
    {
      detail_itempr: 1,
      detail_month: "01",
      detail_name: "",
      detail_list: "",
      detail_qty: "",
      detail_price:"",
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

  const handleInputChange_month = (e, index) => {
    const list = [...inputList];
    list[index].detail_month = e.target.value;
    setInputList(list);
  };

  const handleInputChange_Matgroup = (e, index) => {
    const list = [...inputList];
    list[index].detail_MatGroup = e.value;
    list[index].detail_MatGroup_label = e.label;
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

  const [project_price, setProject_price] = useState(0);
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
        detail_itempr: item_pr,
        detail_month: "01",
        detail_name: "",
        detail_list: "",
        detail_qty: "",
        detail_price: "",
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

  async function Check_bom(credentials) {
    return fetch(server + "/post_plan_budget", {
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
      factory,
      currency,
      learn,
      learn_copy,
      project_name,
      detail,
      budget_request_date,
      project_year,
      prtype,
      inputList,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/From_add_plan";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  ///==================================================

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "70%",
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  const Click_NextSap = () => {
    document.getElementById("form_detail").hidden = false;
    document.getElementById("form_header").hidden = true;
  };

  const Click_PreviousSap = () => {
    document.getElementById("form_detail").hidden = false;
    document.getElementById("form_header").hidden = false;
  };

  return (
    <>
      <div className="content">
        <Form  onSubmit={input_budget_plan}>
        {/* onSubmit={input_budget_plan} */}
          <fieldset id="form_header">
            <Card>
              <CardBody>
                <h5>เพิ่มข้อมูล Plan Budget</h5>
                <Box
              
                  sx={{
                    "& > :not(style)": { m: 1, width: "23%" },
                  }}
                >
                  {/* <button type="submit">sss</button> */}
                  <TextField
                    id="standard-select-currency"
                    select
                    label="บริษัท"
                    value={factory}
                    onChange={(e) => {
                      setFactory(e.target.value);
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
                  <br />

                  <TextField
                    id="standard-select-currency"
                    select
                    label="ฝ่ายที่ขอ"
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                    }}
                    variant="standard"
                    focused
                    size="small"
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
                    variant="standard"
                    size="small"
                    color="warning"
                    onChange={(e) => {
                      setLearn(e.target.value);
                    }}
                  />

                  <TextField
                    required
                    id="standard-select-currency"
                    label="สำเนาเรียน"
                    variant="standard"
                    size="small"
                    color="warning"
                    onChange={(e) => {
                      setLearn_copy(e.target.value);
                    }}
                  />

                  <TextField
                    required
                    label="เรื่อง"
                    size="small"
                    variant="standard"
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
                      setDetail(e.target.value);
                    }}
                  />
                </Box>
                <br />
                <h6>กำหนด Plan Budget</h6>

                <Box
              
                  sx={{ "& > :not(style)": { m: 1, width: "30%" } }}
                >
                  <TextField
                    required
                    label="วันที่ขอ Budget"
                    size="small"
                    variant="standard"
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
                    label="แผน งบประมาณ Project  ประจำปี"
                    value={project_year}
                    onChange={(e) => {
                      setProject_year(e.target.value);
                    }}
                    variant="standard"
                    size="small"
                    focused
                    color="warning"
                  >
                    {Project_year.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="standard-select-currency"
                    select
                    label="PR TYPE"
                    value={prtype}
                    onChange={(e) => {
                      setPrtype(e.target.value);
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
                </Box>

                <hr />
                <div className="update ml-auto mr-auto">
                  <br />
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

          <fieldset id="form_detail">
            <Card>
              <CardBody>
                <div>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                    งบประมาณทั้งหมด :{" "}
                    {project_price
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </span>
                </div>
              </CardBody>
            </Card>
            {inputList.map((x, i) => {
              return (
                <Card>
                  <CardBody style={{ fontSize: "15px" }}>
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
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* <TextField
                      size="small"
                      color="warning"
                      variant="standard"
                      label="ชื่อเรื่อง"
                      name="detail_name"
                      value={x.detail_name}
                      style={{ width: "40%" }}
                      onChange={(e) => handleInputChange(e, i)}
                    /> */}

                      <br />

                      <TextField
                        required
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
                        required
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
                        required
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
                        label="Price per unit"
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
                        value={x.detail_material}
                        onChange={(e) => handleInputChange(e, i)}
                      />

                      <div className="row" style={{ width: "100%" }}>
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
