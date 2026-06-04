import { CheckCircle2, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResumeBatch = {
  source: string;
  uploadedAt: string;
  owner: string;
  resumes: string[];
  sampleInput: string;
};

export function ResumeIntakePanel({
  batch,
  value,
  loaded,
  onChange,
  onLoadDemo,
}: {
  batch: ResumeBatch;
  value: string;
  loaded: boolean;
  onChange: (value: string) => void;
  onLoadDemo: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-elegant">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <FileText className="h-3.5 w-3.5" />
            简历输入
          </div>
          <h2 className="mt-3 text-base font-semibold text-foreground">上传/粘贴候选人简历</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            黑客松演示中不接后端，点击载入样例即可模拟上传 {batch.resumes.length} 份简历。
          </p>
        </div>
        {loaded && (
          <span className="inline-flex items-center gap-1 rounded-md bg-success/15 px-2 py-1 text-[11px] font-semibold text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            已导入
          </span>
        )}
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="粘贴候选人简历摘要，或使用下方样例数据..."
        className="mt-4 min-h-36 w-full resize-none rounded-xl border border-border bg-muted/30 p-3 text-xs leading-relaxed text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{batch.source}</span>
          <span> · {batch.owner}</span>
          <span> · {batch.uploadedAt}</span>
        </div>
        <Button
          size="sm"
          onClick={onLoadDemo}
          className="bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
        >
          <Upload className="mr-1 h-3.5 w-3.5" />
          载入 Mock 简历
        </Button>
      </div>
    </div>
  );
}
