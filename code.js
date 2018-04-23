var Tag;
var strNow;
var statusNum = 0;
var SpeedTag;
function startAdd()
{
    Tag = setInterval(AllDect, 1000);
    SpeedTag = setInterval(getMaxSpeed, 60 * 1000);
}
function getTime()
{
    var myDate = new Date();
    strNow = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + "   ";
}
function AllDect()
{
    getTime();
    FibDlg();
    detectEnd();
    displayStatus();
    detectOverWatch();
}
function stop()
{
    clearInterval(Tag);
    clearInterval(SpeedTag);
}
function displayStatus()
{
    statusNum++;
    document.getElementById("lessonOrder").innerHTML = "插件正在运行" + statusNum;
}
function FibDlg()
{
    var tag = document.getElementsByClassName("popbtn_cancel")[0];
    if (tag != null)
    {
        tag.click();
        console.log(strNow + "A Dialog Was Closed");
    }
    var yes =document.getElementsByClassName("popbtn_yes")[0];
    if(yes!=null)
    {
        yes.click();
        console.log(strNow + "A warning Was Closed");
        
    }
}
function detectEnd()
{
    var str1 = document.getElementsByClassName("currentTime")[0].innerText;
    var str2 = document.getElementsByClassName("duration")[0].innerText;
    var str11 = str1.substr(str1.length - 2, 2);
    var str21 = str2.substr(str2.length - 2, 2);
    var str12 = str1.substr(str1.length - 5, 2);
    var str22 = str2.substr(str2.length - 5, 2);
    var strNum1 = new Number(str11);
    var strNum2 = new Number(str21);
    var interval = Math.abs(strNum2 - strNum1);

    if (str1 == str2 && str1 != "00:00:00" && str2 != "00:00:00")
    {
        nextLesson();
        setTimeout(getMaxSpeed, 10000);
    }
    else if (document.getElementById("playButton").className == "playButton" && interval <= 2 && str22 == str12)
    {
        nextLesson();
        setTimeout(getMaxSpeed, 10000);
    }
}

function nextLesson()
{ 
    var half=$(".time_ico_half")
    if(half!=null)
    {
        half.click();
        return ;
    }
    document.getElementsByClassName("next_lesson_bg tm_next_lesson")[0].click();
    console.log(strNow + "A New Lesson Is Started");
}
function detectOverWatch()
{
    var strfull = document.getElementsByClassName("progressbar")[0].style.width;
    if (strfull != null)
    {
        var strraw =document.getElementsByClassName("progressbar_box_tip")[0].innerText
        if (strraw==null)
        {
            return ;
        }
        if(strraw.split("『")[1]==null)
        {
            return ;
        }
        str=  strraw.split("『")[1].split("%")[0];
        if (str.length != 0)
        {
            var num = new Number(str);
         //   console.log(num);
            if (num == 100)
            {
                nextLesson();
                console.log(strNow + "Watched Over");
            }
        }

    }
}
function getMaxSpeed()
{
    var str = document.getElementsByClassName("speedBox")[0].style.backgroundImage;
    var substr1 = str.substr(str.length - 9, 3);
    if (substr1 != "1.5")
    {
        document.getElementsByClassName("speedTab15")[0].click();
        console.log(strNow + "Try Change Speed To 1.5x");
        setTimeout( function ()
        {
            var str = document.getElementsByClassName("speedBox")[0].style.backgroundImage;
            var substr1 = str.substr(str.length - 9, 3);
            if (substr1 != "1.5")
            {
                console.log(strNow + "Speed Change Failed");
            }
            if(substr1=="1.5")
            {
                console.log(strNow + "Speed Change Succeeded");
            }
        },10000);
    }
}
startAdd();
getMaxSpeed();