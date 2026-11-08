"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, Theme } from "ag-grid-community";
import { themeQuartz, colorSchemeDarkBlue } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface GitCommitRow {
  sha: string;
  authorName: string;
  message: string;
  date: string;
  commitUrl: string;
  repoName: string;
  // Campos de compatibilidad con estructuras previas
  commit?: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  html_url?: string;
}

export type Commit = GitCommitRow;

interface ICellRendererParams {
  data: GitCommitRow;
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

interface GitHistoryProps {
  initialCommits?: GitCommitRow[];
}

export function GitHistory({ initialCommits }: GitHistoryProps) {
  const [commits, setCommits] = useState<GitCommitRow[]>(initialCommits || []);
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialCommits || initialCommits.length === 0,
  );
  const [error, setError] = useState<string | null>(null);

  const fetchPublicEvents = useCallback(async () => {
    try {
      if (!initialCommits || initialCommits.length === 0) {
        setIsLoading(true);
      }
      setError(null);

      const response = await fetch("/api/github");

      if (!response.ok) {
        throw new Error(
          `Error en API de GitHub: ${response.status} (${response.statusText || "No se pudo consultar"})`,
        );
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setCommits(data);
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      if (!initialCommits || initialCommits.length === 0) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cargar la actividad reciente de GitHub",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [initialCommits]);

  useEffect(() => {
    fetchPublicEvents();
  }, [fetchPublicEvents]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const columnDefs = useMemo<ColDef<GitCommitRow>[]>(
    () => [
      {
        field: "sha",
        headerName: "Hash de Commit",
        width: 140,
        cellRenderer: (params: ICellRendererParams) => {
          const commitHash = params.data?.sha;
          const commitUrl = params.data?.commitUrl;

          return (
            <a
              href={commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-blue-400 hover:text-blue-300 hover:underline"
            >
              {commitHash ? commitHash.substring(0, 7) : "commit"}
            </a>
          );
        },
      },
      {
        field: "authorName",
        headerName: "Autor",
        width: 170,
        valueGetter: (params) =>
          params.data?.authorName ||
          params.data?.commit?.author?.name ||
          "Jonathan Gomez",
      },
      {
        field: "message",
        headerName: "Mensaje",
        flex: 1,
        valueGetter: (params) =>
          params.data?.message || params.data?.commit?.message || "",
        cellRenderer: (params: ICellRendererParams) => {
          const commitUrl = params.data?.commitUrl;
          return commitUrl ? (
            <a
              href={commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white hover:underline transition-colors"
            >
              {params.value}
            </a>
          ) : (
            <span>{params.value}</span>
          );
        },
      },
      {
        field: "date",
        headerName: "Fecha",
        width: 190,
        valueGetter: (params) =>
          params.data?.date || params.data?.commit?.author?.date || "",
        cellRenderer: (params: ICellRendererParams) => {
          return formatDate(params.value);
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

  // Estado de carga (Loading State)
  if (isLoading) {
    return (
      <div className="flex min-h-[350px] w-full flex-col items-center justify-center space-y-4 rounded-xl border border-gray-800 bg-gray-900/50 p-12">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="font-mono text-sm text-gray-400">
          Cargando commits recientes desde la API de GitHub...
        </p>
      </div>
    );
  }

  // Estado de error básico (Error State)
  if (error && commits.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-3 rounded-xl border border-red-900/50 bg-red-950/20 p-8 text-center">
        <p className="font-medium text-red-400">
          Ocurrió un error al cargar la actividad reciente de GitHub
        </p>
        <p className="font-mono text-xs text-red-300/80">{error}</p>
        <button
          onClick={() => fetchPublicEvents()}
          className="mt-2 rounded-md border border-red-700/50 bg-red-900/40 px-4 py-1.5 text-xs text-red-200 transition-colors hover:bg-red-800/60"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Estado sin commits recientes
  if (commits.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-3 rounded-xl border border-gray-800 bg-gray-900/40 p-8 text-center">
        <p className="font-medium text-gray-300">
          No se encontraron eventos de Push recientes en GitHub.
        </p>
        <a
          href="https://github.com/ChoniGomez"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-blue-400 hover:underline"
        >
          Ver perfil en GitHub &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className="ag-theme-alpine-dark h-[600px] w-full">
      <AgGridReact
        rowData={commits}
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

export default GitHistory;
