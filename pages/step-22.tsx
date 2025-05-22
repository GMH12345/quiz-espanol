import { useEffect, useState } from "react"


import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router"

export default function Step22() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-22",
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
            step: "step-22",
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="w-full max-w-md bg-white border border-green-300 rounded-3xl shadow-lg p-8 text-center">
        <h1 className="text-xl font-bold text-gray-900">
          Analizando tus síntomas y generando tu protocolo personalizado...
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Por favor, espera unos segundos mientras procesamos tus respuestas.
        </p>

        {loading ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-500 border-solid"></div>
            <span className="text-sm text-gray-500">Cargando...</span>
          </div>
        ) : (
          <div className="mt-10">
            <button
              onClick={() => router.push("/step-23")}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all"
            >
              Ver mi protocolo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
