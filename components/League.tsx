import { Trophy, TrendingUp, Award, Target } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

export function League() {
  const leaderboard = [
    { rank: 1, name: 'Марія Коваленко', points: 2450, avatar: 'user1', trend: '+120' },
    { rank: 2, name: 'Олександр Петренко', points: 2380, avatar: 'student', trend: '+95', isMe: true },
    { rank: 3, name: 'Іван Сидоренко', points: 2245, avatar: 'user2', trend: '+88' },
    { rank: 4, name: 'Анна Мельник', points: 2190, avatar: 'user3', trend: '+76' },
    { rank: 5, name: 'Дмитро Іваненко', points: 2050, avatar: 'user1', trend: '+65' },
  ];

  const achievements = [
    { title: 'Перша сотня', icon: '🎯', color: 'from-pink-600 to-pink-700' },
    { title: 'Майстер завдань', icon: '✓', color: 'from-rose-600 to-rose-700' },
    { title: 'Streak 7 днів', icon: '🔥', color: 'from-pink-500 to-pink-600' },
    { title: 'Соціальна зірка', icon: '⭐', color: 'from-rose-500 to-rose-600' },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-600/20 to-amber-600/20 border-yellow-500/40';
      case 2: return 'from-gray-500/20 to-gray-600/20 border-gray-400/40';
      case 3: return 'from-orange-600/20 to-orange-700/20 border-orange-500/40';
      default: return 'from-pink-600/20 to-pink-700/20 border-pink-500/30';
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-6 h-6 text-pink-400" />
          <h2 className="text-lg text-white">Ліга студентів</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/30 rounded-lg p-2 border border-pink-500/20">
            <p className="text-xs text-pink-400">Твоє місце</p>
            <p className="text-2xl text-pink-300">🥈 2</p>
          </div>
          <div className="bg-black/30 rounded-lg p-2 border border-pink-500/20">
            <p className="text-xs text-pink-400">Твої бали</p>
            <p className="text-2xl text-pink-300">2380</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-sm text-gray-400 mb-2 px-2">Досягнення</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${achievement.color} rounded-xl p-3 border border-pink-400/30 text-center shadow-lg`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <p className="text-xs text-white">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <h3 className="text-sm text-gray-400 mb-2 px-2">Топ студенти</h3>
        <div className="space-y-2">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`bg-gradient-to-r ${getRankColor(user.rank)} rounded-xl p-3 border backdrop-blur-sm ${
                user.isMe ? 'ring-2 ring-pink-500/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 text-center w-8">
                  <div className="text-xl">{getRankEmoji(user.rank)}</div>
                </div>
                <PixelAvatar variant={user.avatar as any} size={40} />
                <div className="flex-1">
                  <h3 className="text-sm text-white">
                    {user.name}
                    {user.isMe && <span className="text-xs text-pink-400 ml-1">(ти)</span>}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Award className="w-3 h-3" />
                    <span>{user.points} балів</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">{user.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-pink-400" />
          <h3 className="text-sm text-white">Тижневі цілі</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Виконані завдання</span>
              <span className="text-pink-400">12/15</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-pink-500/20">
              <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Активність в TableBook</span>
              <span className="text-pink-400">8/10</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-pink-500/20">
              <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}