import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../service/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  apiList = {};
  user_id: string;
  passwd: string;
  chkPasswd: string;
  user_name: string;
  birth: string;
  gender: string;
  phone: string;
  email: string;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.apiList = this.apiService.getApiList();
  }

  signup() {
    let data = {
      user_id: this.user_id,
      passwd: this.passwd,
      chkPasswd: this.chkPasswd,
      user_name: this.user_name,
      birth: this.birth,
      gender: this.gender,
      phone: this.phone,
      email: this.email
    };

    if (data.passwd != data.chkPasswd) {
      alert("패스워드와 패스워드 확인이 일치하지 않습니다.");
      return;
    }

    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      if (data[keys[i]] == "") {
        alert("빈 칸을 전부 입력해주세요.");
        return;
      }
    }

    delete data.chkPasswd;

    this.apiList["users"]["signup"](this, data, function (thisObj, err, res) {
      if (err || res.status == false) {
        alert("회원가입에 실패하였습니다. 관리자에게 문의해주세요.");
        return;
      }

      alert("회원가입이 완료되었습니다.");

      thisObj.router.navigate(["/signin"]);
    });
  }
}
