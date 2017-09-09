// change amout of forms
function clickCounter() {
    if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
    }
    else {
        sessionStorage.clickcount = 0;
    }
    add(sessionStorage.clickcount);
}

Dir = "Files/"

// get the year to present
function GetYear()
{
    var arr;
    arr = getCSV("years.csv");
    Dir += arr[0][1] + "/";
}

// change out type
function changeOut(out) {
    var form = document.getElementById("form"), i;
    if (out.value == 0) {
        out.value = '1';
        form.elements['dadId'].placeholder = "מספר דרכון אב";
        document.getElementById('dadId').innerHTML = "<span class=\"w3-text-red\">*</span>מספר דרכון אב";
        form.elements['momId'].placeholder = "מספר דרכון אם";
        document.getElementById('momId').innerHTML = "<span class=\"w3-text-red\">*</span>מספר דרכון אם";
        for (i = 0; i <= sessionStorage.clickcount; i++) {
            document.getElementById('studentId' + i).innerHTML = "<span class=\"w3-text-red\">*</span>מספר דרכון";
            form.elements['idchiled' + i].placeholder = "מספר דרכון מתעמלת";
        }
        return;
    }
    if (out.value == 1) {
        out.value = '0';
        form.elements['dadId'].placeholder = "תעודת זהות אב";
        document.getElementById('dadId').innerHTML = "תעודת זהות אב<span class=\"w3-text-red\">*</span>";
        form.elements['momId'].placeholder = "תעודת זהות אם";
        document.getElementById('momId').innerHTML = "תעודת זהות אם<span class=\"w3-text-red\">*</span>";
        for (i = 0; i <= sessionStorage.clickcount; i++) {
            document.getElementById('studentId' + i).innerHTML = "<span class=\"w3-text-red\">*</span>תעודת זהות";
            form.elements['idchiled' + i].placeholder = "תעודת זהות מתעמלת";
        }
        validateDadId();
        validateMomId();
        return;
    }
}
// set possible years of birth
function setYears(num) {
    var d = new Date(), i;
    var min = d.getFullYear() - 20;
    var max = d.getFullYear() - 4;
    var text = "<select  style=\"text-align:right\"  class=' w3-right w3-text-right w3-select' name=\"birthDateYear" + num + "\" required><option style=\"text-align:right\" ></option>";
    for (i = min; i <= max; i++) {
        text += "<option style=\"text-align:right\"  value=\"" + i + "\">" + i + "</option>";
    }
    text += "</select>";
    return text;
}
// set form action
function setAction(i) {
    var form = document.getElementById("form");
    form.action = "/index.files/a.php?num=" + i + "&price=" + sessionStorage.price + "&numOfPay=" + form.elements['numOfPay'].value + "&out=" + document.getElementById('out').value;
}
// add a section of the form
function add(i) {
    var para = document.createElement("span");
    para.id = String(i);
    var bef = document.getElementById("add");
    var form = document.getElementById("form");
    var stri = "<div class=\"w3-border w3-border-red w3-container w3-indigo w3-padding-small\"><div class=\"w3-row-padding\">\
            <div class=\"w3-col  w3-right w3-text-right\" style=\"width:20%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>שם המתעמל/ת</label>\
                <input class=\"w3-input   w3-right w3-text-right\" type=\"text\" name=\"name"+ i + "\" placeholder=\"שם המתעמל/ת\" style=\"text-align:right\" required>\
            </div>\
            <div class=\"w3-col  w3-right w3-text-right\" style=\"width:20%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\" id=\"studentId"+ i + "\">תעודת זהות</label>\
                <input class=\"w3-input w3-right w3-text-right\" onchange=\"validateStudentId("+ i + ")\" type=\"text\" name=\"idchiled" + i + "\" class=\"id\" placeholder=\"תעודת זהות מתעמלת\" style=\"text-align:right\"\
                    required>\
            </div>\
            <div class=\"w3-col  w3-right w3-text-right\" style=\"width:15%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>בי\"ס</label>\
                <input class=\"w3-input   w3-right w3-text-right\" type=\"text\" name=\"school"+ i + "\" placeholder='בי\"ס' style=\"text-align:right\" required>\
            </div>\
            <div class=\"w3-col w3-row w3-right w3-text-right\" style=\"width:25%\">\
                <div class=\"w3-col w3-right\" style=\"width:65%\">\
                    <label class=\"w3-text-white w3-label  w3-right w3-text-right\">טלפון מתעמל/ת</label>\
                    <input class=\"w3-input w3-right w3-text-right\" onchange=\"validateStudentNum("+ i + ")\" type=\"text\" name=\"phoneEnd" + i + "\" placeholder=\"טלפון מתעמל/ת\" style=\"text-align:right\">\
                </div>\
                <div class=\"w3-col w3-right\" style=\"width:10%\">\
                    <br>\
                    <input class=\"w3-input w3-right w3-text-right\" type=\"text\" value=\"-\" disabled>\
                </div>\
                <div class=\"w3-col w3-right\" style=\"width:25%\">\
                    <br>\
                    <input class=\"w3-input w3-right w3-text-right\" type=\"text\" name=\"phoneStart"+ i + "\" style=\"text-align:right\" onchange=\"validateStudentNum(" + i + ")\">\
                </div>\
            </div>\
            <div class=\"w3-col  w3-right w3-text-right\" style=\"width:20%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\">דוא\"ל מתעמל/ת</label>\
                <input class=\"w3-input   w3-right w3-text-right\" onchange=\"validateStudentMail("+ i + ")\" type=\"email\" name=\"email" + i + "\" placeholder=\"" + "דוא''ל מתעמל/ת" + "\" style=\"text-align:right\">\
            </div>\
        </div>\
        <div class=\"w3-row-padding\">\
        <h6 class=\"w3-col w3-text-white  w3-right w3-text-right\" style=\"width:13%\"><span class=\"w3-text-red\">*</span>תאריך לידה:<h6>\
        <div class=\"w3-row w3-col  w3-right w3-text-right\" style=\"width:50%\">\
            <div class=\"w3-col  w3-left w3-text-right\" style=\"width:23%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>יום</label>\
                <input placeholder=\"יום\" type=\"text\" onchange=\"validateDate("+ i + ")\" style=\"text-align:right\" name=\"birthDateDay" + i + "\" class=\" w3-right w3-text-right w3-input\" required>\
            </div>\
            <div class=\"w3-col w3-left w3-text-middle\" style=\"width:6%\">\
                <br>\
                <input type=\"text\" style=\"text-align:right\" class=\" w3-right w3-text-right w3-input\" value=\"/\" disabled>\
            </div>\
            <div class=\"w3-col  w3-left w3-text-right\" style=\"width:20%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>חודש</label>\
                <input placeholder=\"חודש\" type=\"text\" onchange=\"validateDate("+ i + ")\" style=\"text-align:right\"  name=\"birthDateMnoth" + i + "\" class=\" w3-right w3-text-right w3-input\" required>\
            </div>\
            <div class=\"w3-col w3-left w3-text-middle\" style=\"width:6%\">\
                <br>\
                <input type=\"text\" style=\"text-align:right\" class=\"w3-color-sand w3-right w3-text-right w3-input\" value=\"/\" disabled>\
            </div>\
            <div class=\"w3-col  w3-left w3-text-right\" style=\"width:30%\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>שנה</label>\
                <input placeholder=\"שנה\" type=\"text\" onchange=\"validateDate("+ i + ")\" style=\"text-align:right\"  name=\"birthDateYear" + i + "\" class=\" w3-right w3-text-right w3-input\" required>\
            </div>\
        </div>\
            <div class=\"w3-third  w3-left w3-text-right\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>בחר כיתה</label>\
                <select  style=\"text-align:right\"  class=\"w3-select  w3-right w3-text-right\" name=\"age"+ i + "\">\
		        <option style=\"text-align:right\"  value=\"-1\" style=\"text-align:right\">\
		            <span>גן טרום חובה</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"0\" style=\"text-align:right\">\
		            <span>גן חובה</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"1\" style=\"text-align:right\" selected>\
		            <span>א</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"2\" style=\"text-align:right\">\
		            <span>ב</span>\
		        </option> 		\
		        <option style=\"text-align:right\"  value=\"3\" style=\"text-align:right\">\
		            <span>ג</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"4\" style=\"text-align:right\">\
		            <span>ד</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"5\" style=\"text-align:right\">\
		            <span>ה</span>\
		        </option>  		\
		        <option style=\"text-align:right\"  value=\"6\" style=\"text-align:right\">\
		            <span>ו</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"7\" style=\"text-align:right\">\
		            <span>ז</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"8\" style=\"text-align:right\">\
		            <span>ח</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"9\" style=\"text-align:right\">\
		            <span>ט</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"10\" style=\"text-align:right\">\
		            <label>י</label>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"11\" style=\"text-align:right\">\
		            <span>י\"א</span>\
		        </option>\
		        <option style=\"text-align:right\"  value=\"12\" style=\"text-align:right\">\
		            <span>י\"ב</span>\
		        </option>\
		        </select>\
            </div>\
        </div>\
        <div class=\"w3-row-padding\">\
            <div class=\"w3-third  w3-right w3-text-right\">\
                <label class=\"w3-text-white  w3-right w3-text-right w3-label\"><span class=\"w3-text-red\">*</span>בחר סניף</label>"
        + setPlaces(i) +
        "</div>\
            <div class=\"w3-third  w3-right w3-text-right\">\
                <label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span class=\"w3-text-right\">בחר קבוצה (בתיאום עם רכזת הסניף)</label>\
                <select  style=\"text-align:right\"  class=\"w3-select  w3-right w3-text-right\" name=\"group"+ i + "\" onchange=\"setAgeGroup(" + i + ")\">\
		<option style=\"text-align:right\"  value=\"1\" style=\"text-align:right\">\
		<label>רגילה <span class=\"w3-text=right\">(55 דק' פעמיים בשבוע)</span></label>\
		</option>\
		<option style=\"text-align:right\"  value=\"0\" style=\"text-align:right\">\
		<label>פרחי/טרום נבחרת <span class=\"w3-text=right\">(שעה עשרים וחמש פעמיים בשבוע)</span></label>\
		</option>\
		<option style=\"text-align:right\"  value=\"2\" style=\"text-align:right\">\
		<label>נבחרת <span class=\"w3-text=right\">(שיעור כפול פעמיים בשבוע)</span></label>\
		</option>\
		<option style=\"text-align:right\"  value=\"3\" style=\"text-align:right\">\
		<label>פעם בשבוע <span class=\"w3-text=right\">(שיעור כפול פעם בשבוע)</span></label>\
        </option>\
        <option style=\"text-align:right\"  value=\"4\" style=\"text-align:right\">\
		<label>קרית משה - רגילה <span class=\"w3-text=right\">(55 דק' פעם בשבוע)</span></label>\
		</option>\
        <option style=\"text-align:right\"  value=\"5\" style=\"text-align:right\">\
		<label>קרית משה - פרחי/טרום נבחרת <span class=\"w3-text=right\">(שעה עשרים וחמש פעם בשבוע)</span></label>\
		</option>\
		</select>\
            </div>\
                    <div class=\"w3-third  w3-right w3-text-right\" id=\"start"+ i + "\">\
            </div>\
        </div><br>\
        <div align=middle id=\"price"+ i + "\">\
            <label class=\"w3-text-white w3-label  w3-right w3-text-right\">תשלום למתעמל/ת</label>\
            <input class=\"w3-input   w3-right w3-text-right\" type=\"text\" value=\"0\" style=\"text-align:right;\" readonly>\
        </div><br></div>";
    para.innerHTML = stri;
    form.insertBefore(para, bef);
    setAgeGroup(i);
    changeOut(form.elements['out']);
    changeOut(form.elements['out']);
    setAction(i);
}
// Remove a section of the form
function removeStudent() {
    if (sessionStorage.clickcount == 0) {
        return;
    }
    var para = document.getElementById(String(sessionStorage.clickcount));
    var element = document.getElementById("form");
    sessionStorage.clickcount -= 1;
    setAction(sessionStorage.clickcount);
    element.removeChild(para);
    setPrice();
}
// calc the price amount of payments avalible
function changePrice(price) {
    var i, text = "<label class=\"w3-text-white w3-label  w3-right w3-text-right\">דרך תשלום<span class=\"w3-text-red\">*</span></label>";
    text += "<select style=\"text-align:right\"  class=\" w3-right w3-text-right w3-select\" name=\"numOfPay\" onchange=\"chNumOfPay(this.value)\"><option style=\"text-align:right\" value=\"\">בחר</option><option style=\"text-align:right\" value=\"0\">הוראת קבע בנקאית</option><option style=\"text-align:right\"  value=\"1\">כרטיס אשראי: 1 תשלומים</option>";
    price = price / 300;
    if (price > 10) { price = 10; }
    for (i = 2; i <= price; i++) {
        text += "<option style=\"text-align:right\"  value=\"" + i + "\">כרטיס אשראי: "+i+" תשלומים</option>";
    }
    return text;
}
// Change the amoount of pay by the users choice
function chNumOfPay(x) {
    if (x==-1){
            return;
    }
    if (x==0){
            document.getElementById('priceDiv').innerHTML = "<label class=\"w3-text-white w3-label  w3-right w3-text-right\">סכום לכל תשלום</label><input name=\"priceDiv\" class=\"w3-input w3-right w3-text-right\" type=\"text\" size=10 value=\"" + "לפי דפי המידע" + "\" style=\"text-align:middle\" readonly>";
            setAction(sessionStorage.clickcount);
            return;
    }
    document.getElementById('priceDiv').innerHTML = "<label class=\"w3-text-white w3-label  w3-right w3-text-right\">סכום לכל תשלום</label><input name=\"priceDiv\" class=\"w3-input w3-right w3-text-right\" type=\"text\" size=10 value=\"" + (sessionStorage.price / x).toFixed(2) + "\" style=\"text-align:middle\" readonly>";
    setAction(sessionStorage.clickcount);
}
// calculate the price to pay
function setPrice() {
    var num = sessionStorage.clickcount;
    var price = 0, i, arr_boys = [], arr_girls = [], arr_starts = [], arr_sorted = [];
    for (i = 0; i <= num; i++) {
        if (form.elements['place' + i].value == 3) {
            arr_boys.push([i, form.elements['start' + i].value])
        }
        else {
            arr_girls.push([i, form.elements['start' + i].value])
        }
    }
    arr_girls.sort(function (a, b) { return a[1] - b[1] });
    arr_boys.sort(function (a, b) { return a[1] - b[1] });
    var j = 0
    for (i = 0; i < arr_girls.length; i++) {
        if (form.elements['place' + i].value == 1) {
            continue;
        }
        price += calcPriceGirls(arr_girls[i][0], j);
        j++;
    }
    for (i = 0; i < arr_girls.length; i++) {
        if (form.elements['place' + i].value != 1) {
            continue;
        }
        price += calcPriceGirls(arr_girls[i][0], j);
        j++;
    }
    for (i = 0; i < arr_boys.length; i++) {
        if (arr_girls.length > 0) {
            price += calcPriceBoysDis(arr_boys[i][0], i);
        }
        else {
            price += calcPriceBoys(arr_boys[i][0], i);
        }
    }
    sessionStorage.setItem('price', price);
    document.getElementById('price').innerHTML = "<label class=\"w3-text-white w3-label w3-right w3-text-right\">תשלום כולל</label><input name=\"sumPrice\" class=\"w3-input w3-right w3-text-right\" type=\"text\" value=" + Math.round(price) + " style=\"text-align:middle\" readonly>";
    document.getElementById('numOfPrice').innerHTML = changePrice(Math.round(price));
    chNumOfPay(-1);
}
// int an array
function int(arr) {
    var i, j;
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[0].length; j++) {
            arr[i][j] = Number(arr[i][j])
        }
    }
    return arr;
}
// calc the price for boys, with discount
function calcPriceBoysDis(id, num) {
    var price = 0, arr;
    arr = int(getCSV('boys.csv'));
    switch (num) {
        case 0:
            price += arr[0][0];
            price -= arr[0][2] * form.elements['start' + id].value;
            price *= 0.95;
            price += arr[0][1];
            break;
        case 1:
            price += arr[1][0];
            price -= arr[1][2] * form.elements['start' + id].value;
            price *= 0.90;
            price += arr[1][1];
            break;
        case 2:
            price += arr[2][1];
            price -= arr[2][2] * form.elements['start' + id].value;
            price *= 0.80;
            price += arr[2][0];
            break;
        default:
            price += arr[3][1];
            price -= arr[3][2] * form.elements['start' + id].value;
            price *= 0.80;
            price += arr[3][0];
            break;
    }
    document.getElementById('price' + id).innerHTML = "<label class=\"w3-text-white w3-label w3-padding-small w3-right w3-text-right\">תשלום למתעמל/ת:</label> <input class=\"w3-input   w3-right w3-text-right  w3-text-right\" type=\"text\" size=10 value=" + Math.round(price) + " style=\"text-align:middle;width:10%\" readonly>";
    return price;
}
// calc the price for boys, without discount
function calcPriceBoys(id, num) {
    var price = 0, arr;
    arr = int(getCSV('boys.csv'));
    switch (num) {
        case 0:
            price += arr[0][1];
            price += arr[0][0];
            price -= arr[0][2] * form.elements['start' + id].value;
            break;
        case 1:
            price += arr[1][1];
            price += arr[1][0];
            price -= arr[1][2] * form.elements['start' + id].value;
            break;
        case 2:
            price += arr[2][1];
            price += arr[2][0];
            price -= arr[2][2] * form.elements['start' + id].value;
            break;
        default:
            price += arr[3][1];
            price += arr[3][0];
            price -= arr[3][2] * form.elements['start' + id].value;
            break;
    }
    document.getElementById('price' + id).innerHTML = "<label class=\"w3-text-white w3-label w3-padding-small w3-right w3-text-right\">תשלום למתעמל/ת:</label> <input class=\"w3-input   w3-right w3-text-right  w3-text-right\" type=\"text\" size=10 value=" + Math.round(price) + " style=\"text-align:middle;width:10%\" readonly>";
    return price;
}
// calc the price for girls
function calcPriceGirls(id, num) {
    var price = 0, arr;
    arr = int(getCSV('girls.csv'));
    switch (num) {
        case 0:
            if (form.elements['place' + id].value != 1) {
                price += arr[0][0];
            }
            else {
                price += arr[0][8];
            }
            price += arr[0][1];
            switch (form.elements['group' + id].value) {
                case '0':
                    price += arr[0][2];
                    price -= (arr[0][4] + arr[0][5]) * form.elements['start' + id].value;
                    break;
                case '1':
                    price -= arr[0][4] * form.elements['start' + id].value;
                    break;
                case '2':
                    price += arr[0][3];
                    price -= (arr[0][4] + arr[0][6]) * form.elements['start' + id].value;
                    break;
                case '3':
                    price -= arr[0][7] * form.elements['start' + id].value;
                    break;
                case '4':
                    price -= arr[0][10] * form.elements['start' + id].value;
                    break;
                case '5':
                    price += arr[0][9];
                    price -= (arr[0][10] + arr[0][11]) * form.elements['start' + id].value;
                    break;
            }
            break;
        case 1:
            if (form.elements['place' + id].value != 1) {
                price += arr[1][0];
            }
            else {
                price += arr[1][8];
            }
            price += arr[1][1];
            switch (form.elements['group' + id].value) {
                case '0':
                    price += arr[1][2];
                    price -= (arr[1][4] + arr[2][5]) * form.elements['start' + id].value;
                    break;
                case '1':
                    price -= arr[1][4] * form.elements['start' + id].value;
                    break;
                case '2':
                    price += arr[1][3];
                    price -= (arr[1][4] + arr[2][6]) * form.elements['start' + id].value;
                    break;
                case '3':
                    price -= arr[1][7] * form.elements['start' + id].value;
                    break;
                case '4':
                    price -= arr[1][10] * form.elements['start' + id].value;
                    break;
                case '5':
                    price += arr[1][9];
                    price -= (arr[1][10] + arr[0][11]) * form.elements['start' + id].value;
                    break;
            }
            break;
        case 2:
            if (form.elements['place' + id].value != 1) {
                price += arr[2][0];
            }
            else {
                price += arr[2][8];
            }
            price += arr[2][1];
            switch (form.elements['group' + id].value) {
                case '0':
                    price += arr[2][2];
                    price -= (arr[2][4] + arr[2][5]) * form.elements['start' + id].value;
                    break;
                case '1':
                    price -= arr[2][4] * form.elements['start' + id].value;
                    break;
                case '2':
                    price += arr[2][3];
                    price -= (arr[2][4] + arr[0][6]) * form.elements['start' + id].value;
                    break;
                case '3':
                    price -= arr[2][7] * form.elements['start' + id].value;
                    break;
                case '4':
                    price -= arr[2][10] * form.elements['start' + id].value;
                    break;
                case '5':
                    price += arr[2][9];
                    price -= (arr[2][10] + arr[0][11]) * form.elements['start' + id].value;
                    break;
            }
            break;
        default:
            if (form.elements['place' + id].value != 1) {
                price += arr[3][0];
            }
            else {
                price += arr[3][8];
            }
            price += arr[3][1];
            switch (form.elements['group' + id].value) {
                case '0':
                    price += arr[3][2];
                    price -= (arr[3][4] + arr[3][5]) * form.elements['start' + id].value;
                    break;
                case '1':
                    price -= arr[3][4] * form.elements['start' + id].value;
                    break;
                case '2':
                    price += arr[3][3];
                    price -= (arr[3][4] + arr[3][6]) * form.elements['start' + id].value;
                    break;
                case '3':
                    price -= arr[3][7] * form.elements['start' + id].value;
                    break;
                case '4':
                    price -= arr[4][10] * form.elements['start' + id].value;
                    break;
                case '5':
                    price += arr[4][9];
                    price -= (arr[4][10] + arr[0][11]) * form.elements['start' + id].value;
                    break;
            }
            break;
    }
    document.getElementById('price' + id).innerHTML = "<label class=\"w3-text-white w3-label w3-padding-small w3-right w3-text-right\">תשלום למתעמל/ת:</label> <input class=\"w3-input   w3-right w3-text-right  w3-text-right\" type=\"text\" size=10 value=" + Math.round(price) + " style=\"text-align:middle;width:10%\" readonly>";
    return price;
}
// set the dates options to the form
function setDate(arr, num) {
    var text, i;
    text = "<select  style=\"text-align:right\"  class=\" w3-right w3-text-right w3-select\" name=\"start" + num + "\" onchange=setPrice()>";
    for (i = 0; i < arr.length; i++) {
        text += "<option style=\"text-align:right\"  value=\"" + i + "\"><span>" + arr[i][0] + "-" + arr[i][1].slice(1, -1).replace(/""/g, '"') + "</span></option>";
    }
    text += "</select>";
    return text
}
// set the ageGroup option to the form
function setAgeGroup(num) {
    var places, arr;
    if (form.elements['place' + num].value == 1 && (form.elements['group' + num].value < 4)){
        alert('סוג הקבוצה אינו קיים בסניף זה');
        return;
    }

    if (form.elements['place' + num].value != 1 && (form.elements['group' + num].value > 3)){
        alert('סוג הקבוצה אינו קיים בסניף זה');
        return;
    }

    if(form.elements['place'+num].value==3 &&(form.elements['group'+num].value==0||form.elements['group'+num].value==2||form.elements['group'+num].value==3)) {
        alert('סוג הקבוצה אינו קיים בסניף זה');
        return;
    }

    if (form.elements['place' + num].value == 2 && (form.elements['group' + num].value == 0)){
        alert('סוג הקבוצה אינו קיים בסניף זה');
        return;
    }

    places = getCSV('places.csv');
    if (form.elements['group' + num].value == 3) {
        arr = getCSV(places[form.elements['place' + num].value][2]);
    }
    else {
        arr = getCSV(places[form.elements['place' + num].value][1]);
    }
    document.getElementById('start' + num).innerHTML = "<label class=\"w3-text-white w3-label  w3-right w3-text-right\"><span class=\"w3-text-red\">*</span>תאריך התחלה</label>" + setDate(arr, num);
    setPrice();
}
// get a csv file by filename into a array
function getCSV(filename) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", Dir+filename, false);
    xhttp.send();
    return process(xhttp)
}
// get a string from a csv to an array
function process(x) {
    var s, arr, temp;
    var i,j;
    s = x.responseText;
    arr = s.split('\n');
    arr.pop()
    for (i = 0; i < arr.length; i++) {
        temp = arr[i].split(',');
        arr[i] = temp;
    }
    return arr
}
// set the places option
function setPlaces(num) {
    var i, text, arr;
    arr = getCSV('places.csv');
    text = "<select  style=\"text-align:right\"  class=\"w3-select  w3-right w3-text-right\" name=\"place" + num + "\" onchange=setAgeGroup(" + num + ")>";
    for (i = 0; i < arr.length; i++) {
        text += "<option style=\"text-align:right\"  value=\"" + i + "\"><span>" + arr[i][0] + "</span></option>";
    }
    text += "</select>";
    return text
}
// vlidate dad id
function validateDadId() {
    if (!validateId(form.elements['dadId'].value)) {
        alert("אנא הכנס מספר תעודת זהות תקין");
        form.elements['dadId'].focus();
    }
}
// validate dad phone
function validateDadPhone() {
    if (form.elements['dadNumStart'].value == "" || form.elements['dadNumEnd'].value == "") {
        return true;
    }
    if (!validatePhoneMobile(form.elements['dadNumStart'].value + '-' + form.elements['dadNumEnd'].value)) {
        alert("אנא הכנס מספר טלפון נייד תקין ");
        form.elements['dadNumEnd'].focus();
        return false;
    }
    return true;
}
// validate mom phone
function validateMomPhone() {
    if (form.elements['momNumStart'].value == "" || form.elements['momNumEnd'].value == "") {
        return true;
    }
    if (!validatePhoneMobile(form.elements['momNumStart'].value + '-' + form.elements['momNumEnd'].value)) {
        alert("אנא הכנס מספר טלפון נייד תקין ");
        form.elements['momNumEnd'].focus();
        return false;
    }
    return true;
}
// validate home num
function validateHomeNum() {
    var start = form.elements['homeNum'].value, end = form.elements['homeNumEnd'].value;
    if (start == "" || end == "") {
        return true;
    }
    if (!validatePhoneHome(start + '-' + end)) {
        alert("אנא הכנס מספר טלפון תקין ");
        form.elements['homeNumEnd'].focus();
        return false;
    }
    return true;
}
// validate mail
function validateMail(mail) {
    var atpos = mail.indexOf("@");
    var dotpos = mail.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        return false;
    }
    return true;
}
// validate mail
function validateDadMail() {
    if (!validateMail(form.elements['dadMail'].value)) {
        alert('אנא הכנס כתובת דוא"ל תקינה');
        form.elements['dadMail'].focus();
    }
}
function validateMomMail() {
    if (!validateMail(form.elements['momMail'].value)) {
        alert('אנא הכנס כתובת דוא"ל תקינה');
        form.elements['momMail'].focus();
    }
}
function validateMomId() {
    if (!validateId(form.elements['momId'].value)) {
        alert("אנא הכנס מספר תעודת זהות תקין");
        form.elements['momId'].focus();
    }
}
function validateForm(form) {
    var i;
    if (form.elements["numOfPay"].value==""){
        alert("חובה לבחור דרך תשלום");
        form.elements["numOfPay"].focus();
        return false;
    }
    if ((form.elements['dadNumEnd'].value == "" || form.elements['dadNumStart'].value == "") && (form.elements['momNumEnd'].value == "" || form.elements['momNumStart'].value == "")||(form.elements['homeNum']==""&&form.elements['homeNumEnd'].value == "")) {
        alert("מלא מספר פלפאון של לפחות אחד ההורים");
        form.elements['dadNumEnd'].focus();
        return false;
    }
    if ((form.elements['dadMail'].value == "") && (form.elements['momMail'].value == "")) {
        alert("מלא כתובת email של לפחות אחד ההורים");
        form.elements['dadMail'].focus();
        return false;
    }
    if ((form.elements['dadId'].value == "") && (form.elements['momId'].value == "")) {
        alert("מלא מספר תעודה מזהה של לפחות אחד ההורים");
        form.elements['dadId'].focus();
        return false;
    }
    if ((form.elements['dadName'].value == "") && (form.elements['momName'].value == "")) {
        alert("מלא שם של לפחות אחד ההורים");
        form.elements['dadName'].focus();
        return false;
    }
    if (!validateHomeNum()) {
        return false;
    }
    if (!validateDadPhone()) {
        return false;
    }
    if (!validateMomPhone()) {
        return false;
    }
    if (!validateId(form.elements['dadId'].value)) {
        alert("אנא הכנס מספר תעודת זהות תקין");
        form.elements['dadId'].focus();
        return false;
    }
    if (!validateId(form.elements['momId'].value)) {
        alert("אנא הכנס מספר תעודת זהות תקין");
        form.elements['momId'].focus();
        return false;
    }
    if (!validateLoc(form.elements['location'].value)) {
        alert("אנא הכנס מיקוד תקין")
        form.elements['location'].focus();
        return false
    }
    for (i = 0; i <= sessionStorage.clickcount; i++) {
        if (!validateDate(i)) {
            return false;
        }
        if (!validateId(form.elements['idchiled' + i].value)) {
            alert("אנא הכנס מספר תעודת זהות תקין");
            form.elements['idchiled' + i].focus();
            return false;
        }
        if (!validateStudentNum(i)) {
            return false;
        }
    }
}
function validateLocation() {
    if (!validateLoc(form.elements['location'].value)) {
        alert("אנא הכנס מיקוד תקין")
        form.elements['location'].focus();
        return false
    }
}
function validateDate(i) {
    var form = document.getElementById('form')
    if (!validateDateReturn(i)) {
        alert('אנא הכנס תאריך תקין');
        form.elements['birthDateDay' + i].focus();
        return false;
    }
    return true;
}
function validateDateReturn(i) {
    var d = new Date()
    var min = d.getFullYear() - 20;
    var max = d.getFullYear() - 4;
    var form = document.getElementById('form')
    var day = form.elements['birthDateDay' + i].value, month = form.elements['birthDateMnoth' + i].value, year = form.elements['birthDateYear' + i].value;
    if (day == "" || month == "" || year == "") {
        return true;
    }
    if (Number(day) == NaN || Number(month) == NaN || Number(year) == NaN) {
        return false;
    }
    if (year < min || year > max || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }
    switch (Number(month)) {
        case 2:
            if (Number(year) % 4 == 0) {
                return (Number(day) <= 29);
            }
            else {
                return (Number(day) <= 28);
            }
        case 4:
        case 6:
        case 9:
        case 11:
            return (Number(day) <= 30)
    }
    return true;
}
function validateLoc(loc) {
    if (loc == "") {
        return true;
    }
    if (loc.length == 5 || loc.length == 7) {
        if (!isNaN(loc)) {
            return true;
        }
    }
    return false;
}
function validateId(str) {
    if (str == "") {
        return true;
    }
    if (form.elements['out'].value == 1) {
        return true;
    }
    if (Number(str) == NaN) {
        return false;
    }
    
    return validateIDNum(Number(str));
}
function validateIDNum(num) {
    //INPUT VALIDATION

    // Just in case -> convert to string
    var IDnum = String(num);

    // Validate correct input
    if ((IDnum.length > 9) || (IDnum.length < 5))
        return false;

    // The number is too short - add leading 0000
    if (IDnum.length < 9) {
        while (IDnum.length < 9) {
            IDnum = '0' + IDnum;
        }
    }
    var sum = 0;
    var id = IDnum;
    for (i = 0; i < 8; i++) {
        x = (((i % 2) + 1) * id.charAt(i));
        if (x > 9) {
            x = x.toString();
            x = parseInt(x.charAt(0)) + parseInt(x.charAt(1))
        }
        sum += x;
    }
    if ((sum + parseInt(id.charAt(8))) % 10 == 0) {
        return true;
    }
    else {
        return false;
    }
}
function validatePhone(input) {
    var bol = (validatePhoneHome(input) || validatePhoneMobile(input));
    return bol;
}
function validatePhoneMobile(input) {
    var i = input.indexOf('-'), input1, input2;
    if (input.length != 11) {
        return false;
    }
    input1 = input.slice(0, i);
    input2 = input.slice(i + 1);
    if (input1.length != 3 || input2.length != 7) {
        return false;
    }
    if (Number(input1) == NaN || Number(input2) == NaN) {
        return false;
    }
    switch (input1) {
        case '050':
        case '051':
        case '052':
        case '053':
        case '054':
        case '055':
        case '056':
        case '057':
        case '058':
        case '059':
            break;
        default:
            return false;
    }
    return true;
}
function validatePhoneHome(input) {
    var i = input.indexOf('-'), input1, input2;
    if (input.length != 10 && input.length != 11) {
        return false;
    }
    input1 = input.slice(0, i);
    input2 = input.slice(i + 1);
    if ((input1.length != 2 && input1.length != 3) || input2.length != 7) {
        return false;
    }
    if (Number(input1) == NaN || Number(input2) == NaN) {
        return false;
    }
    switch (input1) {
        case '02':
        case '03':
        case '04':
        case '08':
        case '09':
        case '072':
        case '073':
        case '074':
        case '077':
        case '079':
            break;
        default:
            return false;
    }
    return true;
}
function validateStudentId(num) {
    if (!validateId(form.elements['idchiled' + num].value)) {
        alert("אנא הכנס מספר תעודת זהות תקין");
        form.elements['idchiled' + num].focus();
        return false;
    }
}
function validateStudentNum(num) {
    var startNum = form.elements['phoneStart' + num].value, endNum = form.elements['phoneEnd' + num].value;
    if (startNum == "" || endNum == "") {
        return true;
    }
    if (!validatePhoneMobile(startNum + '-' + endNum)) {
        alert("אנא הכנס מספר טלפון נייד תקין");
        form.elements['phoneEnd' + num].focus();
        return false;
    }
    return true;
}
function validateStudentMail(num) {
    if (!validateMail(form.elements['email' + num].value)) {
        alert('אנא הכנס כתובת דוא"ל תקינה');
        form.elements['email' + num].focus();
    }
}
