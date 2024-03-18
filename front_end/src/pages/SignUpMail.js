import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/SignUp.css";
// import NavBar from "./NavBar";
// import Footer from "./Footer";

const SignUpMail = () => {

  return (
    <>
      {/* <NavBar /> */}
      
      <div className="w_container">
        <form className="w_signForm">
          <h4>환영합니다! 정보를 입력해주세요.</h4>
          <div className="w_signInputBox">
            <span className="w_signInputTit">이메일</span>
            <input
              // value={userEmail}
              // onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="이메일 입력"
              required
            />
          </div>
          <div className="w_signInputBox">
            <span className="w_signInputTit">아이디</span>
            <input
              // value={userEmail}
              // onChange={(e) => setUserEmail(e.target.value)}
              type="text"
              placeholder="아이디 입력"
              required
              />
              <button className="dupCheckBtn">중복확인</button>
          </div>
          <div className="w_signInputBox">
            <span className="w_signInputTit">비밀번호</span>
            <input
              // value={userPassword}
              // onChange={(e) => setUserPassword(e.target.value)}
              type="password"
              placeholder="비밀번호"
              required
            />
          </div>
          <div className="w_signInputBox">
            <span className="w_signInputTit">비밀번호 확인</span>
            <input
              // value={checkPassword}
              // onChange={(e) => setCheckPassword(e.target.value)}
              type="password"
              placeholder="비밀번호 확인"
              required
              />
          </div>
          <div className="w_signInputBox">
            <span className="w_signInputTit">닉네임</span>
            <input
              // value={userNumber}
              // onChange={(e) => setUserNumber(e.target.value)}
              type="text"
              placeholder="전화번호"
              required
              />
              <button className="dupCheckBtn">중복확인</button>
          </div>
          <div className="w_signInputBox">
            <span className="w_signInputTit">나이</span>
            <input
              className="w_lastSignInput"
              // value={userAddress}
              // onChange={(e) => setUserAddress(e.target.value)}
              type="number"
              placeholder="나이"
              required
              />
            <span>세</span>
          </div>
          <div className="w_signInputBox">
            <span className="w_signInputTit">성별</span>
              <div className="w_signGenderBtns">
                <button>남자</button>
                <button>여자</button>
              </div>
          </div>
          <div className="w_signUpBtnBox">
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>  {/* w_container 끝 */}
      
      {/* <Footer /> */}
    </>
  );
};

export default SignUpMail;
