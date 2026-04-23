import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AskAIProductModalProps {
  open: boolean;
  question: string;
  answer: string;
  isLoading: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onQuestionChange: (value: string) => void;
  onSubmit: () => void;
}

const AskAIProductModal = ({
  open,
  question,
  answer,
  isLoading,
  onClose,
  onOpenChange,
  onQuestionChange,
  onSubmit,
}: AskAIProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ask AI</DialogTitle>
          <DialogDescription>
            Ask AI something about the current products.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-4">
            <Textarea
              id="ask-ai-question"
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              placeholder="Type what you want to know"
              className="min-h-28"
              disabled={isLoading}
            />
          </div>

          {isLoading && (
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <div className="flex min-h-24 items-center justify-center">
                <Loader type="dots" size="sm" />
              </div>
            </div>
          )}

          {!isLoading && answer && (
            <div className="space-y-2">
              <p className="text-sm font-medium">AI response</p>
              <div className="rounded-md border border-border bg-muted/30 p-4 text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline underline-offset-2"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-background px-1 py-0.5 font-mono text-[0.85em]">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? "Thinking..." : "Ask AI"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AskAIProductModal;
