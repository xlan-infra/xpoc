"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
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
import { ArrowUpDown, ArrowUpRightFromSquareIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import EditarEquipamentoModal from "./editar-equipamento-modal";
import ExcluirEquipamentoModal from "./excluir-equipamento-modal";
import NovoModal from "./novo-equipamento-modal";

export function DataTable({ data, pocMap }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const columns: ColumnDef[] = [
    {
      accessorKey: "model",
      header: "Modelo",
      cell: ({ row }) => {
        const equipamento = row.original;
        return (
          <Link rel="noopener noreferrer" target="_blank" className="font-bold" href={equipamento.pagina ?? ""}>
            <span className="flex items-center gap-1">
              {row.getValue("model")} {equipamento.pagina && <ArrowUpRightFromSquareIcon className="h-3 w-3 text-muted-foreground" />}
            </span>
          </Link>
        );
      },
    },

    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
      accessorKey: "mac",
      header: "Mac",
      cell: ({ row }) => {
        const equipamento = row.original;
        return <span className="flex items-center gap-1">{equipamento.mac != "" ? row.getValue("mac") : "n/a"}</span>;
      },
    },
    {
      accessorKey: "hardware_version",
      header: "Versão Hw",
    },

    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Status
            <ArrowUpDown className="ml-2 h-3 w-3 text-primary " />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Badge
          className={
            row.getValue("status") === "Em Estoque"
              ? "border-green-500 text-green-500 hover:border-green-600 hover:text-green-600 bg-transparent hover:bg-transparent"
              : row.getValue("status") === "Em Uso"
              ? "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 bg-transparent hover:bg-transparent"
              : row.getValue("status") === "RMA"
              ? "border-orange-500 text-orange-500 hover:border-orange-600 hover:text-orange-600 bg-transparent hover:bg-transparent"
              : ""
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },

    {
      accessorFn: (row) => ({
        id: row.poc_id?.id,
        empresa: row.poc_id?.empresa ?? "",
      }),
      id: "poc_id_empresa",
      header: "POC",
      cell: ({ row }) => {
        const poc = row.original.poc_id;

        const normalizeText = (text) =>
          text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        return (
          <Link href={`/poc/${poc?.id ?? ""}/${normalizeText(poc?.empresa ?? "")}`} className="font-bold">
            <Badge variant={"outline"}>{poc?.id ? poc?.empresa : <span className="text-neutral-300">-</span>}</Badge>
          </Link>
        );
      },
    },

    {
      id: "actions",
      header: "Ações",
      enableHiding: false,
      cell: ({ row }) => {
        const equipamento = row.original;
        return (
          <div className="gap-2 flex">
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
            />

            <ExcluirEquipamentoModal equipamentoPocId={equipamento.poc_id?.id} itemId={equipamento.id} />
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-6">
        <NovoModal pocMap={pocMap} />
        <div className="flex gap-2">
          <Input
            placeholder="Filtrar por Modelo..."
            value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("model")?.setFilterValue(event.target.value)}
            className="max-w-xs"
          />

          <Input
            placeholder="Filtrar por Status..."
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="whitespace-nowrap" key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
