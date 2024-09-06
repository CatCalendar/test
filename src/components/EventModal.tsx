import React, { useState, useEffect } from 'react';
import '../styles/components/EventModal.scss';
import {
  CustomEvent,
  addEvent,
  removeEvent,
} from '../store/eventsSlice';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
interface EventModalProps {
  visible: boolean;
  selectedDate: Date;
  token: string;
  onOk: (event: CustomEvent) => void;
  onCancel: () => void;
  event?: CustomEvent; // 선택 사항: 수정할 이벤트
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  selectedDate,
  token,
  onOk,
  onCancel,
  event,
}) => {
  const [eventDetails, setEventDetails] =
    useState<CustomEvent>({
      id: 0,
      title: '',
      time: '',
      details: '',
      date: selectedDate,
    });

  const dispatch = useDispatch(); // Redux의 dispatch 사용
  // 이벤트가 전달되면 해당 이벤트로 상태를 설정
  useEffect(() => {
    if (event) {
      setEventDetails(event);
    } else {
      setEventDetails({
        id: 0,
        title: '',
        time: '',
        details: '',
        date: selectedDate,
      });
    }
  }, [event, selectedDate]);

  const handleOk = async () => {
    if (eventDetails.time.length !== 5) {
      message.error('시간을 HH:mm 형식으로 입력해주세요.');
      return;
    }

    // 시간과 날짜를 결합하여 한국 시간대로 저장
    const [hours, minutes] = eventDetails.time
      .split(':')
      .map(Number);
    const kstDate = new Date(selectedDate);
    kstDate.setHours(hours);
    kstDate.setMinutes(minutes);
    kstDate.setSeconds(0);
    kstDate.setMilliseconds(0);

    // 시간 형식을 HH:mm으로 변환하는 함수
    const formatTime = (date: Date): string => {
      const hours = String(date.getHours()).padStart(
        2,
        '0'
      );
      const minutes = String(date.getMinutes()).padStart(
        2,
        '0'
      );
      return `${hours}:${minutes}`;
    };

    try {
      let response;
      let newEventDetails = eventDetails;

      if (event) {
        // 이벤트 수정
        response = await axios.put(
          `/api/event`,
          {
            id: eventDetails.id,
            user_id: localStorage.getItem('userId'),
            title: eventDetails.title,
            time: formatTime(kstDate),
            details: eventDetails.details,
            date: kstDate.toISOString().split('T')[0],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        newEventDetails = {
          ...eventDetails,
          id: response.data.eventId,
        };
      } else {
        // 새로운 이벤트 추가
        response = await axios.post(
          '/api/event',
          {
            user_id: localStorage.getItem('userId'),
            title: eventDetails.title,
            time: formatTime(kstDate),
            details: eventDetails.details,
            date: kstDate.toISOString().split('T')[0],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        newEventDetails = {
          ...eventDetails,
          id: response.data.eventId,
        };
      }
      // 서버에서 생성된 ID를 받아와서 새로운 이벤트에 추가
      newEventDetails = {
        ...eventDetails,
        id: response.data.eventId, // 서버에서 반환한 ID 사용
      };
      if (
        response.status === 201 ||
        response.status === 200
      ) {
        message.success('이벤트가 저장되었습니다.');
        onOk(newEventDetails); // 상위 컴포넌트에 저장된 이벤트 정보 전달
        setEventDetails({
          id: 0,
          title: '',
          time: '',
          details: '',
          date: selectedDate,
        });
        onCancel();
      }
    } catch (error) {
      console.error('이벤트 저장 중 오류 발생:', error);
      message.error('이벤트 저장 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    onCancel();
    setEventDetails({
      id: 0,
      title: '',
      time: '',
      details: '',
      date: selectedDate,
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event ? '일정 수정' : '일정 추가'}</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="일정 제목"
          value={eventDetails.title}
          onChange={(e) =>
            setEventDetails({
              ...eventDetails,
              title: e.target.value,
            })
          }
        />
        <input
          className="modal-input"
          type="text"
          placeholder="시간 (예: 14:00)"
          value={eventDetails.time}
          onChange={(e) => {
            let inputValue = e.target.value.replace(
              /\D/g,
              ''
            ); // 숫자 이외의 문자는 제거
            if (inputValue.length > 4) {
              inputValue = inputValue.slice(0, 4); // 최대 4자리 숫자만 허용
            }

            if (inputValue.length === 4) {
              inputValue = `${inputValue.slice(
                0,
                2
              )}:${inputValue.slice(2, 4)}`;
            }

            setEventDetails({
              ...eventDetails,
              time: inputValue,
            });
          }}
          style={{ marginTop: 10 }}
        />
        <textarea
          className="modal-input-details"
          placeholder="상세 내용"
          value={eventDetails.details}
          onChange={(e) =>
            setEventDetails({
              ...eventDetails,
              details: e.target.value,
            })
          }
          style={{ marginTop: 10 }}
        />
        <div className="modal-buttons">
          <button onClick={handleOk}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
