import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Card, CardBody, Form } from "reactstrap";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import server from "variables/port_server";
import swal from "sweetalert";
import TextareaAutosize from "@mui/material/TextareaAutosize";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 2,
  },
}));

function createData(
  plan_month,
  plan_list,
  plan_price,
  plan_run_id,
  detail,
  budget_run_id
) {
  let his = [];
  detail.forEach((data) => {
    his.push({
      detail_list: data.detail_list,
      detail_price: data.detail_price
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    });
  });
  return {
    plan_month,
    plan_list,
    plan_price,
    history: his,
    plan_run_id,
    budget_run_id,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [open_edit, setOpen_edit] = React.useState(false);
  const handleOpen_edit = () => {
    setOpen_edit(true);
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
  const [auto_number, setAuto_number] = useState(0);
  const [plan_run_id, setPlan_run_id] = useState("");
  const [plan_list, setPlan_list] = useState("");
  const [plan_price, setPlan_price] = useState("");
  const [, setError] = useState();
  const [, setLoading] = useState(true);
  const [budget_detail, setBudget_detail] = useState([]);
  const [budget_run_id, setBudget_run_id] = useState("");
  //edit
  const [plan_list_edit, setPlan_list_edit] = useState("");

  const [detail_run_id, setDetail_run_id] = useState("");
  const [detail_price, setDetail_price] = useState("");
  const handleClose_edit = () => {
    setOpen_edit(false);
    setPlan_run_id("");
    setPlan_list("");
    setPlan_price("");
    setPlan_list_edit("");
  };

  useEffect(() => {
    fetch(server + "/set_budget_detail/" + plan_run_id)
      .then((response) => response.json())
      .then((result) => setBudget_detail(result))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/set_budget_plan/" + plan_run_id)
      .then((response) => response.json())
      .then((result) => setPlan_price(result))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto_number]);

  async function fetch_data(credentials) {
    return fetch(server + "/update_budget_plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const Click_update = async (event) => {
    event.preventDefault();
    const response = await fetch_data({
      plan_list_edit,
      plan_run_id,
      inputList,
      budget_run_id,
      plan_price,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href =
          "/admin/edit_planbudget/" + response.budget_run_id;
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  const [open_delete, setOpen_delete] = React.useState(false);
  const handleOpen_delete = () => setOpen_delete(true);
  const handleClose_delete = () => {
    setOpen_delete(false);
    setDetail_run_id("");
    setAuto_number(auto_number + 1);
  };

  async function fetch_data_detail(credentials) {
    return fetch(server + "/delete_budget_detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const Click_delete_detail = async (event) => {
    event.preventDefault();
    const response = await fetch_data_detail({
      detail_run_id,
      plan_run_id,
      detail_price,
      plan_price,
      budget_run_id,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        handleClose_delete();
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
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

  const [open_add, setOpen_add] = React.useState(false);
  const handleOpen_add = () => setOpen_add(true);
  const handleClose_add = () => {
    setOpen_add(false);
  };

  const [inputList, setInputList] = useState([
    {
      detail_list: "-",
      detail_price: 0,
    },
  ]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        detail_list: "-",
        detail_price: 0,
      },
    ]);
  };

  return (
    <React.Fragment>
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
                  onClick={Click_delete_detail}
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
            {/* <h6>
                เพิ่มข้อมูลรายละเอียด: {project_name} || ราคา : {project_price}
              </h6>

              <br />
              <h6>
                ยอดที่เพิ่มมา : {project_price_sum} || รวมทั้งหมด{" "}
                {+project_price_sum + +project_price}
              </h6> */}
            <br />
            <div>
              <h5>รายละเอียด</h5>
              {inputList.map((x, i) => {
                return (
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <span>{i + 1} </span>
                    <TextField
                      color="info"
                      variant="standard"
                      label="รายการ"
                      name="detail_list"
                      value={x.detail_list}
                      style={{ width: "30%" }}
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    <TextField
                      color="info"
                      variant="standard"
                      label="ราคา"
                      type="number"
                      name="detail_price"
                      value={x.detail_price}
                      style={{ width: "30%" }}
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    {inputList.length !== 1 && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleRemoveClick(i)}
                        size="small"
                        style={{ width: "10%" }}
                      >
                        Remove
                      </Button>
                    )}
                    {inputList.length - 1 === i && (
                      <Button
                        variant="contained"
                        onClick={handleAddClick}
                        size="small"
                        style={{ width: "10%" }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                );
              })}
              <br />
              <div></div>
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
            <h6>แก้ไขข้อมูลโครงการ</h6>

            <div>
              <div>
                <div>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "45%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      label="รายการ"
                      size="small"
                      variant="standard"
                      color="info"
                      fullWidth
                      defaultValue={plan_list}
                      onChange={(event) => {
                        setPlan_list_edit(event.target.value);
                      }}
                      focused
                    />

                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      label="ราคา"
                      size="small"
                      variant="standard"
                      color="info"
                      fullWidth
                      value={plan_price}
                      focused
                    />
                  </Box>
                </div>
                <hr />

                <h6>แก้ไขข้อมูลรายละเอียด</h6>
                <div>
                  {budget_detail.map((data) => (
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "30%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        disabled
                        label="รายการ"
                        size="small"
                        variant="standard"
                        color="info"
                        defaultValue={data.detail_list}
                        // onChange={(event) => {
                        //   setPlan_list_edit(event.target.value);
                        // }}
                      />

                      <TextField
                        disabled
                        label="ราคา"
                        po
                        size="small"
                        variant="standard"
                        color="info"
                        defaultValue={data.detail_price}
                        // onChange={(event) => {
                        //   setProject_name(event.target.value);
                        // }}
                      />

                      <Button
                        variant="contained"
                        size="small"
                        style={{ width: "20%" }}
                        color="error"
                        onClick={() => {
                          handleOpen_delete();
                          setDetail_run_id(data.detail_run_id);
                          setDetail_price(data.detail_price);
                        }}
                      >
                        delete {data.detail_run_id}
                      </Button>
                    </Box>
                  ))}
                </div>
                <br />
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "30%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Button
                    className="mr10"
                    size="small"
                    onClick={() => {
                      handleOpen_add();
                    }}
                    variant="contained"
                    color="info"
                  >
                    เพิ่มข้อมูลรายละเอียด
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ width: "33%" }}
                    fullWidth
                    type="submit"
                    color="success"
                    onClick={Click_update}
                  >
                    UPDATE
                  </Button>
                </Box>
              </div>
              <br />
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>  */}
            </div>
          </Box>
        </Modal>
      </div>
      {/*========================= */}

      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.plan_month}
        </StyledTableCell>
        <StyledTableCell>{row.plan_list}</StyledTableCell>
        <StyledTableCell>
          {row.plan_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </StyledTableCell>
        <TableCell>
          <Form>
            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={() => {
                handleOpen_edit();
                setPlan_list(row.plan_list);
                // setPlan_price(row.plan_price);
                setPlan_run_id(row.plan_run_id);
                setPlan_list_edit(row.plan_list);
                setAuto_number(auto_number + 1);
                setBudget_run_id(row.budget_run_id);
              }}
            >
              update
            </Button>
          </Form>
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, width: "100%", paddingLeft: "19%" }}>
              <Typography variant="h6" gutterBottom component="div">
                รายละเอียด
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>
                      <b>รายการ</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>ราคา</b>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.detail_list}>
                      <StyledTableCell component="th" scope="row">
                        {historyRow.detail_list}
                      </StyledTableCell>
                      <StyledTableCell>
                        {historyRow.detail_price}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_detail, setData_detail] = useState([]);
  const [data_budget, setData_budget] = useState([]);
  const [data_all, setData_all] = useState([]);
  const [learn_job_edit , setLearn_job_edit] = useState("")
  const [learn_job_copy_edit , setLearn_job_copy_edit] = useState("")
  const [detail_job_edit , setDetail_job_edit] = useState("")
  const [budget_project_name_edit , setBudget_project_name_edit] = useState("")
  const [budget_date_request_edit , setBudget_date_request_edit] = useState("")
 

  useEffect(() => {
    fetch(server + "/update_plan/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_budget(result.data_main))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/update_plan/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_all(result.data_all))
      .then(() => setLoading(false))
      .catch(setError);

    fetch(server + "/update_plan/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_detail(result.data_detail))
      .then(() => setLoading(false))
      .catch(setError);
  }, [props.match.params.id]);
  //   console.log(data_detail);

  const [open_edit, setOpen_edit] = React.useState(false);
  const handleOpen_edit = () => {
    setOpen_edit(true);
  };
  const handleClose_edit = () => {
    setOpen_edit(false);
  };

  async function fetch_data(credentials) {
    return fetch(server + "/update_budget_header", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  let budget_run_id = data_budget.budget_run_id
  const Click_update = async (event) => {
    event.preventDefault();
    const response = await fetch_data({
      learn_job_edit,
      learn_job_copy_edit,
      budget_project_name_edit,
      budget_date_request_edit,
      detail_job_edit,
      budget_run_id
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href =
          "/admin/edit_planbudget/" + response.budget_run_id;
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  const rows = [];
  //   console.log(rows);
  data_all.forEach((data, key) => {
    rows.push(
      createData(
        (() => {
          if (data.plan_month === "01") {
            return <span>มกราคม</span>;
          } else if (data.plan_month === "02") {
            return <span>กุมภาพันธ์</span>;
          } else if (data.plan_month === "03") {
            return <span>มีนาคม</span>;
          } else if (data.plan_month === "04") {
            return <span>เมษายน</span>;
          } else if (data.plan_month === "05") {
            return <span>พฤษภาคม</span>;
          } else if (data.plan_month === "06") {
            return <span>มิถุนายน</span>;
          } else if (data.plan_month === "07") {
            return <span>กรกฎาคม</span>;
          } else if (data.plan_month === "08") {
            return <span>สิงหาคม</span>;
          } else if (data.plan_month === "09") {
            return <span>กันยายน</span>;
          } else if (data.plan_month === "10") {
            return <span>ตุลาคม</span>;
          } else if (data.plan_month === "11") {
            return <span>พฤษจิกายน</span>;
          } else if (data.plan_month === "12") {
            return <span>ธันวาคม</span>;
          }
        })(),
        data.plan_list,
        data.plan_price,
        data.plan_run_id,
        data_detail.filter((data_s) => {
          return data_s.plan_run_id === data.plan_run_id;
        }),
        data.budget_run_id
      )
    );
  });
 
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
      <div className="content">
        {loading ? (
          <div class="loader"></div>
        ) : (
          <Card>
            <div>
              <Modal
                open={open_edit}
                onClose={handleClose_edit}
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
                      defaultValue={data_budget.budget_project_name}
                      onChange={(event) => {
                        setBudget_project_name_edit(event.target.value);
                      }}
                    />

                    <TextField
                      id="standard-select-currency"
                      label="เรียน"
                      variant="standard"
                      size="small"
                      color="warning"
                      defaultValue={data_budget.learn_job}
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
                      defaultValue={data_budget.learn_job_copy}
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
                      defaultValue={data_budget.budget_date_request}
                      onChange={(event) => {
                        setBudget_date_request_edit(event.target.value);
                      }}
                    />
                    <TextareaAutosize
                      placeholder="รายละเอียด"
                      style={{ width: "97%" }}
                      minRows={5}
                      defaultValue={data_budget.detail_job}
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

            <CardBody>
              <h6>
                แผนงบประมาณ โครงการ ของฝ่าย {data_budget.budget_department}{" "}
                ประจำปี {data_budget.budget_project_year} งบประมาณ{" "}
                {data_budget.budget_project_price}
              </h6>
              <br />
              <h6>เรื่อง : {data_budget.budget_project_name}</h6>
              <br />
              <h6>เรียน : {data_budget.learn_job}</h6>
              <br />
              <h6>สำเนาเรียน : {data_budget.learn_job_copy}</h6>
              <br />
              <h6>รายละเอียด : {data_budget.detail_job}</h6>
              <br />
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => {
                  handleOpen_edit();
                  setLearn_job_edit(data_budget.learn_job);
                  setLearn_job_copy_edit(data_budget.learn_job_copy);
                  setDetail_job_edit(data_budget.detail_job);
                  setBudget_date_request_edit(data_budget.budget_date_request);
                  setBudget_project_name_edit(data_budget.budget_project_name);
                }}
              >
                update header
              </Button>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell />
                      <StyledTableCell>
                        <h5>เดือน</h5>
                      </StyledTableCell>
                      <StyledTableCell>
                        <h5>รายการ</h5>
                      </StyledTableCell>
                      <StyledTableCell>
                        <h5>ราคา</h5>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <Row key={row.name} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
