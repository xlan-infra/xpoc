"use client";

import { Badge } from "@/components/ui/badge";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import Utils from "../utils";

const FormSchema = z.object({
  model: z.string().nonempty("Model é obrigatório"),
  serialNumber: z.string().nonempty("Serial Number é obrigatório"),
  mac: z.string().optional(),
  hardwareVersion: z.string().nonempty("Hardware Version é obrigatório"),
  type: z.string().nonempty("Tipo é obrigatório"),
  status: z.string().nonempty("Status é obrigatório"),
  pagina: z.string().optional(),
  projeto_id: z.any().optional(),
  notas: z.string().optional(),
});

function NovoModal({ pocMap, urlMap }) {
  const { handleSubmit, isOpen, setIsOpen } = Utils();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      model: "",
      serialNumber: "",
      mac: "",
      hardwareVersion: "",
      type: "",
      status: "",
      projeto_id: "",
      notas: "",
    },
  });

  const onClosed = () => {
    setIsOpen(!isOpen);
    form.reset();
    form.clearErrors();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClosed}>
      <DialogTrigger asChild>
        <Button>Novo Equipamento</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Novo Equipamento</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              {/* Campos do Formulário */}
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Access Point">
                            Access Point
                          </SelectItem>
                          <SelectItem value="Controladora">
                            Controladora
                          </SelectItem>
                          <SelectItem value="GBIC">GBIC</SelectItem>
                          <SelectItem value="Injetor PoE">
                            Injetor PoE
                          </SelectItem>
                          <SelectItem value="Roteador">Roteador</SelectItem>
                          <SelectItem value="Switch">Switch</SelectItem>
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
                  name="projeto_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projeto</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "none" ? null : value)
                        }
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o Projeto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          {pocMap?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              <Badge
                                variant={"outline"}
                                className={`mr-2
                                  ${
                                    item.projeto === "poc"
                                      ? "bg-blue-400 border-none capitalize text-white hover:bg-blue-600"
                                      : "bg-orange-400 border-none capitalize text-white hover:bg-orange-600"
                                  }
                                `}
                              >
                                {item.projeto}
                              </Badge>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Em Uso">Em Uso</SelectItem>
                          <SelectItem value="Estoque">Estoque</SelectItem>
                          <SelectItem value="Vendido">Vendido</SelectItem>
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
                      <Input placeholder="URL" list="url-list" {...field} li />
                    </FormControl>
                    <FormMessage />
                    <datalist id="url-list">
                      {urlMap?.map((item) => (
                        <option key={item.pagina} value={item.pagina}>
                          {item.model}
                        </option>
                      ))}
                    </datalist>
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

export default NovoModal;
