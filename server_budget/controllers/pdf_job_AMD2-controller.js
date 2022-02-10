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
    "select * from budget_main_job where job_run_id = '" + id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let job_project_name = result[0].job_project_name;
        let job_date_request = result[0].job_date_request;
        let learn_job = result[0].learn_job;
        let learn_job_copy = result[0].learn_job_copy;
        let detail_job = result[0].detail_job;
        let mg_sig = ""; //{image:result[0].mg_sig, width: 100, height: 100 }
        let dr_sig = ""; //{image:result[0].dr_sig, width: 100, height: 100 }
        let AMD_sig = ""; //{image:result[0].mg_sig, width: 100, height: 100 }
        let AMD2_sig = ""; //{image:result[0].dr_sig, width: 100, height: 100 }
        let MD_sig = ""; //{image:result[0].dr_sig, width: 100, height: 100 }
        let job_department = result[0].job_department;
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
          // eslint-disable-next-line no-unused-vars
          AMD_sig = { image: result[0].AMD_sig, width: 70, height: 70 };
        }

        if (result[0].AMD2_sig === "") {
          AMD2_sig = { image: bg_white, width: 70, height: 70 };
        } else {
          AMD2_sig = { image: result[0].AMD2_sig, width: 70, height: 70 };
        }

        if (result[0].MD_sig === "") {
          MD_sig = { image: bg_white, width: 70, height: 70 , colSpan:2};
        } else {
          MD_sig = { image: result[0].MD_sig, width: 70, height: 70 , colSpan:2};
        }
        db.query(
          "select * from budget_detail_job where job_run_id = '" + id + "'",
          (err, result) => {
            // console.log(result);
            if (err) {
              console.log(err);
            } else {
              let data_row = [];
              result.forEach((data,key) => {
                data_row.push({
                  ลำดับ : key+1 ,
                  รายการ: data.detail_list_job,
                  จำนวน: data.detail_qty_job
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                  ราคาต่อหน่วย: data.detail_price_job
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                  หน่วยนับ : data.detail_unit_job , 
                  รวม: data.detail_sum_job
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                });
              });
              // console.log(data_row);
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
              function table(data, columns) {
                return {
                  margin: [70, 0, 30, 0],
                  table: {
                    widths: ["45%", "15%", "15%","15%", "15%"],
                    paddingTop: 20,

                    body: buildTableBody(data, columns),
                  },
                  layout: "noBorders",
                  fontSize: 12,
                };
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
                    text: "Memo Budget\n",
                    fontSize: 15,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    text: "\nวันที่: " + job_date_request,
                    fontSize: 12,
                    alignment: "right",
                    margin: [0, 0, 30, 0],
                  },
                  {
                    text: "\nเรียน : " + learn_job,
                    fontSize: 12,
                    margin: [30, 0, 0, 0],
                  },
                  {
                    text: "\nสำเนาเรื่อน : " + learn_job_copy,
                    fontSize: 12,
                    margin: [30, 0, 0, 0],
                  },
                  {
                    text: "\nเรื่อง : " + job_project_name,
                    fontSize: 12,
                    margin: [30, 0, 0, 0],
                  },
                  {
                    text: "\n" + detail_job,
                    fontSize: 12,
                    margin: [50, 0, 0, 0],
                  },
                  {
                    text: "\n",
                  },
                  table(data_row, ["ลำดับ","รายการ", "ราคาต่อหน่วย", "จำนวน", "หน่วยนับ", "รวม"]),
                  {
                    text: "\n",
                  },
                  // {
                  //   unbreakable: true,
                  //   paddingTop: 50,
                  //   text: "\n\n\nขอแสแดงความนับถือ",
                  //   fontSize: 12,
                  //   alignment: "center",
                  // },
                  {
                    unbreakable: true,
                    margin: [0, 0, 0, 0],
                    alignment: "center",
                    layout: "noBorders",
                    style: "tableExample",

                    table: {
                      widths: [250, 250],
                      body: [
                        [{text:"\n\nจึงเรียนมาเพื่อโปรดพิจาณาอนุมัติเรื่อง " + job_project_name + "\n\nขอแสแดงความนับถือ",colSpan:2},''],
                        [mg_sig, dr_sig],
                        ["ผู้จัดการ", "ผู้อำนวยการ"],
                        [
                          "ฝ่ายงาน " + job_department,
                          "ฝ่ายงาน " + job_department,
                        ],
                        ['',AMD2_sig],
                        ['',"ผู้ช่วยกรรมการผู้จัดการบริษัท ส่วนงานสนับสนุน"],
                        ['',"คุณ สนธยา โสดแก้ว"],

                        [ MD_sig , ''],
                        [{text:"กรรมการผู้จัดการบริษัท",colSpan:2},''],
                        [{text:"คุณวิศรุต รังษีสิงห์พิพัฒน์",colSpan:2},''],
                      ],
                    },
                  },
                  // {
                  //   unbreakable: true,
                  //   margin: [0, 0, 0, 0],
                  //   alignment: "center",
                  //   layout: "noBorders",
                  //   style: "tableExample",
                  //   table: {
                  //     widths: [250],
                  //     body: [
                  //       [AMD2_sig],
                  //       ["ผู้ช่วยกรรมการผู้จัดการบริษัท ส่วนงานสนับสนุน"],
                  //       ["คุณ สนธยา โสดแก้ว"],
                        
                  //     ],
                  //   },
                  // },

                  // {
                  //   unbreakable: true,
                  //   margin: [125, 0, 0, 0],
                  //   alignment: "center",
                  //   layout: "noBorders",
                  //   style: "tableExample",
                  //   table: {
                  //     widths: [250],
                  //     body: [
                  //       [MD_sig],
                  //       ["กรรมการผู้จัดการบริษัท"],
                  //       ["คุณวิศรุต รังษีสิงห์พิพัฒน์"],
                  //     ],
                  //   },
                  // },
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
                  "Content-Disposition": "attachment;filename=budget_job.pdf",
                });

                const download = Buffer.from(data.toString("utf-8"), "base64");
                res.end(download);
              });
            }
          }
        );
      }
    }
  );
};

module.exports.pdf_budget = pdf_budget;
