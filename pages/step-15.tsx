"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Step15() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-15",
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
            step: "step-15",
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
    {
      id: 1,
      icon: "😍",
      text: "¡Sí, estoy muy interesado!",
    },
    {
      id: 2,
      icon: "🤔",
      text: "Tengo interés, pero tengo algunas dudas.",
    },
  ]

  const handleNext = () => {
    if (selected !== null) {
      router.push("/step-16")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={15} total={25} />
      <div className="w-full max-w-md bg-white border border-green-300 rounded-3xl shadow-xl p-6 text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/step-15-logo.jpg" alt="Logo" className="h-10" />
        </div>

        {/* Pergunta */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
          ¿Te interesaría recibir un protocolo personalizado de desparasitación de 7 días?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Responde con sinceridad.</p>

        {/* Opções de resposta */}
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

        {/* Imagem extra */}
        <div className="my-6">
          <img
            src="/step-15-img.jpg"
            alt="Ilustração"
            className="w-full rounded-xl border border-gray-200 shadow"
          />
        </div>

        {/* Botão continuar */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="mt-4 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}