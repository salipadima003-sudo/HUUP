import { useState } from 'react';
import { Home, Bot, Calendar, ListTodo, Trophy, MessageSquare, User, GraduationCap, Users } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { AITeacher } from './components/AITeacher';
import { AIAssistant } from './components/AIAssistant';
import { Schedule } from './components/Schedule';
import { Tasks } from './components/Tasks';
import { League } from './components/League';
import { TableBook } from './components/TableBook';
import { Profile } from './components/Profile';
import { Grades } from './components/Grades';
import { Teachers } from './components/Teachers';

type Tab = 'home' | 'ai-teacher' | 'ai-assistant' | 'schedule' | 'tasks' | 'league' | 'tablebook' | 'profile' | 'grades' | 'teachers';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'ai-teacher':
        return <AITeacher />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'schedule':
        return <Schedule />;
      case 'tasks':
        return <Tasks />;
      case 'league':
        return <League />;
      case 'tablebook':
        return <TableBook />;
      case 'profile':
        return <Profile />;
      case 'grades':
        return <Grades />;
      case 'teachers':
        return <Teachers />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[844px] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800 relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
        
        {/* Content Area */}
        <div className="h-full flex flex-col pt-8">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-black">
            {renderContent()}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-pink-500/30 px-1 py-2 pb-6">
            <div className="flex justify-around items-center">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
                  activeTab === 'home'
                    ? 'text-pink-400 bg-pink-500/20'
                    : 'text-gray-500'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px]">Головна</span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
                  activeTab === 'schedule'
                    ? 'text-pink-400 bg-pink-500/20'
                    : 'text-gray-500'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-[10px]">Розклад</span>
              </button>

              <button
                onClick={() => setActiveTab('teachers')}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
                  activeTab === 'teachers'
                    ? 'text-pink-400 bg-pink-500/20'
                    : 'text-gray-500'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-[10px]">Викладачі</span>
              </button>

              <button
                onClick={() => setActiveTab('grades')}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
                  activeTab === 'grades'
                    ? 'text-pink-400 bg-pink-500/20'
                    : 'text-gray-500'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span className="text-[10px]">Оцінки</span>
              </button>

              <button
                onClick={() => setActiveTab('tablebook')}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
                  activeTab === 'tablebook'
                    ? 'text-pink-400 bg-pink-500/20'
                    : 'text-gray-500'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px]">TableBook</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
                  activeTab === 'profile'
                    ? 'text-pink-400 bg-pink-500/20'
                    : 'text-gray-500'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px]">Профіль</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}