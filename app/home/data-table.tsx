"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
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
import {ArrowUpDown, ArrowUpRight, Minus} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import DetalhesEquipamentoModal from "./modal/detalhes-equipamento-modal";
import EditarEquipamentoModal from "./modal/editar-equipamento-modal";
import ExcluirEquipamentoModal from "./modal/excluir-equipamento-modal";
import NovoModal from "./modal/novo-equipamento-modal";

export function DataTable({data, pocMap, urlMap}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
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
      normalizeText(row.original.poc_id?.empresa ?? "").includes(normalizeText(searchValue))
    );
  };

  const columns: ColumnDef[] = [
    {
      accessorKey: "model",
      header: "Modelo",
      cell: ({row}) => {
        const equipamento = row.original;
        return (
          <Link rel="noopener noreferrer" target="_blank" href={equipamento.pagina ?? ""}>
            <span className="flex items-center gap-1 font-semibold hover:underline">
              {row.getValue("model")}{" "}
              {equipamento.pagina && <ArrowUpRight className="h-3 w-3 text-neutral-400" />}
            </span>
          </Link>
        );
      },
    },

    {
      accessorKey: "type",
      header: ({column}) => {
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
      cell: ({row}) => <span>{row.getValue("type")}</span>,
    },

    {
      accessorKey: "serial_number",
      header: "SN",
    },
    // {
    //   accessorKey: "mac",
    //   header: "Mac",
    //   cell: ({row}) => {
    //     const equipamento = row.original;
    //     return (
    //       <span className="flex items-center gap-1">
    //         {equipamento.mac != "" ? row.getValue("mac") : "n/a"}
    //       </span>
    //     );
    //   },
    // },

    // {
    //   accessorKey: "hardware_version",
    //   header: <span className="pr-2">Hardware</span>,
    //   cell: ({row}) => <span className="lowercase">{row.getValue("hardware_version")}</span>,
    // },

    {
      acessorKey: "pocs",
      accessorFn: (row) => ({
        id: row.poc_id?.id,
        empresa: row.poc_id?.empresa ?? "",
      }),
      id: "poc_id_empresa",
      header: "Objetivo",
      cell: ({row}) => {
        const poc = row.original.poc_id;

        return (
          <Link href={`/projetos/${poc?.id ?? ""}/${poc?.empresa ?? ""}`}>
            {poc?.id ? (
              <div className="flex items-center">
                <span
                  className={(() => {
                    const circleClasses = {
                      poc: "bg-blue-600",
                      locação: "bg-orange-600",
                    };
                    return `inline-block w-2 h-2 rounded-full mr-1 ${
                      circleClasses[poc?.categoria]
                    }`;
                  })()}
                ></span>
                <span className="capitalize">{poc?.categoria}</span>
              </div>
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
      acessorKey: "pocs",
      accessorFn: (row) => ({
        id: row.poc_id?.id,
        empresa: row.poc_id?.empresa ?? "",
      }),
      id: "poc_id_empresa",
      header: "Projeto",
      cell: ({row}) => {
        const poc = row.original.poc_id;

        const normalizeText = (text) =>
          text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "");

        return (
          <Link href={`/projetos/${poc?.id ?? ""}/${normalizeText(poc?.empresa ?? "")}`}>
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
      header: ({column}) => {
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
      cell: ({row}) => (
        <div className="flex items-center">
          <span
            className={(() => {
              const circleClasses = {
                "Em Estoque": "bg-emerald-500",
                "Em Uso": "bg-red-500",
                RMA: "bg-blue-500",
                Vendido: "bg-zinc-500",
                Locado: "bg-yellow-500",
              };

              return `inline-block w-2 h-2 rounded-full mr-1 ${
                circleClasses[row.getValue("status")]
              }`;
            })()}
          ></span>
          <span
            className={(() => {
              const textClasses = {
                "Em Estoque": "text-emerald-500 hover:text-emerald-600 capitalize",
                "Em Uso": "text-red-500 hover:text-red-600 capitalize",
                RMA: "text-blue-500 hover:text-blue-600 capitalize",
                Vendido: "text-zinc-500 hover:text-zinc-600 capitalize",
                Locado: "text-yellow-500 hover:text-yellow-600 capitalize",
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
      cell: ({row}) => {
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
              ItemPocId={equipamento.poc_id?.id}
              itemPocMap={pocMap}
              urlMap={urlMap}
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
              ItemPocId={equipamento.poc_id?.id}
              itemPocMap={pocMap}
              urlMap={urlMap}
            />

            <ExcluirEquipamentoModal
              equipamentoPocId={equipamento.poc_id?.id}
              itemId={equipamento.id}
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
      <div className="flex justify-between items-center py-6">
        <NovoModal pocMap={pocMap} urlMap={urlMap} />

        <div className="flex gap-2">
          <Input
            placeholder="Pesquisar"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-60"
          />
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="px-0" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="whitespace-nowrap"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* {table.getRowModel().rows?.length === 0 ? null : (
            <span>
              Exibindo {table.getRowModel().rows.length} de {table.getRowModel().totalRows} registros
            </span>
             <span className="text-muted-foreground text-sm">
             {table.getState().pagination.pageIndex + 1} de {table.getPageCount().toLocaleString()}
           </span>
          )} */}
        <div className="space-x-2">
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
    </div>
  );
}
