
import Link from 'next/link';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import ProgressBar from '../components/ProgressBar';

export default function Step3() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-3",
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
            step: "step-3",
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
  return (
    <div className="min-h-screen bg-[#f6fdf7] text-gray-800 px-4 py-6 flex flex-col items-center font-sans">
      <ProgressBar step={3} total={22} />

      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-md mt-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-1">
          Estas son las formas más comunes de infectarse con parásitos. ¿Te has expuesto a alguna de ellas?
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">Por favor, responde con sinceridad.</p>

        <div className="space-y-3">
          {[
            "Consumo de carne roja o pollo",
            "Contacto con perros o gatos que salen a la calle",
            "Consumo de agua sin filtrar",
            "Contacto con arena de la playa o tierra",
            "Consumo de ensaladas o vegetales sin desinfectar",
            "Picaduras de insectos"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm hover:bg-red-50 transition cursor-pointer">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-800">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/step-4">
            <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition">
              ¡Sí, estuve expuesto a al menos una de ellas!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
