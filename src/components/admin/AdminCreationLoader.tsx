import { Player } from "@lottiefiles/react-lottie-player";
import { Dialog, DialogContent } from "../ui/dialog";

interface AdminCreationLoaderProps {
  open: boolean;
  label: string;
}

const AdminCreationLoader = ({ open, label }: AdminCreationLoaderProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="outline-none" showCloseButton={false}>
        <Player
          src="/lotties/profile.json"
          loop
          autoplay
          style={{ width: 200 }}
        />
        <span className="mx-auto text-ring">{label}</span>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCreationLoader;
