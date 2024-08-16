"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Utils from "./utils";

const FormSchema = z.object({
  id: z.number(),
  model: z.string().nonempty("Model é obrigatório"),
  serialNumber: z.string().nonempty("Serial Number é obrigatório"),
  mac: z.string().optional(),
  hardwareVersion: z.string().nonempty("Hardware Version é obrigatório"),
  type: z.string().nonempty("Tipo é obrigatório"),
  status: z.string().nonempty("Status é obrigatório"),
  pagina: z.string().optional(),
  notas: z.string().optional(),
  poc_id: z.any().optional(),
});

function EditarEquipamentoModal({
  itemId,
  itemModelo,
  itemNumSerial,
  itemMac,
  itemVersaoHardware,
  itemTipoEquipamento,
  itemStatus,
  itemPagina,
  ItemPocId,
  itemPocMap,
  itemNotas,
}) {
  const { handleUpdate, isOpen, setIsOpen } = Utils();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: itemId,
      model: itemModelo,
      serialNumber: itemNumSerial,
      mac: itemMac,
      hardwareVersion: itemVersaoHardware,
      type: itemTipoEquipamento,
      status: itemStatus,
      pagina: itemPagina,
      poc_id: ItemPocId,
      notas: itemNotas,
    },
  });

  const onClosed = () => {
    setIsOpen(!isOpen);
    form.reset({
      id: itemId,
      model: itemModelo,
      serialNumber: itemNumSerial,
      mac: itemMac,
      hardwareVersion: itemVersaoHardware,
      type: itemTipoEquipamento,
      status: itemStatus,
      pagina: itemPagina,
      poc_id: ItemPocId,
      notas: itemNotas,
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
          <DialogTitle className="mb-4">Editar Equipamento</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-2">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Modelo do Equipamento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° de Serial</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de Serial" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mac"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MAC</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço MAC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="hardwareVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Versão do Hardware</FormLabel>
                      <FormControl>
                        <Input placeholder="Versão do Hardware" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Equipamento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Access Point">Access Point</SelectItem>
                          <SelectItem value="Controladora">Controladora</SelectItem>
                          <SelectItem value="Injetor PoE">Injetor PoE</SelectItem>
                          <SelectItem value="Roteador">Roteador</SelectItem>
                          <SelectItem value="Switch L2">Switch L2</SelectItem>
                          <SelectItem value="Switch L2+">Switch L2+</SelectItem>
                          <SelectItem value="Switch L3">Switch L3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="poc_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>POC</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value === "none" ? null : value)}
                        defaultValue={field.value ? field.value.toString() : field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a POC" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          {itemPocMap?.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.empresa}
                            </SelectItem>
                          ))}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Em Uso">Em Uso</SelectItem>
                          <SelectItem value="Em Estoque">Em Estoque</SelectItem>
                          <SelectItem value="RMA">RMA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pagina"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Página do Equipamento</FormLabel>
                    <FormControl>
                      <Input placeholder="URL" {...field} />
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

              <DialogFooter className="flex gap-2">
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

export default EditarEquipamentoModal;
