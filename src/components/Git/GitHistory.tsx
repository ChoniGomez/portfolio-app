"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, Theme } from "ag-grid-community";
import { themeQuartz, colorSchemeDarkBlue } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface Commit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
}

interface ICellRendererParams {
  data: Commit;
  value: string;
}

const customTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  headerFontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  cellFontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
});

export const MOCK_COMMITS: Commit[] = [
  {
    sha: "e8f31a4c9b27d10e82f5341a7c06b98e145f8a23",
    commit: {
      author: {
        name: "Jonathan Gomez",
        date: "2026-10-24T17:30:00Z",
      },
      message: "feat: script de YOLO para detección planetaria",
    },
    html_url: "https://github.com/chonigomez",
  },
  {
    sha: "b4c29d10e82f5341a7c06b98e145f8a23e8f31a4",
    commit: {
      author: {
        name: "Jonathan Gomez",
        date: "2026-10-19T14:15:00Z",
      },
      message: "fix: endpoint de WhatsApp en QueRico con Fastify",
    },
    html_url: "https://github.com/chonigomez",
  },
  {
    sha: "5341a7c06b98e145f8a23e8f31a4c9b27d10e82f",
    commit: {
      author: {
        name: "Jonathan Gomez",
        date: "2026-10-14T10:45:00Z",
      },
      message: "feat: inicializar CultiShop con Next.js",
    },
    html_url: "https://github.com/chonigomez",
  },
  {
    sha: "c98e145f8a23e8f31a4c9b27d10e82f5341a7c06",
    commit: {
      author: {
        name: "Jonathan Gomez",
        date: "2026-10-06T16:20:00Z",
      },
      message: "feat: control de acceso RFID con Arduino",
    },
    html_url: "https://github.com/chonigomez",
  },
  {
    sha: "7c06b98e145f8a23e8f31a4c9b27d10e82f5341a",
    commit: {
      author: {
        name: "Jonathan Gomez",
        date: "2026-09-28T11:10:00Z",
      },
      message: "refactor: optimización de consultas PostgreSQL en backend",
    },
    html_url: "https://github.com/chonigomez",
  },
];

interface GitHistoryProps {
  initialCommits?: Commit[];
}

export function GitHistory({ initialCommits }: GitHistoryProps) {
  const hasValidUserCommits =
    initialCommits &&
    initialCommits.length > 0 &&
    !initialCommits.some((c) =>
      c.commit?.author?.name?.toLowerCase().includes("carter"),
    );

  const rowData = hasValidUserCommits ? initialCommits : MOCK_COMMITS;

  const columnDefs = useMemo<ColDef<Commit>[]>(
    () => [
      {
        field: "sha",
        headerName: "Commit Hash",
        width: 100,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <a
              href={params.data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              {params.value.substring(0, 7)}
            </a>
          );
        },
      },
      {
        field: "commit.author.name",
        headerName: "Author",
        width: 150,
      },
      {
        field: "commit.message",
        headerName: "Message",
        flex: 1,
      },
      {
        field: "commit.author.date",
        headerName: "Date",
        width: 200,
        cellRenderer: (params: ICellRendererParams) => {
          return new Date(params.value).toLocaleDateString();
        },
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
    }),
    [],
  );

  const theme = useMemo<Theme>(() => customTheme, []);

  return (
    <div className="ag-theme-alpine-dark h-[600px] w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        theme={theme}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
}
