// Function that can be used to make AJAX GET requests and response is returned
const get = (URI, e, code) => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == code) {
      var response = JSON.parse(this.responseText);

      Event.$emit(e, response);
    }
  };

  xhttp.open('GET', URI, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send();
};

// Function that can be used to make AJAX POST requests and response is returned
const post = (URI, data, e, code, successCode, successEvent) => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === code) {
        try {
          const response = JSON.parse(this.responseText);

          Event.$emit(e, response);
        } catch (error) {
          Event.$emit(e);
        }
      } else if (this.status === successCode) {
        try {
          const response = JSON.parse(this.responseText);

          Event.$emit(successEvent, response);
        } catch (error) {
          Event.$emit(successEvent);
        }
      } else if (
        this.status === 200 &&
        this.getResponseHeader('xhttp-redirect') !== null
      ) {
        window.location.href = this.getResponseHeader('xhttp-redirect');
      }
    }
  };

  xhttp.open('POST', URI, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(data));
};

// Function that can be used to make AJAX PUT requests and response is returned
const put = (URI, data, e, code, successCode, successEvent) => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === code) {
        try {
          const response = JSON.parse(this.responseText);

          Event.$emit(e, response);
        } catch (error) {
          Event.$emit(e);
        }
      } else if (this.status === successCode) {
        try {
          const response = JSON.parse(this.responseText);

          Event.$emit(successEvent, response);
        } catch (error) {
          Event.$emit(successEvent);
        }
      } else if (
        this.status === 200 &&
        this.getResponseHeader('xhttp-redirect') !== null
      ) {
        window.location.href = this.getResponseHeader('xhttp-redirect');
      }
    }
  };

  xhttp.open('PUT', URI, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(data));
};

// Function that can be used to make AJAX DELETE requests and response is returned
const del = (URI, data, e, code, successCode, successEvent) => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === code) {
        const response = JSON.parse(this.responseText);

        Event.$emit(e, response);
      } else if (this.status === successCode) {
        const response = JSON.parse(this.responseText);

        Event.$emit(successEvent, response);
      } else if (
        this.status === 200 &&
        this.getResponseHeader('xhttp-redirect') !== null
      ) {
        window.location.href = this.getResponseHeader('xhttp-redirect');
      }
    }
  };

  xhttp.open('DELETE', URI, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(data));
};

export default { get, post, put, del };
