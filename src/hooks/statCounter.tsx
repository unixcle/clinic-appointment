import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";


type stats = {
  end:number;
  suffix:string;
  duration:number;
}
export default function StatCounter({ end, suffix = "", duration = 2 }:stats) {
  const { ref, inView } = useInView({
    triggerOnce: true, // فقط بار اول که دیده شد
    threshold: 0.3,     // وقتی 30٪ از عنصر دیده شد
  });

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp end={end} duration={duration} suffix={suffix} />
      ) : (
        0
      )}
    </div>
  );
}
