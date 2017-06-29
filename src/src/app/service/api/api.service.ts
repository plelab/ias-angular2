import {Injectable, OnInit} from '@angular/core';
import {AjaxService} from "../ajax/ajax.service";

@Injectable()
export class ApiService {
  private apiList = {};

  constructor(private ajaxService: AjaxService) {
    this.apiList = this.init(this.ajaxService);
  }

  private init(ajaxService): any {
    var apiUrl = "http://localhost:27018";
    var apiList = {};

    apiList["sample"] = {
      "get": function (thisObj, query, callback) {
        var apiPath = "/api/sampleAjax";

        ajaxService.request(apiUrl + apiPath, {method: "GET", data: query}, function (err, res) {
          callback(thisObj, err, res);
        });
      },
      "post": function (thisObj, query, callback) {
        var apiPath = "/api/sampleAjax";

        ajaxService.request(apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
          callback(thisObj, err, res);
        });
      }
    };

    apiList["users"] = {
      "signup": function (thisObj, query, callback) {
        var apiPath = "/api/users/signup";

        ajaxService.request(apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
          callback(thisObj, err, res);
        });
      },
      "signin": function (thisObj, query, callback) {
        var apiPath = "/api/users/signin";

        ajaxService.request(apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
          callback(thisObj, err, res);
        });
      },
      "session": function (thisObj, query, callback) {
        var apiPath = "/api/users/session";

        ajaxService.request(apiUrl + apiPath, {method: "GET", data: query}, function (err, res) {
          callback(thisObj, err, res);
        });
      },
      "signout": function (thisObj, query, callback) {
        var apiPath = "/api/users/signout";

        ajaxService.request(apiUrl + apiPath, {method: "GET", data: query}, function (err, res) {
          callback(thisObj, err, res);
        });
      }
    };

    return apiList;
  }

  getApiList(): any {
    return this.apiList;
  }
}
