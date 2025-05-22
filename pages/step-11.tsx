"use client"
import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Step11() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-11",
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
            step: "step-11",
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
  const [isMetric, setIsMetric] = useState(true)
  const [height, setHeight] = useState(170)

  const convertHeight = (h: number) =>
    isMetric ? h : Math.round(h / 2.54)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={11} total={25} />
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-green-300 p-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-2">¿Cuál es tu altura?</h1>
        <p className="text-sm text-gray-500 mb-4">(Puede ser aproximada)</p>

        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setIsMetric(true)}
            className={`px-4 py-1 rounded-full font-medium transition ${
              isMetric ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            cm
          </button>
          <button
            onClick={() => setIsMetric(false)}
            className={`px-4 py-1 rounded-full font-medium transition ${
              !isMetric ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            in
          </button>
        </div>

        <div className="text-5xl font-extrabold text-black mb-6">
          {convertHeight(height)}
          <span className="text-xl font-bold">{isMetric ? 'cm' : 'in'}</span>
        </div>

        <div className="w-full mb-6">
          <input
            type="range"
            min={isMetric ? 140 : 55}
            max={isMetric ? 210 : 83}
            value={isMetric ? height : Math.round(height / 2.54)}
            onChange={(e) =>
              setHeight(isMetric ? Number(e.target.value) : Math.round(Number(e.target.value) * 2.54))
            }
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
            <span>{isMetric ? 140 : 55}</span>
            <span>{isMetric ? 175 : 69}</span>
            <span>{isMetric ? 210 : 83}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Desliza para ajustar</p>
        </div>

        <button
          onClick={() => router.push('/step-12')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg shadow-md transition"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}