"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation"

export default function Step21() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-21",
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
            step: "step-21",
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
    router.push("/step-22")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-start px-4 py-10">
      <ProgressBar step={21} total={25} />
      <div className="w-full max-w-md border border-green-300 bg-white rounded-3xl shadow-lg p-6 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-3">
          <img src="/step-21-logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-900">
          Testimonios reales de personas que siguieron el protocolo
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Escucha los resultados reales de quienes confiaron en el tratamiento
        </p>

        {/* Player de áudio */}
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow mb-6">
          <audio controls className="w-full">
            <source src="/step-21-audio.mp3" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        </div>

        {/* Imagem 1 */}
        <div className="mb-4">
          <img
            src="/step-21-img-1.jpg"
            alt="Testimonio 1"
            className="w-full rounded-xl border border-gray-300 shadow"
          />
        </div>

        {/* Imagem 2 */}
        <div className="mb-4">
          <img
            src="/step-21-img-2.jpg"
            alt="Testimonio 2"
            className="w-full rounded-xl border border-gray-300 shadow"
          />
        </div>

        {/* Imagem 3 */}
        <div className="mb-6">
          <img
            src="/step-21-img-3.jpg"
            alt="Testimonio 3"
            className="w-full rounded-xl border border-gray-300 shadow"
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