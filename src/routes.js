// import From_add_plan from "views/view/form-add-plan";
// import Report_budget from "views/Report/report_budget";
import Form_add_job from "views/view/form-add-job";
import Report_job from "views/Report/report_job";
  var routes = [
    // {
    //   path: "/From_add_plan",
    //   name: "เพิ่มโครงการ",
    //   icon: "nc-icon nc-bank",
    //   component: From_add_plan,
    //   layout: "/admin",
    // },
    // {
    //   path: "/Report_budget",
    //   name: "ตรวจสอบโครงการ",
    //   icon: "nc-icon nc-single-copy-04",
    //   component: Report_budget,
    //   layout: "/admin",
    // },

    {
      path: "/Form_add_job",
      name: "เพิ่มค่าใช้จ่าย",
      icon: "nc-icon nc-cart-simple",
      component: Form_add_job,
      layout: "/admin",
    },
    {
      path: "/Report_job",
      name: "ตรวจสอบค่าใช้จ่าย",
      icon: "nc-icon nc-paper",
      component: Report_job,
      layout: "/admin",
    },
    // {
    //   path: "/Report_plan",
    //   name: "Report plan",
    //   icon: "nc-icon nc-world-2",
    //   component: Report_plan,
    //   layout: "/admin",
    // },
  ];
export default routes;


