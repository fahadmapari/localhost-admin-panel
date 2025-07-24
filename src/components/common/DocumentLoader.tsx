import { Player } from "@lottiefiles/react-lottie-player";

interface DocumentLoaderProps {
  width?: number;
}

const DocumentLoader = ({ width = 200 }: DocumentLoaderProps) => {
  return (
    <Player
      src="/lotties/document-search.json"
      loop
      autoplay
      style={{
        width,
      }}
    />
  );
};

export default DocumentLoader;
