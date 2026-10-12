import { useEffect, useState } from "react";
import { Archive, ArchiveRestore, ArrowLeft, Mail, MailOpen, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteMessage, useMessages, useUpdateMessage, type Message } from "../api";
import { EmptyState, ErrorState, PageHeader, formatDate, whatsappLink } from "../components";

const MessageView = ({ message, onBack }: { message: Message; onBack: () => void }) => {
  const update = useUpdateMessage();
  const remove = useDeleteMessage();

  const patch = (p: Partial<Pick<Message, "is_read" | "archived">>, msg: string) =>
    update.mutate({ id: message.id, ...p }, { onSuccess: () => toast.success(msg), onError: (e) => toast.error(e.message) });

  return (
    <article className="bg-card border border-border/60 rounded-xl p-5 md:p-6 h-full">
      <button onClick={onBack} className="lg:hidden inline-flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <ArrowLeft className="h-4 w-4" />
        Inbox
      </button>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold break-words" style={{ fontFamily: "Inter, sans-serif" }}>
            {message.subject}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 break-words">
            {message.name} · {message.email}
            {message.phone && ` · ${message.phone}`}
          </p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(message.created_at, true)}</span>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-relaxed break-words">{message.message}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <a href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}>
            <Mail className="h-4 w-4" />
            Reply by email
          </a>
        </Button>
        {message.phone && (
          <Button asChild size="sm" variant="outline">
            <a href={whatsappLink(message.phone, `Hello ${message.name.split(" ")[0]}, `)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={() => patch({ is_read: false }, "Marked as unread")}>
          <Mail className="h-4 w-4" />
          Mark unread
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => patch({ archived: !message.archived }, message.archived ? "Moved to inbox" : "Archived")}
        >
          {message.archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
          {message.archived ? "Unarchive" : "Archive"}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this message?</AlertDialogTitle>
              <AlertDialogDescription>This can't be undone. Archive it instead to keep a copy.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() =>
                  remove.mutate(message.id, {
                    onSuccess: () => {
                      toast.success("Message deleted");
                      onBack();
                    },
                    onError: (e) => toast.error(e.message),
                  })
                }
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
};

const Messages = () => {
  const { data: messages, isLoading, error } = useMessages();
  const update = useUpdateMessage();
  const [tab, setTab] = useState<"inbox" | "archived">("inbox");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = messages?.find((m) => m.id === selectedId) ?? null;

  // Opening a message marks it read.
  useEffect(() => {
    if (selected && !selected.is_read) update.mutate({ id: selected.id, is_read: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  if (error) return <ErrorState error={error} />;

  const visible = (messages ?? []).filter((m) => (tab === "archived" ? m.archived : !m.archived));
  const unread = (messages ?? []).filter((m) => !m.archived && !m.is_read).length;

  return (
    <>
      <PageHeader title="Messages" description={unread ? `${unread} unread` : "Messages from the contact form."} />

      <Tabs value={tab} onValueChange={(v) => { setTab(v as typeof tab); setSelectedId(null); }} className="mb-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState title={tab === "inbox" ? "No messages" : "Nothing archived"}>
          {tab === "inbox" && "Messages sent from the Contact page will appear here."}
        </EmptyState>
      ) : (
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 items-start">
          <ul className={`bg-card border border-border/60 rounded-xl divide-y divide-border/60 overflow-hidden ${selected ? "hidden lg:block" : ""}`}>
            {visible.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => setSelectedId(m.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors ${selectedId === m.id ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    {m.is_read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mx-1" aria-label="Unread" />
                    )}
                    <span className={`flex-1 truncate text-sm ${m.is_read ? "" : "font-semibold"}`}>{m.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(m.created_at)}</span>
                  </div>
                  <p className={`text-sm truncate mt-0.5 pl-6 ${m.is_read ? "text-muted-foreground" : ""}`}>{m.subject}</p>
                  <p className="text-xs text-muted-foreground truncate pl-6">{m.message}</p>
                </button>
              </li>
            ))}
          </ul>
          {selected ? (
            <MessageView message={selected} onBack={() => setSelectedId(null)} />
          ) : (
            <div className="hidden lg:flex items-center justify-center h-64 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
              Select a message to read it
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
