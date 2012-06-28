function save() {
  var val = $("#url").val();
  if (!(val.indexOf("http://") == 0 || val.indexOf("https://") == 0)) {
    alert("Please enter a valid URL");
    return false;
  }
  if (val.lastIndexOf("/") == (val.length - 1)) {
    val = val.substring(0, val.length - 1);
  }

  localStorage['rbUrl'] = val;
  alert("Saved! You should reload your Gmail tabs to reflect the changes.");
  return true;
}

function load() {
  $("#url").val(localStorage['rbUrl']);
}

function init() {
  $(".options-form").submit(save);
  load();
}

$(init);
