// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import FavoriteButton from "../components/common/FavoriteButton";


const profiles = [
  {
    name: "DEVARLO RAHADYAN RAZAN",
    nim: "21120123140132",
    img: "/devarlo.jpg",
  },
  {
    name: "RIFAT GIBRAN WIDIYANTO",
    nim: "21120123140179",
    img: "/gibran.jpg",
  },
  {
    name: "IZAC LUTHFI PRANOWO",
    nim: "21120123120010",
    img: "/izac.jpg",
  },
  {
    name: "FARREL RAZAAN RABBANI",
    nim: "21120123140108",
    img: "/farel.jpg",
  },
];

export default function ProfilePage() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Ambil data favorit dari localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteIds(storedFavorites);
  }, []);

  // Handler ketika user toggle favorit
  const handleToggleFavorite = (nim, isFavorited) => {
    setFavoriteIds((prev) =>
      isFavorited ? [...prev, nim] : prev.filter((id) => id !== nim)
    );
  };

  // Filter profil favorit
  const favoriteProfiles = profiles.filter((p) => favoriteIds.includes(p.nim));

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Profil Anggota
        </h1>

        {/* Bagian Favorit */}
        {favoriteProfiles.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              ❤️ Profil Favorit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProfiles.map((profile) => (
                <div
                  key={profile.nim}
                  className="rounded-2xl shadow-md bg-white p-6 flex flex-col items-center"
                >
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-yellow-300 mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 text-center">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-gray-500">{profile.nim}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Semua Profil */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Semua Anggota
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.nim}
              className="rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-white p-6 flex flex-col items-center relative"
            >
              <div className="absolute top-4 right-4">
                <FavoriteButton
                  recipeId={profile.nim}
                  onToggle={handleToggleFavorite}
                  size="sm"
                />
              </div>
              <img
                src={profile.img}
                alt={profile.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-yellow-300 mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-500">{profile.nim}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
