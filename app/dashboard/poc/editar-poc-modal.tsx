"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Utils from "../utils";

const FormSchema = z.object({
  id: z.number(),
  model: z.string().nonempty("Model é obrigatório"),
  serialNumber: z.string().nonempty("Serial Number é obrigatório"),
  mac: z
    .string()
    .nonempty("MAC é obrigatório")
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "MAC inválido"),
  hardwareVersion: z.string().nonempty("Hardware Version é obrigatório"),
  type: z.string().nonempty("Type é obrigatório"),
  status: z.string().nonempty("Status é obrigatório"),
});

function EditarEquipamentoModal({ itemId, itemModelo, itemNumSerial, itemMac, itemVersaoHardware, itemTipoEquipamento, itemStatus }) {
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
                        <SelectItem value="Switch">Switch</SelectItem>
                        <SelectItem value="Router">Router</SelectItem>
                        <SelectItem value="Access Point">Access Point</SelectItem>
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
                        <SelectItem value="Locado">Locado</SelectItem>
                        <SelectItem value="Em Estoque">Em Estoque</SelectItem>
                      </SelectContent>
                    </Select>
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
