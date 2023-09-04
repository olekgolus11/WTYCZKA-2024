import Clock from "@/components/Clock/Clock";

export default function Home() {
  return (
    <main className="flex flex-wrap items-center justify-around h-full">
      <section>
        <Clock />
      </section>
      <section>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <button className="button-round button-filled">Click me</button>
          <button className="button-round button-outlined">Click me</button>
        </div>
      </section>
    </main>
  );
}
