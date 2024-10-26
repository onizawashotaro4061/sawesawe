// src/app/QuizCourseA.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryComponent from '@/app/components/StoryComponent';

interface Story {
  text: string;
  image: string;
  overlayImage?: string;
  participationStatus?: boolean;
}

const QuizCourseA: React.FC = () => {
  const [, setHasParticipated] = useState<boolean | null>(null);
  const router = useRouter();

  const correctKeyword = 'サポーター';
   

  // ストーリーと画像の配列
  const stories: Story[] = [
    {
      text: 'どこからか鳴き声が聞こえる…。「ホー、ホー…」何かはわからないが、そろそろ起きよう。\n\n',
      image: '/images/king.png',
    },
    {
      text: '目が覚めたら異世界の知らない王国にいた。そこで、「別世界へ行ける宝石が迷宮にある」という噂が聞こえてきた。その宝石を手に入れれば、元の世界に戻れるかもしれない！装備を整えて、いざ、迷宮へ！\n\n',
      image: '/images/king.png',
    },
    {
      text: 'ここは古代遺跡のようだ。潜り始めて少ししたところで、ゴブリンたちが襲ってきた！体に力がみなぎり、ゴブリンを倒した！',
      image: '/images/cave.png',
    },
    {
      text: '奥へ進むと、宝箱を見つけた！宝箱にはギミックがあるようだ。ギミックを解いて宝箱を開けよう！',
      image: '/images/cave.png',
      overlayImage: '/images/chest.png',
    },
    {
      text: '第一校舎404教室へ行って、キーワードを手に入れよう！',
      image: '/images/cave.png',
      overlayImage: '/images/chest.png',
      participationStatus: true,
    }
  ];

  const handleParticipation = async (participated: boolean) => {
    setHasParticipated(participated);
    try {
      await fetch('/api/participation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: 'A',
          step: 1,
          participated: participated,
        }),
      });
    } catch (error) {
      console.error('参加情報の送信に失敗しました:', error);
    }
  };

  const handleNext = (url: string) => {
    // 動的に指定されたURLにページ遷移
    router.push(url);
  };

  const participationLabel = "〇〇"; // ここで企画名を設定

  return (
    <div>
      {/* ストーリーコンポーネントの呼び出し */}
      <StoryComponent
        stories={stories}
        onParticipationChange={handleParticipation}
        onParticipationConfirmed={() => console.log('参加が確認されました')}
        correctKeyword={correctKeyword}
        course="B" // courseを指定
        step={1}   // stepを指定
        onNext={() => handleNext('/quiz/courseB12')} // 正しいページ遷移を指定
        participationLabel={participationLabel} // 企画名を渡す
      />
    </div>
  );
};

export default QuizCourseA;
