const express = require("express");
const router = express.Router();
//== JOB
const mgController = require("../controllers/mg-controller")
router.get("/sig_mg_page/:id",mgController.sig_mg_page)
router.get("/sig_dr_page/:id",mgController.sig_dr_page)
router.get("/sig_AMD_page/:id",mgController.sig_AMD_page)
router.get("/sig_AMD2_page/:id",mgController.sig_AMD2_page)
router.get("/sig_MD_page/:id",mgController.sig_MD_page)

const pdfjobController = require("../controllers/pdf_job-controller")
router.get("/pdf_budget_job_AMD/:id",pdfjobController.pdf_budget)

const pdfjobAMD2Controller = require("../controllers/pdf_job_AMD2-controller")
router.get("/pdf_budget_job_AMD2/:id",pdfjobAMD2Controller.pdf_budget)

//== Plan 
const Sig_planController = require("../controllers/sig_plan-controller")
router.get("/sig_plan_mg_page/:id",Sig_planController.sig_plan_mg_page)
router.get("/sig_plan_dr_page/:id",Sig_planController.sig_plan_dr_page)
router.get("/sig_plan_AMD2_page/:id",Sig_planController.sig_plan_AMD2_page)
router.get("/sig_plan_AMD_page/:id",Sig_planController.sig_plan_AMD_page)
router.get("/sig_plan_MD_page/:id",Sig_planController.sig_plan_MD_page)
// router.post("",Sig_planController.post_sig_plan_mg)
const pdfController = require("../controllers/pdf-controller")
router.get("/pdf_budget/AMD2/:id",pdfController.pdf_budget)

const pdfAMDController = require("../controllers/pdf-AMDcontroller")
router.get("/pdf_budget/AMD/:id",pdfAMDController.pdf_budget)


module.exports = router;