import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../service/api/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  apiList = {};

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.apiList = this.apiService.getApiList();

    this.apiList["users"]["session"](this, {}, function (thisObj, err, res) {
      if (err || res.status == false) {
        alert("세션 확인에 실패하였습니다. 관리자에게 문의해주세요.");
        thisObj.router.navigate(["/signin"]);
        return;
      }

      if (res.code == 2) {
        thisObj.router.navigate(["/signin"]);
        alert("로그인이 필요합니다.");
      }
    });
  }
}
