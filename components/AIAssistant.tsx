import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

export function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Привіт! Я загальний ШІ-асистент. Можу допомогти з організацією часу, порадами та різними завданнями. Чим можу бути корисний?',
    },
  ]);
  const [input, setInput] = useState('');

  const quickActions = [
    { text: 'Створи план дня', icon: '📅' },
    { text: 'Дай пораду для навчання', icon: '💡' },
    { text: 'Підкажи мотивацію', icon: '🚀' },
    { text: 'Організуй завдання', icon: '✓' },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };

    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Звичайно! Ось що я можу порадити: почни з найважливіших завдань вранці, коли концентрація найвища. Роби перерви кожні 50 хвилин.',
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-rose-600/20 to-pink-600/20 border-b border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <PixelAvatar variant="robot" size={48} />
          <div>
            <h2 className="text-lg text-white">ШІ Асистент</h2>
            <p className="text-xs text-pink-400">Твій особистий помічник</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-black/50 border-b border-pink-500/20">
        <p className="text-xs text-gray-400 mb-2">Швидкі дії:</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.text)}
              className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-lg p-2 border border-rose-400/30 hover:scale-105 transition-transform text-sm text-left text-white shadow-lg"
            >
              <span className="mr-1">{action.icon}</span>
              {action.text}
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
                <div className="w-8 h-8 bg-rose-600/30 rounded-full flex items-center justify-center border border-rose-500/50">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </div>
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-rose-600 to-rose-700 text-white border border-rose-500/50'
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
            placeholder="Напиши щось..."
            className="flex-1 px-4 py-2 bg-black border border-pink-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-white placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-rose-500/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}