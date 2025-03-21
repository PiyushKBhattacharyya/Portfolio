import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, MapPin, CalendarClock } from 'lucide-react';
import TiltCard from '@/components/ui/tilt-card';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const subject = encodeURIComponent("New Contact Form Submission");
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      );
      const mailtoLink = `mailto:piyushbhattacharyya@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out, I'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Have a project in mind or just want to connect? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <TiltCard className="p-8 bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/20">
              <h3 className="text-2xl font-poppins font-bold mb-6">Send Me a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            className="bg-slate-800/50 border-primary/30 focus:border-primary" 
                            {...field} 
                          />
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
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            className="bg-slate-800/50 border-primary/30 focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message here" 
                            rows={5}
                            className="bg-slate-800/50 border-primary/30 focus:border-primary resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </TiltCard>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-full flex flex-col justify-between">
              <TiltCard className="p-8 bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/20 mb-8">
                <h3 className="text-2xl font-poppins font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Mail className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:piyushbhattacharyya@gmail.com" 
                        className="text-slate-300 hover:text-primary transition-colors"
                      >
                        piyushbhattacharyya@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Linkedin className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">LinkedIn</h4>
                      <a 
                        href="https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-primary transition-colors"
                      >
                        https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Github className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">GitHub</h4>
                      <a 
                        href="https://github.com/PiyushKBhattacharyya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-primary transition-colors"
                      >
                        https://github.com/PiyushKBhattacharyya
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <MapPin className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Location</h4>
                      <p className="text-slate-300">Guwahati, India</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
