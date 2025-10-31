import { Player } from "@lottiefiles/react-lottie-player";
import { useLocation } from "react-router";

const Welcome = () => {
  const { pathname } = useLocation();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Player
        src="/lotties/working.json"
        autoplay
        loop
        style={{
          width: 600,
        }}
      />
      <span className="text-center text-2xl font-normal text-muted-foreground">
        Take a deep breath and dive in, steady work brings strong results.{" "}
        <br /> Let's make today productive.
      </span>
    </div>
  );
};

export default Welcome;
