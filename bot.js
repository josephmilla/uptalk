var bot = {
	baseLang : "en-US",
	baseUrl : "http://www.botlibre.com/rest/botlibre/form-chat?instance=165&application=8821025394976658259&message=",

	getUrl : function(query) {
		var url = this.baseUrl + query;
		return url;
	},

	getMessage : function(xml) {
		var cut1 = xml.substr(0, xml.lastIndexOf("</message>"));
		var cut2 = cut1.substr(cut1.lastIndexOf("<message>") + "<message>".length);
		return cut2;
	},

	fetch : function(query, fn) {
		var url = this.getUrl(query);
		bot.callUrl(url, fn);
	},

	callUrl : function(url, fn) {
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
	},
};

var go = {
	responses : [],



	beginChain : function(message) {
		go.sendChatBotRequest(message);
	},

	sendChatBotRequest : function(text) {
		bot.fetch(text, go.handleChatReceive);
	},

	handleChatReceive : function(res) {
		var text = bot.getMessage(res);
		if (text == "Hi Anonymous") text = "Hey! How are you?";
		go.responses.push(text);
	},
};
