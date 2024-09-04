import React, { useState, useEffect } from 'react';
import '../styles/components/EventModal.scss';
import { CustomEvent } from '../store/eventsSlice';
import { message } from 'antd';

interface EventModalProps {
  visible: boolean;
  selectedDate: Date;
  onOk: (event: CustomEvent) => void;
  onCancel: () => void;
  event?: CustomEvent; // 선택 사항: 수정할 이벤트
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  selectedDate,
  onOk,
  onCancel,
  event,
}) => {
  const [eventDetails, setEventDetails] =
    useState<CustomEvent>({
      title: '',
      time: '',
      details: '',
      date: selectedDate,
    });

  useEffect(() => {
    if (event) {
      setEventDetails(event);
    } else {
      setEventDetails({
        title: '',
        time: '',
        details: '',
        date: selectedDate,
      });
    }
  }, [event, selectedDate]);

  const handleOk = () => {
    if (eventDetails.time.length !== 5) {
      message.error('시간 입력을 다시 해주세요.');
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

    // 저장할 이벤트 객체
    const eventToSave: CustomEvent = {
      ...eventDetails,
      date: kstDate, // 한국 시간대의 날짜와 시간
    };

    onOk(eventToSave);
    setEventDetails({
      title: '',
      time: '',
      details: '',
      date: selectedDate,
    });
  };

  const handleCancel = () => {
    onCancel();
    setEventDetails({
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
