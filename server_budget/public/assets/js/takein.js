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

function showdata() {
    ////==============view_one
    document.getElementById("btn_show_one").style.display = "none"
    document.getElementById("btn_show_two").style.display = "none"

    if (document.getElementById("in_sigtakeout").value != "") {
        document.getElementById("in_sigtakeout").style.display = "none"
        document.getElementById("pro").style.width = "0%"
    } else {

    }
    //=======================
    //=======================view_two
    document.getElementById("btn_show_two").style.display = "none"
    if (document.getElementById("sig_mg").value != "") {//เซ็นแล้ว
        document.getElementById("pro").style.width = "35%"
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
        document.getElementById("pro").style.width = "70%"
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
          document.getElementById("pro").style.width = "100%"
          document.getElementById("sig_view_four").style.display = "none"
          document.getElementById("pro").className = "progress-bar progress-bar-striped progress-bar-animated bg-success" 
      } else if (document.getElementById("sig_pu").value == "") {
          document.getElementById("view_four").style.display = "none"
      }

      
      //=======================view_five_sec
     
}


