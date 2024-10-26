"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryComponent from '@/app/components/StoryComponent';

const QuizCourseA: React.FC = () => {
  const [hasParticipated, setHasParticipated] = useState<boolean | null>(null);
  const router = useRouter();

  const correctKeyword = '卒業生';

  const stories = [
    {
      text: '正解\n\n',
      image: '/images/A1a.jpg',
    },
    {
      text: '宝箱が開いた！中から短剣が出てきた。短剣を装備して、先に進もう。 \n\n',
      image: '/images/cave.png',
      overlayImage: '/images/sword.png',
    },
    {
      text: '少し歩くと目の前に大きな滝が現れた！この先に進むにはどうすれば…。\n\n',
      image: '/images/lake.png',
    },
    {
      text: 'するとさっき拾った短剣が光り、壁を照らした。壁には謎が書かれている！この謎を解いたら前に進めるかもしれない。\n\n',
      image: '/images/MagicRoom.png',
    },
    {
      text: '第一校舎312教室へ行って、キーワードを手に入れよう！',
      image: '/images/MagicRoom.png',
      participationStatus: true,
    },
  ];

  const handleParticipation = async (participated: boolean) => {
    setHasParticipated(participated);
    await fetch('/api/participation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course: 'B',
        step: 3,
        participated: participated,
      }),
    });
  };

  const handleNext = async () => {
    // キーワードを Supabase に記録
    await fetch('/api/keyword-attempt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course: 'B', // コース名を指定
        step: 3, // ステップを指定
      }),
    });

    router.push('/quiz/courseB14');
  };

  const participationLabel = "〇〇"; // ここで企画名を設定

  return (
    <div>
      <StoryComponent
        stories={stories}
        onParticipationChange={handleParticipation}
        onParticipationConfirmed={() => console.log('参加が確認されました')}
        correctKeyword={correctKeyword}
          course="B" // courseを指定
        step={3}   // stepを指定
        onNext={handleNext} // onNext関数を渡す
        participationLabel={participationLabel} // 企画名を渡す
      />
    </div>
  );
};

export default QuizCourseA;
