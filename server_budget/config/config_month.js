/* eslint-disable no-undef */
// let data_row_0 = [
//     {
//       เดือน: result[0].month_name,
//       รายการ: result[0].plan_list,
//       ราคา: result[0].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];
//    let data_row_1 = [
//     {
//       เดือน: result[1].month_name,
//       รายการ: result[1].plan_list,
//       ราคา: result[1].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];
//   let data_row_2 = [
//     {
//       เดือน: result[2].month_name,
//       รายการ: result[2].plan_list,
//       ราคา: result[2].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_3 = [
//     {
//       เดือน: result[3].month_name,
//       รายการ: result[3].plan_list,
//       ราคา: result[3].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_4 = [
//     {
//       เดือน: result[4].month_name,
//       รายการ: result[4].plan_list,
//       ราคา: result[4].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];
//   let data_row_5 = [
//     {
//       เดือน: result[5].month_name,
//       รายการ: result[5].plan_list,
//       ราคา: result[5].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];
//   let data_row_6 = [
//     {
//       เดือน: result[6].month_name,
//       รายการ: result[6].plan_list,
//       ราคา: result[6].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_7 = [
//     {
//       เดือน: result[7].month_name,
//       รายการ: result[7].plan_list,
//       ราคา: result[7].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_8 = [
//     {
//       เดือน: result[8].month_name,
//       รายการ: result[8].plan_list,
//       ราคา: result[8].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_9 = [
//     {
//       เดือน: result[9].month_name,
//       รายการ: result[9].plan_list,
//       ราคา: result[9].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_10 = [
//     {
//       เดือน: result[10].month_name,
//       รายการ: result[10].plan_list,
//       ราคา: result[10].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

//   let data_row_11 = [
//     {
//       เดือน: result[11].month_name,
//       รายการ: result[11].plan_list,
//       ราคา: result[11].plan_price
//         .toString()
//         .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
//     },
//   ];

const data_detail_config = []
db.query("select * from budget_detail ",(err, result) => {
  if (err) {
    console.log(err);
  } else {

    result.forEach((data) => {
        data_detail_config.push({
        เดือน: data.detail_month,
        รายการ: data.detail_list,
        ราคา: data.detail_price
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      });
    });
}
});

module.exports.data_detail_config = data_detail_config