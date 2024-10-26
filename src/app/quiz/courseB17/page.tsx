// src/app/QuizCourseA.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryComponent from '@/app/components/StoryComponent';

const QuizCourseA: React.FC = () => {
  const [, setHasParticipated] = useState<boolean | null>(null);
  const router = useRouter();

  const correctKeyword = '自然科学';

  // ストーリーと画像の配列
  const stories = [
    {
      text: '正解\n\n',
      image: '/images/answer2.png',
    },
    {
      text: '壁画の文字が変化し始めた。短剣が、大昔に祭具として使われていたということがわかった！短剣を飾ったら何か起こるかもしれない。短剣を土台に飾る。すると地面が揺れ始め、祭壇の裏に階段が現れた！\n\n',
      image: '/images/祭壇.png',
    },
    {
      text: '進んでいくと、光る宝石を見つけた。もしかして、別世界に行けるという宝石だろうか？よく見ようと宝石を手に取ると…。 \n\n',
      image: '/images/cave.png',
    },
    {
      text: '宝石に吸い込まれてしまった！吸い込まれた先で目を開くと、目の前に変な石像がいる。\n\n',
      image: '/images/suckedroom.png',
    },
    {
      text: '「ここから出たければ、私にバトルで勝て！」石像がバトルをしかけてきた！\n\n',
      image: '/images/suckedroom.png',
    },
    { 
      text: '和泉ラーニングスクエアLS401教室へ行って、キーワードを手に入れよう！',
      image: '/images/suckedroom.png',
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
    router.push('/quiz/courseA18');
  };

  const participationLabel = ""; // ここで企画名を設定
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
