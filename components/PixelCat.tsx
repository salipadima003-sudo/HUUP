interface PixelCatProps {
  color: 'pink' | 'black' | 'gray' | 'white';
  size?: number;
}

export function PixelCat({ color, size = 64 }: PixelCatProps) {
  const pixelSize = size / 16;

  const colorMap = {
    pink: {
      main: '#ec4899',
      dark: '#be185d',
      light: '#fbcfe8',
    },
    black: {
      main: '#1f2937',
      dark: '#111827',
      light: '#4b5563',
    },
    gray: {
      main: '#6b7280',
      dark: '#4b5563',
      light: '#9ca3af',
    },
    white: {
      main: '#f3f4f6',
      dark: '#d1d5db',
      light: '#ffffff',
    },
  };

  const colors = colorMap[color];

  // Pixel art pattern (16x16 grid)
  // 1 = main color, 2 = dark color, 3 = light color, 4 = eyes, 5 = nose, 0 = transparent
  const pattern = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 2, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 3, 4, 4, 1, 1, 4, 4, 3, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 4, 4, 1, 1, 4, 4, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 1, 3, 5, 5, 3, 1, 1, 1, 2, 0, 0],
    [0, 0, 2, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 2, 0, 0],
    [0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const getPixelColor = (value: number) => {
    switch (value) {
      case 1:
        return colors.main;
      case 2:
        return colors.dark;
      case 3:
        return colors.light;
      case 4:
        return '#ffffff'; // eyes white
      case 5:
        return '#ec4899'; // nose pink
      default:
        return 'transparent';
    }
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(16, ${pixelSize}px)`,
        gridTemplateRows: `repeat(16, ${pixelSize}px)`,
        imageRendering: 'pixelated',
      }}
    >
      {pattern.flat().map((pixel, index) => (
        <div
          key={index}
          style={{
            backgroundColor: getPixelColor(pixel),
            width: pixelSize,
            height: pixelSize,
          }}
        />
      ))}
    </div>
  );
}
