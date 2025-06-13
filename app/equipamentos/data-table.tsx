"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUpRight,
  MessageSquareText,
  Minus,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import DetalhesEquipamentoModal from "./modal/detalhes-equipamento-modal";
import EditarEquipamentoModal from "./modal/editar-equipamento-modal";
import ExcluirEquipamentoModal from "./modal/excluir-equipamento-modal";
import NovoModal from "./modal/novo-equipamento-modal";

export function DataTable({ data, pocMap, urlMap }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const customGlobalFilter: FilterFn = (row, columnId, filterValue) => {
    const searchValue = filterValue.toLowerCase();

    // Normaliza texto removendo acentos e transformando em minúsculas para comparação
    const normalizeText = (text) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "");

    return (
      row.original.model?.toLowerCase().includes(searchValue) ||
      row.original.type?.toLowerCase().includes(searchValue) ||
      row.original.serial_number?.toLowerCase().includes(searchValue) ||
      row.original.mac?.toLowerCase().includes(searchValue) ||
      row.original.hardware_version?.toLowerCase().includes(searchValue) ||
      row.original.status?.toLowerCase().includes(searchValue) ||
      row.original.notas?.toLowerCase().includes(searchValue) ||
      normalizeText(row.original.projeto_id?.empresa ?? "").includes(
        normalizeText(searchValue)
      ) ||
      normalizeText(row.original.projeto_id?.projeto ?? "").includes(
        normalizeText(searchValue)
      )
    );
  };

  const columns: ColumnDef[] = [
    {
      accessorKey: "model",
      header: "Modelo",
      cell: ({ row }) => {
        const equipamento = row.original;
        return (
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={equipamento.pagina ?? ""}
          >
            <span className="flex items-center gap-1 font-semibold hover:underline">
              {row.getValue("model")}{" "}
              {equipamento.pagina && (
                <ArrowUpRight className="h-3 w-3 text-neutral-400" />
              )}
              {equipamento.notas != "" && (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <MessageSquareText
                        className="text-neutral-400"
                        size={12}
                      />
                    </TooltipTrigger>
                    <TooltipContent>{equipamento.notas}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </span>
          </Link>
        );
      },
    },

    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipo
            <ArrowUpDown className="ml-2 h-3 w-3 text-primary" />
          </Button>
        );
      },
      cell: ({ row }) => <span>{row.getValue("type")}</span>,
    },

    {
      accessorKey: "serial_number",
      header: "SN",
    },

    {
      acessorKey: "pocs",
      accessorFn: (row) => ({
        id: row.projeto_id?.id,
        empresa: row.projeto_id?.empresa ?? "",
      }),
      id: "projeto_id_empresa",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Projeto
            <ArrowUpDown className="ml-2 h-3 w-3 text-primary" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const poc = row.original.projeto_id;

        return (
          <>
            {poc?.id ? (
              <div className="flex items-center">
                <span
                  className={(() => {
                    const circleClasses = {
                      poc: "bg-blue-400",
                      locação: "bg-orange-400",
                    };
                    return `inline-block w-2 h-2 rounded-full mr-1 ${
                      circleClasses[poc?.projeto]
                    }`;
                  })()}
                ></span>
                <span className="capitalize">{poc?.projeto}</span>
              </div>
            ) : (
              <span className="text-neutral-300">
                <Minus />
              </span>
            )}
          </>
        );
      },
    },

    {
      acessorKey: "pocs",
      accessorFn: (row) => ({
        id: row.projeto_id?.id,
        empresa: row.projeto_id?.empresa ?? "",
      }),
      id: "projeto_id_empresa",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Empresa
            <ArrowUpDown className="ml-2 h-3 w-3 text-primary" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const poc = row.original.projeto_id;

        const normalizeText = (text) =>
          text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "");

        return (
          <Link
            className="hover:underline"
            href={`/home/${poc?.id ?? ""}/${normalizeText(poc?.empresa ?? "")}`}
          >
            {poc?.id ? (
              poc?.empresa
            ) : (
              <span className="text-neutral-300">
                <Minus />
              </span>
            )}
          </Link>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-3 w-3 text-primary" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center">
          <span
            className={(() => {
              const circleClasses = {
                Estoque: "bg-emerald-400",
                "Em Uso": "bg-red-400",
                RMA: "bg-amber-400",
                Vendido: "bg-zinc-400",
                Arquivado: "bg-neutral-600",
              };

              return `inline-block w-2 h-2 rounded-full mr-1 ${
                circleClasses[row.getValue("status")]
              }`;
            })()}
          ></span>
          <span
            className={(() => {
              const textClasses = {
                Estoque: "text-emerald-500 hover:text-emerald-600 capitalize",
                "Em Uso": "text-red-500 hover:text-red-600 capitalize",
                RMA: "text-blue-500 hover:text-blue-600 capitalize",
                Vendido: "text-zinc-500 hover:text-zinc-600 capitalize",
                Arquivado: "text-neutral-500 hover:text-neutral-600 capitalize",
              };

              return [row.getValue("status")];
            })()}
          >
            {row.getValue("status")}
          </span>
        </div>
      ),
    },

    {
      id: "actions",
      header: "Ações",
      enableHiding: false,
      cell: ({ row }) => {
        const equipamento = row.original;
        return (
          <div className="gap-2 flex">
            <DetalhesEquipamentoModal
              itemId={equipamento.id}
              itemModelo={equipamento.model}
              itemNumSerial={equipamento.serial_number}
              itemMac={equipamento.mac}
              itemVersaoHardware={equipamento.hardware_version}
              itemTipoEquipamento={equipamento.type}
              itemStatus={equipamento.status}
              itemPagina={equipamento.pagina}
              itemNotas={equipamento.notas}
            />

            <EditarEquipamentoModal
              itemId={equipamento.id}
              itemModelo={equipamento.model}
              itemNumSerial={equipamento.serial_number}
              itemMac={equipamento.mac}
              itemVersaoHardware={equipamento.hardware_version}
              itemTipoEquipamento={equipamento.type}
              itemStatus={equipamento.status}
              itemPagina={equipamento.pagina}
              itemNotas={equipamento.notas}
              itemProjetoId={equipamento.projeto_id?.id}
              itemPocMap={pocMap}
              urlMap={urlMap}
            />

            <ExcluirEquipamentoModal
              itemId={equipamento.id}
              itemStatus={row.getValue("status")}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: customGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <NovoModal pocMap={pocMap} urlMap={urlMap} />

        <div className="flex gap-2 items-center">
          <Input
            placeholder="Pesquisar"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-60"
          />

          {/* Filtro de Status */}
          <Select
            onValueChange={(value) =>
              setColumnFilters((filters) => [
                ...filters.filter((filter) => filter.id !== "status"),
                value === "Todos" ? {} : { id: "status", value },
              ])
            }
            defaultValue="Todos"
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Estoque">Estoque</SelectItem>
              <SelectItem value="Em Uso">Em Uso</SelectItem>
              <SelectItem value="RMA">RMA</SelectItem>
              <SelectItem value="Vendido">Vendido</SelectItem>
              <SelectItem value="Arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead key={header.index}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`${
                  row.getValue("status") === "Arquivado" && "text-neutral-400"
                } `}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={`${row.id}-${index}`}> 
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
