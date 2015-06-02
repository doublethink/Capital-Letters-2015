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
        console.log("console log init");
        this.bindEvents();
        this.initFastClick();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
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
        $.ajaxSetup ({
            cache: false
        });
        initEvents();
    },
    initEvents: function() {
        if (typeof window.localStorage.radio_choice === 'undefined') {
            init.setDefaultSchedule();
        }
        init.setRadioButtons();
    }
};

// Separate variable needed for internal function number limitation
var init = {
    // Function only called the first time app is launched
    setDefaultSchedule: function() {
        var radio_choices = []
        var radio_defaults = ['radio-choice-1-opt1', 'radio-choice-2-opt1', 'radio-choice-3-opt1'];
        for (i = 0; i < 3; i++){    // number of storage variables
            radio_choices[i] = radio_defaults[i];
        }
        window.localStorage.radio_choice = JSON.stringify(radio_choices);   //JSON.parse(window.localStorage.radio_choice)
    },
    setRadioButtons: function() {
        $("input[name*=radio-choice-]:checked").each(function() {
            alert($(this).attr('id'));
        });
    }
};