import React, { useEffect, useState } from "react";
import "../styled/PurchaseReqForm.css";
import axios from "axios";
import { serverURL } from "../config";

const InputField = ({ label, name, value, placeholder, onChange, error }) => {
  return (
    <div className="sbk-form-item">
      <label className="sbk-label yhw_notLastLabel" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        className="sbk-input"
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className="sbk-error-container">
        {error && (
          <span className="sbk-error-message">* {label}을(를) 입력하세요.</span>
        )}
      </div>
    </div>
  );
};

const PurchaseReqForm = ({ selectedBook, loginUser }) => {
  //console.log(loginUser);
  const [formValues, setFormValues] = useState({
    bookTitle: selectedBook ? selectedBook.title : "",
    author: selectedBook ? selectedBook.author : "",
    publisher: selectedBook ? selectedBook.publisher : "",
    itemImg: selectedBook ? selectedBook.image : "",
  });
  const [errors, setErrors] = useState({}); // 입력 필드 에러 상태관리
  const [deadline, setDeadline] = useState(""); // 입찰 마감 기한 상태관리
  const [isFormFilled, setIsFormFilled] = useState(false); // 입력 폼이 모두 채워졌는지 여부 상태관리
  const [selectedOption, setSelectedOption] = useState(""); // 카테고리 선택 상태관리

  const handleSelect = (value) => {
    // 선택한 카테고리 값
    setSelectedOption(value);
  };
  // 선택 상자의 값이 변경되지 않은 경우에만 회색으로 스타일을 적용합니다.
  const selectStyle = !selectedOption ? { color: "#a4a4a4" } : {};

  useEffect(() => {
    setFormValues({
      bookTitle: selectedBook ? selectedBook.title : "",
      author: selectedBook ? selectedBook.author : "",
      publisher: selectedBook ? selectedBook.publisher : "",
      itemImg: selectedBook ? selectedBook.image : "",
    });
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };

  const handleDeadlineChange = (e) => {
    const days = parseInt(e.target.value); // 선택한 일수
    const currentDate = new Date(); // 현재 날짜
    const deadlineDate = new Date(
      currentDate.setDate(currentDate.getDate() + days)
    ); // 현재 날짜에 일수를 더해서 마감 날짜 계산
    const deadlineISO = deadlineDate.toISOString().split("T")[0]; // 마감 날짜를 ISO 형식으로 변환
    const deadlineWithoutDash = deadlineISO.replace(/-/g, ""); // '-' 제거
    setDeadline(deadlineWithoutDash); // 마감 날짜 상태에 설정
    setErrors({ ...errors, deadline: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { bookTitle, author, publisher } = formValues;

    if (!bookTitle || !author || !publisher || !deadline) {
      setErrors({
        bookTitle: !bookTitle,
        author: !author,
        publisher: !publisher,
        deadline: !deadline,
      });
      setIsFormFilled(false); // 폼이 채워지지 않음
      return;
    }

    setIsFormFilled(true); // 폼이 채워짐

    try {
      const data = {
        custKey: loginUser,
        itemTitle: formValues.bookTitle,
        author: formValues.author,
        publisher: formValues.publisher,
        itemImg: formValues.itemImg, // 선택된 도서의 이미지
        expiry: deadline,
        category: selectedOption,
      };

      const response = await axios.post(
        `${serverURL}/buyerbook`,
        data
      );
      console.log(response.data); // 서버로부터 받은 응답 데이터 출력
      alert("등록 신청되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error sending data to server:", error);
      alert("등록 신청에 실패했습니다.");
    }
  };

  // 입찰 마감기한 label 클릭 시 배경색 변경
  const handleLabelClick = (e) => {
    const label = e.currentTarget; // 클릭된 라벨 요소

    // 선택된 라벨의 클래스에 'selected' 클래스 추가
    label.classList.add('selected');
    
    // 기존에 선택된 라벨에서 'selected' 클래스 제거
    const labels = document.querySelectorAll('.sbk-deadline-option');
    labels.forEach(l => {
      if (l !== label) {
        l.classList.remove('selected');
      }
    });
  };

  return (
    <div className="sbk-container">
      <form className="sbk-purchase-request-form" onSubmit={handleSubmit}>
        <div className="sbk-form-fields-container">
          <div className="yhw_purReqDropDown">
            <span className="sbk-label yhw_notLastLabel">카테고리</span>
            <select
              value={selectedOption}
              onChange={(e) => handleSelect(e.target.value)}
              style={selectStyle} // 선택하세요 일 때 글자색 스타일을 적용합니다.
            >
              <option value="" disabled>
                선택하세요
              </option>
              <option value="economics">경제/경영</option>
              <option value="novels">소설/시/희곡</option>
              <option value="comics">만화</option>
              <option value="arts">예체능</option>
              <option value="science">과학</option>
              <option value="essays">에세이</option>
            </select>
            <div className="sbk-error-container">
              {/* {error && <span className="sbk-error-message">* {label}을(를) 입력하세요.</span>} */}
              {selectedOption === "" && (
                <span className="sbk-error-message">
                  * 카테고리를 입력하세요.
                </span>
              )}
            </div>
          </div>
          <InputField
            label="책 제목"
            name="bookTitle"
            value={formValues.bookTitle}
            placeholder="책 제목"
            onChange={handleChange}
            error={errors.bookTitle}
          />
          <InputField
            label="책 저자"
            name="author"
            value={formValues.author}
            placeholder="책 저자"
            onChange={handleChange}
            error={errors.author}
          />
          <InputField
            label="출판사"
            name="publisher"
            value={formValues.publisher}
            placeholder="출판사"
            onChange={handleChange}
            error={errors.publisher}
          />
          <div className="sbk-deadline-selection">
            <label className="sbk-label yhw_lastLabel" htmlFor="">
              입찰 마감기한
            </label>
            <div className="sbk-deadline-options-container">
              {[1, 7, 30, 60].map((days) => (
                <label className="sbk-deadline-option" key={days} onClick={handleLabelClick}>
                  <input
                    type="radio"
                    id={`${days}Days`}
                    name="deadline"
                    value={`${days}일`}
                    onChange={handleDeadlineChange}
                  />
                  <span>{days}일</span>
                </label>
              ))}
            </div>{" "}
            {/* sbk-deadline-options-container */}
          </div>{" "}
          {/* sbk-deadline-selection */}
          <div className="sbk-error-container">
            {errors.deadline && (
              <span className="sbk-error-message">
                * 입찰 마감기한을 선택하세요.
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`sbk-submit-button ${
            isFormFilled ? "sbk-submit-button-filled" : ""
          }`}
        >
          등록 신청
        </button>
      </form>
      {/* PurchaseReqList 컴포넌트 */}
    </div>
  );
};

export default PurchaseReqForm;
