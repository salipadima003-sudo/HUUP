import { Bot, Sparkles, Trophy } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="p-6 space-y-4">
      {/* User Welcome */}
      <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 rounded-2xl p-4 border border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <PixelAvatar variant="student" size={56} />
          <div>
            <p className="text-sm text-pink-400">Вітаємо,</p>
            <h2 className="text-lg text-white">Олександр Петренко</h2>
            <p className="text-xs text-pink-300">КН-301 • Рівень 15</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('ai-teacher')}
          className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-4 border border-pink-500/50 hover:scale-105 transition-transform shadow-lg shadow-pink-500/20"
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <Bot className="w-8 h-8" />
            <span className="text-sm">ШІ Викладач</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('ai-assistant')}
          className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl p-4 border border-rose-500/50 hover:scale-105 transition-transform shadow-lg shadow-rose-500/20"
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <Sparkles className="w-8 h-8" />
            <span className="text-sm">ШІ Асистент</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('league')}
          className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 border border-pink-400/50 hover:scale-105 transition-transform shadow-lg shadow-pink-500/20"
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <Trophy className="w-8 h-8" />
            <span className="text-sm">Ліга</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('tablebook')}
          className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-4 border border-rose-400/50 hover:scale-105 transition-transform shadow-lg shadow-rose-500/20"
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <span className="text-2xl">📖</span>
            <span className="text-sm">TableBook</span>
          </div>
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
        <h3 className="text-sm text-pink-400 mb-3">📅 Сьогодні</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-pink-500/10 rounded-lg p-3 border border-pink-500/20">
            <div className="text-pink-400 text-xs">10:00</div>
            <div className="flex-1">
              <p className="text-sm text-white">Алгоритми та структури даних</p>
              <p className="text-xs text-gray-400">Ауд. 301 • Проф. Іваненко</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-pink-500/10 rounded-lg p-3 border border-pink-500/20">
            <div className="text-pink-400 text-xs">12:00</div>
            <div className="flex-1">
              <p className="text-sm text-white">Веб-технології</p>
              <p className="text-xs text-gray-400">Ауд. 205 • Проф. Коваленко</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Overview */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
        <h3 className="text-sm text-pink-400 mb-3">✓ Завдання</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-red-500/10 rounded-lg p-3 border border-red-500/30">
            <div>
              <p className="text-sm text-white">Лабораторна робота №3</p>
              <p className="text-xs text-red-400">Дедлайн: Завтра</p>
            </div>
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">!</div>
          </div>
          <div className="flex items-center justify-between bg-green-500/10 rounded-lg p-3 border border-green-500/30">
            <div>
              <p className="text-sm text-white">Есе з філософії</p>
              <p className="text-xs text-green-400">До 20 грудня</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}