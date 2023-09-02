import Clock from "@/components/Clock/Clock";

export default function Home() {
  return (
    <div className="container">
      <Clock />
      <button className="button-square button-filled">Click me</button>
      <button className="button-round button-outlined">Click me</button>
    </div>
  );
}
