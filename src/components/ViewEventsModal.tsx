import React, { useState, useEffect } from 'react';
import '../styles/components/ViewEventsModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import {
  CustomEvent,
  removeEvent,
  addEvent,
} from '../store/eventsSlice';
import EventModal from './EventModal';
import axios from 'axios'; // axios 추가
import { message } from 'antd';
interface ViewEventsModalProps {
  visible: boolean;
  selectedDate: Date;
  token: string;
  events: CustomEvent[];
  onClose: () => void;
}

const ViewEventsModal: React.FC<ViewEventsModalProps> = ({
  visible,
  selectedDate,
  token,
  events,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [localEvents, setLocalEvents] =
    useState<CustomEvent[]>(events);
  const [isEditModalVisible, setIsEditModalVisible] =
    useState(false);
  const [eventToEdit, setEventToEdit] =
    useState<CustomEvent | null>(null);

  useEffect(() => {
    setLocalEvents(events); // events가 변경되면 로컬 상태 업데이트
  }, [events]);

  const handleDelete = async (event: CustomEvent) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // userId를 로컬 스토리지에서 가져옴

      console.log('삭제할 이벤트:', event.id);
      // 서버로 삭제 요청 전송, eventId와 userId를 함께 보냄
      await axios.delete(`/api/event`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          eventId: event.id, // 이벤트 ID 전달
          userId: userId, // 사용자 ID 전달
        },
      });

      // Redux와 로컬 상태에서 이벤트 삭제
      dispatch(
        removeEvent({
          title: event.title,
          date:
            typeof event.date === 'string'
              ? new Date(event.date)
              : event.date,
        })
      );
      setLocalEvents((prevEvents) =>
        prevEvents.filter((e) => e !== event)
      );
      message.success(
        '이벤트가 성공적으로 삭제되었습니다.'
      );
    } catch (error) {
      console.error('이벤트 삭제 중 오류 발생:', error);
      message.error('이벤트 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (event: CustomEvent) => {
    setEventToEdit(event);
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = (updatedEvent: CustomEvent) => {
    // 수정된 이벤트를 로컬 상태와 Redux에 반영
    const updatedEvents = localEvents.map((e) =>
      e.id === updatedEvent.id ? updatedEvent : e
    );
    setLocalEvents(updatedEvents); // 수정된 이벤트를 로컬 상태에 반영
    dispatch(addEvent(updatedEvent)); // Redux 상태에도 업데이트
    setIsEditModalVisible(false);
    setEventToEdit(null);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEventToEdit(null);
  };

  // visible이 false일 때 null을 반환하여 컴포넌트를 렌더링하지 않음
  if (!visible) {
    return null;
  }

  const formatTime = (time: string): string => {
    if (time.length === 5 && time.includes(':')) {
      return time; // 이미 HH:mm 형식이면 그대로 반환
    }

    // 예: 9 -> "09:00" 형식으로 변환
    const [hours, minutes] = time.split(':').map(Number);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(
      2,
      '0'
    );

    return `${formattedHours}:${formattedMinutes}`;
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {selectedDate.toLocaleDateString('ko-KR')}의 일정
        </h2>
        {localEvents.length > 0 ? (
          <ul>
            {localEvents.map((event, index) => (
              <div className="event-header" key={index}>
                <div className="event-title">
                  <p>
                    {formatTime(event.time)}{' '}
                    <span className="title-color">
                      {event.title}
                    </span>
                  </p>
                  <div className="event-buttons">
                    <button
                      onClick={() => handleEdit(event)}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="event-detail">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ marginRight: '5px' }}
                  />
                  {event.details}
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>해당 날짜에 일정이 없습니다.</p>
        )}
        <div className="exit-button-box">
          <button className="exit-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
      {isEditModalVisible && eventToEdit && (
        <EventModal
          visible={isEditModalVisible}
          selectedDate={eventToEdit.date}
          token={token}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          event={eventToEdit} // 수정할 이벤트를 전달
        />
      )}
    </div>
  );
};

export default ViewEventsModal;
