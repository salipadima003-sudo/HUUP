import { Calendar, Clock, MapPin } from 'lucide-react';

export function Schedule() {
  const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'];
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday

  const scheduleData = {
    0: [ // Monday
      { time: '9:00', subject: 'Дискретна математика', room: 'Ауд. 201', teacher: 'Проф. Сидоренко' },
      { time: '10:50', subject: 'Англійська мова', room: 'Ауд. 105', teacher: 'Викл. Бондаренко' },
      { time: '12:40', subject: 'Фізичне виховання', room: 'Спортзал', teacher: 'Викл. Коваль' },
    ],
    1: [ // Tuesday
      { time: '9:00', subject: 'Веб-технології', room: 'Ауд. 305', teacher: 'Проф. Коваленко' },
      { time: '10:50', subject: 'Бази даних', room: 'Ауд. 202', teacher: 'Проф. Мельник' },
      { time: '14:30', subject: 'Операційні системи', room: 'Ауд. 301', teacher: 'Проф. Шевченко' },
    ],
    2: [ // Wednesday
      { time: '10:00', subject: 'Алгоритми та структури даних', room: 'Ауд. 301', teacher: 'Проф. Іваненко' },
      { time: '12:00', subject: 'Веб-технології', room: 'Ауд. 205', teacher: 'Проф. Коваленко' },
      { time: '14:00', subject: 'Комп\'ютерні мережі', room: 'Ауд. 310', teacher: 'Проф. Петров' },
    ],
    3: [ // Thursday
      { time: '9:00', subject: 'Теорія ймовірності', room: 'Ауд. 108', teacher: 'Проф. Василенко' },
      { time: '10:50', subject: 'Філософія', room: 'Ауд. 402', teacher: 'Проф. Ковальчук' },
      { time: '12:40', subject: 'Економіка', room: 'Ауд. 215', teacher: 'Проф. Захарченко' },
    ],
    4: [ // Friday
      { time: '9:00', subject: 'Проектування ПЗ', room: 'Ауд. 303', teacher: 'Проф. Литвиненко' },
      { time: '10:50', subject: 'Системний аналіз', room: 'Ауд. 204', teacher: 'Проф. Кравченко' },
    ],
  };

  const currentSchedule = scheduleData[selectedDay as keyof typeof scheduleData] || [];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-pink-400" />
          <h2 className="text-lg text-white">Розклад занять</h2>
        </div>
        <p className="text-xs text-pink-400">Тиждень: 14-20 грудня 2025</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
              selectedDay === index
                ? 'bg-gradient-to-br from-pink-600 to-pink-700 text-white shadow-lg shadow-pink-500/30'
                : 'bg-gray-900/50 border border-pink-500/20 text-gray-400'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className="space-y-3">
        {currentSchedule.length > 0 ? (
          currentSchedule.map((lesson, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-pink-600/20 rounded-lg px-3 py-2 text-center border border-pink-500/30">
                  <Clock className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                  <p className="text-xs text-pink-400">{lesson.time}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-white mb-1">{lesson.subject}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{lesson.room}</span>
                  </div>
                  <p className="text-xs text-pink-400">{lesson.teacher}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Немає занять на цей день</p>
          </div>
        )}
      </div>
    </div>
  );
}

function useState(arg0: number): [any, any] {
  let state = arg0;
  const setState = (newState: any) => {
    state = newState;
  };
  return [state, setState];
}