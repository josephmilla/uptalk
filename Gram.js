var gingerbread = require('gingerbread');

var messages = new Array("I will running tomorrow","The transformed age towers within a cosy disturbance.","Your essence flips above a fudge!","Will the participating doom envisage whatever prevalent icon?","The able detector meets a funnier gospel.");
var spellingErrors = new Array();
var grammarErrors = new Array();
var avgWordCount;
var advancedWord;
var freqWord;

function generateStats(){
	console.log("Generating Stats..");
	for(var i=0; i<messages.length;i++){
		
		gingerbread(messages[i],{},function(error,text,result,corrections){
			  if(corrections.length>0){
  			  	 //console.log("Corrections:"+JSON.stringify(corrections));
  			  	 for(var j=0; j<corrections.length;j++){
  			  	 	if(corrections[j].definition){
  			  	 		console.log("Spelling error detected");
  			  	 		spellingErrors.push(corrections[j]);
  			  	 	}else{
  			  	 		console.log("grammar error detected");
  			  	 		grammarErrors.push(corrections[j]);
  			  	 	}
  			  	 }
  			  }
		});
	}
}

/*
gingerbread('All your bases are belong to us.', {}, function (error, text, result, corrections) {
  console.log("Error:"+error);
  console.log("Text:"+text);
  console.log("Result:"+result);
  console.log("Corrections:"+JSON.stringify(corrections));

});
*/

generateStats();

function get