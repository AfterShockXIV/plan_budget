import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
export default function Home(props) {
  const name_n = localStorage.getItem("name_n");
  const surname_s = localStorage.getItem("surname_s");
  const department = localStorage.getItem("department");
  const [data_sum, setData_sum] = useState([]);
  const [data_all, setData_all] = useState([]);
  const [data_budget_all, setData_budget_all] = useState([]);
  const [ ,setSum_budget] = useState([]) ; 
  const server = "http://localhost:5050";
  const [, setError] = useState();
  const [, setLoading] = useState(true);
  useEffect(() => {
    fetch(server + "/Home_check/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_sum(result.data_sum))
      .then(() => setLoading(false))
      .catch(setError);

      fetch(server + "/Home_check/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_all(result.data_all))
      .then(() => setLoading(false))
      .catch(setError);

      fetch(server + "/Home_check/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setData_budget_all(result.data_budget_all))
      .then(() => setLoading(false))
      .catch(setError);

      fetch(server + "/Home_check/" + department.slice(1, -1))
      .then((response) => response.json())
      .then((result) => setSum_budget(result.sum_budget))
      .then(() => setLoading(false))
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="content">
        <Card>
          <CardBody>
            <span>
              ชื่อ : {name_n.slice(1, -1)} &nbsp;&nbsp; นามสกุล :{" "}
              {surname_s.slice(1, -1)}
            </span>
            <br />
            <span>แผนก : {department.slice(1, -1)}</span>
            <br />
            <span>
              BugGet ทั้งหมด  : {+data_all.length + +data_budget_all.length}
            </span>
            <br />
            <span>
              รวม :{data_sum
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </span>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
