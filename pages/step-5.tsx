import { useState } from 'react';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Link from 'next/link';
import ProgressBar from '../components/ProgressBar';

export default function Step5() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-5",
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
            step: "step-5",
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
  const symptoms = [
    "Ansiedad excesiva", "Estreñimiento", "Dolores de cabeza", "Ojeras",
    "Fatiga crónica", "Hinchazón abdominal", "Deseo excesivo de comer dulces",
    "Insomnio", "Problemas en la piel", "Anemia (falta de hierro)", "Caída del cabello",
    "Dolores articulares", "Depresión"
  ];

  const [selected, setSelected] = useState([] as string[]);

  const toggleSymptom = (symptom: string) => {
    if (selected.includes(symptom)) {
      setSelected(selected.filter(s => s !== symptom));
    } else {
      setSelected([...selected, symptom]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fdf7] text-gray-800 px-4 py-6 flex flex-col items-center font-sans">
      <ProgressBar step={5} total={22} />

      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-md mt-6 border border-green-300">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 leading-snug">
          ¿Cuáles de los siguientes síntomas te molestan más?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {symptoms.map((symptom, idx) => (
            <div
              key={idx}
              onClick={() => toggleSymptom(symptom)}
              className={`flex items-center px-4 py-3 rounded-lg shadow-sm cursor-pointer border transition ${
                selected.includes(symptom) ? 'bg-red-50 border-red-400' : 'bg-white border-gray-300'
              }`}
            >
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: selected.includes(symptom) ? '#dc2626' : '#d1d5db' }}
              ></div>
              <span className="text-sm text-gray-800">{symptom}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/step-6">
            <button
              className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition"
              disabled={selected.length === 0}
              style={{ opacity: selected.length > 0 ? 1 : 0.4 }}
            >
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
