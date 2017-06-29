import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api/api.service';

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.css']
})
export class AjaxComponent implements OnInit {
  apiList = {};
  getResult: string;
  postResult: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiList = this.apiService.getApiList();
  }

  ajaxGetSample() {
    var data = {ajax: "GET Sample"};

    this.apiList["sample"]["get"](this, data, function (thisObj, err, res) {
      if (err) {
        thisObj.postResult = JSON.stringify(err);
        return;
      }

      thisObj.getResult = JSON.stringify(res);
    });
  }

  ajaxPostSample() {
    var data = {ajax: "POST Sample"};

    this.apiList["sample"]["post"](this, data, function (thisObj, err, res) {
      if (err) {
        thisObj.postResult = JSON.stringify(err);
        return;
      }

      thisObj.postResult = JSON.stringify(res);
    });
  }
}
