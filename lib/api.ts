const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMatches() {
  const res = await fetch("https://v3.football.api-sports.io/fixtures?league=71&season=2024", {
    headers: {
      "x-apisports-key": API_KEY!,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data.response;
}