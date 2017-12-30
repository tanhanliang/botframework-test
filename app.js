var restify = require('restify');
var builder = require('botbuilder');
var bad_jokes = ["A man walks into a bar. Ouch",
				 "Why did the chicken cross the road? To get to the other side, dummy.",
				 "Why was the big cat disqualified from the race? Because it was a cheetah.",
				];

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

bot.dialog('joke', function (session) {
	joke_no = Math.floor((Math.random() * bad_jokes.length));
	bad_joke = bad_jokes[joke_no];
	session.endDialog(bad_joke);
})
.triggerAction({
	matches: /^joke$/i,
});
