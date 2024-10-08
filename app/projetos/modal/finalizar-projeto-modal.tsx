"use client";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle2, Handshake} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import Utils from "../utils";

const FormSchema = z.object({
  id: z.number(),
  dt_inicio: z.string().optional(),
  dt_fim: z.string().optional(),
  empresa: z.string().nonempty("Empresa é obrigatória"),
  responsavel: z.string().nonempty("Responsável é obrigatório"),
  local: z.string().nonempty("Local é obrigatório"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  email: z.string(),
  status: z.string().nonempty("Status é obrigatório"),
  notas: z.string().optional(),
});

function FinalizarPocModal({
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
  itemCategoria,
}) {
  const {handleUpdate, isOpen, setIsOpen} = Utils();

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
      categoria: itemCategoria,
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
      categoria: itemCategoria,
    });
    form.clearErrors();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClosed}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0" disabled={itemStatus === "Finalizada"}>
          {itemStatus === "Finalizada" ? (
            <>
              <CheckCircle2 size={14} className="mr-1 text-black" />
              <span className="text-black">finalizada</span>
            </>
          ) : (
            <>
              <Handshake size={14} className="mr-1 text-blue-600" />
              <span className="text-blue-600">finalizar</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar Projeto</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-2">
              {/* Campos do Formulário */}

              <FormField
                control={form.control}
                name="dt_inicio"
                render={({field}) => (
                  <FormItem hidden>
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
                  render={({field}) => (
                    <FormItem hidden>
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
                  render={({field}) => (
                    <FormItem hidden>
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
                  render={({field}) => (
                    <FormItem hidden>
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
                  render={({field}) => (
                    <FormItem hidden>
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
                  render={({field}) => (
                    <FormItem hidden>
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
                  render={({field}) => (
                    <FormItem hidden>
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
                name="categoria"
                render={({field}) => (
                  <FormItem hidden>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="poc">🟣Poc</SelectItem>
                        <SelectItem value="locação">🟠Locação</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({field}) => (
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
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Finalizada">Finalizada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {status === "Finalizada" && (
                <FormField
                  control={form.control}
                  name="dt_fim"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Data de Conclusão</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="notas"
                render={({field}) => (
                  <FormItem hidden>
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

export default FinalizarPocModal;
