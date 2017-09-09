<!DOCTYPE html>
<html>
<head>
<head>
<body>
<?php
    ini_set("include_path", '/home/gymnasti/php:' . ini_get("include_path") );
    require_once 'lib/swift_required.php';
    $site=true;
    function set_url($price,$numofpay){
        $text="https://services.netpay-intl.com/hosted?merchantID=1579357&trans_currency=ILS&trans_type=0&trans_amount=";
        $hash="1579357ILS0";
        $text.=$price;
        $hash.=$price;
        $text.="&trans_installments=";
        $text.=$numofpay;
        $hash.=$numofpay;
        $text.="&url_redirect=".urlencode("http://www.gymnastics.co.il/index.files/conf.htm");
        $hash.="http://www.gymnastics.co.il/index.files/conf.htm";
        $text.='&disp_lng='.urldecode('he-IL');
        $hash.='he-IL';
        $hash.="0A24RPZ5GS";
        $hashed=base64_encode(hash('sha256',$hash,true));
        $text.='&signature='.urlencode($hashed);
        return $text;
    }
    function unicode_conv($originalString) {
        // The four \\\\ in the pattern here are necessary to match \u in the original string
        $replacedString = preg_replace("/\\\\u(\w{4})/", "&#$1;", $originalString);
        $unicodeString = mb_convert_encoding($replacedString, 'UTF-8', 'HTML-ENTITIES');
        return $unicodeString;
    }
    function set_line($i){   
        $name=$_POST["name".$i];
        $familyName=$_POST['familyName'];
        $studentId=$_POST['idchiled'.$i];
        $school=$_POST['school'.$i];
        $studentPhone=$_POST['phoneStart'.$i].'-'.$_POST['phoneEnd'.$i];
        $studentMail=$_POST['email'.$i];
        $birth=$_POST['birthDateDay'.$i];
        $birth.='/';
        $birth.=$_POST['birthDateMnoth'.$i];
        $birth.='/';
        $birth.=$_POST['birthDateYear'.$i];
        $age=$_POST['age'.$i];
        $place=$_POST['place'.$i];
        $group=$_POST['group'.$i];
        $start=$_POST['start'.$i];
        $dadName=$_POST['dadName'];
        $dadId=$_POST['dadId'];
        $dadPhone=$_POST['dadNumStart'].'-'.$_POST['dadNumEnd'];
        $dadMail=$_POST['dadMail'];
        $momName=$_POST['momName'];
        $momId=$_POST['momId'];
        $momPhone=$_POST['momNumStart'].'-'.$_POST['momNumEnd'];
        $momMail=$_POST['momMail'];  
        $city=$_POST['city'];
        $nibeor=$_POST['niber'];
        $street=$_POST['street'];
        $phone=$_POST['homeNumStart'].'-'.$_POST['homeNumEnd'];
        $loc=$_POST['location'];
        $out=$_GET['out'];
        $pay=$_GET['numOfPay'];

        $text.='"'.$familyName.'"'.',';
        $text.='"'.$momName.'"'.',';
        $text.='"'.$dadName.'"'.',';
        $text.='"'.$street.'"'.',';
        $text.='"'.$nibeor.'"'.',';
        $text.='"'.$city.'"'.',';
        $text.='"'.$loc.'"'.',';
        $text.='"'.$phone.'"'.',';
        $text.='"'.$momPhone.'"'.',';
        $text.='"'.$dadPhone.'"'.',';
        $text.='"'.$momMail.'"'.',';
        $text.='"'.$dadMail.'"'.',';
        $text.='"'.$dadId.'"'.',';
        $text.='"'.$momId.'"'.',';
        $text='"'.$name.'"'.',';
        switch ($place) {
            case '0':
                $text.='"'."קטמון בנות".'"'.',';
                break;
            case '1':
                $text.='"'."קריית משה".'"'.',';
                break;
            case '2':
                $text.='"'."חומת שמואל".'"'.',';
                break;
            case '3':
                $text.='"'."קטמון בנים".'"'.',';
                break;
            default:
                $text.='"'.$place.'"'.',';
                break;
        }
        switch ($group) {
            case '1':
                $text.='"'."רגילה".'"'.',';
                break;
            case '0':
                $text.='"'."פרחי".'"'.',';
                break;
            case '2':
                $text.='"'."נבחרת".'"'.',';
                break;
            case '3':
                $text.='"'."פעם בשבוע".'"'.',';
                break;
            default:
                $text.='"'.$group.'"'.',';
                break;
        }
        $text.='"'.$school.'"'.',';
        switch ($age) {
            case '-1':
                $text.='"'."גן טרום חובה".'"'.',';
                break;
            case '0':
                $text.='"'."גן חובה".'"'.',';
                break;
            case '1':
                $text.='"'."כיתה א'".'"'.',';
                break;
            case '2':
                $text.='"'."כיתה ב'".'"'.',';
                break;
            case '3':
                $text.='"'."כיתה ג'".'"'.',';
                break;
            case '4':
                $text.='"'."כיתה ד'".'"'.',';
                break;
            case '5':
                $text.='"'."כיתה ה'".'"'.',';
                break;
            case '6':
                $text.='"'."כיתה ו'".'"'.',';
                break;
            case '7':
                $text.='"'."כיתה ז'".'"'.',';
                break;
            case '8':
                $text.='"'."כיתה ח'".'"'.',';
                break;
            case '9':
                $text.='"'."כיתה ט'".'"'.',';
                break;
            case '10':
                $text.='"'."כיתה י'".'"'.',';
                break;
            case '11':
                $text.='"'."כיתה י\"\"א".'"'.',';
                break;
            case '12':
                $text.='"'."כיתה י\"\"ב".'"'.',';
                break;
            default:
                $text.='"'.$age.'"'.',';
        }
        $text.='"'.$birth.'"'.',';
        $text.='"'.$studentId.'"'.',';
        $text.='"'.$studentPhone.'"'.',';
        $text.='"'.$studentMail.'"'.',';
        $text.='"'.$start.'"'.',';
        if($out==1){
            $text.='"'."כן".'"'.',';
            }
            else{
                $text.='"'."לא".'"'.',';
        }
        if($pay=='0'){
            global $site;
            $site=false;
            $text.='"'."הוראת קבע".'"'." \n ";
            }
            else{
                $text.='"'."חיוב בכרטיס אשראי".'"'." \n" ; 
        }
        if($pay!='0'){
            $text.='"'.$pay.'"'.',';
        }
        return $text;
    }
    if ($_POST[payspecialInfo] != "")
    {
        $text +=',"סיבת תשלום חריג"';
    }
    $text='"שם משפחה","שם האם","שם האב","כתובת","שכונה","עיר","מיקוד","טלפון בבית","סלולארי אם","סלולארי אב","דוא""ל אם","דוא""ל אב","מס\' זהות אב","מס\' זהות אם","שם מתעמלת","סניף","סוג קבוצה","בית ספר","כיתה","תאריך לידה","ת""ז מתעמלת","סלולארי מתעמלת","דוא""ל מתעמלת","מס\' שיעורי חיסור","תושב חול","דרך תשלום","מספר תשלומים"';
    $text.=" \n";
    if ($_POST[payspecialInfo] != "")
    {
        $text += $_POST[payspecialInfo];
    }
    $price=$_GET['price'];
    $numOfPay=$_GET['numOfPay'];
    for($i=0;$i<=$_GET['num'];$i++){
        $text.=set_line($i);
    }
    $transport=Swift_SmtpTransport::newInstance('picasso.htnoc.net',465)
        ->setEncryption('ssl')
        ->setUsername('signup@kkg.co.il')
        ->setPassword('noaMSignUp-1')
        ;
    $mailer=Swift_Mailer::newInstance($transport);
    $message = Swift_Message::newInstance();
    $message->setSubject('קפיץ קפוץ-הרשמה');
    $message->setFrom('signup@kkg.co.il');
    $message->setTo('signup@kkg.co.il');
    if ($_FILES['perant']['name']!=""){
        move_uploaded_file($_FILES["perant"]["tmp_name"],"a/perant");
        $att=Swift_Attachment::fromPath("a/perant")
            ->setFilename("אישור הורים.pdf");
        $message->attach($att); 
    }
    if ($_FILES['medic']['name']!=""){
        move_uploaded_file($_FILES["medic"]["tmp_name"],"a/medic");
        $att=Swift_Attachment::fromPath("a/medic")
            ->setFilename("אישור רפואי.pdf");
        $message->attach($att); 
    }
    if ($_FILES['bank']['name']!=""){
        move_uploaded_file($_FILES["bank"]["tmp_name"],"a/bank");
        $att=Swift_Attachment::fromPath("a/bank")
            ->setFilename("הוראת קבע.pdf");
        $message->attach($att);  
    }
    $filename=date("Y-m-d-H-i-s").".csv";
    $attachment = Swift_Attachment::newInstance(iconv("UTF-8","Windows-1255",$text),$filename);
    $message->attach($attachment);
    $mailer->send($message);
    if ($site){
        header("Location: ".set_url($price,$numOfPay));
        exit;
    }
?>
    <script>window.location.href="http://www.gymnastics.co.il/index.files/conf.htm";</script>
</body>
</html>
