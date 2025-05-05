import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaMediumM } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would send this data to a server endpoint
      // For now, we'll simulate a successful submission
      console.log("Form data:", data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Feel free to contact me for any work or suggestions. I'll get back to you as soon as possible.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Contact form */}
          <motion.div 
            className="md:w-7/12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email" 
                            {...field} 
                            className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subject" 
                          {...field} 
                          className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          rows={5} 
                          {...field} 
                          className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-secondary text-white py-3 px-8 rounded-md font-medium transition duration-300 shadow-md hover:shadow-lg w-auto h-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          {/* Right: Contact info */}
          <motion.div 
            className="md:w-5/12 bg-gray-50 rounded-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-inter font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className="text-gray-600">San Francisco, California, USA</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-gray-600">manish.bhanushali@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Website</h4>
                  <p className="text-gray-600">www.manishbhanushali.com</p>
                </div>
              </div>
            </div>
            
            {/* Social media */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center shadow-sm transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center shadow-sm transition duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://twitter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center shadow-sm transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="https://instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center shadow-sm transition duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://medium.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center shadow-sm transition duration-300"
                  aria-label="Medium"
                >
                  <FaMediumM />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
