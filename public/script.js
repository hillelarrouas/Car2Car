function init() {
    const heightinputnumbercar = `${Number($("#WelcomCarNumber").css('height').split('p')[0]) / 2 - Number($("#WelcomCarNumber").css('border').split('p')[0]) * 2}px`
    $("#resetInputNumber").css({ 'top': heightinputnumbercar })
    const heightinputtellogin = `${Number($("#inputTelLogin").css('height').split('p')[0]) / 2 + Number($("#inputTelLogin").css('border').split('p')[0]) * 5}px`
    $("#resetInputtellogin").css({ 'top': heightinputtellogin })
    const heightinputPassLogin = `${Number($("#inputPassLogin").css('height').split('p')[0]) / 2 + Number($("#inputPassLogin").css('border').split('p')[0]) * 5}px`
    $("#resetInputpasslogin").css({ 'top': heightinputPassLogin })


}



function addUser() {
    if ($("#cardmesadduser").css('height') == '0px') {
        $("#cardmesadduser").css('height', 'auto')
        setTimeout(function () { $('html, body').animate({ scrollTop: 800 }, 300); }, 1);
    }
    else {
        $("#cardmesadduser").animate({ 'height': '0px' }, 150)
    }
}




function ArrangeCarNumber() {
    $("#ErrorMsg").html("")
    let FixedCarNumber = $("#WelcomCarNumber").val().replace(/-/g, '')
    if (FixedCarNumber.length > 0) {
        $("#resetInputNumber").show()
    } else {
        $("#resetInputNumber").hide()
    }
    if (isNaN(Number(FixedCarNumber))) {
        $("#WelcomCarNumber").css({ 'color': 'red', 'border-color': 'red' })
    } else {
        $("#WelcomCarNumber").css({ 'color': 'black', 'border-color': 'black' })
    }
    if (FixedCarNumber.length == 3) {
        FixedCarNumber = FixedCarNumber.substring(0, 2) + "-" + FixedCarNumber.substring(2, 3)
    } else if (FixedCarNumber.length == 4) {
        FixedCarNumber = FixedCarNumber.substring(0, 2) + "-" + FixedCarNumber.substring(2, 4)
    } else if (FixedCarNumber.length == 5) {
        FixedCarNumber = FixedCarNumber.substring(0, 2) + "-" + FixedCarNumber.substring(2, 5)
    } else if (FixedCarNumber.length == 6) {
        FixedCarNumber = FixedCarNumber.substring(0, 2) + "-" + FixedCarNumber.substring(2, 5) + "-" + FixedCarNumber.substring(5, 6)
    } else if (FixedCarNumber.length == 7) {
        FixedCarNumber = FixedCarNumber.substring(0, 2) + "-" + FixedCarNumber.substring(2, 5) + "-" + FixedCarNumber.substring(5, 7)
    } else if (FixedCarNumber.length == 8) {
        FixedCarNumber = FixedCarNumber.substring(0, 3) + "-" + FixedCarNumber.substring(3, 5) + "-" + FixedCarNumber.substring(5, 8)
    }
    $("#WelcomCarNumber").val(FixedCarNumber)
}



// $.ajax({url: "https://car2car.herokuapp.com/getData/4635868", success: function(result){
//     console.log(result)
//   }});

function CheckCar() {
    let CarNumber = $("#WelcomCarNumber").val().replace(/-/g, '')
    try {
        if (CarNumber.length == 0) {
            $("#ErrorMsg").html('נא להקליד מספר רכב')
        } else {
            if (!Number(CarNumber)) {
                $("#ErrorMsg").html('נא להזין <b>מספר רכב</b> בספרות בלבד')
            }
            else {
                if (CarNumber.length < 7 || CarNumber.length == undefined) {
                    $("#ErrorMsg").html('נא להזין מספר רכב בין 7 <b>או</b> 8 ספרות')
                } else {
                    $("#ErrorMsg").html('')
                    $("#WelcomBt").hide()
                    $("#WelcomWait").show()


                    fetch('https://car2car.herokuapp.com/getData', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ valueCarNumber: CarNumber })
                    })
                        .then(res => res.json())
                        .then(data => {
                            $("#WelcomWait").hide()
                            if (data) {
                                printingData(data)
                                $(".Welcom .logo img").css({ 'height': '200px', 'transition': 'all 0s' })
                                $("#cardmesadduser").css({ 'height': '0px' })
                                $(".Welcom").hide();
                                $(".cardTable").show();
                            }
                            else {
                                $("#WelcomBt").show()
                                $("#ErrorMsg").html('מספר רכב לא קיים במאגר')
                            }
                        }).catch(err => {
                            console.log(err)
                            $("#ErrorMsg").html('תקלה')
                            $("#WelcomBt").show()
                            $("#WelcomWait").hide()
                        })
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}


$("#resetInputNumber").click(function () {
    $("#ErrorMsg").html('')
    $("#WelcomCarNumber").val('')
    $("#WelcomCarNumber").focus()
    $("#WelcomCarNumber").css({ 'color': 'black', 'border-color': 'black' })
    $("#resetInputNumber").hide()
});


$("#WelcomCarNumber").focusout(function () {
    setTimeout(function () { $("#resetInputNumber").hide() }, 100);
});

$("#WelcomCarNumber").focus(function () {
    if ($("#WelcomCarNumber").val().length > 0) {
        $("#resetInputNumber").show()
    }
    $(".Welcom .logo img").css({ 'height': '80px', 'transition': 'all 0.3s' })
    setTimeout(function () { $('html,body').scrollTop(0); }, 1);
});


$("#inputTelLogin").focusout(function () {
    setTimeout(function () { $("#resetInputtellogin").hide() }, 100);
});

$("#inputTelLogin").focus(function () {
    if ($("#inputTelLogin").val().length > 0) {
        $("#resetInputtellogin").show()
    }
});

$("#inputTelLogin").on('input', function () {
    if ($("#inputTelLogin").val().length > 0) {
        $("#resetInputtellogin").show()
    } else {
        $("#resetInputtellogin").hide()
    }
})



$("#inputPassLogin").focusout(function () {
    setTimeout(function () { $("#resetInputpasslogin").hide() }, 100);
});

$("#inputPassLogin").focus(function () {
    if ($("#inputPassLogin").val().length > 0) {
        $("#resetInputpasslogin").show()
    }
});

$("#inputPassLogin").on('input', function () {
    if ($("#inputPassLogin").val().length > 0) {
        $("#resetInputpasslogin").show()
    } else {
        $("#resetInputpasslogin").hide()
    }
})





$("#reternWelcom").click(function () {
    $("#ErrorMsg").html('')
    $("#WelcomCarNumber").val('')
    $("#WelcomCarNumber").focus()
    $("#WelcomCarNumber").css({ 'color': 'black', 'border-color': 'black' })
    $(".cardTable").hide();
    $(".Welcom").show();
    $("#WelcomCarNumber").focus()
    $("#WelcomBt").show();
    $("#WelcomWait").hide();

});

$(window, 'body').on('scroll', function () {
    if ($('html,body').scrollTop() >= 300) {
        $(".scooll").show()
    } else {
        $(".scooll").hide()
    }
});


function showLogin() {
    $("#ErrorMsg").html('')
    $(".cardfixed").show()
    $(".cardlogin").animate({ 'margin': '0px auto' }, 200)
    $("#inputTelLogin").focus()
    init()
}


$("#cardfixedhide").click(function () {
    $("#inputTelLogin").val('')
    $("#inputPassLogin").val('')
    $("#ErrorMsgLogin").html('')
    $(".cardPass").hide()
    $('#inputTelLogin').attr('readonly', false);
    $(".cardlogin").animate({ 'margin': '-500px auto' }, 300)
    setTimeout(function () { $(".cardfixed").hide() }, 100);
});



$("#inputTelLogin").keyup(function () {
    $("#ErrorMsgLogin").html('')
    let value = $(this).val().replace(/-/g, '')
    if (value.length > 2) {
        if (value[1] !== '5' && value[1] !== '7') {
            value = value.substring(0, 2) + "-" + value.substr(2)
        } else if (value.length > 3) {
            value = value.substring(0, 3) + "-" + value.substr(3)
        }
        $(this).val(value)
    }
})




$("#submitLogin").click(function () {
    $("#inputTelLogin").focus()
    const valueTel = $("#inputTelLogin").val().replace(/-/g, '')
    console.log(valueTel.length)
    if (valueTel == '') {
        $("#ErrorMsgLogin").html('הזן מספר טלפון בין 9/ 10 ספרות')
    } else {
        if (valueTel.length != 9 && valueTel.length != 10) {
            $("#ErrorMsgLogin").html('מספר טלפון לא תקין, הזן מספר בין 9 / 10 ספרות בלבד')
        } else {
            if (valueTel == '0534633147') {
                $("#ErrorMsgLogin").html()
                $('#inputTelLogin').attr('readonly', true);
                setTimeout(function () { $(".cardPass").show() }, 500);
                setTimeout(function () { $("#inputPassLogin").focus(), init() }, 501);


                if ($("#inputTelLogin").val().replace(/-/g, '') == '0534633147' && $("#inputPassLogin").val() == '12345') {
                    $("#ErrorMsgLogin").html('הכניסה אושרה')
                    setTimeout(function () { $("#cardfixedhide").click() }, 800);
                }
            }
        }
    }
});












function printingData(d) {
    console.log(d)
    let necha;
    if (d[2] == undefined) {
        necha = `<tr>
        <td class="key">תו נכה</td>
        <td>אין</td>
      </tr>`
    }
    else {
        const x = d[2]['TAARICH HAFAKAT TAG']
        necha = `<tr>
        <td class="key">תו נכה - סוג תו</td>
            <td>${test(d[2]['SUG TAV']) == '01' ? 'תו נכה רגיל' : 'תג נכה על כיסא גלגלים'}</td>
       </tr>
       <tr>
            <td class="key">תאריך הפקת תו</td>
            <td>${x[6]}${x[7]}/${x[4]}${x[5]}/${x[0]}${x[1]}${x[2]}${x[3]}</td>
       </tr>`
    }


    $(".addTable").html(
        `<div dir="rtl" style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);"><div style='display:inline-block'>${test(d[0].tozeret_nm)}</div> <div  style='display:inline-block'>${test(d[0].kinuy_mishari)}</div> | <div  style='display:inline-block'>${test(d[0].shnat_yitzur)}</div></div>
        <table>
    <tr>
    <td class="key">נפח מנוע</td>
    <td><div style="direction: rtl;">${test(d[1].nefah_manoa)} סמ"ק</div></td>
   </tr>
   <tr>
   <td class="key">כח סוס</td>
   <td><div style="direction: rtl;">${test(d[1].koah_sus)} כ"ס</div></td>
   </tr>
   <tr>
   <td class="key">הנעה</td>
   <td>${test(d[1].hanaa_nm)}</td>
</tr>
   <tr>
   <td class="key">רמת גימור</td>
     <td>${test(d[0].ramat_gimur)}</td>
  </tr>
    <tr>
    <td class="key">משקל כולל</td>
      <td style="direction: rtl;">${test(d[1].mishkal_kolel)} ק"ג</td>
    </tr>
    <tr>
      <td class="key">תיבת הילוכים</td>
      <td>${test(d[1].automatic_ind) == 1 ? 'אוטומטי' : 'ידני'}</td>
    </tr> 
   
   
</table>

<div style="text-align: right;padding: 5px 30px;font-size: 22px;font-weight: 600;">אבזור ובטיחות:</div>

<table>
<tr>
<td class="key">רמת איבזור בטיחות</td>
<td>${test(d[1].ramat_eivzur_betihuty)}</td>
</tr>
  <tr>
  <td class="key">מספר כריות אוויר</td>
     <td>${test(d[1].mispar_kariot_avir)}</td>
  </tr>
  
 

    <tr>
    <td class="key">ABS</td>
      <td>${test(d[1].abs_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">חלון בגג</td>
      <td>${test(d[1].halon_bagg_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">הגה כח</td>
       <td>${test(d[1].hege_koah_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>

   <tr>
     <td class="key">בקרת יציבות</td>
     <td>${test(d[1].bakarat_yatzivut_ind) == 0 ? 'אין' : 'יש'}</td>
   </tr>
    <tr>
    <td class="key">בקרת סטיה מנתיב</td>
       <td>${test(d[1].bakarat_stiya_menativ_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">ניתור מרחק מלפנים</td>
       <td>${test(d[1].nitur_merhak_milfanim_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">זיהוי שטח מת</td>
      <td>${test(d[1].zihuy_beshetah_nistar_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">בקרת שיוט אדפטיבית</td>
       <td>${test(d[1].bakarat_shyut_adaptivit_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">זיהוי הולכי רגל</td>
        <td>${test(d[1].zihuy_holchey_regel_ind) == 0 ? 'אין' : 'יש'}</td>
    </tr>
    <tr>
    <td class="key">מצלמת רוורס מהיצרן</td>
       <td>${test(d[1].matzlemat_reverse_ind) == 0 ? 'אין' : 'יש'}</td>
   </tr>
   <tr>
   <td class="key">חיישני לחץ אוויר בצמיגים</td>
      <td>${test(d[1].hayshaney_lahatz_avir_batzmigim_ind) == 0 ? 'אין' : 'יש'}</td>
   </tr>
   <tr>
   <td class="key">חיישני חגורות בטיחות</td>
      <td>${test(d[1].hayshaney_hagorot_ind) == 0 ? 'אין' : 'יש'}</td>
  </tr>
  <tr>
  <td class="key">תאורה אוטומטית בנסיעה קדימה</td>
     <td>${test(d[1].teura_automatit_benesiya_kadima_ind) == 0 ? 'אין' : 'יש'}</td>
  </tr>
  <tr>
  <td class="key">שליטה אוטומטית באורות גבוהים</td>
    <td>${test(d[1].shlita_automatit_beorot_gvohim_ind) == 0 ? 'אין' : 'יש'}</td>
  </tr>
  <tr>
  <td class="key">זיהוי תמרורי תנועה</td>
    <td>${test(d[1].zihuy_tamrurey_tnua_ind) == 0 ? 'אין' : 'יש'}</td>
  </tr>
  <tr>
  <td class="key">זיהוי התקרבות מסוכנת</td>
    <td>${test(d[1].zihuy_matzav_hitkarvut_mesukenet_ind) == 0 ? 'אין' : 'יש'}</td>
  </tr>
  
</table>

<div style="text-align: right;padding: 5px 30px;font-size: 22px;font-weight: 600;">מידע נוסף:</div>


<table>
<tr>
<td class="key">מספר דלתות</td>
<td>${test(d[1].mispar_dlatot)}</td>
</tr>
<tr>
<td class="key">מספר מושבים</td>
<td>${test(d[1].mispar_moshavim)}</td>
</tr>
<tr>
<td class="key">קוד תוצר</td>
  <td>${test(d[0].tozeret_cd)}</td>
</tr>
<tr>
<td class="key">קוד דגם</td>
  <td>${test(d[0].degem_manoa)}</td>
</tr>
<tr>
<td class="key">קוד דגם</td>
  <td>${test(d[0].degem_cd)}</td>
</tr>
<tr>
<td class="key">שם דגם</td>
  <td>${test(d[0].degem_nm)}</td>
</tr>
<tr>
<td class="key">קבוצת זיהום</td>
  <td>${test(d[0].kvutzat_zihum)}</td>
</tr>
<tr>
<td class="key">מבחן טסט אחרון</td>
<td><div style="direction: ltr;">${test(d[0].mivchan_acharon_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
</tr>
<tr>
  <td class="key">תוקף טסט</td>
  <td><div style="direction: ltr;">${test(d[0].tokef_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
</tr>
<tr>
<td class="key">מספר שילדה</td>
  <td>${test(d[0].misgeret)}</td>
</tr>
<tr>
<td class="key">צבע רכב</td>
  <td>${test(d[0].tzeva_rechev)}</td>
</tr>
<tr>
<td class="key">מידות צמיג קידמי</td>
  <td>${test(d[0].zmig_kidmi)}</td>
</tr>
<tr>
<td class="key">מידות צמיג אחורי</td>
  <td>${test(d[0].zmig_ahori)}</td>
</tr>
<tr>
<td class="key">סוג דלק</td>
  <td>${test(d[0].sug_delek_nm)}</td>
</tr>
<tr>
<td class="key">הוראת רשום</td>
  <td>${test(d[0].horaat_rishum)}</td>
</tr>
<tr>
<td class="key">קוד צבע</td>
  <td>${test(d[0].tzeva_cd)}</td>
</tr>
<tr>
<td class="key">בעלות</td>
<td>${test(d[0].baalut)}</td>
</tr>
${necha}
</table>
`
    )
}


function test(text) {
    return text == null ? '' : text
}


{/*
     <tr>
     <td><div style="direction: rtl;">${test(d[1].kosher_grira_im_blamim)} ק"ג</div></td>
     <td class="key">כושר גרירה עם בלמים</td>
   </tr>
   <tr>
     <td><div style="direction: rtl;">${test(d[1].kosher_grira_bli_blamim)} ק"ג</div></td>
     <td class="key">כושר גרירה בלי בלמים</td>
  </tr> 
        <tr>
        <td>${test(d[0].shnat_yitzur)}</td>
        <td class="key">שנת יצור</td>
    </tr>
     <tr>
<td>${test(d[0].mispar_rechev)}</td>
<td class="key">מספר רכב</td>
</tr>
<tr>
<td>${test(d[0].tozeret_nm)}</td>
<td class="key">יצרן</td>
</tr>
<tr>
<td>${test(d[0].kinuy_mishari)}</td>
<td class="key">שם מסחרי</td>
</tr>
<tr>
<td>${test(d[1].merkav)}</td>
<td class="key">מרכב</td>
</tr> */}