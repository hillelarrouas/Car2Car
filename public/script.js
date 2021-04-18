
function init() {
    const height = `${Number($("#WelcomCarNumber").css('height').split('p')[0]) / 2 - Number($("#WelcomCarNumber").css('border').split('p')[0]) * 2}px`
    $("#resetInputNumber").css({ 'top': height })
}

// מספר רכב אליהו 36-005-54


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
                    fetch('/getData', {
                        method: 'POST',
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
                                $(".Welcom").hide();
                                $(".cardTable").show();
                            }
                            else {
                                $("#WelcomBt").show()
                                $("#ErrorMsg").html('מספר רכב לא קיים במאגר')
                            }
                        })
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}


$("#WelcomCarNumber").focus(function () {
    if ($("#WelcomCarNumber").val().length > 0) {
        $("#resetInputNumber").show()
    }
    $(".Welcom .logo img").css({ 'height': '80px', 'transition': 'all 0.3s' })
    setTimeout(function () { $('html,body').scrollTop(0); }, 1);
});



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
        $(".scooll").show(50)
    } else {
        $(".scooll").hide(50)
    }
});


function printingData(d) {
    let necha;
    if (d[2] == undefined) {
        necha = `<tr>
        <td>אין</td>
        <td class="key">תו נכה</td>
      </tr>`
    }
    else {
        const x = d[2]['TAARICH HAFAKAT TAG']
        necha = `<tr>
            <td>${test(d[2]['SUG TAV']) == '01' ? 'תו נכה רגיל' : 'תג נכה על כיסא גלגלים'}</td>
            <td class="key">תו נכה - סוג תו</td>
       </tr>
       <tr>
            <td>${x[6]}${x[7]}/${x[4]}${x[5]}/${x[0]}${x[1]}${x[2]}${x[3]}</td>
            <td class="key">תאריך הפקת תו</td>
       </tr>`
    }


    $(".addTable").html(
        `<div style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);">${test(d[0].kinuy_mishari)} ${test(d[0].tozeret_nm)}</div>
        <table>
    <tr>
        <td>${test(d[0].shnat_yitzur)}</td>
        <td class="key">שנת יצור</td>
    </tr>
    <tr>
      <td>${test(d[1].nefah_manoa)}</td>
      <td class="key">נפח מנוע</td>
   </tr>
   <tr>
       <td>${test(d[1].koah_sus)}</td>
       <td class="key">כח סוס</td>
   </tr>
   <tr>
     <td>${test(d[0].ramat_gimur)}</td>
     <td class="key">רמת גימור</td>
  </tr>
    <tr>
      <td style="direction: rtl;">${test(d[1].mishkal_kolel)} ק"ג</td>
      <td class="key">משקל כולל</td>
    </tr>
    <tr>
      <td>${test(d[1].automatic_ind) == 1 ? 'אוטומטי' : 'ידני'}</td>
      <td class="key">תיבת הילוכים</td>
    </tr> 
    <tr>
       <td>${test(d[1].technologiat_hanaa_nm)}</td>
       <td class="key">הנעה</td>
    </tr>
    <tr>
       <td>${test(d[0].baalut)}</td>
       <td class="key">בעלות</td>
    </tr>
</table>


<div style="text-align: right;padding: 5px 30px;font-size: 22px;font-weight: 600;">:אבזור ובטיחות</div>

<table>
  <tr>
     <td>${test(d[1].mispar_kariot_avir)}</td>
     <td class="key">מספר כריות אוויר</td>
  </tr>
   <tr>
     <td>${test(d[1].mispar_dlatot)}</td>
     <td class="key">מספר דלתות</td>
  </tr>
  <tr>
    <td>${test(d[1].mispar_moshavim)}</td>
    <td class="key">מספר מושבים</td>
  </tr>
  <tr>
     <td><div style="direction: rtl;">${test(d[1].kosher_grira_im_blamim)} ק"ג</div></td>
     <td class="key">כושר גרירה עם בלמים</td>
   </tr>
   <tr>
     <td><div style="direction: rtl;">${test(d[1].kosher_grira_bli_blamim)} ק"ג</div></td>
     <td class="key">כושר גרירה בלי בלמים</td>
  </tr> 
  <tr>
      <td>${test(d[1].ramat_eivzur_betihuty)}</td>
      <td class="key">רמת איבזור בטיחות</td>
    </tr>
    <tr>
      <td>${test(d[1].abs_ind) == 0 ? 'אין' : 'יש'}</td>
      <td class="key">ABS</td>
    </tr>
    <tr>
      <td>${test(d[1].halon_bagg_ind) == 0 ? 'אין' : 'יש'}</td>
      <td class="key">חלון בגג</td>
    </tr>
    <tr>
       <td>${test(d[1].hege_koah_ind) == 0 ? 'אין' : 'יש'}</td>
       <td class="key">הגה כח</td>
    </tr>

   <tr>
     <td>${test(d[1].bakarat_yatzivut_ind) == 0 ? 'אין' : 'יש'}</td>
     <td class="key">בקרת יציבות</td>
   </tr>
    <tr>
       <td>${test(d[1].bakarat_stiya_menativ_ind) == 0 ? 'אין' : 'יש'}</td>
       <td class="key">בקרת סטיה מנתיב</td>
    </tr>
    <tr>
       <td>${test(d[1].nitur_merhak_milfanim_ind) == 0 ? 'אין' : 'יש'}</td>
       <td class="key">ניתור מרחק מלפנים</td>
    </tr>
    <tr>
      <td>${test(d[1].zihuy_beshetah_nistar_ind) == 0 ? 'אין' : 'יש'}</td>
      <td class="key">זיהוי שטח מת</td>
    </tr>
    <tr>
       <td>${test(d[1].bakarat_shyut_adaptivit_ind) == 0 ? 'אין' : 'יש'}</td>
       <td class="key">בקרת שיוט אדפטיבית</td>
    </tr>
    <tr>
        <td>${test(d[1].zihuy_holchey_regel_ind) == 0 ? 'אין' : 'יש'}</td>
        <td class="key">זיהוי הולכי רגל</td>
    </tr>
    <tr>
       <td>${test(d[1].matzlemat_reverse_ind) == 0 ? 'אין' : 'יש'}</td>
       <td class="key">מצלמת רוורס מהיצרן</td>
   </tr>
   <tr>
      <td>${test(d[1].hayshaney_lahatz_avir_batzmigim_ind) == 0 ? 'אין' : 'יש'}</td>
      <td class="key">חיישני לחץ אוויר בצמיגים</td>
   </tr>
   <tr>
      <td>${test(d[1].hayshaney_hagorot_ind) == 0 ? 'אין' : 'יש'}</td>
      <td class="key">חיישני חגורות בטיחות</td>
  </tr>
  <tr>
     <td>${test(d[1].teura_automatit_benesiya_kadima_ind) == 0 ? 'אין' : 'יש'}</td>
     <td class="key">תאורה אוטומטית בנסיעה קדימה</td>
  </tr>
  <tr>
    <td>${test(d[1].shlita_automatit_beorot_gvohim_ind) == 0 ? 'אין' : 'יש'}</td>
    <td class="key">שליטה אוטומטית באורות גבוהים</td>
  </tr>
  <tr>
    <td>${test(d[1].zihuy_tamrurey_tnua_ind) == 0 ? 'אין' : 'יש'}</td>
    <td class="key">זיהוי תמרורי תנועה</td>
  </tr>
  <tr>
    <td>${test(d[1].zihuy_matzav_hitkarvut_mesukenet_ind) == 0 ? 'אין' : 'יש'}</td>
    <td class="key">זיהוי התקרבות מסוכנת</td>
  </tr>
  ${necha}
</table>

<div style="text-align: right;padding: 5px 30px;font-size: 22px;font-weight: 600;">:מידע מתקדם</div>


<table>
<tr>
  <td>${test(d[0].tozeret_cd)}</td>
  <td class="key">קוד תוצר</td>
</tr>
<tr>
  <td>${test(d[0].degem_manoa)}</td>
  <td class="key">דגם מנוע</td>
</tr>
<tr>
  <td>${test(d[0].degem_cd)}</td>
  <td class="key">קוד דגם</td>
</tr>
<tr>
  <td>${test(d[0].degem_nm)}</td>
  <td class="key">שם דגם</td>
</tr>
<tr>
  <td>${test(d[0].kvutzat_zihum)}</td>
  <td class="key">קבוצת זיהום</td>
</tr>
<tr>
<td><div style="direction: rtl;">${test(d[0].mivchan_acharon_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
  <td class="key">מבחן טסט אחרון</td>
</tr>
<tr>
<td><div style="direction: rtl;">${test(d[0].tokef_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
  <td class="key">תוקף טסט</td>
</tr>
<tr>
  <td>${test(d[0].misgeret)}</td>
  <td class="key">מספר שילדה</td>
</tr>
<tr>
  <td>${test(d[0].tzeva_rechev)}</td>
  <td class="key">צבע רכב</td>
</tr>
<tr>
  <td>${test(d[0].zmig_kidmi)}</td>
  <td class="key">מידות צמיג קידמי</td>
</tr>
<tr>
  <td>${test(d[0].zmig_ahori)}</td>
  <td class="key">מידות צמיג אחורי</td>
</tr>
<tr>
  <td>${test(d[0].sug_delek_nm)}</td>
  <td class="key">סוג דלק</td>
</tr>
<tr>
  <td>${test(d[0].horaat_rishum)}</td>
  <td class="key">הוראת רשום</td>
</tr>
<tr>
  <td>${test(d[0].tzeva_cd)}</td>
  <td class="key">קוד צבע</td>
</tr>
</table>
`
    )
}



function test(text) {
    return text == null ? '' : text
}




{/* <tr>
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