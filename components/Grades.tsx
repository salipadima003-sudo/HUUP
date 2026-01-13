import { useState } from 'react';
import { ArrowLeft, ChevronRight, TrendingUp } from 'lucide-react';

interface SubjectGrades {
  seminars: (number | null)[]; // 5-бальна система
  lectures: (number | null)[]; // 10-бальна система
  practicals: (number | null)[]; // 20-бальна система
  exam: number | null; // 40-бальна система
}

interface Subject {
  id: number;
  name: string;
  teacher: string;
  grades: SubjectGrades;
}

export function Grades() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: 'Алгоритми та структури даних',
      teacher: 'Проф. Іваненко',
      grades: {
        seminars: [5, 4, 5, 4, 5, null, null, null],
        lectures: [10, 9, 10, 8, 10, 9, null, null],
        practicals: [18, 20, 19, null, null],
        exam: 38,
      },
    },
    {
      id: 2,
      name: 'Веб-технології',
      teacher: 'Проф. Коваленко',
      grades: {
        seminars: [5, 5, 4, 5, null, null, null, null],
        lectures: [10, 10, 9, 10, 10, null, null, null],
        practicals: [20, 19, 20, null, null],
        exam: null,
      },
    },
    {
      id: 3,
      name: 'Бази даних',
      teacher: 'Проф. Мельник',
      grades: {
        seminars: [4, 5, 5, 4, 5, null, null, null],
        lectures: [9, 10, 10, 9, 10, 8, null, null],
        practicals: [19, 18, 20, 19, null],
        exam: 35,
      },
    },
    {
      id: 4,
      name: 'Дискретна математика',
      teacher: 'Проф. Сидоренко',
      grades: {
        seminars: [3, 4, 4, 5, 4, null, null, null],
        lectures: [8, 9, 10, 8, 9, 10, null, null],
        practicals: [16, 18, 17, null, null],
        exam: 32,
      },
    },
  ]);

  const calculateSubjectTotal = (grades: SubjectGrades): number => {
    const seminarSum = grades.seminars.filter(g => g !== null).reduce((a, b) => a! + b!, 0) || 0;
    const lectureSum = grades.lectures.filter(g => g !== null).reduce((a, b) => a! + b!, 0) || 0;
    const practicalSum = grades.practicals.filter(g => g !== null).reduce((a, b) => a! + b!, 0) || 0;
    const examScore = grades.exam || 0;
    return seminarSum + lectureSum + practicalSum + examScore;
  };

  const calculateMaxPossible = (grades: SubjectGrades): number => {
    return (grades.seminars.length * 5) + (grades.lectures.length * 10) + (grades.practicals.length * 20) + 40;
  };

  const calculateAverage = (): string => {
    const totals = subjects.map(s => {
      const current = calculateSubjectTotal(s.grades);
      const max = calculateMaxPossible(s.grades);
      return (current / max) * 100;
    });
    const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
    return avg.toFixed(1);
  };

  if (view === 'detail' && selectedSubject) {
    return (
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-pink-400 mb-3 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Назад до списку</span>
          </button>
          <h2 className="text-lg text-white mb-1">{selectedSubject.name}</h2>
          <p className="text-xs text-pink-400">{selectedSubject.teacher}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="bg-black/30 rounded-lg px-3 py-1 border border-pink-500/20">
              <span className="text-sm text-pink-300">
                {calculateSubjectTotal(selectedSubject.grades)} / {calculateMaxPossible(selectedSubject.grades)} балів
              </span>
            </div>
            <div className="bg-black/30 rounded-lg px-3 py-1 border border-pink-500/20">
              <span className="text-sm text-green-300">
                {((calculateSubjectTotal(selectedSubject.grades) / calculateMaxPossible(selectedSubject.grades)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Seminars */}
        <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
          <h3 className="text-sm text-white mb-3">Семінари (5-бальна система)</h3>
          <div className="grid grid-cols-4 gap-2">
            {selectedSubject.grades.seminars.map((grade, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center ${
                  grade !== null
                    ? 'bg-pink-600/20 border border-pink-500/30'
                    : 'bg-gray-800/50 border border-gray-700/30'
                }`}
              >
                <p className="text-xs text-gray-400 mb-1">№{index + 1}</p>
                <p className={`text-lg ${grade !== null ? 'text-pink-300' : 'text-gray-600'}`}>
                  {grade !== null ? grade : '-'}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Сума: {selectedSubject.grades.seminars.filter(g => g !== null).reduce((a, b) => a! + b!, 0) || 0} / {selectedSubject.grades.seminars.length * 5}
          </div>
        </div>

        {/* Lectures */}
        <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
          <h3 className="text-sm text-white mb-3">Відвідування лекцій (10-бальна система)</h3>
          <div className="grid grid-cols-4 gap-2">
            {selectedSubject.grades.lectures.map((grade, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center ${
                  grade !== null
                    ? 'bg-rose-600/20 border border-rose-500/30'
                    : 'bg-gray-800/50 border border-gray-700/30'
                }`}
              >
                <p className="text-xs text-gray-400 mb-1">№{index + 1}</p>
                <p className={`text-lg ${grade !== null ? 'text-rose-300' : 'text-gray-600'}`}>
                  {grade !== null ? grade : '-'}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Сума: {selectedSubject.grades.lectures.filter(g => g !== null).reduce((a, b) => a! + b!, 0) || 0} / {selectedSubject.grades.lectures.length * 10}
          </div>
        </div>

        {/* Practicals */}
        <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
          <h3 className="text-sm text-white mb-3">Практичні роботи (20-бальна система)</h3>
          <div className="grid grid-cols-3 gap-2">
            {selectedSubject.grades.practicals.map((grade, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center ${
                  grade !== null
                    ? 'bg-purple-600/20 border border-purple-500/30'
                    : 'bg-gray-800/50 border border-gray-700/30'
                }`}
              >
                <p className="text-xs text-gray-400 mb-1">ПР №{index + 1}</p>
                <p className={`text-lg ${grade !== null ? 'text-purple-300' : 'text-gray-600'}`}>
                  {grade !== null ? grade : '-'}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Сума: {selectedSubject.grades.practicals.filter(g => g !== null).reduce((a, b) => a! + b!, 0) || 0} / {selectedSubject.grades.practicals.length * 20}
          </div>
        </div>

        {/* Exam */}
        <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
          <h3 className="text-sm text-white mb-3">Екзамен/Залік (40-бальна система)</h3>
          <div className="p-4 bg-gradient-to-br from-amber-600/20 to-amber-700/20 rounded-lg border border-amber-500/30 text-center">
            <p className="text-xs text-gray-400 mb-1">Підсумковий контроль</p>
            <p className={`text-3xl ${selectedSubject.grades.exam !== null ? 'text-amber-300' : 'text-gray-600'}`}>
              {selectedSubject.grades.exam !== null ? selectedSubject.grades.exam : '-'}
            </p>
            <p className="text-xs text-gray-400 mt-1">з 40 балів</p>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="p-4 space-y-4">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm">
        <h2 className="text-lg text-white mb-2">Електронний журнал</h2>
        <p className="text-xs text-pink-400 mb-3">Облік успішності студента</p>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/30 rounded-lg p-2 border border-pink-500/20">
            <div className="flex items-center gap-1 justify-center mb-1">
              <TrendingUp className="w-3 h-3 text-pink-400" />
            </div>
            <p className="text-xl text-pink-300 text-center">{calculateAverage()}%</p>
            <p className="text-xs text-gray-400 text-center">Середній показник</p>
          </div>
          <div className="bg-black/30 rounded-lg p-2 border border-pink-500/20">
            <p className="text-xl text-pink-300 text-center">{subjects.length}</p>
            <p className="text-xs text-gray-400 text-center">Предметів</p>
          </div>
        </div>
      </div>

      {/* Subjects List */}
      <div className="space-y-2">
        <h3 className="text-sm text-gray-400 px-2">Мої предмети</h3>
        {subjects.map((subject) => {
          const total = calculateSubjectTotal(subject.grades);
          const max = calculateMaxPossible(subject.grades);
          const percentage = ((total / max) * 100).toFixed(0);
          
          return (
            <button
              key={subject.id}
              onClick={() => {
                setSelectedSubject(subject);
                setView('detail');
              }}
              className="w-full bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-left">
                  <h3 className="text-sm text-white mb-1">{subject.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{subject.teacher}</p>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden border border-pink-500/20">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-pink-400">{percentage}%</span>
                  </div>
                  
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="text-gray-500">{total} / {max} балів</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-pink-400 ml-2" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
        <h3 className="text-sm text-white mb-3">Система оцінювання</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Семінари</span>
            <span className="text-pink-400">5-бальна система</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Відвідування лекцій</span>
            <span className="text-rose-400">10-бальна система</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Практичні роботи</span>
            <span className="text-purple-400">20-бальна система</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Екзамен/Залік</span>
            <span className="text-amber-400">40-бальна система</span>
          </div>
        </div>
      </div>
    </div>
  );
}
