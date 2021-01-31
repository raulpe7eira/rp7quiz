/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const project = context.query.id;

  const externalDb = await fetch(`https://${project}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });

  return {
    props: {
      externalDb,
    },
  };
}
