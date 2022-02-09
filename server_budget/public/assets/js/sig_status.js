//=======================================================================
function one_show() {
    document.getElementById("btn_show_one").style.display = "none"
    document.getElementById("btn_hide_one").style.display = ""
    document.getElementById("view_one").style.display = ""
}
function one_hide() {
    document.getElementById("btn_show_one").style.display = ""
    document.getElementById("btn_hide_one").style.display = "none"
    document.getElementById("view_one").style.display = "none"
}
//=======================================================================
function two_show() {
    document.getElementById("btn_show_two").style.display = "none"
    document.getElementById("btn_hide_two").style.display = ""
    document.getElementById("view_two").style.display = ""
    document.getElementById("sig_view_two").style.display = ""
    if (document.getElementById("sig_mg").value != "") {//เซ็นแล้ว
        document.getElementById("sig_view_two").style.display = "none"
    } else if (document.getElementById("sig_mg").value == "") {
        document.getElementById("view_two").style.display = "none"

    }
}
function two_hide() {
    document.getElementById("btn_show_two").style.display = ""
    document.getElementById("btn_hide_two").style.display = "none"
    document.getElementById("view_two").style.display = "none"
    document.getElementById("sig_view_two").style.display = "none"
}
//=======================================================================
function three_show() {
    document.getElementById("btn_show_three").style.display = "none"
    document.getElementById("btn_hide_three").style.display = ""
    document.getElementById("view_three").style.display = ""
    document.getElementById("sig_view_three").style.display = ""
    if (document.getElementById("sig_ma").value != "") {//เซ็นแล้ว
        document.getElementById("sig_view_three").style.display = "none"
    } else if (document.getElementById("sig_ma").value == "") {
        document.getElementById("view_three").style.display = "none"

    }
}
function three_hide() {
    document.getElementById("btn_show_three").style.display = ""
    document.getElementById("btn_hide_three").style.display = "none"
    document.getElementById("view_three").style.display = "none"
    document.getElementById("sig_view_three").style.display = "none"
}
//=======================================================================
function four_show() {
    document.getElementById("btn_show_four").style.display = "none"
    document.getElementById("btn_hide_four").style.display = ""
    document.getElementById("view_four").style.display = ""
    document.getElementById("sig_view_four").style.display = ""
    if (document.getElementById("sig_pu").value != "") {//เซ็นแล้ว
        document.getElementById("sig_view_four").style.display = "none"
    } else if (document.getElementById("sig_pu").value == "") {
        document.getElementById("view_four").style.display = "none"

    }
}
function four_hide() {
    document.getElementById("btn_show_four").style.display = ""
    document.getElementById("btn_hide_four").style.display = "none"
    document.getElementById("view_four").style.display = "none"
    document.getElementById("sig_view_four").style.display = "none"
}
//=======================================================================
function five_show() {
    document.getElementById("btn_show_five").style.display = "none"
    document.getElementById("btn_hide_five").style.display = ""
    document.getElementById("view_five").style.display = ""
    document.getElementById("sig_view_five").style.display = ""
    if (document.getElementById("sig_sec").value != "") {//เซ็นแล้ว
        document.getElementById("sig_view_five").style.display = "none"
    } else if (document.getElementById("sig_sec").value == "") {
        document.getElementById("view_fiver").style.display = "none"

    }
}
function five_hide() {
    document.getElementById("btn_show_five").style.display = ""
    document.getElementById("btn_hide_five").style.display = "none"
    document.getElementById("view_five").style.display = "none"
    document.getElementById("sig_view_five").style.display = "none"
}
//=======================================================================
function showdata() {
    ////==============view_one
    document.getElementById("btn_show_one").style.display = "none"
    document.getElementById("btn_show_two").style.display = "none"
    document.getElementById("btn_show_three").style.display = "none"
    document.getElementById("btn_show_four").style.display = "none"
    document.getElementById("btn_show_five").style.display = "none"

    document.getElementById("btn_hide_three").disabled = true;
    document.getElementById("btn_hide_four").disabled = true;
    document.getElementById("btn_hide_five").disabled = true;

    if (document.getElementById("in_sigtakeout").value != "") {
        document.getElementById("in_sigtakeout").style.display = "none"
        document.getElementById("pro").style.width = "20%"
    } else {

    }
    //=======================
    //=======================view_two
    document.getElementById("btn_show_two").style.display = "none"
    if (document.getElementById("sig_mg").value != "") {//เซ็นแล้ว
        document.getElementById("pro").style.width = "40%"
        document.getElementById("sig_view_two").style.display = "none"

        document.getElementById("btn_hide_three").disabled = false;
        document.getElementById("sig_view_three").style.display = ""

    } else if (document.getElementById("sig_mg").value == "") {
        document.getElementById("view_two").style.display = "none"
        document.getElementById("sig_view_three").style.display = "none"
    }
   
    //=======================view_three_ma
    document.getElementById("btn_show_three").style.display = "none"
    if (document.getElementById("sig_ma").value != "") {//เซ็นแล้ว
        document.getElementById("pro").style.width = "60%"
        document.getElementById("sig_view_three").style.display = "none"

        document.getElementById("btn_hide_four").disabled = false;
        document.getElementById("sig_view_four").style.display = ""
    } else if (document.getElementById("sig_ma").value == "") {
        document.getElementById("view_three").style.display = "none"
        document.getElementById("sig_view_four").style.display = "none"
    }

      //=======================view_four_pu
      document.getElementById("btn_show_four").style.display = "none"
      if (document.getElementById("sig_pu").value != "") {//เซ็นแล้ว
          document.getElementById("pro").style.width = "80%"
          document.getElementById("sig_view_four").style.display = "none"
  
          document.getElementById("btn_hide_five").disabled = false;
          document.getElementById("sig_view_five").style.display = ""
      } else if (document.getElementById("sig_pu").value == "") {
          document.getElementById("view_four").style.display = "none"
          document.getElementById("sig_view_five").style.display = "none"
      }

      //=======================view_five_sec
      document.getElementById("btn_show_five").style.display = "none"
      if (document.getElementById("sig_sec").value != "") {//เซ็นแล้ว
          document.getElementById("pro").style.width = "100%"
          document.getElementById("sig_view_five").style.display = "none"
          document.getElementById("pro").className = "progress-bar progress-bar-striped progress-bar-animated bg-success"
         
      } else if (document.getElementById("sig_sec").value == "") {
          document.getElementById("view_five").style.display = "none"
         
      }

      if(document.getElementById("text_update_one").value == "4"){
        document.getElementById("view_update_one").style.display = ""
      }else{
        document.getElementById("view_update_one").style.display = "none"
      }
}


