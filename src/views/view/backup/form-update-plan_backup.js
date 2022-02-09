import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Card, CardBody, Form } from "reactstrap";
import { styled } from "@mui/material/styles";
import swal from "sweetalert";
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
function createData(plan_month, plan_list, plan_price, plan_run_id, detail) {
  let his = [];
  detail.forEach((data) => {
    his.push({
      detail_list: data.detail_list,
      detail_price: data.detail_price,
      detail_run_id: data.detail_run_id,
    });
  });
  console.log(his);
  return {
    plan_month,
    plan_list,
    plan_price,
    plan_run_id,
    history: his,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [plan_list, setPlan_list] = useState("");
  const [plan_price, setPlan_price] = useState("");
  const [plan_id, setPlan_id] = useState("");
  const [detail_list, setDetail_list] = useState("");
  // const [list_feb, setList_feb] = useState("");
  // const [list_mar, setList_mar] = useState("");
  // const [list_apr, setList_apr] = useState("");
  // const [list_may, setList_may] = useState("");
  // const [list_jun, setList_jun] = useState("");
  // const [list_jul, setList_jul] = useState("");
  // const [list_aug, setList_aug] = useState("");
  // const [list_sep, setList_sep] = useState("");
  // const [list_oct, setList_oct] = useState("");
  // const [list_nov, setList_nov] = useState("");
  // const [list_dec, setList_dec] = useState("");

  const server = "http://localhost:5050/";
  async function Check_bom(credentials) {
    return fetch(server + "edit_plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const edit_plan = async (event) => {
    event.preventDefault();
    const response = await Check_bom({
      plan_list,
      plan_price,
      plan_id,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href = "/admin/add_data";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

  async function Check_detail(credentials) {
    return fetch(server + "edit_detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const edit_detail = async (event) => {
    event.preventDefault();
    const response = await Check_detail({
      detail_list,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href = "/admin/add_data";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  return (
    <React.Fragment>
       
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
        <StyledTableCell>
          <TextField
            variant="standard"
            defaultValue={row.plan_list}
            onChange={(event) => {
              setPlan_list(event.target.value);
            }}
          ></TextField>
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            type="number"
            variant="standard"
            onChange={(event) => {
              setPlan_price(event.target.value);
            }}
            defaultValue={row.plan_price}
          ></TextField>
        </StyledTableCell>
        <StyledTableCell>
          <Form onSubmit={edit_plan}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="info"
              onClick={() => setPlan_id(row.plan_run_id)}
            >
             Update
            </Button>
          </Form>
        </StyledTableCell>
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
                  <TableRow>
                    <TableCell>
                      <b>รายการ</b>
                    </TableCell>
                    <TableCell>
                      <b>ราคา</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.detail_list}>
                      <TableCell component="th" scope="row">
                        <TextField
                          variant="standard"
                          defaultValue={historyRow.detail_list}
                          onChange={(event) => {
                            setDetail_list(event.target.value);
                          }}
                        ></TextField>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          variant="standard"
                          defaultValue={historyRow.detail_price}
                        ></TextField>
                      </TableCell>

                      <TableCell>
                        <Form onSubmit={edit_detail}>
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            type="submit"
                          >
                           update
                          </Button>
                        </Form>
                      </TableCell>
                    </TableRow>
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
  const server = "http://localhost:5050";
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_detail, setData_detail] = useState([]);
  const [data_budget, setData_budget] = useState([]);
  const [data_all, setData_all] = useState([]);
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
        })
      )
    );
  });

  return (
    <>
      <div className="content">
        {loading ? (
          <div class="loader"></div>
        ) : (
          <Card>
            <CardBody>
            
              <h5>
                แผนงบประมาณ Project : . . . . {data_budget.budget_project_name}{" "}
                . . . . ของฝ่าย {data_budget.budget_department} ประจำปี{" "}
                {data_budget.budget_project_year} งบ{" "}
                {data_budget.budget_project_price}
              </h5>
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
