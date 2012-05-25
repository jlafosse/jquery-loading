jquery.loading
=============
The loading plugin overlays a "waiting spinner" over an element that is typically being called through ajax or [hijack](https://github.com/jlafosse/jquery-hijack)

Installation
============
Include script *after* the jQuery library (unless you are packaging scripts in an alternative manner):

    <script src="/path/to/jquery.loading.js"></script>

Usage
=====
Start the loading

    $('#foo').loading();
    
Stop the loading

    $('#foo').loading();
    
Options
=======

    delay (int Default:250ms)
Sets a delay on when the loading icon will appear. This helps prevent "flashing" of the content in cases where the response might be very quick.

    css (object Default:{'opacity':'.75','background-color':'#ffffff','z-index':'99'})
Sets the css attributes for the loading overlay

    img (object Default:{'src':'/images/mozilla_blue.gif','width':'16','height':'16','border':'0'})
Sets the img attributes for the loading image

    includeBorder (boolean Default:true)
Sets whether or not to include the target element border

    imgInViewport (boolean Default:true)
Sets whether or not the loading image is centered in the viewport relative to the div

Changelog
=========

Development
===========
- Source hosted at [GitHub](https://github.com/jlafosse/jquery-loading)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/jlafosse/jquery-loading/issues)

Authors
=======
[Jason LaFosse](https://github.com/jlafosse)
