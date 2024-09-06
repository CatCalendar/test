import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const NicknameSetupPage: React.FC = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 쿼리 파라미터에서 user_id 가져오기
  const userId = new URLSearchParams(location.search).get(
    'user_id'
  );

  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickname(event.target.value);
  };

  const handleSubmit = async () => {
    if (!nickname) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/user/nickname/${userId}`,
        {
          nickname: nickname,
        }
      );
      if (
        response.data.message ===
        '유저가 성공적으로 생성되었습니다.'
      ) {
        router.push('/main');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(
        '닉네임 설정 중 오류가 발생했습니다.',
        error
      );
      setErrorMessage(
        '닉네임 설정 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div>
      <h2>닉네임 설정</h2>
      <input
        type="text"
        placeholder="닉네임을 입력하세요."
        value={nickname}
        onChange={handleNicknameChange}
      />
      <button onClick={handleSubmit}>등록</button>
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default NicknameSetupPage;
