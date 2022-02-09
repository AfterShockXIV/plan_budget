import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
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
import { Card, CardBody } from "reactstrap";
import { styled } from "@mui/material/styles";
import server from "variables/port_server";
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
      detail_price: data.detail_price
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    });
  });
  console.log(his);
  return {
    plan_month,
    plan_list,
    plan_price,
    history: his,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <StyledTableCell>{row.plan_list}</StyledTableCell>
        <StyledTableCell>{row.plan_price}</StyledTableCell>
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
        data.plan_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
        data.plan_run_id,
        data_detail.filter((data_s) => {
          return data_s.plan_run_id === data.plan_run_id;
        })
      )
    );
  });
  let project_price = data_budget.budget_project_price
  return (
    <>
      <div className="content">
        {loading ? (
          <div class="loader"></div>
        ) : (
          <Card>
            <CardBody>
              <h6>
                แผนงบประมาณ โครงการ ของฝ่าย {data_budget.budget_department}{" "}
                ประจำปี {data_budget.budget_project_year} งบประมาณ{" "}
                {project_price}
              </h6>
              <br />
              <h6>เรื่อง : {data_budget.budget_project_name}</h6>
              <br />
              <h6>เรียน : {data_budget.learn_job}</h6>
              <br />
              <h6>สำเนาเรียน : {data_budget.learn_job_copy}</h6>
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
