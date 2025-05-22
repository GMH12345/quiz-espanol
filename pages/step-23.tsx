import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from 'next/router'

export default function Step23() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-23",
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
            step: "step-23",
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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-6 px-4">
      <ProgressBar step={23} total={25} />
      <div className="w-full max-w-md border border-green-300 rounded-3xl shadow-lg p-4 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/step-23-logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Título */}
        <div className="bg-green-100 text-green-800 text-sm font-semibold py-2 rounded mb-4">
          ✅ Protocolo personalizado generado con éxito.
        </div>

        <h2 className="text-lg font-bold text-black mb-4">
          Protocolo de síntomas y riesgos
        </h2>

        {/* Gráficos circulares */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Probabilidad de tener un agente parasitario en el organismo', value: 87, color: 'red-500' },
            { label: 'Riesgo para tu salud', value: 66, color: 'yellow-500' },
            { label: 'Probabilidad de desarrollar enfermedades autoinmunes si no hay tratamiento', value: 72, color: 'yellow-500' },
            { label: 'Probabilidad de éxito en la desparasitación', value: 100, color: 'green-500' },
          ].map((item, index) => {
            const radius = 30
            const circumference = 2 * Math.PI * radius
            const offset = circumference - (item.value / 100) * circumference

            return (
              <div key={index} className="flex flex-col items-center text-center">
                <svg width="80" height="80" className="mb-1">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`text-${item.color} rotate-[-90deg] origin-center`}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-black text-lg font-bold"
                  >
                    {item.value}%
                  </text>
                </svg>
                <p className="text-xs text-black font-medium">{item.label}</p>
              </div>
            )
          })}
        </div>

        {/* Diagnóstico parasitário */}
        <p className="text-sm font-medium mb-1">
          Posible agente parasitario según tus síntomas:
        </p>
        <div className="bg-black text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
          Ascaris lumbricoides
        </div>

        {/* Imagens */}
        <img
          src="/step-23-img-1.jpg"
          alt="Ascaris"
          className="w-full rounded-md object-cover border mb-4"
        />
        <p className="text-sm text-gray-700 mb-3">
          La desparasitación comenzará con un té de cúrcuma y un ingrediente secreto económico que puedes encontrar fácilmente en supermercados.
        </p>
        <img
          src="/step-23-img-2.jpg"
          alt="Cúrcuma"
          className="w-full rounded-md object-cover border mb-6"
        />

        {/* Botão */}
        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-lg transition"
        >
          Acceder al protocolo completo de tratamiento
        </button>
      </div>
    </div>
  )
}