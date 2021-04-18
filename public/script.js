let valueCarNumber = 1

function init() {
    const height = `${Number($("#WelcomCarNumber").css('height').split('p')[0]) / 2 - Number($("#WelcomCarNumber").css('border').split('p')[0]) * 2}px`
    $("#resetInputNumber").css({ 'top': height })
}

// מספר רכב אליהו 36-005-54

function ArrangeCarNumber() {
    $("#mes").html("")
    let CarNumber = $("#WelcomCarNumber").val().replace(/-/g, '')
    valueCarNumber = CarNumber
    if (CarNumber.length > 0) {
        $("#resetInputNumber").css('right', '30px');
    } else {
        $("#resetInputNumber").css('right', '-100vw');
    }
    if (isNaN(Number(CarNumber))) {
        $("#WelcomCarNumber").css({ 'color': 'red', 'border-color': 'red' })
    } else {
        $("#WelcomCarNumber").css({ 'color': 'black', 'border-color': 'black' })
    }
    if (CarNumber.length == 3) {
        CarNumber = CarNumber.substring(0, 2) + "-" + CarNumber.substring(2, 3)
    } else if (CarNumber.length == 4) {
        CarNumber = CarNumber.substring(0, 2) + "-" + CarNumber.substring(2, 4)
    } else if (CarNumber.length == 5) {
        CarNumber = CarNumber.substring(0, 2) + "-" + CarNumber.substring(2, 5)
    } else if (CarNumber.length == 6) {
        CarNumber = CarNumber.substring(0, 2) + "-" + CarNumber.substring(2, 5) + "-" + CarNumber.substring(5, 6)
    } else if (CarNumber.length == 7) {
        CarNumber = CarNumber.substring(0, 2) + "-" + CarNumber.substring(2, 5) + "-" + CarNumber.substring(5, 7)
    } else if (CarNumber.length == 8) {
        CarNumber = CarNumber.substring(0, 3) + "-" + CarNumber.substring(3, 5) + "-" + CarNumber.substring(5, 8)
    }
    $("#WelcomCarNumber").val(CarNumber)
}



function CheckCar() {
    console.log(valueCarNumber.length)
    try {
        if (!Number(valueCarNumber)) {
            $("#mes").html('נא להזין ספרות בלבד')
        }
        else {
            if (valueCarNumber.length < 7 || valueCarNumber.length == undefined) {
                $("#mes").html('נא להזין מספר רכב בין 7/8 ספרות')
            } else {
                $("#mes").html('<img style="width: 45px;" src="img/gifSearch.gif" alt="Search">')
                $("#WelcomBt").hide()
                fetch('/getData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ valueCarNumber })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            printingData(data)
                            $(".Welcom .logo img").css({ 'height': '200px', 'transition': 'all 0.3s' })
                            $(".Welcom").hide();
                            $(".cardTable").show();
                        }
                        else {
                            $("#WelcomBt").show()
                            $("#mes").html('מספר רכב לא קיים במאגר')
                        }
                    })
            }
        }
    } catch (err) {
        console.log(err)
    }
}


$("#WelcomCarNumber").focus(function () {
    if ($("#WelcomCarNumber").val().length > 0) {
        $("#resetInputNumber").css('right', '30px');
    }
    $(".Welcom .logo img").css({ 'height': '80px', 'transition': 'all 0.3s' })
    setTimeout(function () { $('html,body').scrollTop(0); }, 50);
});



$("#resetInputNumber").click(function () {
    $("#mes").html('')
    $("#WelcomCarNumber").val('')
    $("#WelcomCarNumber").focus()
    $("#WelcomCarNumber").css({ 'color': 'black', 'border-color': 'black' })
    $("#resetInputNumber").css('right', '-100vw')
});


$("#WelcomCarNumber").focusout(function () {
    setTimeout(function () { $("#resetInputNumber").css('right', '-100vw'); }, 100);
});


$("#reternWelcom").click(function () {
    $("#mes").html('')
    $("#WelcomCarNumber").val('')
    $("#WelcomCarNumber").focus()
    $("#WelcomCarNumber").css({ 'color': 'black', 'border-color': 'black' })
    $(".cardTable").hide();
    $(".Welcom").show();
    $("#WelcomCarNumber").focus()
    $("#WelcomBt").show();
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
            <td>${x[6]}${x[7]}/ ${x[4]}${x[5]}/ ${x[0]}${x[1]}${x[2]}${x[3]}</td>
            <td class="key">תאריך הפקת תו</td>
       </tr>`
    }


    $(".addTable").html(
        `<table>
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
    </tr>
    <tr>
        <td>${test(d[0].shnat_yitzur)}</td>
        <td class="key">שנת יצור</td>
    </tr>
   <tr>
     <td>${test(d[0].ramat_gimur)}</td>
     <td class="key">רמת גימור</td>
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
     <td style="direction: rtl;">${test(d[1].kosher_grira_im_blamim)} ק"ג</td>
     <td class="key">כושר גרירה עם בלמים</td>
   </tr>
   <tr>
     <td style="direction: rtl;">${test(d[1].kosher_grira_bli_blamim)} ק"ג</td>
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
<td style="direction: rtl;">${test(d[0].mivchan_acharon_dt.split('T')[0]).replace(/-/g, '/ ')}</td>
  <td class="key">מבחן טסט אחרון</td>
</tr>
<tr>
<td style="direction: rtl;">${test(d[0].tokef_dt.split('T')[0]).replace(/-/g, '/ ')}</td>
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

