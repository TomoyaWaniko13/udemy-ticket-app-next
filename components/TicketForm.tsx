'use client';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      setIsSubmitting(true);
      setError('');

      if (ticket) {
        await axios.patch('/api/tickets/' + ticket.id, values);
      } else {
        await axios.post('/api/tickets', values);
      }

      setIsSubmitting(false);

      router.push('/tickets');
      router.refresh();
    } catch (error) {
      console.log(error);
      setError('Unknown error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={'rounded-md border w-full p-4'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='title'
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder='Ticket Tittle...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            name={'description'}
            defaultValue={ticket?.description}
            control={form.control}
            render={({ field }) => <SimpleMDE placeholder={'Description...'} {...field} />}
          />

          <div className={'flex w-full space-x-4'}>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={ticket?.status}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Status...' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='OPEN'>Open</SelectItem>
                      <SelectItem value='STARTED'>Started</SelectItem>
                      <SelectItem value='CLOSED'>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={ticket?.priority}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Priority...' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='LOW'>Low</SelectItem>
                      <SelectItem value='MEDIUM'>Medium</SelectItem>
                      <SelectItem value='HIGH'>High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={isSubmitting}>
            {ticket ? 'Update Ticket' : ' Create Ticket'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
