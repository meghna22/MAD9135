/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var app = {
// Application Constructor
		initialize: function() {
		this.bindEvents();
},
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		var button1= document.getElementById("location");
		button1.addEventListener("click",whereAmI,true);
	},

// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
	app.receivedEvent('deviceready');
	},
// Update DOM on a Received Event
		receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');
		
		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

   function whereAmI(){
		navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack,{
		enableHighAccuracy:true,
		timeout:5000});
   }
	function successCallBack(position){
		var message= "I am at Latitude = "+ position.coords.latitude+"longitude="+ position.coords.longitude;
        console.log(message);
		var request = XMLHttpRequest();
		request.open("GET", 
			"http://open.mapquestapi.com/geocoding/v1/reverse?key=Fmjtd%7Cluur2huzl1%2C7a%3Do5-9waad6&location=" + 
			position.coords.latitude + "," + position.coords.longitude, true);
		request.onreadystatechange=function(){
            console.log(request.readyState);
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
                    console.log("*"+request.responseText+"*");
			    var p1 = document.getElementById("city");
				var city = JSON.parse(request.responseText);
				p1.innerHTML = city.results[0].locations[0].adminArea5;
				
					//alert(request.responseText);
				} else {
                    console.log(request.status);
                }
				//console.log(request.responseText);
   			}
	   };
	request.send();
    }
	function errorCallBack(){
	   alert(error.code);
    }
    