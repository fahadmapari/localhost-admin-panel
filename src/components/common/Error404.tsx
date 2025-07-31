import { Player } from "@lottiefiles/react-lottie-player";

const Error404 = () => {
  return (
    <div className="h-full w-full">
      <Player
        src="/lotties/404.json"
        autoplay
        loop
        style={{
          width: "60%",
        }}
      />
    </div>
  );
};

export default Error404;
