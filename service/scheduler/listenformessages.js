//import the azure module
var azure = require('azure');
var c_Timeout = 60;

function listenForMessages() {
   console.log('Started new listener job');
   
   var date = new Date();
   var time = date.getTime();
   //get the current unix time in seconds
   var startSeconds = time / 1000;
  
   
   console.log(process.env.ServiceBusConnString);
   var sb = azure.createServiceBusService(process.env.ServiceBusConnString);
   
}