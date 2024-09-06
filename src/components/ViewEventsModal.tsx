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

  const handleDelete = (event: CustomEvent) => {
    dispatch(
      removeEvent({ title: event.title, date: event.date })
    );
    setLocalEvents((prevEvents) =>
      prevEvents.filter((e) => e !== event)
    ); // 로컬 상태에서 제거
  };

  const handleEdit = (event: CustomEvent) => {
    setEventToEdit(event);
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = (updatedEvent: CustomEvent) => {
    dispatch(
      removeEvent({
        title: eventToEdit!.title,
        date: eventToEdit!.date,
      })
    ); // 기존 이벤트 삭제
    dispatch(addEvent(updatedEvent)); // 수정된 이벤트 추가
    setLocalEvents((prevEvents) =>
      prevEvents.map((e) =>
        e === eventToEdit ? updatedEvent : e
      )
    ); // 로컬 상태 업데이트
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
                {' '}
                {/* key prop 추가 */}
                <div className="event-title">
                  <p>
                    {event.time}{' '}
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
                    style={{ marginRight: '5px' }} // marginRight 값 수정
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
          token={localStorage.getItem('token')!}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          event={eventToEdit} // 수정할 이벤트를 전달
        />
      )}
    </div>
  );
};

export default ViewEventsModal;
