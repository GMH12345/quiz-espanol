import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Step24() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [videoStarted, setVideoStarted] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (videoStarted) {
      // Insere o script do player da VTurb
      const script = document.createElement("script")
      script.src = "https://scripts.converteai.net/4631aa7e-e33f-4476-a08d-394dbb8b90c6/players/682e340490a56fec06896513/player.js"
      script.async = true
      document.head.appendChild(script)

      const buttonTimer = setTimeout(() => setShowButton(true), 60000) // 60 segundos
      return () => {
        document.head.removeChild(script)
        clearTimeout(buttonTimer)
      }
    }
  }, [videoStarted])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500 border-solid mx-auto mb-4" />
          <h2 className="text-xl font-bold text-black">¡Tu protocolo está listo!</h2>
          <p className="text-sm text-gray-600">Redirigiendo al protocolo completo...</p>
          <p className="text-xs text-gray-400 mt-1">Serás redirigido en 1 segundo</p>
          <p className="text-xs text-blue-500 mt-2 underline cursor-pointer">Si no se redirige automáticamente, haz clic aquí</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl text-center space-y-6">

          {!videoStarted && (
            <button
              onClick={() => setVideoStarted(true)}
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition"
            >
              Por favor, haz clic aquí o mira el video
            </button>
          )}

          {videoStarted && (
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: `
                  <div id="vid_682e340490a56fec06896513" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0;">
                    <img id="thumb_682e340490a56fec06896513" src="https://images.converteai.net/4631aa7e-e33f-4476-a08d-394dbb8b90c6/players/682e340490a56fec06896513/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail">
                    <div id="backdrop_682e340490a56fec06896513" style="-webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%;"></div>
                  </div>
                `,
              }}
            />
          )}

          {showButton && (
            <button
              onClick={() => window.location.href = "https://seulink.com/checkout"}
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition"
            >
              OBTENER MI PROTOCOLO AHORA
            </button>
          )}

          {/* Bônus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-100 border border-green-300 rounded-xl p-4 shadow-lg flex flex-col items-center">
              <p className="text-sm text-green-900 font-semibold">Mi WhatsApp personal para resolver tus dudas</p>
              <span className="text-green-600 text-2xl mb-2">📱</span>
            </div>
            <div className="bg-green-100 border border-green-300 rounded-xl p-4 shadow-lg">
              <p className="text-sm text-green-900 font-semibold">Comunidad de WhatsApp con otros pacientes</p>
              <span className="text-green-600 text-2xl mb-2">💬</span>
            </div>
            <div className="bg-green-100 border border-green-300 rounded-xl p-4 shadow-lg">
              <p className="text-sm text-green-900 font-semibold">Seguimiento profesional personalizado</p>
              <span className="text-green-600 text-2xl mb-2">🧑‍💬</span>
            </div>
          </div>

          {/* Bônus exclusivos */}
          <div className="overflow-hidden rounded-2xl border border-red-300 bg-gradient-to-br from-red-50 to-white shadow-lg">
            <h2 className="bg-red-100 text-red-800 font-bold py-2">🎁 BONOS EXCLUSIVOS DE HOY</h2>
            <table className="w-full text-left text-sm text-red-800">
              <tbody>
                <tr className="border-b border-red-200">
                  <td className="px-4 py-3">✔️ La forma más saludable de lavar tus alimentos</td>
                </tr>
                <tr className="border-b border-red-200">
                  <td className="px-4 py-3">✔️ Cómo identificar parásitos cerebrales peligrosos y eliminarlos</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">✔️ Ejercicios de yoga para relajar el intestino</td>
                </tr>
              </tbody>
            </table>
          </div>

          <img src="/step-24-img-2.jpg" alt="Evolución" className="rounded-xl w-full object-cover mt-4" />

          <div className="bg-black text-white text-left p-4 rounded-xl">
            <p className="text-sm">
              Buenos días, quiero dejar aquí mi testimonio sobre cómo el protocolo "Desparasítate" me ayudó...
              <br />
              (testimonio abreviado)
            </p>
          </div>

          <img src="/step-24-img-3.jpg" alt="Antes y después" className="rounded-xl w-full object-cover mt-4" />

          <div className="flex justify-center mt-6">
            <img src="/garantia-7-dias.png" alt="Garantía de 7 días" className="h-24" />
          </div>
        </div>
      )}
    </div>
  )
}
