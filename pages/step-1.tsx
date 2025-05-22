import ProgressBar from '../components/ProgressBar';

import { useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Step1() {

  useEffect(() => {
    const startTime = Date.now();

    const logEntry = async () => {
      try {
        await addDoc(collection(db, "stepTracking"), {
          step: "step-1",
          enteredAt: Timestamp.fromDate(new Date()),
        });
      } catch (e) {
        console.error("Erro ao registrar entrada:", e);
      }
    };

    const logExit = async () => {
      try {
        const endTime = Date.now();
        const timeSpent = (endTime - startTime) / 1000;
        await addDoc(collection(db, "stepTracking"), {
          step: "step-1",
          exitedAt: Timestamp.fromDate(new Date()),
          timeSpentSeconds: timeSpent,
        });
      } catch (e) {
        console.error("Erro ao registrar saída:", e);
      }
    };

    logEntry();

    window.addEventListener("beforeunload", logExit);
    window.addEventListener("pagehide", logExit);

    return () => {
      window.removeEventListener("beforeunload", logExit);
      window.removeEventListener("pagehide", logExit);
    };
  }, []);

  const testimonials = [
    { name: "Camila, 29", text: "¡Me sentí mejor en solo 10 días!", avatar: "/avatars/avatar-1.jpg" },
    { name: "Rodrigo, 41", text: "¡Me siento como otra persona!", avatar: "/avatars/avatar-2.jpg" },
    { name: "Ana, 32", text: "¡Mi digestión volvió a la normalidad!", avatar: "/avatars/avatar-3.jpg" },
    { name: "Marcos, 37", text: "¡Noté un cambio en mi piel!", avatar: "/avatars/avatar-4.jpg" },
    { name: "Juliana, 45", text: "¡Sentí más energía!", avatar: "/avatars/avatar-5.jpg" },
    { name: "Diego, 28", text: "¡Lo recomiendo mucho!", avatar: "/avatars/avatar-6.jpg" }
  ];

  return (
    <div className="min-h-screen bg-[#f6fdf7] flex flex-col items-center px-4 py-8">
      <ProgressBar step={1} total={22} />

      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-xl shadow-sm text-sm font-medium mb-4 text-center max-w-xl">
        Esta evaluación gratuita solo está disponible hoy para nuevos visitantes.
      </div>

      <div className="w-full max-w-xl mt-1 overflow-hidden rounded-3xl shadow-lg">
        <img
          src="/dra-manu-banner.png"
          alt="Dra. Manu"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl mt-6 max-w-xl w-full p-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700 mb-2">
          ¿Sientes alguno de estos síntomas?
        </h1>
        <p className="text-center text-gray-500 mb-6">Por favor, responde con sinceridad</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            ['💡', 'Dolores de cabeza'],
            ['💨', 'Distensão abdominal e gases'],
            ['🧑‍🦲', 'Queda de cabelo'],
            ['🌿', 'Urticaria'],
            ['🦷', 'Bruxismo'],
            ['🌙', 'Insomnio'],
            ['🩸', 'Anemia (falta de hierro)'],
            ['⚡', 'Ansiedad excesiva'],
            ['👂', 'Picazón en el oído'],
            ['👁️', 'Ojeras'],
            ['😩', 'Fatiga crónica'],
            ['🦴', 'Dolores articulares'],
            ['🧴', 'Problemas en la piel'],
            ['🚽', 'Estreñimiento'],
            ['🦋', 'Inflamación de la tiroides (Hashimoto)'],
            ['🍬', 'Vontade excessiva de doce'],
          ].map(([icon, label], idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 bg-green-50 text-green-900 font-medium px-4 py-3 rounded-xl border border-green-100 shadow-sm hover:bg-green-100 transition cursor-pointer"
            >
              <input type="checkbox" className="accent-green-600 scale-125" />
              <span className="flex items-center gap-2">
                <span className="text-lg">{icon}</span> {label}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <a href="/step-2">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transition">
              ¡Sí, tengo al menos 2 de ellos!
            </button>
          </a>
          <p className="text-xs text-center text-gray-400 mt-2">🔒 Tus datos están protegidos. Ninguna información será compartida.</p>
        </div>
      </div>

      <div className="mt-10 max-w-xl w-full px-2">
        <h2 className="text-center font-semibold text-gray-700 text-sm mb-3">Más de 12.000 personas ya lo han probado</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col items-center text-center text-xs text-gray-600">
              <img src={t.avatar} alt={t.name} className="rounded-full w-10 h-10 object-cover mb-1" />
              <div className="text-yellow-500 text-xs">★★★★★</div>
              <div className="font-medium">{t.name}</div>
              <div className="italic text-[11px]">{t.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 mb-4">
        <p className="text-xs text-gray-400 text-center">✔️ Protocolo probado y aprobado por miles de personas en América Latina</p>
      </div>
    </div>
  );
}
