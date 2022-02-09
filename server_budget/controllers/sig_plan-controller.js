/* eslint-disable no-undef */

const sig_plan_mg_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_main where budget_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send({
        //   budget_run_id: id,
        //   department: result[0].budget_department,
        // });
        res.render("sig_plan_mg", {
          budget_run_id: id,
          department: result[0].budget_department,
          learn: result[0].learn,
          learn_copy: result[0].learn_copy,
          project_name: result[0].budget_project_name,
          detail: result[0].detail,
          budget_time: result[0].budget_time,
          budget_project_year: result[0].budget_project_year,
          budget_project_price: result[0].budget_project_price,
        });
      }
    }
  );
};
module.exports.sig_plan_mg_page = sig_plan_mg_page;

const sig_plan_dr_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_main where budget_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send({
        //   budget_run_id: id,
        //   department: result[0].budget_department,
        // });
        res.render("sig_plan_dr", {
          budget_run_id: id,
          department: result[0].budget_department,
          learn: result[0].learn,
          learn_copy: result[0].learn_copy,
          project_name: result[0].budget_project_name,
          detail: result[0].detail,
          budget_time: result[0].budget_time,
          budget_project_year: result[0].budget_project_year,
          budget_project_price: result[0].budget_project_price,
        });
      }
    }
  );
};
module.exports.sig_plan_dr_page = sig_plan_dr_page;


const sig_plan_AMD_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_main where budget_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render("sig_plan_AMD", {
          budget_run_id : id,
          department : result[0].budget_department,
          learn : result[0].learn,
          learn_copy : result[0].learn_copy,
          project_name : result[0].budget_project_name,
          detail : result[0].detail,
          budget_time : result[0].budget_time,
          budget_project_year : result[0].budget_project_year,
          budget_project_price : result[0].budget_project_price,
        });
      }
    }
  );
};
module.exports.sig_plan_AMD_page = sig_plan_AMD_page;

const sig_plan_AMD2_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_main where budget_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render("sig_plan_AMD2", {
          budget_run_id : id,
          department : result[0].budget_department,
          learn : result[0].learn,
          learn_copy : result[0].learn_copy,
          project_name : result[0].budget_project_name,
          detail : result[0].detail,
          budget_time : result[0].budget_time,
          budget_project_year : result[0].budget_project_year,
          budget_project_price : result[0].budget_project_price,
        });
      }
    }
  );
};
module.exports.sig_plan_AMD2_page = sig_plan_AMD2_page;

const sig_plan_MD_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_main where budget_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render("sig_plan_MD", {
          budget_run_id : id,
          department : result[0].budget_department,
          learn : result[0].learn,
          learn_copy : result[0].learn_copy,
          project_name : result[0].budget_project_name,
          detail : result[0].detail,
          budget_time : result[0].budget_time,
          budget_project_year : result[0].budget_project_year,
          budget_project_price : result[0].budget_project_price,
        });
      }
    }
  );
};
module.exports.sig_plan_MD_page = sig_plan_MD_page;