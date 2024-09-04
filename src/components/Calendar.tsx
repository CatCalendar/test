import React, { useState, useRef } from 'react';
import '../styles/components/Calendar.scss'; // CSS 모듈로 변경
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import EventModal from './EventModal';
import ViewEventsModal from './ViewEventsModal'; // 추가된 모달
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  addEvent,
  CustomEvent,
} from '../store/eventsSlice';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );
  const [isModalVisible, setIsModalVisible] =
    useState(false);
  const [isViewingEvents, setIsViewingEvents] =
    useState(false); // 모달 타입 상태
  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);
  const [viewingEvents, setViewingEvents] = useState<
    CustomEvent[]
  >([]); // 해당 날짜의 이벤트

  const dispatch = useDispatch();
  const events = useSelector(
    (state: RootState) => state.events.events || []
  );

  const longPressTimeout = useRef<NodeJS.Timeout | null>(
    null
  );

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (
    month: number,
    year: number
  ) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    setCurrentDate(new Date(prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    setCurrentDate(new Date(nextMonth));
  };

  const handleDateTouchStart = (date: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    setSelectedDate(selected);

    longPressTimeout.current = setTimeout(() => {
      const eventsForDate = events.filter(
        (event) =>
          new Date(event.date).toDateString() ===
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            date
          ).toDateString()
      );
      setViewingEvents(eventsForDate);
      setIsViewingEvents(true);
      setIsModalVisible(true);
    }, 1000); // 1초 이상 클릭 시 모달 표시
  };

  const handleDateTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;

      if (!isViewingEvents) {
        // 1초 미만 클릭 시 일정 추가 모달 표시
        setIsModalVisible(true);
      }
    }
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = [
      '일',
      '월',
      '화',
      '수',
      '목',
      '금',
      '토',
    ];
    return daysOfWeek.map((day, index) => (
      <div
        key={index}
        className={`day-of-week ${
          index === 0
            ? 'sunday'
            : index === 6
            ? 'saturday'
            : ''
        }`}
      >
        {day}
      </div>
    ));
  };

  const renderDates = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInCurrentMonth = daysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(
        <div
          key={`empty-${i}`}
          className="empty-slot"
        ></div>
      );
    }

    for (let date = 1; date <= daysInCurrentMonth; date++) {
      const dayOfWeek = new Date(
        year,
        month,
        date
      ).getDay();
      const eventsForDate = events?.filter(
        (event) =>
          new Date(event.date).toDateString() ===
          new Date(year, month, date).toDateString()
      );

      daysArray.push(
        <div
          key={date}
          className={`date ${
            dayOfWeek === 0
              ? 'sunday'
              : dayOfWeek === 6
              ? 'saturday'
              : ''
          }`}
          onTouchStart={() => handleDateTouchStart(date)}
          onTouchEnd={handleDateTouchEnd}
          onMouseDown={() => handleDateTouchStart(date)}
          onMouseUp={handleDateTouchEnd}
        >
          {date}
          {eventsForDate && eventsForDate.length > 0 && (
            <div className="event-count">
              <FontAwesomeIcon icon={faStar} />
            </div>
          )}
        </div>
      );
    }

    return daysArray;
  };

  const handleModalOk = (event: CustomEvent) => {
    if (!isViewingEvents) {
      dispatch(addEvent(event)); // Date 객체 그대로 전달
    }
    setIsModalVisible(false);
    setIsViewingEvents(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsViewingEvents(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span className="calendar-header-text">
          {currentDate.getFullYear()}년{' '}
          {currentDate.getMonth() + 1}월
        </span>
        <span onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
      <div className="calendar-body">
        <div className="days-of-week">
          {renderDaysOfWeek()}
        </div>
        <div className="dates">{renderDates()}</div>
      </div>
      {isModalVisible &&
        selectedDate &&
        (isViewingEvents ? (
          <ViewEventsModal
            visible={isModalVisible}
            selectedDate={selectedDate}
            events={viewingEvents}
            onClose={handleModalCancel}
          />
        ) : (
          <EventModal
            visible={isModalVisible}
            selectedDate={selectedDate}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          />
        ))}
    </div>
  );
};

export default Calendar;
