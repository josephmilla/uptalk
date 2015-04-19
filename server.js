var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var history = [
	{
		"original" : ["Hey!",       , "I'm great. Thanks for asking!", "I do, but eat it rarely. What kind do you like?"],
		"real"     : ["How are you?", "Do you like candy?"           , "My favorite is Laffy Laffy."],
		"1"        : ["Fake"        , "Fake"                         , "Fake"],
		"2"        : ["Even Faker"  , "More Fake"                    , "Fakeish"],
	},{
		"original" : ["Two!",       , "I'm great. Two for asking!"   , "I do, but two it rarely. What kind do you like?"],
		"real"     : ["Two are you?", "Do you like two?",            , "My favorite is Two Two."],
		"1"        : ["Fake"        , "Fake"                         , "Fake"],
		"2"        : ["Even Faker"  , "More Fake"                    , "Fakeish"],
	},{
		"original" : ["Extra!",     , "I'm great. Extra for asking!" , "I do, but eat extra rarely. What kind do you like?"],
		"real"     : ["Extra you?"  , "Do you like extra?",          , "My favorite is Extra Extra."],
		"1"        : ["Fake"        , "Fake"                         , "Fake"],
		"2"        : ["Even Faker"  , "More Fake"                    , "Fakeish"],
	},
];

app.set('port', process.env.PORT || '5000');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/www"));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// mongoose.connect("");//azure/aws mongodb address??!!!

//mongoose.connect("localhost");

// var size = new Schema({
  // userid: {type: Integer, required: true},
// }, {versionKey: false});


var userSchema = new Schema({
  userid: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true}
}, {versionKey: false});

var chatRoomSchema = new Schema({
  chatroomid: {type: String, required: true},
  user1id: {type: String, required: true},
  user2id: {type: String, required: true},
  user1name: {type: String, required: true},
  user2name: {type: String, required: true},
  lastmessage: {type: String, required: false},
  lastactive: {type: Date, required: false}

}, {versionKey: false});

var messageSchema = new Schema({
  userid: {type: String, required: true},
  chatroomid: {type: String, required: true},
  date: {type: Date, required: true},
  text: {type: String, required: true},
  seen: {type:Boolean, default: false}
}, {versionKey: false});

var messageHistorySchema = new Schema({
  original: {type: Array, required: true},
  chatroomid: {type: String, required: true},
  date: {type: Date, required: true},
  text: {type: String, required: true},
  seen: {type:Boolean, default: false}
}, {versionKey: false});

var allMessageHistorySchema = new Schema({
  histid: {type: Array, required: true},
  chatroomid: {type: String, required: true},
  date: {type: Date, required: true},
  text: {type: String, required: true},
  seen: {type:Boolean, default: false}
}, {versionKey: false});


var User = mongoose.model('User', userSchema);
var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
var Message = mongoose.model('Message', messageSchema);
var MessageHistory = mongoose.model('MessageHistory', messageHistorySchema);

app.post('/api/users/get', function(req, res){
  var postID = req.body.userID;
  User.findOne({userid: postID}, function(err, user){
    if (err || user == null){
      res.status(400).send("Unknown Error");
      return;
    }
    res.status(200).send(user);
  });
});

app.post('/api/users/update', function(req, res){
  var postID = req.body.userID;
  User.update({userid: postID}, {}, function(err, numUpdated){
    if (err){
      console.log(err);
      res.status(400).send("Fail");
      return;
    }
    res.status(200).send("Success");
  });
});

app.post('/api/users/new', function(req, res){
  var postID = req.body.userID;
  var postName = req.body.name;
  var postEmail = req.body.email;
  User.findOne({userid: postID}, function(err, user){
    if (err || user == null){
      var newUser = new User({
        userid: postID,
        name: postName,
        email: postEmail
      })
      newUser.save(function(err, nUser){
        if (err){
          res.status(400).send("Unknown Error");
          return;
        }
        res.status(200).send("New User Created");
      })
    }
    else{
      res.status(200).send("User found");
    }
  })
});

app.post('/api/messages/new', function(req, res){
  var postID = req.body.chatRoomId;
  var postUserId = req.body.userID;
  var postDate = req.body.date;
  var postText = req.body.text;

  var newMessage = new Message({
    chatroomid: postID,
    userid: postUserId,
    date: postDate,
    text: postText
  });
  newMessage.save(function(err, nU){
    if(err){
      res.status(400).send("Unknown Error");
      return;
    }
    res.status(200).send("Sucess");
  })
});

app.post('/api/messages/create', function(req, res){
  var postID = req.body.chatRoomId;
  var postUserId = req.body.userID;
  var postDate = req.body.date;
  var postText = req.body.text;

  var newMessage = new Message({
    chatroomid: postID,
    userid: postUserId,
    date: postDate,
    text: postText
  });
  newMessage.save(function(err, nU){
    if(err){
      res.status(400).send("Unknown Error");
      return;
    }
    res.status(200).send("Success");
  })
});

/****
/
/ Write Here
/
 ****/
app.get('/api/messages/random', function(req, res){
  console.log("Random");
  var num = history.length;
  var selected = Math.floor(Math.random() * num);
  var hist = history[selected];
  res.send(hist);
});

app.get('/api/messages/specific/:n', function(req, res){
  console.log("Specific");
  var selected = req.params.n;
  console.log(selected);
  var hist = history[selected];
  res.send(hist);
});

app.post('/api/messages/submit', function(req, res){
  console.log("Submit:");
  console.log(JSON.stringify(req));
  res.send(hist);
});

app.post('/api/messages/all', function(req, res){
  var postID = req.body.chatRoomId;

  Message.aggregate([
      {$match: {chatroomid: {$eq: postID}}},
      {$project: {
        _id: 1,
        chatroomid: 1,
        userid: 1,
        text: 1,
        seen: 1,
        date: 1
      }}
    ], function(err, messages){
      if (err) {
        res.status(400).send("Unknown Error");
        return;
      }
    console.log(messages);
      res.status(200).send(messages);
  })
});

app.post('/api/messages/lastMessage', function(req, res){
  var postID = req.body.chatRoomId;

  Message.aggregate([
      {$match: {chatroomid: {$eq: postID}}},
      {$sort: {text: 1}},
      {$limit: 1},
      {$project: {
        _id: 1,
        chatroomid: 1,
        userid: 1,
        text: 1,
        seen: 1,
        date: 1
      }}

      //{$slice: {text: -1}},
    ], function(err, messages){
      if (err) {
        res.status(400).send(err);
        return;
      }
    console.log(messages);
      res.status(200).send(messages);
  });
});

app.post('/api/messages/notseen', function(req, res){
  var postID = req.body.chatRoomId;
  var postUserId = req.body.userID;

  Message.aggregate([
      {$match: {chatroomid: {$eq: postID}, userid: {$ne: postUserId}, seen: {$eq: false}}},
      {$project: {
        _id: 1,
        chatroomid: 1,
        userid: 1,
        text: 1,
        seen: 1,
        date: 1
      }}
    ], function(err, messages){
      if (err) {
        res.status(400).send("Unknown Error");
        return;
      }
    console.log(messages);
      res.status(200).send(messages);
  });
});

app.post('/api/messages/seen', function(req, res){
  var postID = req.body._id;

  Message.update({_id: postID}, {seen: true}, {}, function(err, numUpdated){
    if (err){
      console.log(err);
      res.status(400).send("Fail");
      return;
    }
    res.status(200).send("Success");
  });
});

app.post('/api/chatrooms/new', function(req, res){
  var postID = req.body.chatRoomId;
  var postUser1Id = req.body.user1id;
  var postUser2Id = req.body.user2id;
  var postUser1Name = req.body.user1name;
  var postUser2Name = req.body.user2name;

  var newChatRoom = new ChatRoom({
    chatroomid: postID,
    user1id: postUser1Id,
    user2id: postUser2Id,
    user1name: postUser1Name,
    user2name: postUser2Name
  });
  newChatRoom.save(function(err, nC){
    if(err){
      res.status(400).send("Unknown Error");
      return;
    }
    res.status(200).send("Success");
  })
});

app.post('/api/chatrooms/get', function(req, res){
  var postID = req.body.chatRoomId;
  ChatRoom.findOne({chatroomid: postID}, function(err, user){
    if (err || user == null){
      res.status(400).send("Unknown Error");
      return;
    }
    res.status(200).send(user);
  });
});

app.post('/api/chatrooms/getUserChatrooms', function(req, res){
  var postID = req.body.userid;
  ChatRoom.aggregate([
      {$match: {$or: [{user1id: {$eq: postID}}, {user2id: {$eq: postID}}]}},
      {$project: {
        _id: 1,
        chatroomid: 1,
        user1id: 1,
        user2id: 1,
        user1name: 1,
        user2name: 1,
        lastmessage: 1,
        lastactive: 1
      }}
    ], function(err, messages){
      if (err) {
        res.status(400).send("Unknown Error");
        return;
      }
    console.log(messages);
      res.status(200).send(messages);
  })
});

app.listen(app.get('port'));
