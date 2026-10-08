import { useGetDialogsQuery } from '../data/dialog.ts';
import { selectDialog, useDialogUiSelector } from '../store/dialogUiSlice.ts';
import { useDispatch } from 'react-redux';

export function DialogsList() {
    const { data, isLoading, isError } = useGetDialogsQuery();
    const dispatch = useDispatch();
    const selectedDialogId = useDialogUiSelector(state => state.dialogUi.selectedDialogId);
    console.log('selectedDialogId ', selectedDialogId);

    if (isLoading) return <div className="px-3 py-2 text-sm text-muted dark:text-muted-dark">Loading...</div>;
    if (isError) return <div className="px-3 py-2 text-sm text-red-600 dark:text-red-400">Error</div>;
    if (data && !data.length)
        return <div className="px-3 py-2 text-sm text-muted dark:text-muted-dark">No dialogs</div>;

    const handleSelectDialog = (id: string) => {
        console.log('id ', id);
        dispatch(selectDialog(id));
    };

    return (
        <div className="flex flex-col gap-1">
            {data?.map(dialog => (
                <button
                    key={dialog.id}
                    className={`block w-full truncate rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-brand ${
                        selectedDialogId === dialog.id
                            ? 'cursor-default border-accent/30 bg-brand/16 text-accent dark:border-brand/30 dark:bg-brand/12 dark:text-brand'
                            : 'cursor-pointer border-transparent bg-transparent text-content enabled:hover:bg-hover dark:text-content-dark dark:enabled:hover:bg-hover-dark'
                    }`}
                    onClick={() => handleSelectDialog(dialog.id)}
                    disabled={selectedDialogId === dialog.id}
                    aria-current={selectedDialogId === dialog.id ? true : undefined}
                    title={dialog.title}
                >
                    {dialog.title}
                </button>
            ))}
        </div>
    );
}
