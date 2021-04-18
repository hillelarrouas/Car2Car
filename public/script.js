$("#WelcomCarNumber").focus()
let valueCarNumber = 1


function ArrangeCarNumber() {
    $("#mes").html("")
    let CarNumber = $("#WelcomCarNumber").val().replace(/-/g, '')
    valueCarNumber = CarNumber

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
    if (!Number(valueCarNumber)) {
        $("#mes").html('נא להזין ספרות בלבד')
    }
    else {
        if (valueCarNumber.length < 7) {
            $("#mes").html('נא להזין מספר רכב בין 7/8 ספרות')
        } else {
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
                        $(".Welcom").hide();
                        $(".cardTable").show();
                    }
                    else {
                        $("#mes").html('מספר רכב לא קיים במאגר')
                    }
                })
        }
    }
}




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
        `
<table>
    <tr>
        <td>${test(d[0].mispar_rechev)}</td>
        <td class="key">מספר רכב</td>
    </tr>
    <tr>
        <td>${test(d[0].shnat_yitzur)}</td>
        <td class="key">שנת יצור</td>
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
      <td class="key">גיר</td>
    </tr> 
    <tr>
      <td>${test(d[1].mispar_kariot_avir)}</td>
      <td class="key">מספר כריות אוויר</td>
   </tr>
    <tr>
      <td>${test(d[1].halon_bagg_ind) == 0 ? 'לא' : "כן"}</td>
      <td class="key">חלון בגג</td>
   </tr>
    <tr>
        <td>${test(d[0].tozeret_cd)}</td>
        <td class="key">קוד תוצר</td>
    </tr>
    <tr>
        <td>${test(d[0].sug_degem)}</td>
        <td class="key">סוג דגם</td>
    </tr>
    <tr>
        <td>${test(d[0].degem_manoa)}</td>
        <td class="key">דגם מנוע</td>
    </tr>
    <tr>
        <td>${test(d[0].baalut)}</td>
        <td class="key">בעלות</td>
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
        <td>${test(d[0].ramat_eivzur_betihuty)}</td>
        <td class="key">רמת איבזור בטיחות</td>
    </tr>
    <tr>
        <td>${test(d[0].kvutzat_zihum)}</td>
        <td class="key">קבוצת זיהום</td>
    </tr>
    <tr>
        <td>${test(d[0].mivchan_acharon_dt.split('T')[0]).replace(/-/g, '/ ')}</td>
        <td class="key">מבחן שנתי אחרון</td>
    </tr>
    <tr>
        <td>${test(d[0].tokef_dt.split('T')[0]).replace(/-/g, '/ ')}</td>
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
        <td>${test(d[0].kinuy_mishari)}</td>
        <td class="key">כינוי מסחרי</td>
    </tr>
    <tr>
        <td>${test(d[0].tzeva_cd)}</td>
        <td class="key">קוד צבע</td>
    </tr>
    ${necha}
</table>`
    )
}




function test(text) {
    return text == null ? '' : text
}