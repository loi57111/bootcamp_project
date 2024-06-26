import React, { useState } from 'react';
import axios from 'axios';
import "../styled/DateInquiry.css";

const DateInquiry = ({onSearch}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //const [purchaseData, setPurchaseData] = useState([]);

/*   const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/purchase?startDate=${startDate}&endDate=${endDate}`);
      setPurchaseData(response.data);
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  }; */

const handleSearch = () => {
    onSearch(startDate, endDate); // 시작일과 종료일을 부모 컴포넌트로 전달
  };

  return (
    <div className='yhw_dateInquiryMarginAuto'>
      <div className='yhw_dateInquiryBox'>
        <div className='yhw_dateInquiryInputs'>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <span>&nbsp; ~ &nbsp;</span>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button onClick={handleSearch}>조회</button>
      </div>
    </div>
  );
};

export default DateInquiry;