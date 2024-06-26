import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styled/MypageEnquiry.css';
import QuestSide from '../QuestSide';
import Header from '../Header';
import Footer from '../Footer';
import { serverURL } from "../config";

function Enquiry() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get(`${serverURL}/enquiries`); 
      setEnquiries(response.data); 
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const [showReplies, setShowReplies] = useState({});

  const toggleReplies = (id) => {
    setShowReplies({
      ...showReplies,
      [id]: !showReplies[id]
    });
  };

  const handleReplySubmit = async (boardKey, replyText) => {
    try {
      // 답글 서버 전송
      await axios.post(`${serverURL}/reply`, {
        boardKey: boardKey,
        reply: replyText
      });
      console.log(`문의 ${boardKey}에 대한 답글을 성공적으로 전송했습니다.`);
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  return (
    <>
    <Header />

    <div className='jyh-table'>
      {/* 사이드 바 넣는 곳 */}
      <div className="qna-page-sidebar">
        <QuestSide />
      </div>
      <div className="jyh-main-table">
       <p className='jyh-tb-title'>문의 내용</p>
       <table className='jyh-enquiry-table'>
         <tbody>
          {enquiries.map(enquiry => (
            <React.Fragment key={enquiry.boardKey}>
              <tr>
                <td>{enquiry.boardKey}</td>
                <td>{enquiry.boardTitle}</td>
                <td>{enquiry.date}</td>
                <td>
                  <button className='jyh-enquiry-res' onClick={() => toggleReplies(enquiry.boardKey)}>
                    {showReplies[enquiry.boardKey] ? '닫기' : '답글'}
                  </button>
                </td>
              </tr>
              {showReplies[enquiry.boardKey] && (
                <tr>
                  <td colSpan="4" className='jyh-enquiry-detail'>
                    {enquiry.Enquiry}
                    <form onSubmit={(e) => {e.preventDefault(); handleReplySubmit(enquiry.boardKey, e.target.reply.value)}}>
                      <textarea className='jyh-replyarea' name="reply" placeholder="답글을 입력하세요" required></textarea>
                      <button type="submit">등록</button>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
           ))}
          </tbody>
        </table>
      </div>

    </div>

    <Footer />
    </>
  );
}

export default Enquiry;
