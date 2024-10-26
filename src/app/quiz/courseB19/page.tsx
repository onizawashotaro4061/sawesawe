// src/app/QuizCourseA.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // これは正しいインポートです
import StoryComponent from '@/app/components/StoryComponent';

const QuizCourseA: React.FC = () => {
  const [, setHasParticipated] = useState<boolean | null>(null);
  const router = useRouter();

  const correctKeyword = 'MV';

  // ストーリーと画像の配列
  const stories = [
    {
      text: '正解\n\n',
      image: '/images/answer2.png',
    },
    {
      text: '石像にヒビが入った！勝てるかもしれない！しかし、疲れて頭がまわらなくなってきた…。\n\n',
      image: '/images/suckedroom.png',
    },
    {
      text: '「ホー、ホー…ダイジョーブ？」突然、背後からフクロウが出てきた。さっき感じた視線はコイツか…？\n\n',
      image: '/images/suckedroom.png',
    },
    {
      text: 'フクロウはなんと、昔石像に負けてしまい姿を変えられた冒険家だという。 \n\n',
      image: '/images/suckedroom.jpg',
    },
    { 
      text: '和泉ラーニングスクエアLS304教室へ行って、最後のキーワードを手に入れよう！',
      image: '/images/room.jpg',
     participationStatus: true,
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
    router.push('/click-counter');
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
