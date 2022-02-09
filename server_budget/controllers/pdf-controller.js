/* eslint-disable no-undef */
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");
const logo_venine = require("../config/img_base_64");
const bg_white = require("../config/img_white_64");

pdfMake.vfs = vfsFonts.pdfMake.vfs;

const pdf_budget = (req, res, next) => {
  //res.send('PDF');
  let id = req.params.id;
  db.query(
    "select * from budget_main where budget_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let budget_project_name = result[0].budget_project_name;
        let budget_date_request = result[0].budget_date_request;
        let budget_project_price = result[0].budget_project_price;
        let learn = result[0].learn;
        let learn_copy = result[0].learn_copy;
        let detail = result[0].detail;
        let mg_sig = ""; //{image:result[0].mg_sig, width: 100, height: 100 }
        let dr_sig = ""; //{image:result[0].dr_sig, width: 100, height: 100 }
        let AMD_sig = ""; //{image:result[0].mg_sig, width: 100, height: 100 }
        let AMD2_sig = ""; //{image:result[0].dr_sig, width: 100, height: 100 }
        let MD_sig = ""; //{image:result[0].dr_sig, width: 100, height: 100 }
        let department = result[0].budget_department;

        let factory = "";

        if (result[0].factory === "1100") {
          factory = "บริษัท วีนายน์ เคเบิ้ล จำกัด";
        } else {
          factory = "บริษัท วีนายน์ คอปเปอร์ จำกัด";
        }

        if (result[0].mg_sig === "") {
          mg_sig = { image: bg_white, width: 70, height: 70 };
        } else {
          mg_sig = { image: result[0].mg_sig, width: 70, height: 70 };
        }

        if (result[0].dr_sig === "") {
          dr_sig = { image: bg_white, width: 70, height: 70 };
        } else {
          dr_sig = { image: result[0].dr_sig, width: 70, height: 70 };
        }

        if (result[0].AMD_sig === "") {
          AMD_sig = { image: bg_white, width: 70, height: 70 };
        } else {
          AMD_sig = { image: result[0].AMD_sig, width: 70, height: 70 };
        }

        if (result[0].AMD2_sig === "") {
          AMD2_sig = { image: bg_white, width: 70, height: 70 };
        } else {
          AMD2_sig = { image: result[0].AMD2_sig, width: 70, height: 70 };
        }

        if (result[0].MD_sig === "") {
          MD_sig = { image: bg_white, width: 70, height: 70 };
        } else {
          MD_sig = { image: result[0].MD_sig, width: 70, height: 70 };
        }
        db.query(
          "SELECT * , CASE WHEN `plan_month` = '01' THEN 'มกราคม' WHEN `plan_month` = '02' THEN 'กุมภาพันธ์' WHEN `plan_month` = '03' THEN 'มีนาคม' WHEN `plan_month` = '04' THEN 'เมษายน' WHEN`plan_month` = '05' THEN 'พฤษภาคม' WHEN `plan_month` = '06' THEN 'มิถุนายน' WHEN `plan_month` = '07' THEN 'กรกฎาคม' WHEN `plan_month` = '08' THEN 'สิงหาคม' WHEN `plan_month` = '09' THEN 'กันยายน' WHEN `plan_month` = '10' THEN 'ตุลาคม' WHEN `plan_month` = '11' THEN 'พฤษจิกายน' WHEN `plan_month` = '12' THEN 'ธันวาคม' END AS month_name  FROM `budget_plan` where budget_run_id = '" +
            id +
            "'",
          (err, result) => {
            // console.log(result);
            if (err) {
              console.log(err);
            } else {
              db.query(
                "SELECT * , CASE WHEN `detail_month` = '01' THEN 'มกราคม' WHEN `detail_month` = '02' THEN 'กุมภาพันธ์' WHEN `detail_month` = '03' THEN 'มีนาคม' WHEN `detail_month` = '04' THEN 'เมษายน' WHEN `detail_month` = '05' THEN 'พฤษภาคม' WHEN `detail_month` = '06' THEN 'มิถุนายน' WHEN `detail_month` = '07' THEN 'กรกฎาคม' WHEN `detail_month` = '08' THEN 'สิงหาคม' WHEN `detail_month` = '09' THEN 'กันยายน' WHEN `detail_month` = '10' THEN 'ตุลาคม' WHEN `detail_month` = '11' THEN 'พฤษจิกายน' WHEN `detail_month` = '12' THEN 'ธันวาคม' END AS month_name  FROM `budget_detail` where budget_run_id = '" +
                  id +
                  "' order by `detail_month` ASC ",
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let data_detail = [];
                    //======================Jan=================================
                    let filter_01 = result.filter((data) => {
                      return data.detail_month === "01";
                    });

                    let data_jan = [];
                    let sum_jan = 0;
                    filter_01.forEach((data, key) => {
                      data_jan.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_jan += +data.detail_sum;
                    });

                    //======================Jan=================================

                    //======================Feb=================================
                    let filter_02 = result.filter((data) => {
                      return data.detail_month === "02";
                    });

                    let data_feb = [];
                    let sum_feb = 0;
                    filter_02.forEach((data, key) => {
                      data_feb.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_feb += +data.detail_sum;
                    });
                    //======================Feb=================================
                    //======================mar=================================
                    let filter_03 = result.filter((data) => {
                      return data.detail_month === "03";
                    });
                    let data_mar = [];
                    let sum_mar = 0;
                    filter_03.forEach((data, key) => {
                      data_mar.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_mar += +data.detail_sum;
                    });
                    //======================mar=================================

                    //======================Apr=================================
                    let filter_04 = result.filter((data) => {
                      return data.detail_month === "04";
                    });

                    let data_apr = [];
                    let sum_apr = 0;
                    filter_04.forEach((data, key) => {
                      data_apr.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_apr += +data.detail_sum;
                    });
                    //======================Apr=================================
                    //======================may=================================
                    let filter_05 = result.filter((data) => {
                      return data.detail_month === "05";
                    });
                    let data_may = [];
                    let sum_may = 0;
                    filter_05.forEach((data, key) => {
                      data_may.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_may += +data.detail_sum;
                    });
                    //======================may=================================

                    //======================jun=================================
                    let filter_06 = result.filter((data) => {
                      return data.detail_month === "06";
                    });
                    let data_jun = [];
                    let sum_jun = 0;
                    filter_06.forEach((data, key) => {
                      data_jun.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_jun += +data.detail_sum;
                    });
                    //======================jun=================================

                    //======================jul=================================
                    let filter_07 = result.filter((data) => {
                      return data.detail_month === "07";
                    });
                    let data_jul = [];
                    let sum_jul = 0;
                    filter_07.forEach((data, key) => {
                      data_jul.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_jul += +data.detail_sum;
                    });
                    //======================jul=================================

                    //======================aug=================================
                    let filter_08 = result.filter((data) => {
                      return data.detail_month === "08";
                    });
                    let data_aug = [];
                    let sum_aug = 0;
                    filter_08.forEach((data, key) => {
                      data_aug.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_aug += +data.detail_sum;
                    });
                    //======================aug=================================

                    //======================sep=================================
                    let filter_09 = result.filter((data) => {
                      return data.detail_month === "09";
                    });
                    let data_sep = [];
                    let sum_sep = 0;
                    filter_09.forEach((data, key) => {
                      data_sep.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_sep += +data.detail_sum;
                    });
                    //======================sep=================================

                    //======================oct=================================
                    let filter_10 = result.filter((data) => {
                      return data.detail_month === "10";
                    });
                    let data_oct = [];
                    let sum_oct = 0;
                    filter_10.forEach((data, key) => {
                      data_oct.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_oct += +data.detail_sum;
                    });
                    //======================oct=================================

                    //======================nov=================================
                    let filter_11 = result.filter((data) => {
                      return data.detail_month === "11";
                    });
                    let data_nov = [];
                    let sum_nov = 0;
                    filter_11.forEach((data, key) => {
                      data_nov.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_nov += +data.detail_sum;
                    });
                    //======================nov=================================

                    //======================dev=================================
                    let filter_12 = result.filter((data) => {
                      return data.detail_month === "12";
                    });
                    let data_dec = [];
                    let sum_dec = 0;
                    filter_12.forEach((data, key) => {
                      data_dec.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                      sum_dec += +data.detail_sum;
                    });
                    //======================dev=================================

                    result.forEach((data, key) => {
                      data_detail.push({
                        ลำดับ: key + 1,
                        เดือน: data.month_name,
                        รายการ: data.detail_list,
                        จำนวน: data.detail_qty
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        ราคาต่อหน่วย: data.detail_price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                        หน่วยนับ: data.detail_unit,
                        รวม: data.detail_sum
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                      });
                    });

                    function buildTableBody(data, columns) {
                      var body = [];

                      body.push(columns);

                      data.forEach(function (row) {
                        var dataRow = [];

                        columns.forEach(function (column) {
                          dataRow.push(row[column].toString());
                        });

                        body.push(dataRow);
                      });

                      return body;
                    }

                    function table_jan(data, columns) {
                      if (data_jan.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_feb(data, columns) {
                      if (data_feb.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }
                    function table_mar(data, columns) {
                      if (data_mar.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_apr(data, columns) {
                      if (data_apr.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_may(data, columns) {
                      if (data_may.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }
                    function table_jun(data, columns) {
                      if (data_jun.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_jul(data, columns) {
                      if (data_jul.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_aug(data, columns) {
                      if (data_aug.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_sep(data, columns) {
                      if (data_sep.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_oct(data, columns) {
                      if (data_oct.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }
                    function table_nov(data, columns) {
                      if (data_nov.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    function table_dec(data, columns) {
                      if (data_dec.length !== 0) {
                        return {
                          unbreakable: true,
                          margin: [70, 0, 30, 0],
                          table: {
                            widths: ["10%", "45%", "15%", "15%", "15%", "15%"],
                            paddingTop: 20,
                            body: buildTableBody(data, columns),
                          },
                          layout: "noBorders",
                          fontSize: 12,
                        };
                      }
                    }

                    var documentDefinition = {
                      pageSize: "A4",
                      pageMargins: [40, 120, 40, 45],

                      header: [
                        {
                          columns: [
                            {
                              image: logo_venine,
                              width: 70,
                              height: 70,
                              margin: [20, 20, 20, 0],
                              alignment: "justify",
                            },
                            {
                              text: [
                                {
                                  text: factory + "\n",
                                  bold: true,
                                },
                                "สำนักงานใหญ่: 88/8-9,99/9 หมูที่ 2 ถนนลาดบัวหลวง-ไม้ตรา\nตำบลลาดบัวหลวง อำเภอลาดบัวหลวง พระนครศรีอยุธยา 13230\nโทร. +663 537 8216-8 แฟกซ์. +663 528 0494\nwww.rwwwire.com",
                              ],
                              fontSize: 12,
                              margin: [20, 15, 0, 0],
                              width: "auto",
                            },
                            {
                              text: "\nสำนักงานขาย: 1768 อาคารไทยซับมิท ทาวเวอร์ ชั้น9\nถนนเพรชบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง\nกรุงเทพมหานคร 10310 โทร +662 652 9700 แฟกซ์.+665 652 9703\nCall Center:+668 9440 9999 Email: email@veninecable.com",
                              fontSize: 12,
                              margin: [20, 15, 20, 0],
                              width: "auto",
                            },
                          ],
                        },

                        {
                          table: {
                            headerRows: 1,
                            widths: ["100%"],
                            body: [[""], [""]],
                          },
                          alignment: "center",
                          layout: "headerLineOnly",
                          boder: 1,
                          margin: [30, 5, 30, 10],
                        },
                      ],

                      defaultStyle: {
                        columnGap: 5,
                      },

                      content: [
                        {
                          text: "Memo Budget โครงการ\n",
                          fontSize: 15,
                          bold: true,
                          alignment: "center",
                        },
                        {
                          text: "\nวันที่: " + budget_date_request,
                          fontSize: 12,
                          alignment: "right",
                          margin: [0, 0, 30, 0],
                        },
                        {
                          text: "\nเรียน : " + learn,
                          fontSize: 12,
                          margin: [30, 0, 30, 0],
                        },
                        {
                          text: "\nสำเนาเรื่อง : " + learn_copy,
                          fontSize: 12,
                          margin: [30, 0, 30, 0],
                        },
                        {
                          text: "\nเรื่อง : " + budget_project_name,
                          fontSize: 12,
                          margin: [30, 0, 30, 0],
                        },
                        {
                          text: "\n" + detail,
                          fontSize: 12,
                          margin: [50, 0, 30, 0],
                        },
                        {
                          text: "\n",
                        },

                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_jan.length !== 0) {
                              return (
                                "\nมกราคม : " +
                                sum_jan
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_jan(data_jan, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// กุมภา
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_feb.length !== 0) {
                              return (
                                "\nกุมภาพันธุ์ : " +
                                sum_feb
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_feb(data_feb, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// กุมภา

                        //// มีนาคม mar
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_mar.length !== 0) {
                              return (
                                "\nมีนาคม : " +
                                sum_mar
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_mar(data_mar, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// มีนาคม

                        //// เมษายน apr
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_apr.length !== 0) {
                              return (
                                "\nเมษายน : " +
                                sum_apr
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_apr(data_apr, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// เมษายน

                        //// พฤษภาคม may
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_may.length !== 0) {
                              return (
                                "\nพฤษภาคม : " +
                                sum_may
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_may(data_may, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),

                        //// พฤษภาคม

                        //// มิถุนายน jun
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_jun.length !== 0) {
                              return (
                                "\nมิถุนายน : " +
                                sum_jun
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_jun(data_jun, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),

                        //// กรกฎาคม jul
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_jul.length !== 0) {
                              return (
                                "\nกรกฎาคม : " +
                                sum_jul
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_jul(data_jul, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// กรกฎาคม

                        //// สิงหาคม aug
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_aug.length !== 0) {
                              return (
                                "\nสิงหาคม : " +
                                sum_aug
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_aug(data_aug, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// สิงหาคม

                        //// กันยายน sep
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_sep.length !== 0) {
                              return (
                                "\nกันยายน : " +
                                sum_sep
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_sep(data_sep, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// กันยายน

                        //// ตุลาคม oct
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_oct.length !== 0) {
                              return (
                                "\nตุลาคม : " +
                                sum_oct
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_oct(data_oct, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// ตุลาคม

                        //// พฤษจิกายน nov
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_nov.length !== 0) {
                              return (
                                "\nพฤษจิกายน : " +
                                sum_nov
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_nov(data_nov, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// พฤษจิกายน

                        //// ธันวาคม dec
                        {
                          unbreakable: true,
                          text: (() => {
                            if (data_dec.length !== 0) {
                              return (
                                "\nธันวาคม : " +
                                sum_dec
                                  .toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                              );
                            }
                          })(),
                          margin: [35, 0, 30, 0],
                        },
                        table_dec(data_dec, [
                          "ลำดับ",
                          "รายการ",
                          "ราคาต่อหน่วย",
                          "จำนวน",
                          "หน่วยนับ",
                          "รวม",
                        ]),
                        //// ธันวาคม

                        {
                          text: "\n",
                        },
                        {
                          unbreakable: true,
                          text:
                            "รวมงบประมาณ : " +
                            budget_project_price
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                          margin: [50, 0, 30, 0],
                        },

                        {
                          paddingTop: 50,
                          text: "\n\n\nขอแสดงความนับถือ",

                          fontSize: 12,
                          margin: [230, 0, 30, 0],
                          unbreakable: true,
                        },
                        {
                          margin: [0, 0, 0, 0],
                          alignment: "center",
                          layout: "noBorders",
                          style: "tableExample",
                          unbreakable: true,
                          table: {
                            widths: [250, 250],
                            body: [
                              [mg_sig, dr_sig],
                              ["ผู้จัดการ", "ผู้อำนวยการ"],
                              [
                                "ฝ่ายงาน " + department,
                                "ฝ่ายงาน " + department,
                              ],
                            ],
                          },
                        },
                        {
                          unbreakable: true,
                          margin: [0, 0, 0, 0],
                          alignment: "center",
                          layout: "noBorders",
                          style: "tableExample",
                          table: {
                            widths: [250],
                            body: [
                              [AMD2_sig],
                              ["ผู้ช่วยกรรมการผู้จัดการบริษัท ส่วนงานสนับสนุน"],
                              ["คุณ สนธยา โสดแก้ว"],
                            ],
                          },
                        },

                        {
                          unbreakable: true,
                          margin: [125, 0, 0, 0],
                          alignment: "center",
                          layout: "noBorders",
                          style: "tableExample",
                          table: {
                            widths: [250],
                            body: [
                              [MD_sig],
                              ["กรรมการผู้จัดการบริษัท"],
                              ["คุณวิศรุต รังษีสิงห์พิพัฒน์"],
                            ],
                          },
                        },
                      ],

                      styles: {
                        header: {
                          fontSize: 18,
                          bold: true,
                        },

                        subheader: {
                          fontSize: 15,
                          bold: true,
                        },
                        quote: {
                          italics: true,
                        },
                        small: {
                          fontSize: 8,
                        },
                      },
                    };
                    const pdfDoc = pdfMake.createPdf(documentDefinition);

                    pdfDoc.getBase64((data) => {
                      res.writeHead(200, {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": "attachment;filename=budget.pdf",
                      });

                      const download = Buffer.from(
                        data.toString("utf-8"),
                        "base64"
                      );
                      res.end(download);
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
};

module.exports.pdf_budget = pdf_budget;
