"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface LanguageData {
  name: string;
  percent: number;
  color: string;
  breakdown?: LanguageData[]; // For storing languages under 1%
}

export default function LanguagesChart({ data }: { data: LanguageData[] }) {
  // Separate languages into main and small percentages
  const mainLanguages: LanguageData[] = [];
  const smallLanguages: LanguageData[] = [];

  data.forEach((lang) => {
    if (lang.name === "Other" || lang.percent >= 1) {
      mainLanguages.push(lang);
    } else {
      smallLanguages.push(lang);
    }
  });

  // Find the "Other" category and add small languages to it
  const processedData = mainLanguages.map((lang) => {
    if (lang.name === "Other") {
      return {
        ...lang,
        percent:
          lang.percent +
          smallLanguages.reduce((sum, small) => sum + small.percent, 0),
        breakdown: smallLanguages.sort((a, b) => b.percent - a.percent),
      };
    }
    return lang;
  });

  // Sort by percentage in descending order
  const sortedData = processedData.sort((a, b) => b.percent - a.percent);

  return (
    <div className="flex h-full min-h-[360px] w-full flex-col items-center justify-center rounded-lg bg-gray-800 p-4">
      <h2 className="mb-4 text-center text-lg font-medium text-gray-200">
        Lenguajes Utilizados (Últimos 30 Días)
      </h2>
      <div className="flex h-[calc(100%-2rem)] w-full max-w-full items-center justify-center overflow-hidden">
        <div className="flex h-full w-full max-w-full origin-center items-center justify-center scale-90 sm:scale-95">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 15, right: 30, bottom: 15, left: 30 }}>
              <Pie
                data={sortedData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="percent"
                nameKey="name"
                label={({ name, percent }) => `${name} (${percent.toFixed(1)}%)`}
                labelLine={true}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#E5E7EB",
                whiteSpace: "pre-line",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              labelStyle={{ color: "#E5E7EB" }}
              formatter={(
                value: number,
                name: string,
                entry: Payload<number, string>,
              ) => {
                if (name === "Other" && entry.payload.breakdown) {
                  const breakdownText = entry.payload.breakdown
                    .map(
                      (lang: LanguageData) =>
                        `${lang.name}: ${lang.percent.toFixed(1)}%`,
                    )
                    .join("\n");
                  return [
                    `${value.toFixed(1)}%\n\nDesglose de lenguajes menores al 1%:\n${breakdownText}`,
                    "Otros",
                  ];
                }
                return [`${value.toFixed(1)}%`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
