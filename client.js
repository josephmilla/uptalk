var endpoint = "http://104.236.42.16:5000/";
var responses = [];
var responsesHistory = [];
var user = "";
var current = {
	conv : [],
	pos  : 0,
	real : [],
	one  : [],
	one  : [],
	order   : [0,1,2],
	replies : ["", "", ""];
}

function getNewConversation() {
	callUrl("api/messages/random", getNewConversationHandler);
}

function getNewConversationHandler(res) {
	// TODO: Complete handling
	parseHist(res);
}

function parseHist(res) {
	current.conv = res.original;
	current.real = res.real;
	current.pos  = 0;
	current.order   = [0, 1, 2];
	current.replies = [real, res[1], res[2]];
}

function addResponse(message) {
	message.trim()
	responses.push(message);
	drawResponse();
	if (responses.length >= 4) {
		sendResponses();
		drawResponseOptions();
	}
}

function drawResponse(message) {

}

function drawResponseOptions() {

}

function sendResponses() {
	var submit = {
		user : user,
		res  : responses,
	};
	responsesHistory.concat(responses);
	responses = [];
	callUrlJson("api/messages/submit", submit, sendResponsesHandler);
}

function wordStats() {
	var giantWord = responsesHistory.join(' ');
	for (var i=0; i<
}

function sendResponsesHandler(res) {
	// TODO: 
}

function screenSelect(pos) {
	if (pos == current.pos) {
		sendSelection(1);
	}
	else {
		sendSelection(0);
	}
	drawStats();
}

function sendSelection(correct) {
	var submit = {
		user    : user,
		correct : res,
	};
	callUrlJson("api/messages/select", submit, sendSelectionHandler);
}

function sendSelectionHandler(res) {
	// TODO: 
}

function drawStats() {

}

function callUrl(url, fn) {
	url = endpoint + url;
	var req = new XMLHttpRequest();
    req.open("GET", url, true);
	if (arguments.length == 3) {
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				fn(req.responseText);
			}
		}
	}
	try {
		req.send();
	}
	catch(e) {}
}

function callUrlJson(url, json, fn) {
	url = endpoint + url;
	fn = fn || function(){};
	var req = new XMLHttpRequest();
	req.open("POST", url, true);
	req.setRequestHeader("Content-type", "application/json");
	if (arguments.length == 3) {
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				fn(req.responseText);
			}
		}
	}
	try {
		var jsonString = JSON.stringify(json);
		req.send(jsonString);
	}
	catch(e) {}
}
