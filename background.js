chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}
openWindowFirst = null;
chrome.browserAction.onClicked.addListener(function(tab){
  chrome.windows.getCurrent(function(wind) {
    //alert(wind.id);
    var options = { 
      width: Math.floor(window.screen.availWidth/2),
      state:'normal'
    };
    if(openWindowFirst){
      options.left = 0;
    }
    else{
      options.left = options.width;
      openWindowFirst = wind.id;
    }

    chrome.windows.update(wind.id,options);
    injectJsCurrentTab();
  });
});

chrome.windows.onRemoved.addListener(function(windowId){
  if(windowId == openWindowFirst){
    windowId = null;
  }
});