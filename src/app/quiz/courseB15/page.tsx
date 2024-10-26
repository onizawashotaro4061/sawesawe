// src/app/QuizCourseA.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryComponent from '@/app/components/StoryComponent';

const QuizCourseA: React.FC = () => {
  const [, setHasParticipated] = useState<boolean | null>(null);
  const router = useRouter();

  const correctKeyword = 'マガジン';


  // ストーリーと画像の配列
  const stories = [
    {
      text: '正解！滝が二手に割れた！滝に近づくと、奥に人が一人通れそうな穴を見つけた。誰かに見られている気がするが、前へ進もう！ \n\n',
      image: '/images/湖.png',
    },
    {
      text: '歩いていると、怪しい祭壇と壁画を見つけた！祭壇には何かが飾られていたと思われる土台。壁画には謎が書かれている！これを解いたら何か起こるかもしれない。\n\n',
      image: '/images/祭壇.jpg',
    },
    { 
      text: 'メディア棟M606教室へ行って、キーワードを手に入れよう！',
      image: '/images/祭壇.png',
      participationStatus: true, // 修正: プロパティ名を変更
    }
  ];

  const handleParticipation = async (participated: boolean) => {
    setHasParticipated(participated);
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
  };

  const handleNext = () => {
    // ページ遷移処理
    router.push('/quiz/courseA16');
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
        course="A" // courseを指定
        step={5}   // stepを指定
        onNext={handleNext} // onNext関数を渡す
        participationLabel={participationLabel} // 企画名を渡す
      />
    </div>
  );
};

export default QuizCourseA;
