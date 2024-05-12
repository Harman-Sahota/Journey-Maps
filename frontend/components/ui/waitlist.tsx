"use client"
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './button';
import { toast } from "sonner";
import emailjs from 'emailjs-com';

const formSchema = z.object({
    email: z.string().email(),
})

export default function Waitlist() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Send email to yourself
            await emailjs.send(
                process.env.NEXT_PUBLIC_WAITLIST_SERVICEID!,
                process.env.NEXT_PUBLIC_WAITLIST_ADMINDID!,
                {
                    to_email: '10harmansahota@gmail.com',
                    to_name: 'Harman',
                    from_name: 'Journey Maps Team',
                    email: values.email,
                    reply_to: values.email
                },
                process.env.NEXT_PUBLIC_WAITLIST_APIKEY!
            );

            // Send email to the user
            await emailjs.send(
                process.env.NEXT_PUBLIC_WAITLIST_SERVICEID!,
                process.env.NEXT_PUBLIC_WAITLIST_CUSTOMERID!,
                {
                    to_email: values.email,
                    from_name: 'Journey Maps Team',
                    email: values.email,
                    reply_to: values.email
                },
                process.env.NEXT_PUBLIC_WAITLIST_APIKEY!
            );

            form.reset();

            toast("Thank you for signing up for our waitlist", {
                description: "We are excited to have you join us!",
                action: {
                    label: "Done",
                    onClick: () => { },
                },
            })


        } catch (error) {
            console.error('Error sending emails:', error);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='mt-4 max-w-md ml-auto mr-auto w-full flex flex-row gap-4'>
                <FormField control={form.control} name='email' render={({ field }) => {
                    return <FormItem>
                        <FormControl>
                            <Input placeholder='Email' className='rounded' type='email' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }} />
                <Button className='rounded w-4/12 flex bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-slate-50 items-center justify-center mx-auto dark:text-black'>Submit</Button>
            </form>
        </Form>
    );
}
