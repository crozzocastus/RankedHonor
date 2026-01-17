import { Users, Trophy, Crown, Medal, Award } from "lucide-react";

const activePlayers = [
  { nickname: "WarLegend", mode: "Duelo 1v1", region: "EU" },
  { nickname: "IronFist", mode: "Briga 2v2", region: "NA" },
  { nickname: "ShadowBlade", mode: "Domínio 4v4", region: "SA" },
  { nickname: "DragonHeart", mode: "Duelo 1v1", region: "EU" },
  { nickname: "StormBreaker", mode: "Domínio 4v4", region: "ASIA" },
];

const topPlayers = [
  { rank: 1, name: "WarLegend", mmr: 3845, trend: "up" },
  { rank: 2, name: "IronFist", mmr: 3721, trend: "up" },
  { rank: 3, name: "ShadowBlade", mmr: 3654, trend: "down" },
  { rank: 4, name: "DragonHeart", mmr: 3589, trend: "up" },
  { rank: 5, name: "StormBreaker", mmr: 3512, trend: "up" },
];

const topTeams = [
  { rank: 1, name: "Valhalla Warriors", points: 12450 },
  { rank: 2, name: "Knights Templar", points: 11823 },
  { rank: 3, name: "Samurai Legion", points: 11567 },
  { rank: 4, name: "Viking Raiders", points: 10992 },
  { rank: 5, name: "Shadow Assassins", points: 10345 },
];

const rankIcons = [Crown, Medal, Award, Trophy, Trophy];

export function Sidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Active Players */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-orange-500" />
            Jogadores Ativos
          </h3>
          <div className="rounded-full bg-green-500/20 px-3 py-1 text-green-500">12,847</div>
        </div>

        <div className="space-y-3">
          {activePlayers.map((player, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <div>
                  <div className="text-white">{player.nickname}</div>
                  <div className="text-gray-500">{player.mode}</div>
                </div>
              </div>
              <div className="text-gray-500">{player.region}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Individual */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-white">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top 5 Individual
          </h3>
          <select className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-300">
            <option>Todas</option>
            <option>Duelo 1v1</option>
            <option>Briga 2v2</option>
            <option>Domínio 4v4</option>
          </select>
        </div>

        <div className="space-y-2">
          {topPlayers.map((player) => {
            const Icon = rankIcons[player.rank - 1];
            return (
              <div
                key={player.rank}
                className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3 transition-colors hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 ${
                      player.rank === 1
                        ? "text-yellow-500"
                        : player.rank === 2
                          ? "text-gray-400"
                          : player.rank === 3
                            ? "text-orange-700"
                            : "text-gray-600"
                    }`}
                  />
                  <div>
                    <div className="text-white">{player.name}</div>
                    <div className="text-gray-500">{player.mmr} MMR</div>
                  </div>
                </div>
                <div
                  className={`text-sm ${player.trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {player.trend === "up" ? "▲" : "▼"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Teams */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-blue-500" />
            Top 5 Equipes
          </h3>
        </div>

        <div className="space-y-2">
          {topTeams.map((team) => {
            const Icon = rankIcons[team.rank - 1];
            return (
              <div
                key={team.rank}
                className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3 transition-colors hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 ${
                      team.rank === 1
                        ? "text-yellow-500"
                        : team.rank === 2
                          ? "text-gray-400"
                          : team.rank === 3
                            ? "text-orange-700"
                            : "text-gray-600"
                    }`}
                  />
                  <div>
                    <div className="text-white">{team.name}</div>
                    <div className="text-gray-500">{team.points.toLocaleString("en-US")} pts</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
