/* eslint-disable no-undef */
//MG SIG
const sig_mg_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_all = result;
        db.query(
          "SELECT * FROM budget_main_job where job_run_id = '" + id + "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.render("sig_mg", {
                all_detail: data_all,
                job_run_id: id,
                department: result[0].job_department,
                learn_job: result[0].learn_job,
                learn_job_copy: result[0].learn_job_copy,
                project_name: result[0].job_project_name,
                detail_job: result[0].detail_job,
                job_time: result[0].job_time,
                job_project_year: result[0].job_project_year,
                job_project_price: result[0].job_project_price,
              });
            }
          }
        );
      }
    }
  );
};
module.exports.sig_mg_page = sig_mg_page;

const sig_dr_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_all = result;
        db.query(
          "SELECT * FROM budget_main_job where job_run_id = '" + id + "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.render("sig_dr", {
                all_detail: data_all,
                job_run_id: id,
                department: result[0].job_department,
                learn_job: result[0].learn_job,
                learn_job_copy: result[0].learn_job_copy,
                project_name: result[0].job_project_name,
                detail_job: result[0].detail_job,
                job_time: result[0].job_time,
                job_project_year: result[0].job_project_year,
                job_project_price: result[0].job_project_price,
              });
            }
          }
        );
      }
    }
  );
};
module.exports.sig_dr_page = sig_dr_page;

const sig_AMD_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_all = result;
        db.query(
          "SELECT * FROM budget_main_job where job_run_id = '" + id + "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.render("sig_AMD", {
                all_detail: data_all,
                job_run_id: id,
                department: result[0].job_department,
                learn_job: result[0].learn_job,
                learn_job_copy: result[0].learn_job_copy,
                project_name: result[0].job_project_name,
                detail_job: result[0].detail_job,
                job_time: result[0].job_time,
                job_project_year: result[0].job_project_year,
                job_project_price: result[0].job_project_price,
              });
            }
          }
        );
      }
    }
  );
};
module.exports.sig_AMD_page = sig_AMD_page;

const sig_AMD2_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_all = result;
        db.query(
          "SELECT * FROM budget_main_job where job_run_id = '" + id + "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.render("sig_AMD2", {
                all_detail: data_all,
                job_run_id: id,
                department: result[0].job_department,
                learn_job: result[0].learn_job,
                learn_job_copy: result[0].learn_job_copy,
                project_name: result[0].job_project_name,
                detail_job: result[0].detail_job,
                job_time: result[0].job_time,
                job_project_year: result[0].job_project_year,
                job_project_price: result[0].job_project_price,
              });
            }
          }
        );
      }
    }
  );
};
module.exports.sig_AMD2_page = sig_AMD2_page;

const sig_MD_page = (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT * FROM budget_detail_job where job_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data_all = result;
        db.query(
          "SELECT * FROM budget_main_job where job_run_id = '" + id + "'",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let pdf = "/pdf_budget_job_"+result[0].assistant+"/"+id
              res.render("sig_MD", {
                all_detail: data_all,
                job_run_id: id,
                department: result[0].job_department,
                learn_job: result[0].learn_job,
                learn_job_copy: result[0].learn_job_copy,
                project_name: result[0].job_project_name,
                detail_job: result[0].detail_job,
                job_time: result[0].job_time,
                job_project_year: result[0].job_project_year,
                job_project_price: result[0].job_project_price,
                assistant: result[0].assistant,
                pdf: pdf
              });
            }
          }
        );
      }
    }
  );
};
module.exports.sig_MD_page = sig_MD_page;
