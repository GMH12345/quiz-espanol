"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation"

export default function Step14() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-14",
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
            step: "step-14",
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

  const handleNext = () => {
    router.push("/step-15")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={14} total={25} />
      <div className="w-full max-w-md bg-white border border-green-300 rounded-3xl shadow-lg p-6 text-center">
        
        {/* Logo opcional */}
        <div className="flex justify-center mb-4">
          <img src="/step-14-logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-900">Haz clic para escuchar</h2>
        <p className="text-sm text-gray-500 mb-4">como si fuera un audio de WhatsApp</p>

        {/* Player de áudio */}
        <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm mb-6">
          <audio controls className="w-full">
            <source src="/step-14-audio.mp3" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        </div>

        {/* Imagem: Homem */}
        <div className="mb-4">
          <img
            src="/step-14-hombre.jpg"
            alt="Hombre escuchando"
            className="w-full rounded-xl border border-gray-200 shadow"
          />
        </div>

        {/* Imagem: Mulher */}
        <div className="mb-6">
          <img
            src="/step-14-mujer.jpg"
            alt="Mujer escuchando"
            className="w-full rounded-xl border border-gray-200 shadow"
          />
        </div>

        {/* Botão continuar */}
        <button
          onClick={handleNext}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}