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
        <div className="flex flex-col items-center gap-12">
          <motion.div
            className="md:w-2/4 bg-gray-50 items-center rounded-lg p-8"
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
                  <p className="text-gray-600">Ahmedabad, India</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-gray-600">siddharajkc294000@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className="text-gray-600">+91 8320032657</p>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/siddharajsinh-chauhan-410741199?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center shadow-sm transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
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
