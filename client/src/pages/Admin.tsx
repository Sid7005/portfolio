import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, User, Briefcase, Code2, FolderOpen,
  Mail, LogOut, Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp, Upload, ImageIcon,
} from "lucide-react";

type ContentData = {
  hero: any;
  about: { paragraphs: string[] };
  contact: any;
  skills: any;
  experience: any[];
  education: any[];
  projects: any[];
};

const tabs = [
  { id: "hero", label: "Hero", icon: User },
  { id: "about", label: "About", icon: LayoutDashboard },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

async function apiFetch(url: string, method = "GET", body?: any) {
  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json()).message ?? "Request failed");
  return res.json();
}

/* ── Image Upload + Library Picker ──────────────────────────────── */
const ImageUpload = ({ currentUrl, onUploaded, label = "Image" }: {
  currentUrl?: string;
  onUploaded: (url: string) => void;
  label?: string;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl ?? "");
  const [showLibrary, setShowLibrary] = useState(false);
  const [library, setLibrary] = useState<{ name: string; url: string; source: "uploads" | "assets" }[]>([]);
  const [loadingLib, setLoadingLib] = useState(false);
  const { toast } = useToast();

  const loadLibrary = async () => {
    setLoadingLib(true);
    try {
      const res = await fetch("/api/admin/uploads", { credentials: "include" });
      const data = await res.json();
      setLibrary(data);
    } catch {
      setLibrary([]);
    } finally {
      setLoadingLib(false);
    }
  };

  const openLibrary = () => {
    setShowLibrary(true);
    loadLibrary();
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch("/api/admin/upload", { method: "POST", credentials: "include", body: form });
      if (!res.ok) throw new Error((await res.json()).message ?? "Upload failed");
      const { url } = await res.json();
      setPreview(url);
      onUploaded(url);
      toast({ title: `${label} uploaded!` });
      if (showLibrary) loadLibrary();
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const selectFromLibrary = (url: string) => {
    setPreview(url);
    onUploaded(url);
    setShowLibrary(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted-foreground">{label}</label>

      {/* Current image preview + URL input */}
      <div className="flex items-center gap-3">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ background: "#000", border: "1px solid rgba(34,211,238,0.2)" }}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
          ) : (
            <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
          )}
        </div>
        <input
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary/50 font-mono"
          value={preview}
          onChange={(e) => { setPreview(e.target.value); onUploaded(e.target.value); }}
          placeholder="/uploads/image.png or paste URL"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium gradient-bg text-white hover:opacity-90 transition disabled:opacity-50">
          {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          {uploading ? "Uploading..." : "Upload New"}
        </button>
        <button type="button" onClick={openLibrary}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium glass border border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 transition">
          <ImageIcon className="w-3 h-3" /> Choose from Library
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {/* Image Library Modal */}
      {showLibrary && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
          <div className="glass-card rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
            style={{ border: "1px solid rgba(34,211,238,0.2)" }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Image Library</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{library.length} image{library.length !== 1 ? "s" : ""} uploaded</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs gradient-bg text-white hover:opacity-90 transition disabled:opacity-50">
                  {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                  Upload New
                </button>
                <button type="button" onClick={() => setShowLibrary(false)}
                  className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition text-lg leading-none">
                  ×
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingLib ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : library.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                  <ImageIcon className="w-10 h-10 mb-2 opacity-30" />
                  <p className="text-sm">No images found.</p>
                  <p className="text-xs mt-1">Click "Upload New" to add your first image.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {(["uploads", "assets"] as const).map((source) => {
                    const group = library.filter((f) => f.source === source);
                    if (group.length === 0) return null;
                    return (
                      <div key={source}>
                        <p className="text-xs font-mono text-muted-foreground mb-2 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${source === "uploads" ? "bg-cyan-400" : "bg-sky-400"}`} />
                          {source === "uploads" ? "Uploaded Images" : "Asset Images (client/assets/images)"}
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {group.map(({ name, url }) => (
                            <button key={name} type="button" onClick={() => selectFromLibrary(url)}
                              className={`relative rounded-xl overflow-hidden aspect-square group transition-all ${
                                preview === url ? "ring-2 ring-cyan-400" : "ring-1 ring-white/10 hover:ring-cyan-400/50"
                              }`}
                              style={{ background: "#000" }}>
                              <img src={url} alt={name} className="w-full h-full object-contain p-1"
                                style={{ mixBlendMode: "screen" }} />
                              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                              {preview === url && (
                                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                                  <span className="text-[8px] text-black font-bold">✓</span>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 text-[9px] font-mono text-white/60 truncate opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                                {name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Sub-panel: Hero ─────────────────────────────────────────────── */
const HeroPanel = ({ data, onSave }: { data: any; onSave: (d: any) => void }) => {
  const [form, setForm] = useState({ ...data });
  const [rolesText, setRolesText] = useState((data.roles ?? []).join("\n"));
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, roles: rolesText.split("\n").map((s: string) => s.trim()).filter(Boolean) };
      await apiFetch("/api/admin/hero", "PUT", payload);
      onSave(payload);
      toast({ title: "Hero section saved!" });
    } catch (e: any) { toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      {[
        ["name", "Full Name"],
        ["shortName", "Short Name (displayed in hero)"],
        ["bio", "Bio / Tagline"],
        ["linkedinUrl", "LinkedIn URL"],
        ["githubUrl", "GitHub URL"],
        ["email", "Email"],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block text-sm text-muted-foreground mb-1.5">{label}</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition"
            value={form[key] ?? ""}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}
      <div>
        <label className="block text-sm text-muted-foreground mb-1.5">Roles (one per line, shown in typewriter)</label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition resize-none"
          rows={5}
          value={rolesText}
          onChange={(e) => setRolesText(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-1.5">Stats (JSON — e.g. [{"{"}\"value\":\"3+\",\"label\":\"Years Exp\"{"}"}])</label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm font-mono focus:outline-none focus:border-primary/50 transition resize-none"
          rows={4}
          value={JSON.stringify(form.stats ?? [], null, 2)}
          onChange={(e) => {
            try { setForm({ ...form, stats: JSON.parse(e.target.value) }); } catch {}
          }}
        />
      </div>
      <div className="pt-2 border-t border-white/5 space-y-4">
        <p className="text-xs font-mono text-muted-foreground">// images</p>
        <ImageUpload
          label="Profile / Hero Image (large photo in hero section)"
          currentUrl={form.heroImage ?? ""}
          onUploaded={(url) => setForm({ ...form, heroImage: url })}
        />
        <ImageUpload
          label="Logo Image (small icon in header navbar)"
          currentUrl={form.logoImage ?? ""}
          onUploaded={(url) => setForm({ ...form, logoImage: url })}
        />
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
};

/* ── Sub-panel: About ────────────────────────────────────────────── */
const AboutPanel = ({ data, onSave }: { data: any; onSave: (d: any) => void }) => {
  const [paragraphs, setParagraphs] = useState<string[]>(data.paragraphs ?? []);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/admin/about", "PUT", { paragraphs });
      onSave({ paragraphs });
      toast({ title: "About section saved!" });
    } catch (e: any) { toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Paragraphs</span>
        <button onClick={() => setParagraphs([...paragraphs, ""])} className="text-xs badge-tech cursor-pointer flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add Paragraph
        </button>
      </div>
      {paragraphs.map((p, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition resize-none"
            rows={3}
            value={p}
            onChange={(e) => { const a = [...paragraphs]; a[i] = e.target.value; setParagraphs(a); }}
          />
          <button onClick={() => setParagraphs(paragraphs.filter((_, j) => j !== i))} className="text-destructive/60 hover:text-destructive transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
};

/* ── Sub-panel: Contact ──────────────────────────────────────────── */
const ContactPanel = ({ data, onSave }: { data: any; onSave: (d: any) => void }) => {
  const [form, setForm] = useState({ ...data });
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/admin/contact", "PUT", form);
      onSave(form);
      toast({ title: "Contact section saved!" });
    } catch (e: any) { toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      {["location", "email", "phone", "linkedinUrl", "githubUrl"].map((key) => (
        <div key={key}>
          <label className="block text-sm text-muted-foreground mb-1.5 capitalize">{key.replace(/Url$/, " URL")}</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition"
            value={form[key] ?? ""}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
};

/* ── Sub-panel: Projects ─────────────────────────────────────────── */
const ProjectsPanel = ({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);

  const saveProject = async (project: any) => {
    setSavingId(project.id);
    try {
      await apiFetch(`/api/admin/projects/${project.id}`, "PUT", project);
      toast({ title: "Project saved!" });
    } catch (e: any) { toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
    finally { setSavingId(null); }
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    try {
      await apiFetch(`/api/admin/projects/${id}`, "DELETE");
      onChange(data.filter((p) => p.id !== id));
      toast({ title: "Project deleted." });
    } catch (e: any) { toast({ title: "Delete failed", description: e.message, variant: "destructive" }); }
  };

  const addProject = async () => {
    try {
      const newProject = await apiFetch("/api/admin/projects", "POST", {
        title: "New Project",
        category: "Web App",
        description: "Project description here.",
        image: "",
        technologies: [],
        demoLink: "#",
        demoLinkText: "Live Demo",
        displayOrder: data.length + 1,
      });
      onChange([...data, newProject]);
      setExpanded(newProject.id);
    } catch (e: any) { toast({ title: "Failed to add", description: e.message, variant: "destructive" }); }
  };

  const updateLocal = (id: number, updates: any) => {
    onChange(data.map((p) => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end mb-4">
        <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 rounded-full gradient-bg text-white text-sm font-medium hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
      {data.map((project) => (
        <div key={project.id} className="glass-card rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/3 transition"
            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
          >
            <span className="font-medium text-sm">{project.title}</span>
            <div className="flex items-center gap-2">
              <span className="badge-tech text-xs">{project.category}</span>
              {expanded === project.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>
          {expanded === project.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-white/5">
              <div className="pt-3">
                <ImageUpload
                  label="Project Image"
                  currentUrl={project.image ?? ""}
                  onUploaded={(url) => updateLocal(project.id, { image: url })}
                />
              </div>
              {[
                ["title", "Title"],
                ["category", "Category (Web App / Mobile / API / UI/UX)"],
                ["description", "Description", true],
                ["demoLink", "Demo Link URL"],
                ["demoLinkText", "Demo Link Text"],
              ].map(([key, label, multiline]) => (
                <div key={key as string}>
                  <label className="block text-xs text-muted-foreground mb-1">{label as string}</label>
                  {multiline ? (
                    <textarea
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"
                      rows={3}
                      value={project[key as string] ?? ""}
                      onChange={(e) => updateLocal(project.id, { [key as string]: e.target.value })}
                    />
                  ) : (
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                      value={project[key as string] ?? ""}
                      onChange={(e) => updateLocal(project.id, { [key as string]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Technologies (comma separated)</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  value={(project.technologies ?? []).join(", ")}
                  onChange={(e) => updateLocal(project.id, { technologies: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                />
              </div>
              <div className="flex justify-between pt-2">
                <button onClick={() => deleteProject(project.id)} className="flex items-center gap-1.5 text-sm text-destructive/70 hover:text-destructive transition">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
                <button
                  onClick={() => saveProject(project)}
                  disabled={savingId === project.id}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full gradient-bg text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {savingId === project.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Generic JSON panel for skills / experience / education ─────── */
const JsonPanel = ({ data, endpoint, label, onSave }: { data: any; endpoint: string; label: string; onSave: (d: any) => void }) => {
  const [text, setText] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const parsed = JSON.parse(text);
      await apiFetch(endpoint, "PUT", parsed);
      onSave(parsed);
      toast({ title: `${label} saved!` });
    } catch (e: any) { setError(e.message); toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Edit {label} as JSON. Be careful with the structure.</p>
      <textarea
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-xs font-mono focus:outline-none focus:border-primary/50 transition resize-none"
        rows={22}
        value={text}
        onChange={(e) => { setText(e.target.value); setError(""); }}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
};

/* ── Shared Save Button ──────────────────────────────────────────── */
const SaveBtn = ({ saving, onClick }: { saving: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    disabled={saving}
    className="flex items-center gap-2 px-6 py-2.5 rounded-full gradient-bg text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
  >
    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
    {saving ? "Saving..." : "Save Changes"}
  </button>
);

/* ── Main Admin Page ─────────────────────────────────────────────── */
const Admin = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const me = await apiFetch("/api/admin/me");
        if (!me.isAdmin) { setLocation("/admin/login"); return; }
        const content = await apiFetch("/api/content");
        setData(content);
      } catch {
        setLocation("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const logout = async () => {
    await apiFetch("/api/admin/logout", "POST");
    setLocation("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <div className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold gradient-text">Portfolio Admin</h1>
            <p className="text-xs text-muted-foreground">Content Management</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm text-muted-foreground hover:text-white transition">
              View Site ↗
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition px-4 py-2 glass border border-white/8 rounded-full"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="glass-card rounded-2xl p-2 space-y-1 sticky top-24">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? "gradient-bg text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content panel */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-semibold text-foreground mb-6 capitalize">{activeTab} Section</h2>

              {activeTab === "hero" && (
                <HeroPanel data={data.hero} onSave={(d) => setData({ ...data, hero: d })} />
              )}
              {activeTab === "about" && (
                <AboutPanel data={data.about} onSave={(d) => setData({ ...data, about: d })} />
              )}
              {activeTab === "contact" && (
                <ContactPanel data={data.contact} onSave={(d) => setData({ ...data, contact: d })} />
              )}
              {activeTab === "skills" && (
                <JsonPanel
                  data={data.skills}
                  endpoint="/api/admin/skills"
                  label="Skills"
                  onSave={(d) => setData({ ...data, skills: d })}
                />
              )}
              {activeTab === "experience" && (
                <JsonPanel
                  data={data.experience}
                  endpoint="/api/admin/experience"
                  label="Experience"
                  onSave={(d) => setData({ ...data, experience: d })}
                />
              )}
              {activeTab === "projects" && (
                <ProjectsPanel
                  data={data.projects}
                  onChange={(d) => setData({ ...data, projects: d })}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
