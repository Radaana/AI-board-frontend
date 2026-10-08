import { DialogsList } from './components/dialogsList.tsx';
import { DialogForm } from './components/dialogForm.tsx';

function App() {
    return (
        <div className="grid h-dvh min-h-0 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-1">
            <aside className="flex min-h-0 flex-col border-b border-line bg-sidebar md:border-r md:border-b-0 dark:border-line-dark dark:bg-sidebar-dark">
                <header className="flex shrink-0 items-center gap-3 px-5 py-5">
                    <span aria-hidden="true" className="h-3 w-3 rounded-full bg-brand" />
                    <span className="text-base font-semibold tracking-tight">AI Board</span>
                </header>
                <h2
                    id="conversations-heading"
                    className="px-5 pb-2 text-xs font-medium text-muted dark:text-muted-dark"
                >
                    Conversations
                </h2>
                <nav
                    aria-labelledby="conversations-heading"
                    className="max-h-40 min-h-0 overflow-y-auto px-3 pb-4 md:max-h-none md:flex-1"
                >
                    <DialogsList />
                </nav>
            </aside>
            <main className="flex min-h-0 min-w-0 flex-col">
                <header className="shrink-0 border-b border-line px-5 py-4 dark:border-line-dark">
                    <h1 className="text-sm font-medium">Conversation</h1>
                </header>
                <section aria-label="Conversation messages" className="min-h-0 flex-1 overflow-y-auto">
                    {/* Selected dialog messages will be rendered here. */}
                </section>
                <div className="mx-auto w-full max-w-3xl shrink-0 px-4 pt-4 pb-4 md:px-6 md:pb-6">
                    <DialogForm />
                    <p className="mt-3 text-center text-xs text-muted dark:text-muted-dark">
                        Start a new conversation with your first message.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default App;
