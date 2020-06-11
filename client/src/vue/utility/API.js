// Function that can be used to make AJAX GET requests and response is returned
const get = (URI, e) => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);

      Event.$emit(e, response);
    }
  };

  xhttp.open('GET', URI, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send();
};

// Function that can be used to make AJAX POST requests and response is returned
const post = (URI, data, e) => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);

      Event.$emit(e, response);
    }
  };

  xhttp.open('POST', URI, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(data));
};

export default { get, post };
