"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Step13() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-13",
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
            step: "step-13",
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
    { id: 1, icon: "😠", text: "¡No lo sabía!" },
    { id: 2, icon: "😨", text: "¡Imaginaba que podrían tener efectos secundarios!" },
  ]

  const handleNext = () => {
    if (selected !== null) {
      router.push("/step-14")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      {/* ProgressBar centralizada e em porcentagem */}
      <ProgressBar step={13} total={25} />

      <div className="w-full max-w-xl bg-white border border-green-300 p-6 rounded-3xl shadow-xl text-center">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          ¿Eras consciente de los riesgos de los <br /> medicamentos tradicionales?
        </h1>
        <p className="mt-2 text-sm text-gray-500">Por favor, responde con sinceridad.</p>

        {/* Bloco de notícia simulada */}
        <div className="mt-6 border rounded-xl overflow-hidden">
          <div className="bg-neutral-100 px-4 py-2 text-left font-semibold text-sm border-b text-gray-700">
            📰 Noticia
          </div>
          <div className="p-4 text-left text-sm text-gray-700 leading-relaxed">
            Recientemente, varios informes han destacado los{" "}
            <span className="text-red-600 font-semibold">efectos adversos</span> del uso prolongado
            de medicamentos antiparasitarios tradicionales, incluyendo problemas hepáticos,
            inmunosupresión y reacciones alérgicas graves.
            <br />
            <br />
            Por eso, cada vez más expertos recomiendan métodos naturales como alternativa segura.
          </div>
        </div>

        {/* Botões de escolha */}
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