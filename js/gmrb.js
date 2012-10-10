function showRbAction(id) {
  rbId = id;
  chrome.extension.sendRequest({type: "showRbAction", rbId: id});
}

function hideRbAction() {
  rbId = null;
  chrome.extension.sendRequest({type: "hideRbAction"});
}

function showNeedSetup() {
  chrome.extension.sendRequest({type: "showSetup"});
}

function viewDiff() {
  if (rbId) {
    chrome.extension.sendRequest({type: "viewDiff", rbId: rbId});
  }
}

function approve() {
  if (rbId) {
    chrome.extension.sendRequest(
      {type: "approve", rbId: rbId}, 
      function(success) {
        if (success) {
          alert("Approved!");
        }
      });
  }
}

function getRbUrl(callback) {
  chrome.extension.sendRequest({type: "rbUrl"}, callback);
}

var rbId = null;
var rbUrl = null;
var re_rgid = new RegExp(".*/r/(\\d+)/.*");

function initialize() {
  getRbUrl(function(url) { 
    rbUrl = url; 
    if (!rbUrl) {
      showNeedSetup();
      return;
    }
    $(window).hashchange(function() {
      setTimeout(checkRb, 100);
    });
    setTimeout(function() {
      $("body").keypress(handleKeyPress);
      checkRb();
    }, 3000);
  });
}

function extractRbIdFromUrl(url) {
  var m = re_rgid.exec(url);
  if (m && m.length >= 2) {
    return m[1];
  }
  return null;
}

function extractRbId() {
  //var $canvas = $("#canvas_frame").contents();
  //var $thread = $("div[role='main']", $canvas);
  var $thread = $("div[role='main']");
  var $anchor = $("a[href*='" + rbUrl + "']", $thread);
  if ($anchor.length > 0) {
    var url = $anchor.attr("href");
    return extractRbIdFromUrl(url);
  } else {
    return null;
  }
}

function checkRb() {
  var id = extractRbId();
  if (id != rbId) {
    if (id) {
      showRbAction(id);
    } else {
      hideRbAction();
    }
  }
}

function handleKeyPress(e) {
  if (e.which == 119) {
    viewDiff();
  } else if (e.which == 87) {
    approve();
  }
}

$(initialize);