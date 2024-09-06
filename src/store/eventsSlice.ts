import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface CustomEvent {
  id: number;
  title: string;
  time: string;
  details: string;
  date: Date;
}

export interface EventsState {
  events: CustomEvent[];
}

// 로컬 저장소에서 상태를 불러오는 함수 (클라이언트에서만 실행)
const loadState = (): EventsState => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 빈 상태 반환
    return { events: [] };
  }

  try {
    const serializedState = localStorage.getItem('events');
    if (serializedState === null) {
      return { events: [] }; // 로컬 저장소에 데이터가 없으면 초기값 반환
    }
    const parsedEvents = JSON.parse(serializedState).map(
      (event: any) => ({
        ...event,
        date: new Date(event.date), // 문자열로 저장된 날짜를 Date 객체로 변환
      })
    );
    return { events: parsedEvents };
  } catch (err) {
    console.error('Could not load state', err);
    return { events: [] }; // 오류 발생 시 초기값 반환
  }
};

// 상태를 로컬 저장소에 저장하는 함수 (클라이언트에서만 실행)
export const saveState = (state: EventsState) => {
  if (typeof window === 'undefined') {
    return; // 서버 사이드에서는 아무 작업도 하지 않음
  }

  try {
    const serializedState = JSON.stringify(
      state.events.map((event) => ({
        ...event,
        // event.date가 문자열일 경우 Date 객체로 변환 후 toISOString() 호출
        date:
          typeof event.date === 'string'
            ? new Date(event.date).toISOString()
            : event.date.toISOString(),
      }))
    );
    localStorage.setItem('events', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState: EventsState = loadState(); // 초기 상태를 로컬 저장소에서 불러옴

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<CustomEvent[]>) {
      state.events = action.payload || []; // 안전하게 빈 배열로 초기화
      saveState(state); // 상태 변경 시 로컬 저장소에 저장
    },
    addEvent(state, action: PayloadAction<CustomEvent>) {
      if (!state.events) {
        state.events = []; // events가 undefined일 경우 빈 배열로 초기화
      }
      state.events.push(action.payload);
      saveState(state); // 상태 변경 시 로컬 저장소에 저장
    },
    removeEvent(
      state,
      action: PayloadAction<{
        title: string;
        date: Date | string;
      }>
    ) {
      state.events = state.events.filter((event) => {
        const eventDate =
          typeof event.date === 'string'
            ? new Date(event.date)
            : event.date;
        const actionDate =
          typeof action.payload.date === 'string'
            ? new Date(action.payload.date)
            : action.payload.date;
        return !(
          event.title === action.payload.title &&
          eventDate.getTime() === actionDate.getTime()
        );
      });
      saveState(state); // 상태 변경 시 로컬 저장소에 저장
    },
  },
});

export const { setEvents, addEvent, removeEvent } =
  eventsSlice.actions;
export default eventsSlice.reducer;
