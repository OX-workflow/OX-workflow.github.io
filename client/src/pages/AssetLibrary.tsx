/** Authenticated ONYX asset library for uploading and managing project files stored in managed object storage. */
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft,
  ExternalLink,
  FileArchive,
  FilePlus2,
  FileText,
  FolderOpen,
  ImageIcon,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileTypeIcon({ contentType }: { contentType: string }) {
  if (contentType.startsWith("image/")) return <ImageIcon />;
  if (contentType.includes("zip") || contentType.includes("compressed")) return <FileArchive />;
  return <FileText />;
}

function AssetLibraryContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const [isReading, setIsReading] = useState(false);
  const assetsQuery = trpc.assets.list.useQuery(undefined, { retry: false });
  const uploadMutation = trpc.assets.upload.useMutation({
    onSuccess: async () => {
      await utils.assets.list.invalidate();
      toast.success("Project asset stored.");
      if (inputRef.current) inputRef.current.value = "";
    },
    onError: error => toast.error(error.message),
  });
  const removeMutation = trpc.assets.remove.useMutation({
    onSuccess: async () => {
      await utils.assets.list.invalidate();
      toast.success("Asset reference removed.");
    },
    onError: error => toast.error(error.message),
  });

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      toast.error("Choose a file smaller than 8 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setIsReading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("The selected file could not be read."));
        reader.readAsDataURL(file);
      });
      const base64 = dataUrl.split(",", 2)[1];
      if (!base64) throw new Error("The selected file did not contain readable data.");
      uploadMutation.mutate({
        name: file.name,
        contentType: file.type || "application/octet-stream",
        base64,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The selected file could not be read.");
    } finally {
      setIsReading(false);
    }
  };

  const isUploading = isReading || uploadMutation.isPending;
  const assets = assetsQuery.data ?? [];

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-[#edf3f8] px-4 py-6 text-[#112847] dark:bg-[#07182f] dark:text-[#edf5fb] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <button onClick={() => setLocation("/")} className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-[#2d6ba8] transition hover:text-[#0b284f] dark:hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Return to case study
        </button>

        <div className="overflow-hidden rounded-2xl border border-[#b8cbe0] bg-white shadow-[0_22px_55px_rgba(18,55,88,.10)] dark:border-white/15 dark:bg-[#0b203d]">
          <div className="grid gap-8 border-b border-[#d6e2ed] bg-[linear-gradient(115deg,#0b284f_0%,#174c82_58%,#2c6fab_100%)] px-6 py-8 text-white sm:grid-cols-[1fr_auto] sm:px-10 sm:py-10">
            <div>
              <p className="font-mono text-[10px] font-extrabold tracking-[.2em] text-[#a8d5ff]">MANAGED PROJECT STORAGE</p>
              <h1 className="mt-3 font-sans text-4xl font-semibold tracking-[-.04em] sm:text-5xl">ONYX asset library</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#deefff]">Store project media and supporting documents in managed object storage. Files are associated with your signed-in workspace and listed here as durable metadata.</p>
            </div>
            <div className="flex min-w-40 flex-col justify-end gap-2 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-[.16em] text-[#b6dcfb]">WORKFLOW LIMIT</span>
              <strong className="text-2xl">8 MB / file</strong>
              <span className="text-xs text-[#d7eafa]">Images, documents, archives</span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <input
              ref={inputRef}
              type="file"
              className="sr-only"
              onChange={event => void handleFile(event.target.files?.[0])}
            />
            <div className="flex flex-col justify-between gap-5 rounded-xl border border-dashed border-[#8bb6df] bg-[#f4f9fd] p-6 dark:border-[#5d88b2] dark:bg-white/5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#dcedfb] text-[#2d6ba8] dark:bg-[#2d6ba8]/20 dark:text-[#a7d5ff]"><UploadCloud className="h-5 w-5" /></span>
                <div><h2 className="font-sans text-xl font-semibold tracking-[-.02em]">Add a project file</h2><p className="mt-1 text-sm leading-6 text-[#5d7088] dark:text-[#c2d3e5]">The file is uploaded into managed object storage; this library retains only its structured reference and metadata.</p></div>
              </div>
              <Button onClick={() => inputRef.current?.click()} disabled={isUploading} className="h-10 bg-[#0b284f] px-4 font-semibold text-white hover:bg-[#174c82]">
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FilePlus2 className="mr-2 h-4 w-4" />}
                {isUploading ? "Storing…" : "Choose file"}
              </Button>
            </div>

            <div className="mt-9 flex items-end justify-between gap-4"><div><p className="font-mono text-[10px] font-extrabold tracking-[.18em] text-[#2d6ba8]">STORED ASSETS</p><h2 className="mt-2 font-sans text-2xl font-semibold tracking-[-.03em]">Your project references</h2></div><span className="rounded-full bg-[#e6f1fa] px-3 py-1 text-xs font-bold text-[#305c84] dark:bg-white/10 dark:text-[#cfe8ff]">{assets.length} file{assets.length === 1 ? "" : "s"}</span></div>

            {assetsQuery.isLoading ? (
              <div className="grid min-h-56 place-items-center"><Loader2 className="h-7 w-7 animate-spin text-[#2d6ba8]" /></div>
            ) : assetsQuery.isError ? (
              <div className="mt-6 rounded-xl border border-[#e8c794] bg-[#fffaf0] p-5 text-sm text-[#70551f] dark:border-[#8f6828] dark:bg-[#6d4c0c]/20 dark:text-[#f3d394]">{assetsQuery.error.message}</div>
            ) : assets.length === 0 ? (
              <div className="mt-6 grid min-h-56 place-items-center rounded-xl border border-[#d9e5ee] bg-[#f8fbfd] p-8 text-center dark:border-white/10 dark:bg-white/[.03]"><div><FolderOpen className="mx-auto h-8 w-8 text-[#79a5cb]" /><h3 className="mt-3 font-sans text-lg font-semibold">No stored assets yet</h3><p className="mt-1 max-w-sm text-sm leading-6 text-[#667b93] dark:text-[#bdcfe3]">Choose a file above to create the first managed storage reference for this project.</p></div></div>
            ) : (
              <div className="mt-6 overflow-hidden rounded-xl border border-[#d9e5ee] dark:border-white/10">
                {assets.map(asset => <div key={asset.id} className="grid gap-4 border-b border-[#e1ebf2] p-4 last:border-b-0 dark:border-white/10 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#e6f1fa] text-[#2d6ba8] dark:bg-white/10 dark:text-[#a9d5f9]"><FileTypeIcon contentType={asset.contentType} /></span>
                  <div className="min-w-0"><p className="truncate font-semibold">{asset.originalName}</p><p className="mt-1 text-xs text-[#667b93] dark:text-[#bdcfe3]">{asset.contentType} · {formatBytes(asset.sizeBytes)} · {new Date(asset.createdAt).toLocaleDateString()}</p></div>
                  <div className="flex gap-2"><a href={asset.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-[#b9cde0] px-3 text-xs font-bold text-[#1b4f80] transition hover:bg-[#eff6fc] dark:border-white/20 dark:text-[#cfe9ff] dark:hover:bg-white/10">Open <ExternalLink className="h-3.5 w-3.5" /></a><Button variant="ghost" size="icon" aria-label={`Remove ${asset.originalName}`} disabled={removeMutation.isPending} onClick={() => removeMutation.mutate({ id: asset.id })} className="h-9 w-9 text-[#a44141] hover:bg-[#fff0f0] hover:text-[#8e2525] dark:hover:bg-[#9a3030]/20"><Trash2 className="h-4 w-4" /></Button></div>
                </div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssetLibrary() {
  return <DashboardLayout><AssetLibraryContent /></DashboardLayout>;
}
