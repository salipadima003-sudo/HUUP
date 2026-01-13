import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

export function AITeacher() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Привіт! Я твій ШІ-викладач. Можу допомогти з навчанням, поясненнями та відповісти на запитання. Про що хочеш поговорити?',
    },
  ]);
  const [input, setInput] = useState('');

  const subjects = [
    { name: 'Математика', emoji: '📐', color: 'from-pink-600 to-pink-700' },
    { name: 'Програмування', emoji: '💻', color: 'from-rose-600 to-rose-700' },
    { name: 'Фізика', emoji: '⚡', color: 'from-pink-500 to-pink-600' },
    { name: 'Хімія', emoji: '🧪', color: 'from-rose-500 to-rose-600' },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };

    setMessages([...messages, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Це чудове запитання! Давай розглянемо це детальніше. Для кращого розуміння рекомендую почати з основ...',
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-b border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <PixelAvatar variant="teacher" size={48} />
          <div>
            <h2 className="text-lg text-white">ШІ Викладач</h2>
            <p className="text-xs text-pink-400">Завжди готовий допомогти</p>
          </div>
        </div>
      </div>

      {/* Quick Subject Selection */}
      <div className="p-4 bg-black/50 border-b border-pink-500/20">
        <p className="text-xs text-gray-400 mb-2">Швидкий вибір предмету:</p>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              className={`bg-gradient-to-br ${subject.color} rounded-lg p-2 border border-pink-400/30 hover:scale-105 transition-transform text-sm text-white shadow-lg`}
            >
              <span className="mr-1">{subject.emoji}</span>
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-pink-600/30 rounded-full flex items-center justify-center border border-pink-500/50">
                  <Bot className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-pink-600 to-pink-700 text-white border border-pink-500/50'
                  : 'bg-gray-900/80 text-white border border-pink-500/20'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-900/50 border-t border-pink-500/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Постав запитання..."
            className="flex-1 px-4 py-2 bg-black border border-pink-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-white placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-pink-500/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}