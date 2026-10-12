import { Loader2 } from "lucide-react";

const PageLoader = ({ fullScreen = true }: { fullScreen?: boolean }) => (
  <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "py-24"}`}>
    <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
  </div>
);

export default PageLoader;
