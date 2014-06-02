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
	this.showStaticMap();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, {maximumAge: 180000, timeout: 5000, enableHighAccuracy: true});
    },

	onSuccess: function(position) {
		var longitude = position.coords.longitude;
		var latitude = position.coords.latitude;
		var latLong = new google.maps.LatLng(latitude, longitude);

		var mapOptions = {
			center: latLong, 
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);

		new google.maps.Marker({
			map: map,
			position: latLong
		});

		var circle = new google.maps.Circle({
			center: latLong,
			radius: position.coords.accurancy,
			map: map,
			fillColor: '#0022DD',
			fillOpacity: 0.5,
			strokeColor: '#0022DD',
			strokeOpacity: 1.0
		});
		map.fitBounds(circle.getBounds());
	},
	
	onError: function(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	},

	showStaticMap: function () {
		var longitude = 10.894629;
		var latitude = 48.373699;
		var latLong = new google.maps.LatLng(latitude, longitude);

		var mapOptions = {
			center: latLong, 
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("geolocation_static"), mapOptions);

		new google.maps.Marker({
			map: map,
			position: latLong
		});

		var hg = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(48.372218,10.893497),
			title: "Hofgarten"
		});

		var mh = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(48.372576,10.897347),
			title: "Mozarthaus"
		});

		var mh1 = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(48.372886,10.897107),
			title: "Mozarthaus 1"
		});


		var dom = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(48.372883,10.897105),
			title: "Dom"
		});

		var circle = new google.maps.Circle({
			center: latLong,
			radius: 5.0,
			map: map,
			fillColor: '#0022DD',
			fillOpacity: 0.5,
			strokeColor: '#0022DD',
			strokeOpacity: 1.0
		});
		map.fitBounds(hg.getLatLng(), mh.getLatLng());
	}
};
