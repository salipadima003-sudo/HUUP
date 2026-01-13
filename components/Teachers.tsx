import { useState } from 'react';
import { MessageCircle, BookOpen, ArrowLeft, Send, Calendar, CheckCircle, Circle, Paperclip, Upload, FileText, X } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  avatar: 'teacher' | 'user1' | 'user2' | 'user3';
  photo?: string;
  unread: number;
  lastMessage?: string;
}

interface Message {
  id: number;
  sender: 'teacher' | 'student';
  text: string;
  time: string;
}

interface SubmittedFile {
  name: string;
  size: string;
  uploadedAt: string;
}

interface Assignment {
  id: number;
  teacherId: number;
  teacherName: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  completed: boolean;
  submittedFiles?: SubmittedFile[];
}

export function Teachers() {
  const [view, setView] = useState<'main' | 'chat' | 'assignments' | 'submit'>('main');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const teachers: Teacher[] = [
    { id: 1, name: 'Проф. Іваненко', subject: 'Алгоритми', avatar: 'teacher', unread: 2, lastMessage: 'Не забудьте здати лабораторну' },
    { id: 2, name: 'Проф. Коваленко', subject: 'Веб-технології', avatar: 'user1', unread: 0, lastMessage: 'Дякую за проєкт!' },
    { id: 3, name: 'Проф. Мельник', subject: 'Бази даних', avatar: 'user2', unread: 1, lastMessage: 'Завтра буде тест' },
    { id: 4, name: 'Проф. Шевченко', subject: 'ОС', avatar: 'user3', unread: 0, lastMessage: 'Гарна робота!' },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'teacher', text: 'Доброго дня! Як справи з лабораторною роботою?', time: '10:30' },
    { id: 2, sender: 'student', text: 'Вітаю! Майже закінчив, буде готово сьогодні ввечері.', time: '10:35' },
    { id: 3, sender: 'teacher', text: 'Чудово! Не забудьте здати лабораторну до завтра.', time: '10:40' },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      teacherId: 1,
      teacherName: 'Проф. Іваненко',
      subject: 'Алгоритми',
      title: 'Лабораторна робота №3: Сортування',
      description: 'Реалізувати та порівняти алгоритми швидкого сортування та сортування злиттям',
      dueDate: 'Завтра, 23:59',
      points: 100,
      completed: false,
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: 'Проф. Коваленко',
      subject: 'Веб-технології',
      title: 'Проєкт: Інтерактивний дашборд',
      description: 'Створити дашборд з використанням React та TypeScript з інтерактивними графіками',
      dueDate: '18 грудня, 23:59',
      points: 150,
      completed: false,
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: 'Проф. Мельник',
      subject: 'Бази даних',
      title: 'Домашнє завдання: SQL запити',
      description: 'Виконати 10 SQL запитів різної складності для роботи з реляційною базою даних',
      dueDate: '15 грудня, 18:00',
      points: 50,
      completed: true,
      submittedFiles: [
        { name: 'sql_queries.sql', size: '2.4 KB', uploadedAt: '14 грудня, 15:30' },
      ],
    },
    {
      id: 4,
      teacherId: 1,
      teacherName: 'Проф. Іваненко',
      subject: 'Алгоритми',
      title: 'Тест: Графи та дерева',
      description: 'Онлайн тест на знання алгоритмів обходу графів та роботи з деревами',
      dueDate: '20 грудня, 12:00',
      points: 75,
      completed: false,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'student',
      text: inputMessage,
      time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate teacher response
    setTimeout(() => {
      const teacherResponse: Message = {
        id: messages.length + 2,
        sender: 'teacher',
        text: 'Дякую за повідомлення! Відповім трохи пізніше.',
        time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, teacherResponse]);
    }, 2000);
  };

  const toggleAssignmentComplete = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment && !assignment.completed) {
      setSelectedAssignment(assignment);
      setView('submit');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submitAssignment = () => {
    if (selectedAssignment && uploadedFiles.length > 0) {
      const submittedFiles: SubmittedFile[] = uploadedFiles.map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: new Date().toLocaleString('uk-UA', { 
          day: 'numeric', 
          month: 'long', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      }));

      setAssignments(assignments.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, completed: true, submittedFiles } 
          : a
      ));

      setUploadedFiles([]);
      setView('assignments');
    }
  };

  // Submit Assignment View
  if (view === 'submit' && selectedAssignment) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-b border-pink-500/30 backdrop-blur-sm">
          <button
            onClick={() => setView('assignments')}
            className="flex items-center gap-2 text-pink-400 mb-3 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Назад</span>
          </button>
          <h2 className="text-sm text-white mb-1">Здати завдання</h2>
          <p className="text-xs text-pink-400">{selectedAssignment.title}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Assignment Info */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
            <p className="text-sm text-white mb-2">{selectedAssignment.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{selectedAssignment.teacherName}</span>
              <span>•</span>
              <span className="text-pink-400">{selectedAssignment.points} балів</span>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
            <h3 className="text-sm text-white mb-3">Завантажити файли</h3>
            
            <label className="block p-4 bg-pink-600/10 rounded-lg border-2 border-dashed border-pink-500/30 cursor-pointer hover:bg-pink-600/20 transition-colors text-center">
              <Upload className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <p className="text-sm text-pink-400 mb-1">Натисни, щоб завантажити файли</p>
              <p className="text-xs text-gray-500">PDF, DOC, ZIP, код тощо</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-400">Завантажені файли:</p>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-pink-500/20"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="w-4 h-4 text-pink-400" />
                      <div className="flex-1">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-4 bg-gray-900/50 border-t border-pink-500/30">
          <button
            onClick={submitAssignment}
            disabled={uploadedFiles.length === 0}
            className={`w-full py-3 rounded-lg text-sm transition-all ${
              uploadedFiles.length > 0
                ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white hover:scale-105 shadow-lg shadow-pink-500/30'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Здати завдання ({uploadedFiles.length} файл{uploadedFiles.length !== 1 ? 'ів' : ''})
          </button>
        </div>
      </div>
    );
  }

  // Main view with tabs
  if (view === 'main') {
    return (
      <div className="h-full flex flex-col">
        {/* Tabs */}
        <div className="flex gap-2 p-4 bg-gray-900/50 border-b border-pink-500/20">
          <button
            onClick={() => setView('main')}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg text-sm"
          >
            <MessageCircle className="w-4 h-4 inline mr-1" />
            Чати
          </button>
          <button
            onClick={() => setView('assignments')}
            className="flex-1 py-2 px-4 bg-gray-800 text-gray-400 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            Завдання
          </button>
        </div>

        {/* Teachers List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <h3 className="text-sm text-gray-400 px-2 mb-3">Викладачі</h3>
          {teachers.map((teacher) => (
            <button
              key={teacher.id}
              onClick={() => {
                setSelectedTeacher(teacher);
                setView('chat');
              }}
              className="w-full bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all backdrop-blur-sm text-left"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {teacher.photo ? (
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/50"
                    />
                  ) : (
                    <PixelAvatar variant={teacher.avatar} size={48} />
                  )}
                  {teacher.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-xs text-white">
                      {teacher.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-white">{teacher.name}</h3>
                  <p className="text-xs text-pink-400">{teacher.subject}</p>
                  {teacher.lastMessage && (
                    <p className="text-xs text-gray-500 mt-1 truncate">{teacher.lastMessage}</p>
                  )}
                </div>
                <MessageCircle className="w-5 h-5 text-pink-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Chat view
  if (view === 'chat' && selectedTeacher) {
    return (
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-b border-pink-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('main')}
              className="p-2 hover:bg-pink-500/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-pink-400" />
            </button>
            {selectedTeacher.photo ? (
              <img 
                src={selectedTeacher.photo} 
                alt={selectedTeacher.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-500/50"
              />
            ) : (
              <PixelAvatar variant={selectedTeacher.avatar} size={40} />
            )}
            <div className="flex-1">
              <h2 className="text-sm text-white">{selectedTeacher.name}</h2>
              <p className="text-xs text-pink-400">{selectedTeacher.subject}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === 'student'
                    ? 'bg-gradient-to-br from-pink-600 to-pink-700 text-white'
                    : 'bg-gray-900/80 text-white border border-pink-500/20'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-60 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-gray-900/50 border-t border-pink-500/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Напиши повідомлення..."
              className="flex-1 px-4 py-2 bg-black border border-pink-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-white placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-pink-500/30"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Assignments view
  if (view === 'assignments') {
    const activeAssignments = assignments.filter(a => !a.completed);
    const completedAssignments = assignments.filter(a => a.completed);

    return (
      <div className="h-full flex flex-col">
        {/* Tabs */}
        <div className="flex gap-2 p-4 bg-gray-900/50 border-b border-pink-500/20">
          <button
            onClick={() => setView('main')}
            className="flex-1 py-2 px-4 bg-gray-800 text-gray-400 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4 inline mr-1" />
            Чати
          </button>
          <button
            onClick={() => setView('assignments')}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg text-sm"
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            Завдання
          </button>
        </div>

        {/* Assignments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Stats */}
          <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm">
            <h2 className="text-sm text-white mb-2">Завдання від викладачів</h2>
            <div className="flex gap-3 text-xs">
              <div className="text-pink-400">
                <span className="font-semibold">{activeAssignments.length}</span> активних
              </div>
              <div className="text-green-400">
                <span className="font-semibold">{completedAssignments.length}</span> виконано
              </div>
            </div>
          </div>

          {/* Active Assignments */}
          {activeAssignments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm text-gray-400 px-2">Активні завдання</h3>
              {activeAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-gradient-to-r from-pink-600/20 to-pink-700/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleAssignmentComplete(assignment.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      <Circle className="w-5 h-5 text-pink-400 hover:text-pink-300 transition-colors" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm text-white mb-1">{assignment.title}</h3>
                          <p className="text-xs text-gray-400">{assignment.description}</p>
                        </div>
                        <div className="flex-shrink-0 ml-2 bg-pink-500/20 px-2 py-1 rounded border border-pink-500/30">
                          <p className="text-xs text-pink-400">{assignment.points} балів</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-pink-400">{assignment.teacherName}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400">{assignment.subject}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-red-400">
                        <Calendar className="w-3 h-3" />
                        <span>Дедлайн: {assignment.dueDate}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setView('submit');
                        }}
                        className="mt-3 px-3 py-1.5 bg-pink-600/30 text-pink-400 rounded-lg text-xs border border-pink-500/30 hover:bg-pink-600/40 transition-colors flex items-center gap-1"
                      >
                        <Paperclip className="w-3 h-3" />
                        Здати завдання
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Assignments */}
          {completedAssignments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm text-gray-400 px-2">Виконані завдання</h3>
              {completedAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-gray-900/30 rounded-xl p-4 border border-green-500/20 opacity-80 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-sm text-white mb-1">{assignment.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>{assignment.teacherName}</span>
                        <span>•</span>
                        <span className="text-green-400">{assignment.points} балів</span>
                      </div>
                      {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-500">Здані файли:</p>
                          {assignment.submittedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-gray-400 bg-black/30 p-2 rounded">
                              <FileText className="w-3 h-3 text-green-400" />
                              <span>{file.name}</span>
                              <span className="text-gray-600">•</span>
                              <span>{file.size}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}