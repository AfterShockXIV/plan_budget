/* eslint-disable eqeqeq */
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const authRoute = require("./routes/auth");
const fs = require("fs");
app.use(express.json());
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.set("view engine", "ejs"); // configure template engine
app.set("views", "views");
app.use(authRoute);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.urlencoded({ extended: false }));
const client = "http://localhost:5000/admin/check_job/";
const client_2 = "http://localhost:5000/admin/report_sap/";
//Database Connect
const port = 5050;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "budget_venine",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

global.db = db;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

//home
app.get("/Home_check/:department", (req, res) => {
  let department = req.params.department;
  db.query(
    "SELECT sum(job_project_price) as sum FROM `budget_main_job` WHERE job_department ='" +
      department +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let sum = result;
        db.query(
          "SELECT * FROM `budget_main_job` WHERE job_department ='" +
            department +
            "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let data_approve = result.filter((data) => {
                return data.status === "Approve";
              });
              let data_wait = result.filter((data) => {
                return data.status !== "Approve";
              });
              let data_all = result;
              db.query(
                "SELECT * FROM `budget_main` WHERE budget_department ='" +
                  department +
                  "'",
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let data_budget_all = result;
                    db.query(
                      "SELECT sum(budget_project_price) as sum_budget FROM `budget_main` WHERE budget_department ='" +
                        department +
                        "'",
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          let sum_all = result[0].sum_budget + sum[0].sum;
                          res.send({
                            data_sum: sum_all,
                            data_all: data_all,
                            data_approve: data_approve,
                            data_wait: data_wait,

                            data_budget_all: data_budget_all,
                            sum_budget: result,
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//login
app.post("/Check_login", (req, res) => {
  async function Check_login() {
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(username, 10, (err, tokentext) => {
      // console.log(tokentext);
      let data =
        "select * from login_data where username = '" +
        username +
        "' and password = '" +
        password +
        "' ";
      db.query(data, (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          // console.log("suc" + result.length);
          if (result.length === 0) {
            res.send({
              status: "error",
              message: "ตรวจสอบ Username หรือ Password",
            });
          } else {
            res.send({
              status: "ok",
              message: "Logged in",
              accessToken: tokentext,
              name_n: result[0].name_n,
              department: result[0].department,
              login_run_id: result[0].login_run_id,
              surname_s: result[0].surname_s,
              assistant: result[0].assistant,
            });
          }
        }
      });
    });
  }
  Check_login();
});

app.post("/Check_login_md", (req, res) => {
  async function Check_login() {
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(username, 10, (err, tokentext) => {
      // console.log(tokentext);
      let data =
        "select * from login_data where username = '" +
        username +
        "' and password = '" +
        password +
        "' ";
      db.query(data, (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          // console.log("suc" + result.length);

          if (
            result.length === 0 ||
            result.department === "MD" ||
            result.department === "AMD" ||
            result.department === "AMD2"
          ) {
            res.send({
              status: "error",
              message: "ตรวจสอบ Username หรือ Password",
            });
          } else {
            res.send({
              status: "ok",
              message: "Logged in",
              accessToken: tokentext,
              name_n: result[0].name_n,
              department: result[0].department,
              login_run_id: result[0].login_run_id,
              surname_s: result[0].surname_s,
              assistant: result[0].assistant,
            });
          }
        }
      });
    });
  }
  Check_login();
});

app.post("/post_plan_budget", async (req, res) => {
  let factory = req.body.factory;
  let currency = req.body.currency;
  let learn = req.body.learn;
  let learn_copy = req.body.learn_copy;
  let project_name = req.body.project_name;
  let detail = req.body.detail;
  let budget_request_date = req.body.budget_request_date;
  let project_year = req.body.project_year;
  let prtype = req.body.prtype;
  let assistant = req.body.assis;
  let sum_price = 0;
  let detail_Orderioco = "wait";
  let inputList = req.body.inputList;
  let filter_1 = await inputList.filter((data) => {
    return data.detail_sum !== 0 && data.detail_list !== "-";
  });

  await filter_1.forEach((data) => {
    sum_price += data.detail_sum;
  });

  function Insert_budget() {
    db.query(
      "INSERT INTO budget_main (assistant,pr_type, factory , detail,learn_copy, learn , budget_project_name ,budget_project_price , budget_date_request,budget_project_year , budget_department , status ) VALUES (?,?,?,?,?,?,?,?,?,?,?,'wait')",
      [
        assistant,
        prtype,
        factory,
        detail,
        learn,
        learn_copy,
        project_name,
        sum_price,
        budget_request_date,
        project_year,
        currency,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let budget_run_id = result.insertId;
          inputList.forEach((data, key) => {
            db.query(
              "INSERT INTO budget_detail (detail_month,budget_run_id,detail_list,detail_price,detail_qty,detail_sum,detail_unit,detail_ACCT,detail_CURR,detail_Priceperunit,detail_material,detail_GL,detail_MatGroup,detail_itempr,detail_Prtype,detail_factory,detail_Orderioco,detail_Applicant,detail_TrackingNumber,detail_CostCenter,detail_TEXTLINE,detail_unit_label,detail_CURR_label,detail_GL_label,detail_MatGroup_label,detail_CostCenter_label) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                data.detail_month,
                budget_run_id,
                data.detail_list,
                data.detail_price,
                data.detail_qty,
                data.detail_sum,
                data.detail_unit,
                data.detail_ACCT,
                data.detail_CURR,
                data.detail_Priceperunit,
                data.detail_material,
                data.detail_GL,
                data.detail_MatGroup,
                key + 1,
                prtype,
                factory,
                detail_Orderioco,
                currency,
                currency,
                data.detail_CostCenter,
                project_name,
                data.detail_unit_label,
                data.detail_CURR_label,
                data.detail_GL_label,
                data.detail_MatGroup_label,
                data.detail_CostCenter_label,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                }
              }
            );
          });
        }
      }
    );
  }
  await Insert_budget();
  await res.send({
    status: "success",
    message: "เพิ่มข้อมูลเรียบร้อย",
  });
});

app.get("/report_budget/:department", (req, res) => {
  let department = req.params.department;
  let select_data = "";
  if (department === "ACM") {
    select_data = "SELECT * FROM `budget_main` order by budget_run_id DESC ";
  } else {
    select_data =
      "SELECT * FROM `budget_main` where budget_department = '" +
      department +
      "' order by budget_run_id DESC ";
  }
  db.query(select_data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let data_main = result;
      res.send({
        data_main: data_main,
      });
    }
  });
});

app.get("/update_plan/:budget_run_id", (req, res) => {
  let budget_run_id = req.params.budget_run_id;
  db.query(
    "SELECT * FROM `budget_main` where budget_run_id = '" +
      budget_run_id +
      "'  ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_main = result[0];
        db.query(
          "SELECT * FROM `budget_main` inner JOIN budget_plan on (budget_plan.budget_run_id = budget_main.budget_run_id)  where budget_main.budget_run_id = '" +
            budget_run_id +
            "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let data_all = result;
              db.query("SELECT * FROM budget_detail", (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send({
                    data_main: data_main,
                    data_all: data_all,
                    data_detail: result,
                  });
                }
              });
              // console.log(result.length);
            }
          }
        );
      }
    }
  );
});

app.post("/edit_plan", async (req, res) => {
  let plan_list = req.body.plan_list;
  let plan_price = req.body.plan_price;
  let plan_id = req.body.plan_id;
  console.log(plan_list);
  console.log(plan_price);
  console.log(plan_id);
  let edit_data =
    "UPDATE budget_plan SET `plan_list` = '" +
    plan_list +
    "' ,  `plan_price` = '" +
    plan_price +
    "'  WHERE plan_run_id = '" +
    plan_id +
    "' ";

  if (plan_list === "" || plan_price === "") {
    res.send({
      message: "กรุณาตรวจสอบค่าว่าง ถ้าไม่มีค่าให้ใส่ '-' หรือ 0",
    });
  } else {
    db.query(edit_data, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "success",
          message: "แก้ไขข้อมูลสำเร็จ",
        });
      }
    });
  }
});

app.post("/edit_detail", async (req, res) => {
  let detail_list = req.body.detail_list;
  console.log(detail_list);
});

app.post("/post_plan_job", async (req, res) => {
  let inputList = req.body.inputList;
  let project_name = req.body.project_name;
  let job_time = req.body.job_time;
  let project_year = req.body.project_year;
  let currency = req.body.currency;
  let budget_request_date = req.body.budget_request_date;
  let project_price = req.body.project_price;
  let learn_job = req.body.learn_job;
  let learn_job_copy = req.body.learn_job_copy;
  let detail_job = req.body.detail_job;
  let prtype_job_sap = req.body.prtype_job;
  let factory = req.body.factory;
  let status = "wait";
  let detail_Orderioco_job = "wait";
  let assis = req.body.assis;
  let detail_GL_label = req.body.detail_GL_label;
  let detail_MatGroup_label = req.body.detail_MatGroup_label;
  let detail_CostCenter_label = req.body.detail_CostCenter_label;
  //let  detail_ACCT_label = req.body.detail_ACCT_label
  let detail_GL_job = req.body.detail_GL_job;
  let detail_MatGroup_job = req.body.detail_MatGroup_job;
  // let  detail_CostCenter_job = req.body.detail_CostCenter_job
  let detail_ACCT_job = req.body.detail_ACCT_job;

  let sum_price = 0;
  let filter_1 = await inputList.filter((data) => {
    return data.detail_price_job !== 0 && data.detail_list_job !== "-";
  });
  await filter_1.forEach((data) => {
    sum_price += +data.detail_price_job;
  });

  let check_k = inputList.filter((data) => {
    return data.detail_ACCT_job === "K" && data.detail_CostCenter_job === "";
  });

  if (check_k.length > 0) {
    res.send({
      message: "กรุณากรอกข้อมูล Cost Center ที่ เป็น K",
    });
  } else {
    async function insert_budget() {
      await db.query(
        "INSERT INTO budget_main_job (assistant,pr_type , factory, detail_job,learn_job_copy,learn_job,job_time,job_project_name,job_project_price,job_date_request,job_project_year , job_department,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          assis,
          prtype_job_sap,
          factory,
          detail_job,
          learn_job_copy,
          learn_job,
          job_time,
          project_name,
          project_price,
          budget_request_date,
          project_year,
          currency,
          status,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            let job_run_id = result.insertId;
            inputList.forEach((data, key) => {
              db.query(
                "INSERT INTO budget_detail_job (job_run_id,detail_list_job,detail_price_job,detail_qty_job,detail_sum_job,detail_unit_job,detail_ACCT_job,detail_CURR_job,detail_Priceperunit_job,detail_material_job,detail_GL_job,detail_MatGroup_job,detail_itempr_job,detail_Prtype_job,detail_factory_job,detail_Orderioco_job,detail_Applicant_job,detail_TrackingNumber_job,detail_CostCenter_job,detail_TEXTLINE_job,detail_unit_label,detail_CURR_label,detail_GL_label,detail_MatGroup_label,detail_CostCenter_label) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                  job_run_id,
                  data.detail_list_job,
                  data.detail_price_job,
                  data.detail_qty_job,
                  data.detail_sum_job,
                  data.detail_unit_job,
                  detail_ACCT_job,
                  data.detail_CURR_job,
                  data.detail_Priceperunit_job,
                  data.detail_material_job,
                  detail_GL_job,
                  detail_MatGroup_job,
                  key + 1,
                  prtype_job_sap,
                  factory,
                  detail_Orderioco_job,
                  currency,
                  currency,
                  data.detail_CostCenter_job,
                  project_name,
                  data.detail_unit_label,
                  data.detail_CURR_label,
                  detail_GL_label,
                  detail_MatGroup_label,
                  detail_CostCenter_label,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                }
              );
            });
          }
        }
      );
    }
    await insert_budget();
    await res.send({
      status: "success",
      message: "เพิ่มข้อมูลสำเร็จ",
    });
  }
});

app.get("/report_job/:department", (req, res) => {
  let department = req.params.department;
  let select_data = "";
  if (department === "ACM") {
    select_data = "SELECT * FROM `budget_main_job` order by job_run_id DESC ";
  } else {
    select_data =
      "SELECT * FROM `budget_main_job` where job_department = '" +
      department +
      "' order by job_run_id DESC ";
  }

  db.query(select_data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let data_main = result;
      res.send({
        data_main_job: data_main,
      });
    }
  });
});

app.get("/report_job_detail/:job_run_id", (req, res) => {
  let job_run_id = req.params.job_run_id;
  db.query(
    "SELECT * FROM `budget_main_job`  where job_run_id = '" + job_run_id + "' ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let status = result[0].status;
        let main_job = result[0];
        db.query(
          "SELECT * FROM `budget_detail_job`  where job_run_id = '" +
            job_run_id +
            "' ",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let data_detail = result;
              res.send({
                data_detail_job: data_detail,
                status: status,
                main_job: main_job,
              });
            }
          }
        );
      }
    }
  );
});

app.get("/report_budget_detail/:budget_run_id", (req, res) => {
  let budget_run_id = req.params.budget_run_id;
  db.query(
    "SELECT * FROM `budget_main`  where budget_run_id = '" +
      budget_run_id +
      "' ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let status = result[0].status;
        let main = result[0];
        db.query(
          "SELECT * FROM `budget_detail`  where budget_run_id = '" +
            budget_run_id +
            "' ",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let data_detail = result;
              res.send({
                data_detail: data_detail,
                status: status,
                main: main,
              });
            }
          }
        );
      }
    }
  );
});

//update budget โครงการ ========================================
app.get("/set_budget_detail/:plan_run_id", (req, res) => {
  let plan_run_id = req.params.plan_run_id;

  db.query(
    "SELECT * FROM budget_detail where plan_run_id = '" + plan_run_id + "' ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

app.get("/set_budget_plan/:plan_run_id", (req, res) => {
  let plan_run_id = req.params.plan_run_id;

  db.query(
    "SELECT * FROM budget_plan where plan_run_id = '" + plan_run_id + "' ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result[0].plan_price);
        console.log(result[0].plan_price);
      }
    }
  );
});

app.get("/export_to_sap_api/:id", (req, res) => {
  let job_run_id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" +
      job_run_id +
      "' order by detail_itempr_job ASC",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_api = [];
        result.forEach((data) => {
          data_api.push({
            BSART: data.detail_Prtype_job,
            BNFPO: data.detail_itempr_job,
            KNTTP: data.detail_ACCT_job,
            MATNR: data.detail_material_job,
            TXZ01: data.detail_list_job,
            MENGE: data.detail_qty_job,
            MEINS: data.detail_unit_job,
            MATKL: data.detail_MatGroup_job,
            WERKS: data.detail_factory_job,
            AFNAM: data.detail_Applicant_job,
            BEDNR: data.detail_TrackingNumber_job,
            SAKTO: data.detail_GL_job,
            KOSTL: data.detail_CostCenter_job,
            AUFNR: data.detail_Orderioco_job,
            PREIS: data.detail_price_job,
            WAERS: data.detail_CURR_job,
            PEINH: data.detail_Priceperunit_job,
            TEXT_LINE: data.detail_TEXTLINE_job,
          });
        });
        res.send({
          data_api,
        });
      }
    }
  );
});

app.get("/export_to_sap_api_2/:id", (req, res) => {
  let job_run_id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" +
      job_run_id +
      "' order by detail_itempr_job ASC",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_api = [];

        result.forEach((data) => {
          data_api.push({
            BSART: data.detail_Prtype_job,
            BNFPO: data.detail_itempr_job,
            KNTTP: data.detail_ACCT_job,
            MATNR: data.detail_material_job,
            TXZ01: data.detail_list_job,
            MENGE: data.detail_qty_job,
            MEINS: data.detail_unit_job,
            MATKL: data.detail_MatGroup_job,
            WERKS: data.detail_factory_job,
            AFNAM: data.detail_Applicant_job,
            BEDNR: data.detail_TrackingNumber_job,
            SAKTO: data.detail_GL_job,
            KOSTL: data.detail_CostCenter_job,
            AUFNR: data.detail_Orderioco_job,
            PREIS: data.detail_price_job,
            WAERS: data.detail_CURR_job,
            PEINH: data.detail_Priceperunit_job,
            TEXT_LINE: data.detail_TEXTLINE_job,
          });
        });

        res.json(data_api);
        res.end();
      }
    }
  );
});

app.get("/copy_file", (req, res) => {
  let d = new Date();
  let new_y = d.getFullYear();
  let new_m = d.getMonth();
  let new_d = d.getDate();
  let new_h = d.getHours();
  let new_mi = d.getMinutes();
  let new_s = d.getSeconds();
  console.log(new_d);
  var oldPath = "./public/text_file/102000000025.txt";
  var newPath =
    "./public/text_file_backup/102000000025_" +
    new_d +
    new_m +
    new_y +
    "_" +
    new_h +
    new_mi +
    new_s +
    ".txt";
  console.log(newPath);
  fs.readFile(newPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });
    } else {
      console.log("มีไฟล์แล้วให้ +1");
    }
  });
});

app.get("/test_txt", (req, res) => {
  const content = "Some content!";
  fs.writeFile("./public/excel/test.txt", content, (err) => {});
});

app.get("/cre_txt", (req, res) => {
  const writeStream = fs.createWriteStream(`./public/text_file/test.txt`);
  const pathName = writeStream.path;

  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '64' order by detail_itempr_job ASC",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_array = [];
        result.forEach((data) => {
          data_array.push(
            data.detail_Prtype_job,
            "\t",
            data.detail_itempr_job,
            "\t",
            data.detail_ACCT_job,
            "\t",
            data.detail_material_job,
            "\t",
            data.detail_list_job,
            "\t",
            data.detail_qty_job,
            "\t",
            data.detail_unit_job,
            "\t",
            data.detail_MatGroup_job,
            "\t",
            data.detail_factory_job,
            "\t",
            data.detail_Applicant_job,
            "\t",
            data.detail_TrackingNumber_job,
            "\t",
            data.detail_GL_job,
            "\t",
            data.detail_CostCenter_job,
            "\t",
            data.detail_Orderioco_job,
            "\t",
            data.detail_price_job,
            "\t",
            data.detail_CURR_job,
            "\t",
            data.detail_Priceperunit_job,
            "\t",
            data.detail_TEXTLINE_job,
            "\n"
          );
        });

        data_array.forEach((value) => writeStream.write(`${value}`));
        writeStream.on("finish", () => {
          console.log(`wrote all the array data to file ${pathName}`);
        });

        // handle the errors on the write process
        writeStream.on("error", (err) => {
          console.error(
            `There is an error writing the file ${pathName} => ${err}`
          );
        });

        // close the stream
        writeStream.end();
      }
    }
  );
});

app.get("/load_txt", (req, res) => {
  let file = "./public/text_file/102000000024.txt";
  res.download(file);
});

//load excel

app.get("/excel_js/:id", (req, res) => {
  let job_run_id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" + job_run_id + "' ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let filename = result[0].detail_Orderioco_job;
        const file = "./public/excel/" + filename + ".xlsx";
        res.download(file); // Set disposition and send it.
      }
    }
  );
});

app.post("/post_approve", (req, res) => {
  let coio = req.body.coio;
  let date_approve = req.body.date_approve;
  let job_run_id = req.body.job_run_id;

  let approve =
    "UPDATE budget_main_job SET `status` = 'Approve' ,  `date_status` = '" +
    date_approve +
    "' , `AUFNR` = '" +
    coio +
    "' WHERE job_run_id = '" +
    job_run_id +
    "' ";
  let update_detail_Orderioco_job =
    " UPDATE budget_detail_job SET detail_Orderioco_job = '" +
    coio +
    "' WHERE job_run_id = '" +
    job_run_id +
    "' ";
  if (coio === "" || date_approve === "") {
    res.send({
      message: "กรุณากรอกข้อมูลให้ครบ",
    });
  } else {
    db.query(approve, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(update_detail_Orderioco_job, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            db.query(
              "SELECT * FROM budget_detail_job where job_run_id = '" +
                job_run_id +
                "' order by detail_itempr_job ASC",
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  const Excel = require("exceljs");
                  async function exTest() {
                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet("My Sheet");
                    worksheet.columns = [
                      { header: "Prtype", key: "Prtype", width: 10 },
                      { header: "itempr", key: "itempr", width: 10 },
                      { header: "ACCT", key: "ACCT", width: 10 },
                      { header: "material", key: "material", width: 30 },
                      { header: "list", key: "list", width: 30 },
                      { header: "qty", key: "qty", width: 20 },
                      { header: "unit", key: "unit", width: 20 },
                      { header: "Matgroup", key: "Matgroup", width: 20 },
                      { header: "factory", key: "factory", width: 20 },
                      { header: "Applicant", key: "Applicant", width: 20 },
                      {
                        header: "TrackingNumber",
                        key: "TrackingNumber",
                        width: 20,
                      },
                      { header: "GL", key: "GL", width: 20 },
                      { header: "CostCenter", key: "CostCenter", width: 20 },
                      { header: "OrderIoco", key: "Orderioco", width: 20 },
                      { header: "price", key: "price", width: 20 },
                      { header: "curr", key: "CURR", width: 20 },
                      {
                        header: "Priceperunit",
                        key: "Priceperunit",
                        width: 20,
                      },
                      { header: "Textline", key: "TEXTLINE", width: 20 },
                    ];

                    result.forEach((data) => {
                      worksheet.addRow({
                        Prtype: data.detail_Prtype_job,
                        itempr: data.detail_itempr_job,
                        ACCT: data.detail_ACCT_job,
                        material: data.detail_material_job,
                        list: data.detail_list_job,
                        qty: data.detail_qty_job,
                        unit: data.detail_unit_job,
                        Matgroup: data.detail_MatGroup_job,
                        factory: data.detail_factory_job,
                        Applicant: data.detail_Applicant_job,
                        TrackingNumber: data.detail_TrackingNumber_job,
                        GL: data.detail_GL_job,
                        CostCenter: data.detail_CostCenter_job,
                        Orderioco: data.detail_Orderioco_job,
                        price: data.detail_price_job,
                        CURR: data.detail_CURR_job,
                        Priceperunit: data.detail_Priceperunit_job,
                        TEXTLINE: data.detail_TEXTLINE_job,
                      });
                    });
                    // save under export.xlsx

                    let text_name = coio;
                    await workbook.xlsx.writeFile(
                      "./public/excel/" + text_name + ".xlsx"
                    );

                    // load a copy of export.xlsx
                    const newWorkbook = new Excel.Workbook();
                    await newWorkbook.xlsx.readFile(
                      "./public/excel/" + text_name + ".xlsx"
                    );

                    console.log("File is written");
                  }

                  exTest();

                  const writeStream = fs.createWriteStream(
                    `./public/text_file/${coio}_${job_run_id}.txt`
                  );
                  const pathName = writeStream.path;
                  let data_array = [];
                  result.forEach((data) => {
                    data_array.push(
                      data.detail_Prtype_job,
                      "\t",
                      data.detail_itempr_job,
                      "\t",
                      data.detail_ACCT_job,
                      "\t",
                      data.detail_material_job,
                      "\t",
                      data.detail_list_job,
                      "\t",
                      data.detail_qty_job,
                      "\t",
                      data.detail_unit_job,
                      "\t",
                      data.detail_MatGroup_job,
                      "\t",
                      data.detail_factory_job,
                      "\t",
                      data.detail_Applicant_job,
                      "\t",
                      data.detail_TrackingNumber_job,
                      "\t",
                      data.detail_GL_job,
                      "\t",
                      data.detail_CostCenter_job,
                      "\t",
                      data.detail_Orderioco_job,
                      "\t",
                      data.detail_price_job,
                      "\t",
                      data.detail_CURR_job,
                      "\t",
                      data.detail_Priceperunit_job,
                      "\t",
                      data.detail_TEXTLINE_job,
                      "\n"
                    );
                  });

                  data_array.forEach((value) => writeStream.write(`${value}`));
                  writeStream.on("finish", () => {
                    console.log(`wrote all the array data to file ${pathName}`);
                  });

                  // handle the errors on the write process
                  writeStream.on("error", (err) => {
                    console.error(
                      `There is an error writing the file ${pathName} => ${err}`
                    );
                  });

                  // close the stream
                  writeStream.end();
                }
              }
            );
            res.send({
              status: "success",
              message: "Approve Budget Success",
            });
          }
        });
      }
    });
  }
});

app.post("/post_approve_budget", (req, res) => {
  let coio = req.body.coio;
  let date_approve = req.body.date_approve;
  let budget_run_id = req.body.budget_run_id;

  let approve =
    "UPDATE budget_main SET `status` = 'Approve' ,  `date_status` = '" +
    date_approve +
    "' , `AUFNR` = '" +
    coio +
    "' WHERE budget_run_id = '" +
    budget_run_id +
    "' ";
  let update_detail_Orderioco =
    " UPDATE budget_detail SET detail_Orderioco = '" +
    coio +
    "' WHERE budget_run_id = '" +
    budget_run_id +
    "' ";
  if (coio === "" || date_approve === "") {
    res.send({
      message: "กรุณากรอกข้อมูลให้ครบ",
    });
  } else {
    db.query(approve, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(update_detail_Orderioco, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            db.query(
              "SELECT * FROM budget_detail where budget_run_id = '" +
                budget_run_id +
                "' order by detail_itempr ASC",
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  const Excel = require("exceljs");
                  async function exTest() {
                    const workbook = new Excel.Workbook();
                    const worksheet = workbook.addWorksheet("My Sheet");
                    worksheet.columns = [
                      { header: "Prtype", key: "Prtype", width: 10 },
                      { header: "itempr", key: "itempr", width: 10 },
                      { header: "ACCT", key: "ACCT", width: 10 },
                      { header: "material", key: "material", width: 30 },
                      { header: "list", key: "list", width: 30 },
                      { header: "qty", key: "qty", width: 20 },
                      { header: "unit", key: "unit", width: 20 },
                      { header: "Matgroup", key: "Matgroup", width: 20 },
                      { header: "factory", key: "factory", width: 20 },
                      { header: "Applicant", key: "Applicant", width: 20 },
                      {
                        header: "TrackingNumber",
                        key: "TrackingNumber",
                        width: 20,
                      },
                      { header: "GL", key: "GL", width: 20 },
                      { header: "CostCenter", key: "CostCenter", width: 20 },
                      { header: "OrderIoco", key: "Orderioco", width: 20 },
                      { header: "price", key: "price", width: 20 },
                      { header: "curr", key: "CURR", width: 20 },
                      {
                        header: "Priceperunit",
                        key: "Priceperunit",
                        width: 20,
                      },
                      { header: "Textline", key: "TEXTLINE", width: 20 },
                    ];

                    result.forEach((data) => {
                      worksheet.addRow({
                        Prtype: data.detail_Prtype,
                        itempr: data.detail_itempr,
                        ACCT: data.detail_ACCT,
                        material: data.detail_material,
                        list: data.detail_list,
                        qty: data.detail_qty,
                        unit: data.detail_unit,
                        Matgroup: data.detail_MatGroup,
                        factory: data.detail_factory,
                        Applicant: data.detail_Applicant,
                        TrackingNumber: data.detail_TrackingNumber,
                        GL: data.detail_GL,
                        CostCenter: data.detail_CostCenter,
                        Orderioco: data.detail_Orderioco,
                        price: data.detail_price,
                        CURR: data.detail_CURR,
                        Priceperunit: data.detail_Priceperunit,
                        TEXTLINE: data.detail_TEXTLINE,
                      });
                    });
                    // save under export.xlsx
                    console.log(coio);
                    let text_name = coio;
                    await workbook.xlsx.writeFile(
                      "./public/excel/" + text_name + ".xlsx"
                    );

                    // // load a copy of export.xlsx
                    // const newWorkbook = new Excel.Workbook();
                    // await newWorkbook.xlsx.readFile('./public/excel/' + text_name + ".xlsx");

                    console.log("File is written");
                  }

                  exTest();

                  const writeStream = fs.createWriteStream(
                    `./public/text_file/${coio}.txt`
                  );
                  const pathName = writeStream.path;
                  let data_array = [];
                  result.forEach((data) => {
                    data_array.push(
                      data.detail_Prtype,
                      "\t",
                      data.detail_itempr,
                      "\t",
                      data.detail_ACCT,
                      "\t",
                      data.detail_material,
                      "\t",
                      data.detail_list,
                      "\t",
                      data.detail_qty,
                      "\t",
                      data.detail_unit,
                      "\t",
                      data.detail_MatGroup,
                      "\t",
                      data.detail_factory,
                      "\t",
                      data.detail_Applicant,
                      "\t",
                      data.detail_TrackingNumber,
                      "\t",
                      data.detail_GL,
                      "\t",
                      data.detail_CostCenter,
                      "\t",
                      data.detail_Orderioco,
                      "\t",
                      data.detail_price,
                      "\t",
                      data.detail_CURR,
                      "\t",
                      data.detail_Priceperunit,
                      "\t",
                      data.detail_TEXTLINE,
                      "\n"
                    );
                  });

                  data_array.forEach((value) => writeStream.write(`${value}`));
                  writeStream.on("finish", () => {
                    console.log(`wrote all the array data to file ${pathName}`);
                  });

                  // handle the errors on the write process
                  writeStream.on("error", (err) => {
                    console.error(
                      `There is an error writing the file ${pathName} => ${err}`
                    );
                  });

                  // close the stream
                  writeStream.end();
                }
              }
            );
            res.send({
              status: "success",
              message: "Approve Budget Success",
            });
          }
        });
      }
    });
  }
});

/// Add Detail Budget
app.post("/post_add_detail", (req, res) => {
  let inputList = req.body.inputList;
  let budget_run_id = req.body.budget_run_id;
  let sum = 0;
  let project_price = req.body.budget_project_price;
  let factory = req.body.factory;
  let prtype = req.body.prtype;
  let detail_Orderioco = "wait";
  let department = req.body.department.slice(1, -1);
  let project_name = req.body.project_name;
  let filter_1 = inputList.filter((data) => {
    return data.detail_sum !== 0 && data.detail_list !== "";
  });

  filter_1.forEach((data) => {
    sum += data.detail_sum;
  });

  filter_1.forEach((data, key) => {
    db.query(
      "SELECT * FROM `budget_detail`  where budget_run_id = '" +
        budget_run_id +
        "' ORDER BY detail_itempr DESC ",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let item_po = 1;

          if (result.length === 0) {
            item_po = +(key + 1);
          } else {
            item_po = +result[0].detail_itempr + (key + 1);
          }

          db.query(
            "INSERT INTO budget_detail (detail_month,budget_run_id,detail_list,detail_price,detail_qty,detail_sum,detail_unit,detail_ACCT,detail_CURR,detail_Priceperunit,detail_material,detail_GL,detail_MatGroup,detail_itempr,detail_Prtype,detail_factory,detail_Orderioco,detail_Applicant,detail_TrackingNumber,detail_CostCenter,detail_TEXTLINE,detail_unit_label,detail_CURR_label,detail_GL_label,detail_MatGroup_label,detail_CostCenter_label) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              data.detail_month,
              budget_run_id,
              data.detail_list,
              data.detail_price,
              data.detail_qty,
              data.detail_sum,
              data.detail_unit,
              data.detail_ACCT,
              data.detail_CURR,
              data.detail_Priceperunit,
              data.detail_material,
              data.detail_GL,
              data.detail_MatGroup,
              item_po,
              prtype,
              factory,
              detail_Orderioco,
              department,
              department,
              data.detail_CostCenter,
              project_name,
              data.detail_unit_label,
              data.detail_CURR_label,
              data.detail_GL_label,
              data.detail_MatGroup_label,
              data.detail_CostCenter_label,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
              }
            }
          );
        }
      }
    );
  });

  // let sum = 0;
  console.log(sum);

  let sum_price = +sum + +project_price;
  console.log(sum_price);
  let approve =
    "UPDATE budget_main SET `budget_project_price`  = '" +
    sum_price +
    "' WHERE budget_run_id = '" +
    budget_run_id +
    "' ";

  db.query(approve, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: "success",
        message: "Approve Budget Success",
      });
    }
  });
});

/// Add Detail job
app.post("/post_add_detail_job", (req, res) => {
  let inputList = req.body.inputList;
  let job_run_id = req.body.job_run_id;
  let sum = 0;
  let project_price = req.body.job_project_price;
  let factory = req.body.factory;
  let prtype_job_sap = req.body.prtype;
  let detail_Orderioco_job = "wait";
  let department = req.body.department.slice(1, -1);
  let project_name = req.body.job_project_name;

  let filter_1 = inputList.filter((data) => {
    return data.detail_sum_job !== 0 && data.detail_list_job !== "";
  });

  filter_1.forEach((data) => {
    sum += data.detail_sum_job;
  });

  filter_1.forEach((data, key) => {
    db.query(
      "SELECT * FROM `budget_detail_job`  where job_run_id = '" +
        job_run_id +
        "' ORDER BY detail_itempr_job DESC ",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let item_po = 1;

          if (result.length === 0) {
            item_po = +(key + 1);
          } else {
            item_po = +result[0].detail_itempr_job + (key + 1);
          }

          db.query(
            "INSERT INTO budget_detail_job (job_run_id,detail_list_job,detail_price_job,detail_qty_job,detail_sum_job,detail_unit_job,detail_ACCT_job,detail_CURR_job,detail_Priceperunit_job,detail_material_job,detail_GL_job,detail_MatGroup_job,detail_itempr_job,detail_Prtype_job,detail_factory_job,detail_Orderioco_job,detail_Applicant_job,detail_TrackingNumber_job,detail_CostCenter_job,detail_TEXTLINE_job,detail_unit_label,detail_CURR_label,detail_GL_label,detail_MatGroup_label,detail_CostCenter_label) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              job_run_id,
              data.detail_list_job,
              data.detail_price_job,
              data.detail_qty_job,
              data.detail_sum_job,
              data.detail_unit_job,
              data.detail_ACCT_job,
              data.detail_CURR_job,
              data.detail_Priceperunit_job,
              data.detail_material_job,
              data.detail_GL_job,
              data.detail_MatGroup_job,
              item_po,
              prtype_job_sap,
              factory,
              detail_Orderioco_job,
              department,
              department,
              data.detail_CostCenter_job,
              project_name,
              data.detail_unit_label,
              data.detail_CURR_label,
              data.detail_GL_label,
              data.detail_MatGroup_label,
              data.detail_CostCenter_label,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
              }
            }
          );
        }
      }
    );
  });

  // let sum = 0;
  console.log(sum);

  let sum_price = +sum + +project_price;
  console.log(sum_price);
  let approve =
    "UPDATE budget_main_job SET `job_project_price`  = '" +
    sum_price +
    "' WHERE job_run_id = '" +
    job_run_id +
    "' ";

  db.query(approve, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: "success",
        message: "Approve Budget Success",
      });
    }
  });
});

///=================== EDIT Budget ============================
app.post("/post_edit_detail", (req, res) => {
  let budget_run_id = req.body.budget_run_id;
  let detail_run_id = req.body.detail_run_id;
  let detail_list = req.body.detail_list;
  let detail_qty = req.body.detail_qty;
  let detail_price = req.body.detail_price;
  let detail_sum = req.body.detail_sum;
  let detail_Priceperunit = req.body.detail_Priceperunit;
  let detail_ACCT = req.body.detail_ACCT;
  let detail_material = req.body.detail_material;

  let detail_unit = req.body.detail_unit;
  let detail_CURR = req.body.detail_CURR;
  let detail_GL = req.body.detail_GL;
  let detail_MatGroup = req.body.detail_MatGroup;
  let detail_CostCenter = req.body.detail_CostCenter;

  let detail_unit_label = req.body.detail_unit_label;
  let detail_CURR_label = req.body.detail_CURR_label;
  let detail_GL_label = req.body.detail_GL_label;
  let detail_MatGroup_label = req.body.detail_MatGroup_label;
  let detail_CostCenter_label = req.body.detail_CostCenter_label;

  let ole_price = req.body.ole_price;
  let new_sum = detail_qty * detail_price;
  let newprice = ole_price - detail_sum + new_sum;
  let detail_month = req.body.detail_month;
  let update =
    "UPDATE budget_detail SET detail_month = '" +
    detail_month +
    "' ,  `detail_list`  = '" +
    detail_list +
    "' ,  `detail_qty`  = '" +
    detail_qty +
    "' ,  `detail_price`  = '" +
    detail_price +
    "' ,  `detail_sum`  = '" +
    new_sum +
    "' ,  `detail_Priceperunit`  = '" +
    detail_Priceperunit +
    "' , `detail_ACCT`  = '" +
    detail_ACCT +
    "' ,`detail_material`  = '" +
    detail_material +
    "' ,`detail_unit`  = '" +
    detail_unit +
    "' ,`detail_CURR`  = '" +
    detail_CURR +
    "' , `detail_GL`  = '" +
    detail_GL +
    "' , `detail_MatGroup`  = '" +
    detail_MatGroup +
    "' , `detail_CostCenter`  = '" +
    detail_CostCenter +
    "' , `detail_unit_label`  = '" +
    detail_unit_label +
    "' , `detail_CURR_label`  = '" +
    detail_CURR_label +
    "' ,  `detail_GL_label`  = '" +
    detail_GL_label +
    "' ,  `detail_MatGroup_label`  = '" +
    detail_MatGroup_label +
    "' ,`detail_CostCenter_label`  = '" +
    detail_CostCenter_label +
    "' WHERE  detail_run_id = '" +
    detail_run_id +
    "' ";

  let update_main =
    "UPDATE budget_main SET `budget_project_price`  = '" +
    newprice +
    "' WHERE  budget_run_id = '" +
    budget_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(update_main, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            status: "success",
            message: "Update Budget Success",
          });
        }
      });
    }
  });
});

///=================== EDIT Job ============================
app.post("/post_edit_detail_job", (req, res) => {
  let job_run_id = req.body.job_run_id;
  let detail_run_id_job = req.body.detail_run_id_job;
  let detail_list_job = req.body.detail_list_job;
  let detail_qty_job = req.body.detail_qty_job;
  let detail_price_job = req.body.detail_price_job;
  let detail_sum_job = req.body.detail_sum_job;
  let detail_Priceperunit_job = req.body.detail_Priceperunit_job;
  let detail_ACCT_job = req.body.detail_ACCT_job;
  let detail_material_job = req.body.detail_material_job;

  let detail_unit_job = req.body.detail_unit_job;
  let detail_CURR_job = req.body.detail_CURR_job;
  let detail_GL_job = req.body.detail_GL_job;
  let detail_MatGroup_job = req.body.detail_MatGroup_job;
  let detail_CostCenter_job = req.body.detail_CostCenter_job;

  let detail_unit_label = req.body.detail_unit_label;
  let detail_CURR_label = req.body.detail_CURR_label;
  let detail_GL_label = req.body.detail_GL_label;
  let detail_MatGroup_label = req.body.detail_MatGroup_label;
  let detail_CostCenter_label = req.body.detail_CostCenter_label;

  let ole_price = req.body.ole_price;
  let new_sum = detail_qty_job * detail_price_job;
  let newprice = ole_price - detail_sum_job + new_sum;

  let update =
    "UPDATE budget_detail_job SET `detail_list_job`  = '" +
    detail_list_job +
    "' ,  `detail_qty_job`  = '" +
    detail_qty_job +
    "' ,  `detail_price_job`  = '" +
    detail_price_job +
    "' ,  `detail_sum_job`  = '" +
    new_sum +
    "' ,  `detail_Priceperunit_job`  = '" +
    detail_Priceperunit_job +
    "' , `detail_ACCT_job`  = '" +
    detail_ACCT_job +
    "' ,`detail_material_job`  = '" +
    detail_material_job +
    "' ,`detail_unit_job`  = '" +
    detail_unit_job +
    "' ,`detail_CURR_job`  = '" +
    detail_CURR_job +
    "' , `detail_GL_job`  = '" +
    detail_GL_job +
    "' , `detail_MatGroup_job`  = '" +
    detail_MatGroup_job +
    "' , `detail_CostCenter_job`  = '" +
    detail_CostCenter_job +
    "' , `detail_unit_label`  = '" +
    detail_unit_label +
    "' , `detail_CURR_label`  = '" +
    detail_CURR_label +
    "' ,  `detail_GL_label`  = '" +
    detail_GL_label +
    "' ,  `detail_MatGroup_label`  = '" +
    detail_MatGroup_label +
    "' ,`detail_CostCenter_label`  = '" +
    detail_CostCenter_label +
    "' WHERE  detail_run_id_job = '" +
    detail_run_id_job +
    "' ";

  let update_main =
    "UPDATE budget_main_job SET `job_project_price`  = '" +
    newprice +
    "' WHERE  job_run_id = '" +
    job_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(update_main, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            status: "success",
            message: "Update Budget Success",
          });
        }
      });
    }
  });
});

///=================== delete ============================
app.post("/post_delete_detail_job", (req, res) => {
  let detail_run_id_job = req.body.detail_run_id_job;
  let detail_sum_job = req.body.detail_sum_job;
  let job_run_id = req.body.job_run_id;
  let delete_detail =
    "DELETE FROM budget_detail_job WHERE detail_run_id_job = '" +
    detail_run_id_job +
    "'";
  db.query(delete_detail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "select * from budget_main_job where job_run_id = '" + job_run_id + "'",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            let project_price = result[0].job_project_price;
            let sum_price = project_price - detail_sum_job;
            let update =
              "UPDATE budget_main_job SET `job_project_price`  = '" +
              sum_price +
              "' WHERE  job_run_id = '" +
              job_run_id +
              "' ";
            db.query(update, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "select * from budget_detail_job where job_run_id = '" +
                    job_run_id +
                    "' order by detail_itempr_job ASC",
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      result.forEach((data, key) => {
                        db.query(
                          "UPDATE budget_detail_job SET `detail_itempr_job`  = '" +
                            key +
                            1 +
                            "' WHERE  job_run_id = '" +
                            job_run_id +
                            "'  order by detail_run_id_job ASC ",
                          (err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                              db.query(
                                "select * from budget_detail_job where job_run_id = '" +
                                  job_run_id +
                                  "' order by detail_itempr_job ASC",
                                (err, result) => {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    if (result.length !== 0) {
                                      let detail_id = [];
                                      result.forEach((data, key) => {
                                        detail_id.push(data.detail_run_id_job);
                                      });
                                      detail_id.forEach((data, key) => {
                                        console.log(data);
                                        console.log(key + 1);
                                        let item = key + 1;
                                        db.query(
                                          "UPDATE budget_detail_job SET `detail_itempr_job`  = '" +
                                            item +
                                            "' WHERE  detail_run_id_job = '" +
                                            data +
                                            "'   ",
                                          (err, result) => {
                                            if (err) {
                                              console.log(err);
                                            } else {
                                            }
                                          }
                                        );
                                      });
                                    }
                                  }
                                }
                              );
                            }
                          }
                        );
                      });
                      res.send({
                        status: "success",
                        message: "Delete Budget Success",
                      });
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
});

app.post("/post_sig_mg", (req, res) => {
  let mg_sig = req.body.mg_sig;
  let job_run_id = req.body.job_run_id;
  let update =
    "UPDATE budget_main_job SET  `status`  = 'mg_success' , `mg_sig`  = '" +
    mg_sig +
    "' , `mg_sigdate`  = NOW() WHERE  job_run_id = '" +
    job_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client + job_run_id);
    }
  });
});

app.post("/post_sig_dr", (req, res) => {
  let dr_sig = req.body.dr_sig;
  let job_run_id = req.body.job_run_id;
  let update =
    "UPDATE budget_main_job SET  `status`  = 'dr_success' , `dr_sig`  = '" +
    dr_sig +
    "' , `dr_sigdate`  = NOW() WHERE  job_run_id = '" +
    job_run_id +
    "' ";
  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client + job_run_id);
    }
  });
});

app.post("/post_sig_AMD", (req, res) => {
  let AMD_sig = req.body.AMD_sig;
  let job_run_id = req.body.job_run_id;
  let update =
    "UPDATE budget_main_job SET  `status`  = 'AMD_success' , `AMD_sig`  = '" +
    AMD_sig +
    "' , `AMD_date`  = NOW() WHERE  job_run_id = '" +
    job_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client + job_run_id);
    }
  });
});
app.post("/post_sig_AMD2", (req, res) => {
  let AMD2_sig = req.body.AMD2_sig;
  let job_run_id = req.body.job_run_id;
  let update =
    "UPDATE budget_main_job SET  `status`  = 'AMD2_success' , `AMD2_sig`  = '" +
    AMD2_sig +
    "' , `AMD2_date`  = NOW() WHERE  job_run_id = '" +
    job_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client + job_run_id);
    }
  });
});

app.post("/post_sig_MD", (req, res) => {
  let MD_sig = req.body.MD_sig;
  let job_run_id = req.body.job_run_id;
  let update =
    "UPDATE budget_main_job SET  `status`  = 'MD_success' , `MD_sig`  = '" +
    MD_sig +
    "' , `MD_date`  = NOW() WHERE  job_run_id = '" +
    job_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client + job_run_id);
    }
  });
});

// app.post("/update_budget_plan", async (req, res) => {
//   let plan_run_id = req.body.plan_run_id;
//   let plan_list = req.body.plan_list_edit;
//   let inputList = req.body.inputList;
//   let budget_run_id = req.body.budget_run_id;
//   let new_detail_price = 0;
//   let plan_price = req.body.plan_price;

//   let filter_1 = await inputList.filter((data) => {
//     return data.detail_list != "-" || data.detail_price != 0;
//   });

//   await filter_1.forEach(
//     (data_1) => (new_detail_price += +data_1.detail_price)
//   );
//   let new_price = plan_price + new_detail_price;
//   let update =
//     "UPDATE budget_plan SET  `plan_list`  = '" +
//     plan_list +
//     "' , plan_price = '" +
//     new_price +
//     "' WHERE  plan_run_id = '" +
//     plan_run_id +
//     "' ";

//   await db.query(update, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("result1");
//       db.query(
//         "SELECT * FROM budget_main where budget_run_id = '" +
//           budget_run_id +
//           "'",
//         (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("result2");
//             let budget_project_price = result[0].budget_project_price;
//             let new_budget_project_price =
//               +budget_project_price + new_detail_price;
//             let update_main =
//               "UPDATE budget_main SET  `budget_project_price`  = '" +
//               new_budget_project_price +
//               "' where  budget_run_id = '" +
//               budget_run_id +
//               "'";
//             db.query(update_main, (err, result) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log("result3");
//                 db.query(
//                   "SELECT * FROM budget_plan where plan_run_id = '" +
//                     plan_run_id +
//                     "'",
//                   (err, result) => {
//                     if (err) {
//                       console.log(err);
//                     } else {
//                       console.log("result4");
//                       console.log(filter_1.length);
//                       let plan_month = result[0].plan_month;
//                       if (filter_1.length === 0) {
//                         res.send({
//                           status: "success",
//                           message: "Update Budget Success",
//                           budget_run_id: budget_run_id,
//                         });
//                       } else {
//                         function run_1() {
//                           filter_1.forEach((data) =>
//                             db.query(
//                               "INSERT INTO budget_detail (detail_list , detail_price ,detail_month , plan_run_id ,  budget_run_id) VALUES (?,?,?,?,?)",
//                               [
//                                 data.detail_list,
//                                 data.detail_price,
//                                 plan_month,
//                                 plan_run_id,
//                                 budget_run_id,
//                               ],
//                               (err, result) => {
//                                 if (err) {
//                                   console.log(err);
//                                 } else {
//                                 }
//                               }
//                             )
//                           );
//                         }

//                         function render_res() {
//                           res.send({
//                             status: "success",
//                             message: "Update Budget Success",
//                             budget_run_id: budget_run_id,
//                           });
//                         }
//                         async function run() {
//                           await run_1();
//                           await render_res();
//                         }

//                         run();
//                       }
//                     }
//                   }
//                 );
//               }
//             });
//           }
//         }
//       );
//     }
//   });
// });

// app.post("/delete_budget_detail", (req, res) => {
//   let detail_run_id = req.body.detail_run_id;
//   let detail_price = req.body.detail_price;
//   let plan_run_id = req.body.plan_run_id;
//   let plan_price = req.body.plan_price;
//   let new_price = plan_price - detail_price;
//   let budget_run_id = req.body.budget_run_id;
//   console.log(plan_run_id);
//   console.log(detail_run_id);
//   console.log(detail_price);
//   console.log(plan_price);
//   console.log(new_price);
//   console.log(budget_run_id);

//   let update =
//     "UPDATE budget_plan SET  `plan_price`  = '" +
//     new_price +
//     "'  WHERE plan_run_id = '" +
//     plan_run_id +
//     "' ";
//   let delete_data =
//     "DELETE FROM budget_detail where detail_run_id = '" + detail_run_id + "' ";

//   db.query(update, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       db.query(delete_data, (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           db.query(
//             "SELECT * FROM budget_main WHERE budget_run_id = '" +
//               budget_run_id +
//               "' ",
//             (err, result) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 let budget_project_price = result[0].budget_project_price;
//                 let new_budget_price = budget_project_price - detail_price;
//                 console.log("ยอดใหม่ : " + new_budget_price);
//                 let update_budget =
//                   "UPDATE budget_main SET  `budget_project_price`  = '" +
//                   new_budget_price +
//                   "'  WHERE budget_run_id = '" +
//                   budget_run_id +
//                   "'  ";
//                 db.query(update_budget, (err, result) => {
//                   if (err) {
//                     console.log(err);
//                   } else {
//                     res.send({
//                       status: "success",
//                       message: "Update Budget Success",
//                     });
//                   }
//                 });
//               }
//             }
//           );
//         }
//       });
//     }
//   });
// });

app.post("/post_sig_plan_mg", (req, res) => {
  let budget_run_id = req.body.budget_run_id;
  let mg_sig = req.body.mg_sig;
  if (mg_sig === "nosig") {
  } else {
    let update =
      "UPDATE budget_main SET  `status`  = 'mg_success' , `mg_sig`  = '" +
      mg_sig +
      "' , `mg_sigdate`  = NOW() WHERE  budget_run_id = '" +
      budget_run_id +
      "' ";
    db.query(update, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect(client_2 + budget_run_id);
      }
    });
  }
});

app.post("/post_sig_plan_dr", (req, res) => {
  let budget_run_id = req.body.budget_run_id;
  let dr_sig = req.body.dr_sig;
  if (dr_sig === "nosig") {
  } else {
    let update =
      "UPDATE budget_main SET  `status`  = 'dr_success' , `dr_sig`  = '" +
      dr_sig +
      "' , `dr_sigdate`  = NOW() WHERE  budget_run_id = '" +
      budget_run_id +
      "' ";

    db.query(update, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect(client_2 + budget_run_id);
      }
    });
  }
});

app.post("/post_sig_plan_AMD", (req, res) => {
  let AMD_sig = req.body.AMD_sig;
  let budget_run_id = req.body.budget_run_id;
  let update =
    "UPDATE budget_main SET  `status`  = 'AMD_success' , `AMD_sig`  = '" +
    AMD_sig +
    "' , `AMD_date`  = NOW() WHERE  budget_run_id = '" +
    budget_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client_2 + budget_run_id);
    }
  });
});

app.post("/post_sig_plan_AMD2", (req, res) => {
  let AMD2_sig = req.body.AMD2_sig;
  let budget_run_id = req.body.budget_run_id;
  let update =
    "UPDATE budget_main SET  `status`  = 'AMD2_success' , `AMD2_sig`  = '" +
    AMD2_sig +
    "' , `AMD2_date`  = NOW() WHERE  budget_run_id = '" +
    budget_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client_2 + budget_run_id);
    }
  });
});

app.post("/post_sig_plan_MD", (req, res) => {
  let MD_sig = req.body.MD_sig;
  let budget_run_id = req.body.budget_run_id;
  let update =
    "UPDATE budget_main SET  `status`  = 'MD_success' , `MD_sig`  = '" +
    MD_sig +
    "' , `MD_date`  = NOW() WHERE  budget_run_id = '" +
    budget_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(client_2 + budget_run_id);
    }
  });
});
///update_budget_header
app.post("/update_budget_header", (req, res) => {
  let learn_edit = req.body.learn_edit;
  let learn_copy_edit = req.body.learn_copy_edit;
  let budget_project_name_edit = req.body.budget_project_name_edit;
  let budget_date_request_edit = req.body.budget_date_request_edit;
  let detail_edit = req.body.detail_edit;
  let budget_run_id = req.body.budget_run_id;
  let prtype_edit = req.body.prtype_edit;
  let factory_edit = req.body.factory_edit;

  console.log(prtype_edit);
  console.log(factory_edit);
  let update =
    "UPDATE budget_main SET  factory = '" +
    factory_edit +
    "' ,pr_type = '" +
    prtype_edit +
    "' ,  `learn`  = '" +
    learn_edit +
    "' , `learn_copy`  = '" +
    learn_copy_edit +
    "' , `budget_project_name`  = '" +
    budget_project_name_edit +
    "' , budget_date_request = '" +
    budget_date_request_edit +
    "' , detail = '" +
    detail_edit +
    "' WHERE budget_run_id = '" +
    budget_run_id +
    "' ";

  let update_detail =
    "UPDATE budget_detail SET detail_factory = '" +
    factory_edit +
    "' , detail_Prtype ='" +
    prtype_edit +
    "'  , detail_TEXTLINE = '" +
    budget_project_name_edit +
    "'  WHERE budget_run_id = '" +
    budget_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(update_detail, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            status: "success",
            message: "Update Budget Success",
            budget_run_id: budget_run_id,
          });
        }
      });
    }
  });
});

///update_budget_job_header

app.post("/update_budget_job_header", (req, res) => {
  let learn_job_edit = req.body.learn_job_edit;
  let learn_job_copy_edit = req.body.learn_job_copy_edit;
  let job_project_name_edit = req.body.job_project_name_edit;
  let job_date_request_edit = req.body.job_date_request_edit;
  let detail_job_edit = req.body.detail_job_edit;
  let job_run_id = req.body.job_run_id;
  let job_time_edit = req.body.job_time_edit;
  let prtype_job_edit = req.body.prtype_job_edit;
  let factory_edit = req.body.factory_edit;

  console.log(prtype_job_edit);
  console.log(factory_edit);
  let update =
    "UPDATE budget_main_job SET  factory = '" +
    factory_edit +
    "' ,pr_type = '" +
    prtype_job_edit +
    "' , job_time = '" +
    job_time_edit +
    "' ,  `learn_job`  = '" +
    learn_job_edit +
    "' , `learn_job_copy`  = '" +
    learn_job_copy_edit +
    "' , `job_project_name`  = '" +
    job_project_name_edit +
    "' , job_date_request = '" +
    job_date_request_edit +
    "' , detail_job = '" +
    detail_job_edit +
    "' WHERE job_run_id = '" +
    job_run_id +
    "' ";

  let update_detail =
    "UPDATE budget_detail_job SET detail_factory_job = '" +
    factory_edit +
    "' , detail_Prtype_job ='" +
    prtype_job_edit +
    "'  , detail_TEXTLINE_job = '" +
    job_project_name_edit +
    "'  WHERE job_run_id = '" +
    job_run_id +
    "' ";

  db.query(update, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(update_detail, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            status: "success",
            message: "Update Budget Success",
            budget_run_id: job_run_id,
          });
        }
      });
    }
  });
});

app.post("/return_status_job", async (req, res) => {
  let job_run_id = req.body.job_run_id_return;

  function copy_file_text() {
    db.query(
      "SELECT * FROM budget_main_job where job_run_id = '" + job_run_id + "'",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result[0].AUFNR === "wait") {
            let name_txt = result[0].AUFNR + "_" + job_run_id + ".txt";
            var oldPath = "./public/text_file/" + name_txt;
            var newPath = "./public/text_file_backup/" + name_txt;
            console.log(newPath);
            fs.readFile(newPath, "utf8", (err, data) => {
              if (err) {
                console.log(err);
                fs.rename(oldPath, newPath, function (err) {
                  if (err) throw err;
                  console.log("Successfully renamed - AKA moved!");
                });
              } else {
                console.log("มีไฟล์แล้วให้ +1");
              }
            });
          }
        }
      }
    );
  }
  function Process_main_job() {
    let back_up =
      "INSERT INTO budget_main_job_backup (`job_run_id`, `job_project_name`, `job_project_price`, `job_date_request`, `detail_job_run_id`, `job_project_year`, `job_department`, `job_time`, `status`, `date_status`, `AUFNR`, `learn_job`, `learn_job_copy`, `detail_job`, `mg_sig`, `mg_sigdate`, `dr_sig`, `dr_sigdate`, `factory`, `pr_type`, `AMD_sig`, `AMD_date`, `AMD2_sig`, `AMD2_date`, `MD_sig`, `MD_date`, `assistant`) SELECT * from budget_main_job where job_run_id = '" +
      job_run_id +
      "' ";
    let back_up_detail =
      "INSERT INTO budget_detail_job_backup (`detail_run_id_job`, `detail_list_job`, `detail_price_job`, `job_run_id`, `detail_qty_job`, `detail_sum_job`, `detail_unit_job`, `detail_ACCT_job`, `detail_CURR_job`, `detail_Priceperunit_job`, `detail_material_job`, `detail_GL_job`, `detail_MatGroup_job`, `detail_itempr_job`, `detail_Prtype_job`, `detail_factory_job`, `detail_Orderioco_job`, `detail_Applicant_job`, `detail_TrackingNumber_job`, `detail_TEXTLINE_job`, `detail_CostCenter_job`, `detail_unit_label`, `detail_CURR_label`, `detail_GL_label`, `detail_MatGroup_label`, `detail_CostCenter_label`) SELECT * from budget_detail_job where job_run_id = '" +
      job_run_id +
      "'";
    let new_data =
      "INSERT INTO budget_main_job (`job_project_name`, `job_project_price`, `job_date_request`, `job_project_year`, `job_department`, `job_time`, `status`, `learn_job`, `learn_job_copy`, `detail_job`, `factory`, `pr_type`, `assistant`) SELECT `job_project_name`, `job_project_price`, `job_date_request`, `job_project_year`, `job_department`, `job_time`, `status`, `learn_job`, `learn_job_copy`, `detail_job`, `factory`, `pr_type`, `assistant` from budget_main_job where job_run_id = '" +
      job_run_id +
      "' ";
    let delete_data =
      "DELETE FROM `budget_main_job` WHERE  job_run_id = '" + job_run_id + "' ";

    db.query(back_up, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(back_up_detail, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success_detail");

            db.query(new_data, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                let id = result.insertId;
                // console.log(result.insertId);
                // console.log(result);
                let update_status =
                  "UPDATE budget_main_job SET status = 'wait' WHERE job_run_id = '" +
                  id +
                  "' ";
                let update_id_detail =
                  "UPDATE budget_detail_job SET job_run_id = '" +
                  id +
                  "' WHERE job_run_id = '" +
                  job_run_id +
                  "' ";
                db.query(update_status, (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    db.query(update_id_detail, (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        db.query(delete_data, (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            res.send({
                              status: "success",
                              message: "คืนค่าสำเร็จ",
                              job_run_id: job_run_id,
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  await copy_file_text();
  await Process_main_job();
});

app.get("/report_job_memo/:department", (req, res) => {
  let department = req.params.department;
  console.log(department);
  let select_data = "";
  if (department === "MD") {
    select_data =
      "SELECT * FROM `budget_main_job` where status = 'AMD2_success'  order by job_run_id DESC  ";
  } else if (department === "AMD") {
    select_data =
      "SELECT * FROM `budget_main_job` where assistant = '" +
      department +
      "' and status = 'dr_success' order by job_run_id DESC ";
  } else if (department === "AMD2") {
    select_data =
      "SELECT * FROM `budget_main_job` where status = 'AMD1_success' or status = 'dr_success' order by job_run_id DESC ";
  }

  db.query(select_data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let data_main = result;
      res.send({
        data_main_job: data_main,
      });
    }
  });
});
