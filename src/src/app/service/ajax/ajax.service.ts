import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';

@Injectable()
export class AjaxService {
  constructor(private http: Http) {
  }

  request(url, options, callback) {
    this.parseOptions(options);
    this.parseData(options);

    if (options.method == "GET") {
      this.http.get(url, {search: options.data}).subscribe(function (res) {
        res = res.json();
        callback(null, res);
      }, function (err) {
        callback(err, null);
      });
    }
    else if (options.method == "DELETE") {
      this.http.delete(url, {search: options.data}).subscribe(function (res) {
        res = res.json();
        callback(null, res);
      }, function (err) {
        callback(err, null);
      });
    }
    else if (options.method == "POST") {
      let reqOpts = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

      this.http.post(url, options.data, reqOpts).subscribe(function (res) {
        res = res.json();
        callback(null, res);
      }, function (err) {
        callback(err, null);
      });
    }
    else if (options.method == "PUT") {
      let reqOpts = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

      this.http.put(url, options.data, reqOpts).subscribe(function (res) {
        res = res.json();
        callback(null, res);
      }, function (err) {
        callback(err, null);
      });
    }
  }

  private parseOptions(options) {
    options = options || {};

    var defaultOptions = {
      method: "GET",
      data: {},
      stringify: false
    };

    var keys = Object.keys(defaultOptions);

    for (var i = 0; i < keys.length; i++)
      options[keys[i]] = (typeof options[keys[i]] === "undefined") ? defaultOptions[keys[i]] : options[keys[i]];

    if (options.stringify)
      options.data = {data: JSON.stringify(options.data)};
  }

  private parseData(options) {
    var keys = Object.keys(options.data);
    var data = null;

    if (options.method == "GET" || options.method == "DELETE") {
      data = new URLSearchParams();

      for (var i = 0; i < keys.length; i++)
        data.set(keys[i], options.data[keys[i]]);

    }
    else {
      data = {};

      for (var i = 0; i < keys.length; i++)
        data[keys[i]] = options.data[keys[i]];

      data = JSON.stringify(data);
    }

    options.data = data;
  }
}
