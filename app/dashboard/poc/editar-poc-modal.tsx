"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Utils from "./utils";

const FormSchema = z.object({
  id: z.number(),
  empresa: z.string().nonempty("Empresa é obrigatória"),
  responsavel: z.string().nonempty("Responsável é obrigatório"),
  local: z.string().nonempty("Local é obrigatório"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  status: z.string().nonempty("Status é obrigatório"),
  notas: z.string().optional(),
});

function EditarPocModal({ itemId, itemEmpresa, itemResponsavel, itemLocal, itemTelefone, itemEmail, itemStatus, itemNotas }) {
  const { handleUpdate, isOpen, setIsOpen } = Utils();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: itemId,
      empresa: itemEmpresa,
      responsavel: itemResponsavel,
      local: itemLocal,
      telefone: itemTelefone,
      email: itemEmail,
      status: itemStatus,
      notas: itemNotas,
    },
  });

  const onClosed = () => {
    setIsOpen(!isOpen);
    form.reset({
      id: itemId,
      empresa: itemEmpresa,
      responsavel: itemResponsavel,
      local: itemLocal,
      telefone: itemTelefone,
      email: itemEmail,
      status: itemStatus,
      notas: itemNotas,
    });
    form.clearErrors();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClosed}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-blue-600 p-0">
          editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Editar POC</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-2">
              {/* Campos do Formulário */}

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

              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local</FormLabel>
                    <FormControl>
                      <Input placeholder="Local da POC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <FormLabel>Email</FormLabel>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Concluída">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
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
