interface PlaceholderImageProps {
  text: string;
  width?: number;
  height?: number;
}

export default function PlaceholderImage({ text, width = 800, height = 600 }: PlaceholderImageProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="#1a1a1a" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#666"
        fontSize="24"
        fontFamily="Arial, sans-serif"
      >
        {text}
      </text>
    </svg>
  );
}
