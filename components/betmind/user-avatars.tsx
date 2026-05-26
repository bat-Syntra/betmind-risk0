"use client";

interface UserAvatarsProps {
  count: number;
}

const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'];

export function UserAvatars({ count }: UserAvatarsProps) {
  const displayCount = Math.min(count, 3);
  const remaining = count - displayCount;

  return (
    <div className="flex -space-x-2">
      {Array.from({ length: displayCount }).map((_, i) => (
        <div 
          key={i}
          className={`w-6 h-6 rounded-full ${colors[i % colors.length]} border-2 border-gray-900`}
        />
      ))}
      {remaining > 0 && (
        <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">
          +{remaining}
        </div>
      )}
    </div>
  );
}
