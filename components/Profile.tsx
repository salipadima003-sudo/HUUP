import { Settings, Award, BookOpen, Users, Heart, Camera } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';
import { useState } from 'react';

export function Profile() {
  const [currentAvatar, setCurrentAvatar] = useState<'student' | 'teacher' | 'user1' | 'user2' | 'user3' | 'robot'>('student');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  const avatarOptions: Array<'student' | 'teacher' | 'user1' | 'user2' | 'user3' | 'robot'> = [
    'student',
    'teacher',
    'user1',
    'user2',
    'user3',
    'robot',
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomPhoto(reader.result as string);
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Пости', value: '42', icon: BookOpen, color: 'text-pink-400' },
    { label: 'Підписники', value: '128', icon: Users, color: 'text-pink-400' },
    { label: 'Лайки', value: '356', icon: Heart, color: 'text-pink-400' },
    { label: 'Рівень', value: '15', icon: Award, color: 'text-pink-400' },
  ];

  const myPosts = [
    { id: 1, content: 'Вчора здав іспит на відмінно! 🎓', time: '2 дні тому', likes: 34 },
    { id: 2, content: 'Хто йде на студентську вечірку в п\'ятницю? 🎉', time: '3 дні тому', likes: 28 },
    { id: 3, content: 'Знайшов чудову бібліотеку для React! Рекомендую 💻', time: '5 днів тому', likes: 52 },
  ];

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-pink-600/20 via-pink-500/10 to-rose-600/20 rounded-2xl p-6 border border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="relative group"
              >
                {customPhoto ? (
                  <img 
                    src={customPhoto} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-500/50"
                  />
                ) : (
                  <PixelAvatar variant={currentAvatar} size={64} />
                )}
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </button>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h2 className="text-lg text-white">Олександр Петренко</h2>
              <p className="text-sm text-pink-400">КН-301</p>
              <p className="text-xs text-gray-400 mt-1">Комп'ютерні науки</p>
            </div>
          </div>
          <button className="p-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors border border-pink-500/30">
            <Settings className="w-5 h-5 text-pink-400" />
          </button>
        </div>

        {/* Avatar Picker */}
        {showAvatarPicker && (
          <div className="mb-4 p-3 bg-black/50 rounded-xl border border-pink-500/30">
            <p className="text-xs text-pink-400 mb-2">Обери свій аватар:</p>
            
            {/* Upload Photo Button */}
            <label className="block mb-3 p-3 bg-pink-600/20 rounded-lg border border-pink-500/30 cursor-pointer hover:bg-pink-600/30 transition-colors">
              <div className="flex items-center justify-center gap-2 text-pink-400">
                <Camera className="w-4 h-4" />
                <span className="text-sm">Завантажити своє фото</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>

            {/* Pixel Art Avatars */}
            <p className="text-xs text-gray-400 mb-2">Або обери піксель-арт:</p>
            <div className="grid grid-cols-6 gap-2">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => {
                    setCurrentAvatar(avatar);
                    setCustomPhoto(null);
                    setShowAvatarPicker(false);
                  }}
                  className={`p-1 rounded-lg transition-all ${
                    currentAvatar === avatar && !customPhoto
                      ? 'bg-pink-500/30 ring-2 ring-pink-500'
                      : 'bg-black/30 hover:bg-pink-500/10'
                  }`}
                >
                  <PixelAvatar variant={avatar} size={40} />
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-300 mb-4">
          Студент 3 курсу 💻 Люблю програмування та нові технології 🚀
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-2 text-center border border-pink-500/20">
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
              <p className="text-lg text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 backdrop-blur-sm">
        <h3 className="text-sm text-white mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-pink-400" />
          Останні досягнення
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center border border-pink-400/30 shadow-lg">
            <span className="text-2xl">🏆</span>
          </div>
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl flex items-center justify-center border border-rose-400/30 shadow-lg">
            <span className="text-2xl">📚</span>
          </div>
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center border border-pink-400/30 shadow-lg">
            <span className="text-2xl">✓</span>
          </div>
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center border border-rose-400/30 shadow-lg">
            <span className="text-2xl">⭐</span>
          </div>
        </div>
      </div>

      {/* My Posts */}
      <div>
        <h3 className="text-sm text-gray-400 mb-2 px-2">Мої пости</h3>
        <div className="space-y-2">
          {myPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all backdrop-blur-sm"
            >
              <p className="text-sm text-white mb-2">{post.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.time}</span>
                <div className="flex items-center gap-1 text-pink-400">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}