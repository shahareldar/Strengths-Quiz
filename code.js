const obj = [{
    category: "חכמה וידע",
    values: ["סקרנות", "אהבת הלמידה", "ביקורתיות", "כושר המצאה", "הבנה חברתית", "נק' מבט כוללת"]
}, {
    category: "אומץ",
    values: ["תעוזה", "התמדה", "יושרה"]
}, {
    category: "אנושיות",
    values: ["טוב לב", "חום ואהבה"]
}, {
    category: "צדק",
    values: ["אזרחות טובה", "הגינות", "מנהיגות"]
}, {
    category: "מתינות",
    values: ["שליטה עצמית", "שיקול דעת", "צניעות"]
}, {
    category: "נשגבות",
    values: ["הערכה ליופי", "הכרת תודה", "אופטימיות", "רוחניות", "חמלה", "חוש הומור", "אנרגטיות"]
}];
const questions = ["אני לא משתעמם בקלות", "אני מלא התלהבות כשאני לומד משהו חדש", "אני מבקר במוזיאונים", "כשהנושא מחייב, אני מסוגל לחשוב בצורה הגיונית", "אני לא נוטה לשפוט מהר", "אני אוהב לחשוב על דרכים חדשות לבצע דברים", "יש לי דמיון יותר מפותח משל חבריי", "אני מצליח להתאים את עצמי למצבים חברתיים", "אני מצטיין בזיהוי רגשות הזולת", "אני מסוגל לראות את התמונה הכוללת", "אנשים באים לבקש את עצתי", "תמיד אנקוט עמדה, גם מול התנגדות חזקה", "כאב ואכזבה לא מכריעים אותי", "אני מסיים כל דבר שאני מתחיל", "אני לא סוטה מהעבודה שאני מבצע", "אני מקיים את הבטחותיי תמיד", "חבריי אומרים לי שאני מעשי", "בחודש האחרון התנדבתי לעזור לשכן", "אני שמח בהצלחותיהם של אנשים באותה מידה כמו משלי", "יש אנשים בחיי שאכפת להם ממני לא פחות משאכפת להם מעצמם", "קל לי לקבל אהבה מאחרים", "אני ממצה את יכולותיי בעבודה בקבוצה", "אני מקריב את האינטרס האישי שלי לטובת קבוצתי", "אני מתייחס באופן שווה לכל אדם", "גם כשאני לא אוהב מישהו אני נוהג כלפיו בהגינות", "אני מצליח להניע אנשים בלי לנדנד להם", "אני מצטיין בארגון פעולות קבוצתיות", "אני שולט ברגשותיי", "בדרך כלל אני מצליח להתמיד בדיאטה", "אני נמנע מפעילויות הכרוכות בסכנה פיזית", "אני מקבל החלטת טובות לגבי החברים והזוגיות שלי", "אני משנה נושא שיחה כשאנשים מחמיאים לי", "אני לא מדבר על השגיי לעיתים קרובות", "בחודש האחרון נפעמתי ממוזיקה/תיאטרון/אומנות", "יצרתי משהו יפה בשנה האחרונה", "אני אומר תמיד תודה על הדברים הקטנים", "אני חושב בדרך כלל על מזלי הטוב ועל הטוב בחיי", "אני תמיד רואה את חצי הכוס המלאה", "יש לי תוכניות מפורטות על העתיד שלי", "יש לחיי מטרה רבת עוצמה", "יש לי ייעוד בחיים", "אני תמיד מניח לעברי", "לעיתים אני נשאר חייב למישהו", "אני משתדל לשלב מקצועיות עם הנאה", "אני אומר דברים מצחיקים לעיתים תכופות", "אני נותן את כל כולי בכל מה שאני עושה", "אני לא הרבה במצב רוח רע"];
let sums, currentRadio, isNext, sum, level, isOn;
const LEVELS = 48;

$(() => {
    $("#start").on("click", screen2);
    
});

let init = () => {
    sums = [];
    isNext = false;
    sum = 0;
    level = 1;
    isOn = false;
}

let screen2 = () => {
    init();
    $("#screen-1, #screen-3").hide();
    $("#screen-2").show();
    $(".radio").on("click", onClickRadio);
}

let onClickRadio = (event) => {
    currentRadio = event.currentTarget;
    if (!isOn) {
        $("#next").on("click", onClickNext);
        isOn = true;
    }
}

let onClickNext = (event) => {
    $("#next").off("click");
    sum += Number(currentRadio.value);
    if (isNext) {
        sums.push(sum);
        sum = 0;
    }
    if (level === LEVELS) {
        $(".radio").off("click");
        screen3();
    }
    isNext = !isNext;
    isOn = false;
    currentRadio.checked = false;
    $("#question").html(questions[level - 1]);
    level++;
    $("#current-level").html(level);
    if (level === LEVELS) {
        $("#next").html("<- סיום");
    } 
}

let screen3 = () => {
    $("#screen-2, #screen-3").toggle();
    for (let i = 0; i < obj.length; i++) {
        $("#screen-3").append(`<h1 class="header">${obj[i].category}</h1>
        <div id="load-bars-${i}" class="load-bars"></div>`);
        for (let j = 0; j < obj[i].values.length; j++) {
            $("#load-bars-" + i).append(`<div class="load-bar">${obj[i].values[j]}<br>
            <div class="circle"><p class="grade">${sums.shift()}</p></div>
            </div>`);
        }
    }
    $("#screen-3").append(`<button id="start-over" class="btn btn2 start-over"><- התחלה מחדש</button>`);
    $("#start-over").on("click", startOver);
}

let startOver = () => {
    $("#screen-3").html("");
    $("#current-level").html(1);
    $("#question").html("אני סקרן תמיד לגבי העולם");
    $("#next").html("<- שאלה הבאה");
    $("#start-over").off("click");
    screen2();
}