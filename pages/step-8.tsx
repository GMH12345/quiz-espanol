"use client"
import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Step8() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-8",
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
            step: "step-8",
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
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (selected) {
      router.push("/step-9");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fdf7] flex flex-col items-center px-4 py-8 font-sans text-gray-800">
      <ProgressBar step={8} total={25} />

      <div className="bg-white rounded-3xl shadow-xl mt-6 max-w-xl w-full p-6 border border-green-500 text-center">
        <h1 className="text-xl sm:text-2xl font-bold leading-snug mb-4">
          ¿Estás de acuerdo conmigo en que muchas veces el deseo de comer dulces se debe a un cuerpo inflamado por parásitos intestinales?
        </h1>

        <p className="text-sm text-gray-500 mb-6">Por favor, responde con sinceridad. ¡Quiero ayudarte!</p>

        <div className="space-y-4 mb-6">
          <div
            onClick={() => setSelected("sim")}
            className={`flex items-center justify-start px-4 py-3 rounded-lg shadow-sm cursor-pointer border transition text-left ${
              selected === "sim" ? 'bg-green-50 border-green-500' : 'bg-white border-gray-300'
            }`}
          >
            <span className="text-2xl mr-3">😀</span>
            <span className="text-sm font-medium">¡Estoy totalmente de acuerdo!</span>
          </div>

          <div
            onClick={() => setSelected("parcial")}
            className={`flex items-center justify-start px-4 py-3 rounded-lg shadow-sm cursor-pointer border transition text-left ${
              selected === "parcial" ? 'bg-green-50 border-green-500' : 'bg-white border-gray-300'
            }`}
          >
            <span className="text-2xl mr-3">🙂</span>
            <span className="text-sm font-medium">Estoy parcialmente de acuerdo</span>
          </div>

          <div
            onClick={() => setSelected("nao")}
            className={`flex items-center justify-start px-4 py-3 rounded-lg shadow-sm cursor-pointer border transition text-left ${
              selected === "nao" ? 'bg-green-50 border-green-500' : 'bg-white border-gray-300'
            }`}
          >
            <span className="text-2xl mr-3">😐</span>
            <span className="text-sm font-medium">No estoy de acuerdo</span>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}