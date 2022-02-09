import React from "react";
import { useState } from "react";
import { Card, CardBody, FormGroup, Form } from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import currencies from "../../../variables/department";
import Project_year from "../../../variables/project_date";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import swal from "sweetalert";
import Modal from "@mui/material/Modal";
import server from "variables/port_server";
import TextareaAutosize from "@mui/material/TextareaAutosize";
export default function From_add_plan() {
  //===================JAN=================================================
  const [price_jan, setPrice_jan] = useState(0);
  const [open_jan, setOpen_jan] = React.useState(false);
  const handleOpen_jan = () => setOpen_jan(true);
  const handleClose_jan = () => setOpen_jan(false);
  const [inputList_jan, setInputList_jan] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "01" },
  ]);
  // handle input change

  const handleInputChange_jan = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_jan];
    list[index][name] = value;
    setInputList_jan(list);

    let price_sum_jan = 0;
    inputList_jan.forEach((data) => {
      price_sum_jan += +data.detail_price;
    });
    setPrice_jan(price_sum_jan);
  };

  // handle click event of the Remove button
  const handleRemoveClick_jan = (index) => {
    const list = [...inputList_jan];
    list.splice(index, 1);
    setInputList_jan(list);
  };

  // handle click event of the Add button
  const handleAddClick_jan = () => {
    setInputList_jan([
      ...inputList_jan,
      { detail_list: "-", detail_price: 0, detail_month: "01" },
    ]);
  };
  //====================================================================
  //=============Feb================================
  const [open_feb, setOpen_feb] = React.useState(false);
  const handleOpen_feb = () => setOpen_feb(true);
  const handleClose_feb = () => setOpen_feb(false);
  const [inputList_feb, setInputList_feb] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "02" },
  ]);
  // handle input change
  const handleInputChange_feb = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_feb];
    list[index][name] = value;
    setInputList_feb(list);

    let price_sum_feb = 0;
    inputList_feb.forEach((data) => {
      price_sum_feb += +data.detail_price;
    });
    setPrice_feb(price_sum_feb);
  };

  // handle click event of the Remove button
  const handleRemoveClick_feb = (index) => {
    const list = [...inputList_feb];
    list.splice(index, 1);
    setInputList_feb(list);
  };

  // handle click event of the Add button
  const handleAddClick_feb = () => {
    setInputList_feb([
      ...inputList_feb,
      { detail_list: "-", detail_price: 0, detail_month: "02" },
    ]);
  };
  //===============มีนาคม=================================
  const [open_mar, setOpen_mar] = React.useState(false);
  const handleOpen_mar = () => setOpen_mar(true);
  const handleClose_mar = () => setOpen_mar(false);
  const [inputList_mar, setInputList_mar] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "03" },
  ]);
  // handle input change
  const handleInputChange_mar = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_mar];
    list[index][name] = value;
    setInputList_mar(list);

    let price_sum_mar = 0;
    inputList_mar.forEach((data) => {
      price_sum_mar += +data.detail_price;
    });
    setPrice_mar(price_sum_mar);
  };

  // handle click event of the Remove button
  const handleRemoveClick_mar = (index) => {
    const list = [...inputList_mar];
    list.splice(index, 1);
    setInputList_mar(list);
  };

  // handle click event of the Add button
  const handleAddClick_mar = () => {
    setInputList_mar([
      ...inputList_mar,
      { detail_list: "-", detail_price: 0, detail_month: "03" },
    ]);
  };
  //===============เมษา===========================
  const [open_apr, setOpen_apr] = React.useState(false);
  const handleOpen_apr = () => setOpen_apr(true);
  const handleClose_apr = () => setOpen_apr(false);
  const [inputList_apr, setInputList_apr] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "04" },
  ]);
  const handleInputChange_apr = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_apr];
    list[index][name] = value;
    setInputList_apr(list);

    let price_sum_apr = 0;
    inputList_apr.forEach((data) => {
      price_sum_apr += +data.detail_price;
    });
    setPrice_apr(price_sum_apr);
  };

  // handle click event of the Remove button
  const handleRemoveClick_apr = (index) => {
    const list = [...inputList_apr];
    list.splice(index, 1);
    setInputList_apr(list);
  };

  // handle click event of the Add button
  const handleAddClick_apr = () => {
    setInputList_apr([...inputList_apr, { detail_list: "-", detail_price: 0 }]);
  };
  //==================พฤ===========================
  const [open_may, setOpen_may] = React.useState(false);
  const handleOpen_may = () => setOpen_may(true);
  const handleClose_may = () => setOpen_may(false);
  const [inputList_may, setInputList_may] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "05" },
  ]);
  // handle input change
  const handleInputChange_may = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_may];
    list[index][name] = value;
    setInputList_may(list);

    let price_sum_may = 0;
    inputList_may.forEach((data) => {
      price_sum_may += +data.detail_price;
    });
    setPrice_may(price_sum_may);
  };

  // handle click event of the Remove button
  const handleRemoveClick_may = (index) => {
    const list = [...inputList_may];
    list.splice(index, 1);
    setInputList_may(list);
  };

  // handle click event of the Add button
  const handleAddClick_may = () => {
    setInputList_may([
      ...inputList_may,
      { detail_list: "-", detail_price: 0, detail_month: "06" },
    ]);
  };
  //================มิถุนา=======================================
  const [open_jun, setOpen_jun] = React.useState(false);
  const handleOpen_jun = () => setOpen_jun(true);
  const handleClose_jun = () => setOpen_jun(false);
  const [inputList_jun, setInputList_jun] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "06" },
  ]);
  // handle input change
  const handleInputChange_jun = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_jun];
    list[index][name] = value;
    setInputList_jun(list);

    let price_sum_jun = 0;
    inputList_jun.forEach((data) => {
      price_sum_jun += +data.detail_price;
    });
    setPrice_jun(price_sum_jun);
  };

  // handle click event of the Remove button
  const handleRemoveClick_jun = (index) => {
    const list = [...inputList_jun];
    list.splice(index, 1);
    setInputList_jun(list);
  };

  // handle click event of the Add button
  const handleAddClick_jun = () => {
    setInputList_jun([
      ...inputList_jun,
      { detail_list: "-", detail_price: 0, detail_month: "06" },
    ]);
  };

  //==========================กรก=============================
  const [open_jul, setOpen_jul] = React.useState(false);
  const handleOpen_jul = () => setOpen_jul(true);
  const handleClose_jul = () => setOpen_jul(false);
  const [inputList_jul, setInputList_jul] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "07" },
  ]);
  // handle input change
  const handleInputChange_jul = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_jul];
    list[index][name] = value;
    setInputList_jul(list);

    let price_sum_jul = 0;
    inputList_jul.forEach((data) => {
      price_sum_jul += +data.detail_price;
    });
    setPrice_jul(price_sum_jul);
  };

  // handle click event of the Remove button
  const handleRemoveClick_jul = (index) => {
    const list = [...inputList_jul];
    list.splice(index, 1);
    setInputList_jul(list);
  };

  // handle click event of the Add button
  const handleAddClick_jul = () => {
    setInputList_jul([
      ...inputList_jul,
      { detail_list: "-", detail_price: 0, detail_month: "07" },
    ]);
  };
  //============สิงหาคม=========================================
  const [open_aug, setOpen_aug] = React.useState(false);
  const handleOpen_aug = () => setOpen_aug(true);
  const handleClose_aug = () => setOpen_aug(false);
  const [inputList_aug, setInputList_aug] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "08" },
  ]);
  // handle input change
  const handleInputChange_aug = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_aug];
    list[index][name] = value;
    setInputList_aug(list);

    let price_sum_aug = 0;
    inputList_aug.forEach((data) => {
      price_sum_aug += +data.detail_price;
    });
    setPrice_aug(price_sum_aug);
  };

  // handle click event of the Remove button
  const handleRemoveClick_aug = (index) => {
    const list = [...inputList_aug];
    list.splice(index, 1);
    setInputList_aug(list);
  };

  // handle click event of the Add button
  const handleAddClick_aug = () => {
    setInputList_aug([
      ...inputList_aug,
      { detail_list: "-", detail_price: 0, detail_month: "08" },
    ]);
  };
  //==========กันยา=========================
  const [open_sep, setOpen_sep] = React.useState(false);
  const handleOpen_sep = () => setOpen_sep(true);
  const handleClose_sep = () => setOpen_sep(false);
  const [inputList_sep, setInputList_sep] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "09" },
  ]);
  // handle input change
  const handleInputChange_sep = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_sep];
    list[index][name] = value;
    setInputList_sep(list);

    let price_sum_sep = 0;
    inputList_sep.forEach((data) => {
      price_sum_sep += +data.detail_price;
    });
    setPrice_sep(price_sum_sep);
  };

  // handle click event of the Remove button
  const handleRemoveClick_sep = (index) => {
    const list = [...inputList_sep];
    list.splice(index, 1);
    setInputList_sep(list);
  };

  // handle click event of the Add button
  const handleAddClick_sep = () => {
    setInputList_sep([
      ...inputList_sep,
      { detail_list: "-", detail_price: 0, detail_month: "09" },
    ]);
  };
  //=====================ตุลาคม==========================================
  const [open_oct, setOpen_oct] = React.useState(false);
  const handleOpen_oct = () => setOpen_oct(true);
  const handleClose_oct = () => setOpen_oct(false);
  const [inputList_oct, setInputList_oct] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "10" },
  ]);
  // handle input change
  const handleInputChange_oct = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_oct];
    list[index][name] = value;
    setInputList_oct(list);

    let price_sum_oct = 0;
    inputList_oct.forEach((data) => {
      price_sum_oct += +data.detail_price;
    });
    setPrice_oct(price_sum_oct);
  };

  // handle click event of the Remove button
  const handleRemoveClick_oct = (index) => {
    const list = [...inputList_oct];
    list.splice(index, 1);
    setInputList_oct(list);
  };

  // handle click event of the Add button
  const handleAddClick_oct = () => {
    setInputList_oct([
      ...inputList_oct,
      { detail_list: "-", detail_price: 0, detail_month: "10" },
    ]);
  };
  //===============พฤศจิกายน========================================================
  const [open_nov, setOpen_nov] = React.useState(false);
  const handleOpen_nov = () => setOpen_nov(true);
  const handleClose_nov = () => setOpen_nov(false);
  const [inputList_nov, setInputList_nov] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "11" },
  ]);
  // handle input change
  const handleInputChange_nov = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_nov];
    list[index][name] = value;
    setInputList_nov(list);

    let price_sum_nov = 0;
    inputList_nov.forEach((data) => {
      price_sum_nov += +data.detail_price;
    });
    setPrice_nov(price_sum_nov);
  };

  // handle click event of the Remove button
  const handleRemoveClick_nov = (index) => {
    const list = [...inputList_nov];
    list.splice(index, 1);
    setInputList_nov(list);
  };

  // handle click event of the Add button
  const handleAddClick_nov = () => {
    setInputList_nov([...inputList_nov, { detail_list: "-", detail_price: 0 }]);
  };

  //===========dec======================
  const [open_dec, setOpen_dec] = React.useState(false);
  const handleOpen_dec = () => setOpen_dec(true);
  const handleClose_dec = () => setOpen_dec(false);
  const [inputList_dec, setInputList_dec] = useState([
    { detail_list: "-", detail_price: 0, detail_month: "12" },
  ]);
  // handle input change
  const handleInputChange_dec = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList_dec];
    list[index][name] = value;
    setInputList_dec(list);

    let price_sum_dec = 0;
    inputList_dec.forEach((data) => {
      price_sum_dec += +data.detail_price;
    });
    setPrice_dec(price_sum_dec);
  };

  // handle click event of the Remove button
  const handleRemoveClick_dec = (index) => {
    const list = [...inputList_dec];
    list.splice(index, 1);
    setInputList_dec(list);
  };

  // handle click event of the Add button
  const handleAddClick_dec = () => {
    setInputList_dec([
      ...inputList_dec,
      { detail_list: "-", detail_price: 0, detail_month: "12" },
    ]);
  };
  const department = localStorage.getItem("department");
  const [currency, setCurrency] = useState(department.slice(1, -1));
  const [project_year, setProject_year] = useState("2565");
  const [project_name, setProject_name] = useState("");

  const [learn_job, setLearn_job] = useState("");
  const [learn_job_copy, setLearn_job_copy] = useState("");
  const [detail_job, setDetail_job] = useState("");

  const [price_feb, setPrice_feb] = useState(0);
  const [price_mar, setPrice_mar] = useState(0);
  const [price_apr, setPrice_apr] = useState(0);
  const [price_may, setPrice_may] = useState(0);
  const [price_jun, setPrice_jun] = useState(0);
  const [price_jul, setPrice_jul] = useState(0);
  const [price_aug, setPrice_aug] = useState(0);
  const [price_sep, setPrice_sep] = useState(0);
  const [price_oct, setPrice_oct] = useState(0);
  const [price_nov, setPrice_nov] = useState(0);
  const [price_dec, setPrice_dec] = useState(0);

  const [list_jan, setList_jan] = useState("-");
  const [list_feb, setList_feb] = useState("-");
  const [list_mar, setList_mar] = useState("-");
  const [list_apr, setList_apr] = useState("-");
  const [list_may, setList_may] = useState("-");
  const [list_jun, setList_jun] = useState("-");
  const [list_jul, setList_jul] = useState("-");
  const [list_aug, setList_aug] = useState("-");
  const [list_sep, setList_sep] = useState("-");
  const [list_oct, setList_oct] = useState("-");
  const [list_nov, setList_nov] = useState("-");
  const [list_dec, setList_dec] = useState("-");

  const [budget_request_date, setBudget_request_date] = useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeYear = (event) => {
    setProject_year(event.target.value);
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

  let price_loop = [
    {
      price: price_jan,
    },
    {
      price: price_feb,
    },
    {
      price: price_mar,
    },
    {
      price: price_apr,
    },
    {
      price: price_may,
    },
    {
      price: price_jun,
    },
    {
      price: price_jul,
    },
    {
      price: price_aug,
    },
    {
      price: price_sep,
    },
    {
      price: price_oct,
    },
    {
      price: price_nov,
    },
    {
      price: price_dec,
    },
  ];

  let show_sum = 0;
  price_loop.forEach((data) => {
    show_sum += data.price;
  });

  // const onSum_price = () => {
  //   let test_sum = 0;
  //   price_loop.forEach((data) => {
  //     test_sum += +data.price;
  //   });
  //   setProject_price(test_sum);
  //   console.log(test_sum);
  // };
  let detail_data = [
    {
      detail_data: inputList_jan,
    },
    {
      detail_data: inputList_feb,
    },
    {
      detail_data: inputList_mar,
    },
    {
      detail_data: inputList_apr,
    },
    {
      detail_data: inputList_may,
    },
    {
      detail_data: inputList_jun,
    },
    {
      detail_data: inputList_jul,
    },
    {
      detail_data: inputList_aug,
    },
    {
      detail_data: inputList_sep,
    },
    {
      detail_data: inputList_oct,
    },
    {
      detail_data: inputList_nov,
    },
    {
      detail_data: inputList_dec,
    },
  ];
  let budget_plan = {
    data_plan: [
      {
        plan_year: project_year,
        plan_month: "01",
        plan_list: list_jan,
        plan_price: price_jan,
        detail: inputList_jan,
      },
      {
        plan_year: project_year,
        plan_month: "02",
        plan_list: list_feb,
        plan_price: price_feb,
        detail: inputList_feb,
      },
      {
        plan_year: project_year,
        plan_month: "03",
        plan_list: list_mar,
        plan_price: price_mar,
        detail: inputList_mar,
      },
      {
        plan_year: project_year,
        plan_month: "04",
        plan_list: list_apr,
        plan_price: price_apr,
        detail: inputList_apr,
      },
      {
        plan_year: project_year,
        plan_month: "05",
        plan_list: list_may,
        plan_price: price_may,
        detail: inputList_may,
      },
      {
        plan_year: project_year,
        plan_month: "06",
        plan_list: list_jun,
        plan_price: price_jun,
        detail: inputList_jun,
      },
      {
        plan_year: project_year,
        plan_month: "07",
        plan_list: list_jul,
        plan_price: price_jul,
        detail: inputList_jul,
      },
      {
        plan_year: project_year,
        plan_month: "08",
        plan_list: list_aug,
        plan_price: price_aug,
        detail: inputList_aug,
      },
      {
        plan_year: project_year,
        plan_month: "09",
        plan_list: list_sep,
        plan_price: price_sep,
        detail: inputList_sep,
      },
      {
        plan_year: project_year,
        plan_month: "10",
        plan_list: list_oct,
        plan_price: price_oct,
        detail: inputList_oct,
      },
      {
        plan_year: project_year,
        plan_month: "11",
        plan_list: list_nov,
        plan_price: price_nov,
        detail: inputList_nov,
      },
      {
        plan_year: project_year,
        plan_month: "12",
        plan_list: list_dec,
        plan_price: price_dec,
        detail: inputList_dec,
      },
    ],
  };

  const input_budget_plan = async (event) => {
    if(learn_job === "" || learn_job_copy ==="" || detail_job === "" || project_name === "" || budget_request_date === "" ) {
      swal("เพิ่มข้อมูลไม่สำเร็จ", "กรุณาตรวจสอบข้อมูลให้ครบถ้วน", "error", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
      // window.location.href = "/admin/add_data";
      });
    }else{
      event.preventDefault();
      const response = await Check_bom({
        budget_plan,
        currency,
        project_name,
        budget_request_date,
        project_year,
        price_loop,
        detail_data,
        learn_job,
        learn_job_copy,
        detail_job,
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
    }
    
  };
  ///==================================================

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardBody>
            <h5>เพิ่มข้อมูล Plan Budget</h5>
            <Form >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "23%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-select-currency"
                  select
                  label="ฝ่ายที่ขอ"
                  value={currency}
                  onChange={handleChange}
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
                 
                  id="standard-select-currency"
                  label="เรียน"
                  variant="standard"
                  size="small"
                  color="warning"
                  onChange={(e) => {
                    setLearn_job(e.target.value);
                  }}
                />

                <TextField
                  id="standard-select-currency"
                  label="สำเนาเรียน"
                  variant="standard"
                  size="small"
                  color="warning"
                  onChange={(e) => {
                    setLearn_job_copy(e.target.value);
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
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-select-currency"
                  select
                  label="แผน งบประมาณ Project  ประจำปี"
                  value={project_year}
                  onChange={handleChangeYear}
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
                  label="จำนวนเงิน"
                  size="small"
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  color="info"
                  value={show_sum}
                  type="number"
                  focused
                />

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
              </Box>
              <hr />
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="มกราคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_jan(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_jan}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน มกราคม"
                  onClick={handleOpen_jan}
                >
                  <AddIcon />
                </Fab>
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="กุมภาพันธ์"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_feb(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_feb}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน กุมภาพันธ์"
                  onClick={handleOpen_feb}
                >
                  <AddIcon />
                </Fab>
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="มีนาคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_mar(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_mar}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน มีนาคม"
                  onClick={handleOpen_mar}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="เมษายน"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_apr(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_apr}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน เมษายน"
                  onClick={handleOpen_apr}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="พฤษภาคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_may(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_may}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน พฤษภาคม"
                  onClick={handleOpen_may}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="มิถุนายน"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_jun(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_jun}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน มิถุนายน"
                  onClick={handleOpen_jun}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="กรกฏาคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_jul(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_jul}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน กรกฎาคม"
                  onClick={handleOpen_jul}
                >
                  <AddIcon />
                </Fab>
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="สิงหาคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_aug(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_aug}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน สิงหาคม"
                  onClick={handleOpen_aug}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="กันยายน"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_sep(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_sep}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน กันยายน"
                  onClick={handleOpen_sep}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="ตุลาคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_oct(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_oct}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน ตุลาคม"
                  onClick={handleOpen_oct}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="พฤษจิกายน"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_nov(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_nov}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน พฤษจิกายน"
                  onClick={handleOpen_nov}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "29%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-read-only-input"
                  label="แผนการใช้งบเดือน"
                  defaultValue="ธันวาคม"
                  variant="standard"
                  color="secondary"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="รายการ"
                  variant="standard"
                  color="info"
                  onChange={(event) => {
                    setList_dec(event.target.value);
                  }}
                />

                <TextField
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                  type="number"
                  color="info"
                  value={price_dec}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Fab
                  style={{ width: "40px", height: "10px" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  title="เพิ่มรายละเอียด เดือน ธันวาคม"
                  onClick={handleOpen_dec}
                >
                  <AddIcon />
                </Fab>
              </Box>
              <FormGroup>
                <div className="update ml-auto mr-auto">
                  <br />
                  <Button
                    variant="contained"
                    className="btn-round"
                    color="primary"
                
                    onClick={input_budget_plan}
                  >
                    บันทึก Plan Budget
                  </Button>
                </div>
              </FormGroup>
            </Form>
            {/*================jan=================================================== */}
            <div>
              <Modal
                open={open_jan}
                onClose={handleClose_jan}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน มกราคม ยอด : {price_jan} </h5>
                  {inputList_jan.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          color="info"
                          variant="standard"
                          label="รายการ"
                          name="detail_list"
                          value={x.detail_list}
                          onChange={(e) => handleInputChange_jan(e, i)}
                        />
                        <TextField
                          color="info"
                          variant="standard"
                          label="ราคา"
                          type="number"
                          name="detail_price"
                          value={x.detail_price}
                          onChange={(e) => handleInputChange_jan(e, i)}
                        />

                        {inputList_jan.length !== 1 && (
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleRemoveClick_jan(i)}
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_jan.length - 1 === i && (
                          <Button
                            variant="contained"
                            onClick={handleAddClick_jan}
                          >
                            Add
                          </Button>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(inputList_jan)}
                  </div> */}
                </Box>
              </Modal>
            </div>

            {/* ===================feb===================== */}

            <div>
              <Modal
                open={open_feb}
                onClose={handleClose_feb}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน กุมภาพันธ์ ยอด : {price_feb}</h5>
                  {inputList_feb.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            setList_feb(e.target.value);
                            handleInputChange_feb(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          type="number"
                          label="ราคา"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_feb(e, i);
                          }}
                        />

                        {inputList_feb.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_feb(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_feb.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_feb}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(inputList_feb)}
                  </div> */}
                </Box>
              </Modal>
            </div>

            {/* =================mar============================== */}
            <div>
              <Modal
                open={open_mar}
                onClose={handleClose_mar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน มีนาคม ยอด : {price_mar}</h5>
                  {inputList_mar.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_mar(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_mar(e, i);
                          }}
                        />

                        {inputList_mar.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_mar(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_mar.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_mar}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(inputList_mar)}
                  </div> */}
                </Box>
              </Modal>
            </div>
            {/* ================================================== */}
            {/*=================apr */}
            <div>
              <Modal
                open={open_apr}
                onClose={handleClose_apr}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน เมษายน ยอด : {price_apr}</h5>
                  {inputList_apr.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_apr(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_apr(e, i);
                          }}
                        />

                        {inputList_apr.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_apr(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_apr.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_apr}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_apr)}
      </div> */}
                </Box>
              </Modal>
            </div>

            {/* =================== พฤษ */}
            <div>
              <Modal
                open={open_may}
                onClose={handleClose_may}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน พฤษภาคม ยอด : {price_may}</h5>
                  {inputList_may.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_may(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_may(e, i);
                          }}
                        />

                        {inputList_may.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_may(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_may.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_may}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(inputList_may)}
                  </div> */}
                </Box>
              </Modal>
            </div>
            {/* =======มิถุนา */}
            <div>
              <Modal
                open={open_jun}
                onClose={handleClose_jun}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน มิถุนายน ยอด : {price_jun}</h5>
                  {inputList_jun.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_jun(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_jun(e, i);
                          }}
                        />

                        {inputList_jun.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_jun(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_jun.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_jun}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_jun)}
      </div> */}
                </Box>
              </Modal>
            </div>

            {/* ============กรก======================= */}
            <div>
              <Modal
                open={open_jul}
                onClose={handleClose_jul}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน กรกฎาคม ยอด : {price_jul}</h5>
                  {inputList_jul.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_jul(e, i);
                          }}
                        />

                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          variant="standard"
                          color="info"
                          type="number"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_jul(e, i);
                          }}
                        />

                        {inputList_jul.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_jul(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_jul.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_jul}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_jul)}
      </div> */}
                </Box>
              </Modal>
            </div>
            {/*============สิงหาคม=============== */}
            <div>
              <Modal
                open={open_aug}
                onClose={handleClose_aug}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน สิงหาคม ยอด : {price_aug}</h5>
                  {inputList_aug.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_aug(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_aug(e, i);
                          }}
                        />

                        {inputList_aug.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_aug(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_aug.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_aug}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_aug)}
      </div> */}
                </Box>
              </Modal>
            </div>
            {/* =============กันยา============================================== */}
            <div>
              <Modal
                open={open_sep}
                onClose={handleClose_sep}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน กันยายน ยอด : {price_sep}</h5>
                  {inputList_sep.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_sep(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_sep(e, i);
                          }}
                        />

                        {inputList_sep.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_sep(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_sep.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_sep}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_sep)}
      </div> */}
                </Box>
              </Modal>
            </div>

            {/* =============ตุลาคม============================================== */}
            <div>
              <Modal
                open={open_oct}
                onClose={handleClose_oct}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน ตุลาคม ยอด : {price_oct}</h5>
                  {inputList_oct.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_oct(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_oct(e, i);
                          }}
                        />

                        {inputList_oct.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_oct(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_oct.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_oct}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_oct)}
      </div> */}
                </Box>
              </Modal>
            </div>
            {/* =============พฤษจิ============================================== */}
            <div>
              <Modal
                open={open_nov}
                onClose={handleClose_nov}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน พฤศจิกายน ยอด : {price_nov}</h5>
                  {inputList_nov.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_nov(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          type="number"
                          variant="standard"
                          color="info"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_nov(e, i);
                          }}
                        />

                        {inputList_nov.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_nov(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_nov.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_nov}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
        {JSON.stringify(inputList_nov)}
      </div> */}
                </Box>
              </Modal>
            </div>
            {/* =============dec============================================== */}
            <div>
              <Modal
                open={open_dec}
                onClose={handleClose_dec}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5>รายละเอียด เดือน ธันวาคม ยอด : {price_dec}</h5>
                  {inputList_dec.map((x, i) => {
                    return (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "31%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          name="detail_list"
                          label="รายการ"
                          variant="standard"
                          color="info"
                          value={x.detail_list}
                          onChange={(e) => {
                            handleInputChange_dec(e, i);
                          }}
                        />
                        <TextField
                          id="standard-basic"
                          name="detail_price"
                          label="ราคา"
                          variant="standard"
                          color="info"
                          type="number"
                          value={x.detail_price}
                          onChange={(e) => {
                            handleInputChange_dec(e, i);
                          }}
                        />

                        {inputList_dec.length !== 1 && (
                          <Button
                            className="mr10"
                            onClick={() => handleRemoveClick_dec(i)}
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        )}
                        {inputList_dec.length - 1 === i && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleAddClick_dec}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(inputList_dec)}
                  </div> */}
                </Box>
              </Modal>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
