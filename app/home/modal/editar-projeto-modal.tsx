"use client";

import Ping from "@/components/ping";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Utils from "../utils";

const FormSchema = z.object({
  id: z.number(),
  dt_inicio: z.string().optional(),
  dt_fim: z.string().nullable(),
  empresa: z.string().nonempty("Empresa é obrigatória"),
  responsavel: z.string().nonempty("Responsável é obrigatório"),
  cidade: z.string().nonempty("Cidade é obrigatória"),
  estado: z.string().nonempty("Estado é obrigatório"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  email: z.string().optional(),
  status: z.string().nonempty("Status é obrigatório"),
  notas: z.string().optional(),
  projeto: z.string().nonempty("projeto é obrigatória"),
});

function EditarPocModal({
  itemId,
  itemDataInicio,
  itemDataFim,
  itemEmpresa,
  itemResponsavel,
  itemCidade,
  itemEstado,
  itemTelefone,
  itemEmail,
  itemStatus,
  itemNotas,
  itemProjeto,
}) {
  const { handleUpdate, isOpen, setIsOpen } = Utils();

  const [status, setStatus] = useState(itemStatus);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: itemId,
      dt_inicio: itemDataInicio,
      dt_fim: itemDataFim,
      empresa: itemEmpresa,
      responsavel: itemResponsavel,
      cidade: itemCidade,
      estado: itemEstado,
      telefone: itemTelefone,
      email: itemEmail,
      status: itemStatus,
      notas: itemNotas,
      projeto: itemProjeto,
    },
  });

  const onClosed = () => {
    setIsOpen(!isOpen);
    setStatus(itemStatus);
    form.reset({
      id: itemId,
      dt_fim: itemDataFim,
      dt_inicio: itemDataInicio,
      empresa: itemEmpresa,
      responsavel: itemResponsavel,
      cidade: itemCidade,
      estado: itemEstado,
      telefone: itemTelefone,
      email: itemEmail,
      status: itemStatus,
      notas: itemNotas,
      projeto: itemProjeto,
    });
    form.clearErrors();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClosed}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-black hover:text-blue-800 p-0">
          <PenLine size={14} className="mr-1" /> editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Editar Projeto</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-2"
            >
              {/* Campos do Formulário */}

              <FormField
                control={form.control}
                name="dt_inicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="empresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da Empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do Responsável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone de Contato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Email de Contato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projeto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Projeto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a projeto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="poc">
                          <div className="flex items-center space-x-2">
                            <Ping color={"bg-blue-400"} />
                            <span>Poc</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="locação">
                          <div className="flex items-center space-x-2">
                            <Ping color={"bg-orange-400"} />
                            <span>Locação</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setStatus(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Em Andamento">
                          Em Andamento
                        </SelectItem>
                        <SelectItem value="Finalizada">Finalizada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dt_fim"
                render={({ field }) => (
                  <FormItem hidden={status != "Finalizada"}>
                    <FormLabel>Data de Conclusão</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas</FormLabel>
                    <FormControl>
                      <Input placeholder="Notas adicionais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-2 ">
                <DialogClose asChild>
                  <Button className="w-1/2" type="button" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-1/2">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditarPocModal;
