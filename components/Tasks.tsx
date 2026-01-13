import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Calendar } from 'lucide-react';

export function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Лабораторна робота №3', subject: 'Алгоритми', deadline: 'Завтра', completed: false, priority: 'high' },
    { id: 2, title: 'Есе з філософії', subject: 'Філософія', deadline: '20 грудня', completed: false, priority: 'medium' },
    { id: 3, title: 'Презентація проєкту', subject: 'Веб-технології', deadline: '18 грудня', completed: false, priority: 'high' },
    { id: 4, title: 'Читання: Глава 5-7', subject: 'Економіка', deadline: '22 грудня', completed: true, priority: 'low' },
    { id: 5, title: 'Домашнє завдання', subject: 'Англійська', deadline: '16 грудня', completed: true, priority: 'medium' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-600/20 to-red-700/20 border-red-500/30';
      case 'medium': return 'from-pink-600/20 to-pink-700/20 border-pink-500/30';
      case 'low': return 'from-rose-600/20 to-rose-700/20 border-rose-500/30';
      default: return 'from-gray-600/20 to-gray-700/20 border-gray-500/30';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-pink-500';
      case 'low': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg text-white">Мої завдання</h2>
          <button className="w-8 h-8 bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-pink-500/30">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="text-pink-400">
            <span className="font-semibold">{activeTasks.length}</span> активних
          </div>
          <div className="text-green-400">
            <span className="font-semibold">{completedTasks.length}</span> виконано
          </div>
        </div>
      </div>

      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm text-gray-400 px-2">Активні завдання</h3>
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-gradient-to-r ${getPriorityColor(task.priority)} rounded-xl p-4 border backdrop-blur-sm`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 mt-1"
                >
                  <Circle className="w-5 h-5 text-pink-400 hover:text-pink-300 transition-colors" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getPriorityDot(task.priority)}`}></div>
                    <h3 className="text-sm text-white">{task.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{task.subject}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{task.deadline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm text-gray-400 px-2">Виконані завдання</h3>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-900/30 rounded-xl p-4 border border-green-500/20 opacity-60 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 mt-1"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </button>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-400 line-through">{task.title}</h3>
                  <p className="text-xs text-gray-600">{task.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}