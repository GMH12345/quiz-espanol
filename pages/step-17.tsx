"use client"

import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation"

export default function Step17() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-17",
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
            step: "step-17",
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
    router.push("/step-18")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ProgressBar step={17} total={25} />
      <div className="w-full max-w-md bg-white border border-green-300 rounded-3xl shadow-lg p-6 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/step-17-logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Título com credibilidade */}
        <h1 className="text-lg font-bold text-gray-900 leading-snug">
          Tu protocolo será desarrollado por la Dra. Emanuelle Fraga, MD, ND – Especialista en Parasitología Funcional y Medicina Integrativa por universidades de los EE.UU.
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Con formación en la National University of Natural Medicine y más de 10 años de experiencia en terapias naturales para la eliminación de parásitos.
        </p>

        {/* Selos */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-300 shadow">
            🇺🇸 Certified in the U.S.
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-300 shadow">
            Medicina Integrativa – USA
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300 shadow">
            Functional Parasitology Expert
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full border border-purple-300 shadow">
            University-Certified (U.S.)
          </span>
        </div>

        {/* Imagem */}
        <div>
          <img
            src="/step-17-img.jpg"
            alt="Dra. Emanuelle"
            className="w-full rounded-md object-cover border border-gray-300 shadow"
          />
        </div>

        {/* Biografia detalhada */}
        <p className="text-sm text-gray-700 text-left mt-4">
          La Dra. Emanuelle Fraga posee un <strong>Máster en Medicina Natural</strong> por la <em>National University of Natural Medicine</em> (Portland, Oregon), y una especialización en <strong>Parasitología Funcional y Trastornos Digestivos Crónicos</strong> por el <em>Institute for Functional Medicine</em> (IFM – Washington, D.C.). <br /><br />
          Ha trabajado con pacientes en más de 12 países, participando de investigaciones clínicas sobre detoxificación mitocondrial en colaboración con el <em>Bastyr Center for Natural Health</em> (Seattle), y ha sido certificada en <strong>Prácticas de Medicina Integrativa Avanzada</strong> por la <em>University of Arizona Center for Integrative Medicine</em>. <br /><br />
          Actualmente lidera programas personalizados de desparasitación en línea, combinando ciencia funcional con terapias naturales avanzadas.
        </p>

        <button
          onClick={handleNext}
          className="mt-8 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}