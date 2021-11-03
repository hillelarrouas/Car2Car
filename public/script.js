function init() {
    const heightinputnumbercar = `${Number($("#WelcomCarNumber").css('height').split('p')[0]) / 2 - Number($("#WelcomCarNumber").css('border').split('p')[0]) * 2}px`
    $("#resetInputNumber").css({ 'top': heightinputnumbercar })
    const heightinputtellogin = `${Number($("#inputTelLogin").css('height').split('p')[0]) / 2 + Number($("#inputTelLogin").css('border').split('p')[0]) * 5}px`
    $("#resetInputtellogin").css({ 'top': heightinputtellogin })
    const heightinputPassLogin = `${Number($("#inputPassLogin").css('height').split('p')[0]) / 2 + Number($("#inputPassLogin").css('border').split('p')[0]) * 5}px`
    $("#resetInputpasslogin").css({ 'top': heightinputPassLogin })

    if (localStorage.getItem('SearchHistory') == null) {
        localStorage.setItem('SearchHistory', '[]');
    }


    if (!isNaN(GetURLParameter("CarNum")) && GetURLParameter("CarNum").length > 0) {
        SearchCar(GetURLParameter("CarNum"))
    }

}






var TopElement = []
function ShowOnTop(ElementId) {
    for (var i = 0; i < TopElement.length; i++) {
        if (TopElement[i] == ElementId) { TopElement.splice(i, 1); continue; }
    }
    TopElement.unshift(ElementId)
    for (var i = 0; i < TopElement.length; i++) {
        $('#' + TopElement[i]).css('z-index', (888 - i));
    }
    $('#' + ElementId).show()
}





function GetSearchHistory(Action, Data) {
    let StorageSearchHistory = JSON.parse(localStorage.getItem('SearchHistory'))
    switch (Action) {
        case 'GetHistory':
            $('#BtDeleteAllHistory').show()
            let datahtml = ''
            if (StorageSearchHistory.length == 0) {
                datahtml = `<div style="direction: rtl;padding: 0px 0 20px;font-weight: 600;font-size: 19px;color: #463808;">ההיסטוריה ריקה..</div>`
                $('#BtDeleteAllHistory').hide()
            }
            StorageSearchHistory.forEach(element => {
                datahtml += `<div style="padding: 5px; margin: 10px;background: #f5f5dc4a;box-sizing: border-box;border-radius: 3px;border: 2px solid #f1f1f147;">
                            <div onclick='SearchCar("${element.mispar_rechev}")' style="width: min-content;padding: 0 10px;margin:0 auto 3px;border-radius:5px;background:#ebebeb96;cursor: pointer;color:#6f5a0c;font-weight: bold;font-size:20px">${element.mispar_rechev}</div>
                            <div>${element.shnat_yitzur} | ${element.kinuy_mishari} | ${element.tozeret_nm}</div>
                            <hr style="border: 1px solid #a7891e36;margin: 4px auto;width: 62%;">
                            <div>${element.Date}</div></div>`
            });
            $('#cardHistory').html(datahtml)
            ShowOnTop('WindowAllHistory')
            break;


        case 'DeleteAll':
            Swal.fire({
                title: 'שים לב!',
                text: 'ההסטוריה תימחק ולא ניתן לשחזר',
                icon: 'warning',
                iconColor: '#a7891e',
                showCancelButton: true,
                cancelButtonText: 'לא למחוק',
                cancelButtonColor: '#a67100',
                confirmButtonText: 'למחוק',
                confirmButtonColor: '#545454',
                focusCancel: true
            }).then(res => {
                if (res.isConfirmed == true) {
                    StorageSearchHistory = [Data, ...StorageSearchHistory]
                    localStorage.setItem('SearchHistory', '[]');
                    $('#WindowAllHistory').hide()
                }
            })
            break;
        case 'AddHistory':
            StorageSearchHistory = StorageSearchHistory.filter(elm => elm.mispar_rechev !== Data.mispar_rechev)
            StorageSearchHistory = [Data, ...StorageSearchHistory]
            localStorage.setItem('SearchHistory', JSON.stringify(StorageSearchHistory));
            break;

        default:
            return ''
    }
}


function SearchCar(Car) {
    $("#WindowAllHistory").hide()
    $("#WelcomCarNumber").val(Car)
    ArrangeCarNumber()
    CheckCar()
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


function CheckCar() {
    try {
        let CarNumber = $("#WelcomCarNumber").val().replace(/-/g, '')
        if (CarNumber.length == 0) {
            $("#ErrorMsg").html('נא להקליד מספר רכב')
            $('#WelcomCarNumber').focus()
        } else {
            let FixedCarNumber = $("#WelcomCarNumber").val().replace(/-/g, '')
            for (i = 0; i < String(FixedCarNumber).length; i++) {
                if (String(FixedCarNumber[i]) == ' ') {
                    $("#ErrorMsg").html('נא להזין מספר רכב ללא רווחים')
                    return false
                }
            }
            if (!Number(CarNumber) && CarNumber[0] != '0') {
                $("#ErrorMsg").html('נא להזין מספר רכב בספרות בלבד')
                $('#WelcomCarNumber').focus()
            }
            else {
                if (CarNumber.length < 7 || CarNumber.length == undefined) {
                    $("#ErrorMsg").html('נא להזין מספר רכב בין 7 או 8 ספרות')
                    $('#WelcomCarNumber').focus()
                } else {
                    $("#ErrorMsg").html('')
                    $("#WelcomBt").hide()
                    $("#WelcomWait").show()

                    //https://car2car.herokuapp.com/getData
                    fetch('getData', {
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
                                printingData(data[0])
                                $(".Welcom .logo img").css({ 'height': '200px', 'transition': 'all 0s' })
                                $("#cardmesadduser").css({ 'height': '0px' })
                                $(".Welcom").hide();
                                $(".cardTable").show();
                                window.history.pushState("object or string", "", "?CarNum=" + CarNumber);
                                GetSearchHistory('AddHistory', { tozeret_nm: test(data[0].tozeret_nm), kinuy_mishari: test(data[0].kinuy_mishari), mispar_rechev: test(data[0].mispar_rechev), shnat_yitzur: test(data[0].shnat_yitzur), Date: `${Numtime(new Date().getDate())}/${Numtime(new Date().getMonth() + 1)}/${new Date().getFullYear()} | ${Numtime(new Date().getHours())}:${Numtime(new Date().getMinutes())}` })
                            }
                            else {
                                $("#WelcomBt").show()
                                $("#ErrorMsg").html('מספר רכב לא קיים במאגר')
                                window.history.replaceState(null, null, window.location.pathname);
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
// getDate(20/01/2021)
function getDate(data) {
    data = data.split('/')
    data = new Date().setFullYear(data[0], data[1], data[2]) - new Date().setFullYear(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    data = data / 24
    data = data / 60
    data = data / 60
    data = data / 1000
    return data
}


function Numtime(time) {
    if (time < 10) {
        return "0" + time
    } else {
        return time
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
    if ($("#inputTelLogin").val().length > 0 && $(".cardPass").css('display') == 'none') {
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
    window.history.replaceState(null, null, window.location.pathname);
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
    if (valueTel == '') {
        $("#ErrorMsgLogin").html('הזן מספר טלפון בין 9/ 10 ספרות')
    } else {
        if (valueTel.length != 9 && valueTel.length != 10) {
            $("#ErrorMsgLogin").html('מספר טלפון לא תקין, הזן מספר בין 9 / 10 ספרות בלבד')
        } else {
            if (valueTel == '054504') {
                $("#ErrorMsgLogin").html()
                $('#inputTelLogin').attr('readonly', true);
                $(".cardPass").show()
                $("#inputPassLogin").focus()
                init()

                if ($("#inputTelLogin").val().replace(/-/g, '') == '054504' && $("#inputPassLogin").val() == '12345') {
                    $("#ErrorMsgLogin").html('הכניסה אושרה')
                    setTimeout(function () { $("#cardfixedhide").click() }, 800);
                }
            }
        }
    }
});



function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0].toLowerCase() == sParam.toLowerCase()) {
            return sParameterName[1];
        }
    }
    return ''
}




function printingData(d) {
    console.log(d)
    $(".addTable").html('')
    switch (d.type) {
        case "Normal":

            let CountTime = getDate(test(d.data1.tokef_dt.split('T')[0]).replace(/-/g, '/'))
            if (CountTime == 0) {
                Swal.fire({
                    title: 'שים לב!',
                    text: 'תוקף טסט נגמר היום',
                    icon: 'warning',
                    iconColor: '#b6925e',
                    confirmButtonText: 'אישור',
                    confirmButtonColor: '#b6925e',
                })
            } else if (CountTime < 0) {
                Swal.fire({
                    title: 'שים לב!',
                    text: `תוקף טסט פג לפני ${Math.abs(CountTime)} ימים`,
                    icon: 'warning',
                    iconColor: '#b6925e',
                    confirmButtonText: 'אישור',
                    confirmButtonColor: '#b6925e',
                })
            } else if (CountTime <= 30) {
                Swal.fire({
                    title: 'שים לב!',
                    text: `נשארו ${CountTime} ימים לתוקף טסט`,
                    icon: 'warning',
                    iconColor: '#b6925e',
                    confirmButtonText: 'אישור',
                    confirmButtonColor: '#b6925e',
                })
            }




            let necha;
            if (d.tgncha == undefined) {
                necha = `<tr>
              <td class="key">תו נכה</td>
              <td>אין</td>
            </tr>`
            }
            else {
                const x = String(d.tgncha['TAARICH HAFAKAT TAG'])
                necha = `<tr>
              <td class="key">תו נכה - סוג תו</td>
                  <td>${test(d.tgncha['SUG TAV']) == '01' ? 'תו נכה רגיל' : 'תג נכה על כיסא גלגלים'}</td>
             </tr>
             <tr>
                  <td class="key">תאריך הפקת תו</td>
                  <td>${x[6]}${x[7]}/${x[4]}${x[5]}/${x[0]}${x[1]}${x[2]}${x[3]}</td>
             </tr>`
            }


            $(".addTable").html(
                `<div dir="rtl" style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);"><div style='display:inline-block'>${test(d.data2.tozar)}</div> | <div  style='display:inline-block'>${test(d.data1.kinuy_mishari)}</div> | <div  style='display:inline-block'>${test(d.data1.shnat_yitzur)}</div></div>
      <table>
          <tr>
              <td class="key">מספר רכב</td>
              <td>${test(d.data1.mispar_rechev)}</td>
          </tr>
          <tr>
              <td class="key">נפח מנוע</td>
              <td><div style="direction: rtl;">${test(d.data2.nefah_manoa)} סמ"ק</div></td>
          </tr>
          <tr>
              <td class="key">כח סוס</td>
              <td><div style="direction: rtl;">${test(d.data2.koah_sus)} כ"ס</div></td>
          </tr>
          <tr>
              <td class="key">הנעה</td>
              <td>${test(d.data2.hanaa_nm)}</td>
          </tr>
          <tr>
              <td class="key">רמת גימור</td>
              <td>${test(d.data1.ramat_gimur)}</td>
          </tr>
          <tr>
              <td class="key">משקל כולל</td>
              <td style="direction: rtl;">${test(d.data2.mishkal_kolel)} ק"ג</td>
          </tr>
          <td class="key">
              <div style="display: inline-flex;">
                  יחס משקל לכ"ס<br />
                  <div class="popup">
                      ?<span class="popuptext" id="myPopup">המספר מייצג את המשקל לכל כ״ס בודד. ככל שיחס המשקל נמוך, כך התאוצה טובה יותר.</span>
                  </div>
              </div>
          </td>
          <td><div>${parseFloat(test(d.data2.mishkal_kolel) / test(d.data2.koah_sus)).toFixed(1)}</div></td>
          </tr>
          <tr>
              <td class="key">תיבת הילוכים</td>
              <td>${test(d.data2.automatic_ind) == 1 ? 'אוטומטי' : 'ידני'}</td>
          </tr>
      </table>
      
      <div style="text-align: right;padding: 5px 30px;font-size: 22px;font-weight: 600;">אבזור ובטיחות:</div>
      
      <table>
          <tr>
              <td class="key">רמת איבזור בטיחות</td>
              <td>${test(d.data2.ramat_eivzur_betihuty)}</td>
          </tr>
          <tr>
              <td class="key">מספר כריות אוויר</td>
              <td>${test(d.data2.mispar_kariot_avir)}</td>
          </tr>
          <tr>
              <td class="key">ABS</td>
              <td>${test(d.data2.abs_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">חלון בגג</td>
              <td>${test(d.data2.halon_bagg_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">הגה כח</td>
              <td>${test(d.data2.hege_koah_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
      
          <tr>
              <td class="key">בקרת יציבות</td>
              <td>${test(d.data2.bakarat_yatzivut_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">בקרת סטיה מנתיב</td>
              <td>${test(d.data2.bakarat_stiya_menativ_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">ניתור מרחק מלפנים</td>
              <td>${test(d.data2.nitur_merhak_milfanim_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">זיהוי שטח מת</td>
              <td>${test(d.data2.zihuy_beshetah_nistar_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">בקרת שיוט אדפטיבית</td>
              <td>${test(d.data2.bakarat_shyut_adaptivit_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">זיהוי הולכי רגל</td>
              <td>${test(d.data2.zihuy_holchey_regel_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">מצלמת רוורס מהיצרן</td>
              <td>${test(d.data2.matzlemat_reverse_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">חיישני לחץ אוויר בצמיגים</td>
              <td>${test(d.data2.hayshaney_lahatz_avir_batzmigim_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">חיישני חגורות בטיחות</td>
              <td>${test(d.data2.hayshaney_hagorot_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">תאורה אוטומטית בנסיעה קדימה</td>
              <td>${test(d.data2.teura_automatit_benesiya_kadima_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">שליטה אוטומטית באורות גבוהים</td>
              <td>${test(d.data2.shlita_automatit_beorot_gvohim_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">זיהוי תמרורי תנועה</td>
              <td>${test(d.data2.zihuy_tamrurey_tnua_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
          <tr>
              <td class="key">זיהוי התקרבות מסוכנת</td>
              <td>${test(d.data2.zihuy_matzav_hitkarvut_mesukenet_ind) == 0 ? 'אין' : 'יש'}</td>
          </tr>
      
      </table>
      
      <div style="text-align: right;padding: 5px 30px;font-size: 22px;font-weight: 600;">מידע נוסף:</div>
      
      
      <table>
          <tr>
              <td class="key">מספר דלתות</td>
              <td>${test(d.data2.mispar_dlatot)}</td>
          </tr>
          <tr>
              <td class="key">מספר מושבים</td>
              <td>${test(d.data2.mispar_moshavim)}</td>
          </tr>
          <tr>
              <td class="key">קוד תוצר</td>
              <td>${test(d.data1.tozeret_cd)}</td>
          </tr>
          <tr>
              <td class="key">קוד דגם</td>
              <td>${test(d.data1.degem_manoa)}</td>
          </tr>
          <tr>
              <td class="key">קוד דגם</td>
              <td>${test(d.data1.degem_cd)}</td>
          </tr>
          <tr>
              <td class="key">שם דגם</td>
              <td>${test(d.data1.degem_nm)}</td>
          </tr>
          <tr>
              <td class="key">קבוצת זיהום</td>
              <td>${test(d.data1.kvutzat_zihum)}</td>
          </tr>
          <tr>
              <td class="key">מבחן טסט אחרון</td>
              <td><div style="direction: ltr;">${test(d.data1.mivchan_acharon_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
          </tr>
          <tr>
              <td class="key">תוקף טסט</td>
              <td><div style="direction: ltr;">${test(d.data1.tokef_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
          </tr>
          <tr>
              <td class="key">מספר שילדה</td>
              <td>${test(d.data1.misgeret)}</td>
          </tr>
          <tr>
              <td class="key">צבע רכב</td>
              <td>${test(d.data1.tzeva_rechev)}</td>
          </tr>
          <tr>
              <td class="key">מידות צמיג קידמי</td>
              <td>${test(d.data1.zmig_kidmi)}</td>
          </tr>
          <tr>
              <td class="key">מידות צמיג אחורי</td>
              <td>${test(d.data1.zmig_ahori)}</td>
          </tr>
          <tr>
              <td class="key">סוג דלק</td>
              <td>${test(d.data1.sug_delek_nm)}</td>
          </tr>
          <tr>
              <td class="key">הוראת רשום</td>
              <td>${test(d.data1.horaat_rishum)}</td>
          </tr>
          <tr>
              <td class="key">קוד צבע</td>
              <td>${test(d.data1.tzeva_cd)}</td>
          </tr>
          <tr>
              <td class="key">בעלות</td>
              <td>${test(d.data1.baalut)}</td>
          </tr>
          ${necha}
      </table>
      `
            )


            $('.popup').hover(function () {
                $('.popup').addClass('popupOpen')
            })

            $('.popup').click(function () {
                $('.popup').addClass('popupOpen')
            })

            $('.popup').mouseleave(function () {
                $('.popup').removeClass('popupOpen')
            })

            $(window).scroll(function () {
                $('.popup').removeClass('popupOpen')
            });
            break;
        case "PersonalImports":

            $(".addTable").html(
                `<div dir="rtl" style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);"><div  style='display:inline-block'>${test(d.data1.tozeret_nm)}</div> | <div  style='display:inline-block'>${test(d.data1.shnat_yitzur)}</div></div>
            <table>
            <tr>
            <td class="key">סטטוס רכב</td>
              <td>ייבוא אישי</td>
         </tr>
            <tr>
               <td class="key">מספר רכב</td>
                 <td>${test(d.data1.mispar_rechev)}</td>
            </tr>
            <tr>
               <td class="key">סוג ייבוא</td>
               <td><div style="direction: rtl;">${test(d.data1.sug_yevu)}</div></td>
           </tr>
            <tr>
                <td class="key">נפח מנוע</td>
                <td><div style="direction: rtl;">${test(d.data1.nefach_manoa)} סמ"ק</div></td>
            </tr>
            <tr>
                <td class="key">דגם מנוע</td>
                <td><div style="direction: rtl;">${test(d.data1.degem_manoa)}</div></td>
            </tr>
            <tr>
                <td class="key">משקל כולל</td>
                <td><div style="direction: rtl;">${test(d.data1.mishkal_kolel)}</div></td>
            </tr>
            <tr>
              <td class="key">סוג דלק</td>
              <td><div style="direction: rtl;">${test(d.data1.sug_delek_nm)}</div></td>
           </tr>
            <tr>
                <td class="key">מועד עליה לכביש</td>
                <td><div style="direction: rtl;">${test(d.data1.moed_aliya_lakvish.replace(/-/g, '/'))}</div></td>
            </tr>
            <tr>
                <td class="key">מבחן טסט אחרון</td>
                <td><div style="direction: ltr;">${test(d.data1.mivchan_acharon_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
            </tr>
            <tr>
                 <td class="key">תוקף טסט</td>
               <td><div style="direction: ltr;">${test(d.data1.tokef_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
           </tr>
      </table>
      `
            )
            break;



            case "Motorcycle":

                $(".addTable").html(
                    `<div dir="rtl" style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);"><div  style='display:inline-block'>${test(d.data1.tozeret_nm)}</div> | <div  style='display:inline-block'>${test(d.data1.shnat_yitzur)}</div></div>
                <table>
                <tr>
                <td class="key">סוג רכב</td>
                  <td>רכב דו גלגלי</td>
             </tr>
                <tr>
                    <td class="key">מספר רכב</td>
                    <td>${test(d.data1.mispar_rechev)}</td>
                </tr>
                <tr>
                    <td class="key">דגם</td>
                     <td><div style="direction: rtl;">${test(d.data1.degem_nm)}</div></td>
                </tr>
                <tr>
                      <td class="key">נפח מנוע</td>
                      <td><div style="direction: rtl;">${test(d.data1.nefach_manoa)} סמ"ק</div></td>
                </tr>
                <tr>
                    <td class="key">הספק מנוע</td>
                   <td><div style="direction: rtl;">${test(d.data1.hespek)}</div></td>
                </tr>
                <tr>
                   <td class="key">משקל כולל</td>
                    <td><div style="direction: rtl;">${test(d.data1.mishkal_kolel)}</div></td>
                </tr>
                <tr>
                     <td class="key">סוג דלק</td>
                     <td><div style="direction: rtl;">${test(d.data1.sug_delek_nm)}</div></td>
                 </tr>
                <tr>
                      <td class="key">קוד עומס צמיג קדמי</td>
                      <td><div style="direction: rtl;">${test(d.data1.kod_omes_zmig_kidmi)}</div></td>
                </tr>
                <tr>
                      <td class="key">קוד עומס צמיג אחורי</td>
                      <td><div style="direction: rtl;">${test(d.data1.kod_omes_zmig_ahori)}</div></td>
                </tr>
                <tr>
                      <td class="key">מידה צמיד קדמי</td>
                      <td><div style="direction: rtl;">${test(d.data1.mida_zmig_kidmi)}</div></td>
                </tr>
                <tr>
                      <td class="key">מידה צמיד אחורי</td>
                      <td><div style="direction: rtl;">${test(d.data1.mida_zmig_ahori)}</div></td>
                </tr>
                <tr>
                        <td class="key">מספר שילדה</td>
                      <td><div style="direction: rtl;">${test(d.data1.misgeret)}</div></td>
                </tr>
          </table>
          `
                )
                break;


                case "Big":
                    $(".addTable").html(
                        `<div dir="rtl" style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);"><div  style='display:inline-block'>${test(d.data1.tozeret_nm)}</div> | <div  style='display:inline-block'>${test(d.data1.shnat_yitzur)}</div></div>
                    <table>
                    <tr>
                       <td class="key">מספר רכב</td>
                         <td>${test(d.data1.mispar_rechev)}</td>
                    </tr>
                    <tr>
                        <td class="key">נפח מנוע</td>
                        <td><div style="direction: rtl;">${test(d.data1.nefach_manoa)} סמ"ק</div></td>
                   </tr>
                   <tr>
                       <td class="key">סוג דלק</td>
                       <td><div style="direction: rtl;">${test(d.data1.sug_delek_nm)}</div></td>
                   </tr>
                    <tr>
                        <td class="key">דגם מנוע</td>
                        <td><div style="direction: rtl;">${test(d.data1.degem_manoa)}</div></td>
                    </tr>
                    <tr>
                        <td class="key">משקל כולל</td>
                        <td><div style="direction: rtl;">${test(d.data1.mishkal_kolel)}</div></td>
                    </tr>
                    <tr>
                        <td class="key">משקל עצמי</td>
                        <td><div style="direction: rtl;">${test(d.data1.mishkal_azmi)}</div></td>
                    </tr>
                    <tr>
                      <td class="key">מספר שילדה</td>
                      <td><div style="direction: rtl;">${test(d.data1.mispar_shilda)}</div></td>
                </tr>
              </table>
              `)
                    break;

                    

                case "GotOff":
                        $(".addTable").html(
                            `<div dir="rtl" style="text-align: center;font-size: x-large;padding: 10px 0;font-weight: 600;text-shadow: 2px 2px 9px rgb(254 250 220);"><div  style='display:inline-block'>${test(d.data1.tozeret_nm)}</div> | <div  style='display:inline-block'>${test(d.data1.shnat_yitzur)}</div></div>
                        <table>
                        <tr>
                        <td class="key">סטטוס רכב</td>
                          <td>ירד מהכביש ב - ${test(d.data1.bitul_dt.split('T')[0]).replace(/-/g, '/')}</td>
                     </tr>
                        <tr>
                           <td class="key">מספר רכב</td>
                             <td>${test(d.data1.mispar_rechev)}</td>
                        </tr>
                        <tr>
                        <td class="key">סוג רכב</td>
                        <td><div style="direction: rtl;">${test(d.data1.baalut)}</div></td>
                   </tr>
                        <tr>
                            <td class="key">נפח מנוע</td>
                            <td><div style="direction: rtl;">${test(d.data1.nefach_manoa)} סמ"ק</div></td>
                       </tr>
                       <tr>
                           <td class="key">סוג דלק</td>
                           <td><div style="direction: rtl;">${test(d.data1.sug_delek_nm)}</div></td>
                       </tr>
                        <tr>
                            <td class="key">דגם מנוע</td>
                            <td><div style="direction: rtl;">${test(d.data1.degem_manoa)}</div></td>
                        </tr>
                        <tr>
                            <td class="key">משקל כולל</td>
                            <td><div style="direction: rtl;">${test(d.data1.mishkal_kolel)}</div></td>
                        </tr>
                        <tr>
                            <td class="key">משקל עצמי</td>
                            <td><div style="direction: rtl;">${test(d.data1.mishkal_azmi)}</div></td>
                        </tr>
                        <tr>
                        <td class="key">מספר מנוע</td>
                        <td><div style="direction: rtl;">${test(d.data1.mispar_manoa)}</div></td>
                   </tr>
                        <tr>
                          <td class="key">מספר שילדה</td>
                          <td><div style="direction: rtl;">${test(d.data1.misgeret)}</div></td>
                    </tr>
                    <tr>
                    <td class="key">תאריך עליה לכביש</td>
                    <td><div style="direction: rtl;">${test(d.data1.moed_aliya_lakvish)}</div></td>
               </tr> 
               <tr>
               <td class="key">תאריך ירידה מהכביש</td>
               <td><div style="direction: rtl;">${test(d.data1.bitul_dt.split('T')[0]).replace(/-/g, '/')}</div></td>
          </tr>
          <tr>
          <td class="key">צבע רכב</td>
          <td><div style="direction: rtl;">${test(d.data1.tzeva_rechev)}</div></td>
     </tr>
     <tr>
     <td class="key">צמיג אחורי</td>
     <td><div style="direction: rtl;">${test(d.data1.zmig_ahori)}</div></td>
</tr>
<tr>
<td class="key">צמיג קדמי</td>
<td><div style="direction: rtl;">${test(d.data1.zmig_kidmi)}</div></td>
</tr>
                  </table>
                  `
                        )
        
                    break;

        default:
            console.log("none")
    }

}


function test(text) {
    return text == null ? '' : text
}







function getCookie(searchCar) {
    let car = searchCar + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (i = 0; i < ca.length; i++) {
        let g = new RegExp(car, 'g')
        if (g.test(ca[i])) {
            return ca[i]
        } else {
            return "";
        }
    }
}




const clickBt = document.querySelectorAll(".clickBt")

clickBt.forEach(elm => {
    elm.addEventListener('click', function (e) {
        console.log(e.clientX)
        console.log(e.target.offsetLeft)
        const x = e.clientX - e.target.offsetLeft
        const y = e.clientY - e.target.offsetTop

        let createElemnt = document.createElement('span');
        createElemnt.style.left = x + "px"
        createElemnt.style.top = y + "px"
        this.appendChild(createElemnt)

        setTimeout(() => {
            createElemnt.remove()
        }, 5000)
    })
})


