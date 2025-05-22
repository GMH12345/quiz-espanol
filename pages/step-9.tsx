"use client"
import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Circle } from 'lucide-react'

export default function Step9() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-9",
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
            step: "step-9",
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
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()

  const options: { id: number; text: string; icon: string }[] = [
    {
      id: 1,
      text: 'Sí, entendí la gravedad de tener parásitos viviendo en mi intestino.',
      icon: '😨',
    },
    {
      id: 2,
      text: 'No me preocupa este tema',
      icon: '😐',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white p-4">
      <ProgressBar step={9} total={25} />

      <div className="text-center max-w-md border border-green-300 p-4 rounded-xl shadow mt-6">
        <h1 className="text-xl font-bold leading-snug text-black">
          ¿Sabías que cada día que pasas con parásitos en tu cuerpo puede desencadenar{' '}
          <span className="text-green-600">enfermedades graves</span> que son casi irreversibles?
        </h1>
        <p className="mt-1 text-gray-500 text-sm">Por favor, responde con sinceridad.</p>

        <div className="mt-4 border rounded-lg overflow-hidden">
          <div className="bg-blue-700 text-white px-4 py-2 flex items-center justify-between">
            <span className="uppercase font-bold text-sm">NOTICIAS SALUD</span>
            <span className="bg-yellow-300 text-black text-xs font-bold px-2 py-0.5 rounded">INFO</span>
          </div>
          <div className="bg-white px-4 py-3 text-sm text-black">
            <p className="font-semibold">
              Mujer sufre ruptura hepática tras que un parásito depositara huevos en su abdomen, en Túnez
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Este caso fue reportado en un episodio de un pódcast médico internacional.
            </p>
          </div>
        </div>

        <p className="text-center mt-6 mb-2 text-sm font-medium">Elige una opción para continuar</p>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelected(option.id)
                setTimeout(() => router.push("/step-10"), 400)
              }}
              className={`w-full px-4 py-3 border rounded-xl flex items-center justify-between ${
                selected === option.id ? "bg-green-100 border-green-500" : "bg-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm text-black">{option.text}</span>
              </div>
              {selected === option.id ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}