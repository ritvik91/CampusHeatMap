/*
 * Server.js
 * 
 * The main portion of this project. Contains all the defined routes for express,
 * rules for the websockets, and rules for the MQTT broker.
 * 
 * Refer to the portions surrounded by --- for points of interest
 */
var express   = require('express'),
	app       = express();
var pug       = require('pug');
var sockets   = require('socket.io');
var path      = require('path');
var bodyParser = require('body-parser');
var appMobile = express();
var globalSocket;
appMobile.use(bodyParser.urlencoded({ extended: true }));

var conf      = require(path.join(__dirname, 'config'));
var internals = require(path.join(__dirname, 'internals'));
var reff_mqtt;
var db_handler;
var countA=0, countB=0, countC=0, countD=0, countE=0, countF=0, countG=0, countH=0 ;
// -- Setup the application
setupExpress();
setupSocket();
appMobile.post('/users',function(req, res){

  var reqCode = req.body.reqCode;
  console.log(reqCode);
  if(reqCode=='1')
  {
	  if(countA == 1)
	  {
		  countA = 0;
		  cursor = db_handler.find({_id: 'loc1'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count + 1;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc1'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 1,
						op: 2
					});
		  });
		  console.log("updated database values");
	   }
	   else
		  countA = 1;
  }
  else if(reqCode=='2')
  {
	  if(countB == 1)
	  {
		  countB = 0;
		  cursor = db_handler.find({_id: 'loc1'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count - 1;
					if(count<0)
						count = 0;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc1'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 1,
						op: -2
					});
		  });
		  console.log("updated database values");
	  }
	  else
		  countB = 1;
  }
  else if(reqCode=='3')
  {
	  if(countC == 1)
	  {
		  countC = 0;
		  cursor = db_handler.find({_id: 'loc2'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count + 1;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc2'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 2,
						op: 2
					});
		  });
		  console.log("updated database values");
	  }
	  else 
		  countC = 1;
  }
  else if(reqCode=='4')
  {
	  if(countD == 1)
	  {
		  countD = 0;
		  cursor = db_handler.find({_id: 'loc2'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count - 1;
					if(count<0)
						count = 0;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc2'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 2,
						op: -2
					});
		  });
		  console.log("updated database values");
	  }
	  else 
		  countD = 1;
  }
  else if(reqCode=='5')
  {
	  if(countE == 1)
	  {
		  countE = 0;
		  cursor = db_handler.find({_id: 'loc3'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count + 1;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc3'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 3,
						op: 2
					});
		  });
		  console.log("updated database values");
	  }
	  else
		  countE = 1;
  }
  else if(reqCode=='6')
  {
	  if(countF == 1)
	  {
		  countF = 0;
		  cursor = db_handler.find({_id: 'loc3'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count - 1;
					if(count<0)
						count = 0;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc3'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 3,
						op: -2
					});
		  });
		  console.log("updated database values");
	  }
	  else
		  countF = 1;
  }
  else if(reqCode=='7')
  {
	  if(countG == 1)
	  {
		  countG = 0;
		  cursor = db_handler.find({_id: 'loc4'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count + 1;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc4'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 4,
						op: 2
					});
		  });
		  console.log("updated database values");
	  }
	  else
		  countG = 1;
  }
  else if(reqCode=='8')
  {
	  if(countH == 1)
	  {
		  countH = 0;
		  cursor = db_handler.find({_id: 'loc4'});
		  cursor.forEach( function(dtb, err) {
					var count = dtb.counter;
					count = count - 1;
					if(count<0)
						count = 0;
					console.log("this is count "+ count);
					
					db_handler.update({_id:'loc4'}, {$set:{counter:count}});
					globalSocket.emit('countUpdated', {
						no: 4,
						op: -2
					});
		  });
		  console.log("updated database values");
	  }
	  else
		countH = 1;
  }
})
appMobile.listen(8090);
console.log("Server running on 8090 port");

// -- Socket Handler
// Here is where you should handle socket/mqtt events
// The mqtt object should allow you to interface with the MQTT broker through 
// events. Refer to the documentation for more info 
// -> https://github.com/mcollina/mosca/wiki/Mosca-basic-usage
// ----------------------------------------------------------------------------
function socket_handler(socket, mqtt) {
	// Called when a client connects
	mqtt.on('clientConnected', client => {
		console.log('New client connected: ' + client.id);
		socket.emit('debug', {
			type: 'CLIENT', msg: 'New client connected: ' + client.id
		});
		socket.on('published', function(){
			publishToMbed();
		});
	});
	
	// Called when a client disconnects
	mqtt.on('clientDisconnected', client => {
		socket.emit('debug', {
			type: 'CLIENT', msg: 'Client "' + client.id + '" has disconnected'
		});
	});

	// Called when a client publishes data i.e mbed publishes
	mqtt.on('published', (data, client) => {
		if (!client) return;
		
		var tp = data['topic'];
		var cursor;
		var publish_msg;
		
		//get all the values corresponding to particular MBED
		//each MBED has its own topic
		if(new String("ritvikTopic").valueOf() == new String(tp).valueOf()){
			cursor = db_handler.find({_id: 'loc1'});
		}
		else if(new String("mohitTopic").valueOf() == new String(tp).valueOf()){
			cursor = db_handler.find({_id: 'loc2'});
		}
		else if(new String("board3Topic").valueOf() == new String(tp).valueOf()){
			cursor = db_handler.find({_id: 'loc3'});
		}
		else if(new String("board4Topic").valueOf() == new String(tp).valueOf()){
			cursor = db_handler.find({_id: 'loc4'});
		}
		
		//process each row that corresponds to a given ID
		//in our case this is only 1 row
		//update the counter in the row and if exceeds threshhold report
		cursor.forEach( function(dtb, err) {
				
				var count = dtb.counter;
				count = count + 1;
				console.log("this is count "+ count);
				
				//20 is the threshold
				if(count >= 20) {
					var topicName;
					if(dtb.id == 'loc1')
					{
						topicName = 'ritvikTopic'; 
						publishToMbed(topicName);
						socket.emit('countUpdated', {
							no: 1,
							op: 1
						});
					}
					if(dtb.id == 'loc2')
					{
						topicName = 'mohitTopic'; 
						publishToMbed(topicName);
						socket.emit('countUpdated', {
							no: 2,
							op: 1
						});
					}
					if(dtb.id == 'loc3')
					{
						topicName = 'board3Topic'; 
						publishToMbed(topicName);
						socket.emit('countUpdated', {
							no: 3,
							op: 1
						});
					}
					if(dtb.id == 'loc4')
					{
						topicName = 'board4Topic'; 
						publishToMbed(topicName);
						socket.emit('countUpdated', {
							no: 4,
							op: 1
						});
					}			
				}
				if(new String("ritvikTopic").valueOf() == new String(tp).valueOf())
				{
					db_handler.update({_id:'loc1'}, {$set:{counter:count}});
					socket.emit('countUpdated', {
						no: 1,
						op: 1
					});
				}
				else if(new String("mohitTopic").valueOf() == new String(tp).valueOf())
				{
					db_handler.update({_id:'loc2'}, {$set:{counter:count}});
					socket.emit('countUpdated', {
						no: 2,
						op: 1
					});
				}
				else if(new String("board3Topic").valueOf() == new String(tp).valueOf())
				{
					db_handler.update({_id:'loc3'}, {$set:{counter:count}});
					socket.emit('countUpdated', {
						no: 3,
						op: 1
					});
				}
				else if(new String("board4Topic").valueOf() == new String(tp).valueOf())
				{
					db_handler.update({_id:'loc4'}, {$set:{counter:count}});
					socket.emit('countUpdated', {
						no: 4,
						op: 1
					});
				
				
				console.log("updated database values");
				
				//debug lines to check if the counter is updated
				publish_msg = dtb.counter;
				socket.emit('debug', {
					type: 'PUBLISH', 
					msg: 'Data in mongo"' + client.id + '" published "' + JSON.stringify(publish_msg) + '"'
				});
				}
		});
		console.log("Debug point: successful run till here");
		
	});

	// Called when a client subscribes i.e when mbed connects for the first time
	mqtt.on('subscribed', (topic, client) => {
		if (!client) return;

		socket.emit('debug', {
			type: 'SUBSCRIBE',
			msg: 'Client "' + client.id + '" subscribed to "' + topic + '"'
		});
	});

	// Called when a client unsubscribes
	mqtt.on('unsubscribed', (topic, client) => {
		if (!client) return;

		socket.emit('debug', {
			type: 'SUBSCRIBE',
			msg: 'Client "' + client.id + '" unsubscribed from "' + topic + '"'
		});
	});
}


function publishToMbed(topicName){
	var message = {
		topic: topicName,
		payload : 'alexaHi',
		qos: 0,
		retain: false
	};
	
	reff_mqtt.publish(message, function(){
		console.log("done");
	});
}

// Helper functions
function setupExpress() {
	app.set('view engine', 'pug'); // Set express to use pug for rendering HTML

	// Setup the 'public' folder to be statically accessable
	var publicDir = path.join(__dirname, 'public');
	app.use(express.static(publicDir));

	// Setup the paths (Insert any other needed paths here)
	// ------------------------------------------------------------------------
	// Home page
	app.get('/', (req, res) => {
		res.render('index', {title: 'MQTT Tracker'});
	});

	// Basic 404 Page
	app.use((req, res, next) => {
		var err = {
			stack: {},
			status: 404,
			message: "Error 404: Page Not Found '" + req.path + "'"
		};

		// Pass the error to the error handler below
		next(err);
	});

	// Error handler
	app.use((err, req, res, next) => {
		console.log("Error found: ", err);
		res.status(err.status || 500);

		res.render('error', {title: 'Error', error: err.message});
	});
	// ------------------------------------------------------------------------

	// Handle killing the server
	process.on('SIGINT', () => {
		internals.stop();
		process.kill(process.pid);
	});
}

function setupSocket() {
	var server = require('http').createServer(app);
	var io = sockets(server);
	
	// Setup the internals
	
	internals.start(mqtt => {
		io.on('connection', socket => {
			socket_handler(socket, mqtt);
			globalSocket = socket;
			reff_mqtt = mqtt;
			db_handler = mqtt.ascoltatore.db.collection('ascoltatori');
			
			


		});
	});
	 	
	server.listen(conf.PORT, conf.HOST, () => { 
		console.log("Listening on: " + conf.HOST + ":" + conf.PORT);
	});
}
