//import the azure module
var azure = require('azure');
var c_Timeout = 60;

function listenForMessages() {
    
    var date = new Date();
    var time = date.getTime();
    //get the current unix time in seconds
    var startSeconds = time / 1000;

	console.log(process.env.ServiceBusConnString);
	var sb = azure.createServiceBusService(process.env.ServiceBusConnString);

	function listenForMessages(seconds) {
		  console.log('Listening for new messages with timeout: ' + seconds);
		  sb.receiveQueueMessage('mobileservice', {timeoutIntervalInS: seconds },
            function(err, data){

            	var continueRecieveMessages = function(){
				   //go back and listen for more message for the duration of this task
				   var currentDate = new Date();
				   var currentSeconds = currentDate.getTime() / 1000;
				   
				   console.log('currentSeconds ' + currentSeconds);
				   console.log('startSeconds ' + startSeconds);
				   var newTimeout = Math.round((c_Timeout - (currentSeconds - startSeconds)));
				   if(newTimeout > 0){
					   //note: the recieveQueueMessage function takes ints no decimals!!
					   listenForMessages(newTimeout);
				   }
			    }

            	if(!err){
            	   //we recieved a message within the timeout.
				   
				   var dataObj = JSON.parse(data.body);
				   
				   if(dataObj.message){
					   console.log('Recieved message from SB: ' + dataObj.message);
				   }
				   else{
					   console.error('Recieved a malformed json object');
				   }
            	}
            	else{
            		console.log(err);
            	}

            	continueRecieveMessages();
            });
        }
    listenForMessages(c_Timeout);
}