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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Utils from "../utils";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client";

// Função para converter string para Date, se a string não estiver vazia
const parseDateString = (str) => (str ? new Date(str) : undefined);

const FormSchema = z.object({
  dt_inicio: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Data de Início inválida"
    ),
  dt_fim: z.preprocess(parseDateString, z.date().optional()),
  empresa: z.string().nonempty("Empresa é obrigatória"),
  responsavel: z.string().nonempty("Responsável é obrigatório"),
  cidade: z.string().nonempty("Cidade é obrigatório"),
  estado: z.string().nonempty("Estado é obrigatório"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  email: z.string().optional(),
  notas: z.string().optional(),
  status: z.string().nonempty("Status é obrigatório"),
  projeto: z.string().nonempty("projeto é obrigatória"),
  equipamentos: z.array(z.number()).optional(),
});

function NovoPocModal() {
  const { handleSubmit, isOpen, setIsOpen } = Utils();

  const [status, setStatus] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dt_inicio: "",
      dt_fim: "",
      empresa: "",
      responsavel: "",
      cidade: "",
      estado: "",
      telefone: "",
      email: "",
      notas: "",
      status: "",
      projeto: "",
      equipamentos: [],
    },
  });

  useEffect(() => {
    const fetchEquipamentos = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("equipamentos")
        .select("id, model, serial_number")
        .eq("status", "Estoque");
      setEquipamentos(data || []);
    };
    fetchEquipamentos();
  }, []);

  const onClosed = () => {
    setIsOpen(!isOpen);
    form.reset();
    form.clearErrors();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClosed}>
      <DialogTrigger asChild>
        <Button>Novo Projeto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Novo Projeto</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AL">Alagoas</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                          <SelectItem value="ES">Espírito Santo</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="MA">Maranhão</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="PB">Paraíba</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="PI">Piauí</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="RN">
                            Rio Grande do Norte
                          </SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="SE">Sergipe</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
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
                name="equipamentos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipamentos</FormLabel>
                    <FormControl>
                      <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-1">
                        {equipamentos.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), item.id]);
                                } else {
                                  field.onChange(
                                    field.value?.filter((id) => id !== item.id) || [],
                                  );
                                }
                              }}
                            />
                            <span className="text-sm">
                              {item.model} - {item.serial_number}
                            </span>
                          </div>
                        ))}
                      </div>
                    </FormControl>
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

              {status === "Finalizada" && (
                <FormField
                  control={form.control}
                  name="dt_fim"
                  render={({ field }) => (
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

export default NovoPocModal;
