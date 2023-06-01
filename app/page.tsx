import EmptyState from './components/emptyState/emptyState.component';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <EmptyState showReset />
    </main>
  );
}
