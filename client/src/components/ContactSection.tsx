import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Send, Linkedin, Github } from "lucide-react";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
const CALLMEBOT_PHONE     = import.meta.env.VITE_CALLMEBOT_PHONE     as string;
const CALLMEBOT_API_KEY   = import.meta.env.VITE_CALLMEBOT_API_KEY   as string;

async function sendWhatsApp(name: string, senderEmail: string, subject: string, message: string) {
  if (!CALLMEBOT_PHONE || !CALLMEBOT_API_KEY) return;
  const text = encodeURIComponent(
    `📬 Portfolio Contact\n👤 ${name}\n📧 ${senderEmail}\n📌 ${subject}\n💬 ${message}`
  );
  await fetch(`https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${text}&apikey=${CALLMEBOT_API_KEY}`);
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormData = z.infer<typeof formSchema>;
type Props = { content?: any };

const ContactSection = ({ content }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const contactData = content?.contact;

  const location = contactData?.location ?? "Ahmedabad, India";
  const email = contactData?.email ?? "siddharajkc294000@gmail.com";
  const phone = contactData?.phone ?? "+91 8320032657";
  const linkedinUrl = contactData?.linkedinUrl ?? "https://www.linkedin.com/in/siddharajsinh-chauhan-410741199";
  const githubUrl = contactData?.githubUrl ?? "https://github.com/";

  const contactItems = [
    { icon: MapPin, label: "Location", value: location },
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: linkedinUrl },
    { icon: Github, label: "GitHub", href: githubUrl },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    data.name,
          from_email:   data.email,
          subject:      data.subject,
          message:      data.message,
          to_name:      "Siddharajsinh",
        },
        EMAILJS_PUBLIC_KEY
      );

      sendWhatsApp(data.name, data.email, data.subject, data.message).catch(() => {});

      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      form.reset();
    } catch {
      toast({ title: "Failed to send", description: "Please email me directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px section-accent-line" />

      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-sm mb-3" style={{ color: "#a78bfa" }}>// let's connect</p>
          <h2 className="section-heading gradient-text inline-block">Get In Touch</h2>
          <p className="section-subheading mt-4">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="glass-card rounded-2xl p-6 space-y-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-foreground hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-5">
              <p className="text-sm font-semibold text-foreground mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all">
                    <Icon className="w-4 h-4" /> {label}
                  </a>
                ))}
              </div>
            </div>

            <motion.div className="glass-card rounded-2xl p-5 border border-primary/20"
              animate={{ borderColor: ["rgba(14,165,233,0.2)", "rgba(34,211,238,0.2)", "rgba(14,165,233,0.2)"] }}
              transition={{ duration: 4, repeat: Infinity }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Currently Available</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Open to full-time roles, freelance projects, and consulting opportunities. Response time: within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-3 glass-card rounded-2xl p-7"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field}
                          className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field}
                          className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Inquiry / Collaboration" {...field}
                        className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell me about your project..." rows={5} {...field}
                        className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 rounded-xl resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={isSubmitting}
                  className="w-full gradient-bg text-white rounded-xl py-5 font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50">
                  {isSubmitting ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
