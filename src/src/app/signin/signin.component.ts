import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../service/api/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  apiList = {};
  user_id: string;
  passwd: string;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.apiList = this.apiService.getApiList();
  }

  signin() {
    let data = {
      user_id: this.user_id,
      passwd: this.passwd
    };

    this.apiList["users"]["signin"](this, data, function (thisObj, err, res) {
      if (err || res.status == false) {
        alert("로그인에 실패하였습니다. 관리자에게 문의해주세요.");
        return;
      }

      if (res.code == 1) {
        alert("아이디 또는 패스워드를 확인해주세요.");
        return;
      }

      thisObj.router.navigate(["/index"]);
    });
  }
}
