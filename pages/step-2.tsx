
import Link from 'next/link';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import ProgressBar from '../components/ProgressBar';

export default function Step2() {

  useEffect(() => {
    const startTime = Date.now();
    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-2",
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
            step: "step-2",
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
      <ProgressBar step={2} total={22} />

      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-md mt-6">
        <header className="flex justify-between items-center border-b pb-2 mb-4">
          <div className="text-xl font-bold text-[#227a56]">CDC<span className="text-gray-600">.gov</span></div>
          <div className="cursor-pointer text-gray-400 text-2xl">☰</div>
        </header>

        <div className="text-sm text-[#6b7280] mb-1 uppercase">Enfermedades infecciosas &gt; Más enfermedades</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Parásitos: una amenaza silenciosa para tu salud</h1>

        <div className="bg-green-100 text-green-900 p-3 rounded-md font-semibold mb-4">
          La prevalencia de infecciones parasitarias en países hispanohablantes alcanza el <span className="underline">45%</span>. En Brasil, la prevalencia también es cercana al <span className="underline">45%</span>, siendo la región Norte la más afectada con un <span className="underline">58%</span>. Datos publicados en la Revista de Medicina Tropical.
        </div>

        <div className="text-sm mb-4 text-gray-600">
          Por <span className="text-blue-700 underline cursor-pointer">Equipo de CDC</span> | Actualizado en mayo de 2024<br/>
          ✔️ Revisión médica por <span className="text-blue-700 underline cursor-pointer">Dr. Miguel Rodríguez</span><br/>
          ✔️ Verificación de datos por Ana Gómez
        </div>

        
        <ul className="list-disc pl-5 space-y-2 mb-6 text-[15px]">
          <li>Las infecciones parasitarias pueden pasar desapercibidas durante años.</li>
          <li>Consideradas enfermedades tropicales desatendidas, afectan a <span className="bg-green-100 font-semibold">1 de cada 4 personas</span> (24% da população global)</li>
          <li>Muchas personas conviven con parásitos sin presentar síntomas visibles.</li>
          <li>La detección temprana puede evitar complicaciones graves en el sistema digestivo e inmunológico.</li>
        </ul>

        <div className="flex justify-center mt-8">
          <Link href="/step-3">
            <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition">
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}