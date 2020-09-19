function updateCalender(fullYearOnlyFunction) {
    var fullYearOnly, dayOfWeek, initials, dateHtml, dateDataLength, gridClassName, sortedJson = [[],[],[],[],[],[],[]];
    var emptyDataHtml = '<div class="emptySymbol"><span>&#8226;</span>&ensp;<span>&#8226;</span><br><span>&#126;</span></div>';
    var jsonInput = JSON.parse(document.getElementById("jsonInputData").value);
    var birthYear = document.getElementById("birthYear").value;
    for (var i in jsonInput) {
        fullYearOnly = new Date(jsonInput[i].birthday).getFullYear();
        if (fullYearOnlyFunction) {
            if (birthYear == fullYearOnly) {
                initials = jsonInput[i].name.match(/\b\w/g) || [];
                initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                jsonInput[i].initials = initials;
                dayOfWeek = new Date(jsonInput[i].birthday).getDay();
                sortedJson[dayOfWeek].push(jsonInput[i]);
            }
        } else {
            initials = jsonInput[i].name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            jsonInput[i].initials = initials;
            dayOfWeek = new Date(jsonInput[i].birthday).getDay();
            sortedJson[dayOfWeek].push(jsonInput[i]);
        }

    }
    for (var i in sortedJson) {
        dateHtml = "";
        gridClassName = "";
        sortedJson[i].sort(function(a, b) {
            return new Date(a.birthday) - new Date(b.birthday)
        });
        dateDataLength = sortedJson[i].length;
        dateDataLength > 9 ? gridClassName = "moreThenNine" : dateDataLength > 4 ? gridClassName = "moreThenFour" : dateDataLength > 1 ? gridClassName = "moreThenOne" : gridClassName = "none";
        for (var j in sortedJson[i]) {
            dateHtml += "<div class='grid-item'>" + sortedJson[i][j].initials + "</div>"
        }
        document.getElementsByClassName("day" + i)[0].getElementsByClassName("grid-container")[0].classList.remove("moreThenNine", "moreThenFour", "moreThenOne", "none");
        document.getElementsByClassName("day" + i)[0].getElementsByClassName("grid-container")[0].classList.add(gridClassName);
        document.getElementsByClassName("day" + i)[0].getElementsByClassName("grid-container")[0].innerHTML = dateHtml;
        if (!dateDataLength) {
            document.getElementsByClassName("day" + i)[0].getElementsByClassName("grid-container")[0].innerHTML = emptyDataHtml;
        }
    }
    if (fullYearOnlyFunction) {
        document.getElementById("updateBtn").classList.add("disableBtn");
    } else {
        document.getElementById("updateBtn").classList.remove("disableBtn");
    }
}