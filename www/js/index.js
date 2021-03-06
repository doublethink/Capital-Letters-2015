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
    //SOME_CONSTANTS : false,  // some constant


    // Application Constructor
    initialize: function() {
        $.ajaxSetup ({
            cache: false
        });
        console.log("console log init");
        this.bindEvents();        
        this.initRadio();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        this.initZoom();
        this.initFastClick();
        init.bindonClick();
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    // Phonegap is now ready...
    onDeviceReady: function() {
        //console.log("device ready, start making you custom calls!");
    },

    initRadio: function() {
        // initialise array
        if (typeof window.localStorage.radio_choice === 'undefined') {
            var radio_choices = []
            window.localStorage.radio_choice = JSON.stringify(radio_choices);
        }
        
        init.setRadioButton();
    },

    initZoom: function(){
        $(".panzoom-elements").panzoom();
    }
};

// Separate variable needed for internal function number limitation
var init = {

    bindonClick: function(){
        // Function to add radio button to array if new controlgroup or not already selected
        $("input[type='radio']").bind( "change", function(event, ui) {
            //Get the stored array of choices
            var radio_choices = JSON.parse(window.localStorage.radio_choice);

            //Get control group from current choice
            var id = $(this).attr("id");
            var controlgroup = id.substring(0, id.length - 5);
            // Get index from id
            var regex  = /\d+/m;
            var controlindex = id.match(regex);

            // Make changes to existing controlgroups
            if (radio_choices[controlindex] == null){
                radio_choices[controlindex] = id;
            } else {
                // remove from list
                radio_choices[controlindex] = null;
                $("input[id=" + id + "]").attr("checked",false);
                $("input[type='radio']").checkboxradio("refresh");
            }

            window.localStorage.radio_choice = JSON.stringify(radio_choices);            
        });
    },

    setRadioButton: function() {
        // Set previous choices
        var radio_choices = JSON.parse(window.localStorage.radio_choice);

        for (var i = 0; i < radio_choices.length; i++){
            if (radio_choices[i] != null) {
               $("input[id=" + radio_choices[i] + "]").attr("checked",true);
            }
        }
    },

};