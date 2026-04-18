/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Aggiungi questa riga per creare file statici
  images: {
    unoptimized: true, // Necessario per GitHub Pages
  },
  basePath: '/DriveMotion', // Deve corrispondere al nome della tua repository
};

export default nextConfig;