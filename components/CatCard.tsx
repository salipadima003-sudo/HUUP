import { Heart } from 'lucide-react';
import { PixelCat } from './PixelCat';

interface CatCardProps {
  cat: {
    id: number;
    name: string;
    rarity: string;
    color: 'pink' | 'black' | 'gray' | 'white';
  };
  isLiked: boolean;
  onToggleLike: () => void;
}

export function CatCard({ cat, isLiked, onToggleLike }: CatCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'from-yellow-600 to-orange-600';
      case 'Epic':
        return 'from-purple-600 to-pink-600';
      case 'Rare':
        return 'from-blue-600 to-cyan-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${getRarityColor(
        cat.rarity
      )} rounded-xl p-3 border-4 border-black/30 relative`}
    >
      <button
        onClick={onToggleLike}
        className="absolute top-2 right-2 z-10 bg-black/50 rounded-full p-1.5 hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-4 h-4 ${
            isLiked ? 'fill-pink-400 text-pink-400' : 'text-white'
          }`}
        />
      </button>

      <div className="flex justify-center mb-2 mt-2">
        <PixelCat color={cat.color} size={64} />
      </div>

      <div className="text-center">
        <p className="text-sm">{cat.name}</p>
        <p className="text-xs opacity-75 mt-1">{cat.rarity}</p>
      </div>
    </div>
  );
}
