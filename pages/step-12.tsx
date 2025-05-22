"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Step12() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-12",
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
            step: "step-12",
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
      icon: "😠",
      text: "Sí, entendí que la Desparasitación Natural es mucho más eficaz",
    },
    {
      id: 2,
      icon: "😨",
      text: "No me importa ese tema",
    },
  ]

  const handleNext = () => {
    if (selected !== null) {
      router.push("/step-13")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={12} total={25} />
      <div className="w-full max-w-2xl bg-white border border-green-300 p-6 rounded-3xl shadow-xl text-center">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          ¿Sabes la diferencia entre la <span className="text-green-600">Desparasitación Natural</span> y los métodos tradicionales?
        </h1>
        <p className="mt-2 text-sm text-gray-500">Por favor, responde con sinceridad.</p>

        {/* Tabela comparativa */}
        <div className="grid grid-cols-2 gap-4 my-8 text-sm text-left">
          <div className="bg-green-100 rounded-xl p-4 border border-green-300">
            <h2 className="font-bold text-green-700 mb-2">Desparasitación Natural</h2>
            <ul className="list-disc pl-4 text-gray-700">
              <li>No utiliza fármacos sintéticos</li>
              <li>Menos efectos secundarios</li>
              <li>Refuerza el sistema inmunológico</li>
            </ul>
          </div>
          <div className="bg-red-100 rounded-xl p-4 border border-red-300">
            <h2 className="font-bold text-red-700 mb-2">Métodos Tradicionales</h2>
            <ul className="list-disc pl-4 text-gray-700">
              <li>Uso de medicamentos fuertes</li>
              <li>Posibles reacciones adversas</li>
              <li>Enfoque solo en síntomas</li>
            </ul>
          </div>
        </div>

        {/* Botões de escolha */}
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