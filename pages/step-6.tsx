import { useState } from 'react';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Link from 'next/link';
import ProgressBar from '../components/ProgressBar';

export default function Step6() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-6",
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
            step: "step-6",
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
    { icon: "❤️", text: "Sí, mucho" },
    { icon: "😕", text: "Sí, ya hasta me acostumbré" },
    { icon: "😅", text: "Si no me lo hubieras dicho, ni sabría que podría ser parasitosis" },
    { icon: "🙂", text: "No, no me molesta realmente." }
  ];

  return (
    <div className="min-h-screen bg-[#f6fdf7] text-gray-800 px-4 py-6 flex flex-col items-center font-sans">
      <ProgressBar step={6} total={22} />

      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md mt-6 border border-green-300">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2 leading-snug">
          ¿Los síntomas que seleccionaste han estado afectando tu vida?
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">Financiera, sexual, personal...</p>

        <div className="space-y-3">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => setSelected(option.text)}
              className={`flex items-center px-4 py-3 rounded-lg shadow-sm cursor-pointer border transition ${
                selected === option.text ? 'bg-green-50 border-green-500' : 'bg-white border-gray-300'
              }`}
            >
              <span className="mr-3 text-lg">{option.icon}</span>
              <span className="text-sm text-gray-800">{option.text}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/step-7">
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
