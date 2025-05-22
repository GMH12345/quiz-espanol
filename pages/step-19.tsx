"use client"

import ProgressBar from '../components/ProgressBar'

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Step19() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-19",
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
            step: "step-19",
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
  const [selected, setSelected] = useState<number | null>(null)

  const options = [
    { id: 1, icon: "😊", text: "Estoy de acuerdo" },
    { id: 2, icon: "🙁", text: "No estoy de acuerdo" },
  ]

  const handleNext = () => {
    if (selected !== null) {
      router.push('/step-20')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={19} total={25} />
      <div className="w-full max-w-md bg-white border border-green-300 rounded-3xl shadow-lg p-6 text-center">
        <img
          src="/step-19-logo.png"
          alt="Logo"
          className="w-14 h-14 mx-auto mb-4"
        />
        <h1 className="text-xl font-bold text-gray-900 leading-snug mb-4">
          ¿También crees que nuestra salud es el bien más preciado que <span className="text-green-600">Dios nos dio</span>?
        </h1>

        <div className="flex flex-col gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-left border text-gray-800 transition-all duration-200 ${
                selected === option.id
                  ? "bg-green-200 border-green-600"
                  : "bg-gray-50 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-sm font-medium">{option.text}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className="mt-8 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
