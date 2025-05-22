"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Step18() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-18",
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
            step: "step-18",
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
    { id: 1, icon: "🙂", text: "Sí, estoy totalmente de acuerdo" },
    { id: 2, icon: "😊", text: "Estoy seguro de que mi ‘yo’ del futuro me lo agradecerá" },
    { id: 3, icon: "😐", text: "No estoy de acuerdo" },
  ]

  const handleNext = () => {
    if (selected !== null) {
      router.push("/step-19")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={18} total={25} />
      <div className="w-full max-w-md bg-white border border-green-300 rounded-3xl shadow-lg p-6 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/step-18-logo.png" alt="Logo" className="h-10" />
        </div>

        <h1 className="text-xl font-bold text-gray-900 leading-snug">
          ¿Estás de acuerdo en que una decisión pequeña hoy puede transformar completamente tu futuro?
        </h1>
        <p className="text-sm text-gray-500 mt-2">Piensa en cómo te sentirás dentro de 7 días.</p>

        <div className="mt-6 flex flex-col gap-4">
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