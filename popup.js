// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function start(e) {
    chrome.tabs.executeScript(null ,{ code:"stop();"});
  chrome.tabs.executeScript
  (null,
      {
          file:"code.js"
      });
  window.close();
}


function stop()
{
    chrome.tabs.executeScript(null ,{ code:"stop();"});
    window.close();
}
document.addEventListener('DOMContentLoaded',
    function ()
    {
        var divs = document.getElementById("start");
        divs.addEventListener("click",start);
    }
);

document.addEventListener('DOMContentLoaded',
    function ()
    {
        var div=document.getElementById("stop");
        div.addEventListener("click",stop);
    }
);
