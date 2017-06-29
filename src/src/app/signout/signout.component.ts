import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../service/api/api.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
  apiList = {};

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.apiList = this.apiService.getApiList();
  }

  signout() {
    this.apiList["users"]["signout"](this, {}, function (thisObj, err, res) {
      if (err || res.status == false) {
        alert("로그아웃에 실패하였습니다. 관리자에게 문의해주세요.");
        return;
      }

      thisObj.router.navigate(["/index"]);
    });
  }
}
