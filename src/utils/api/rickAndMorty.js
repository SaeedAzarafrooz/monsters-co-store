// Fetch multiple characters at once using Rick and Morty batch endpoint
export const fetchCharactersByIds = async (ids) => {
  const cleanIds = Array.from(new Set(ids.map((id) => Number(id)).filter(Boolean)));
  if (cleanIds.length === 0) return [];

  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${cleanIds.join(",")}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch characters: ${res.statusText}`);
    }
    const data = await res.json();
    // If only 1 id is passed, API returns an object instead of array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching characters by IDs:", error);
    return [];
  }
};
