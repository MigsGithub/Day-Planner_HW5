
//Set up time 

$("#current").text(moment().format('LLLL'));


// Hours Vars

var hours = [
    { time: "8 AM", event: "" },
	{ time: "9 AM", event: "" },
	{ time: "10 AM", event: "" },
	{ time: "11 AM", event: "" },
	{ time: "12 PM", event: "" },
	{ time: "1 PM", event: "" },
	{ time: "2 PM", event: "" },
	{ time: "3 PM", event: "" },
	{ time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
    { time: "6 PM", event: "" }
];

// HRS Blocks

var hourCo = function (time) {
    var testHr = moment(moment().format("H A"), "H A");
    var hourBlock = moment(time, "H A");

    if (testHr.isBefore(hourBlock) == true) {
        return "future";
    } else if (testHr.isAfter(hourBlock) == true) {
        return "past";
    } else {
        return "present";
    }
};

// Retrieve if saved 

if (JSON.parse(localStorage.getItem("savedSchedule")) !== null) {
    hours = JSON.parse(localStorage.getItem("savedSchedule"));
};


hours.forEach(function(hourBlock, index) {
    let timeLabel = hourBlock.time;
    let hourColor = hourCo(timeLabel);

    let hourFormat =
    '<div class="time-block" id="' + index +'"><div class="row no-gutters input-group"><div class="col-sm-2 col-lg-1 input-group-prepend hourCo justify-content-end pr-4 pt-5">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		hourColor +
		' description">' +
		hourBlock.event +
        '</textarea><div class="col-sm-2 col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit">"Save"</button></div></div></div>';
    
    $(".container").append(hourFormat);
});


//Storage Save


$(".saveBtn").on("click", function(event) {
    let blockID = parseInt($(this).closest(".time-block").attr("id"));
    let userEntry = $.trim($(this).parent().siblings("textarea").val());

    hours[blockID].event = userEntry;

    localStorage.setItem("savedSchedule", JSON.stringify(hours));
});



