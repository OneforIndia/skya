(function(w,d){

windowData = {};
pageData = {};
controlData = {};
localvarstore = true;
clientIP="";
$(function ()
    {
        $.getJSON("http://jsonip.appspot.com?callback=?",
        function(data){
        clientIP =  data.ip;
        });

        var beforetime = new Date().getTime();
        window.onload = gettimeload;
        function gettimeload()
        {
            var aftertime = new Date().getTime();
            // Time calculating in seconds
            loadtime = (aftertime - beforetime) / 1000
            function getPageData(){ 
                pageData   = {
                    loadTime        : loadtime,
                    unloadTime      : "",
                    language        : window.navigator.language,
                    platform        : window.navigator.platform,
                    port            : window.location.port,
                    client          : {
                        name            : window.navigator.appVersion,
                        innerWidth      : window.innerWidth,
                        innerHeight     : window.innerHeight,
                        outerWidth      : window.outerWidth,
                        outerHeight     : window.outerHeight,
                        ip              : clientIP
                    },
                    page            : {
                        location        : window.location.pathname,
                        href            : window.location.href,
                        origin          : window.location.origin,
                        title           : document.title
                    }
                }

                windowData= {
                pageData : pageData,
                controlData : {}
                }} 
        // if(typeof(Storage) !== "undefined") {
        // window.sessionStorage.setItem("windowData",windowData);
        // } else {
        // localvarstore = false;
        // }
        getPageData();
        PushData();
    }
});

/*capture mouse position on click*/
var currentMousePos = { x: -1, y: -1 };
jQuery(function($) {
    
    $(document).click(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });
});

/*Attach EventListner to capture when a hyperlink or button is clicked */
$(document).ready(function() {
 
 var arrayCtrlType=[":button","a"];
    for (var i = 0; i < arrayCtrlType.length; i++) 
    {
        $(arrayCtrlType[i]).click(function(event){
            var clientPosition = {};
            var $focused = $(':focus');
            var position = $focused.position();
            if ( typeof position != "undefined")
                clientPosition  = {
                    x               : position.left,
                    y               : position.top
                }

            //alert( "left: " + currentMousePos.x + ", top: " + currentMousePos.y );

            controlData     = {
                //type            : type,
                event           : event.type,
                targetTag       : $(this).prop("id") || $(this).prop("value") || $(this).prop("name"),
                content         : $(this).prop("innerText"),
                clientPosition  : clientPosition,
                createdAt       : new Date().getTime()
            };

            windowData = {pageData: pageData, controlData: controlData};

            PushData();

            // alert(event.type);
            // alert($(this).prop("id") || $(this).prop("value") || $(this).prop("name"));
            // var $focused = $(':focus');
            // var position = $focused.position();
            // if ( typeof position != "undefined")
            // alert( "left: " + position.left + ", top: " + position.top );
            // alert( "left: " + currentMousePos.x + ", top: " + currentMousePos.y );
        })
    }
 
});

    function PushData(event)
    {
        //alert(JSON.stringify(windowData));
        // $("#txt").innerText = JSON.stringify(windowData);
         $("#txt").val(JSON.stringify(windowData));
        // $("#txt").innerText = JSON.stringify(windowData);
        // ajax            = new XMLHttpRequest();
        // ajax.open('POST', 'http://localhost:8080/api/SKYA', false);
        // ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // ajax.send(JSON.stringify(windowData));

        $.support.cors = true;   
        var param = JSON.stringify(windowData);
        $.ajax({
           url: 'https://microsoft-apiapp4aafe2cb045b495390bbc10a6e3be831.azurewebsites.net/api/SKYA?value='+param,
           data: {
              format: 'json'
           },
           error: function() {
              //alert('<p>An error has occurred</p>');
           },
           dataType: 'jsonp',
           success: function(data) {
              alert('Success');
           },
           type: 'GET'
        });

        
        // $.ajax({
        //     url: 'https://microsoft-apiapp4aafe2cb045b495390bbc10a6e3be831.azurewebsites.net/api/SKYA?value='+param,
        //     type: 'GET',
        //     data:JSON.stringify(windowData),            
        //     contentType: "application/json;charset=utf-8",
        //     success: function (data) {
        //         WriteResponse(data);
        //     },
        //     error: function (data) {
        //         alert(data);
        //     }
        // });


    }

}
)(window,document);
