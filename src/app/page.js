'use client'
import MatrixEffect from "@/components/MatrixBackground";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://m.media-amazon.com/images/I/611u25rPQLL._UF1000,1000_QL80_.jpg')",
        }}
      />

      
      <MatrixEffect 
        className="absolute inset-0"
        style={{ 
          zIndex: 1,
          opacity: 0.4 
        }}
      />

      
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 2 }} />

      <div className="relative text-center pt-16" style={{ zIndex: 10 }}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-400 tracking-tight mb-16 font-sans select-none">
          Choose Your Mentor
        </h1>

        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 mt-32 justify-items-center">
            <div className="flex flex-col items-center space-y-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-red-800 shadow-lg">
                <Link href='/chat/piyush'>
                <img
                  src="https://pbs.twimg.com/profile_images/1879075502356586496/V9wQzW7V_400x400.jpg"
                  alt="Tech Mentor"
                  className="w-full h-full object-cover"
                  
                />
                </Link>
              </div>  
            </div>

            <div className="flex flex-col items-center space-y-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-800 shadow-lg">
                <Link href='/chat/hitesh'>
                <img
                  src="https://yt3.googleusercontent.com/arHIKjc6JTqF_b4QJKPHhQC_Jr8q0XfI7LEpJ0-VuiI0ZRz9xFNz94TWl4CLOcozLx-iAhV_=s900-c-k-c0x00ffffff-no-rj"
                  alt="Creative Mentor"
                  className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}