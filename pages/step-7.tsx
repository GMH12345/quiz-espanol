import { useState } from 'react';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Link from 'next/link';
import ProgressBar from '../components/ProgressBar';

export default function Step7() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-7",
          enteredAt: Timestamp.fromDate(new Date()),
        });
      } catch (e) {
        console.error("Erro ao registrar entrada:", e);
      }
    };
    logEntry();

    return () => {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000;
      const logExit = async () => {
        try {
          await addDoc(collection(db, "stepTracking"), {
            step: "step-7",
            exitedAt: Timestamp.fromDate(new Date()),
            timeSpentSeconds: timeSpent,
          });
        } catch (e) {
          console.error("Erro ao registrar saída:", e);
        }
      };
      logExit();
    };
  }, []);
  const [selected, setSelected] = useState(null as string | null);

  const options = [
    { icon: "🧠", text: "Sí, ya conocía los síntomas" },
    { icon: "😨", text: "¡No lo sabía! ¡Me preocupé!" }
  ];

  return (
    <div className="min-h-screen bg-[#f6fdf7] text-gray-800 px-4 py-6 flex flex-col items-center font-sans">
      <ProgressBar step={7} total={22} />

      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md mt-6 border border-green-300">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-4 leading-snug">
          ¿Has visto el reciente aumento de casos de parásitos en países de habla hispana?
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Estos son algunos de los síntomas reconocidos por las autoridades de salud:
        </p>

        <div className="bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 mb-6 shadow">
          <h2 className="font-semibold text-sm text-blue-900 mb-2 flex items-center gap-2">
            <span>✅</span> Reconocido por entidades sanitarias oficiales
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            <li><strong>Dolor abdominal</strong> – geralmente ao redor do umbigo;</li>
            <li><strong>Hinchazón abdominal</strong> ou exceso de gases;</li>
            <li><strong>Diarrea frecuente</strong> e náuseas recurrentes;</li>
            <li><strong>Picazón anal</strong>, especialmente à noite;</li>
            <li><strong>Fatiga constante</strong> que não passa com repouso;</li>
            <li><strong>Pérdida de peso inexplicable</strong>;</li>
            <li><strong>Presencia de puntos blancos</strong> en las heces;</li>
            <li><strong>Apetito alterado</strong>: disminución o aumento repentino;</li>
            <li><strong>Mal aliento</strong> constante mesmo com higiene bucal.</li>
          </ul>
          <p className="mt-2 text-xs text-gray-600">Fonte: Ministério da Saúde, Associação Brasileira de Gastroenterologia</p>
        </div>

        <div className="space-y-3">
          {options.map((option, idx) => (
            <div
              key={idx}
              className={`flex items-center px-4 py-3 rounded-lg shadow-sm cursor-pointer border transition ${
                selected === option.text ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
              }`}
              onClick={() => setSelected(option.text)}
            >
              <span className="mr-3 text-xl">{option.icon}</span>
              <span className="text-sm text-gray-800">{option.text}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/step-8">
            <button
              className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition"
              disabled={!selected}
              style={{ opacity: selected ? 1 : 0.4 }}
            >
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
