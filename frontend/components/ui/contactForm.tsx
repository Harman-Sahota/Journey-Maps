"use client"
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './button';
import { Textarea } from "@/components/ui/textarea"
import emailjs from 'emailjs-com';

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: "First Name Cannot Be Empty",
    }),
    lastName: z.string().min(1, {
        message: "Last Name Cannot Be Empty",
    }),
    email: z.string().email(),
    message: z.string().min(1, {
        message: "Message Cannot Be Empty",
    }).max(300, {
        message: "Message Cannot Be More Than 300 Characters",
    })

})

export default function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Send email to yourself
            await emailjs.send(
                process.env.SERVICE_ID_EMAILJS!,
                process.env.ADMIN_TEMPLATE_ID!,
                {
                    to_email: '10harmansahota@gmail.com',
                    to_name: 'Harman',
                    from_name: 'Journey Maps Team',
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    message: values.message,
                    reply_to: values.email
                },
                process.env.PUBLIC_KEY_EMAILJS!
            );

            // Send email to the user
            await emailjs.send(
                process.env.SERVICE_ID_EMAILJS!,
                process.env.USER_TEMPLATE_ID!,
                {
                    to_email: values.email,
                    to_name: values.firstName,
                    from_name: 'Journey Maps Team',
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    message: values.message,
                    reply_to: values.email
                },
                process.env.PUBLIC_KEY_EMAILJS!
            );

            console.log('Emails sent successfully');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='mt-4 max-w-md ml-auto mr-auto w-full flex flex-col gap-4'>
                <FormField control={form.control} name='firstName' render={({ field }) => {
                    return <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder='First Name' className='rounded' type='string' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }} />
                <FormField control={form.control} name='lastName' render={({ field }) => {
                    return <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder='Last Name' className='rounded' type='string' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }} />
                <FormField control={form.control} name='email' render={({ field }) => {
                    return <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder='Email' className='rounded' type='email' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }} />
                <FormField control={form.control} name='message' render={({ field }) => {
                    return <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                            <Textarea placeholder='Write a message to us' className='rounded' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }} />
                <Button type='submit' className='rounded w-full flex items-center justify-center mx-auto dark:text-white'>Submit</Button>
            </form>
        </Form>
    );
}