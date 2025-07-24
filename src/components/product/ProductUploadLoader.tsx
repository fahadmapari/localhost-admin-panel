import { Player } from "@lottiefiles/react-lottie-player";
import { Dialog, DialogContent } from "../ui/dialog";

interface ProductUploadLoaderProps {
  open: boolean;
}

const ProductUploadLoader = ({ open }: ProductUploadLoaderProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="outline-none" showCloseButton={false}>
        <Player
          src="/lotties/isometric-loader.json"
          loop
          autoplay
          style={{ width: 200 }}
        />
        <span className="mx-auto text-ring">
          Uploading Your Crafted Product.
        </span>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUploadLoader;
