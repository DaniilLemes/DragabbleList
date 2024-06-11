import Head from 'next/head';
import dynamic from 'next/dynamic';

const DraggableList = dynamic(() => import('../components/DraggableList'), { ssr: false });

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Draggable List Example</title>
        <meta name="description" content="A draggable list example using Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Draggable List Example</h1>
        <DraggableList />
      </main>
    </div>
  );
}
