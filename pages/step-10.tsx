"use client"
import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Step10() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-10",
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
            step: "step-10",
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
  const router = useRouter()
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg')
  const [weight, setWeight] = useState(66)

  const convertWeight = (w: number) =>
    unit === 'kg' ? w : Math.round(w * 2.20462)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6fdf7] px-4 py-10">
      <ProgressBar step={10} total={25} />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 text-center border border-green-300">
        <h1 className="text-2xl font-bold text-gray-900">¿Cuál es tu peso?</h1>
        <p className="text-sm text-gray-500 mt-1">(Puede ser aproximado)</p>

        <div className="mt-4 flex justify-center gap-3">
          {['kg', 'lb'].map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u as 'kg' | 'lb')}
              className={`px-4 py-1 rounded-full font-medium transition ${
                unit === u
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="mt-6 text-5xl font-extrabold text-black">
          {convertWeight(weight)}<span className="text-xl font-bold">{unit}</span>
        </div>

        <div className="mt-6">
          <input
            type="range"
            min={50}
            max={140}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
            <span>50</span>
            <span>95</span>
            <span>140</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Desliza para ajustar</p>
        </div>

        <button
          onClick={() => router.push('/step-11')}
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg shadow-md transition"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}